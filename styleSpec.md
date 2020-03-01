# 样式名（class）的命名约定（**待执行**）：

#### 主体描述（元素是什么）

- 名词
- 非组件：尽量使用强语义化单词（除非是单纯布局/装饰的元素）
  （例如 data、item 为浅语义单词）
- 组件：越贴近实际页面，语义越强
- kebab-case 格式

```js
  <view class="image-wrapper">
```

#### 状态描述（可选）（元素处于什么状态）

- 形容词
- 尽量使用单个单词
- camelCase 格式

```js
  <view class="image-wrapper active">
```

```js
  <view class="image-wrapper lastOne">
```

#### 层级关系描述（大幅增加描述的准确性时才用）（元素与父级的关系）

- `__` 双下划线连接

```js
  <view class="image-wrapper__inner-thumbnail active">
```

# 组件名的命名约定：

语义化多少：

页面私有组件 = 页面间共享组件 > 通用组件（如 smooth-tabs）
