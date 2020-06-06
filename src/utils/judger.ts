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
export function isMeaningful(val): val is {} {
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
