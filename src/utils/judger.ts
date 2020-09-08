export const isNunNullable = <T>(v?: T): v is NonNullable<T> => v !== null && v !== undefined

/**
 * 确保值是非空值
 * （typescript限制不能使用rest parameter，进行类型推断。故此函数只是判断单个值）
 * @param val 值
 */
export function exist(val): val is {} {
  return val !== undefined && val !== null
}

/**
 * 确保值是有意义的值（空字符串、NaN、undefined、null都算无意义的值）
 * （typescript限制不能使用rest parameter，进行类型推断。故此函数只是判断单个值）
 * @param val 值
 */
export function meaningful(val): val is {} {
  if (val === 0 || val === false) {
    return true
  } else {
    return Boolean(val)
  }
}

export function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg)
  }
}

/**
 * 浅比较2个对象是否相同
 * @param a
 * @param b
 */
export function isShallowEqual(a: any, b: any): boolean {
  const typeA = typeof a
  const typeB = typeof b
  if (typeA === 'object' && typeB === 'object') {
    const countA = Object.values(a).length
    const countB = Object.values(b).length
    if (countA === countB) {
      return Object.keys(a).every(key => a[key] === b[key])
    } else {
      return false
    }
  } else if (typeA === typeB) {
    return typeA === typeB
  } else {
    return false
  }
}

/**
 * 检查不是默认值或undefined或null
 * 默认值：string:''; number:0; boolean:false; Object:(没有属性的)
 * @param value
 * @example
 * notDefaultValue([]) => false
 * notDefaultValue({}) => false
 * notDefaultValue(undefined) => false
 */
export function notDefaultValue(value: any): boolean {
  if (value === undefined || value === null) return false
  else if (typeof value === 'object') return Boolean(Object.keys(value).length)
  else return Boolean(value)
}

/**
 * **pure** 比较函数
 * 比较两者值的长度是否相等（两者必须都有length属性）
 * @param a 两者之一
 * @param b 两者之一
 * @example
 * isEqualLength('ef','hh') // false
 */
export const isEqualLength = (a: { length: number }, b: { length: number }): boolean =>
  a.length === b.length

console.log(isEqualLength('ef', 'hh'))
