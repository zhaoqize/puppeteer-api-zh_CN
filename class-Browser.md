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

A Browser is created when Puppeteer connects to a Chromium instance, either through [`puppeteer.launch`](#puppeteerlaunchoptions) or [`puppeteer.connect`](#puppeteerconnectoptions).

An example of using a [Browser] to create a [Page]:
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await browser.close();
});
```

An example of disconnecting from and reconnecting to a [Browser]:
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  // Store the endpoint to be able to reconnect to Chromium
  const browserWSEndpoint = browser.wsEndpoint();
  // Disconnect puppeteer from Chromium
  browser.disconnect();

  // Use the endpoint to reestablish a connection
  const browser2 = await puppeteer.connect({browserWSEndpoint});
  // Close Chromium
  await browser2.close();
});
```
#### event: 'disconnected'
Emitted when Puppeteer gets disconnected from the Chromium instance. This might happen because of one of the following:
- Chromium is closed or crashed
- The [`browser.disconnect`](#browserdisconnect) method was called

#### event: 'targetchanged'
- <[Target]>

Emitted when the url of a target changes.

> **NOTE** This includes target changes in incognito browser contexts.


#### event: 'targetcreated'
- <[Target]>

Emitted when a target is created, for example when a new page is opened by [`window.open`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) or [`browser.newPage`](#browsernewpage).

> **NOTE** This includes target creations in incognito browser contexts.

#### event: 'targetdestroyed'
- <[Target]>

Emitted when a target is destroyed, for example when a page is closed.

> **NOTE** This includes target destructions in incognito browser contexts.

#### browser.browserContexts()
- returns: <[Array]<[BrowserContext]>>

Returns an array of all open browser contexts. In a newly created browser, this will return
a single instance of [BrowserContext].

#### browser.close()
- returns: <[Promise]>

Closes Chromium and all of its pages (if any were opened). The [Browser] object itself is considered to be disposed and cannot be used anymore.

#### browser.createIncognitoBrowserContext()
- returns: <[Promise]<[BrowserContext]>>

Creates a new incognito browser context. This won't share cookies/cache with other browser contexts.

```js
const browser = await puppeteer.launch();
// Create a new incognito browser context.
const context = await browser.createIncognitoBrowserContext();
// Create a new page in a pristine context.
const page = await context.newPage();
// Do stuff
await page.goto('https://example.com');
```

#### browser.disconnect()

Disconnects Puppeteer from the browser, but leaves the Chromium process running. After calling `disconnect`, the [Browser] object is considered disposed and cannot be used anymore.

#### browser.newPage()
- returns: <[Promise]<[Page]>>

Promise which resolves to a new [Page] object. The [Page] is created in a default browser context.

#### browser.pages()
- returns: <[Promise]<[Array]<[Page]>>> Promise which resolves to an array of all open pages.

#### browser.process()
- returns: <?[ChildProcess]> Spawned browser process. Returns `null` if the browser instance was created with [`puppeteer.connect`](#puppeteerconnectoptions) method.

#### browser.targets()
- returns: <[Array]<[Target]>>

An array of all active targets inside the Browser. In case of multiple browser contexts,
the method will return an array with all the targets in all browser contexts.

#### browser.userAgent()
- returns: <[Promise]<[string]>> Promise which resolves to the browser's original user agent.

> **NOTE** Pages can override browser user agent with [page.setUserAgent](#pagesetuseragentuseragent)

#### browser.version()
- returns: <[Promise]<[string]>> For headless Chromium, this is similar to `HeadlessChrome/61.0.3153.0`. For non-headless, this is similar to `Chrome/61.0.3153.0`.

> **NOTE** the format of browser.version() might change with future releases of Chromium.

#### browser.wsEndpoint()
- returns: <[string]> Browser websocket url.

Browser websocket endpoint which can be used as an argument to
[puppeteer.connect](#puppeteerconnectoptions). The format is `ws://${host}:${port}/devtools/browser/<id>`

You can find the `webSocketDebuggerUrl` from `http://${host}:${port}/json/version`. Learn more about the [devtools protocol](https://chromedevtools.github.io/devtools-protocol) and the [browser endpoint](https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target).
