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
