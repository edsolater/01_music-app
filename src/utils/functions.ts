/**TODO 这四个方法只是dayjs的format方法，要合并成一个
 * 格式化输出日期
 * @param timestamp 可被new Date 解析的即可
 * @param format 格式
 */
export function formatDateString(
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
 * 格式化输出时间
 * @param milliseconds 毫秒数
 * @param format 格式
 */
export function formatTimeNumber(
  milliseconds: TimeNumber | undefined,
  format: '-' | '时分' | '- nozero' | '时分 nozero' = '-'
): string {
  if (!milliseconds) return ''
  switch (format) {
    case '-': {
      const seconds = Math.round(milliseconds / 1000)
      return `${Math.trunc(seconds / 60)
        .toString()
        .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`
    }
    default:
      return 'unknown'
  }
}
/**
 * 返回今天是星期几
 * @param format 格式字符串（将会被替换）
 */
export function getDay(format: '星期x' | '周x' = '周x') {
  const date = new Date()
  const day = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
  return format.replace(/x/, day)
}
/**
 * 返回今天是几号
 * @param format 格式字符串（将会被替换）
 */
export function getDate() {
  const date = new Date()
  return String(date.getDate())
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
