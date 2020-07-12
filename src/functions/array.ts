/**
 * 浅拷贝数组，在数组的每两项间的空隙，插入值
 * @param target 目标数组
 * @param toInsert 中间插入的值
 * @example
 * fillArrayGap(['hello','world','!'],1) => ['hello', 1, 'world', 1, '!']
 */
export function fillGap<T, K>(target: T[], toInsert: K): (T | K)[] {
  const copyed: (T | K)[] = []
  for (let i = 0; i < target.length - 1; i++) {
    copyed.push(target[i], toInsert)
  }
  copyed.pop()
  return copyed
}

/**
 * 创造有初始长度的数组，默认空值为undefined
 * @param length 数组长度
 * @param fill 空位置上的值，默认undefined
 * @example
 * createArray(3) => [undefined, undefined, undefined]
 * createArray(3, 'ha') => ['ha', 'ha', 'ha']
 * createArray(3, i => i) => [0, 1, 2]
 */
export function createArray<T = undefined>(length: number, fill?: T | ((idx: number) => T)): T[] {
  if (typeof fill === 'function') {
    //@ts-ignore
    return Array.from({ length }, (_, i) => fill(i))
  } else {
    //@ts-ignore
    return Array.from({ length }, () => fill)
  }
}
// IDEA 批处理，类似 listDo(target, action1, action2) => newList
