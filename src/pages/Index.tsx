import { BookOpen, Crown, Heart, Tv, Users, Feather, Plus, Minus, Mail } from "lucide-react"
import Icon from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface FAQ {
  question: string
  answer: string
}

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs: FAQ[] = [
    {
      question: "В каких жанрах вы пишете?",
      answer:
        "Тёмное фэнтези, городская мистика и психологический триллер — мои основные жанры. В историях всегда есть место неоднозначным героям, мрачной атмосфере и неожиданным поворотам. Каждая книга — это путешествие в глубины человеческой природы.",
    },
    {
      question: "Где можно читать ваши книги?",
      answer:
        "Все произведения публикуются на Автор.Тудей и в Telegram-канале. Часть книг доступна бесплатно, часть — в рамках платной подписки. Следите за анонсами, чтобы первыми узнавать о новых главах.",
    },
    {
      question: "Как поддержать автора?",
      answer:
        "Лучшая поддержка — читать, делиться и оставлять комментарии. Если хотите поддержать материально, доступны донаты через Boosty и прямые переводы. Каждый донат помогает мне уделять больше времени написанию.",
    },
    {
      question: "Как связаться с вами лично?",
      answer:
        "Пишите в Telegram — отвечаю лично, хотя иногда с задержкой (особенно когда нахожусь в потоке). По сотрудничеству, интервью и коллаборациям — предпочитаю email.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0608] text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background with dark red overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(https://cdn.poehali.dev/files/13425042-a343-427b-881d-993efd0c2387.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0A0608]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000]/20 to-transparent" />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between p-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-black/50 ring-1 ring-red-900/50 backdrop-blur rounded-full">
            <Icon name="Feather" size={18} className="text-red-400" />
            <span className="font-medium tracking-widest text-sm" style={{ fontFamily: "'Cinzel', serif" }}>RED1DARK</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {["Книги", "Каналы", "Донат", "Вопросы", "Контакты"].map((item) => (
              <a
                key={item}
                href="#"
                className="px-4 py-2 bg-black/40 ring-1 ring-red-900/30 backdrop-blur rounded-full hover:bg-red-900/20 hover:ring-red-700/50 transition-all"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="px-4 py-2 bg-black/40 ring-1 ring-red-900/30 backdrop-blur rounded-full hover:bg-red-900/20 transition-all"
            >
              Войти
            </a>
            <Button className="bg-red-700 text-white hover:bg-red-600 rounded-full px-6 border-0">
              Читать книги
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
          <div className="mb-6 px-4 py-2 bg-black/50 ring-1 ring-red-900/50 backdrop-blur rounded-full">
            <span className="text-sm font-medium text-red-300">Тёмное фэнтези · Мистика · Триллер</span>
          </div>

          <h1
            className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-balance"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Войди в тёмный мир.
          </h1>

          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mb-12 leading-relaxed text-pretty">
            Истории о тех, кто живёт на грани света и тьмы. Авторская проза с живыми героями, мрачной атмосферой и финалами, которые не отпускают.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              size="lg"
              className="bg-red-700 text-white hover:bg-red-600 rounded-full px-8 py-4 text-lg border-0"
            >
              Читать бесплатно
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-black/40 ring-1 ring-red-900/50 backdrop-blur border-0 text-white hover:bg-red-900/20 rounded-full px-8 py-4 text-lg"
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

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <div className="rounded-2xl bg-black/30 ring-1 ring-red-900/30 backdrop-blur p-8 text-center hover:ring-red-700/50 transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-900/30 ring-1 ring-red-700/40 mb-6">
                <Icon name="BookOpen" size={24} className="text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Авторская проза</h3>
              <p className="text-white/70 leading-relaxed">Уникальные истории, написанные от сердца. Без штампов, без шаблонов.</p>
            </div>

            <div className="rounded-2xl bg-black/30 ring-1 ring-red-900/30 backdrop-blur p-8 text-center hover:ring-red-700/50 transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-900/30 ring-1 ring-red-700/40 mb-6">
                <Icon name="Users" size={24} className="text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Живое сообщество</h3>
              <p className="text-white/70 leading-relaxed">Читатели, которые обсуждают, спорят и ждут следующую главу.</p>
            </div>

            <div className="rounded-2xl bg-black/30 ring-1 ring-red-900/30 backdrop-blur p-8 text-center hover:ring-red-700/50 transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-900/30 ring-1 ring-red-700/40 mb-6">
                <Icon name="Tv" size={24} className="text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Каналы и платформы</h3>
              <p className="text-white/70 leading-relaxed">Telegram, Автор.Тудей — все обновления в одном месте.</p>
            </div>

            <div className="rounded-2xl bg-black/30 ring-1 ring-red-900/30 backdrop-blur p-8 text-center hover:ring-red-700/50 transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-900/30 ring-1 ring-red-700/40 mb-6">
                <Icon name="Heart" size={24} className="text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Поддержка автора</h3>
              <p className="text-white/70 leading-relaxed">Донаты помогают писать больше и лучше. Каждый рубль на счету.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey / Books Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/[0.03] ring-1 ring-red-900/20 backdrop-blur p-12">
            <div className="text-center mb-16">
              <h2
                className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Путь в темноту
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto text-pretty">
                Как рождаются истории — от первой идеи до финальной точки.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="rounded-2xl bg-white/5 ring-1 ring-red-900/20 backdrop-blur p-8 h-80 flex flex-col hover:ring-red-700/40 transition-all">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-red-700/60 mb-4">01.</div>
                  <h3 className="text-xl font-semibold mb-4">Идея</h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    Всё начинается с образа — персонажа, момента или вопроса «а что если?». Темнота подсказывает лучшие истории.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 ring-1 ring-red-900/20 backdrop-blur p-8 h-80 flex flex-col hover:ring-red-700/40 transition-all">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-red-700/60 mb-4">02.</div>
                  <h3 className="text-xl font-semibold mb-4">Черновик</h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    Первый драфт пишется ночью, под кофе. Грубо, живо, без цензуры. Потом будет редактура.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 ring-1 ring-red-900/20 backdrop-blur p-8 h-80 flex flex-col hover:ring-red-700/40 transition-all">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-red-700/60 mb-4">03.</div>
                  <h3 className="text-xl font-semibold mb-4">Публикация</h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    Главы выходят регулярно на платформах. Читатели реагируют — и это меняет курс истории.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 ring-1 ring-red-900/20 backdrop-blur p-8 h-80 flex flex-col hover:ring-red-700/40 transition-all">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-red-700/60 mb-4">04.</div>
                  <h3 className="text-xl font-semibold mb-4">Финал</h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    Книга завершена. Читатели ещё долго обсуждают концовку. Автор уже думает о следующей истории.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="bg-red-700 text-white hover:bg-red-600 rounded-full px-12 py-4 text-lg font-semibold border-0"
              >
                Читать книги
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-24 px-6">
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
      <section className="relative z-10 py-24 px-6">
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
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Сообщение
                    </label>
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
                <div>
                  <p className="text-xl text-white/80 leading-relaxed text-pretty">
                    По вопросам сотрудничества, интервью и коллабораций — пишите. Отвечаю лично, иногда с задержкой — потому что пишу.
                  </p>
                </div>

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
                  <Button className="w-full bg-red-700 text-white hover:bg-red-600 rounded-lg flex items-center justify-center gap-2 border-0">
                    <Mail className="w-4 h-4" />
                    Написать в Telegram
                  </Button>
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
                  <span className="text-xl font-semibold tracking-widest" style={{ fontFamily: "'Cinzel', serif" }}>RED1DARK</span>
                </div>
                <p className="text-white/60 leading-relaxed text-pretty">
                  Авторская проза в жанрах тёмного фэнтези, мистики и психологического триллера. Истории, которые остаются с тобой.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-white/90">Книги</h4>
                <ul className="space-y-3">
                  {["Все произведения", "Бесплатно", "Серии", "Новинки"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/50 hover:text-red-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-white/90">Платформы</h4>
                <ul className="space-y-3">
                  {["Telegram", "Автор.Тудей", "Boosty", "VK"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/50 hover:text-red-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-white/90">Автор</h4>
                <ul className="space-y-3">
                  {["О себе", "Контакты", "Донат", "Партнёрства"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/50 hover:text-red-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter */}
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
                    className="flex-1 md:w-64 px-4 py-3 rounded-full bg-white/10 ring-1 ring-red-900/30 text-white placeholder-white/40 focus:outline-none focus:ring-red-700/50"
                  />
                  <Button className="bg-red-700 text-white hover:bg-red-600 rounded-full px-6 border-0 whitespace-nowrap">
                    Подписаться
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-red-900/20">
              <p className="text-white/40 text-sm">© 2024 Red1dark. Все права защищены.</p>
              <p className="text-white/40 text-sm">Тёмное фэнтези · Мистика · Триллер</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index
