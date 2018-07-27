[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-jshandle)

#### class: JSHandle

JSHandle 表示页面内的 JavaScript 对象。 JSHandles 可以使用 [page.evaluateHandle](＃pageevaluatehandlepagefunction-args) 方法创建。

```js
const windowHandle = await page.evaluateHandle(() => window);
// ...
```

JSHandle 可防止引用的 JavaScript 对象被垃圾收集，除非是句柄 [disposed](＃jshandledispose)。 当原始框架被导航或父上下文被破坏时，JSHandles 会自动处理。

JSHandle 实例可以使用在 [`page.$eval()`](＃pageevalselector-pagefunction-args)，[`page.evaluate()`](＃pageevaluatepagefunction-args) 和 [`page.evaluateHandle`](＃pageevaluatehandlepagefunction-args) 方法。

#### jsHandle.asElement()
- returns: <?[ElementHandle]>

如果对象句柄是 [ElementHandle] 的一个实例，则返回 `null` 或对象句柄本身。

#### jsHandle.dispose()
- returns: <[Promise]> Promise which resolves when the object handle is successfully disposed.

`jsHandle.dispose` 方法停止引用元素句柄。

#### jsHandle.executionContext()
- returns: [ExecutionContext]

返回句柄所属的执行上下文。

#### jsHandle.getProperties()
- returns: <[Promise]<[Map]<[string], [JSHandle]>>>

该方法返回一个包含属性名称作为键的映射和属性值的 JSHandle 实例。

```js
const handle = await page.evaluateHandle(() => ({window, document}));
const properties = await handle.getProperties();
const windowHandle = properties.get('window');
const documentHandle = properties.get('document');
await handle.dispose();
```

#### jsHandle.getProperty(propertyName)
- `propertyName` <[string]> 属性获取
- returns: <[Promise]<[JSHandle]>>

从引用的对象中获取单个属性。

#### jsHandle.jsonValue()
- returns: <[Promise]<[Object]>>

返回对象的 JSON 表示。如果对象又一个 [`toJSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON()_behavior)
函数, 它 **将不会被调用**。

> **注意** 如果引用的对象不可字符串化，该方法将返回一个空的 JSON 对象。 如果对象具有循环引用，它将引发一个错误。
