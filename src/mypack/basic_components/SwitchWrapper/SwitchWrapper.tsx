import React, { useState } from 'react'
import { ComponentBox } from '..'

type ToggleType = 'onClick' | 'onPointerEnter' | 'onPointerLeave'

function SwitchWrapper<ON extends string, OFF extends string>({
  onClick,
  onPointerEnter,
  onPointerLeave,

  classNameForOn,
  classNameForOff,
  initState,
  toggleBy = 'onClick',
  onToggle,
  ...restProps
}: React.ComponentProps<typeof ComponentBox> & {
  initState?: ON | OFF
  classNameForOn?: ON
  classNameForOff?: OFF
  toggleBy?: ToggleType | ToggleType[]
  onToggle?: (value: string) => void
}) {
  const name_on = classNameForOn ?? 'on'
  const name_off = classNameForOff ?? 'off'
  const [currentState, changeCurrentState] = useState(initState ?? name_off) // 最后别忘把典型switch逻辑了合并到useMaster中
  const toggleCurrentState = () => {
    const switchTo = currentState === name_on ? name_off : name_on
    changeCurrentState(switchTo) // UI逻辑
    onToggle?.(switchTo) // 数据逻辑
  }
  return (
    <ComponentBox
      componetName={`Switch ${currentState === name_on ? `on ${name_on}` : `off ${name_off}`}`}
      onClick={(e) => {
        onClick?.(e)
        if (toggleBy.includes('onClick')) toggleCurrentState()
      }}
      onPointerEnter={(e) => {
        onPointerEnter?.(e)
        if (toggleBy.includes('onPointerEnter')) toggleCurrentState()
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e)
        if (toggleBy.includes('onPointerLeave')) toggleCurrentState()
      }}
      {...restProps}
    />
  )
}

export default React.memo(SwitchWrapper) as typeof SwitchWrapper
