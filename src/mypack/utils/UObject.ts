import { wrapToArray } from './UParseData'

export function pick<O>(target: O, propNames?: (keyof O)[] | keyof O | string[]) {
  if (typeof target !== 'object' || target === null) return
  let newObject: Partial<O> = {}
  wrapToArray(propNames).forEach((propName) => {
    if (propName in target) {
      newObject[propName] = target[propName]
    }
  })
  return newObject
}

export function deAssign<O>(target: O, propNames?: (keyof O)[] | keyof O) {
  if (typeof target !== 'object' || target === null) return
  wrapToArray(propNames).forEach((propName) => {
    delete target[propName]
  })
  return target
}

export function hasSameProperty<O extends UnknownObj | undefined>(
  obj1: O,
  obj2: UnknownObj | undefined,
  propName: Extract<keyof O, string>,
) {
  if (obj1 && obj2) {
    return obj1[propName] === obj2[propName]
  } else return false
}

//TODO:返回的类型太过简单粗暴，不能这么写
export function mergeObjects<
  T extends { [key: string]: unknown },
  U extends { [key: string]: unknown }
>(objA: T, objB: U): (T & U) | undefined {
  if (typeof objA !== 'object' || typeof objB !== 'object') return
  const newObject: { [key: string]: unknown } = { ...objA }
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
