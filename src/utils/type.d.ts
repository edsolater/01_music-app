declare type Filter = Judger // alias
declare type Mapper = (...any: any[]) => any
declare type Judger = (...any: any[]) => boolean
declare type Comparator = (x: any, y: any) => boolean
declare type AsyncFunction = (...any: any[]) => Promise<any>
declare type WrappedFunction = { (...any: any[]): any; [layout: string]: any }
declare type CashedFunction = Function & { cache: any }
declare type UnknownObj = { [propName: string]: any }
declare type Util = Function

/**
 * Creates a union from the types of an Array or tuple
 */
type UnionOf<T extends any[]> = T[number]

/**
 * Returns the length of an array or tuple
 */
type GetLength<T extends any[]> = T['length']

/**
 * Returns all but the first item's type in a tuple/array
 */
declare type Tail<T extends any[]> = ((...args: T) => any) extends (
  head: any,
  ...tail: infer R
) => any
  ? R
  : never

/**
 * Returns the given tuple/array with the item type prepended to it
 */
type Unshift<T extends any[], Item> = ((first: Item, ...rest: T) => any) extends (
  ...list: infer R
) => any
  ? R
  : never

/**
 * Tests if two types are equal
 */
type Equals<T, S> = [T] extends [S] ? ([S] extends [T] ? true : false) : false

// export type Range<N, T extends number[] = []> = {
//   0: T
//   1: Range<N, Unshift<T, GetLength<T>>>
// }[Equals<GetLength<Tail<T>>, N> extends true ? 0 : 1]

// /** Tests if N > M */
// declare type IsGreaterThan<N, M> = N extends Exclude<Range<N>, Range<M>> ? true : false;
// /** Tests if N <= M */
// type IsLessThanOrEqual<N, M> = Not<IsGreaterThan<N, M>>;
// /** Tests if N < M */
// type IsLessThan<N, M> = M extends Exclude<Range<M>, Range<N>> ? true : false;
// /** Tests if N >= M */
// type IsGreaterThanOrEqual<N, M> = Not<IsLessThan<N, M>>;

type MinusOne<T extends number> = [
  -1,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  62,
][T]

declare type LastType<T extends any[]> = T[MinusOne<GetLength<T>>]
declare type FirstType<T extends any[]> = T[0]

declare type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & { length: TLength }
