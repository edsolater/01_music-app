//TODO - 反正只是简单地使用时间处理，JS自带的Date类已经足够可用了
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { setDefaultResourceInfo } from 'hooks/useFetch'

dayjs.extend(duration)

/* ---------------------------------- 设置请求 ---------------------------------- */

setDefaultResourceInfo({
  baseUrl: 'http://localhost:3000',
  requestInit: {
    credentials: 'include'
  }
})
