
/**
 * 顺序拼接（同步函数），以形成一个新函数
 * @example
 * const add_console = pipe(
 *  (x, y) => x + y,
 *  (n) => console.log('n: ', n),
 *)
 */
const pipe: {
  // 就写1~10个参数，满足基本情况即可
  <Inputs extends any[], Return>(f1: (...arg1: Inputs) => Return): (...args: Inputs) => Return
  <Inputs extends any[], T1, Return>(f1: (...arg1: Inputs) => T1, f2: (arg2: T1) => Return): (
    ...args: Inputs
  ) => Return
  <Inputs extends any[], T1, T2, Return>(
    f1: (...arg1: Inputs) => T1,
    f2: (arg2: T1) => T2,
    f3: (arg3: T2) => Return
  ): (...args: Inputs) => Return
  <Inputs extends any[], T1, T2, T3, Return>(
    f1: (...arg1: Inputs) => T1,
    f2: (arg2: T1) => T2,
    f3: (arg3: T2) => T3,
    f4: (arg4: T3) => Return
  ): (...args: Inputs) => Return
  <Inputs extends any[], T1, T2, T3, T4, Return>(
    f1: (...arg1: Inputs) => T1,
    f2: (arg2: T1) => T2,
    f3: (arg3: T2) => T3,
    f4: (arg4: T3) => T4,
    f5: (arg5: T4) => Return
  ): (...args: Inputs) => Return
  <Inputs extends any[], T1, T2, T3, T4, T5, Return>(
    f1: (...arg1: Inputs) => T1,
    f2: (arg2: T1) => T2,
    f3: (arg3: T2) => T3,
    f4: (arg4: T3) => T4,
    f5: (arg4: T4) => T5,
    f6: (arg5: T5) => Return
  ): (...args: Inputs) => Return
  <Inputs extends any[], T1, T2, T3, T4, T5, T6, Return>(
    f1: (...arg1: Inputs) => T1,
    f2: (arg2: T1) => T2,
    f3: (arg3: T2) => T3,
    f4: (arg4: T3) => T4,
    f5: (arg4: T4) => T5,
    f6: (arg4: T5) => T6,
    f7: (arg5: T6) => Return
  ): (...args: Inputs) => Return
  <Inputs extends any[], T1, T2, T3, T4, T5, T6, T7, Return>(
    f1: (...arg1: Inputs) => T1,
    f2: (arg2: T1) => T2,
    f3: (arg3: T2) => T3,
    f4: (arg4: T3) => T4,
    f5: (arg4: T4) => T5,
    f6: (arg4: T5) => T6,
    f7: (arg4: T6) => T7,
    f8: (arg5: T7) => Return
  ): (...args: Inputs) => Return
  <T extends Tuple<any, 10>>(...fns: T): (
    ...args: Parameters<FirstType<T>>
  ) => ReturnType<LastType<T>>
} = (...fns: Function[]) => (...args) => fns.reduce((chain, fn) => fn(chain(...args)))
 export default pipe