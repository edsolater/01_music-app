export const setToLocalStorage = (key: string, value: string) =>
  window.localStorage.setItem(key, value)

export const getFromLocalStorage = (key: string) => window.localStorage.getItem(key)
