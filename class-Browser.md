- [class: Browser](#class-browser)
  * [event: 'disconnected'](#event-disconnected)
  * [event: 'targetchanged'](#event-targetchanged)
  * [event: 'targetcreated'](#event-targetcreated)
  * [event: 'targetdestroyed'](#event-targetdestroyed)
  * [browser.close()](#browserclose)
  * [browser.disconnect()](#browserdisconnect)
  * [browser.newPage()](#browsernewpage)
  * [browser.pages()](#browserpages)
  * [browser.process()](#browserprocess)
  * [browser.targets()](#browsertargets)
  * [browser.userAgent()](#browseruseragent)
  * [browser.version()](#browserversion)
  * [browser.wsEndpoint()](#browserwsendpoint)

### class: Browser

* extends: [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)

当Puppeteer连接到一个Chromium实例的时候会创建一个Browser对象。通过 [`puppeteer.launch`](#puppeteerlaunchoptions) 或 [`puppeteer.connect`](#puppeteerconnectoptions)

以下是使用```Browser```去创建一个```Page```的一个例子

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await browser.close();
});
```

一个断开连接并重连到[Browser]的例子：

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  // 存储端点以便能重新连接到Chromium
  const browserWSEndpoint = browser.wsEndpoint();
  // 从Chromium断开和puppeteer的连接
  browser.disconnect();

  // 使用端点来重新建立连接
  const browser2 = await puppeteer.connect({browserWSEndpoint});
  // 关闭 Chromium
  await browser2.close();
});
```
#### event: 'disconnected'
当Puppeteer从Chromium 实例断开连接时被触发。这可能由于以下原因而发生：

- Chromium 关闭或崩溃
- 调用[`browser.disconnect`](#browserdisconnect) 方法

#### event: 'targetchanged'
- <[Target]>

当目标的url改变时被触发

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

返回一个包含所有打开的浏览器上下文的数组。在新创建的浏览器中，这将返回 [BrowserContext]的单一实例。

#### browser.close()
- returns: <[Promise]>

关闭Chromium 及其所有页面(如果页面被打开的话)。[Browser]对象本身被认为是处理过的并不能再被使用。

#### browser.createIncognitoBrowserContext()
- returns: <[Promise]<[BrowserContext]>>

创建一个匿名的浏览器上下文。这将不会于其他浏览器上下文分享cookies/cache。

```js
const browser = await puppeteer.launch();
// 创建一个匿名的浏览器上下文
const context = await browser.createIncognitoBrowserContext();
// 在一个原生的上下文中创建一个新页面
const page = await context.newPage();
// 做一些事情
await page.goto('https://example.com');
```

#### browser.disconnect()

断开Puppeteer 和浏览器的连接，但Chromium 进程仍然在运行。在调用```disconnect```之后，[Browser]对象本身被认为是处理过的并不能再被使用。

#### browser.newPage()
- returns: <[Promise]<[Page]>>

返回一个新的[Page]对象。[Page]在一个默认的浏览器上下文中被创建。

#### browser.pages()
- returns: <[Promise]<[Array]<[Page]>>> 返回一个包含所有打开的页面的数组

- returns: <?[ChildProcess]> 产生浏览器的进程。如果浏览器实例是由[`puppeteer.connect`](#puppeteerconnectoptions) 方法创建的则返回null。

#### browser.targets()
- returns: <[Array]<[Target]>>

浏览器内所有活动目标的数组。在多个浏览器上下文的情况下，该方法将返回一个包含所有浏览器上下文中的所有目标的数组。

#### browser.userAgent()
- returns: <[Promise]<[string]>> 返回浏览器原始的user-agent

> **注意** 页面可以使用[page.setUserAgent](#pagesetuseragentuseragent) 覆盖浏览器的user-agent

#### browser.version()
- returns: <[Promise]<[string]>> 对于无头的 Chromium，这类似于 `HeadlessChrome/61.0.3153.0`. 对于非无头的Chromium, 这类似于 `Chrome/61.0.3153.0。`

> **注意** browser.version() 的格式可能在未来版本的Chromium中改变。

#### browser.wsEndpoint()
- returns: <[string]> 返回浏览器websocket的地址

[puppeteer.connect](#puppeteerconnectoptions) 可以将浏览器websocket端作为一个参数。其格式为`ws://${host}:${port}/devtools/browser/<id>`。

你可以从`http://${host}:${port}/json/version` 找到`webSocketDebuggerUrl` 。了解更多有关[devtools protocol](https://chromedevtools.github.io/devtools-protocol)  和 [browser endpoint](https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target)。