//#region 类型申明
type ComponentNodeList = {
  [componentName: string]: (...anys: any[]) => any
}
export declare class ChildSide {
  emitUp(eventPayload: any): this
}
export declare class ControllerSide {
  emitDown(componentName: keyof ComponentNodeList, eventPayload: any): this
}
//#endregion

//#region 代码逻辑
export function spawnCommunicationSystem() {
  const componentNodeList: ComponentNodeList = {}
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
