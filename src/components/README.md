异想天开：组件 Fallback，当子组件是 undefined/null 时，启用\<Fallback>组件上的 fallback 属性
例如：

```javascript
<Fallback fallback={<div>loading...</div>}>{profile?.data.something}</Fallback>
```

Fallback 可以与 ErrorBoundary 结合
