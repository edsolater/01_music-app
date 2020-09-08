/********************
 * 测试JavaScript运算性能
 *
 *********************/

const testArr = Array.from({ length: 10000 }, (_, i) => i)

let start = 0
let end = 0

/* -------------------------------------------------------------------------- */

let copyedArr1 = testArr.slice()
start = Date.now()
for (let i = 0; i < 1000; i++) {
  copyedArr1 = copyedArr1.map(n => n + 1)
}
end = Date.now()
console.log(end - start)

/* -------------------------------------------------------------------------- */

let copyedArr2 = testArr.slice()
start = Date.now()
for (let i = 0; i < 500; i++) {
  copyedArr2 = copyedArr2.map(n => n + 1).map(n => n + 1)
}
end = Date.now()
console.log(end - start)

/* -------------------------------------------------------------------------- */

let copyedArr3 = testArr.slice()
start = Date.now()
for (let i = 0; i < 500; i++) {
  copyedArr3 = copyedArr3.map(n => n + 1 + 1)
}
end = Date.now()
console.log(end - start)
