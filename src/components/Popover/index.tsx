import React, { ReactElement } from 'react'
import './Popover.css'
import { SwitchObject, useSwitcher } from 'components/__myHooks/useSwitcher'
import { attachWidgetHandlers } from 'components/__myComponentUtil'

/**
 * 弹出层内容
 */
const PopContent = ({ contentNode }) =>
  contentNode ? <div className="pop-content">{contentNode}</div> : null
PopContent.displayName = 'Child(PopContent)'

/**
 * Musk层
 * TODO //还是不够直观要再修复
 */
const Musk: React.FC<{ muskHandler: SwitchObject; contentNode?: ReactElement }> = ({
  muskHandler,
  contentNode
}) =>
  muskHandler.state ? (
    <div
      className="musk"
      onClick={e => {
        e.stopPropagation()
        muskHandler.toggle()
      }}
    >
      <PopContent contentNode={contentNode} />
    </div>
  ) : null
Musk.displayName = 'Child(Musk)'

/**
 * 主组件
 */
const Popover: React.FC<{
  widgetHandler?: {
    /**
     * musk的开关行为
     */
    musk?: SwitchObject
  }
  /**
   * 需要Popover的内容
   */
  contentNode?: ReactElement
}> = ({ widgetHandler, contentNode, children }) => {
  const muskHandler = useSwitcher(false)
  attachWidgetHandlers(widgetHandler, { musk: muskHandler })
  return (
    <div
      className="popover"
      onClick={() => {
        muskHandler.toggle()
      }}
    >
      {children}
      <Musk muskHandler={muskHandler} contentNode={contentNode} />
    </div>
  )
}
Popover.displayName = 'Widget(Popover)'
export default Popover
