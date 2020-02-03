/**
 * 以字符串或数字形式描述路径
 * @example [0,1]、 ['0','1']、 ['src','try']
 */
type PathItem = string | number
type Path = PathItem[]

/**
 * 设定初始状态，并返回一个包含字符串路径的对象
 */
export default class StateStringPath {
  private callbacks: {
    [updateMethod in Exclude<keyof StateStringPath, 'on'>]?: AnyFunction[]
  } = {}
  constructor(
    private config: { [otherConfigs: string]: any },
    private pathStack: Path,
    private reactSetStateFunction: React.Dispatch<React.SetStateAction<{}>>,
  ) {}
  /**
   * 设定完整的路径
   */
  setTotal(newTotalPath: Path, hasCallback: boolean = true) {
    // 触发设定值的回调 //TODO：改成异步触发
    if (hasCallback) this.callbacks.setTotal?.forEach((callback) => callback(newTotalPath))
    // 更新JavaScript的对象的值
    this.pathStack = newTotalPath
    // 通知react以更新UI
    this.reactSetStateFunction(this.pathStack)
    // 便于设定数据
    return this
  }
  /**
   * 设定路径的单独一项
   */
  setOne(newOnePath: PathItem, pathIndex: number, hasCallback: boolean = true) {
    // 触发设定值的回调 //TODO：改成异步触发
    if (hasCallback) this.callbacks.setOne?.forEach((callback) => callback(newOnePath, pathIndex))
    // 更新JavaScript的对象的值
    this.pathStack[pathIndex] = newOnePath
    // 通知react以更新UI
    this.reactSetStateFunction([...this.pathStack])
    // 便于设定数据
    return this
  }

  /**
   * 获取完整路径
   */
  getTotal(hasCallback: boolean = true) {
    // 触发设定值的回调 //TODO：改成异步触发
    if (hasCallback) this.callbacks.getTotal?.forEach((callback) => callback())
    return this.pathStack
  }
  /**
   * 获取路径的单独一项
   */
  getOne(order: number, hasCallback: boolean = true) {
    // 触发设定值的回调 //TODO：改成异步触发
    // console.log(3,this.callbacks.getOne) //TODO:这里怎么一下触发15次？
    if (hasCallback) this.callbacks.getOne?.forEach((callback) => callback(order))
    return this.pathStack[order >= 0 ? order : this.pathStack.length + order] // 默认取最后一项
  }
  /**
   * 通过此函数注册回调
   * 允许链式调用
   */
  on(eventName: keyof StateStringPath, fn: (...anys: any[]) => any) {
    this.callbacks[eventName]?.push(fn)
    return this
  }
}
