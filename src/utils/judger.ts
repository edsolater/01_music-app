export const isNunNullable = <T>(v?: T): v is NonNullable<T> => v !== null && v !== undefined
