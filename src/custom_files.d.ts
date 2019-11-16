//想要在 TypeScript 中使用非代码资源(non-code asset)，我们需要告诉 TypeScript 推断导入资源的类型。

/**
 * 为jpg图片申明一个类型
 */
declare module '*.jpg' {
  const url: string
  export default url
}
/**
 * 为png图片申明一个类型
 */
declare module '*.png' {
  const url: string
  export default url
}
/**
 * 为svg图片申明一个类型
 */
declare module '*.svg' {
  const url: string
  export default url
}
