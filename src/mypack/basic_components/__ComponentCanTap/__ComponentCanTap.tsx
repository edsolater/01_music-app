import React from 'react'
import ComponentName from '../ComponentName/ComponentName'

// 用户按下，使用 :active 进行css判定，所以这个只是个单纯的包装组件
function __ComponentCanTap({ ...restProps }: React.ComponentProps<typeof ComponentName>) {
  return <ComponentName {...restProps} />
}
export default React.memo(__ComponentCanTap) as typeof __ComponentCanTap
