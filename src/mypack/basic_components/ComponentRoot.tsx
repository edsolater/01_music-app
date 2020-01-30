import React from 'react'
import { ClassValue } from 'classnames/types'
import { View, propofView } from '.'
import { pick } from 'mypack/utils'

/**props定义 */
type IProps = {
  /**
   * 用于各个组件定义组件的名字更方便
   */
  name?: ClassValue
}
export const propofComponentRoot: (keyof IProps | keyof React.ComponentProps<typeof View>)[] = [
  'name',
  'className',
  'style',
  'onClick',
  '$if',
  '$clone',
  'html',
  'children',
]

/**组件代码 */
const ComponentRoot = React.forwardRef((props: React.ComponentProps<typeof View> & IProps, ref) => {
  return <View ref={ref} {...pick(props, propofView)} className={[props.className, props.name]} />
})
ComponentRoot.displayName = 'ComponentRoot'

export default React.memo(ComponentRoot) as typeof ComponentRoot
