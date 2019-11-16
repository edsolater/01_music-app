export default (targetHandler?: object, configHandlers: object = {}) => {
  if (targetHandler) {
    return Object.assign(targetHandler, configHandlers)
  } else {
    return
  }
}
