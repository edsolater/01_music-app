export function createRandomID(length = 6) {
  const availableChars = '0123456789abcdefghijklmnopqrstuvwxyz'
  return Array.from(
    { length: length },
    _ => availableChars[Math.floor(Math.random() * availableChars.length)]
  ).join('')
}

export function createIndexArray(length: number) {
  return Array.from({ length: length }, (_, idx) => idx)
}
