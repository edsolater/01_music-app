/***************
 * 
 * 此文件用于提供预处理数据的简单函数
 * 
 ***************/
export function wrapToArray(item: any) {
  if (Array.isArray(item)) return item
  else return [item]
}
