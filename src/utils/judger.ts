export const isNunNullable = <T>(v?: T): v is NonNullable<T> => v !== null && v !== undefined

export function exist(...args: any[]): boolean {
  return args.every(v => v !== undefined && v !== null && v !== '')
}
