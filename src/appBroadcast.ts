export default new (class AppBroadcast {
  private broadcastChannal: {
    [componentName: string]: (...anys: any[]) => any
  } = {}

  register(registerInfo: { componentName: string; eventCallback: (...anys: any[]) => any }) {
    this.broadcastChannal[registerInfo.componentName] = registerInfo.eventCallback
  }

  // 动词与名词要拆开
  emit(message: { componentName: string; eventName: string; eventPayload: any }) {
    this.broadcastChannal[message.componentName]?.(message.eventPayload)
  }
})()
