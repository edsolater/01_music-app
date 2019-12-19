| component                                          | type          | composed by | 说明                                                  |
| -------------------------------------------------- | ------------- | :---------: | ----------------------------------------------------- |
| [View](./View/View.tsx)                            | basic         |             | div，为了使开发独立于平台                             |
| [ComponentName](./ComponentName/ComponentName.tsx) | basic         |             | div，增加源码可读性，制造组件时的根节点               |
| [SlotName](./SlotName/SlotName.tsx)                | basic         |             | div，增加源码可读性，制造组件时的 Slot 节点           |
| [Image](./Image/Image.tsx)                         | basic         |             | img，为了使开发独立于平台                             |
| [Text](./Text/Text.tsx)                            | basic         |             | div，为了使开发独立于平台                             |
| [Audio](./Audio/Audio.tsx)                         | basic         |             | audio(元素不可见)，为了使开发独立于平台               |
| [Button](./Button/Button.tsx)                      | leaf          |             |                                                       |
| [**Switcher**](./__Switcher__/__Switcher__.tsx)    | box/leaf      |             | 包装元素以切换 on/off 状态，或者就是一个普通的 Switch |
| [ButtonGroup](./ButtonGroup/ButtonGroup.tsx)       | box(semantic) |             |                                                       |
| [Slider](./Slider/Slider.tsx)                      | leaf          |             | 轨道滑块                                              |
| [Popover](./Popover/Popover.tsx)                   | leaf          |             | 弹出卡片（在某个元素附近）                            |
| [TableView](./TableView/TableView.tsx)             | leaf          |             | 本质上是一个纵向的列表                                |
| [Label](./Label/Label.tsx)                         | leaf          |             | 方便文字垂直居中                                      |