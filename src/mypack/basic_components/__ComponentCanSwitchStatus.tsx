import React, { useState } from 'react'
import { ComponentName } from '.'
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
function __ComponentCanSwitchStatus<ON extends string, OFF extends string>({
  componentName,
  classNameForOn,
  classNameForOff,
  classNameForInit,
  toggleBy = 'onClick',
  handleManually = false,
  onToggle,
  ...restProps
}: React.ComponentProps<typeof ComponentName> & {
  classNameForInit?: ON | OFF
  classNameForOn?: ON
  classNameForOff?: OFF
  toggleBy?: ToggleType | ToggleType[]
  handleManually?: boolean
  onToggle?: (value: string) => void
}) {
  const name_on = classNameForOn ?? 'on'
  const name_off = classNameForOff ?? 'off'
  const [currentState, changeCurrentState] = useState(classNameForInit ?? name_off) // 最后别忘把典型switch逻辑了合并到useMaster中
  const componentStatusMessage = currentState === name_on ? name_on : name_off
  const toggleCurrentState = () => {
    const switchTo = currentState === name_on ? name_off : name_on
    changeCurrentState(switchTo) // UI逻辑
    onToggle?.(switchTo) // 数据逻辑
  }
  return (
    <ComponentName
      componentName={[componentName, componentStatusMessage.trim()]}
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

export default React.memo(__ComponentCanSwitchStatus) as typeof __ComponentCanSwitchStatus
