[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/v1.7.0/docs/api.md#class-browser)

#### class: Browser

* extends: [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)

当 Puppeteer 连接到一个 Chromium 实例的时候会通过 [`puppeteer.launch`](#puppeteerlaunchoptions) 或 [`puppeteer.connect`](#puppeteerconnectoptions) 创建一个 Browser 对象。

下面是使用 ```Browser``` 创建 ```Page``` 的例子

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await browser.close();
});
```

一个断开连接和重连到 [Browser] 的例子：

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  // 存储节点以便能重新连接到 Chromium
  const browserWSEndpoint = browser.wsEndpoint();
  // 从 Chromium 断开和 puppeteer 的连接
  browser.disconnect();

  // 使用节点来重新建立连接
  const browser2 = await puppeteer.connect({browserWSEndpoint});
  // 关闭 Chromium
  await browser2.close();
});
```
#### event: 'disconnected'
当 Puppeteer 从 Chromium 实例断开连接时被触发。原因可能如下：

- Chromium 关闭或崩溃
- 调用[`browser.disconnect`](#browserdisconnect) 方法

#### event: 'targetchanged'
- <[Target]>

当目标的 url 改变时被触发

> **注意** 这包括匿名浏览器上下文中的目标更改。


#### event: 'targetcreated'
- <[Target]>

当目标被创建时被触发，例如当通过 [`window.open`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) 或 [`browser.newPage`](#browsernewpage) 打开一个新的页面。

> **注意** 这包括匿名浏览器上下文中的目标创建。

#### event: 'targetdestroyed'
- <[Target]>

当目标被销毁时被触发，例如当一个页面被关闭时。

> **注意** 这包括匿名浏览器上下文中的目标销毁。

#### browser.browserContexts()
- returns: <[Array]<[BrowserContext]>>

返回一个包含所有打开的浏览器上下文的数组。在新创建的浏览器中，这将返回 [BrowserContext] 的单一实例。

#### browser.close()
- returns: <[Promise]>

关闭 Chromium 及其所有页面(如果页面被打开的话)。[Browser] 对象本身被认为是处理过的并不能再被使用。

#### browser.createIncognitoBrowserContext()
- returns: <[Promise]<[BrowserContext]>>

创建一个匿名的浏览器上下文。这将不会与其他浏览器上下文分享 cookies/cache。

```js
const browser = await puppeteer.launch();
// 创建一个匿名的浏览器上下文
const context = await browser.createIncognitoBrowserContext();
// 在一个原生的上下文中创建一个新页面
const page = await context.newPage();
// 做一些事情
await page.goto('https://example.com');
```

#### browser.defaultBrowserContext()
- returns: <[BrowserContext]>

返回一个默认的浏览器上下文。这个上下文不能被关闭。

#### browser.disconnect()

断开 Puppeteer 和浏览器的连接，但 Chromium 进程仍然在运行。在调用 ```disconnect``` 之后，[Browser] 对象本身被认为是处理过的并不能再被使用。

#### browser.newPage()
- returns: <[Promise]<[Page]>>

返回一个新的 [Page] 对象。[Page] 在一个默认的浏览器上下文中被创建。

#### browser.pages()
- returns: <[Promise]<[Array]<[Page]>>> 返回一个包含所有打开的页面的数组。页面不可见的，比如 `"background_page"` 将不会列在这。不过你可以通过 [target.page()](#targetpage) 找到它们。

返回一个浏览器中所有页面的数组。 在多个浏览器上下文的情况下，
该方法将返回一个包含所有浏览器上下文中所有页面的数组。

#### browser.process()
- returns: <?[ChildProcess]> 产生浏览器的进程。如果浏览器实例是由 [`puppeteer.connect`](#puppeteerconnectoptions) 方法创建的则返回null。

#### browser.targets()
- returns: <[Array]<[Target]>>

浏览器内所有活动目标组成的数组。在多个浏览器上下文的情况下，该方法将返回一个包含所有浏览器上下文中的所有目标的数组。

#### browser.userAgent()
- returns: <[Promise]<[string]>> 返回浏览器原始的 user-agent

> **注意** 页面可以使用 [page.setUserAgent](#pagesetuseragentuseragent) 覆盖浏览器的 user-agent

#### browser.version()
- returns: <[Promise]<[string]>> 对于无头的 Chromium，这类似于 `HeadlessChrome/61.0.3153.0`. 对于非无头的Chromium, 这类似于 `Chrome/61.0.3153.0。`

> **注意** browser.version() 的格式可能在未来版本的 Chromium 中发生变化。

#### browser.wsEndpoint()
- returns: <[string]> 返回浏览器 websocket 的地址

[puppeteer.connect](#puppeteerconnectoptions) 可以将浏览器 websocket 端作为一个参数。其格式为 `ws://${host}:${port}/devtools/browser/<id>`。

你可以从 `http://${host}:${port}/json/version` 找到 `webSocketDebuggerUrl` 。了解更多有关 [devtools protocol](https://chromedevtools.github.io/devtools-protocol) 和 [browser endpoint](https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target) 的信息。