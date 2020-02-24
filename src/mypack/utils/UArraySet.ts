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
const canInterset = <T, U>(arrA: T[], arrB: U[]) =>
  arrB.some(itemB => arrA.includes(itemB as any))
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
// TODO: 想想怎么继承es6的Array呢？A:这会使层混乱，不是个好想法
//
class _UArraySet<T> {
  constructor(private arr: T[]) {}
  get value() {
    return this.arr
  }
  get lastIndex() {
    return this.arr.length - 1
  }
  get lastItem() {
    return this.arr[this.lastIndex]
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

  intersectWidth = intersect.bind(this, this.arr)
  exclusiveOrWidth = exclusiveOr.bind(this, this.arr)
  unionWidth = union.bind(this, this.arr)
  substractWidth = substract.bind(this, this.arr)

  canIntersetWith = canInterset.bind(this, this.arr)
  canDisjointWith = canDisjoint.bind(this, this.arr)
  isSupersetOf = isSupersetOf.bind(this, this.arr)
  isSubsetOf = isSubsetOf.bind(this, this.arr)
  isEqualWith = areEqual.bind(this, this.arr)
}
export const UArraySet = <T>(arr: T[]) => new _UArraySet(arr)

UArraySet.intersect = intersect
UArraySet.exclusiveOr = exclusiveOr
UArraySet.union = union
UArraySet.substract = substract

UArraySet.canInterset = canInterset
UArraySet.canDisjoint = canDisjoint
UArraySet.areEqual = areEqual

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
