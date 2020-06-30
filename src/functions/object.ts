/**
 * 提取对象的某些属性（immutable）（该属性非undefined时才会被提取）
 * @param target 目标对象
 * @param propertyNames 属性名
 * @example
 * const a = {a:3, b: 'hello', c: true}
 * const foo = pick(a, 'a', 'b') // {a: 3, b: 'hello'}
 * type d = typeof foo // {a: number; b: string;}
 */
export function pick<T extends AnyObject, K extends (keyof T)[]>(
  target: T,
  ...propertyNames: K
): Pick<T, K[number]> {
  return propertyNames.reduce((acc, propName) => {
    const value = target[propName]
    if (value !== undefined) {
      acc[propName] = value
    }
    return acc
  }, {} as any)
}

/**
 * 踢出对象的某些属性（immutable）
 * @param target 目标对象
 * @param propertyNames 属性名
 * @example
 * const a = { a: 3, b: 'hello', c: true }
 * const foo = omit(a, 'a', 'c') // {b: 'hello'}
 * type d = typeof foo // {b: string}
 */
export function omit<T extends AnyObject, K extends (keyof T)[]>(
  target: T,
  ...propertyNames: K
): Omit<T, K[number]> {
  return propertyNames.reduce(
    (acc, propName) => {
      delete acc[propName]
      return acc
    },
    { ...target } as any
  )
}

/**
 * 合并两个对象
 * TODO - 需要测试测试再测试
 * @param objs 需要合并的对象
 */
export function mergeObjects<T, U>(obj1: T, obj2: U): T & U
export function mergeObjects<T, U, V>(obj1: T, obj2: U, obj3: V): T & U & V
export function mergeObjects<T, U, V, W>(obj1: T, obj2: U, obj3: V, obj4: W): T & U & V & W
export function mergeObjects<T>(...objs: T[]): T
export function mergeObjects(...objs) {
  const result = {}
  Object.keys(Object.assign({}, ...objs)).forEach(key => {
    const values = objs.map(prop => prop[key]).filter(Boolean)
    if (key === 'a') {
      result[key] = values.reduce((a, b) => a + b)
    } else if (values.every(value => typeof value === 'object')) {
      result[key] = mergeObjects(...values)
    } else if (values.every(value => typeof value === 'function')) {
      result[key] = (...args) => values.map(fn => fn(...args))
    } else {
      result[key] = values[values.length - 1]
    }
  })
  // @ts-ignore
  return result
}

/**
 * 返回对象的某个属性
 * 返回函数的函数都以will开头
 * TODO - 需要测试测试再测试
 */
export const willGetProperty = (key: string) => (obj: AnyObject) => obj[key]
