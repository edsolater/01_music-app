/**
 * 返回的不是 timoutID, 而是清除这个 timeout 的函数
 */
export const setClearableTimeout = (...args: Parameters<typeof window.setTimeout>) => {
  // @ts-ignore
  const timeoutID = globalThis.setTimeout(...args)
  return () => globalThis.clearTimeout(timeoutID)
}
