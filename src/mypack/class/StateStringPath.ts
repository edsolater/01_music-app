import { useState } from 'react'
/**
 * 以字符串形式描述路径
 * @example '0/3' 'src/try'
 */
type Path = string //TODO: 想出更能描述路径写法的字符串使用原则
type Methods = 'forceSet'
type Configuration = {}

/**
 * 设定初始状态，并返回一个包含字符串路径的对象
 */
export default class StateStringPath {
  private _callbacks: {
    [updateMethod in Methods]: ((...anys: any[]) => any)[]
  }
  value: Path
  private _reactSetState: React.Dispatch<React.SetStateAction<string>>

  constructor(initPath: Path, protected config?: Configuration) {
    this._callbacks = {
      forceSet: [],
    } //TEMP

    const [state, setState] = useState(initPath)
    this.value = state
    this._reactSetState = setState
  }
  // 强行改变内涵值
  forceSet(newPath: Path, hasCallback: boolean = true) {
    console.log('newPath: ', newPath)
    //触发设定值的回调
    if (hasCallback) this._callbacks?.forceSet.forEach((callback) => callback(newPath))
    // 更新JavaScript的对象的值
    this.value = newPath
    // 通知react以更新UI
    this._reactSetState(this.value)
    // 链式调用
    return this
  }
  getPathPartFromRight(order = 0) {
    const allParts = this.value.split('/')
    return allParts[allParts.length - (order + 1)] // 默认取最后一项
  }
  // 注册回调
  on(eventName: Methods, fn: (...anys: any[]) => any) {
    this._callbacks[eventName].push(fn)
    return this
  }
}
