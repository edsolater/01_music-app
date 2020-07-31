export function getDateString(
  timestamp: TimeNumber | undefined,
  symbol: '-' | '年月日' | '- nozero' | '年月日 nozero' = '-'
): string {
  if (!timestamp) return ''
  const dateObj = new Date(timestamp)
  switch (symbol) {
    case '-':
      return `${dateObj.getFullYear()}-${dateObj
        .getMonth()
        .toString()
        .padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`
    default:
      return 'unknown'
  }
}
