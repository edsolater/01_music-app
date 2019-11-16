import { ComponentProps, JSXElementConstructor } from "react";

declare type GetWidgetHandler<C extends JSXElementConstructor<any>> = ComponentProps<C>['widgetHandler']