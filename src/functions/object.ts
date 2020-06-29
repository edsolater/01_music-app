export function mergeObjects<T extends AnyObject, U extends AnyObject>(
  objA: T,
  objB: U
): (T & U) | undefined {
  if (typeof objA !== 'object' || typeof objB !== 'object') return
  const newObject: AnyObject = { ...objA }
  Object.entries(objB).forEach(([key, valueB]) => {
    const valueA = objA[key]
    if (Array.isArray(valueA) && Array.isArray(valueB)) {
      newObject[key] = [...valueA, ...valueB]
    } else if (
      typeof valueA === 'object' &&
      valueA !== null &&
      typeof valueB === 'object' &&
      valueB !== null
    ) {
      newObject[key] = { ...valueA, ...valueB }
    } else if (typeof valueA === 'function' && typeof valueB === 'function') {
      newObject[key] = (...params) => {
        valueA(...params)
        valueB(...params)
      }
    } else {
      newObject[key] = valueB
    }
  })
  return (newObject as unknown) as T & U
}

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
