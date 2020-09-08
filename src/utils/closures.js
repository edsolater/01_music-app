/**
 * 柯里化任意函数
 * @template {Function} F
 * @param {F} fn
 * @param {number} [originalParamsLength] 参数个数，默认为：待柯里化函数的长度
 * @param {any[]} [_params] 已记录在案的参数
 * @returns F //TODO：这个类型估计会很麻烦，但没有类型信息又是不能用的
 */
const currying = (fn, originalParamsLength = fn.length, _params = []) => {
  if (fn.isCurried) return fn
  function curried(...args) {
    if (curried.params.length + args.length >= curried.originalParamsLength) {
      return curried.originalFn(...curried.params, ...args)
    } else {
      return currying(curried.originalFn, curried.originalParamsLength, [
        ...curried.params,
        ...args
      ])
    }
  }
  // 将函数的状态挂载在属性上，方便debug
  curried.isCurried = true
  curried.params = _params
  curried.originalParamsLength = originalParamsLength
  curried.originalFn = fn
  return curried
}

/**
 * 判断
 * 是否是柯里化函数
 * @param {*} fn
 * @returns {boolean}
 */
function isCurried(fn) {
  return typeof fn === 'function' && fn.isCurried === true
}
