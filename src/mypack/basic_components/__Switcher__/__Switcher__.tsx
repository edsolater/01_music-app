import React, { useState } from 'react'
import { ComponentName } from '..'
import { createObjectByMultiProps } from 'mypack/utils'

type ToggleType = 'onClick' | 'onPointerEnter' | 'onPointerLeave'
function mergeObjects(...objs) {
  return objs.reduce((acc, obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (Array.isArray(acc[key])) {
        acc[key].push(value)
      } else if (key in acc) {
        acc[key] = [acc[key], value].flat()
      } else {
        acc[key] = value
      }
    })
    return acc
  }, {})
}
function __Switcher__<ON extends string, OFF extends string>({
  classNameForOn,
  classNameForOff,
  classNameForInitState,
  toggleBy = 'onClick',
  handleManually = false,
  onToggle,
  ...restProps
}: React.ComponentProps<typeof ComponentName> & {
  classNameForInitState?: ON | OFF
  classNameForOn?: ON
  classNameForOff?: OFF
  toggleBy?: ToggleType | ToggleType[]
  handleManually?: boolean
  onToggle?: (value: string) => void
}) {
  const name_on = classNameForOn ?? 'on'
  const name_off = classNameForOff ?? 'off'
  const [currentState, changeCurrentState] = useState(classNameForInitState ?? name_off) // 最后别忘把典型switch逻辑了合并到useMaster中
  const componentStatusMessage = `__Switcher__ ${
    currentState === name_on ? `on ${name_on ?? ''}` : `off ${name_off ?? ''}`
  }`
  const toggleCurrentState = () => {
    const switchTo = currentState === name_on ? name_off : name_on
    changeCurrentState(switchTo) // UI逻辑
    onToggle?.(switchTo) // 数据逻辑
  }
  return (
    <ComponentName
      displayName={componentStatusMessage.trim()}
      {...restProps}
      {...createObjectByMultiProps({
        // TODO: 新增util: ObjectMerge、ObjectMergeCover。以替代现有的逻辑
        properties: toggleBy,
        value: (toggleType) => (e) => {
          restProps[toggleType]?.(e)
          if (handleManually === false) toggleCurrentState()
        },
      })}
    />
  )
}

export default React.memo(__Switcher__) as typeof __Switcher__
