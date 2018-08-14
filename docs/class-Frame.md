[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-frame)

#### class: Frame

在每一个时间点，页面通过 [page.mainFrame()](#pagemainframe) 和 [frame.childFrames()](#framechildframes) 方法暴露当前框架的细节。

[Frame] 对象的生命周期由 3 个事件控制，它们通过 [page](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Page.md#event-frameattached) 对象监听：

- ['frameattached'](#event-frameattached) - 当框架被页面加载时触发。一个框架只会被加载一次。

- ['framenavigated'](#event-framenavigated) - 当框架改变URL时触发。

- ['framedetached'](#event-framedetached) - 当框架被页面分离时触发。一个框架只会被分离一次。

一个获得框架树的例子：

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://www.google.com/chrome/browser/canary.html');
  dumpFrameTree(page.mainFrame(), '');
  await browser.close();

  function dumpFrameTree(frame, indent) {
    console.log(indent + frame.url());
    for (let child of frame.childFrames())
      dumpFrameTree(child, indent + '  ');
  }
});
```

#### frame.$(selector)

- `selector` <[string]> Selector to query frame for

- returns: <[Promise]<?[ElementHandle]>> Promise which resolves to ElementHandle pointing to the frame element.

这个方法在框架中查询指定的选择器。如果在框架中没有匹配的元素会返回 `null`

#### frame.$$(selector)
- `selector` <[string]> Selector to query frame for
- returns: <[Promise]<[Array]<[ElementHandle]>>> Promise which resolves to ElementHandles pointing to the frame elements.

这个方法会在框架中执行 `document.querySelectorAll` 方法。如果没有元素匹配会返回 `[]`

#### frame.$$eval(selector, pageFunction[, ...args])
- `selector` <[string]> A [selector] to query frame for
- `pageFunction` <[function]> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

这个方法会在框架中执行 `Array.from(document.querySelectorAll(selector))` 方法，然后将返回值传给 `pageFunction` 函数的第一个参数。

如果 `pageFunction` 返回了一个[Promise],那么 `frame.$$eval` 将会等待Promise resolve之后返回它的值。

例子：

```js
const divsCounts = await frame.$$eval('div', divs => divs.length);
```

#### frame.$eval(selector, pageFunction[, ...args])
- `selector` <[string]> A [selector] to query frame for
- `pageFunction` <[function]> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

这个方法会在框架中执行 `document.querySelector` 方法，然后将返回值传给 `pageFunction` 函数的第一个参数。如果没有匹配到任何元素，则会抛出一个错误。

如果 `pageFunction` 返回了一个 [Promise],那么 `frame.$eval` 将会等待 Promise 并解析后返回它的值。

例如:

```js
const searchValue = await frame.$eval('#search', el => el.value);
const preloadHref = await frame.$eval('link[rel=preload]', el => el.href);
const html = await frame.$eval('.main-container', e => e.outerHTML);
```

#### frame.$x(expression)
- `expression` <[string]> Expression to [evaluate](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate).
- returns: <[Promise]<[Array]<[ElementHandle]>>>

这个方法用来执行 XPath 表达式。

#### frame.addScriptTag(options)
- `options` <[Object]>
  - `url` <[string]> URL of a script to be added.
  - `path` <[string]> Path to the JavaScript file to be injected into frame. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
  - `content` <[string]> Raw JavaScript content to be injected into frame.
  - `type` <[string]> Script type. Use 'module' in order to load a Javascript ES6 module. See [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) for more details.
- returns: <[Promise]<[ElementHandle]>> which resolves to the added tag when the script's onload fires or when the script content was injected into frame.

将 url 或脚本内容添加到 `<script>` 标签中。


#### frame.addStyleTag(options)
- `options` <[Object]>
  - `url` <[string]> URL of the `<link>` tag.
  - `path` <[string]> Path to the CSS file to be injected into frame. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
  - `content` <[string]> Raw CSS content to be injected into frame.
- returns: <[Promise]<[ElementHandle]>> which resolves to the added tag when the stylesheet's onload fires or when the CSS content was injected into frame.

根据样式路径或内容往页面中添加 `<link rel="stylesheet">` 或 `<style type="text/css">` 样式标签。

#### frame.childFrames()
- returns: <[Array]<[Frame]>>

#### frame.click(selector[, options])
- `selector` <[string]> A [selector] to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked.
- `options` <[Object]>
  - `button` <[string]> `left`, `right`, or `middle`, defaults to `left`.
  - `clickCount` <[number]> defaults to 1. See [UIEvent.detail].
  - `delay` <[number]> Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully clicked. The Promise will be rejected if there is no element matching `selector`.

这个方法选择传入的元素，如果必要的话会将元素滚动到可视区域，之后使用 [page.mouse](#pagemouse) 点击元素的内容。如果没有匹配到元素，会抛出异常。

注意：如果 `click()` 触发了导航事件，那么就会有一个由 `page.waitForNavigation()` 产生的 promise 要被解析，你可能会得到一个 promise 的竞争状态。正确的处理 click 和 wait for navigation 的方式如下：

```javascript
const [response] = await Promise.all([
  page.waitForNavigation(waitOptions),
  frame.click(selector, clickOptions),
]);
```

#### frame.content()
- returns: <[Promise]<[String]>>

获取框架完整的HTML内容，包括 doctype。

#### frame.evaluate(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to  `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

如果传给 `frame.evaluate` 的函数返回了一个 promise，那么 `frame.evaluate` 将会等到 promise resolve 时返回它的值。

如果传给 `frame.evaluate` 的函数返回了一个非序列化的值，那么 `frame.evaluate` 将返回 `undefined`

```js
const result = await frame.evaluate(() => {
  return Promise.resolve(8 * 7);
});
console.log(result); // 输出 "56"
```

也可以给函数传递字符串。

```js
console.log(await frame.evaluate('1 + 2')); // 输出 "3"
```

[ElementHandle] 实例也可以作为 `frame.evaluate` 的参数：

```js
const bodyHandle = await frame.$('body');
const html = await frame.evaluate(body => body.innerHTML, bodyHandle);
await bodyHandle.dispose();
```

#### frame.evaluateHandle(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in the page context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

`frame.evaluate` 和 `frame.evaluateHandle` 唯一的不同是 `frame.evaluateHandle` 返回页面对象（JSHandle）。

如果传给 `frame.evaluateHandle `的函数返回了一个 [Promise]，那么 `frame.evaluateHandle` 将会等到 promise resolve 时返回它的值。

```js
const aWindowHandle = await frame.evaluateHandle(() => Promise.resolve(window));
aWindowHandle; // Handle for the window object.
```

也可以向函数传递字符串。

```js
const aHandle = await frame.evaluateHandle('document'); // Handle for the 'document'.
```

[JSHandle] 实例也可以作为 `frame.evaluateHandle` 的参数:

```js
const aHandle = await frame.evaluateHandle(() => document.body);
const resultHandle = await frame.evaluateHandle(body => body.innerHTML, aHandle);
console.log(await resultHandle.jsonValue());
await resultHandle.dispose();
```


#### frame.executionContext()
- returns: <[Promise]<[ExecutionContext]>>

返回解析为框架的默认执行上下文的 promise。

#### frame.focus(selector)
- `selector` <[string]> A [selector] of an element to focus. If there are multiple elements satisfying the selector, the first will be focused.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully focused. The promise will be rejected if there is no element matching `selector`.

这个方法选择传入的元素并且使之获得焦点。如果没有匹配到元素，会抛出异常。

#### frame.hover(selector)
- `selector` <[string]> A [selector] to search for element to hover. If there are multiple elements satisfying the selector, the first will be hovered.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully hovered. Promise gets rejected if there's no element matching `selector`.

这个方法选择传入的元素，如果必要的话会滚动到视野区域中，然后使用 [page.mouse](#pagemouse) 方法将鼠标悬浮在元素的中心。

如果没有匹配到元素，会抛出异常。

#### frame.isDetached()
- returns: <[boolean]>

如果框架不被加载了返回 `true`，否则返回 `false`。


#### frame.name()
- returns: <[string]>

返回框架在标签中指定的 name 属性。

如果 name 为空，返回 id。

> **注意**  这个值在框架创建的时侯就就计算好了，如果之后修改属性的话不会更新。

#### frame.parentFrame()
- returns: <?[Frame]> Returns parent frame, if any. Detached frames and main frames return `null`.

#### frame.select(selector, ...values)
- `selector` <[string]> A [selector] to query frame for
- `...values` <...[string]> Values of options to select. If the `<select>` has the `multiple` attribute, all values are considered, otherwise only the first one is taken into account.
- returns: <[Promise]<[Array]<[string]>>> Returns an array of option values that have been successfully selected.

下拉框一旦选择了所提供的选项，`change` 和 `input` 事件将会被触发。

如果没有匹配到下拉框，会抛出异常。

```js
frame.select('select#colors', 'blue'); // 单选
frame.select('select#colors', 'red', 'green', 'blue'); // 多选
```

#### frame.setContent(html)
- `html` <[string]> HTML markup to assign to the page.
- returns: <[Promise]>

#### frame.tap(selector)
- `selector` <[string]> A [selector] to search for element to tap. If there are multiple elements satisfying the selector, the first will be tapped.
- returns: <[Promise]>

这个方法选择传入的元素，如果必要的话会滚动到视野区域中，然后使用 [page.touchscreen](#pagemouse) 方法单击元素中心。

如果没有匹配到元素，会抛出异常。

#### frame.title()
- returns: <[Promise]<[string]>> Returns page's title.

#### frame.type(selector, text[, options])
- `selector` <[string]> A [selector] of an element to type into. If there are multiple elements satisfying the selector, the first will be used.
- `text` <[string]> A text to type into a focused element.
- `options` <[Object]>
  - `delay` <[number]> Time to wait between key presses in milliseconds. Defaults to 0.
- returns: <[Promise]>

对于每一个文本中的字符执行 `keydown`、`keypress` / `input`, 和 `keyup` 事件

如果要输入特殊按键，比如 `Control` 或者 `ArrowDown`,使用 [`keyboard.press`](#keyboardpresskey-options)。

```js
frame.type('#mytextarea', 'Hello'); // 立即输入
frame.type('#mytextarea', 'World', {delay: 100}); // 延迟输入, 操作更像用户
```

#### frame.url()
- returns: <[string]>

返回框架的 url。

#### frame.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])
- `selectorOrFunctionOrTimeout` <[string]|[number]|[function]> A [selector], predicate or timeout to wait for
- `options` <[Object]> Optional waiting parameters
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to  `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to a JSHandle of the success value

这个方法根据第一个参数类型的不同起到不同的作用：

- 如果 `selectorOrFunctionOrTimeout` 是 `string`，那么第一个参数会被当作 [selector] 或者 [xpath]，取决于是不是以`//`开头的，这是 [frame.waitForSelector](#framewaitforselectorselector-options) 或   [frame.waitForXPath](#framewaitforxpathxpath-options) 的快捷方式。
- 如果 `selectorOrFunctionOrTimeout` 是 `function`，那么第一个参数会当作条件等待触发，这是 [frame.waitForFunction()](#framewaitforfunctionpagefunction-options-args) 的快捷方式。
- 如果 `selectorOrFunctionOrTimeout` 是 `number`，那么第一个参数会被当作毫秒为单位的时间，方法会在超时之后返回 promise。
- 其他类型，将会抛出错误。

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

#### frame.waitForFunction(pageFunction[, options[, ...args]])
- `pageFunction` <[function]|[string]> Function to be evaluated in browser context
- `options` <[Object]> Optional waiting parameters
  - `polling` <[string]|[number]> An interval at which the `pageFunction` is executed, defaults to `raf`. If `polling` is a number, then it is treated as an interval in milliseconds at which the function would be executed. If `polling` is a string, then it can be one of the following values:
    - `raf` - to constantly execute `pageFunction` in `requestAnimationFrame` callback. This is the tightest polling mode which is suitable to observe styling changes.
    - `mutation` - to execute `pageFunction` on every DOM mutation.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to  `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves when the `pageFunction` returns a truthy value. It resolves to a JSHandle of the truthy value.

`waitForFunction` 可以用来观察可视区域大小是否改变。

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  const watchDog = page.mainFrame().waitForFunction('window.innerWidth < 100');
  page.setViewport({width: 50, height: 50});
  await watchDog;
  await browser.close();
});
```

将 node.js 中的参数传递给 `page.waitForFunction` 函数：

```js
const selector = '.foo';
await page.waitForFunction(selector => !!document.querySelector(selector), {}, selector);
```

#### frame.waitForSelector(selector[, options])
- `selector` <[string]> A [selector] of an element to wait for
- `options` <[Object]> Optional waiting parameters
  - `visible` <[boolean]> wait for element to be present in DOM and to be visible, i.e. to not have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `hidden` <[boolean]> wait for element to not be found in the DOM or to be hidden, i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
- returns: <[Promise]<[ElementHandle]>> Promise which resolves when element specified by selector string is added to DOM.

等待被选择等待元素出现在页面中。如果调用时选择的元素已存在，则立即返回。如果在设定的毫秒时间之后没有出现，则抛出异常。

这个方法可以在切换导航时使用:

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  let currentURL;
  page.mainFrame()
    .waitForSelector('img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com'])
    await page.goto(currentURL);
  await browser.close();
});
```

#### frame.waitForXPath(xpath[, options])
- `xpath` <[string]> A [xpath] of an element to wait for
- `options` <[Object]> Optional waiting parameters
  - `visible` <[boolean]> wait for element to be present in DOM and to be visible, i.e. to not have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `hidden` <[boolean]> wait for element to not be found in the DOM or to be hidden, i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
- returns: <[Promise]<[ElementHandle]>> Promise which resolves when element specified by xpath string is added to DOM.

等待 `xpath` 出现在页面中。如果在调用函数的时候 `xpath` 已经存在，会立即返回。如果在设定的毫秒时间之后没有出现，则抛出异常。

这个方法可以在切换导航时使用:

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  let currentURL;
  page.mainFrame()
    .waitForXPath('//img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com'])
    await page.goto(currentURL);
  await browser.close();
});
```
