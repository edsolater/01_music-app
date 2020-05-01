export const isNunNullable = <T>(v?: T): v is NonNullable<T> => v !== null && v !== undefined

export const assert = (condition: any, msg = 'assert fail'): asserts condition => {
  if (!condition) {
    throw new Error(msg)
  }
}
