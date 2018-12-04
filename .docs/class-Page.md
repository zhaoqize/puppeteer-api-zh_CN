[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page)

#### class: Page

* 继承: [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)

Page 提供操作一个 tab 页或者 [extension background page](https://developer.chrome.com/extensions/background_pages) 的方法。一个 [Browser] 实例可以有多个 [Page] 实例。

下面的例子创建一个 Page 实例，导航到一个 url ，然后保存截图：
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'screenshot.png'});
  await browser.close();
});
```
Page会触发多种事件（下面描述的），可以用 `node` [原生的方法](https://nodejs.org/api/events.html#events_class_eventemitter) 来捕获处理，比如 `on`,`once` 或者 `removeListener`。

下面的例子捕获了一个 `page` 实例的 `load` 事件，打印了一句话：
```js
page.once('load', () => console.log('Page loaded!'));
```

可以用 `removeListener` 取消对事件的监听：

```js
function logRequest(interceptedRequest) {
  console.log('A request was made:', interceptedRequest.url());
}
page.on('request', logRequest);
// 一段时间后...
page.removeListener('request', logRequest);
```

#### event: 'close'

当页面关闭时触发。

#### event: 'console'
- <[ConsoleMessage]>

当页面js代码调用了 `console` 的某个方法，比如 `console.log`，或者 `console.dir` 的时候触发。（如果不监听这个事件，js源码的console语句不会输出）。当页面抛出一个错误或者经过的时候也会触发。

js源码中传给 `console.log` 的参数，会传给 `console` 事件的监听器。

一个监听 `console` 事件的例子：
```js
page.on('console', msg => {
  for (let i = 0; i < msg.args().length; ++i)
    console.log(`${i}: ${msg.args()[i]}`); // 译者注：这句话的效果是打印到你的代码的控制台
});
page.evaluate(() => console.log('hello', 5, {foo: 'bar'})); // 这个代码表示在页面实例中执行了console.log。如果没有监听console事件，这里的输出不会出现在你的控制台
```

#### event: 'dialog'
- <[Dialog]>

当js对话框出现的时候触发，比如`alert`, `prompt`, `confirm` 或者 `beforeunload`。Puppeteer可以通过[Dialog]'s [accept](#dialogacceptprompttext) 或者 [dismiss](#dialogdismiss)来响应弹窗。

#### event: 'domcontentloaded'

当页面的 [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)事件被触发时触发。

#### event: 'error'
- <[Error]>

当页面崩溃时触发。

> **注意** `error` 在 `node` 中有特殊的意义, 点击 [error events](https://nodejs.org/api/events.html#events_error_events) 查看详情。

#### event: 'frameattached'
- <[Frame]>

当 `iframe` 加载的时候触发。

#### event: 'framedetached'
- <[Frame]>

当 `iframe` 从页面移除的时候触发。

#### event: 'framenavigated'
- <[Frame]>

当 `iframe` 导航到新的 url 时触发。

#### event: 'load'

当页面的 [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load) 事件被触发时触发。

#### event: 'metrics'
- <[Object]>
  - `title` <[string]> 传给 `console.timeStamp` 方法的title参数。
  - `metrics` <[Object]> 包含度量对象的键值对，值是<[number]>类型

当页面js代码调用了 `console.timeStamp` 方法时触发。`page.metrics` 章节有描述所有的 metrics。

#### event: 'pageerror'
- <[Error]> 异常信息

当发生页面js代码没有捕获的异常时触发。

#### event: 'request'
- <[Request]>

当页面发送一个请求时触发。参数 [request] 对象是只读的。
如果需要拦截并且改变请求，参考 `page.setRequestInterception` 章节。

#### event: 'requestfailed'
- <[Request]>

当页面的请求失败时触发。比如某个请求超时了。

#### event: 'requestfinished'
- <[Request]>

当页面的某个请求成功完成时触发。

#### event: 'response'
- <[Response]>

当页面的某个请求接收到对应的 [response] 时触发。

#### event: 'workercreated'
- <[Worker]>

当页面生成相应的 [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 时触发。

#### event: 'workerdestroyed'
- <[Worker]>

当页面终止相应的 [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 时触发。

#### page.$(selector)
- `selector` <[string]> 选择器
- 返回: <[Promise]<?[ElementHandle]>>

此方法在页面内执行 `document.querySelector`。如果没有元素匹配指定选择器，返回值是 `null`。

[page.mainFrame().$(selector)](#frameselector) 的简写。

#### page.$(selector)
- `selector` <[string]> 选择器
- 返回: <[Promise]<[Array]<[ElementHandle]>>>

此方法在页面内执行 `document.querySelectorAll`。如果没有元素匹配指定选择器，返回值是 `[]`。

[page.mainFrame().$$(selector)](#frameselector-1) 的简写。

#### page.$eval(selector, pageFunction[, ...args])
- `selector` <[string]> 一个框架选择器
- `pageFunction` <[function]> 在浏览器实例上下文中要执行的方法
- `...args` <...[Serializable]|[JSHandle]> 要传给 `pageFunction` 的参数。（比如你的代码里生成了一个变量，在页面中执行方法时需要用到，可以通过这个 `args` 传进去）
- 返回: <[Promise]<[Serializable]>> Promise对象，完成后是 `pageFunction` 的返回值

此方法在页面内执行 `Array.from(document.querySelectorAll(selector))`，然后把匹配到的元素数组作为第一个参数传给 `pageFunction`。

如果 `pageFunction` 返回的是 [Promise]，那么此方法会等 promise 完成后返回其返回值。

示例:
```js
const divsCounts = await page.$$eval('div', divs => divs.length);
```

#### page.$eval(selector, pageFunction[, ...args])
- `selector` <[string]> 选择器
- `pageFunction` <[function]> 在浏览器实例上下文中要执行的方法
- `...args` <...[Serializable]|[JSHandle]> 要传给 `pageFunction` 的参数。（比如你的代码里生成了一个变量，在页面中执行方法时需要用到，可以通过这个 `args` 传进去）
- 返回: <[Promise]<[Serializable]>> Promise对象，完成后是 `pageFunction` 的返回值

此方法在页面内执行 `document.querySelector`，然后把匹配到的元素作为第一个参数传给 `pageFunction`。

如果 `pageFunction` 返回的是 [Promise]，那么此方法会等 promise 完成后返回其返回值。

示例:
```js
const searchValue = await page.$eval('#search', el => el.value);
const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
const html = await page.$eval('.main-container', e => e.outerHTML);
```

[page.mainFrame().$eval(selector, pageFunction)](#frameevalselector-pagefunction-args) 的简写。

#### page.$x(expression)
- `expression` <[string]> XPath表达式，参考： [evaluate](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate).
- 返回: <[Promise]<[Array]<[ElementHandle]>>>

此方法解析指定的XPath表达式。

[page.mainFrame().$x(expression)](#framexexpression) 的简写。

#### page.addScriptTag(options)
- `options` <[Object]>
  - `url` <[string]> 要添加的script的src
  - `path` <[string]> 要注入frame的js文件路径. 如果 `path` 是相对路径, 那么相对 [当前路径](https://nodejs.org/api/process.html#process_process_cwd) 解析。
  - `content` <[string]> 要注入页面的js代码（即<script>content</script>）
  - `type` <[string]> 脚本类型。 如果要注入 `ES6 module`，值为'module'。点击 [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) 查看详情。
- 返回: <[Promise]<[ElementHandle]>> Promise对象，即注入完成的tag标签。当 script 的 onload 触发或者代码被注入到 frame。

注入一个指定src(url)或者代码(content)的 `script` 标签到当前页面。

[page.mainFrame().addScriptTag(options)](#frameaddscripttagoptions) 的简写。

#### page.addStyleTag(options)
- `options` <[Object]>
  - `url` <[string]> link标签的href属性值
  - `path` <[string]> 样式文件的路径. 如果`path` 是相对路径,那么相对 [当前路径](https://nodejs.org/api/process.html#process_process_cwd)解析。
  - `content` <[string]> css代码（即<style>content</style>）
- 返回: <[Promise]<[ElementHandle]>> Promise对象，即注入完成的tag标签。当style的onload触发或者代码被注入到frame。

添加一个指定link(url)的 `<link rel="stylesheet">` 标签。
或者添加一个指定代码(content)的 `<style type="text/css">` 标签。

[page.mainFrame().addStyleTag(options)](#frameaddstyletagoptions) 的简写。

#### page.authenticate(credentials)
- `credentials` <?[Object]>
  - `username` <[string]>
  - `password` <[string]>
- 返回: <[Promise]>

为[HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) 提供认证凭据 。

传 `null` 禁用认证。

#### page.bringToFront()

- returns: <[Promise]>

相当于多个tab时，切换到某个tab。

#### page.browser()

- 返回: <[Browser]>

得到当前 page 实例所属的 browser 实例。

#### page.click(selector[, options])
- `selector` <[string]> 要点击的元素的选择器。 如果有多个匹配的元素, 点击第一个。
- `options` <[Object]>
  - `button` <[string]> `left`, `right`, 或者 `middle`, 默认是 `left`。
  - `clickCount` <[number]> 默认是 1. 查看 [UIEvent.detail]。
  - `delay` <[number]> `mousedown` 和 `mouseup` 之间停留的时间，单位是毫秒。默认是0
- 返回: <[Promise]> Promise对象，匹配的元素被点击。 如果没有元素被点击，Promise对象将被rejected。

此方法找到一个匹配 `selector` 选择器的元素，如果需要会把此元素滚动到可视，然后通过 [page.mouse](#pagemouse) 点击它。
如果选择器没有匹配任何元素，此方法将会报错。

要注意如果 `click()` 触发了一个跳转，会有一个独立的 `page.waitForNavigation()` Promise对象需要等待。
正确的等待点击后的跳转是这样的：

```javascript
const [response] = await Promise.all([
  page.waitForNavigation(waitOptions),
  page.click(selector, clickOptions),
]);
```

[page.mainFrame().click(selector[, options])](#frameclickselector-options) 的简写。

#### page.close(options)
- `options` <[Object]>
  - `runBeforeUnload` <[boolean]> 默认 `false`. 是否执行 [before unload](https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload)
- 返回: <[Promise]>

`page.close()` 在 beforeunload 处理之前默认不执行

> **注意** 如果 `runBeforeUnload` 设置为true，可能会弹出一个 `beforeunload` 对话框。
> 这个对话框需要通过页面的 ['dialog'](#event-dialog) 事件手动处理。

#### page.content()
- 返回: <[Promise]<[String]>>

返回页面的完整 html 代码，包括 doctype。

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
  - `sameSite` <[string]> `"Strict"` 或者 `"Lax"`。

如果不指定任何 url，此方法返回当前页面域名的 cookie。
如果指定了 url，只返回指定的 url 下的 cookie。

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
    - `deviceScaleFactor` <[number]> 定义设备缩放， (类似于 dpr). 默认 `1`。
    - `isMobile` <[boolean]> 要不要包含`meta viewport` 标签. 默认 `false`。
    - `hasTouch`<[boolean]> 指定终端是否支持触摸。默认 `false`
    - `isLandscape` <[boolean]> 指定终端是不是 landscape 模式. 默认 `false`。
  - `userAgent` <[string]>
- 返回: <[Promise]>

根据指定的参数和 user agent 生成模拟器。此方法是和下面两个方法效果相同：
- [page.setUserAgent(userAgent)](#pagesetuseragentuseragent)
- [page.setViewport(viewport)](#pagesetviewportviewport)

为了支持模拟器，puppeteer 提供了一些设备的参数选项，可以通过 `require('puppeteer/DeviceDescriptors')` 命令引入。
下面是通过 puppeteer 生成 iPhone 6 模拟器的例子：
```js
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto('https://www.google.com');
  // 其他操作...
  await browser.close();
});
```

支持的设备可以在这里找到： [DeviceDescriptors.js](https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js)。

#### page.emulateMedia(mediaType)
- `mediaType` <?[string]> 改变页面的css媒体类型。支持的值仅包括 `'screen'`, `'print'` 和 `null`。传 `null` 禁用媒体模拟
- 返回: <[Promise]>

#### page.evaluate(pageFunction, ...args)
- `pageFunction` <[function]|[string]> 要在页面实例上下文中执行的方法
- `...args` <...[Serializable]|[JSHandle]> 要传给 `pageFunction` 的参数
- 返回: <[Promise]<[Serializable]>> `pageFunction`执行的结果

如果pageFunction返回的是[Promise]，`page.evaluate`将等待promise完成，并返回其返回值。

如果pageFunction返回的是不能序列化的值，将返回`undefined`

给`pageFunction`传参数示例：
```js
const result = await page.evaluate(x => {
  return Promise.resolve(8 * x);
}, 7); // （译者注： 7 可以是你自己代码里任意方式得到的值）
console.log(result); // 输出 "56"
```

也可以传一个字符串：
```js
console.log(await page.evaluate('1 + 2')); // 输出 "3"
const x = 10;
console.log(await page.evaluate(`1 + ${x}`)); // 输出 "11"
```

[ElementHandle] 实例 可以作为参数传给 `page.evaluate`:
```js
const bodyHandle = await page.$('body');
const html = await page.evaluate(body => body.innerHTML, bodyHandle);
await bodyHandle.dispose();
```

[page.mainFrame().evaluate(pageFunction, ...args)](#frameevaluatepagefunction-args) 的简写。

#### page.evaluateHandle(pageFunction, ...args)
- `pageFunction` <[function]|[string]> 要在页面实例上下文中执行的方法
- `...args` <...[Serializable]|[JSHandle]> 要传给 `pageFunction` 的参数
- 返回: <[Promise]<[JSHandle]>> `pageFunction` 执行的结果 页内类型(JSHandle)

此方法和 `page.evaluate` 的唯一区别是此方法返回的是页内类型(JSHandle)

如果传给此方法的方法（参数）返回的是Promise对象，将等待promise完成并返回其返回值

也可以传一个字符串替代方法：
```js
const aHandle = await page.evaluateHandle('document'); // 'document'对象
```

[JSHandle] 实例可以作为 `page.evaluateHandle`的参数:
```js
const aHandle = await page.evaluateHandle(() => document.body);
const resultHandle = await page.evaluateHandle(body => body.innerHTML, aHandle);
console.log(await resultHandle.jsonValue());
await resultHandle.dispose();
```

[page.mainFrame().executionContext().evaluateHandle(pageFunction, ...args)](#executioncontextevaluatehandlepagefunction-args) 的简写。

#### page.evaluateOnNewDocument(pageFunction, ...args)
- `pageFunction` <[function]|[string]> 要在页面实例上下文中执行的方法
- `...args` <...[Serializable]> 要传给 `pageFunction` 的参数
- 返回: <[Promise]>

添加一个方法，在以下某个场景被调用：
- 页面导航完成后
- 页面的iframe加载或导航完成。这种场景，指定的函数被调用的上下文是新加载的iframe。

指定的函数在所属的页面被创建并且所属页面的任意 script 执行之前被调用。常用于修改页面js环境，比如给 `Math.random` 设定种子

下面是在页面加载前重写 `navigator.languages` 属性的例子：

```js
// preload.js

// 重写 `languages` 属性，使其用一个新的get方法
Object.defineProperty(navigator, "languages", {
  get: function() {
    return ["en-US", "en", "bn"];
  }
});

// 假设 preload.js 和当前的代码在同一个目录
const preloadFile = fs.readFileSync('./preload.js', 'utf8');
await page.evaluateOnNewDocument(preloadFile);
```

#### page.exposeFunction(name, puppeteerFunction)
- `name` <[string]> 挂载到window对象的方法名
- `puppeteerFunction` <[function]> 调用name方法时实际执行的方法
- 返回: <[Promise]>

此方法添加一个命名为 `name` 的方法到页面的 `window` 对象
当调用 `name` 方法时，在 `node.js` 中执行 `puppeteerFunction`，并且返回 Promise 对象，解析后返回 `puppeteerFunction` 的返回值

如果 `puppeteerFunction` 返回的是 Promise 对象，此方法会等其解析后再返回

> **注意** 通过 `page.exposeFunction` 挂载到页面的方法在多次跳转后扔有用
(原文：> **NOTE** Functions installed via `page.exposeFunction` survive navigations.)

添加md5()到页面的例子：
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
    // 使用 window.md5 计算哈希
    const myString = 'PUPPETEER';
    const myHash = await window.md5(myString);
    console.log(`md5 of ${myString} is ${myHash}`);
  });
  await browser.close();
});
```

添加 readfile() 到页面的例子：

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
    // 使用 window.readfile 读取文件内容
    const content = await window.readfile('/etc/hosts');
    console.log(content);
  });
  await browser.close();
});

```

#### page.focus(selector)
- `selector` <[string]> 要给焦点的元素的选择器[selector]。如果有多个匹配的元素，焦点给第一个元素。
- 返回: <[Promise]> Promise对象，当`selector`选择器匹配的元素获得焦点后resolve。如果没有元素匹配指定选择器，将会rejected。

此方法找到一个匹配`selector`的元素，并且把焦点给它。
如果没有匹配的元素，此方法将报错。

[page.mainFrame().focus(selector)](#framefocusselector) 的简写。

#### page.frames()
- 返回: <[Array]<[Frame]>> 加载到页面中的所有iframe标签

#### page.goBack(options)
- `options` <[Object]> 导航配置，可选值：
  - `timeout` <[number]> 跳转等待时间，单位是毫秒, 默认是30秒, 传 `0` 表示无限等待。可以通过[page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout)方法修改默认值
  - `waitUntil` <[string]|[Array]<[string]>> 满足什么条件认为页面跳转完成，默认是`load`事件触发时。指定事件数组，那么所有事件触发后才认为是跳转完成。事件包括：
    - `load` - 页面的load事件触发时
    - `domcontentloaded` - 页面的`DOMContentLoaded`事件触发时
    - `networkidle0` - 不再有网络连接时触发（至少500毫秒后）
    - `networkidle2` - 只有2个网络连接时触发（至少500毫秒后）
- 返回: <[Promise]<?[Response]>> Promise对象resolve后是主要的请求的响应。如果有多个跳转, resolve后是最后一次跳转的响应. 如果不能回退，解析后是null

导航到页面历史的前一个页面。

#### page.goForward(options)
- `options` <[Object]> 导航配置，可选值：
  - `timeout` <[number]> 跳转等待时间，单位是毫秒, 默认是30秒, 传 `0` 表示无限等待。可以通过[page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout)方法修改默认值
  - `waitUntil` <[string]|[Array]<[string]>> 满足什么条件认为页面跳转完成，默认是 `load` 事件触发时。指定事件数组，那么所有事件触发后才认为是跳转完成。事件包括：
    - `load` - 页面的load事件触发时
    - `domcontentloaded` - 页面的 `DOMContentLoaded` 事件触发时
    - `networkidle0` - 不再有网络连接时触发（至少500毫秒后）
    - `networkidle2` - 只有2个网络连接时触发（至少500毫秒后）
- 返回: <[Promise]<?[Response]>> Promise对象resolve后是主要的请求的响应. 如果有多个跳转, resolve后是最后一次跳转的响应. 如果不能向前，resolve后是null

导航到页面历史的后一个页面。

#### page.goto(url, options)
- `url` <[string]> 导航到的地址. 地址应该带有http协议, 比如 `https://`.
- `options` <[Object]> 导航配置，可选值：
  - `timeout` <[number]> 跳转等待时间，单位是毫秒, 默认是30秒, 传 `0` 表示无限等待。可以通过[page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout)方法修改默认值
  - `waitUntil` <[string]|[Array]<[string]>> 满足什么条件认为页面跳转完成，默认是 `load` 事件触发时。指定事件数组，那么所有事件触发后才认为是跳转完成。事件包括：
    - `load` - 页面的load事件触发时
    - `domcontentloaded` - 页面的 `DOMContentLoaded` 事件触发时
    - `networkidle0` - 不再有网络连接时触发（至少500毫秒后）
    - `networkidle2` - 只有2个网络连接时触发（至少500毫秒后）
  - `referer` <[string]> Referer header value. If provided it will take preference over the referer header value set by [page.setExtraHTTPHeaders()](#pagesetextrahttpheadersheaders).
- 返回: <[Promise]<?[Response]>> Promise对象resolve后是主要的请求的响应。如果有多个跳转, resolve后是最后一次跳转的响应

以下情况此方法将报错： 
- 发生了 SSL 错误 (比如有些自签名的https证书).
- 目标地址无效
- 超时
- 主页面不能加载
- the main resource failed to load.

> **注意** `page.goto` 抛出或返回主页面的响应。唯一的例外是导航到 `about：blank` 或导航到具有不同散列的相同URL，这将成功并返回 `null`。

> **注意** 无头模式不支持打开 PDF 文件。查看 [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295)。

快捷方式 [page.mainFrame().goto(url, options)](#framegotourl-options)

#### page.hover(selector)
- `selector` <[string]> 要hover的元素的选择器。如果有多个匹配的元素，hover第一个。
- 返回: <[Promise]> Promise对象，当匹配的元素成功被hover后resolve。如果没有匹配的元素，将会rejected。

此方法找到一个匹配的元素，如果需要会把此元素滚动到可视，然后通过 [page.mouse](#pagemouse) 来hover到元素的中间。
如果没有匹配的元素，此方法将会报错。

[page.mainFrame().hover(selector)](#framehoverselector) 的简写。

#### page.isClosed()
- returns: boolean

表示页面是否被关闭。

#### page.keyboard

- 返回: <[Keyboard]>

#### page.mainFrame()
- 返回: <[Frame]> 返回页面的主frame

保证页面一直有有一个主 frame

#### page.metrics()
- 返回: <[Promise]<[Object]>> 包含指标数据的键值对：
  - `Timestamp` <[number]> 时间点(when the metrics sample was taken)
  - `Documents` <[number]> 页面的documents数量。
  - `Frames` <[number]> 页面的iframe数量。
  - `JSEventListeners` <[number]> 页面的js事件数量。
  - `Nodes` <[number]> 页面的dom节点数量。
  - `LayoutCount` <[number]> 整页面或部分页面的布局数量。
  - `RecalcStyleCount` <[number]> 页面样式重新计算数量。
  - `LayoutDuration` <[number]> 页面布局总时间。
  - `RecalcStyleDuration` <[number]> 页面样式重新计算总时间。
  - `ScriptDuration` <[number]> 页面js代码执行总时间。
  - `TaskDuration` <[number]> 页面任务执行总时间。
  - `JSHeapUsedSize` <[number]> 页面占用堆内存大小。
  - `JSHeapTotalSize` <[number]> 总的页面堆内存大小。

> **注意** All timestamps are in monotonic time: monotonically increasing time in seconds since an arbitrary point in the past.

#### page.mouse

- 返回: <[Mouse]>

#### page.pdf(options)
- `options` <[Object]> 可以有以下配置项：
  - `path` <[string]> pdf文件保存的路径。如果是相对路径，则相对[当前路径](https://nodejs.org/api/process.html#process_process_cwd)。如果不指定路径，将不保存到硬盘。
  - `scale` <[number]> 页面渲染的缩放。默认是1。缩放值必须介于0.1到2之间。
  - `displayHeaderFooter` <[boolean]> 显示页眉和页脚。默认是不显示
  - `headerTemplate` <[string]> 页眉的html模板，可以有这些变量：
    - `date` 格式化的日期
    - `title` 网页标题
    - `url` 网页地址
    - `pageNumber` 当前页码
    - `totalPages` 总页数
  - `footerTemplate` <[string]> 页脚的html模板。和页眉模板变量相同。
  - `printBackground` <[boolean]> 是否打印背景图. 默认是 `false`。
  - `landscape` <[boolean]> 页面横向(?Paper orientation). 默认为 `false`.
  - `pageRanges` <[string]> 要输出的页码范围, 比如, '1-5, 8, 11-13'。默认是空字符串，表示全部页码。
  - `format` <[string]> 页面格式。如果设置了，将覆盖 `width` 和 `height` 配置. 默认是 'Letter'。
  - `width` <[string]> 页面宽度, 接受带单位的字符串。
  - `height` <[string]> 页面高度, 接受带单位的字符串。
  - `margin` <[Object]> 页面空白白边配置，默认是空
    - `top` <[string]> 顶部的白边
    - `right` <[string]> 右侧白边, 接受带单位的字符串
    - `bottom` <[string]> 底部白边, 接受带单位的字符串
    - `left` <[string]> 左侧白边, 接受带单位的字符串
  - `preferCSSPageSize` <[boolean]> 给页面优先级声明的任何CSS `@page` 大小超过 `width` 和 `height` 或 `format` 选项中声明的大小。 默认为 `false`，它将缩放内容以适合纸张大小。
- 返回: <[Promise]<[Buffer]>> Promise对象，resolve后是pdf buffer。

> **注意** 目前仅支持无头模式的 Chrome

`page.pdf()` 生成当前页面的pdf格式，带着 `pring` css media。如果要生成带着 `screen` media的pdf，在`page.pdf()` 前面先调用 [page.emulateMedia('screen')](#pageemulatemediamediatype)

> **注意** 默认情况下，`page.pdf()` 生成一个带有修改颜色的 pdf 用于打印。 使用[`-webkit-print-color-adjust`]（https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-print-color-adjust）属性强制渲染精确的颜色。

```js
// 生成 'screen' media 格式的pdf.
await page.emulateMedia('screen');
await page.pdf({path: 'page.pdf'});
```

`width`, `height`, 和 `margin` 接受带单位的字符串. 不带单位的默认是像素(px)

几个例子:
- `page.pdf({width: 100})` - pdf将是 100 pixels宽
- `page.pdf({width: '100px'})` - pdf将是 100 pixels宽
- `page.pdf({width: '10cm'})` - pdf将是 10 厘米宽.

支持的单位包括:
- `px` - 像素
- `in` - 英寸
- `cm` - 厘米
- `mm` - 毫米

`format` 可选值：
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

> **注意** `headerTemplate` 和 `footerTemplate` 有下面的限制：
> 1. js脚本不会被执行
> 2. 页面的样式对模板内无效

#### page.queryObjects(prototypeHandle)
- `prototypeHandle` <[JSHandle]> A handle to the object prototype.
- returns: <[Promise]<[JSHandle]>> Promise which resolves to a handle to an array of objects with this prototype.

此方法遍历js堆栈，找到所有带有指定原型的对象

```js
// 创建 Map 对象
await page.evaluate(() => window.map = new Map());
// 获取 Map 对象的原型
const mapPrototype = await page.evaluateHandle(() => Map.prototype);
// 查询所有的 map 实例，存储为一个数组
const mapInstances = await page.queryObjects(mapPrototype);
// 计算堆栈中 map 对象的数量
const count = await page.evaluate(maps => maps.length, mapInstances);
await mapInstances.dispose();
await mapPrototype.dispose();
```

[page.mainFrame().executionContext().queryObjects(prototypeHandle)](#executioncontextqueryobjectsprototypehandle) 的简写

#### page.reload(options)
- `options` <[Object]> 导航配置，可选值：
  - `timeout` <[number]> 跳转等待时间，单位是毫秒, 默认是30秒, 传 `0` 表示无限等待。可以通过[page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout)方法修改默认值
  - `waitUntil` <[string]|[Array]<[string]>> 满足什么条件认为页面跳转完成，默认是 `load` 事件触发时。指定事件数组，那么所有事件触发后才认为是跳转完成。事件包括：
    - `load` - 页面的load事件触发时
    - `domcontentloaded` - 页面的 `DOMContentLoaded` 事件触发时
    - `networkidle0` - 不再有网络连接时触发（至少500毫秒后）
    - `networkidle2` - 只有2个网络连接时触发（至少500毫秒后）
- 返回: <[Promise]<?[Response]>> Promise对象解析后是主要的请求的响应. 如果有多个跳转, 解析后是最后一次跳转的响应

#### page.screenshot([options])
- `options` <[Object]> 可选配置：
  - `path` <[string]> 截图保存路径。截图图片类型将从文件扩展名推断出来。如果是相对路径，则从[当前路径](https://nodejs.org/api/process.html#process_process_cwd)解析。如果没有指定路径，图片将不会保存到硬盘。
  - `type` <[string]> 指定截图类型, 可以是 `jpeg` 或者 `png`。默认 'png'.
  - `quality` <[number]> 图片质量, 可选值 0-100. `png` 类型不适用。
  - `fullPage` <[boolean]> 如果设置为true，则对完整的页面（需要滚动的部分也包含在内）。默认是false
  - `clip` <[Object]> 指定裁剪区域。需要配置：
    - `x` <[number]> 裁剪区域相对于左上角（0， 0）的x坐标
    - `y` <[number]> 裁剪区域相对于左上角（0， 0）的y坐标
    - `width` <[number]> 裁剪的宽度
    - `height` <[number]> 裁剪的高度
  - `omitBackground` <[boolean]> 隐藏默认的白色背景，背景透明。默认不透明
  - `encoding` <[string]> 图像的编码可以是 `base64` 或 `binary`。 默认为“二进制”。
- 返回: <[Promise]<[Buffer|String]>> Promise对象，resolve后是截图的buffer

> **备注** 在OS X上 截图需要至少1/6秒。查看讨论：https://crbug.com/741689.

#### page.select(selector, ...values)
- `selector` <[string]> 要查找的选择器
- `...values` <...[string]> 查找的配置项。如果选择器有多个属性，所有的值都会查找，否则只有第一个元素被找到。(翻译不一定准确，具体要实验)
- 返回: <[Promise]<[Array]<[string]>>> 所有符合的元素

当提供的选择器完成选中后，触发`change`和`input`事件
如果没有元素匹配指定选择器，将报错。

```js
page.select('select#colors', 'blue'); // 单选择器
page.select('select#colors', 'red', 'green', 'blue'); // 多选择器
```

[page.mainFrame().select()](#frameselectselector-values) 的简写

#### page.setBypassCSP(enabled)
- `enabled` <[boolean]> 设置绕过页面的安全政策
- 返回: <[Promise]>

设置绕过页面的安全政策

> **注意** CSP 发生在 CSP 初始化而不是评估阶段。也就是说应该在导航到这个域名前设置

#### page.setCacheEnabled(enabled)
- `enabled` <[boolean]> 设置缓存的 `enabled` 状态
- 返回: <[Promise]>

设置每个请求忽略缓存。默认是启用缓存的。

#### page.setContent(html)
- `html` <[string]> 设置页面源码
- returns: <[Promise]>

#### page.setCookie(...cookies)
- `...cookies` <...[Object]>
  - `name` <[string]> **必要的参数**
  - `value` <[string]> **必要的参数**
  - `url` <[string]> 
  - `domain` <[string]> 默认为当前打开的页面
  - `path` <[string]> 默认为 "/"
  - `expires` <[number]>  秒级unix时间戳. 不填写默认为会话级cookie
  - `httpOnly` <[boolean]> 默认为false
  - `secure` <[boolean]> 默认为false
  - `sameSite` <[string]> `"Strict"` 或 `"Lax"`。
- 返回: <[Promise]>

```js
await page.setCookie({ //设定单个cookie
	name: 'cookiename', //设定cookie名称
	value: 'cookievalue', // 设定cookie内容
	domain: 'github.com', //设定cookie域名
	httpOnly: true, 
	expires: new Date().getTime()/1000 + 24 * 60 * 60, //设定cookie生命周期24小时.
});

```

如果需要设定多个cookie:

```js
const url = 'github.com' ;
		var cookie_str = 'key1=value1; key2=value2; key3=value3';
		var cookie_arr = cookie_str.split('; ').map(function(cookie){
			let arr = cookie.split('=');
			return { name: arr[0] , value: arr[1] , domain: url ,expires: new Date().getTime()/1000 + 1000} //设定cookie
		});
await page.setCookie(...cookie_arr); // 设置cookie
```

#### page.setDefaultNavigationTimeout(timeout)

- `timeout` <[number]> 最多等待时间，单位是毫秒

此方法会改变下面几个方法的默认30秒等待时间：
- [page.goto(url, options)](#pagegotourl-options)
- [page.goBack(options)](#pagegobackoptions)
- [page.goForward(options)](#pagegoforwardoptions)
- [page.reload(options)](#pagereloadoptions)
- [page.waitForNavigation(options)](#pagewaitfornavigationoptions)

#### page.setExtraHTTPHeaders(headers)
- `headers` <[Object]> 每个 HTTP 请求都会带上这些请求头。值必须是字符串
- 返回: <[Promise]>

当前页面发起的每个请求都会带上这些请求头

> **注意** 此方法不保证请求头的顺序

通过 `setExtraHTTPHeaders`  函数添加http头

```js
await page.setExtraHTTPHeaders({'isPuppeteer': '1'}); //添加http头 名称为 isPuppeteer 内容为 1
```

#### page.setGeolocation(options)

- `options`
  - `latitude` <[number]> Latitude between -90 and 90.
  - `longitude` <[number]> Longitude between -180 and 180.
  - `accuracy` <[number]> Optional non-negative accuracy value.
- returns: <[Promise]>

Sets the page's geolocation.

```js
await page.setGeolocation({latitude: 59.95, longitude: 30.31667});
```

> **注意** 考虑使用 [browserContext.overridePermissions](#browsercontextoverridepermissionsorigin-permissions) 授予页面权限去读取地址位置。

#### page.setJavaScriptEnabled(enabled)
- `enabled` <[boolean]> 是否启用js
- 返回: <[Promise]>

> **注意** 改变这个值不会影响已经执行的js。下一个跳转会完全起作用。

#### page.setOfflineMode(enabled)
- `enabled` <[boolean]> 设置 `true`, 启用离线模式。
- 返回: <[Promise]>

#### page.setRequestInterception(value)
- `value` <[boolean]> 是否启用请求拦截器
- 返回: <[Promise]>

启用请求拦截器，会激活 `request.abort`, `request.continue` 和 `request.respond` 方法。这提供了修改页面发出的网络请求的功能。

一旦启用请求拦截，每个请求都将停止，除非它继续，响应或中止。
通过请求拦截器取消所有图片请求：
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

> **注意** 启用请求拦截器会禁用页面缓存。

#### page.setUserAgent(userAgent)
- `userAgent` <[string]> Specific user agent to use in this page
- returns: <[Promise]> Promise which resolves when the user agent is set.

#### page.setViewport(viewport)
- `viewport` <[Object]>
  - `width` <[number]> 宽度，单位是像素
  - `height` <[number]> 高度，单位是像素
  - `deviceScaleFactor` <[number]> 定义设备缩放， (类似于 dpr)。 默认 `1`。
  - `isMobile` <[boolean]> 要不要包含`meta viewport` 标签。 默认 `false`。
  - `hasTouch`<[boolean]> 指定终端是否支持触摸。 默认 `false`
  - `isLandscape` <[boolean]> 指定终端是不是 landscape 模式。 默认 `false`。
- 返回: <[Promise]>

> **注意** 在大部分情况下，改变 viewport 会重新加载页面以设置 `isMobile` 或者 `hasTouch`

如果是一个浏览器多个页面的情况，每个页面都可以有单独的viewport

> **注意** 截图的结果可能因无头浏览器的headless模式的不同而不同.

#### page.tap(selector)
- `selector` <[string]> 要点击的元素的选择器。如果有多个匹配的元素，点击第一个
- 返回: <[Promise]>

此方法找到一个匹配的元素，如果需要会把此元素滚动到可视，然后通过 [page.touchscreen](#pagetouchscreen) 来点击元素的中间位置
如果没有匹配的元素，此方法会报错

[page.mainFrame().tap(selector)](#frametapselector) 的简写

#### page.target()
- 返回: <[Target]> a target this page was created from.

#### page.title()
- returns: <[Promise]<[string]>> 页面标题.

[page.mainFrame().title()](#frametitle)的简写

#### page.touchscreen
- returns: <[Touchscreen]>

#### page.tracing
- returns: <[Tracing]>

#### page.type(selector, text[, options])
- `selector` <[string]> 要输入内容的元素选择器。如果有多个匹配的元素，输入到第一个匹配的元素。
- `text` <[string]> 要输入的内容
- `options` <[Object]>
  - `delay` <[number]> 每个字符输入的延迟，单位是毫秒。默认是 0。
- 返回: <[Promise]>

每个字符输入后都会触发 `keydown`, `keypress`/`input` 和 `keyup` 事件

要点击特殊按键，比如 `Control` 或 `ArrowDown`，用 [`keyboard.press`](#keyboardpresskey-options)

```js
page.type('#mytextarea', 'Hello'); // 立即输入
page.type('#mytextarea', 'World', {delay: 100}); // 输入变慢，像一个用户
```

[page.mainFrame().type(selector, text[, options])](#frametypeselector-text-options) 的简写

#### page.url()
- 返回: <[string]>

[page.mainFrame().url()](#frameurl) 的简写

#### page.viewport()
- 返回: <?[Object]>
  - `width` <[number]> 宽度，单位是像素
  - `height` <[number]> 高度，单位是像素
  - `deviceScaleFactor` <[number]> 定义设备缩放， (类似于 dpr)。 默认 `1`。
  - `isMobile` <[boolean]> 要不要包含`meta viewport` 标签。 默认 `false`。
  - `hasTouch`<[boolean]> 指定终端是否支持触摸。 默认 `false`
  - `isLandscape` <[boolean]> 指定终端是不是 landscape 模式。 默认 `false`。

#### page.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])
- `selectorOrFunctionOrTimeout` <[string]|[number]|[function]> 选择器, 方法 或者 超时时间
- `options` <[Object]> 可选的等待参数
- `...args` <...[Serializable]|[JSHandle]> 传给  `pageFunction` 的参数
- returns: <[Promise]<[JSHandle]>> Promise which resolves to a JSHandle of the success value

此方法根据第一个参数的不同有不同的结果：
- 如果 `selectorOrFunctionOrTimeout` 是 `string`, 那么认为是 css 选择器或者一个xpath, 根据是不是'//'开头, 这时候此方法是
  [page.waitForSelector](#pagewaitforselectorselector-options) 或 [page.waitForXPath](#pagewaitforxpathxpath-options)的简写
- 如果 `selectorOrFunctionOrTimeout` 是 `function`, 那么认为是一个predicate，这时候此方法是[page.waitForFunction()](#pagewaitforfunctionpagefunction-options-args)的简写
- 如果 `selectorOrFunctionOrTimeout` 是 `number`, 那么认为是超时时间，单位是毫秒，返回的是Promise对象,在指定时间后resolve
- 否则会报错

```js
// wait for selector
await page.waitFor('.foo');
// wait for 1 second
await page.waitFor(1000);
// wait for predicate
await page.waitFor(() => !!document.querySelector('.foo'));
```

将 node.js 中的参数传递给 `page.waitFor` 函数：

```js
const selector = '.foo';
await page.waitFor(selector => !!document.querySelector(selector), {}, selector);
```

[page.mainFrame().waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])](#framewaitforselectororfunctionortimeout-options-args)的简写

#### page.waitForFunction(pageFunction[, options[, ...args]])
- `pageFunction` <[function]|[string]> 要在浏览器实例上下文执行的方法
- `options` <[Object]> 可选的等待参数：
  - `polling` <[string]|[number]> An interval at which the `pageFunction` is executed, defaults to `raf`. If `polling` is a number, then it is treated as an interval in milliseconds at which the function would be executed. If `polling` is a string, then it can be one of the following values:
    - `raf` - to constantly execute `pageFunction` in `requestAnimationFrame` callback. This is the tightest polling mode which is suitable to observe styling changes.
    - `mutation` - to execute `pageFunction` on every DOM mutation.
  - `timeout` <[number]> 最长时间，单位是毫秒. 默认 `30000` (30 seconds). 传 `0` 表示不会超时。
- `...args` <...[Serializable]|[JSHandle]> 传给  `pageFunction`的参数
- returns: <[Promise]<[JSHandle]>> Promise 对象，当 `pageFunction` 返回等于true的结果时resolve, resolves 为结果的 JSHandle 类型

`waitForFunction` 可以用来监控页面的大小变化：
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

将 node.js 中的参数传递给 `page.waitForFunction` 函数：

```js
const selector = '.foo';
await page.waitForFunction(selector => !!document.querySelector(selector), {}, selector);
```

[page.mainFrame().waitForFunction(pageFunction[, options[, ...args]])](#framewaitforfunctionpagefunction-options-args) 的简写

#### page.waitForNavigation(options)
- `options` <[Object]> 导航配置，可选值：
  - `timeout` <[number]> 跳转等待时间，单位是毫秒, 默认是30秒, 传 `0` 表示无限等待. 可以通过[page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout)方法修改默认值
  - `waitUntil` <[string]|[Array]<[string]>> 满足什么条件认为页面跳转完成，默认是 `load` 事件触发时。指定事件数组，那么所有事件触发后才认为是跳转完成。事件包括：
    - `load` - 页面的load事件触发时
    - `domcontentloaded` - 页面的`DOMContentLoaded`事件触发时
    - `networkidle0` - 不再有网络连接时触发（至少500毫秒后）
    - `networkidle2` - 只有2个网络连接时触发（至少500毫秒后）
- 返回: <[Promise]<[?Response]>> Promise对象resolve后是主要的请求的响应。如果有多个跳转, resolve后是最后一次跳转的响应。如果由于使用 History API 而导航到不同的锚点或导航，导航将以 `null` 解析。

此方法在页面跳转到一个新地址或重新加载时解析，如果你的代码会间接引起页面跳转，这个方法比较有用：
比如这个例子：

```js
const [response] = await Promise.all([
  page.waitForNavigation(), // The promise resolves after navigation has finished
  page.click('a.my-link'), // 点击该链接将间接导致导航(跳转)
]);
```

**注意** 通过 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) 改变地址会认为是一次跳转。

快捷方式 [page.mainFrame().waitForNavigation(options)](#framewaitfornavigationoptions)。

#### page.waitForRequest(urlOrPredicate, options)
- `urlOrPredicate` <[string]|[Function]> A URL or predicate to wait for.
- `options` <[Object]> Optional waiting parameters
  - `timeout` <[number]> Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout.
- returns: <[Promise]<[Request]>> Promise which resolves to the matched request.

```js
const firstRequest = await page.waitForRequest('http://example.com/resource');
const finalRequest = await page.waitForRequest(request => request.url() === 'http://example.com' && request.method() === 'GET');
return firstRequest.url();
```

#### page.waitForResponse(urlOrPredicate, options)
- `urlOrPredicate` <[string]|[Function]> A URL or predicate to wait for.
- `options` <[Object]> Optional waiting parameters
  - `timeout` <[number]> Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout.
- returns: <[Promise]<[Response]>> Promise which resolves to the matched response.

```js
const firstResponse = await page.waitForResponse('https://example.com/resource');
const finalResponse = await page.waitForResponse(response => response.url() === 'https://example.com' && response.status() === 200);
return finalResponse.ok();
```

#### page.waitForSelector(selector[, options])
- `selector` <[string]> 要等待的元素选择器
- `options` <[Object]> 可选参数：
  - `visible` <[boolean]> 等元素出现在dom中并且可以看到, 比如。 没有 `display: none` 或者 `visibility: hidden` 样式。 默认是 `false`。
  - `hidden` <[boolean]> 等元素在dom中消失或看不到, 比如。 有 `display: none` 或者 `visibility: hidden` 样式。 默认是 `false`。
  - `timeout` <[number]> 最大等待时间，单位是毫秒，默认是`30000` (30 seconds)，传0表示不会超时
- 返回: <[Promise]<[ElementHandle]>> Promise对象，当指定选择器匹配的元素添加到dom中时resolve

等待指定的选择器匹配的元素出现在页面中，如果调用此方法时已经有匹配的元素，那么此方法立即返回。
如果指定的选择器在超时时间后扔不出现，此方法会报错。

此方法在页面跳转时仍然有效：
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
[page.mainFrame().waitForSelector(selector[, options])](#framewaitforselectorselector-options) 的简写

#### page.waitForXPath(xpath[, options])
- `xpath` <[string]> 要等待的元素的xpath
- `options` <[Object]> 可选参数：
  - `visible` <[boolean]> 等元素出现在dom中并且可以看到, 比如. 没有 `display: none` 或者 `visibility: hidden` 样式. 默认是 `false`.
  - `hidden` <[boolean]> 等元素在dom中消失或看不到, 比如. 有 `display: none` 或者 `visibility: hidden` 样式. 默认是 `false`.
  - `timeout` <[number]> 最大等待时间，单位是毫秒，默认是`30000` (30 seconds)，传0表示不会超时
- 返回: <[Promise]<[ElementHandle]>> Promise对象，当指定xpath匹配的元素添加到dom中时resolve

等待指定的xpath匹配的元素出现在页面中，如果调用此方法时已经有匹配的元素，那么此方法立即返回。
如果指定的xpath在超时时间后扔不出现，此方法会报错。

此方法在页面跳转时仍然有效：
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
[page.mainFrame().waitForXPath(xpath[, options])](#framewaitforxpathxpath-options) 的简写

#### page.workers()
- returns: <Array<Worker>> 该方法返回所有与页面关联的 [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

> **备注** 这不包含 ServiceWorkers
