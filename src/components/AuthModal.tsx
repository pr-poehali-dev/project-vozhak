import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useYandexAuth } from "@/components/extensions/yandex-auth/useYandexAuth"
import { X, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { AUTH_URLS } from "@/lib/auth-config"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthSuccess?: () => void
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const auth = useYandexAuth({ apiUrls: AUTH_URLS })

  if (!isOpen) return null

  const handleYandexLogin = async () => {
    await auth.login()
  }

  const handleVKLogin = () => {
    window.open("https://vk.com/red1dark.writer", "_blank")
  }

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Email login stub — будет подключён позже
    alert("Email-вход будет добавлен позже. Используйте Яндекс ID.")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 rounded-3xl bg-[#0f0810] ring-1 ring-red-900/40 p-8 shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold tracking-widest text-white" style={{ fontFamily: "'Cinzel', serif" }}>
              RED1DARK
            </span>
          </div>
          <p className="text-white/60 text-sm">Войдите, чтобы поддержать автора и следить за книгами</p>
        </div>

        {!showEmailForm ? (
          <div className="space-y-3">
            {/* Яндекс */}
            <button
              onClick={handleYandexLogin}
              disabled={auth.isLoading}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#FC3F1D] hover:bg-[#E53517] transition-all group"
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
                <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
            </button>

            {/* VK */}
            <button
              onClick={handleVKLogin}
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
              onClick={() => setShowEmailForm(true)}
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
              <p className="text-red-400 text-sm text-center mt-2">{auth.error}</p>
            )}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setShowEmailForm(false)}
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
            >
              ← Назад
            </button>
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 ring-1 ring-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-red-700/50"
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
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 ring-1 ring-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-red-700/50"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-red-700 text-white hover:bg-red-600 rounded-xl border-0 py-3">
                Войти
              </Button>
            </form>
          </div>
        )}

        <p className="text-white/30 text-xs text-center mt-6">
          Входя на сайт, вы соглашаетесь с условиями использования
        </p>
      </div>
    </div>
  )
}
