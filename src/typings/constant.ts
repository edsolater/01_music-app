type AnyFunction = (...args: any[]) => any

type AnyObject = { [key: string]: any }

type Callback = (...args: any[]) => void

type UtilFunction = (...args: any[]) => any

type HttpCode = 200
/**url地址（例如：图片的src） */
type Url = string
type SrcUrl = Url
type LinkUrl = Url
/**资源ID */
type ID = number | string
/**名字 */
type Name = string
/** 一小段文字 */
type Scentence = string
/**资源的时间戳,持续时间等 */
type TimeNumber = number
/**代表一个时刻字符串 */
type DateString = string
