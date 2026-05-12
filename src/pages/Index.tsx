import { Plus, Minus, Mail, ExternalLink } from "lucide-react"
import Icon from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import AuthModal from "@/components/AuthModal"
import { useYandexAuth } from "@/components/extensions/yandex-auth/useYandexAuth"
import { AUTH_URLS } from "@/lib/auth-config"

// ═══════════════════════════════════════════
// CMS-CONFIG — все настройки сайта здесь
// ═══════════════════════════════════════════
const SITE_CONFIG = {
  author: "Red1dark",
  tagline: "Тёмное фэнтези · Мистика · Триллер",
  heroTitle: "Войди в тёмный мир.",
  heroSubtitle:
    "Истории о тех, кто живёт на грани света и тьмы. Авторская проза с живыми героями, мрачной атмосферой и финалами, которые не отпускают.",

  books: [
    {
      id: 1,
      title: "Тайна Моргадии",
      cover: "https://cdn.poehali.dev/projects/35f44f91-149a-4021-80e2-3741183b08ea/bucket/d8d821fc-4a24-4b89-9151-f6efe90a1991.jpg",
      status: "published",
      publishedAt: "2024",
      excerpt:
        "Две подруги случайно находят карту загадочного острова. То, что они встретят там, изменит их жизни навсегда...",
      links: [
        { platform: "litres", label: "ЛитРес (тизер)", url: "https://www.litres.ru/72800337/" },
        { platform: "litres", label: "ЛитРес (полная)", url: "https://www.litres.ru/73497656/" },
        { platform: "ozon", label: "Ozon", url: "https://ozon.ru/t/NB4LnTX" },
      ],
    },
    {
      id: 2,
      title: "Второе дыхание",
      cover: "https://cdn.poehali.dev/projects/35f44f91-149a-4021-80e2-3741183b08ea/bucket/08d0e9f6-31dd-493b-a5da-a97e1323df22.jpg",
      status: "published",
      publishedAt: "2024",
      excerpt:
        "Маленький провинциальный город. Туман над рекой. Белая роза на скамейке. Кто её оставил и почему именно здесь?",
      links: [
        { platform: "litres", label: "ЛитРес", url: "https://www.litres.ru/73525192/" },
        { platform: "ozon", label: "Ozon", url: "https://ozon.ru/t/vstyzN2" },
      ],
    },
    {
      id: 3,
      title: "Проклятие Соловков",
      cover: "https://cdn.poehali.dev/projects/35f44f91-149a-4021-80e2-3741183b08ea/bucket/bf4d8209-f822-47c7-b6cc-b95cb26ead94.png",
      status: "in_progress",
      progress: 25,
      publishedAt: null,
      excerpt: "Некоторые острова не хотят, чтобы их нашли. Скоро...",
      links: [],
    },
  ],

  channels: [
    {
      name: "ВКонтакте",
      description: "Новости, анонсы и посты автора",
      url: "https://vk.com/red1dark.writer",
      platform: "vk",
    },
    {
      name: "MAX",
      description: "Эксклюзивный контент и общение",
      url: "https://max.ru/join/WEt37Fjb1n-1En7ZqogaCPvDv5bEAkzb0Ty2kb1n7LY",
      platform: "max",
    },
  ],

  donate: {
    tips: "https://tips.tips/000472802",
    tbank: "https://pay.cloudtips.ru/p/0fcba08d",
    amounts: [100, 500, 1000],
  },
}

const PLATFORM_LOGOS: Record<string, { img: string; bg: string; label: string }> = {
  litres: {
    img: "https://cdn.poehali.dev/projects/35f44f91-149a-4021-80e2-3741183b08ea/bucket/6c4f50a4-01af-459b-8e88-c8561283bad6.png",
    bg: "#fff",
    label: "ЛитРес",
  },
  ozon: {
    img: "https://cdn.poehali.dev/projects/35f44f91-149a-4021-80e2-3741183b08ea/bucket/34285dce-98d8-4426-a1f1-bd0691150933.png",
    bg: "#fff",
    label: "Ozon",
  },
  vk: {
    img: "https://cdn.poehali.dev/projects/35f44f91-149a-4021-80e2-3741183b08ea/bucket/6653f71d-10a4-42a0-8f11-455051298949.png",
    bg: "#0077FF",
    label: "VK",
  },
  max: {
    img: "https://cdn.poehali.dev/projects/35f44f91-149a-4021-80e2-3741183b08ea/bucket/17d9c59f-1012-49ba-a58a-ba10f4a52dae.png",
    bg: "#fff",
    label: "MAX",
  },
}

const PlatformBadge = ({ platform }: { platform: string }) => {
  const p = PLATFORM_LOGOS[platform]
  if (p) {
    return (
      <span
        className="inline-flex items-center justify-center rounded overflow-hidden flex-shrink-0"
        style={{ background: p.bg, width: 40, height: 20, padding: "2px 4px" }}
      >
        <img src={p.img} alt={p.label} className="h-full w-auto object-contain" />
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-white/10 text-white">
      {platform}
    </span>
  )
}

interface FAQ {
  question: string
  answer: string
}

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [hoveredBook, setHoveredBook] = useState<number | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const auth = useYandexAuth({ apiUrls: AUTH_URLS })
  const userRole = (auth.user as (typeof auth.user & { role?: string }) | null)?.role || "user"
  const isAdmin = ["admin", "superadmin"].includes(userRole)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs: FAQ[] = [
    {
      question: "В каких жанрах вы пишете?",
      answer:
        "Тёмное фэнтези, городская мистика и психологический триллер — мои основные жанры. В историях всегда есть место неоднозначным героям, мрачной атмосфере и неожиданным поворотам.",
    },
    {
      question: "Где можно читать ваши книги?",
      answer:
        "Книги доступны на ЛитРес и Ozon. Часть контента публикуется в каналах ВКонтакте и MAX. Следите за анонсами, чтобы первыми узнавать о новых главах.",
    },
    {
      question: "Как поддержать автора?",
      answer:
        "Через сервис tips.tips (100 ₽ / 500 ₽ / 1000 ₽ и любая сумма в RUB и USD) или через Т-банк. Каждый донат помогает уделять больше времени написанию.",
    },
    {
      question: "Как связаться лично?",
      answer:
        "Пишите во ВКонтакте или через форму на сайте — отвечаю лично, иногда с задержкой. По сотрудничеству и коллаборациям — через контактную форму.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0608] text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(https://cdn.poehali.dev/files/13425042-a343-427b-881d-993efd0c2387.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0A0608]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000]/20 to-transparent" />
        </div>

        <nav className="relative z-10 flex items-center justify-between p-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-black/50 ring-1 ring-red-900/50 backdrop-blur rounded-full">
            <Icon name="Feather" size={18} className="text-red-400" />
            <span className="font-medium tracking-widest text-sm" style={{ fontFamily: "'Cinzel', serif" }}>
              RED1DARK
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "Книги", href: "#books" },
              { label: "Каналы", href: "#channels" },
              { label: "Донат", href: "#donate" },
              { label: "Вопросы", href: "#faq" },
              { label: "Контакты", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 bg-black/40 ring-1 ring-red-900/30 backdrop-blur rounded-full hover:bg-red-900/20 hover:ring-red-700/50 transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {auth.isAuthenticated ? (
              <>
                {isAdmin && (
                  <a href="/admin">
                    <Button className="bg-white/10 text-white hover:bg-white/20 rounded-full px-4 border-0 text-sm gap-2">
                      <Icon name="LayoutDashboard" size={14} />
                      Админка
                    </Button>
                  </a>
                )}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 ring-1 ring-red-900/40 backdrop-blur rounded-full">
                  {auth.user?.avatar_url && (
                    <img src={auth.user.avatar_url} className="w-6 h-6 rounded-full" alt="avatar" />
                  )}
                  <span className="text-sm text-white/80">{auth.user?.name?.split(" ")[0] || "Профиль"}</span>
                  <button onClick={auth.logout} className="text-white/40 hover:text-red-400 text-xs ml-1">✕</button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-4 py-2 bg-black/40 ring-1 ring-red-900/30 backdrop-blur rounded-full hover:bg-red-900/20 transition-all text-sm"
                >
                  Войти
                </button>
                <Button className="bg-red-700 text-white hover:bg-red-600 rounded-full px-6 border-0">
                  Читать книги
                </Button>
              </>
            )}
          </div>
        </nav>

        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
          <div className="mb-6 px-4 py-2 bg-black/50 ring-1 ring-red-900/50 backdrop-blur rounded-full">
            <span className="text-sm font-medium text-red-300">{SITE_CONFIG.tagline}</span>
          </div>

          <h1
            className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-balance"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {SITE_CONFIG.heroTitle}
          </h1>

          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mb-12 leading-relaxed text-pretty">
            {SITE_CONFIG.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              size="lg"
              className="bg-red-700 text-white hover:bg-red-600 rounded-full px-8 py-4 text-lg border-0"
              onClick={() => document.getElementById("books")?.scrollIntoView({ behavior: "smooth" })}
            >
              Читать бесплатно
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-black/40 ring-1 ring-red-900/50 backdrop-blur border-0 text-white hover:bg-red-900/20 rounded-full px-8 py-4 text-lg"
              onClick={() => document.getElementById("books")?.scrollIntoView({ behavior: "smooth" })}
            >
              Смотреть все книги
            </Button>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-black/50 ring-1 ring-red-900/40 backdrop-blur rounded-full">
            <Icon name="Crown" size={16} className="text-red-400" />
            <span className="text-sm font-medium text-white/80">Автор · Писатель · Red1dark</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              { icon: "BookOpen", title: "Авторская проза", desc: "Уникальные истории, написанные от сердца. Без штампов, без шаблонов." },
              { icon: "Users", title: "Живое сообщество", desc: "Читатели, которые обсуждают, спорят и ждут следующую главу." },
              { icon: "Tv", title: "Каналы и платформы", desc: "ВКонтакте, MAX, ЛитРес, Ozon — все обновления в одном месте." },
              { icon: "Heart", title: "Поддержка автора", desc: "Донаты помогают писать больше и лучше. Каждый рубль на счету." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl bg-black/30 ring-1 ring-red-900/30 backdrop-blur p-8 text-center hover:ring-red-700/50 transition-all">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-900/30 ring-1 ring-red-700/40 mb-6">
                  <Icon name={f.icon} size={24} className="text-red-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{f.title}</h3>
                <p className="text-white/70 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/[0.03] ring-1 ring-red-900/20 backdrop-blur p-12">
            <div className="text-center mb-16">
              <h2
                className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Книги
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Произведения сообщества Red1dark
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SITE_CONFIG.books.map((book) => (
                <div
                  key={book.id}
                  className="group relative cursor-pointer"
                  onMouseEnter={() => setHoveredBook(book.id)}
                  onMouseLeave={() => setHoveredBook(null)}
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-[2/3] mb-4">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {book.status === "in_progress" && (
                      <div className="absolute top-3 left-3 px-3 py-1 bg-red-700/90 backdrop-blur rounded-full text-xs font-semibold">
                        В работе · {book.progress}%
                      </div>
                    )}
                    {book.status === "published" && book.publishedAt && (
                      <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur rounded-full text-xs font-semibold text-white/80">
                        {book.publishedAt}
                      </div>
                    )}

                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/20 flex flex-col justify-end p-6 transition-opacity duration-300 ${
                        hoveredBook === book.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <p className="text-white/90 text-sm leading-relaxed mb-4 italic">
                        "{book.excerpt}"
                      </p>

                      {book.links.length > 0 && (
                        <div className="space-y-2">
                          {book.links.map((link, i) => (
                            <a
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 w-full px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur rounded-lg text-sm transition-all"
                            >
                              <PlatformBadge platform={link.platform} />
                              <span className="flex-1">{link.label}</span>
                              <ExternalLink size={14} className="text-white/50" />
                            </a>
                          ))}
                        </div>
                      )}

                      {book.status === "in_progress" && (
                        <div className="mt-2">
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div
                              className="bg-red-500 h-2 rounded-full"
                              style={{ width: `${book.progress}%` }}
                            />
                          </div>
                          <p className="text-white/60 text-xs mt-1">Прогресс написания: {book.progress}%</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-center group-hover:text-red-400 transition-colors">
                    {book.title}
                  </h3>
                  {book.status === "in_progress" && (
                    <p className="text-center text-white/50 text-sm mt-1">Скоро</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Channels Section */}
      <section id="channels" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/[0.03] ring-1 ring-red-900/20 backdrop-blur p-12">
            <div className="text-center mb-16">
              <h2
                className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Каналы автора
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Следите за обновлениями и первыми узнавайте о новых главах
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {SITE_CONFIG.channels.map((ch) => (
                <a
                  key={ch.name}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-2xl bg-black/30 ring-1 ring-red-900/30 backdrop-blur p-6 hover:ring-red-700/60 hover:bg-red-900/10 transition-all"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden"
                    style={{ background: PLATFORM_LOGOS[ch.platform]?.bg || "#1a1a2e" }}
                  >
                    {PLATFORM_LOGOS[ch.platform] ? (
                      <img
                        src={PLATFORM_LOGOS[ch.platform].img}
                        alt={ch.name}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <span className="text-white font-bold text-xs">{ch.name[0]}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold group-hover:text-red-400 transition-colors mb-1">{ch.name}</h3>
                    <p className="text-white/60 text-sm">{ch.description}</p>
                  </div>
                  <ExternalLink size={18} className="text-white/30 group-hover:text-red-400 transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-black/30 ring-1 ring-red-900/30 backdrop-blur p-12">
            <div className="text-center mb-16">
              <h2
                className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Поддержать автора
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Каждый донат — это новые главы, новые истории и тёплый кофе в процессе написания
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="rounded-2xl bg-white/5 ring-1 ring-red-900/20 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-900/30 ring-1 ring-red-700/40 flex items-center justify-center">
                    <Icon name="Zap" size={20} className="text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Чаевые</h3>
                    <p className="text-white/50 text-sm">RUB + USD</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mb-6">
                  {SITE_CONFIG.donate.amounts.map((amount) => (
                    <a
                      key={amount}
                      href={SITE_CONFIG.donate.tips}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-red-900/20 ring-1 ring-red-700/40 hover:bg-red-700 hover:ring-red-600 transition-all font-semibold text-sm"
                    >
                      {amount.toLocaleString("ru")} ₽
                    </a>
                  ))}
                  <a
                    href={SITE_CONFIG.donate.tips}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-white/10 ring-1 ring-white/20 hover:bg-red-700 hover:ring-red-600 transition-all text-sm"
                  >
                    Своя сумма
                  </a>
                </div>
                <a href={SITE_CONFIG.donate.tips} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-red-700 text-white hover:bg-red-600 rounded-lg border-0">
                    Отправить чаевые
                  </Button>
                </a>
              </div>

              <div className="rounded-2xl bg-white/5 ring-1 ring-red-900/20 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-900/30 ring-1 ring-red-700/40 flex items-center justify-center">
                    <Icon name="CreditCard" size={20} className="text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Т-банк</h3>
                    <p className="text-white/50 text-sm">Донат через CloudTips</p>
                  </div>
                </div>
                <p className="text-white/60 leading-relaxed mb-6 text-sm">
                  Перевод через Т-банк — быстро, без комиссии. Поддержи автора напрямую.
                </p>
                <a href={SITE_CONFIG.donate.tbank} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-red-700 text-white hover:bg-red-600 rounded-lg border-0">
                    Донат через Т-банк
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/[0.03] ring-1 ring-red-900/20 backdrop-blur p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2
                  className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Частые вопросы
                </h2>
                <p className="text-xl text-white/70 leading-relaxed text-pretty">
                  Всё, что читатели хотят знать об авторе, книгах и том, как поддержать.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-white/5 ring-1 ring-red-900/20 backdrop-blur overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-red-900/10 transition-colors"
                    >
                      <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                      {openFaq === index ? (
                        <Minus className="w-5 h-5 flex-shrink-0 text-red-400" />
                      ) : (
                        <Plus className="w-5 h-5 flex-shrink-0 text-red-400" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-black/30 ring-1 ring-red-900/30 backdrop-blur p-12">
            <div className="text-center mb-16">
              <h2
                className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Связаться
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="rounded-2xl bg-white/95 text-black p-8 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Написать автору</h3>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Имя</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Сообщение</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none outline-none"
                      placeholder="О чём хотите поговорить?"
                    />
                  </div>
                  <Button className="w-full bg-red-700 text-white hover:bg-red-600 rounded-lg py-3 font-normal text-base border-0">
                    Отправить сообщение
                  </Button>
                </form>
              </div>

              <div className="space-y-8">
                <p className="text-xl text-white/80 leading-relaxed text-pretty">
                  По вопросам сотрудничества, интервью и коллабораций — пишите. Отвечаю лично, иногда с задержкой — потому что пишу.
                </p>

                <div className="rounded-2xl bg-white/95 text-black p-6 shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://cdn.poehali.dev/files/13425042-a343-427b-881d-993efd0c2387.jpg"
                      alt="Red1dark"
                      className="w-16 h-16 rounded-full object-cover object-top"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">Red1dark</h4>
                      <p className="text-gray-600">Писатель · Тёмное фэнтези</p>
                    </div>
                  </div>
                  <a href="https://vk.com/red1dark.writer" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-red-700 text-white hover:bg-red-600 rounded-lg flex items-center justify-center gap-2 border-0">
                      <Mail className="w-4 h-4" />
                      Написать во ВКонтакте
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/[0.02] backdrop-blur-2xl ring-1 ring-red-900/20 p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <Icon name="Feather" size={20} className="text-red-400" />
                  <span className="text-xl font-semibold tracking-widest" style={{ fontFamily: "'Cinzel', serif" }}>
                    RED1DARK
                  </span>
                </div>
                <p className="text-white/60 leading-relaxed text-pretty">
                  Авторская проза в жанрах тёмного фэнтези, мистики и психологического триллера. Истории, которые остаются с тобой.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-white/90">Книги</h4>
                <ul className="space-y-3">
                  {SITE_CONFIG.books.map((b) => (
                    <li key={b.id}>
                      <a href="#books" className="text-white/50 hover:text-red-400 transition-colors text-sm">
                        {b.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-white/90">Платформы</h4>
                <ul className="space-y-3">
                  {[
                    { label: "ЛитРес", url: "https://www.litres.ru/72800337/" },
                    { label: "Ozon", url: "https://ozon.ru/t/NB4LnTX" },
                    { label: "ВКонтакте", url: "https://vk.com/red1dark.writer" },
                    { label: "MAX", url: "https://max.ru/join/WEt37Fjb1n-1En7ZqogaCPvDv5bEAkzb0Ty2kb1n7LY" },
                  ].map((p) => (
                    <li key={p.label}>
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-red-400 transition-colors text-sm">
                        {p.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-white/90">Поддержать</h4>
                <ul className="space-y-3">
                  {[
                    { label: "Чаевые (tips.tips)", url: SITE_CONFIG.donate.tips },
                    { label: "Т-банк", url: SITE_CONFIG.donate.tbank },
                  ].map((d) => (
                    <li key={d.label}>
                      <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-red-400 transition-colors text-sm">
                        {d.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl bg-red-900/10 ring-1 ring-red-900/30 p-8 mb-12">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Подписка на обновления</h4>
                  <p className="text-white/60">Первым узнавай о новых главах и книгах.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 md:w-64 px-4 py-3 rounded-full bg-white/10 ring-1 ring-red-900/30 text-white placeholder-white/40 focus:outline-none"
                  />
                  <Button className="bg-red-700 text-white hover:bg-red-600 rounded-full px-6 border-0 whitespace-nowrap">
                    Подписаться
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-red-900/20">
              <p className="text-white/40 text-sm">© 2024 Red1dark. Все права защищены.</p>
              <p className="text-white/40 text-sm">{SITE_CONFIG.tagline}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index