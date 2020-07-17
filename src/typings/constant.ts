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
/**短标签 */
type Tag = string
/**名字 */
type Name = string
/** 一小段文字 */
type Scentence = string
/** 一大段文字信息（带有换行符） */
type Paragraph = string

/**资源的时间戳,持续时间等 */
type TimeNumber = number
/**表示持续时长 */
type Milliseconds = number
/**代表一个时刻字符串 */
type DateString = string
