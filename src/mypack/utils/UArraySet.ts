//
//
// —————————————— 使用数组的集合算法 ——————————————
//
//把相交的两个集合数组，分成三个部分
const _splitArrayParts = <T, U>(arrA: T[], arrB: U[]) => {
  const partA: (U | T)[] = []
  const partAB: (U | T)[] = []
  const partB: (U | T)[] = []
  for (const item of [...new Set(arrA.concat(arrB as any[]))] as (T | U)[]) {
    const inA = arrA.includes(item as any)
    const inB = arrB.includes(item as any)
    if (inA && inB) partAB.push(item)
    else if (inA) partA.push(item)
    else if (inB) partB.push(item)
  }
  return [partA, partAB, partB] as const
}

//交集、差集、并集（集合加法）、集合减法
const intersect = <T, U>(arrA: T[], arrB: U[]) => {
  const [, partAB] = _splitArrayParts(arrA, arrB)
  return partAB
}
const exclusiveOr = <T, U>(arrA: T[], arrB: U[]) => {
  const [partA, , partB] = _splitArrayParts(arrA, arrB)
  return partA.concat(partB)
}
const union = <T, U>(arrA: T[], arrB: U[]) => {
  const [partA, partAB, partB] = _splitArrayParts(arrA, arrB)
  return partA.concat(partAB).concat(partB)
}
const substract = <T, U>(arrA: T[], arrB: U[]) => {
  const [partA] = _splitArrayParts(arrA, arrB)
  return partA
}

//
//
// —————————————— 判断两个数组关系 ——————————————
//
// 判断A与B相交
const canInterset = <T, U>(arrA: T[], arrB: U[]) => arrB.some(itemB => arrA.includes(itemB as any))
// 判断A与B毫不相干
const canDisjoint = <T, U>(arrA: T[], arrB: U[]) =>
  arrB.every(itemB => !arrA.includes(itemB as any))
// 判断A是B的超集
const isSupersetOf = <T, U>(arrA: T[], arrB: U[]) =>
  arrB.every(itemB => arrA.includes(itemB as any))
// 判断A是B的子集
const isSubsetOf = <T, U>(arrA: T[], arrB: U[]) => arrA.every(itemA => arrB.includes(itemA as any))
// 判断内容相等
const areEqual = <T extends unknown, U extends unknown>(arrA: T[], arrB: U[]) =>
  arrA.length === arrB.length && arrA.every((itemA, idx) => itemA === arrB[idx])

//
//
// ———————————— 定义包装类 ——————————————
//
export const UArraySet = <T>(arr: T[]) => new _UArraySet(arr)
UArraySet.intersect = intersect
UArraySet.exclusiveOr = exclusiveOr
UArraySet.union = union
UArraySet.substract = substract
/**
 * TODO：注释也可以放在这儿，最好能链接，
 */
UArraySet.canInterset = canInterset
UArraySet.canDisjoint = canDisjoint
UArraySet.areEqual = areEqual
class _UArraySet<T> {
  constructor(private arr: T[]) {}
  get value() {
    return this.arr
  }
  get length() {
    return this.arr.length
  }
  get lastIndex() {
    return this.arr.length - 1
  }
  get isEmpty() {
    return this.arr.length === 0
  }

  // self开头，代表返回的依旧是同类型
  map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any) {
    return new _UArraySet(this.arr.map(callbackfn, thisArg))
  }
  trim() {
    return new _UArraySet(
      this.arr.filter(item => item !== undefined && item !== null) as Exclude<
        T,
        undefined | null
      >[],
    )
  }

  /**
   * 求交集 (A ∩ B)
   * @param arrB 另一个数组
   */
  intersectWidth<T>(arrB: T[]) {
    return new _UArraySet(intersect(this.arr, arrB))
  }
  /**
   * 求亦或集合 (A ∪ B - A ∩ B)
   * @param arrB 另一个数组
   */
  exclusiveOrWidth<T>(arrB: T[]) {
    return new _UArraySet(intersect(this.arr, arrB))
  }
  /**
   * 求并集 (A ∪ B )
   * @param arrB 另一个数组
   */
  unionWidth<T>(arrB: T[]) {
    return new _UArraySet(intersect(this.arr, arrB))
  }
  /**
   * 求差集 (A - B)
   * @param arrB 另一个数组
   */
  substractWidth<T>(arrB: T[]) {
    return new _UArraySet(intersect(this.arr, arrB))
  }
  /**
   * 判断相交
   * @param arrB 另一个数组
   */
  canIntersetWith<T>(arrB: T[]) {
    return canInterset(this.arr, arrB)
  }
  /**
   * 判断不相交
   * @param arrB 另一个数组
   */
  canDisjointWith<T>(arrB: T[]) {
    return canDisjoint(this.arr, arrB)
  }
  /**
   * 判断是超集
   * @param arrB 另一个数组
   */
  isSupersetOf<T>(arrB: T[]) {
    return isSupersetOf(this.arr, arrB)
  }
  /**
   * 判断是子集
   * @param arrB 另一个数组
   */
  isSubsetOf<T>(arrB: T[]) {
    return isSubsetOf(this.arr, arrB)
  }
  /**
   * 判断集合相等
   * @param arrB 另一个数组
   */
  isEqualWith<T>(arrB: T[]) {
    return areEqual(this.arr, arrB)
  }
}

//
//
// ———————————— test ——————————————
//
console.log(canInterset([2, 4], [2, 4, 1, 3]))
console.log(UArraySet.canInterset([27], [2, 4, 1, 3]))
console.log(UArraySet([2, 4, 5]).isEqualWith([2, 4, 5]))
console.log(
  UArraySet([2, 4, 5, undefined])
    .trim()
    .map(item => 3 * item)
    .map(i => i * 4).value,
)
