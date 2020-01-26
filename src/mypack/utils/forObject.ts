export function pick<O>(target: O, propNames?: (keyof O)[]) {
  if (typeof target !== 'object' || target === null) return
  let newObject:Partial<O> = {}
  propNames?.forEach((propName) => {
    newObject[propName] = target[propName]
  })
  return newObject
}

export function deAssign<O>(target: O, propNames?: (keyof O)[]) {
  if (typeof target !== 'object' || target === null) return
  propNames?.forEach(propName=>{
    delete target[propName]
  })
  return target
}