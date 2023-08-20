export function getLocalData(): string[] | null {
  const token = localStorage.getItem("accessToken");
  const name = localStorage.getItem("givenName");

  if (token && name) {
    return [token, name];
  } else {
    return null;
  }
}