import React from 'react'
import './RedDot.scss'
import { Slot, Text, ComponentRoot, ComponentRootPorpType, componentRootProps } from '.'
import { pick } from '../utils'

/**
 * 父元素不能定义overflow:hidden
 * 该子元素必须排在父元素的所有非Wrapper子元素之前
 */
function RedDot<O>(
  props: ComponentRootPorpType<O> & {
    /**
     * 红点上显式的数量
     */
    amount?: number | string
    /**
     * 像没有一样
     */
    invisiable?: boolean
    /**
     * 只显示红点而不显示数字
     */
    justDot?: boolean
  },
) {
  const addParentClass = (element: HTMLDivElement) => {
    globalThis.setTimeout(() => {
      element.parentElement?.classList.add('_hasRedDot')
    })
  }
  return (
    <ComponentRoot
      {...pick(props, componentRootProps)}
      ref={addParentClass}
      name={['RedDot', { _invisiable: props.invisiable }]}
    >
      <Slot slotName={['RedDot__Dot', { _onlyDot: props.justDot }]}>
        <Text $if={!props.justDot}>{props.amount}</Text>
      </Slot>
    </ComponentRoot>
  )
}

export default React.memo(RedDot) as typeof RedDot
