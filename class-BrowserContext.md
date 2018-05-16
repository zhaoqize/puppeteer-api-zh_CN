- [class: BrowserContext](#class-browsercontext)
  * [event: 'targetchanged'](#event-targetchanged-1)
  * [event: 'targetcreated'](#event-targetcreated-1)
  * [event: 'targetdestroyed'](#event-targetdestroyed-1)
  * [browserContext.browser()](#browsercontextbrowser)
  * [browserContext.close()](#browsercontextclose)
  * [browserContext.isIncognito()](#browsercontextisincognito)
  * [browserContext.newPage()](#browsercontextnewpage)
  * [browserContext.targets()](#browsercontexttargets)

### class: BrowserContext

* extends: [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)

BrowserContexts provide a way to operate multiple independent browser sessions. When a browser is launched, it has
a single BrowserContext used by default. The method `browser.newPage()` creates a page in the default browser context.

If a page opens another page, e.g. with a `window.open` call, the popup will belong to the parent page's browser
context.

Puppeteer allows creation of "incognito" browser contexts with `browser.createIncognitoBrowserContext()` method.
"Incognito" browser contexts don't write any browsing data to disk.

```js
// Create a new incognito browser context
const context = await browser.createIncognitoBrowserContext();
// Create a new page inside context.
const page = await context.newPage();
// ... do stuff with page ...
await page.goto('https://example.com');
// Dispose context once it's no longer needed.
await context.close();
```

#### event: 'targetchanged'
- <[Target]>

Emitted when the url of a target inside the browser context changes.

#### event: 'targetcreated'
- <[Target]>

Emitted when a new target is created inside the browser context, for example when a new page is opened by [`window.open`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) or [`browserContext.newPage`](#browsercontextnewpage).

#### event: 'targetdestroyed'
- <[Target]>

Emitted when a target inside the browser context is destroyed, for example when a page is closed.

#### browserContext.browser()
- returns: <[Browser]>

The browser this browser context belongs to.

#### browserContext.close()
- returns: <[Promise]>

Closes the browser context. All the targets that belong to the browser context
will be closed.

> **NOTE** only incognito browser contexts can be closed.

#### browserContext.isIncognito()
- returns: <[boolean]>

Returns whether BrowserContext is incognito. 
The default browser context is the only non-incognito browser context.

> **NOTE** the default browser context cannot be closed.

#### browserContext.newPage()
- returns: <[Promise]<[Page]>>

Creates a new page in the browser context.

#### browserContext.targets()
- returns: <[Array]<[Target]>>

An array of all active targets inside the browser context.