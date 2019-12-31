import React, { useEffect } from 'react'
import { View } from '..'
import { useMaster } from '../customHooks'

// CanPop 中的内容一定是脱离文档流的
function CanPop({
  content,
  position = 'absolute',
  positionDetail = 'auto',
  interactBy = 'pointer-enter-leave',
  ...restProps
}: React.ComponentProps<typeof View> & {
  content?: React.ReactNode
  position?: 'fixed' | 'absolute' //用css的position实现
  positionDetail?: 'auto' | 'left' | 'top' | 'right' | 'bottom' // 如果是absolute用css的translate实现；如果是fixed用css的left/top/right/bottom实现
  interactBy?: 'pointer-enter-leave' | 'custom'
}) {
  const isOpen = useMaster({ type: 'on-off', init: false })
  useEffect(() => {
    if (interactBy !== 'custom') {
      // 这里应该写上popover的交互逻辑
    }
  }, [])
  return (
    <>
      <View extraClassName={['CanPop', { on: isOpen.value }]} extraStyle={{ position: position }}>
        {content}
      </View>
      <View {...restProps}></View>
    </>
  )
}
export default React.memo(CanPop) as typeof CanPop
// TODO
