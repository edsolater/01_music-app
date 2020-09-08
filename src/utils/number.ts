export const clamp = (num = NaN, between = [0, 1]) => {
  const max = Math.max(...between)
  const min = Math.min(...between)
  if (num < min) num = min
  if (num > max) num = max
  return num
}
