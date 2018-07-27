#### class: BrowserContext

* 继承自: [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)

BrowserContexts 提供了一种操作多个独立浏览器会话的方法。 当浏览器启动时，它已经默认使用一个 BrowserContext。 `browser.newPage()` 方法在默认的浏览器上下文中创建一个页面。

如果一个页面打开另一个页面，例如通过 `window.open` 调用，弹出的窗口将属于父页面的浏览器上下文。

Puppeteer 允许使用 `browser.createIncognitoBrowserContext()` 方法创建"隐身"浏览器上下文。
"隐身"浏览器上下文不会将任何浏览数据写入磁盘。

```js
// 创建一个新的隐身浏览器上下文
const context = await browser.createIncognitoBrowserContext();
// 在上下文中创建一个新页面
const page = await context.newPage();
// ... 在页面上做一些操作 ...
await page.goto('https://example.com');
// 不再需要时处理上下文
await context.close();
```

#### event: 'targetchanged'
- <[Target]>

浏览器上下文中目标的 url 更改时触发。

#### event: 'targetcreated'
- <[Target]>

在浏览器上下文中创建新目标时触发，例如打开了一个新页面 [`window.open`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) 或 [`browserContext.newPage`](#browsercontextnewpage)。

#### event: 'targetdestroyed'
- <[Target]>

当浏览器上下文中的目标被销毁时，例如关闭页面时触发。

#### browserContext.browser()
- returns: <[Browser]>

此浏览器上下文所属的浏览器。

#### browserContext.close()
- returns: <[Promise]>

关闭浏览器上下文。 所有属于浏览器上下文的目标将被关闭。

> **注意** 只有隐身浏览器上下文才能关闭。

#### browserContext.isIncognito()
- returns: <[boolean]>

返回 BrowserContext 是否隐身。
默认浏览器上下文是唯一的非隐身浏览器上下文。

> **注意** 默认浏览器上下文无法关闭。

#### browserContext.newPage()
- returns: <[Promise]<[Page]>>

在浏览器上下文中创建一个新页面。

#### browserContext.targets()
- returns: <[Array]<[Target]>>

浏览器上下文中所有活动目标的数组。
