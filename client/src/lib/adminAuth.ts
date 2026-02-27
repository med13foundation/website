const STORAGE_KEY = "admin_token";

export function getAdminToken(): string | null {
  return sessionStorage.getItem(STORAGE_KEY);
}

export function setAdminToken(token: string) {
  sessionStorage.setItem(STORAGE_KEY, token);
}

export function clearAdminToken() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function isAdminAuthenticated(): boolean {
  return !!getAdminToken();
}

export async function adminFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getAdminToken();
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(url, { ...options, headers });
}
