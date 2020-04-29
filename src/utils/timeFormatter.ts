export const formatSeconds = (totalSeconds = 0, formatSting = 'mm:ss') => {
  const minutes = Math.floor(totalSeconds / 60)
  const secondes = totalSeconds - 60 * minutes
  return `${String(minutes).padStart(2, '0')}:${String(secondes).padStart(2, '0')}`
}
