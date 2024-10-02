const APP_NAME = "projetin_esinco";

export async function getStorageData(key = APP_NAME) {
  const storagedData = localStorage.getItem(key);
  return storagedData ? JSON.parse(storagedData) : null;
}

export async function setStorageData(data, key = APP_NAME) {
  localStorage.setItem(key, JSON.stringify(data));
}

export async function clearStorageData(key = APP_NAME) {
  localStorage.removeItem(key);
}
