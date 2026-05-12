import { useEffect, useState } from "react"
import { useYandexAuth } from "@/components/extensions/yandex-auth/useYandexAuth"
import { AUTH_URLS } from "@/lib/auth-config"

export default function AuthCallback() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const auth = useYandexAuth({ apiUrls: AUTH_URLS })

  useEffect(() => {
    const doCallback = async () => {
      const params = new URLSearchParams(window.location.search)
      const code = params.get("code")
      if (!code) {
        setStatus("error")
        return
      }
      const ok = await auth.handleCallback(params)
      if (ok) {
        setStatus("success")
        setTimeout(() => {
          window.location.href = "/"
        }, 1500)
      } else {
        setStatus("error")
      }
    }
    doCallback()
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0608] flex items-center justify-center text-white">
      <div className="text-center">
        {status === "loading" && (
          <>
            <svg className="animate-spin w-12 h-12 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-white/70">Авторизация через Яндекс...</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="text-5xl mb-4">✓</div>
            <p className="text-green-400 text-lg font-semibold">Вход выполнен!</p>
            <p className="text-white/50 text-sm mt-2">Перенаправляем на сайт...</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-5xl mb-4">✗</div>
            <p className="text-red-400 text-lg font-semibold">Ошибка авторизации</p>
            <a href="/" className="text-white/50 text-sm mt-2 hover:text-white underline">
              Вернуться на главную
            </a>
          </>
        )}
      </div>
    </div>
  )
}
