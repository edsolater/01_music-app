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

/**
 * @TODO 如果第一参数是target对象的话，就不用返回函数了，直接返回值
 *
 * closure 返回函数的函数
 * 提取对象的某个值，保证智能提示完好
 *
 *
 * 目的是：为了读代码时能从单词中独出语义，而不是从符号中
 *
 * @param propName 属性名
 * @example
 * const arr = [{ abbb: 'hello' }, { abbb: 'world' }, {}]
 * const b = arr.map(getProperty('a')) // const b: string[]
 */
export const getProperty = <T, P extends keyof T>(propName: P) => (
  obj: T
): T extends Object ? T[P] : undefined => {
  //@ts-ignore
  if (!obj || typeof obj !== 'object') return undefined
  //@ts-ignore
  return obj[propName]
}

export const isNullish = val => val === undefined || val === null
export const notNullish = val => val !== undefined && val !== null

//IDEA: 原来已经有属性了就自动添加成对象 addProperty(obj, 'key', value)。毙掉，太烦了
export const bucketAdd = <O>(obj: O, propName: keyof O, value: any) => {
  if (notNullish(obj[propName])) {
    //@ts-ignore
    obj[propName] = [obj[propName], value]
  } else {
    obj[propName] = value
  }
}
export const wrapArray = <T>(val: T): T extends Array<any> ? T : T[] =>
  //@ts-ignore
  Array.isArray(val) ? val : [val]

// const _toggleStringList = [
//   ['on', 'off'],
//   ['up','right','down','left'],
//   []
// ]
// const _toggleStringMap = new Map(_toggleStringList)
// export const toggleValue = <T>(val: T): T => {
//   if (val === false) {
//     return true
//   } else {
//     return val
//   }
// }

/**
 * 简单地输出数组字符串，(如果不是数组，就输出空字符串)
 * @param val 需要转化的变量/属性
 */
export const toArrayString = (arr: any[]): string => {
  if (Array.isArray(arr)) return arr.toString()
  else return ''
}

/**
 * 记忆一个函数函数：对相同的输入，直接返回输出，不重新计算了。
 * **注意** 只适用于纯函数
 * **注意** 非大计算量的函数不要缓存，大概率反而会更快。这是迫不得已用的
 * @param fn 要缓存的函数
 * @param keyFunc=hello 从函数参数映射出缓存用的键
 * @see https://segmentfault.com/a/1190000023384154
 */
export const memorize = <T extends (...args: any[]) => any>(
  fn: T,
  keyFunc?: (...args: Parameters<T>) => any
) => {
  // @ts-ignore
  const memorizedFn: typeof fn & { cache: Map<any, any> } = (...args) => {
    //TODO：这样的话就不会垃圾处理了，所以可能会缓存爆炸
    const cache = memorizedFn.cache
    // @ts-ignore
    const argKey = keyFunc ? keyFunc(...args) : args[0]
    if (cache.has(argKey)) {
      return cache.get(argKey)
    } else {
      const result = fn(...args)
      cache.set(argKey, result)
      return result
    }
  }
  memorizedFn.cache = new Map()
  return memorizedFn
}
