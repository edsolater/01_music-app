import React from 'react'
import { View } from '..'

// CanPop 中的内容一定是脱离文档流的
function CanPop({
  content,
  position = 'absoluate',
  positionDetail = 'auto',
  ...restProps
}: React.ComponentProps<typeof View> & {
  content?: React.ReactNode
  position?: 'fixed' | 'absoluate' //用css的position实现
  positionDetail?: 'auto' | 'left' | 'top' | 'right' | 'bottom' // 如果是absolute用css的translate实现；如果是fixed用css的left/top/right/bottom实现
}) {
  return (
    <>
      <View
        className={[
          'CanPop',
          {
            on: true, //TODO
          },
        ]}
      >
        {content}
      </View>
      <View {...restProps}></View>
    </>
  )
}
export default React.memo(CanPop) as typeof CanPop
// TODO
