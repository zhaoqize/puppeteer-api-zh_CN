[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-executioncontext)

#### class: ExecutionContext

该类表示 JavaScript 执行的上下文。JavaScript 上下文的例子是：
- 每个 [frame](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) 都有一个单独的执行上下文
- 所有 [workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 都有自己的上下文

#### executionContext.evaluate(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in `executionContext`
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

如果传递给 `executionContext.evaluate` 的函数返回一个[Promise]，那么 `executionContext.evaluate` 将等待承诺解析并返回它的值。

```js
const executionContext = await page.mainFrame().executionContext();
const result = await executionContext.evaluate(() => Promise.resolve(8 * 7));
console.log(result); // 输出 "56"
```

入参可以是一个字符串，但不能是函数。

```js
console.log(await executionContext.evaluate('1 + 2')); // 输出 "3"
```

[JSHandle] 实例可以作为参数传递给 `executionContext.evaluate`：
```js
const oneHandle = await executionContext.evaluateHandle(() => 1);
const twoHandle = await executionContext.evaluateHandle(() => 2);
const result = await executionContext.evaluate((a, b) => a + b, oneHandle, twoHandle);
await oneHandle.dispose();
await twoHandle.dispose();
console.log(result); // 输出 '3'
```

#### executionContext.evaluateHandle(pageFunction, ...args)
- `pageFunction` <[function]|[string]> 函数在 `executionContext` 中被运行
- `...args` <...[Serializable]|[JSHandle]> 传递给 `pageFunction` 的参数
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

`executionContext.evaluate` 和 `executionContext.evaluateHandle` 唯一的区别在于`executionContext.evaluateHandle` 会返回页内对象（JSHandle）。

如果传递给 `executionContext.evaluateHandle` 的函数返回一个 [Promise]，那么`executionContext.evaluateHandle`将等待承诺解析并返回它的值。

```js
const context = await page.mainFrame().executionContext();
const aHandle = await context.evaluateHandle(() => Promise.resolve(self));
aHandle; // 处理全局对象
```

入参可以是一个字符串，但不能是函数。

```js
const aHandle = await context.evaluateHandle('1 + 2'); // 处理'3'对象
```

[JSHandle] 实例可以作为参数传递给 `executionContext.evaluateHandle`：
```js
const aHandle = await context.evaluateHandle(() => document.body);
const resultHandle = await context.evaluateHandle(body => body.innerHTML, aHandle);
console.log(await resultHandle.jsonValue()); // 输出 body 的 innerHTML
await aHandle.dispose();
await resultHandle.dispose();
```

#### executionContext.frame()
- returns: <?[Frame]> 与此执行上下文相关的框架。

> **注意** 并非每个执行的上下文都与框架有关系。 例如，workers 和扩展程序具有与框架无关的执行上下文。

#### executionContext.queryObjects(prototypeHandle)
- `prototypeHandle` <[JSHandle]> 对象原型的句柄
- returns: <[JSHandle]> 这个原型的一个对象数组的句柄

该方法重复查找 JavaScript 堆，找到具有给定原型的所有对象。

```js
// 创建一个 Map 对象
await page.evaluate(() => window.map = new Map());
// 获取 Map 对象原型的句柄
const mapPrototype = await page.evaluateHandle(() => Map.prototype);
// 将所有映射实例查询到一个数组中
const mapInstances = await page.queryObjects(mapPrototype);
// 计算堆中映射对象的数量
const count = await page.evaluate(maps => maps.length, mapInstances);
await mapInstances.dispose();
await mapPrototype.dispose();
```
