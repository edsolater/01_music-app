/**
 * 格式化输出日期
 * @param timestamp 可被new Date 解析的即可
 * @param format 格式
 */
export function getDateString(
  timestamp: TimeNumber | undefined,
  format: '-' | '年月日' | '- nozero' | '年月日 nozero' = '-'
): string {
  if (!timestamp) return ''
  const dateObj = new Date(timestamp)
  switch (format) {
    case '-':
      return `${dateObj.getFullYear()}-${dateObj
        .getMonth()
        .toString()
        .padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`
    default:
      return 'unknown'
  }
}

/**
 * 左填充
 * @param content 需要左填充的字段（会转成string）
 * @param number 固定的最大长度
 * @param fill 填充物
 */
export function padLeft(
  content: number | string | undefined,
  number: number,
  fill: string | number
) {
  if (content) {
    return String(content).padStart(number, String(fill))
  } else {
    return ''
  }
}
