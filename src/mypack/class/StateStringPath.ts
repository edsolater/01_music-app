/**
 * 以字符串形式描述路径
 * @example '0/3' 'src/try'
 */
type PathItem = string | number //TODO: 想出更能描述路径写法的字符串使用原则
type Path = PathItem[]
type Configuration = {} // TODO：类型定义

// TODO： 需要给出更多接口，以后需求到了再说
/**
 * 设定初始状态，并返回一个包含字符串路径的对象
 */
export default class StateStringPath {
  private _callbacks: {
    [updateMethod in Exclude<keyof StateStringPath, 'on'>]?: AnyFunction[]
  } = {}
  private _pathStack: Path
  private _reactSetState: React.Dispatch<React.SetStateAction<Path>>

  constructor(
    protected config: { [otherConfigs: string]: any },
    init: (string | number)[],
    setState: any,
  ) {
    this._pathStack = init
    this._reactSetState = setState
  }
  /**
   * 强行改变内涵值
   */
  set(newPath: Path, hasCallback: boolean = true) {
    // 触发设定值的回调 //TODO：改成异步触发
    if (hasCallback) this._callbacks.set?.forEach((callback) => callback(newPath))
    // 更新JavaScript的对象的值
    this._pathStack = newPath
    // 通知react以更新UI
    this._reactSetState(this._pathStack)
  }

  /**
   * 获取完整路径
   */
  getTotalPath(hasCallback: boolean = true) {
    // 触发设定值的回调 //TODO：改成异步触发
    if (hasCallback) this._callbacks.getTotalPath?.forEach((callback) => callback())
    return this._pathStack
  }
  /**
   * 获取特定路径
   */
  getPathItem(order: number, hasCallback: boolean = true) {
    // 触发设定值的回调 //TODO：改成异步触发
    if (hasCallback) this._callbacks.getTotalPath?.forEach((callback) => callback(order))
    return this._pathStack[order >= 0 ? order : this._pathStack.length + order] // 默认取最后一项
  }
  /**
   * 通过此函数注册回调
   * 允许链式调用
   */
  on(eventName: keyof StateStringPath, fn: (...anys: any[]) => any) {
    this._callbacks[eventName]?.push(fn)
    return this
  }
}
