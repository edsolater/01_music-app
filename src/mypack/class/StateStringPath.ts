/**
 * 以字符串或数字形式描述路径
 */
type PathItem = {[desciper: string]: unknown }
export type Path = PathItem[]

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
  setAllPathItems(newTotalPath: Path) {
    // 触发设定值的回调 //TODO：改成异步触发
    this.callbacks.setAllPathItems?.forEach((callback) => callback(newTotalPath))
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
  setPathItem(newOnePath: PathItem, pathIndex: number) {
    // 触发设定值的回调 //TODO：改成异步触发
    this.callbacks.setPathItem?.forEach((callback) => callback(newOnePath, pathIndex))
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
  getAllPathItems() {
    // 触发设定值的回调 //TODO：改成异步触发
    this.callbacks.getAllPathItems?.forEach((callback) => callback())
    return this.pathStack
  }
  /**
   * 获取路径的单独一项
   */
  getPathItem(order: number): PathItem | undefined {
    // 触发设定值的回调 //TODO：改成异步触发
    // console.log(3,this.callbacks.getPathItem) //TODO:这里怎么一下触发15次？
    this.callbacks.getPathItem?.forEach((callback) => callback(order))
    return this.pathStack[order >= 0 ? order : this.pathStack.length + order] // 默认取最后一项
  }
  /**
   * （快捷方式）获取整个Path的第一项
   */
  getFirstPathItem() {
    return this.getPathItem(0)
  }
  /**
   * （快捷方式）获取整个Path的最后一项
   */
  getLastPathItem() {
    return this.getPathItem(-1)
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

