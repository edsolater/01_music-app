import {  useDebugValue } from 'react'

export const useHandler = (targetObj, handlers={}) => {
  useDebugValue(`hasHandler: ${Object.keys(handlers)}`)
  if (targetObj) {
    return Object.assign(targetObj, handlers)
  } else {
    return
  }
}
