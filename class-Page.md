- [class: Page](#class-page)
  * [event: 'close'](#event-close)
  * [event: 'console'](#event-console)
  * [event: 'dialog'](#event-dialog)
  * [event: 'domcontentloaded'](#event-domcontentloaded)
  * [event: 'error'](#event-error)
  * [event: 'frameattached'](#event-frameattached)
  * [event: 'framedetached'](#event-framedetached)
  * [event: 'framenavigated'](#event-framenavigated)
  * [event: 'load'](#event-load)
  * [event: 'metrics'](#event-metrics)
  * [event: 'pageerror'](#event-pageerror)
  * [event: 'request'](#event-request)
  * [event: 'requestfailed'](#event-requestfailed)
  * [event: 'requestfinished'](#event-requestfinished)
  * [event: 'response'](#event-response)
  * [page.$(selector)](#pageselector)
  * [page.$$(selector)](#pageselector)
  * [page.$$eval(selector, pageFunction[, ...args])](#pageevalselector-pagefunction-args)
  * [page.$eval(selector, pageFunction[, ...args])](#pageevalselector-pagefunction-args)
  * [page.$x(expression)](#pagexexpression)
  * [page.addScriptTag(options)](#pageaddscripttagoptions)
  * [page.addStyleTag(options)](#pageaddstyletagoptions)
  * [page.authenticate(credentials)](#pageauthenticatecredentials)
  * [page.bringToFront()](#pagebringtofront)
  * [page.click(selector[, options])](#pageclickselector-options)
  * [page.close()](#pageclose)
  * [page.content()](#pagecontent)
  * [page.cookies(...urls)](#pagecookiesurls)
  * [page.coverage](#pagecoverage)
  * [page.deleteCookie(...cookies)](#pagedeletecookiecookies)
  * [page.emulate(options)](#pageemulateoptions)
  * [page.emulateMedia(mediaType)](#pageemulatemediamediatype)
  * [page.evaluate(pageFunction, ...args)](#pageevaluatepagefunction-args)
  * [page.evaluateHandle(pageFunction, ...args)](#pageevaluatehandlepagefunction-args)
  * [page.evaluateOnNewDocument(pageFunction, ...args)](#pageevaluateonnewdocumentpagefunction-args)
  * [page.exposeFunction(name, puppeteerFunction)](#pageexposefunctionname-puppeteerfunction)
  * [page.focus(selector)](#pagefocusselector)
  * [page.frames()](#pageframes)
  * [page.goBack(options)](#pagegobackoptions)
  * [page.goForward(options)](#pagegoforwardoptions)
  * [page.goto(url, options)](#pagegotourl-options)
  * [page.hover(selector)](#pagehoverselector)
  * [page.keyboard](#pagekeyboard)
  * [page.mainFrame()](#pagemainframe)
  * [page.metrics()](#pagemetrics)
  * [page.mouse](#pagemouse)
  * [page.pdf(options)](#pagepdfoptions)
  * [page.queryObjects(prototypeHandle)](#pagequeryobjectsprototypehandle)
  * [page.reload(options)](#pagereloadoptions)
  * [page.screenshot([options])](#pagescreenshotoptions)
  * [page.select(selector, ...values)](#pageselectselector-values)
  * [page.setBypassCSP(enabled)](#pagesetbypasscspenabled)
  * [page.setCacheEnabled(enabled)](#pagesetcacheenabledenabled)
  * [page.setContent(html)](#pagesetcontenthtml)
  * [page.setCookie(...cookies)](#pagesetcookiecookies)
  * [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout)
  * [page.setExtraHTTPHeaders(headers)](#pagesetextrahttpheadersheaders)
  * [page.setJavaScriptEnabled(enabled)](#pagesetjavascriptenabledenabled)
  * [page.setOfflineMode(enabled)](#pagesetofflinemodeenabled)
  * [page.setRequestInterception(value)](#pagesetrequestinterceptionvalue)
  * [page.setUserAgent(userAgent)](#pagesetuseragentuseragent)
  * [page.setViewport(viewport)](#pagesetviewportviewport)
  * [page.tap(selector)](#pagetapselector)
  * [page.target()](#pagetarget)
  * [page.title()](#pagetitle)
  * [page.touchscreen](#pagetouchscreen)
  * [page.tracing](#pagetracing)
  * [page.type(selector, text[, options])](#pagetypeselector-text-options)
  * [page.url()](#pageurl)
  * [page.viewport()](#pageviewport)
  * [page.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])](#pagewaitforselectororfunctionortimeout-options-args)
  * [page.waitForFunction(pageFunction[, options[, ...args]])](#pagewaitforfunctionpagefunction-options-args)
  * [page.waitForNavigation(options)](#pagewaitfornavigationoptions)
  * [page.waitForSelector(selector[, options])](#pagewaitforselectorselector-options)
  * [page.waitForXPath(xpath[, options])](#pagewaitforxpathxpath-options)

### 类: Page

* 继承: [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)

Page 提供操作一个tab页的方法。一个 [Browser] 实例可以有多个 [Page] 实例。

下面的例子创建一个 Page实例，导航到一个url，然后保存截图：
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'screenshot.png'});
  await browser.close();
});
```
Page会触发多种事件（下面描述的），可以用`node` [原生的方法](https://nodejs.org/api/events.html#events_class_eventemitter)来捕获处理，比如`on`, `once` 或者 `removeListener`。

下面的例子捕获了一个`page`实例的`load`事件，打印了一句话：
```js
page.once('load', () => console.log('Page loaded!'));
```

可以用`removeListener`取消对事件的监听：

```js
function logRequest(interceptedRequest) {
  console.log('A request was made:', interceptedRequest.url());
}
page.on('request', logRequest);
// 一段时间后...
page.removeListener('request', logRequest);
```

#### 事件: 'close'

当页面关闭时触发。

#### 事件: 'console'
- <[ConsoleMessage]>

当页面js代码调用了`console`的某个方法，比如`console.log`，或者`console.dir`的时候触发。（如果不监听这个事件，js源码的console语句不会输出）。当页面抛出一个错误或者经过的时候也会触发。

js源码中传给`console.log`的参数，会传给`console`事件的监听器。

一个监听`console`事件的例子：
```js
page.on('console', msg => {
  for (let i = 0; i < msg.args().length; ++i)
    console.log(`${i}: ${msg.args()[i]}`); // 译者注：这句话的效果是打印到你的代码的控制台
});
page.evaluate(() => console.log('hello', 5, {foo: 'bar'})); // 这个代码表示在页面实例中执行了console.log。如果没有监听console事件，这里的输出不会出现在你的控制台
```

#### 事件: 'dialog'
- <[Dialog]>

当js对话框出现的时候触发，比如`alert`, `prompt`, `confirm` 或者 `beforeunload`。Puppeteer可以通过[Dialog]'s [accept](#dialogacceptprompttext) 或者 [dismiss](#dialogdismiss)来响应弹窗。

#### 事件: 'domcontentloaded'

当页面的[`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)事件被触发时触发。

#### 事件: 'error'
- <[Error]>

当页面崩溃时触发。

> **注意** `error` 在`node`中有特殊的意义, 点击 [error events](https://nodejs.org/api/events.html#events_error_events) 查看详情.

#### 事件: 'frameattached'
- <[Frame]>
Tips：没用过`iframe`相关的api，直译的

当`iframe`加载的时候触发。

#### 事件: 'framedetached'
- <[Frame]>

当`iframe`从页面移除的时候触发。

#### 事件: 'framenavigated'
- <[Frame]>

当`iframe`导航到新的url时触发。

#### 事件: 'load'

当页面的 [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load) 事件被触发时触发。

#### 事件: 'metrics'
- <[Object]>
  - `title` <[string]> 传给 `console.timeStamp` 方法的title参数.
  - `metrics` <[Object]> 包含度量对象的键值对，值是<[number]>类型

当页面js代码调用了`console.timeStamp`方法时触发。`page.metrics`章节有描述所有的metrics。

#### 事件: 'pageerror'
- <[Error]> 异常信息

当发生页面js代码没有捕获的异常时触发。

#### 事件: 'request'
- <[Request]>

当页面发送一个请求时触发。参数[request]对象是只读的。
如果需要拦截并且改变请求，参考`page.setRequestInterception`章节。

#### 事件: 'requestfailed'
- <[Request]>

当页面的请求失败时触发。比如某个请求超时了。

#### 事件: 'requestfinished'
- <[Request]>

当页面的某个请求成功完成时触发。

#### 事件: 'response'
- <[Response]>

当页面的某个请求接收到对应的[response]时触发。

#### page.$(selector)
- `selector` <[string]> 选择器
- 返回: <[Promise]<?[ElementHandle]>>

此方法在页面内执行`document.querySelector`。如果没有元素匹配指定选择器，返回值是`null`。

[page.mainFrame().$(selector)](#frameselector)的简写。

#### page.$$(selector)
- `selector` <[string]> 选择器
- 返回: <[Promise]<[Array]<[ElementHandle]>>>

此方法在页面内执行`document.querySelector`。如果没有元素匹配指定选择器，返回值是`[]`。

[page.mainFrame().$$(selector)](#frameselector-1)的简写。

#### page.$$eval(selector, pageFunction[, ...args])
- `selector` <[string]> 选择器
- `pageFunction` <[function]> 在浏览器实例上下文中要执行的方法
- `...args` <...[Serializable]|[JSHandle]> 要传给`pageFunction`的参数。（比如你的代码里生成了一个变量，在页面中执行方法时需要用到，可以通过这个`args`传进去）
- 返回: <[Promise]<[Serializable]>> Promise对象，完成后是`pageFunction`的返回值

此方法在页面内执行`document.querySelectorAll`，然后把匹配到的元素数组作为第一个参数传给`pageFunction`。

如果`pageFunction`返回的是[Promise]，那么此方法会等promise完成后返回其返回值。

示例:
```js
const divsCounts = await page.$$eval('div', divs => divs.length);
```

#### page.$eval(selector, pageFunction[, ...args])
- `selector` <[string]> 选择器
- `pageFunction` <[function]> 在浏览器实例上下文中要执行的方法
- `...args` <...[Serializable]|[JSHandle]> 要传给`pageFunction`的参数。（比如你的代码里生成了一个变量，在页面中执行方法时需要用到，可以通过这个`args`传进去）
- 返回: <[Promise]<[Serializable]>> Promise对象，完成后是`pageFunction`的返回值

此方法在页面内执行`document.querySelector`，然后把匹配到的元素作为第一个参数传给`pageFunction`。

如果`pageFunction`返回的是[Promise]，那么此方法会等promise完成后返回其返回值。

示例:
```js
const searchValue = await page.$eval('#search', el => el.value);
const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
const html = await page.$eval('.main-container', e => e.outerHTML);
```

[page.mainFrame().$eval(selector, pageFunction)](#frameevalselector-pagefunction-args)的简写。

#### page.$x(expression)
- `expression` <[string]> XPath表达式，参考： [evaluate](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate).
- 返回: <[Promise]<[Array]<[ElementHandle]>>>

此方法解析指定的XPath表达式。

[page.mainFrame().$x(expression)](#framexexpression)的简写。

#### page.addScriptTag(options)
- `options` <[Object]>
  - `url` <[string]> 要添加的script的src
  - `path` <[string]> 要注入frame的js文件路径. 如果`path` 是相对路径, 那么相对 [当前路径](https://nodejs.org/api/process.html#process_process_cwd)解析。
  - `content` <[string]> 要注入页面的js代码（即<script>content</script>）
  - `type` <[string]> 脚本类型。 如果要注入`ES6 module`，值为'module'。点击 [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) 查看详情。
- 返回: <[Promise]<[ElementHandle]>> Promise对象，即注入完成的tag标签。当script的onload触发或者代码被注入到frame。

注入一个指定src(url)或者代码(content)的`script`标签到当前页面。

[page.mainFrame().addScriptTag(options)](#frameaddscripttagoptions)的简写。

#### page.addStyleTag(options)
- `options` <[Object]>
  - `url` <[string]> link标签的href属性值
  - `path` <[string]> 样式文件的路径. 如果`path` 是相对路径,那么相对 [当前路径](https://nodejs.org/api/process.html#process_process_cwd)解析。
  - `content` <[string]> css代码（即<style>content</style>）
- 返回: <[Promise]<[ElementHandle]>> Promise对象，即注入完成的tag标签。当style的onload触发或者代码被注入到frame。

添加一个指定link(url)的`<link rel="stylesheet">`标签。
或者添加一个指定代码(content)的`<style type="text/css">`标签。

[page.mainFrame().addStyleTag(options)](#frameaddstyletagoptions)的简写。

#### page.authenticate(credentials)
- `credentials` <?[Object]>
  - `username` <[string]>
  - `password` <[string]>
- 返回: <[Promise]>

为[http authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)提供认证凭据 。

传`null`禁用认证。

#### page.bringToFront()

- returns: <[Promise]>

相当于多个tab时，切换到某个tab。

#### page.browser()

- 返回: <[Browser]>

得到当前page实例所属的browser实例。

#### page.click(selector[, options])
- `selector` <[string]> 要点击的元素的选择器。 如果有多个匹配的元素, 点击第一个。
- `options` <[Object]>
  - `button` <[string]> `left`, `right`, 或者 `middle`, 默认是 `left`.
  - `clickCount` <[number]> 默认是 1. 查看 [UIEvent.detail].
  - `delay` <[number]> `mousedown` 和 `mouseup` 之间停留的时间，单位是毫秒。默认是0
- 返回: <[Promise]> Promise对象，匹配的元素被点击。 如果没有元素被点击，Promise对象将被rejected。

此方法找到一个匹配`selector`选择器的元素，如果需要会把此元素滚动到可视，然后通过[page.mouse](#pagemouse)点击它。
如果选择器没有匹配任何元素，此方法将会报错。

要注意如果`click()`触发了一个跳转，会有一个独立的`page.waitForNavigation()`Promise对象需要等待。
正确的等待点击后的跳转是这样的：

```javascript
const [response] = await Promise.all([
  page.waitForNavigation(waitOptions),
  page.click(selector, clickOptions),
]);
```

[page.mainFrame().click(selector[, options])](#frameclickselector-options)的简写。

#### page.close(options)
- `options` <[Object]>
  - `runBeforeUnload` <[boolean]> 默认 `false`. 是否执行 [before unload](https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload)
- 返回: <[Promise]>

`page.close()`默认不执行 before unload

> **注意** 如果`runBeforeUnload`设置为true，可能会弹出一个`beforeunload`对话框。
> 这个对话框需要通过页面的['dialog'](#event-dialog)事件手动处理。

#### page.content()
- 返回: <[Promise]<[String]>>

返回页面的完整html代码，包括doctype。

#### page.cookies(...urls)
- `...urls` <...[string]>
- returns: <[Promise]<[Array]<[Object]>>>
  - `name` <[string]>
  - `value` <[string]>
  - `domain` <[string]>
  - `path` <[string]>
  - `expires` <[number]> Unix time, 单位是秒
  - `httpOnly` <[boolean]>
  - `secure` <[boolean]>
  - `session` <[boolean]>
  - `sameSite` <[string]> `"Strict"` 或者 `"Lax"`.

如果不指定任何url，此方法返回当前页面域名的cookie。
如果指定了url，只返回指定的url下的cookie。

#### page.coverage

- 返回: <[Coverage]>

#### page.deleteCookie(...cookies)
- `...cookies` <...[Object]>
  - `name` <[string]> **必须的参数**
  - `url` <[string]>
  - `domain` <[string]>
  - `path` <[string]>
  - `secure` <[boolean]>
- 返回: <[Promise]>

#### page.emulate(options)
- `options` <[Object]>
  - `viewport` <[Object]>
    - `width` <[number]> 页面的宽度，单位像素.
    - `height` <[number]> 页面的高度，单位像素.
    - `deviceScaleFactor` <[number]> 定义设备缩放， (类似于 dpr). 默认 `1`.
    - `isMobile` <[boolean]> 要不要包含`meta viewport` 标签. 默认 `false`.
    - `hasTouch`<[boolean]> 指定终端是否支持触摸. 默认 `false`
    - `isLandscape` <[boolean]> 指定终端是不是 landscape 模式. 默认 `false`.
  - `userAgent` <[string]>
- 返回: <[Promise]>

根据指定的参数和user agent生成模拟器。此方法是和下面两个方法效果相同：
- [page.setUserAgent(userAgent)](#pagesetuseragentuseragent)
- [page.setViewport(viewport)](#pagesetviewportviewport)

为了辅助模拟器，puppeteer提供了一些设备的参数描述，可以通过`require('puppeteer/DeviceDescriptors')`命令引入。
下面是通过puppeteer生成iPhone 6模拟器的例子：
```js
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto('https://www.google.com');
  // other actions...
  await browser.close();
});
```

可用的设备可以在这里找到： [DeviceDescriptors.js](https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js).

#### page.emulateMedia(mediaType)
- `mediaType` <?[string]> 改变页面的css媒体类型. 支持的值仅包括 `'screen'`, `'print'` 和 `null`. 传`null`禁用媒体模拟（译者注：不太懂，原文：disable media emulation）
- returns: <[Promise]>

#### page.evaluate(pageFunction, ...args)
- `pageFunction` <[function]|[string]> 要在页面实例上下文中执行的方法
- `...args` <...[Serializable]|[JSHandle]> 要传如 `pageFunction` 的参数
- returns: <[Promise]<[Serializable]>> `pageFunction`执行的结果

如果pageFunction返回的是[Promise]，`page.evaluate`将等待promise完成，并返回其返回值。

如果pageFunction返回的是不能序列化的值，将返回`undefined`

给`pageFunction`传参数示例：
```js
const result = await page.evaluate(x => {
  return Promise.resolve(8 * x);
}, 7); // 译者注： 7 可以是你自己代码里任意方式得到的值
console.log(result); // prints "56"
```

也可以传一个字符串：
```js
console.log(await page.evaluate('1 + 2')); // prints "3"
const x = 10;
console.log(await page.evaluate(`1 + ${x}`)); // prints "11"
```

[ElementHandle] 实例 可以作为参数传给 `page.evaluate`:
```js
const bodyHandle = await page.$('body');
const html = await page.evaluate(body => body.innerHTML, bodyHandle);
await bodyHandle.dispose();
```

[page.mainFrame().evaluate(pageFunction, ...args)](#frameevaluatepagefunction-args)的简写。

#### page.evaluateHandle(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in the page context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

The only difference between `page.evaluate` and `page.evaluateHandle` is that `page.evaluateHandle` returns in-page object (JSHandle).

If the function passed to the `page.evaluateHandle` returns a [Promise], then `page.evaluateHandle` would wait for the promise to resolve and return its value.

A string can also be passed in instead of a function:
```js
const aHandle = await page.evaluateHandle('document'); // Handle for the 'document'
```

[JSHandle] instances can be passed as arguments to the `page.evaluateHandle`:
```js
const aHandle = await page.evaluateHandle(() => document.body);
const resultHandle = await page.evaluateHandle(body => body.innerHTML, aHandle);
console.log(await resultHandle.jsonValue());
await resultHandle.dispose();
```

Shortcut for [page.mainFrame().executionContext().evaluateHandle(pageFunction, ...args)](#executioncontextevaluatehandlepagefunction-args).

#### page.evaluateOnNewDocument(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in browser context
- `...args` <...[Serializable]> Arguments to pass to `pageFunction`
- returns: <[Promise]>

Adds a function which would be invoked in one of the following scenarios:
- whenever the page is navigated
- whenever the child frame is attached or navigated. In this case, the function is invoked in the context of the newly attached frame

The function is invoked after the document was created but before any of its scripts were run. This is useful to amend  the JavaScript environment, e.g. to seed `Math.random`.

An example of overriding the navigator.languages property before the page loads:

```js
// preload.js

// overwrite the `languages` property to use a custom getter
Object.defineProperty(navigator, "languages", {
  get: function() {
    return ["en-US", "en", "bn"];
  }
});

// In your puppeteer script, assuming the preload.js file is in same folder of our script
const preloadFile = fs.readFileSync('./preload.js', 'utf8');
await page.evaluateOnNewDocument(preloadFile);
```

#### page.exposeFunction(name, puppeteerFunction)
- `name` <[string]> Name of the function on the window object
- `puppeteerFunction` <[function]> Callback function which will be called in Puppeteer's context.
- returns: <[Promise]>

The method adds a function called `name` on the page's `window` object.
When called, the function executes `puppeteerFunction` in node.js and returns a [Promise] which resolves to the return value of `puppeteerFunction`.

If the `puppeteerFunction` returns a [Promise], it will be awaited.

> **NOTE** Functions installed via `page.exposeFunction` survive navigations.

An example of adding an `md5` function into the page:
```js
const puppeteer = require('puppeteer');
const crypto = require('crypto');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg.text()));
  await page.exposeFunction('md5', text =>
    crypto.createHash('md5').update(text).digest('hex')
  );
  await page.evaluate(async () => {
    // use window.md5 to compute hashes
    const myString = 'PUPPETEER';
    const myHash = await window.md5(myString);
    console.log(`md5 of ${myString} is ${myHash}`);
  });
  await browser.close();
});
```

An example of adding a `window.readfile` function into the page:

```js
const puppeteer = require('puppeteer');
const fs = require('fs');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg.text()));
  await page.exposeFunction('readfile', async filePath => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, text) => {
        if (err)
          reject(err);
        else
          resolve(text);
      });
    });
  });
  await page.evaluate(async () => {
    // use window.readfile to read contents of a file
    const content = await window.readfile('/etc/hosts');
    console.log(content);
  });
  await browser.close();
});

```

#### page.focus(selector)
- `selector` <[string]> A [selector] of an element to focus. If there are multiple elements satisfying the selector, the first will be focused.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully focused. The promise will be rejected if there is no element matching `selector`.

This method fetches an element with `selector` and focuses it.
If there's no element matching `selector`, the method throws an error.

Shortcut for [page.mainFrame().focus(selector)](#framefocusselector).

#### page.frames()
- returns: <[Array]<[Frame]>> An array of all frames attached to the page.

#### page.goBack(options)
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) method.
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
    - `load` - consider navigation to be finished when the `load` event is fired.
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms.
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms.
- returns: <[Promise]<?[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. If
can not go back, resolves to `null`.

Navigate to the previous page in history.

#### page.goForward(options)
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) method.
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
    - `load` - consider navigation to be finished when the `load` event is fired.
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms.
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms.
- returns: <[Promise]<?[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. If
can not go back, resolves to `null`.

Navigate to the next page in history.

#### page.goto(url, options)
- `url` <[string]> URL to navigate page to. The url should include scheme, e.g. `https://`.
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) method.
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
    - `load` - consider navigation to be finished when the `load` event is fired.
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms.
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms.
- returns: <[Promise]<?[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

The `page.goto` will throw an error if:
- there's an SSL error (e.g. in case of self-signed certificates).
- target URL is invalid.
- the `timeout` is exceeded during navigation.
- the main resource failed to load.

> **NOTE** `page.goto` either throw or return a main resource response. The only exception is navigation to `about:blank`, which would succeed and return `null`.

> **NOTE** Headless mode doesn't support navigating to a PDF document. See the [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).

#### page.hover(selector)
- `selector` <[string]> A [selector] to search for element to hover. If there are multiple elements satisfying the selector, the first will be hovered.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully hovered. Promise gets rejected if there's no element matching `selector`.

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.mouse](#pagemouse) to hover over the center of the element.
If there's no element matching `selector`, the method throws an error.

Shortcut for [page.mainFrame().hover(selector)](#framehoverselector).

#### page.keyboard

- returns: <[Keyboard]>

#### page.mainFrame()
- returns: <[Frame]> returns page's main frame.

Page is guaranteed to have a main frame which persists during navigations.

#### page.metrics()
- returns: <[Promise]<[Object]>> Object containing metrics as key/value pairs.
  - `Timestamp` <[number]> The timestamp when the metrics sample was taken.
  - `Documents` <[number]> Number of documents in the page.
  - `Frames` <[number]> Number of frames in the page.
  - `JSEventListeners` <[number]> Number of events in the page.
  - `Nodes` <[number]> Number of DOM nodes in the page.
  - `LayoutCount` <[number]> Total number of full or partial page layout.
  - `RecalcStyleCount` <[number]> Total number of page style recalculations.
  - `LayoutDuration` <[number]> Combined durations of all page layouts.
  - `RecalcStyleDuration` <[number]> Combined duration of all page style recalculations.
  - `ScriptDuration` <[number]> Combined duration of JavaScript execution.
  - `TaskDuration` <[number]> Combined duration of all tasks performed by the browser.
  - `JSHeapUsedSize` <[number]> Used JavaScript heap size.
  - `JSHeapTotalSize` <[number]> Total JavaScript heap size.

> **NOTE** All timestamps are in monotonic time: monotonically increasing time in seconds since an arbitrary point in the past.

#### page.mouse

- returns: <[Mouse]>

#### page.pdf(options)
- `options` <[Object]> Options object which might have the following properties:
  - `path` <[string]> The file path to save the PDF to. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). If no path is provided, the PDF won't be saved to the disk.
  - `scale` <[number]> Scale of the webpage rendering. Defaults to `1`.
  - `displayHeaderFooter` <[boolean]> Display header and footer. Defaults to `false`.
  - `headerTemplate` <[string]> HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values into them:
    - `date` formatted print date
    - `title` document title
    - `url` document location
    - `pageNumber` current page number
    - `totalPages` total pages in the document
  - `footerTemplate` <[string]> HTML template for the print footer. Should use the same format as the `headerTemplate`.
  - `printBackground` <[boolean]> Print background graphics. Defaults to `false`.
  - `landscape` <[boolean]> Paper orientation. Defaults to `false`.
  - `pageRanges` <[string]> Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
  - `format` <[string]> Paper format. If set, takes priority over `width` or `height` options. Defaults to 'Letter'.
  - `width` <[string]> Paper width, accepts values labeled with units.
  - `height` <[string]> Paper height, accepts values labeled with units.
  - `margin` <[Object]> Paper margins, defaults to none.
    - `top` <[string]> Top margin, accepts values labeled with units.
    - `right` <[string]> Right margin, accepts values labeled with units.
    - `bottom` <[string]> Bottom margin, accepts values labeled with units.
    - `left` <[string]> Left margin, accepts values labeled with units.
- returns: <[Promise]<[Buffer]>> Promise which resolves with PDF buffer.

> **NOTE** Generating a pdf is currently only supported in Chrome headless.

`page.pdf()` generates a pdf of the page with `print` css media. To generate a pdf with `screen` media, call [page.emulateMedia('screen')](#pageemulatemediamediatype) before calling `page.pdf()`:

```js
// Generates a PDF with 'screen' media type.
await page.emulateMedia('screen');
await page.pdf({path: 'page.pdf'});
```

The `width`, `height`, and `margin` options accept values labeled with units. Unlabeled values are treated as pixels.

A few examples:
- `page.pdf({width: 100})` - prints with width set to 100 pixels
- `page.pdf({width: '100px'})` - prints with width set to 100 pixels
- `page.pdf({width: '10cm'})` - prints with width set to 10 centimeters.

All possible units are:
- `px` - pixel
- `in` - inch
- `cm` - centimeter
- `mm` - millimeter

The `format` options are:
- `Letter`: 8.5in x 11in
- `Legal`: 8.5in x 14in
- `Tabloid`: 11in x 17in
- `Ledger`: 17in x 11in
- `A0`: 33.1in x 46.8in
- `A1`: 23.4in x 33.1in
- `A2`: 16.5in x 23.4in
- `A3`: 11.7in x 16.5in
- `A4`: 8.27in x 11.7in
- `A5`: 5.83in x 8.27in
- `A6`: 4.13in x 5.83in

> **NOTE** `headerTemplate` and `footerTemplate` markup have the following limitations:
> 1. Script tags inside templates are not evaluated.
> 2. Page styles are not visible inside templates.

#### page.queryObjects(prototypeHandle)
- `prototypeHandle` <[JSHandle]> A handle to the object prototype.
- returns: <[Promise]<[JSHandle]>> Promise which resolves to a handle to an array of objects with this prototype.

The method iterates the JavaScript heap and finds all the objects with the given prototype.

```js
// Create a Map object
await page.evaluate(() => window.map = new Map());
// Get a handle to the Map object prototype
const mapPrototype = await page.evaluateHandle(() => Map.prototype);
// Query all map instances into an array
const mapInstances = await page.queryObjects(mapPrototype);
// Count amount of map objects in heap
const count = await page.evaluate(maps => maps.length, mapInstances);
await mapInstances.dispose();
await mapPrototype.dispose();
```

Shortcut for [page.mainFrame().executionContext().queryObjects(prototypeHandle)](#executioncontextqueryobjectsprototypehandle).

#### page.reload(options)
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) method.
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
    - `load` - consider navigation to be finished when the `load` event is fired.
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms.
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms.
- returns: <[Promise]<[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

#### page.screenshot([options])
- `options` <[Object]> Options object which might have the following properties:
  - `path` <[string]> The file path to save the image to. The screenshot type will be inferred from file extension. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). If no path is provided, the image won't be saved to the disk.
  - `type` <[string]> Specify screenshot type, can be either `jpeg` or `png`. Defaults to 'png'.
  - `quality` <[number]> The quality of the image, between 0-100. Not applicable to `png` images.
  - `fullPage` <[boolean]> When true, takes a screenshot of the full scrollable page. Defaults to `false`.
  - `clip` <[Object]> An object which specifies clipping region of the page. Should have the following fields:
    - `x` <[number]> x-coordinate of top-left corner of clip area
    - `y` <[number]> y-coordinate of top-left corner of clip area
    - `width` <[number]> width of clipping area
    - `height` <[number]> height of clipping area
  - `omitBackground` <[boolean]> Hides default white background and allows capturing screenshots with transparency. Defaults to `false`.
- returns: <[Promise]<[Buffer]>> Promise which resolves to buffer with captured screenshot

> **NOTE** Screenshots take at least 1/6 second on OS X. See https://crbug.com/741689 for discussion.

#### page.select(selector, ...values)
- `selector` <[string]> A [selector] to query page for
- `...values` <...[string]> Values of options to select. If the `<select>` has the `multiple` attribute, all values are considered, otherwise only the first one is taken into account.
- returns: <[Promise]<[Array]<[string]>>> Returns an array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.
If there's no `<select>` element matching `selector`, the method throws an error.

```js
page.select('select#colors', 'blue'); // single selection
page.select('select#colors', 'red', 'green', 'blue'); // multiple selections
```

Shortcut for [page.mainFrame().select()](#frameselectselector-values)

#### page.setBypassCSP(enabled)
- `enabled` <[boolean]> sets bypassing of page's Content-Security-Policy.
- returns: <[Promise]>

Toggles bypassing page's Content-Security-Policy.

> **NOTE** CSP bypassing happens at the moment of CSP initialization rather then evaluation. Usually this means
that `page.setBypassCSP` should be called before navigating to the domain.

#### page.setCacheEnabled(enabled)
- `enabled` <[boolean]> sets the `enabled` state of the cache.
- returns: <[Promise]>

Toggles ignoring cache for each request based on the enabled state. By default, caching is enabled.

#### page.setContent(html)
- `html` <[string]> HTML markup to assign to the page.
- returns: <[Promise]>

#### page.setCookie(...cookies)
- `...cookies` <...[Object]>
  - `name` <[string]> **required**
  - `value` <[string]> **required**
  - `url` <[string]>
  - `domain` <[string]>
  - `path` <[string]>
  - `expires` <[number]> Unix time in seconds.
  - `httpOnly` <[boolean]>
  - `secure` <[boolean]>
  - `sameSite` <[string]> `"Strict"` or `"Lax"`.
- returns: <[Promise]>

#### page.setDefaultNavigationTimeout(timeout)
- `timeout` <[number]> Maximum navigation time in milliseconds

This setting will change the default maximum navigation time of 30 seconds for the following methods:
- [page.goto(url, options)](#pagegotourl-options)
- [page.goBack(options)](#pagegobackoptions)
- [page.goForward(options)](#pagegoforwardoptions)
- [page.reload(options)](#pagereloadoptions)
- [page.waitForNavigation(options)](#pagewaitfornavigationoptions)

#### page.setExtraHTTPHeaders(headers)
- `headers` <[Object]> An object containing additional http headers to be sent with every request. All header values must be strings.
- returns: <[Promise]>

The extra HTTP headers will be sent with every request the page initiates.

> **NOTE** page.setExtraHTTPHeaders does not guarantee the order of headers in the outgoing requests.

#### page.setJavaScriptEnabled(enabled)
- `enabled` <[boolean]> Whether or not to enable JavaScript on the page.
- returns: <[Promise]>

> **NOTE** changing this value won't affect scripts that have already been run. It will take full effect on the next [navigation](#pagegotourl-options).

#### page.setOfflineMode(enabled)
- `enabled` <[boolean]> When `true`, enables offline mode for the page.
- returns: <[Promise]>

#### page.setRequestInterception(value)
- `value` <[boolean]> Whether to enable request interception.
- returns: <[Promise]>

Activating request interception enables `request.abort`, `request.continue` and
`request.respond` methods.

An example of a naïve request interceptor that aborts all image requests:
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg'))
      interceptedRequest.abort();
    else
      interceptedRequest.continue();
  });
  await page.goto('https://example.com');
  await browser.close();
});
```

> **NOTE** Enabling request interception disables page caching.

#### page.setUserAgent(userAgent)
- `userAgent` <[string]> Specific user agent to use in this page
- returns: <[Promise]> Promise which resolves when the user agent is set.

#### page.setViewport(viewport)
- `viewport` <[Object]>
  - `width` <[number]> page width in pixels.
  - `height` <[number]> page height in pixels.
  - `deviceScaleFactor` <[number]> Specify device scale factor (can be thought of as dpr). Defaults to `1`.
  - `isMobile` <[boolean]> Whether the `meta viewport` tag is taken into account. Defaults to `false`.
  - `hasTouch`<[boolean]> Specifies if viewport supports touch events. Defaults to `false`
  - `isLandscape` <[boolean]> Specifies if viewport is in landscape mode. Defaults to `false`.
- returns: <[Promise]>

> **NOTE** in certain cases, setting viewport will reload the page in order to set the `isMobile` or `hasTouch` properties.

In the case of multiple pages in a single browser, each page can have its own viewport size.

#### page.tap(selector)
- `selector` <[string]> A [selector] to search for element to tap. If there are multiple elements satisfying the selector, the first will be tapped.
- returns: <[Promise]>

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.touchscreen](#pagetouchscreen) to tap in the center of the element.
If there's no element matching `selector`, the method throws an error.

Shortcut for [page.mainFrame().tap(selector)](#frametapselector).

#### page.target()
- returns: <[Target]> a target this page was created from.

#### page.title()
- returns: <[Promise]<[string]>> Returns page's title.

Shortcut for [page.mainFrame().title()](#frametitle).

#### page.touchscreen
- returns: <[Touchscreen]>

#### page.tracing
- returns: <[Tracing]>

#### page.type(selector, text[, options])
- `selector` <[string]> A [selector] of an element to type into. If there are multiple elements satisfying the selector, the first will be used.
- `text` <[string]> A text to type into a focused element.
- `options` <[Object]>
  - `delay` <[number]> Time to wait between key presses in milliseconds. Defaults to 0.
- returns: <[Promise]>

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [`keyboard.press`](#keyboardpresskey-options).

```js
page.type('#mytextarea', 'Hello'); // Types instantly
page.type('#mytextarea', 'World', {delay: 100}); // Types slower, like a user
```

Shortcut for [page.mainFrame().type(selector, text[, options])](#frametypeselector-text-options).

#### page.url()
- returns: <[string]>

This is a shortcut for [page.mainFrame().url()](#frameurl)

#### page.viewport()
- returns: <[Object]>
  - `width` <[number]> page width in pixels.
  - `height` <[number]> page height in pixels.
  - `deviceScaleFactor` <[number]> Specify device scale factor (can be though of as dpr). Defaults to `1`.
  - `isMobile` <[boolean]> Whether the `meta viewport` tag is taken into account. Defaults to `false`.
  - `hasTouch`<[boolean]> Specifies if viewport supports touch events. Defaults to `false`
  - `isLandscape` <[boolean]> Specifies if viewport is in landscape mode. Defaults to `false`.

#### page.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])
- `selectorOrFunctionOrTimeout` <[string]|[number]|[function]> A [selector], predicate or timeout to wait for
- `options` <[Object]> Optional waiting parameters
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to  `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to a JSHandle of the success value

This method behaves differently with respect to the type of the first parameter:
- if `selectorOrFunctionOrTimeout` is a `string`, then the first argument is treated as a [selector] or [xpath], depending on whether or not it starts with '//', and the method is a shortcut for
  [page.waitForSelector](#pagewaitforselectorselector-options) or [page.waitForXPath](#pagewaitforxpathxpath-options)
- if `selectorOrFunctionOrTimeout` is a `function`, then the first argument is treated as a predicate to wait for and the method is a shortcut for [page.waitForFunction()](#pagewaitforfunctionpagefunction-options-args).
- if `selectorOrFunctionOrTimeout` is a `number`, then the first argument is treated as a timeout in milliseconds and the method returns a promise which resolves after the timeout
- otherwise, an exception is thrown

Shortcut for [page.mainFrame().waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])](#framewaitforselectororfunctionortimeout-options-args).

#### page.waitForFunction(pageFunction[, options[, ...args]])
- `pageFunction` <[function]|[string]> Function to be evaluated in browser context
- `options` <[Object]> Optional waiting parameters
  - `polling` <[string]|[number]> An interval at which the `pageFunction` is executed, defaults to `raf`. If `polling` is a number, then it is treated as an interval in milliseconds at which the function would be executed. If `polling` is a string, then it can be one of the following values:
    - `raf` - to constantly execute `pageFunction` in `requestAnimationFrame` callback. This is the tightest polling mode which is suitable to observe styling changes.
    - `mutation` - to execute `pageFunction` on every DOM mutation.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to  `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves when the `pageFunction` returns a truthy value. It resolves to a JSHandle of the truthy value.

The `waitForFunction` can be used to observe viewport size change:
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  const watchDog = page.waitForFunction('window.innerWidth < 100');
  await page.setViewport({width: 50, height: 50});
  await watchDog;
  await browser.close();
});
```
Shortcut for [page.mainFrame().waitForFunction(pageFunction[, options[, ...args]])](#framewaitforfunctionpagefunction-options-args).

#### page.waitForNavigation(options)
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) method.
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
    - `load` - consider navigation to be finished when the `load` event is fired.
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms.
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms.
- returns: <[Promise]<[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

This resolves when the page navigates to a new URL or reloads. It is useful for when you run code
which will indirectly cause the page to navigate. Consider this example:

```js
const navigationPromise = page.waitForNavigation();
await page.click('a.my-link'); // Clicking the link will indirectly cause a navigation
await navigationPromise; // The navigationPromise resolves after navigation has finished
```

**NOTE** Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered a navigation.

#### page.waitForSelector(selector[, options])
- `selector` <[string]> A [selector] of an element to wait for
- `options` <[Object]> Optional waiting parameters
  - `visible` <[boolean]> wait for element to be present in DOM and to be visible, i.e. to not have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `hidden` <[boolean]> wait for element to not be found in the DOM or to be hidden, i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
- returns: <[Promise]<[ElementHandle]>> Promise which resolves when element specified by selector string is added to DOM.

Wait for the `selector` to appear in page. If at the moment of calling
the method the `selector` already exists, the method will return
immediately. If the selector doesn't appear after the `timeout` milliseconds of waiting, the function will throw.

This method works across navigations:
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  let currentURL;
  page
    .waitForSelector('img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com'])
    await page.goto(currentURL);
  await browser.close();
});
```
Shortcut for [page.mainFrame().waitForSelector(selector[, options])](#framewaitforselectorselector-options).

#### page.waitForXPath(xpath[, options])
- `xpath` <[string]> A [xpath] of an element to wait for
- `options` <[Object]> Optional waiting parameters
  - `visible` <[boolean]> wait for element to be present in DOM and to be visible, i.e. to not have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `hidden` <[boolean]> wait for element to not be found in the DOM or to be hidden, i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
- returns: <[Promise]<[ElementHandle]>> Promise which resolves when element specified by xpath string is added to DOM.

Wait for the `xpath` to appear in page. If at the moment of calling
the method the `xpath` already exists, the method will return
immediately. If the xpath doesn't appear after the `timeout` milliseconds of waiting, the function will throw.

This method works across navigations:
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  let currentURL;
  page
    .waitForXPath('//img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com'])
    await page.goto(currentURL);
  await browser.close();
});
```
Shortcut for [page.mainFrame().waitForXPath(xpath[, options])](#framewaitforxpathxpath-options).
