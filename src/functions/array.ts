export function insert<T extends any, K extends any>(target: T[], toInsert: K): (T | K)[] {
  const copyed = [...target]
  for (let i = 0; i < target.length - 1; i++) {
    // @ts-expect-error
    copyed.splice(2 * i + 1, 0, toInsert)
  }
  return copyed
}
