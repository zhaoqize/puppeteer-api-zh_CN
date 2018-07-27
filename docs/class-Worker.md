#### class: Worker

Worker 类表示一个 [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)。在页面对象上 `workercreated` 和 `workerdestroyed` 事件被触发，以标识 worker 的生命周期。

```js
page.on('workercreated', worker => console.log('Worker created: ' + worker.url()));
page.on('workerdestroyed', worker => console.log('Worker destroyed: ' + worker.url()));

console.log('Current workers:');
for (const worker of page.workers())
  console.log('  ' + worker.url());
```

#### worker.evaluate(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in the worker context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

如果传递给 `worker.evaluate` 的函数返回一个 [Promise]，那么 `worker.evaluate` 将等待解析并返回它的值。

如果传递给 `worker.evaluate` 的函数返回一个 非[序列化]的值，那么 `worker.evaluate` 解析为 `undefined`。

[(await worker.executionContext()).evaluate(pageFunction, ...args)](#executioncontextevaluatepagefunction-args) 的快捷链接。

#### worker.evaluateHandle(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in the page context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

`worker.evaluate` 和 `worker.evaluateHandle` 之间的唯一区别是 `worker.evaluateHandle` 返回页内对象（JSHandle）。

如果传递给 `worker.evaluateHandle` 的函数返回一个 [Promise]，那么 `worker.evaluateHandle` 将等待解析并返回它的值。

[(await worker.executionContext()).evaluateHandle(pageFunction, ...args)](#executioncontextevaluatehandlepagefunction-args) 的快捷链接。

#### worker.executionContext()
- returns: <[Promise]<[ExecutionContext]>>

#### worker.url()
- returns: <[string]>