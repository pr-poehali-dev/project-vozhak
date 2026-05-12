const AUTH_BASE = "https://functions.poehali.dev/98f757f6-ce60-4393-9a00-ddd9b6a7f5f3"

export const AUTH_URLS = {
  authUrl: `${AUTH_BASE}?action=auth-url`,
  callback: `${AUTH_BASE}?action=callback`,
  refresh: `${AUTH_BASE}?action=refresh`,
  logout: `${AUTH_BASE}?action=logout`,
}
