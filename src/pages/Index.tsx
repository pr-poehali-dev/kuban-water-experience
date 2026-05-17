import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/b4bbb41a-fe73-49cd-ad7f-fcce9e90f338/files/fb8ad46b-796f-4ede-9242-ed007fc67eaf.jpg";
const FAMILY_IMAGE = "https://cdn.poehali.dev/projects/b4bbb41a-fe73-49cd-ad7f-fcce9e90f338/files/ef850eeb-f67c-42cf-9370-765e7ce04fd0.jpg";
const CABIN_IMAGE = "https://cdn.poehali.dev/projects/b4bbb41a-fe73-49cd-ad7f-fcce9e90f338/files/ea5a61b5-6a55-457d-accd-9b57cd168706.jpg";

const TIME_SLOTS = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"];

const SERVICES = [
  { icon: "Sunset", title: "Закатная прогулка", desc: "2 часа по воде в лучах закатного солнца. Шампанское в подарок.", price: "от 4 900 ₽" },
  { icon: "Fish", title: "Рыбалка в море", desc: "Выход на рассвете. Всё снаряжение предоставляется.", price: "от 6 500 ₽" },
  { icon: "Users", title: "Корпоратив на воде", desc: "До 12 человек. Фуршет, музыка, фотограф по запросу.", price: "от 19 000 ₽" },
  { icon: "Heart", title: "Романтический вечер", desc: "Украшение катера, свечи, ужин под открытым небом.", price: "от 9 900 ₽" },
  { icon: "Camera", title: "Фотосессия", desc: "Профессиональный фотограф на борту. Уникальные кадры.", price: "от 7 500 ₽" },
  { icon: "Waves", title: "Морская экскурсия", desc: "Осмотр побережья, гроты, живописные бухты.", price: "от 3 500 ₽" },
];

const REVIEWS = [
  { name: "Анна М.", date: "Май 2025", text: "Отмечали годовщину свадьбы. Всё было идеально — закат, шампанское, тихая музыка. Рекомендуем всем!", stars: 5 },
  { name: "Дмитрий К.", date: "Апрель 2025", text: "Брали катер для корпоратива. Команда профессиональная, катер в идеальном состоянии. Все в восторге.", stars: 5 },
  { name: "Семья Петровых", date: "Июнь 2025", text: "Дети были в диком восторге! Капитан всё рассказывал и показывал. Обязательно приедем ещё.", stars: 5 },
];

const GALLERY = [HERO_IMAGE, FAMILY_IMAGE, CABIN_IMAGE];

const PRICES = [
  { title: "Короткая прогулка", duration: "1 час", guests: "до 6 чел.", price: "2 900 ₽", popular: false },
  { title: "Стандарт", duration: "2–3 часа", guests: "до 10 чел.", price: "5 900 ₽", popular: true },
  { title: "Полный день", duration: "6–8 часов", guests: "до 12 чел.", price: "14 900 ₽", popular: false },
];

export default function Index() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "about", label: "О катере" },
    { id: "services", label: "Услуги" },
    { id: "gallery", label: "Галерея" },
    { id: "prices", label: "Прайс" },
    { id: "reviews", label: "Отзывы" },
    { id: "contacts", label: "Контакты" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-body overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("hero")}>
            <span className="text-2xl">⚓</span>
            <span className="font-display text-xl font-semibold text-white tracking-wide">АкваТур</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`text-sm font-body transition-colors ${activeSection === l.id ? "text-sea-foam" : "text-white/80 hover:text-white"}`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <Button
            onClick={() => setBookingOpen(true)}
            className="hidden md:flex bg-gold text-sea-deep hover:bg-gold-light font-semibold text-sm"
          >
            Забронировать
          </Button>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden glass-dark border-t border-white/10 px-6 py-4 flex flex-col gap-4">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-white/90 text-left py-1">
                {l.label}
              </button>
            ))}
            <Button onClick={() => { setBookingOpen(true); setMobileMenuOpen(false); }} className="bg-gold text-sea-deep hover:bg-gold-light w-full mt-2">
              Забронировать
            </Button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${HERO_IMAGE})`, filter: "brightness(0.5)" }}
        />
        <div className="absolute inset-0 hero-gradient opacity-60" />

        {/* Waves */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" className="w-full animate-wave1">
            <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill="rgba(14,107,153,0.3)" />
          </svg>
          <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" className="w-full absolute bottom-0 animate-wave2">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,100 L0,100 Z" fill="rgba(168,223,240,0.2)" />
          </svg>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="animate-fade-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
            <p className="text-sea-foam/90 font-body text-sm tracking-[0.3em] uppercase mb-4">Морские прогулки · Аренда катера</p>
            <h1 className="font-display text-6xl md:text-8xl font-light text-white leading-none mb-6">
              Уйти в море —<br />
              <span className="gold-shimmer italic">значит жить</span>
            </h1>
            <p className="text-white/75 text-lg md:text-xl font-body max-w-xl mx-auto mb-10 leading-relaxed">
              Незабываемые прогулки на современном катере. Закаты, рыбалка, корпоративы и романтические вечера.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setBookingOpen(true)}
                className="bg-gold hover:bg-gold-light text-sea-deep font-semibold text-base px-10 py-6 rounded-full shadow-2xl"
              >
                <Icon name="Calendar" size={18} className="mr-2" />
                Забронировать прогулку
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("services")}
                className="border-white/40 text-white hover:bg-white/10 text-base px-10 py-6 rounded-full"
              >
                Смотреть услуги
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="bg-sea-deep text-white py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 text-center">
          {[
            { num: "8+", label: "лет на воде" },
            { num: "2000+", label: "довольных гостей" },
            { num: "12", label: "мест на борту" },
            { num: "24/7", label: "поддержка" },
          ].map((s, i) => (
            <div key={i}>
              <div className="font-display text-4xl font-light text-gold">{s.num}</div>
              <div className="text-white/60 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-24 section-gradient">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sea-mid text-xs tracking-[0.3em] uppercase mb-3 font-body">О нашем катере</p>
            <h2 className="font-display text-5xl font-light text-sea-deep mb-6 leading-tight">
              Современный катер<br />
              <span className="italic text-sea-mid">для вашего отдыха</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Наш катер класса «люкс» вмещает до 12 пассажиров. Оснащён современной навигацией, системой безопасности, музыкальной системой и баром на борту.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Опытный капитан и помощник обеспечат вам максимальный комфорт и безопасность на воде — будь то тихая вечерняя прогулка или активный морской день.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "Shield", text: "Полная страховка" },
                { icon: "Anchor", text: "Опытный капитан" },
                { icon: "Music", text: "Музыкальная система" },
                { icon: "Thermometer", text: "Бар на борту" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sea-deep">
                  <div className="w-9 h-9 rounded-full bg-sea-foam flex items-center justify-center flex-shrink-0">
                    <Icon name={f.icon} fallback="Star" size={16} className="text-sea-mid" />
                  </div>
                  <span className="text-sm font-medium">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src={CABIN_IMAGE} alt="Катер" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl p-5 shadow-xl bg-white border border-sea-foam">
              <div className="font-display text-3xl text-sea-deep font-light">12</div>
              <div className="text-sm text-gray-500">мест на борту</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sea-mid text-xs tracking-[0.3em] uppercase mb-3">Что мы предлагаем</p>
            <h2 className="font-display text-5xl font-light text-sea-deep">Наши услуги</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="group border border-sea-foam/50 rounded-2xl p-6 hover:border-sea-light hover:shadow-lg transition-all duration-300 bg-white hover:bg-sea-pale/30">
                <div className="w-12 h-12 rounded-xl bg-sea-pale flex items-center justify-center mb-4 group-hover:bg-sea-foam transition-colors">
                  <Icon name={s.icon} fallback="Star" size={22} className="text-sea-mid" />
                </div>
                <h3 className="font-display text-xl text-sea-deep mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <span className="text-sea-mid font-semibold text-sm">{s.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-sea-deep">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sea-foam/70 text-xs tracking-[0.3em] uppercase mb-3">Впечатления</p>
            <h2 className="font-display text-5xl font-light text-white">Галерея</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {GALLERY.map((img, i) => (
              <div key={i} className={`overflow-hidden rounded-2xl ${i === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-square"}`}>
                <img src={img} alt={`Галерея ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24 section-gradient">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sea-mid text-xs tracking-[0.3em] uppercase mb-3">Тарифы</p>
            <h2 className="font-display text-5xl font-light text-sea-deep">Стоимость аренды</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {PRICES.map((p, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-8 border-2 transition-all ${p.popular
                  ? "border-sea-light bg-sea-deep text-white shadow-2xl scale-105"
                  : "border-sea-foam/50 bg-white hover:border-sea-light"
                  }`}
              >
                {p.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-sea-deep text-xs font-bold px-4 py-1 rounded-full">
                    Популярный
                  </div>
                )}
                <h3 className={`font-display text-2xl mb-2 ${p.popular ? "text-white" : "text-sea-deep"}`}>{p.title}</h3>
                <div className={`font-display text-4xl font-light mb-1 ${p.popular ? "text-gold" : "text-sea-mid"}`}>{p.price}</div>
                <div className={`text-sm mb-6 ${p.popular ? "text-white/60" : "text-gray-400"}`}>за прогулку</div>
                <div className={`space-y-3 text-sm ${p.popular ? "text-white/80" : "text-gray-600"}`}>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={14} className={p.popular ? "text-sea-foam" : "text-sea-mid"} />
                    {p.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Users" size={14} className={p.popular ? "text-sea-foam" : "text-sea-mid"} />
                    {p.guests}
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Shield" size={14} className={p.popular ? "text-sea-foam" : "text-sea-mid"} />
                    Страховка включена
                  </div>
                </div>
                <Button
                  onClick={() => setBookingOpen(true)}
                  className={`w-full mt-8 ${p.popular ? "bg-gold hover:bg-gold-light text-sea-deep" : "bg-sea-mid hover:bg-sea-deep text-white"}`}
                >
                  Забронировать
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sea-mid text-xs tracking-[0.3em] uppercase mb-3">Отзывы</p>
            <h2 className="font-display text-5xl font-light text-sea-deep">Говорят наши гости</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-sea-pale/40 rounded-2xl p-6 border border-sea-foam/50">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <span key={j} className="text-gold">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">«{r.text}»</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sea-deep text-sm">{r.name}</div>
                    <div className="text-gray-400 text-xs">{r.date}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-sea-foam flex items-center justify-center">
                    <Icon name="User" size={16} className="text-sea-mid" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-24 bg-sea-mid overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${FAMILY_IMAGE})` }}
        />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <h2 className="font-display text-5xl font-light text-white mb-4">
            Готовы отправиться<br />
            <span className="italic text-gold-light">в море?</span>
          </h2>
          <p className="text-white/75 mb-8">Забронируйте прогулку прямо сейчас — мы работаем ежедневно с 8:00 до 21:00</p>
          <Button
            size="lg"
            onClick={() => setBookingOpen(true)}
            className="bg-gold hover:bg-gold-light text-sea-deep font-bold px-12 py-6 rounded-full text-lg"
          >
            <Icon name="Calendar" size={20} className="mr-2" />
            Забронировать
          </Button>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-sea-deep text-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-sea-foam/70 text-xs tracking-[0.3em] uppercase mb-3">Свяжитесь с нами</p>
            <h2 className="font-display text-5xl font-light text-white mb-8">Контакты</h2>
            <div className="space-y-6">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67" },
                { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "+7 (999) 123-45-67" },
                { icon: "Mail", label: "E-mail", value: "info@akvatur.ru" },
                { icon: "MapPin", label: "Адрес", value: "Причал №3, ул. Набережная, 12" },
                { icon: "Clock", label: "Режим работы", value: "Ежедневно 8:00 – 21:00" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-sea-mid flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={c.icon} fallback="Star" size={16} className="text-sea-foam" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs mb-0.5">{c.label}</div>
                    <div className="text-white font-medium">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
            <h3 className="font-display text-2xl text-white mb-6">Написать нам</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-white/70 text-sm">Ваше имя</Label>
                <Input className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/30" placeholder="Иван Иванов" />
              </div>
              <div>
                <Label className="text-white/70 text-sm">Телефон</Label>
                <Input className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/30" placeholder="+7 (999) 000-00-00" />
              </div>
              <div>
                <Label className="text-white/70 text-sm">Сообщение</Label>
                <Input className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/30" placeholder="Расскажите о вашем запросе..." />
              </div>
              <Button className="w-full bg-gold hover:bg-gold-light text-sea-deep font-semibold mt-2">
                Отправить сообщение
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#061c2e] text-white/40 py-8 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span>⚓</span>
          <span className="font-display text-white/70 text-lg">АкваТур</span>
        </div>
        <p>© 2025 АкваТур — Морские прогулки. Все права защищены.</p>
      </footer>

      {/* BOOKING DIALOG */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="max-w-lg bg-white overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl font-light text-sea-deep">
              Бронирование прогулки
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label className="text-sea-deep font-semibold text-sm block mb-3">Выберите дату</Label>
              <div className="flex justify-center border border-sea-foam rounded-xl overflow-hidden">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="w-full"
                />
              </div>
            </div>

            {selectedDate && (
              <div>
                <Label className="text-sea-deep font-semibold text-sm block mb-3">Выберите время</Label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map(t => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${selectedTime === t
                        ? "bg-sea-mid text-white border-sea-mid"
                        : "border-sea-foam text-sea-deep hover:border-sea-light hover:bg-sea-pale/50"
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedTime && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sea-deep text-sm mb-1 block">Ваше имя</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="Имя" className="border-sea-foam" />
                </div>
                <div>
                  <Label className="text-sea-deep text-sm mb-1 block">Гостей</Label>
                  <Input
                    type="number" min="1" max="12" value={guests}
                    onChange={e => setGuests(e.target.value)}
                    className="border-sea-foam"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-sea-deep text-sm mb-1 block">Телефон</Label>
                  <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 (999) 000-00-00" className="border-sea-foam" />
                </div>
              </div>
            )}

            {selectedDate && selectedTime && (
              <div className="bg-sea-pale rounded-xl p-4 text-sm text-sea-deep">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500">Дата:</span>
                  <span className="font-medium">{selectedDate.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Время:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
              </div>
            )}

            <Button
              className="w-full bg-gold hover:bg-gold-light text-sea-deep font-bold py-6 text-base"
              disabled={!selectedDate || !selectedTime || !name || !phone}
              onClick={() => {
                setBookingOpen(false);
                setSelectedDate(undefined);
                setSelectedTime("");
                setName("");
                setPhone("");
              }}
            >
              <Icon name="Check" size={18} className="mr-2" />
              Подтвердить бронирование
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}