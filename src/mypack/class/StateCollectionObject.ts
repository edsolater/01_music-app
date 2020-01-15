export default class StateCollectionObject<O> {
  _state: { [propName: string]: any } = {} //TOFIX: 这里的类型定义对智能提示不友好
  _reactSetState: React.Dispatch<React.SetStateAction<object>>
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
    return this.setState(newPiece)
  }
  clear() {
    return this.clearState()
  }
  getState() {
    return { ...this._state }
  }
  private setState(newPiece: object) {
    Object.assign(this._state, newPiece)
    this._reactSetState({ ...this._state })
    return this
  }
  private clearState() {
    this._state = {}
    this._reactSetState({})
    return this
  }
}
