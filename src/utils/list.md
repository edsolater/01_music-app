前缀说明: INPUT\$OUTPUT_utilName
（同时输出有 INPUT\$OUTPUT\_ 与没有 INPUT\$OUTPUT\_ 的版本（用于在后开发中删除 INPUT\$OUTPUT\_），以便兼顾开发速度与后开发的可读性）

Utilities 列表
class 种类：

- **zeroUtil** 单纯传入 config，用于生成一个值
- **unaryUtil** 一元工具函数
- **binaryUtil** 二元工具函数
- **infinaryUtil** 无限元工具函数
- **highOrderUtil** 高阶工具函数 —— 需要传入 callback 函数的工具函数
- **functionUtil** 函数包裹器(函数工厂) —— 用于创造新函数的函数
- **judger** 判断子 —— 返回布尔值的函数，通常用于鉴定

| tested | utilName                                                  | class       | target\<Tar extends any\> | output   | 说明                                                  |
| :----: | --------------------------------------------------------- | ----------- | ------------------------- | -------- | ----------------------------------------------------- |
|   ×    | [constraint](./constraint.ts)                             | unaryUtil   | number                    | number   | 将 number 限制在指定的范围内，超出范围就取最大/最小值 |
|        | [pipe](./pipe.ts)                                         | unaryUtil   | function[]                | function | 函数式编程的基本工具，将多个函数连接起来              |
|   ×    | [createObjectByMultiProps](./createObjectByMultiProps.ts) | createThing | configObj                 | object   | 需要动态地创建多个对象属性时使用                      |
