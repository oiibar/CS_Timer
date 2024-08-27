export function getToken() {
  const data = localStorage.getItem("token");
  const token = data ? JSON.parse(data) : "";
  return token;
}

export function setToken(key: string, token: string) {
  localStorage.setItem(key, JSON.stringify(token));
}

export function removeToken(key: string) {
  localStorage.removeItem(key);
}
