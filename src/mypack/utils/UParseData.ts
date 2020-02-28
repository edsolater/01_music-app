/***************
 *
 * 此文件用于提供预处理数据的简单函数
 *
 ***************/
export function wrapToArray(item: any) {
  if (Array.isArray(item)) return item
  else return [item]
}
/**
 * 从url的参数中提取并转换基本变量（boolean\number\string）
 * @param searchSting window.location.search 字符串
 */
export const parseUrlParams = (searchSting = '?example=true&id=sdfsdf') => {
  const paramsString = searchSting.slice(1)
  const paramsObject = {}
  paramsString.split('&').forEach(pair => {
    let [key, value] = pair.split('=')
    try {
      value = JSON.parse(value)
    } catch {}
    paramsObject[key] = value
  })
  return paramsObject
}
