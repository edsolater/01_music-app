import { useState } from 'react'
/**
 * 以字符串形式描述路径
 * @example '0/3' 'src/try'
 */
type Path = string //TODO: 想出更能描述路径写法的字符串使用原则
type Configuration = {}

/**
 * 设定初始状态，并返回一个包含字符串路径的对象
 */
export default class StateStringPath {
  private _callbacks: {
    [updateMethod in keyof StateStringPath]?: ((...anys: any[]) => any)[]
  } = {}
  private _value: Path
  private _reactSetState: React.Dispatch<React.SetStateAction<string>>

  constructor(initPath: Path, protected config?: Configuration) {
    const [state, setState] = useState(initPath)
    this._value = state
    this._reactSetState = setState
  }

  // 强行改变内涵值
  forceSet(newPath: Path, hasCallback: boolean = true) {
    //触发设定值的回调
    if (hasCallback) this._callbacks.forceSet?.forEach((callback) => callback(newPath))
    // 更新JavaScript的对象的值
    this._value = newPath
    // 通知react以更新UI
    this._reactSetState(this._value)
    // 链式调用
    return this
  }

  // （按顺序）获取路径的值
  getPath(order?: number, hasCallback: boolean = true) {
    //触发设定值的回调
    if (hasCallback) this._callbacks.getPath?.forEach((callback) => callback(order))

    if (order !== undefined) {
      const allParts = this._value.split('/')
      return allParts[order > 0 ? order : allParts.length + order] // 默认取最后一项
    } else {
      return this._value
    }
  }

  // 注册回调
  on(eventName: keyof StateStringPath, fn: (...anys: any[]) => any) {
    this._callbacks[eventName]?.push(fn)
    return this
  }
}
