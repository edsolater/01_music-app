import React, { useState } from 'react'
import { ComponentBox } from '..'

function Switch({
  onClick,

  classNameForOn = 'on',
  classNameForOff = 'off',
  initState = 'off',
  changeBy = 'click',
  onBeforeChangeStatus,
  onAfterChangeStatus,
  twoSide,
  ...restProps
}: React.ComponentProps<typeof ComponentBox> & {
  twoSide?: any[]
  initState?: 'on' | 'off'
  classNameForOn?: string
  classNameForOff?: string
  changeBy?: 'click'
  onBeforeChangeStatus?: (oldState: string, confirmChange: Function) => void
  onAfterChangeStatus?: (newState: string) => void
}) {
  const [currentState, changeCurrentState] = useState(initState) // 最后别忘了合并到useMaster中
  const toggleCurrentState = () => {
    if (currentState === 'on') {
      changeCurrentState('off')
    } else {
      changeCurrentState('on')
    }
  }
  return (
    <ComponentBox
      componetName={`Switch ${currentState === 'on' ? classNameForOn : classNameForOff}`}
      onClick={(e) => {
        onBeforeChangeStatus?.(
          currentState === 'on' ? classNameForOff : classNameForOn,
          toggleCurrentState,
        )
        onClick?.(e)
        toggleCurrentState() //TODO：这里只是伪装的，要删除
        onAfterChangeStatus?.(currentState === 'on' ? classNameForOff : classNameForOn) //TODO：这里只是伪装的，要删除
      }}
      {...restProps}
    />
  )
}

export default React.memo(Switch) as typeof Switch
