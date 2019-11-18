| component                              | type           |        composed by         | 说明                       |
| -------------------------------------- | -------------- | :------------------------: | -------------------------- |
| [Button](./Button.tsx)                 | leaf           |                            |                            |
| [ButtonGroup](./ButtonGroup/index.tsx) | box(semantic)  |                            |                            |
| [Image](./Image.tsx)                   | leaf(semantic) |                            | 为了使结构看起来更具语义性 |
| [Timeline](./Timeline.tsx)             | leaf           | [Track](./Track/index.tsx) | 音乐播放器的 Timeline      |
| [Track](./Track/index.tsx)             | leaf           |                            | 轨道滑块                   |
