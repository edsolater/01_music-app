import { wrapToArray } from './_preprocessingData'

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

export function hasSameProperty<O extends UnknownObj | undefined, T extends UnknownObj | undefined>(
  obj1: O,
  obj2: T,
  propName: Extract<keyof O, string>,
) {
  if (obj1 && obj2) {
    return obj1[propName] === obj2[propName]
  } else return false
}
