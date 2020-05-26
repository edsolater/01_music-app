import { Dispatch } from 'react'

type StateAdaptor<T> = T | ((prev: T) => T)
