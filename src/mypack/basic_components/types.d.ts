import { ComponentProps, JSXElementConstructor } from 'react'

declare interface ShowHideObject {
  readonly value: boolean
  open: (...any: any[]) => any
  close: (...any: any[]) => any
}

declare type GetChildState<C extends JSXElementConstructor<any>> = ComponentProps<
  C
>['componentState']
declare type GetChildCommands<C extends JSXElementConstructor<any>> = ComponentProps<
  C
>['componentCommands']

declare type Booleanish = unknown
