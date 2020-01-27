export default class PoolMarket {
  private pool = {} //TODO 类型定义 //IDEA: 单个pool 与 poolMarket
  add(name: string, poolItem: any) {
    if (Array.isArray(this.pool[name])) {
      this.pool[name].push(poolItem)
    } else if (this.pool[name] === undefined) {
      this.pool[name] = [poolItem]
    }
    return this
  }
  remove(name: string, poolItem: any) {
    const itemIndex = this.pool[name]?.indexOf(poolItem) ?? -1
    if (Number.isInteger(itemIndex) && itemIndex >= 1) {
      this.pool[name]?.splice(itemIndex, 1)
    } else if (Number.isInteger(itemIndex) && itemIndex === 0) {
      delete this.pool[name]
    }
    return this
  }
  getPool(name: string) {
    return this.pool[name]
  }
  getAll() {
    return this.pool
  }
}
