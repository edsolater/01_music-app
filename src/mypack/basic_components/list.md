
COMPONENT
| component                            | type          | composed by | 说明                                        |
| ------------------------------------ | ------------- | :---------: | ------------------------------------------- |
| [View](./View.tsx)                   | basic         |             | div，为了使开发独立于平台                   |
| [View](./View.tsx) | basic         |             | div，增加源码可读性，制造组件时的根节点     |
| [SlotName](./SlotName.tsx)           | basic         |             | div，增加源码可读性，制造组件时的 Slot 节点 |
| [Image](./Image.tsx)                 | basic         |             | img，为了使开发独立于平台                   |
| [Text](./Text.tsx)                   | basic         |             | div，为了使开发独立于平台                   |
| [Audio](./Audio.tsx)                 | basic         |             | audio(元素不可见)，为了使开发独立于平台     |
| [Button](./Button.tsx)               | leaf          |             |                                             |
| [ButtonGroup](./ButtonGroup.tsx)     | box(semantic) |             |                                             |
| [Slider](./Slider.tsx)               | leaf          |             | 轨道滑块                                    |
| [Popover](./Popover.tsx)             | leaf          |             | 弹出卡片（在某个元素附近）                  |
| [TableView](./TableView.tsx)         | leaf          |             | 本质上是一个纵向的列表                      |
| [Label](./Label.tsx)                 | leaf          |             | 方便文字垂直居中                            |




HOC
| component                            | type          | composed by | 说明                                        |
| ------------------------------------ | ------------- | :---------: | ------------------------------------------- |
| [View](./View.tsx)                   | basic         |             | div，为了使开发独立于平台                   |


