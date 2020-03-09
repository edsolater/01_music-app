import { UGuard } from 'mypack/utils'

/**
 * 输入初始状态（number），返回一个包含数字的对象
 */
export default class StateNumber {
  private callbackPool = { onChange: <Array<(newNumber: number, oldNumber: number) => unknown>>[] }
  private reactSetState: React.Dispatch<React.SetStateAction<number | undefined>>
  private _value: number

  constructor(
    protected config: {
      /**设定限定范围 */
      range?: [number, number]
      /**初始值 */
      init?: number
    },
    /**传来的初始值 */
    initValue: any,
    /**触发react更新组件 */
    setState: any,
  ) {
    this._value = Number(initValue)
    this.reactSetState = setState
  }
  /** 获取储存的值 */
  get value() {
    return this._value
  }
  /** 其实是set的快捷方式 */
  add(deltaNumber: number) {
    return this.set(this._value + deltaNumber)
  }
  /** 强行改变存储的值 */
  set(targetNumber: number) {
    // 截断，使目标值在最大最小的范围内
    if (this.config?.range) {
      targetNumber = UGuard.number(targetNumber, { range: this.config.range })
    }
    //触发设定值的回调
    this.callbackPool.onChange?.forEach(callback => callback(targetNumber, this._value))
    // 更新JavaScript的对象的值
    this._value = targetNumber
    // 通知react以更新UI
    this.reactSetState(this._value)
    // 链式调用
    return this
  }
  /** 注册回调 */
  onChange(fn: (newNumber: number, oldNumber: number) => unknown) {
    this.callbackPool['onChange'].push(fn)
    return this
  }
}
