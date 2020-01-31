import React from 'react'
import { ClassValue } from 'classnames/types'
import { View, propofView } from '.'
import { pick } from 'mypack/utils'

export const propofComponentRoot = [
  'name',
  'className',
  'style',
  'onClick',
  '$if',
  '$for',
  '$clone',
  'html',
  'children',
]

/**组件代码 */
function ComponentRoot(
  props: React.ComponentProps<typeof View> & {
    /**
     * 用于各个组件定义组件的名字更方便
     */
    name?: ClassValue
  },
  ref,
) {
  return <View ref={ref} {...pick(props, propofView)} className={[props.className, props.name]} />
}

export default React.memo(React.forwardRef(ComponentRoot))
