import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Принимает заявку на бронирование и отправляет письмо на почту владельца."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token, X-Session-Id",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": {**cors_headers, "Access-Control-Max-Age": "86400"}, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "")
    phone = body.get("phone", "")
    date = body.get("date", "")
    time = body.get("time", "")
    guests = body.get("guests", "")
    service = body.get("service", "Стандартная прогулка")

    smtp_host = os.environ.get("SMTP_HOST", "smtp.mail.ru")
    smtp_port = int(os.environ.get("SMTP_PORT", "465"))
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    to_email = "adamant-boat@mail.ru"

    subject = f"🚢 Новая заявка на бронирование — {name}"

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f0f8ff; padding: 24px; border-radius: 12px;">
      <div style="background: #0a3d5c; color: white; padding: 20px 24px; border-radius: 8px; margin-bottom: 24px;">
        <h2 style="margin: 0; font-size: 22px;">⚓ АкваТур — Новая заявка</h2>
        <p style="margin: 6px 0 0; opacity: 0.7; font-size: 14px;">Заявка на бронирование прогулки</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        <tr style="background: #e0f5fb;">
          <td style="padding: 12px 16px; font-weight: bold; color: #0a3d5c; width: 40%;">👤 Имя</td>
          <td style="padding: 12px 16px; color: #333;">{name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-weight: bold; color: #0a3d5c;">📞 Телефон</td>
          <td style="padding: 12px 16px; color: #333;">{phone}</td>
        </tr>
        <tr style="background: #e0f5fb;">
          <td style="padding: 12px 16px; font-weight: bold; color: #0a3d5c;">📅 Дата</td>
          <td style="padding: 12px 16px; color: #333;">{date}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-weight: bold; color: #0a3d5c;">🕐 Время</td>
          <td style="padding: 12px 16px; color: #333;">{time}</td>
        </tr>
        <tr style="background: #e0f5fb;">
          <td style="padding: 12px 16px; font-weight: bold; color: #0a3d5c;">👥 Гостей</td>
          <td style="padding: 12px 16px; color: #333;">{guests} чел.</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-weight: bold; color: #0a3d5c;">🚢 Услуга</td>
          <td style="padding: 12px 16px; color: #333;">{service}</td>
        </tr>
      </table>
      <p style="margin: 20px 0 0; font-size: 13px; color: #888; text-align: center;">
        Заявка получена через сайт АкваТур
      </p>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = smtp_user
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True, "message": "Заявка отправлена"}),
    }
