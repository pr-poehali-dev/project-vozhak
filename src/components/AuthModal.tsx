import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useYandexAuth } from "@/components/extensions/yandex-auth/useYandexAuth"
import { X, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import { AUTH_URLS } from "@/lib/auth-config"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthSuccess?: () => void
}

type View = "main" | "email" | "register" | "vk-info"

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [view, setView] = useState<View>("main")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [emailSuccess, setEmailSuccess] = useState(false)

  const auth = useYandexAuth({ apiUrls: AUTH_URLS })

  if (!isOpen) return null

  const handleYandexLogin = async () => {
    await auth.login()
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError(null)
    setEmailLoading(true)

    try {
      // Email-вход через Яндекс-бэкенд (action=email-login)
      const res = await fetch(`${AUTH_URLS.authUrl.replace("?action=auth-url", "")}?action=email-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setEmailError(data.error || "Неверный email или пароль")
        return
      }

      // Сохраняем токены
      localStorage.setItem("yandex_auth_refresh_token", data.refresh_token)
      setEmailSuccess(true)
      setTimeout(() => {
        onClose()
        window.location.reload()
      }, 1200)
    } catch {
      setEmailError("Ошибка сети. Попробуйте ещё раз.")
    } finally {
      setEmailLoading(false)
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError(null)
    setEmailLoading(true)

    try {
      const res = await fetch(`${AUTH_URLS.authUrl.replace("?action=auth-url", "")}?action=email-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      })
      const data = await res.json()

      if (!res.ok) {
        setEmailError(data.error || "Ошибка регистрации")
        return
      }

      localStorage.setItem("yandex_auth_refresh_token", data.refresh_token)
      setEmailSuccess(true)
      setTimeout(() => {
        onClose()
        window.location.reload()
      }, 1200)
    } catch {
      setEmailError("Ошибка сети. Попробуйте ещё раз.")
    } finally {
      setEmailLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md mx-4 rounded-3xl bg-[#0f0810] ring-1 ring-red-900/40 p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-2xl font-bold tracking-widest text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            RED1DARK
          </span>
          <p className="text-white/50 text-sm mt-2">Войдите, чтобы поддержать автора</p>
        </div>

        {/* MAIN VIEW */}
        {view === "main" && (
          <div className="space-y-3">
            {/* Яндекс */}
            <button
              onClick={handleYandexLogin}
              disabled={auth.isLoading}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#FC3F1D] hover:bg-[#E53517] disabled:opacity-60 transition-all"
            >
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                  <path d="M12.04.04C5.43.04.08,5.39.08,12s5.35,11.96,11.96,11.96,11.96-5.35,11.96-11.96S18.64.04,12.04.04ZM16.04,19.09h-2.47V6.82h-1.11c-2.03,0-3.09,1.03-3.09,2.54,0,1.71.74,2.51,2.25,3.54l1.25.84-3.59,5.37h-2.68l3.22-4.8c-1.85-1.33-2.89-2.62-2.89-4.8,0-2.74,1.91-4.6,5.53-4.6h3.59v14.19Z" />
                </svg>
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-white text-sm">Вход Яндекс</div>
                <div className="text-white/70 text-xs">Быстрый вход через Яндекс ID</div>
              </div>
              {auth.isLoading && (
                <svg className="animate-spin w-5 h-5 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
            </button>

            {/* VK */}
            <button
              onClick={() => setView("vk-info")}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#0077FF] hover:bg-[#0066DD] transition-all"
            >
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 rounded-xl overflow-hidden">
                <img
                  src="https://cdn.poehali.dev/projects/35f44f91-149a-4021-80e2-3741183b08ea/bucket/6653f71d-10a4-42a0-8f11-455051298949.png"
                  alt="VK"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-white text-sm">Вход ВКонтакте</div>
                <div className="text-white/70 text-xs">Быстрый вход через VK</div>
              </div>
            </button>

            {/* Email */}
            <button
              onClick={() => { setView("email"); setEmailError(null) }}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-all"
            >
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 rounded-xl bg-white/10">
                <Mail size={20} className="text-white/80" />
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-white text-sm">Вход по почте</div>
                <div className="text-white/60 text-xs">Вход по email и паролю</div>
              </div>
            </button>

            {auth.error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 rounded-xl px-4 py-3">
                <AlertCircle size={16} className="flex-shrink-0" />
                {auth.error}
              </div>
            )}
          </div>
        )}

        {/* VK INFO VIEW */}
        {view === "vk-info" && (
          <div>
            <button onClick={() => setView("main")} className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
              ← Назад
            </button>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4">
                <img
                  src="https://cdn.poehali.dev/projects/35f44f91-149a-4021-80e2-3741183b08ea/bucket/6653f71d-10a4-42a0-8f11-455051298949.png"
                  alt="VK"
                  className="w-full h-full object-contain"
                  style={{ background: "#0077FF" }}
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">Вход через ВКонтакте</h3>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                OAuth через VK требует регистрации приложения на стороне ВКонтакте. Пока используйте Яндекс ID или email.
              </p>
              <p className="text-white/40 text-xs mb-6">
                Вы также можете подписаться на сообщество автора во ВКонтакте, чтобы следить за новостями.
              </p>
              <div className="space-y-3">
                <a
                  href="https://vk.com/red1dark.writer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-[#0077FF] hover:bg-[#0066DD] text-white border-0">
                    Подписаться на сообщество
                  </Button>
                </a>
                <Button
                  variant="ghost"
                  className="w-full text-white/60 hover:text-white"
                  onClick={() => setView("main")}
                >
                  Войти другим способом
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* EMAIL VIEW */}
        {view === "email" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setView("main")} className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
                ← Назад
              </button>
              <button
                onClick={() => { setView("register"); setEmailError(null) }}
                className="text-red-400 hover:text-red-300 text-sm transition-colors"
              >
                Регистрация →
              </button>
            </div>

            {emailSuccess ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                <p className="text-green-400 font-semibold text-lg">Вход выполнен!</p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">Войти по email</h3>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 ring-1 ring-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-red-700/50"
                      placeholder="your@email.com"
                      required
                      autoFocus
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Пароль</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 ring-1 ring-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-red-700/50"
                      placeholder="••••••••"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {emailError && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 rounded-xl px-4 py-3">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    {emailError}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={emailLoading}
                  className="w-full bg-red-700 text-white hover:bg-red-600 rounded-xl border-0 py-3"
                >
                  {emailLoading ? (
                    <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : null}
                  {emailLoading ? "Входим..." : "Войти"}
                </Button>
              </form>
            )}
          </div>
        )}

        {/* REGISTER VIEW */}
        {view === "register" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setView("email")} className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
                ← Войти
              </button>
            </div>

            {emailSuccess ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                <p className="text-green-400 font-semibold text-lg">Аккаунт создан!</p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">Создать аккаунт</h3>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Имя</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 ring-1 ring-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-red-700/50"
                    placeholder="Ваше имя"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 ring-1 ring-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-red-700/50"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Пароль</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 ring-1 ring-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-red-700/50"
                      placeholder="Минимум 8 символов"
                      required
                      minLength={8}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {emailError && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 rounded-xl px-4 py-3">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    {emailError}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={emailLoading}
                  className="w-full bg-red-700 text-white hover:bg-red-600 rounded-xl border-0 py-3"
                >
                  {emailLoading ? "Создаём..." : "Создать аккаунт"}
                </Button>
              </form>
            )}
          </div>
        )}

        <p className="text-white/25 text-xs text-center mt-6">
          Входя на сайт, вы соглашаетесь с условиями использования
        </p>
      </div>
    </div>
  )
}
