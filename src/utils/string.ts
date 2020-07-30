export function getQueryString(params: { [key: string]: any } = {}) {
  return `${Object.entries(params)
    .map(pair => pair.map(encodeURIComponent).join('='))
    .join('&')}`
}
