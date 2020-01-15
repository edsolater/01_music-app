export default class StateCollectionObject<O> {
  private _state: { [propName: string]: any } = {} //TOFIX: 这里的类型定义对智能提示不友好
  private _reactSetState: React.Dispatch<React.SetStateAction<object>>
  private _callbacks: {
    [updateMethod in keyof StateCollectionObject<O>]?: ((...anys: any[]) => any)[]
  } = {}
  constructor(
    protected config: {
      /**
       * 初始值
       */
      init?: O
    },
    state: any,
    setState: any,
  ) {
    this._state = Object(state)
    this._reactSetState = setState
  }
  add(newPiece: object) {
    this._callbacks.add?.forEach((callback) => callback())
    return this.set(newPiece)
  }
  clear() {
    this._callbacks.clear?.forEach((callback) => callback())
    this._state = {}
    this._reactSetState({})
    return this
  }
  getTotalObject() {
    //TEMP：要合并
    this._callbacks.getTotalObject?.forEach((callback) => callback())
    return { ...this._state }
  }
  getProp(propName: string) {
    //TEMP：要合并
    return this._state[propName]
  }
  set(newPiece: object) {
    Object.assign(this._state, newPiece)
    this._reactSetState({ ...this._state })
    return this
  }
  // 注册回调
  on(eventName: keyof StateCollectionObject<O>, fn: (...anys: any[]) => any) {
    this._callbacks[eventName]?.push(fn)
    return this
  }
}
