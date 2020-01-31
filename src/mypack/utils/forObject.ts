import { wrapToArray } from './_preprocessingData'

export function pick<O>(target: O, propNames?: (keyof O)[] | keyof O | string[]) {
  if (typeof target !== 'object' || target === null) return
  let newObject: Partial<O> = {}
  wrapToArray(propNames)?.forEach((propName) => {
    newObject[propName] = target[propName]
  })
  return newObject
}

export function deAssign<O>(target: O, propNames?: (keyof O)[] | keyof O) {
  if (typeof target !== 'object' || target === null) return
  wrapToArray(propNames)?.forEach((propName) => {
    delete target[propName]
  })
  return target
}
