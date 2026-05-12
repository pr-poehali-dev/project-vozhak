import { useEffect, useState } from "react"
import { useYandexAuth } from "@/components/extensions/yandex-auth/useYandexAuth"
import { AUTH_URLS } from "@/lib/auth-config"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

interface AdminUser {
  id: number
  name: string | null
  email: string | null
  role: string
  yandex_id: string | null
  last_login_at: string | null
  created_at: string
}

interface AdminLog {
  id: number
  user_name: string | null
  action: string
  details: Record<string, unknown> | null
  ip_address: string | null
  created_at: string
}

type Section = "dashboard" | "users" | "logs" | "books"

export default function Admin() {
  const auth = useYandexAuth({ apiUrls: AUTH_URLS })
  const [section, setSection] = useState<Section>("dashboard")
  const [users, setUsers] = useState<AdminUser[]>([])
  const [logs, setLogs] = useState<AdminLog[]>([])
  const [loading, setLoading] = useState(false)

  const userRole = (auth.user as (typeof auth.user & { role?: string }) | null)?.role || "user"
  const isAdmin = ["admin", "superadmin"].includes(userRole)
  const isSuperAdmin = userRole === "superadmin"

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      window.location.href = "/"
    }
    if (!auth.isLoading && auth.isAuthenticated && !isAdmin) {
      window.location.href = "/?error=403"
    }
  }, [auth.isLoading, auth.isAuthenticated, isAdmin])

  if (auth.isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0608] flex items-center justify-center text-white">
        <svg className="animate-spin w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    )
  }

  if (!auth.isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#0A0608] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-2">Доступ запрещён</h1>
          <p className="text-white/60 mb-6">У вас нет прав для доступа к этой странице</p>
          <a href="/"><Button className="bg-red-700 text-white hover:bg-red-600 border-0">На главную</Button></a>
        </div>
      </div>
    )
  }

  const navItems: { id: Section; icon: string; label: string; superOnly?: boolean }[] = [
    { id: "dashboard", icon: "LayoutDashboard", label: "Дашборд" },
    { id: "books", icon: "BookOpen", label: "Книги" },
    { id: "logs", icon: "ScrollText", label: "Журнал действий" },
    { id: "users", icon: "Users", label: "Пользователи", superOnly: true },
  ]

  return (
    <div className="min-h-screen bg-[#0A0608] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black/40 ring-1 ring-red-900/20 flex flex-col">
        <div className="p-6 border-b border-red-900/20">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Feather" size={18} className="text-red-400" />
            <span className="font-bold tracking-widest text-sm" style={{ fontFamily: "'Cinzel', serif" }}>RED1DARK</span>
          </div>
          <p className="text-white/40 text-xs">Панель управления</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            if (item.superOnly && !isSuperAdmin) return null
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                  section === item.id
                    ? "bg-red-700/20 ring-1 ring-red-700/40 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon name={item.icon} size={18} />
                {item.label}
                {item.superOnly && (
                  <span className="ml-auto text-xs px-1.5 py-0.5 bg-red-900/40 rounded text-red-400">SA</span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-red-900/20">
          <div className="flex items-center gap-3 mb-3">
            {auth.user?.avatar_url ? (
              <img src={auth.user.avatar_url} className="w-8 h-8 rounded-full" alt="avatar" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-red-900/40 flex items-center justify-center text-sm font-bold">
                {auth.user?.name?.[0] || "?"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{auth.user?.name || auth.user?.email}</p>
              <p className="text-xs text-red-400 capitalize">{userRole}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="/" className="flex-1">
              <Button variant="ghost" className="w-full text-white/60 hover:text-white text-xs h-8 px-2">
                На сайт
              </Button>
            </a>
            <Button
              variant="ghost"
              onClick={auth.logout}
              className="flex-1 text-white/60 hover:text-red-400 text-xs h-8 px-2"
            >
              Выйти
            </Button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        {section === "dashboard" && <DashboardSection user={auth.user} role={userRole} isSuperAdmin={isSuperAdmin} />}
        {section === "books" && <BooksSection accessToken={auth.accessToken} />}
        {section === "logs" && <LogsSection logs={logs} setLogs={setLogs} accessToken={auth.accessToken} />}
        {section === "users" && isSuperAdmin && <UsersSection users={users} setUsers={setUsers} accessToken={auth.accessToken} />}
      </main>
    </div>
  )
}

function DashboardSection({ user, role, isSuperAdmin }: { user: { name?: string | null; email?: string | null } | null; role: string; isSuperAdmin: boolean }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Cinzel', serif" }}>Добро пожаловать</h1>
      <p className="text-white/60 mb-8">Панель управления сайтом Red1dark</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="rounded-2xl bg-white/5 ring-1 ring-red-900/20 p-6">
          <Icon name="User" size={24} className="text-red-400 mb-3" />
          <p className="text-white/60 text-sm mb-1">Вы вошли как</p>
          <p className="font-semibold">{user?.name || user?.email || "Администратор"}</p>
          <span className="inline-block mt-2 px-2 py-0.5 bg-red-900/30 rounded text-red-400 text-xs capitalize">{role}</span>
        </div>

        <div className="rounded-2xl bg-white/5 ring-1 ring-red-900/20 p-6">
          <Icon name="BookOpen" size={24} className="text-red-400 mb-3" />
          <p className="text-white/60 text-sm mb-1">Книг на сайте</p>
          <p className="text-3xl font-bold">3</p>
          <p className="text-white/40 text-xs mt-1">1 в работе</p>
        </div>

        <div className="rounded-2xl bg-white/5 ring-1 ring-red-900/20 p-6">
          <Icon name="Shield" size={24} className="text-red-400 mb-3" />
          <p className="text-white/60 text-sm mb-1">Доступ</p>
          <p className="font-semibold">{isSuperAdmin ? "Полный" : "Ограниченный"}</p>
          <p className="text-white/40 text-xs mt-1">{isSuperAdmin ? "Управление пользователями" : "CRUD контента"}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 ring-1 ring-red-900/20 p-6">
        <h2 className="font-semibold mb-4">Возможности вашей роли</h2>
        <div className="space-y-3">
          {[
            { label: "Управление книгами, каналами, донатами", allowed: true },
            { label: "Просмотр журнала действий", allowed: true },
            { label: "Управление пользователями (назначение ролей)", allowed: isSuperAdmin },
            { label: "Настройка Яндекс Метрики", allowed: isSuperAdmin },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${item.allowed ? "bg-green-900/40 text-green-400" : "bg-white/5 text-white/30"}`}>
                {item.allowed ? "✓" : "✗"}
              </div>
              <span className={item.allowed ? "text-white/80" : "text-white/30"}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BooksSection({ accessToken }: { accessToken: string | null }) {
  const books = [
    { id: 1, title: "Тайна Моргадии", status: "published", progress: 100 },
    { id: 2, title: "Второе дыхание", status: "published", progress: 100 },
    { id: 3, title: "Проклятие Соловков", status: "in_progress", progress: 25 },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>Книги</h1>
          <p className="text-white/60 mt-1">Управление произведениями</p>
        </div>
        <Button className="bg-red-700 text-white hover:bg-red-600 border-0 gap-2">
          <Icon name="Plus" size={16} />
          Добавить книгу
        </Button>
      </div>

      <div className="space-y-4">
        {books.map((book) => (
          <div key={book.id} className="rounded-2xl bg-white/5 ring-1 ring-red-900/20 p-6 flex items-center gap-6">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <div className="flex items-center gap-3 mt-2">
                <span className={`px-2 py-0.5 rounded text-xs ${book.status === "published" ? "bg-green-900/40 text-green-400" : "bg-red-900/40 text-red-400"}`}>
                  {book.status === "published" ? "Опубликована" : "В работе"}
                </span>
                {book.status === "in_progress" && (
                  <span className="text-white/50 text-sm">{book.progress}% написано</span>
                )}
              </div>
              {book.status === "in_progress" && (
                <div className="mt-3 w-full bg-white/10 rounded-full h-1.5">
                  <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${book.progress}%` }} />
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" className="text-white/60 hover:text-white gap-1 text-sm">
                <Icon name="Pencil" size={14} />
                Изменить
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LogsSection({ logs, setLogs, accessToken }: { logs: AdminLog[]; setLogs: (l: AdminLog[]) => void; accessToken: string | null }) {
  useEffect(() => {
    setLogs([
      { id: 1, user_name: "Red1dark", action: "login", details: null, ip_address: "127.0.0.1", created_at: new Date().toISOString() },
    ])
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Cinzel', serif" }}>Журнал действий</h1>
      <p className="text-white/60 mb-8">История действий администраторов</p>

      <div className="rounded-2xl bg-white/5 ring-1 ring-red-900/20 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-red-900/20">
              <th className="text-left p-4 text-white/60 text-sm font-medium">Пользователь</th>
              <th className="text-left p-4 text-white/60 text-sm font-medium">Действие</th>
              <th className="text-left p-4 text-white/60 text-sm font-medium">IP</th>
              <th className="text-left p-4 text-white/60 text-sm font-medium">Дата</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-red-900/10 hover:bg-white/5 transition-colors">
                <td className="p-4 text-sm">{log.user_name || "—"}</td>
                <td className="p-4 text-sm">
                  <span className="px-2 py-0.5 bg-red-900/20 rounded text-red-300 text-xs">{log.action}</span>
                </td>
                <td className="p-4 text-sm text-white/50">{log.ip_address || "—"}</td>
                <td className="p-4 text-sm text-white/50">{new Date(log.created_at).toLocaleString("ru")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 && (
          <div className="text-center py-12 text-white/40">Журнал пуст</div>
        )}
      </div>
    </div>
  )
}

function UsersSection({ users, setUsers, accessToken }: { users: AdminUser[]; setUsers: (u: AdminUser[]) => void; accessToken: string | null }) {
  useEffect(() => {
    setUsers([
      { id: 1, name: "Red1dark", email: "red1dark@example.com", role: "superadmin", yandex_id: "123", last_login_at: new Date().toISOString(), created_at: new Date().toISOString() },
    ])
  }, [])

  const changeRole = (userId: number, newRole: string) => {
    setUsers(users.map((u) => u.id === userId ? { ...u, role: newRole } : u))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Cinzel', serif" }}>Пользователи</h1>
      <p className="text-white/60 mb-8">Только суперадмин может изменять роли</p>

      <div className="rounded-2xl bg-white/5 ring-1 ring-red-900/20 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-red-900/20">
              <th className="text-left p-4 text-white/60 text-sm font-medium">Пользователь</th>
              <th className="text-left p-4 text-white/60 text-sm font-medium">Email</th>
              <th className="text-left p-4 text-white/60 text-sm font-medium">Роль</th>
              <th className="text-left p-4 text-white/60 text-sm font-medium">Последний вход</th>
              <th className="text-left p-4 text-white/60 text-sm font-medium">Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-red-900/10 hover:bg-white/5 transition-colors">
                <td className="p-4 text-sm font-medium">{user.name || "—"}</td>
                <td className="p-4 text-sm text-white/60">{user.email || "—"}</td>
                <td className="p-4 text-sm">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    user.role === "superadmin" ? "bg-red-900/40 text-red-400" :
                    user.role === "admin" ? "bg-orange-900/40 text-orange-400" :
                    "bg-white/10 text-white/50"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-sm text-white/50">
                  {user.last_login_at ? new Date(user.last_login_at).toLocaleString("ru") : "—"}
                </td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => changeRole(user.id, e.target.value)}
                    className="bg-black/40 ring-1 ring-red-900/30 text-white text-xs rounded-lg px-2 py-1 focus:outline-none"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                    <option value="superadmin">superadmin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="text-center py-12 text-white/40">Нет пользователей</div>
        )}
      </div>
    </div>
  )
}
