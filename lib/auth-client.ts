export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem("token");
  document.cookie = "token=; path=/; max-age=0";
  window.location.href = "/admin/login";
}