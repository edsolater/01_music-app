type ITimeStamp = string //2020-2-16 18:22:33

//-----------------日期时间比较函数---------------
export const countYearBetween = (a: ITimeStamp, b: ITimeStamp) => countYear(a) - countYear(b)
export const countMonthBetween = (a: ITimeStamp, b: ITimeStamp) => countMonth(a) - countMonth(b)
export const countDayBetween = (a: ITimeStamp, b: ITimeStamp) => countDay(a) - countDay(b)
export const countHourBetween = (a: ITimeStamp, b: ITimeStamp) => countHour(a) - countHour(b)
export const countMinuteBetween = (a: ITimeStamp, b: ITimeStamp) => countMinute(a) - countMinute(b)
export const countSecondBetween = (a: ITimeStamp, b: ITimeStamp) => countSecond(a) - countSecond(b)
export const countRoughTimeBetween = (
  a: ITimeStamp,
  b: ITimeStamp,
  unit = ['年', '月', '日', '小时', '分', '秒'],
) => {
  if (countDayBetween(a, b) > 0) return String(countDayBetween(a, b)) + unit[2]
  if (countHourBetween(a, b) > 0) return String(countHourBetween(a, b)) + unit[3]
  if (countDayBetween(a, b) > 0) return String(countDayBetween(a, b)) + unit[4]
  if (countSecondBetween(a, b) > 0) return String(countSecondBetween(a, b)) + unit[4]
}

//-------------------日期格式化工具与判断工具------------------------

export const isLeapYear = (yearNumber: number) => yearNumber % 4 === 0 && yearNumber % 100 !== 0
export const getDayInMonth = (monthNumber: number, isLeapYear = false) => {
  switch (monthNumber) {
    case 1:
      return 31
    case 2:
      return isLeapYear ? 28 : 29
    case 3:
      return 31
    case 4:
      return 30
    case 5:
      return 31
    case 6:
      return 30
    case 7:
      return 31
    case 8:
      return 31
    case 9:
      return 30
    case 10:
      return 31
    case 11:
      return 30
    case 12:
      return 31
    default:
      return 0
  }
}

//------------------分析一个日期时间中的各项（年、月、日、小时、分钟、秒）-------------------
export function countDaysInMonth(timeString: ITimeStamp) {
  const [year, month] = parseTimestamp(timeString)
  let result = 0
  for (let m = 0; m < month; m++) {
    result += getDayInMonth(m, isLeapYear(year))
  }
  return result
}
export function countYear(timeString: ITimeStamp) {
  const [year] = parseTimestamp(timeString)
  return year
}
export function countMonth(timeString: ITimeStamp) {
  const [year, month] = parseTimestamp(timeString)
  return year * 12 + month
}
export function countDay(timeString: ITimeStamp) {
  const [year, , day] = parseTimestamp(timeString)
  return year * (isLeapYear(year) ? 366 : 365) + countDaysInMonth(timeString) + day
}
export function countHour(timeString: ITimeStamp) {
  const [, , , hour] = parseTimestamp(timeString)
  return hour
}
export function countMinute(timeString: ITimeStamp) {
  const [, , , hour, minute] = parseTimestamp(timeString)
  return hour * 60 + minute
}
export function countSecond(timeString: ITimeStamp) {
  const [, , , hour, minute, second] = parseTimestamp(timeString)
  return hour * 60 * 60 + minute * 60 + second * 60
}

/**
 * 解析日期
 * @example parseTimeString('2020-2-24 18:22:33')=>[2020,2,24,18,22,33]
 */
function parseTimestamp(timeString: ITimeStamp) {
  const [datePart, timePart] = timeString.split(' ')
  return [...datePart.split('-'), ...timePart.split(':')].map(Number)
}

//----------- test -------------

console.log(countRoughTimeBetween('2020-2-25 20:00:00', '2020-2-25 19:55:33'))
