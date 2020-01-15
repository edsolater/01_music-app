/**
 * 以字符串形式描述路径
 * @example '0/3' 'src/try'
 */
type Path = string //TODO: 想出更能描述路径写法的字符串使用原则
type Configuration = {} // TODO：类型定义

// TODO： 需要给出更多接口，以后需求到了再说
/**
 * 设定初始状态，并返回一个包含字符串路径的对象
 */
export default class StateStringPath {
  private _callbacks: {
    [updateMethod in keyof StateStringPath]?: ((...anys: any[]) => any)[]
  } = {}
  private _value: Path
  private _reactSetState: React.Dispatch<React.SetStateAction<string>>

  constructor(protected config: { [otherConfigs: string]: any }, state: any, setState: any) {
    this._value = String(state) as Path
    this._reactSetState = setState
  }

  // 强行改变内涵值
  set(newPath: string | number, hasCallback: boolean = true) {
    //触发设定值的回调
    if (hasCallback) this._callbacks.set?.forEach((callback) => callback(newPath))
    // 更新JavaScript的对象的值
    this._value = String(newPath)
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
