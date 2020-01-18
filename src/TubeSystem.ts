//TODO: 一个可持续的系统组件要画下一些设计图，哪怕是代码

//#region 类型申明
type ComponentNodeList = {
  //注册（为了自动提示）
  'AlbumMenu':  (...anys: any[]) => any
  [componentName: string]: (...anys: any[]) => any
}
export declare class ChildSideType {
  emitUp(eventPayload: any): this
}
export declare class ControllerSideType {
  emitDown(componentName: keyof ComponentNodeList, eventPayload: any): this
}
//#endregion

//#region 代码逻辑
export function spawnCommunicationSystem() {
  /* TODO: 这里能不用Partial实现吗 */
  const componentNodeList: Partial<ComponentNodeList> = {}
  let controllerName: string

  //TODO：要把class提出到function外部
  class ControllerSide {
    constructor(motherSideName: string = 'App', recorder: (...anys: any) => any) {
      componentNodeList[motherSideName] = recorder
      controllerName = motherSideName
    }
    emitDown(componentName: keyof typeof componentNodeList, eventPayload: any) {
      componentNodeList[componentName]?.(eventPayload)
      return this
    }
  }

  //TODO：要把class提出到function外部
  class ChildSide {
    static instanceList: ChildSide[] = []
    constructor(childSideName: string, recorder: (...anys: any) => any) {
      componentNodeList[childSideName] = recorder
      ChildSide.instanceList.push(this)
    }
    emitUp(eventPayload: any) {
      componentNodeList[controllerName]?.(eventPayload)
      return this
    }
  }
  return { ControllerSide, ChildSide }
}
//#endregion
