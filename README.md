TODO 列表：

- 需要在样式上定义一个设计元素的系统，
- 为了看上去更清晰，所有组件的 Props 要单独提出，以方便阅读源代码
- 微信小程序的组件设计牛逼，不照抄一下吗？
- 设计 hooks 系统（分层的）
- （已完成）为各个数据类型的 util（比如 forArray）创造包装函数，以便使用下角标点符，提升语义顺序的流畅性
- （已完成）ArrayUtil 欠缺集合操作的方法，求交集、并集、差集等
- 需要编写 utils 的单元测试代码
- 通过 web worker 载入 Audio，提升性能
-

构建数据系统：

- 每个部分的 store 和 reducer 按功能分类（音乐目录、播放器、音乐列表单独有 store 和 reducer），将每个 component 的 store 注入到局部的文件夹并使用 require.context 实现在全局 store 中的自动引入
- 数据需要从服务器拿，那么每个 page 的数据中心就得实现 request.ts 文件，用于请求数据。在这之前要写好请求的基类（axios，promisify）
