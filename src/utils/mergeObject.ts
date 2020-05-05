const mergeObjects = <T extends AnyObject, U extends AnyObject>(
  objA: T,
  objB: U,
): (T & U) | undefined => {
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

export default mergeObjects
