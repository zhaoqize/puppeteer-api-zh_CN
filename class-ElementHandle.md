- [class: ElementHandle](#class-elementhandle)
  * [elementHandle.$(selector)](#elementhandleselector)
  * [elementHandle.$$(selector)](#elementhandleselector)
  * [elementHandle.$$eval(selector, pageFunction, ...args)](#elementhandleevalselector-pagefunction-args)
  * [elementHandle.$eval(selector, pageFunction, ...args)](#elementhandleevalselector-pagefunction-args-1)
  * [elementHandle.$x(expression)](#elementhandlexexpression)
  * [elementHandle.asElement()](#elementhandleaselement)
  * [elementHandle.boundingBox()](#elementhandleboundingbox)
  * [elementHandle.boxModel()](#elementhandleboxmodel)
  * [elementHandle.click([options])](#elementhandleclickoptions)
  * [elementHandle.contentFrame()](#elementhandlecontentframe)
  * [elementHandle.dispose()](#elementhandledispose)
  * [elementHandle.executionContext()](#elementhandleexecutioncontext)
  * [elementHandle.focus()](#elementhandlefocus)
  * [elementHandle.getProperties()](#elementhandlegetproperties)
  * [elementHandle.getProperty(propertyName)](#elementhandlegetpropertypropertyname)
  * [elementHandle.hover()](#elementhandlehover)
  * [elementHandle.isIntersectingViewport()](#elementhandleisintersectingviewport)
  * [elementHandle.jsonValue()](#elementhandlejsonvalue)
  * [elementHandle.press(key[, options])](#elementhandlepresskey-options)
  * [elementHandle.screenshot([options])](#elementhandlescreenshotoptions)
  * [elementHandle.tap()](#elementhandletap)
  * [elementHandle.toString()](#elementhandletostring)
  * [elementHandle.type(text[, options])](#elementhandletypetext-options)
  * [elementHandle.uploadFile(...filePaths)](#elementhandleuploadfilefilepaths)

### class: ElementHandle

> **注意** [ElementHandle] 类继承自 [JSHandle]。

ElementHandle 表示一个页内的 DOM 元素。ElementHandles 可以通过 [page.$](#pageselector) 方法创建。

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://google.com');
  const inputElement = await page.$('input[type=submit]');
  await inputElement.click();
  // ...
});
```

除非处理了句柄 [disposed](#elementhandledispose)，否则 ElementHandle 会阻止垃圾收集中的 DOM 元素。 ElementHandles 在其原始帧被导航时将会自动处理。

ElementHandle 实例可以在 [`page.$eval()`](#pageevalselector-pagefunction-args) 和 [`page.evaluate()`](#pageevaluatepagefunction-args) 方法中作为参数。

#### elementHandle.$(selector)
- `selector` <[string]> A [selector] to query element for
- returns: <[Promise]<?[ElementHandle]>>

该方法在页面内运行 `element.querySelector`。 如果没有元素匹配选择器，则返回值为 `null`。

#### elementHandle.$$(selector)
- `selector` <[string]> A [selector] to query element for
- returns: <[Promise]<[Array]<[ElementHandle]>>>

该方法在页面内运行 `element.querySelectorAll`。 如果没有元素匹配选择器，则返回值为 `[]`。

#### elementHandle.$eval(selector, pageFunction, ...args)
- `selector` <[string]> A [selector] to query page for
- `pageFunction` <[function]> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

这个方法在元素中运行 `document.querySelector` 并将它作为第一个参数传递给 `pageFunction`。 如果没有与 `selector` 匹配的元素，则该方法将抛出个错误。

如果 `pageFunction` 返回一个 [Promise]，那么 `frame.$eval` 将等待承诺解析并返回它的值。

例子:
```js
const tweetHandle = await page.$('.tweet');
expect(await tweetHandle.$eval('.like', node => node.innerText)).toBe('100');
expect(await tweetHandle.$eval('.retweets', node => node.innerText)).toBe('10');
```

#### elementHandle.$$eval(selector, pageFunction, ...args)
- `selector` <[string]> A [selector] to query page for
- `pageFunction` <[function]> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

该方法在元素内运行 `document.querySelectorAll`，并将其作为第一个参数传递给 `pageFunction`。 如果没有与 `selector` 匹配的元素，则该方法将抛出一个错误。

如果 `pageFunction` 返回 [Promise]，那么`frame.$$eval` 将等待 promise 解析并返回其值。

例子:
```html
<div class="feed">
  <div class="tweet">Hello!</div>
  <div class="tweet">Hi!</div>
</div>
```
```js
const feedHandle = await page.$('.feed');
expect(await feedHandle.$$eval('.tweet', nodes => nodes.map(n => n.innerText)).toEqual(['Hello!', 'Hi!']);
```

#### elementHandle.$x(expression)
- `expression` <[string]> Expression to [evaluate](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate).
- returns: <[Promise]<[Array]<[ElementHandle]>>>

该方法计算相对于 elementHandle 的 XPath 表达式。 如果不存在这样的元素，该方法将解析为一个空的数组。

#### elementHandle.asElement()
- returns: <[ElementHandle]>

#### elementHandle.boundingBox()
- returns: <[Promise]<?[Object]>>
  - x <[number]> 元素的 x 坐标（以像素为单位）。
  - y <[number]> 元素的 y 坐标（以像素为单位）。
  - width <[number]> 元素的像素宽度。
  - height <[number]> 元素的像素高度。

此方法返回元素的边界框（相对于主框架），如果元素不可见，则返回 `null`。

#### elementHandle.boxModel()
- returns: <[Promise]<?[Object]>>
  - content <[Array]<[Object]>> Content box, represented as an array of {x, y} points.
  - padding <[Array]<[Object]>> Padding box, represented as an array of {x, y} points.
  - border <[Array]<[Object]>> Border box, represented as an array of {x, y} points.
  - margin <[Array]<[Object]>> Margin box, represented as an array of {x, y} points.
  - width <[number]> Element's width.
  - height <[number]> Element's height.

改方法返回元素的盒模型，如果元素不可见，则返回 `null`。 盒模型被表示为一组点；每个 Point 都是一个对象 `{x，y}`。 盒模型的点按顺时针排序。

#### elementHandle.click([options])
- `options` <[Object]>
  - `button` <[string]> `left`, `right`, 或 `middle`, 默认是 `left`。
  - `clickCount` <[number]> 默认是 1. 见 [UIEvent.detail].
  - `delay` <[number]> `mousedown` 和 `mouseup` 之间等待的时间。 默认是 0。
- returns: <[Promise]> Promise which resolves when the element is successfully clicked. Promise gets rejected if the element is detached from DOM.

如果需要，此方法将元素滚动到视野中，然后使用 [page.mouse](#pagemouse) 单击元素的中心。
如果该元素从 DOM 中分离，则该方法将引发错误。

#### elementHandle.contentFrame()
- returns: <[Promise]<?[Frame]>> 解析为引用 iframe 节点的元素句柄的内容框架，否则为空

#### elementHandle.dispose()
- returns: <[Promise]> Promise which resolves when the element handle is successfully disposed.

`elementHandle.dispose` 方法用于停止引用元素的句柄。

#### elementHandle.executionContext()
- returns: [ExecutionContext]

#### elementHandle.focus()
- returns: <[Promise]>

在元素上调用 [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)。

#### elementHandle.getProperties()
- returns: <[Promise]<[Map]<[string], [JSHandle]>>>

该方法返回一个包含属性名称作为键的映射和属性值的 JSHandle 实例。

```js
const listHandle = await page.evaluateHandle(() => document.body.children);
const properties = await listHandle.getProperties();
const children = [];
for (const property of properties.values()) {
  const element = property.asElement();
  if (element)
    children.push(element);
}
children; // body持有 elementHandles 给 document.body 的所有子项。
```

#### elementHandle.getProperty(propertyName)
- `propertyName` <[string]> property to get
- returns: <[Promise]<[JSHandle]>>

从 objectHandle 中获取一个属性。

#### elementHandle.hover()
- returns: <[Promise]> Promise which resolves when the element is successfully hovered.

如果需要，此方法将元素滚动到视野中，然后使用 [page.mouse](#pagemouse) 将鼠标悬停在元素的中心。
如果元素从 DOM 中分离（不存在），则该方法将抛出一个错误。

#### elementHandle.isIntersectingViewport()
- returns: <[Promise]<[boolean]>> Resolves to true if the element is visible in the current viewport.

#### elementHandle.jsonValue()
- returns: <[Promise]<[Object]>>

返回对象的JSON表示。 JSON是通过对页面上的对象运行 [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 生成的，因此 [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 在puppeteer中。

> **注意** 如果引用的对象不可字符串化，该方法将抛出（一个错误）。

#### elementHandle.press(key[, options])
- `key` <[string]> 按键的名称，例如 `ArrowLeft`。 见 [USKeyboardLayout] 以获取所有键名称的列表。
- `options` <[Object]>
  - `text` <[string]> 如果指定，则使用此文本生成输入事件。
  - `delay` <[number]> `keydown` 和 `keyup` 之间等待的时间。默认是 0。
- returns: <[Promise]>

聚焦元素，然后使用 [`keyboard.down`](#keyboarddownkey-options) 和 [`keyboard.up`](#keyboardupkey)。

如果 `key` 是一个单独的字符，并且除了 `Shift` 之外没有（其他）修饰键被按下，`keypress` / `input` 事件也会被生成。 可以指定 `text` 选项来强制生成输入事件。

> **注意** 修饰键 DO 会影响 `elementHandle.press`。 按住 Shift 键将以大写形式输入文本。

#### elementHandle.screenshot([options])
- `options` <[Object]> 与 [page.screenshot](#pagescreenshotoptions) 选项相同。
- returns: <[Promise]<[Buffer]>> Promise which resolves to buffer with captured screenshot.

如果需要，此方法将元素滚动到视图中，然后使用 [page.screenshot](#pagescreenshotoptions) 截取元素的屏幕截图。
如果该元素从 DOM 中分离，则该方法将抛出一个错误。

#### elementHandle.tap()
- returns: <[Promise]> Promise which resolves when the element is successfully tapped. Promise gets rejected if the element is detached from DOM.

如果需要，此方法将元素滚动到视野中，然后使用 [touchscreen.tap](#touchscreentapx-y) 在元素的中心点击。
如果该元素从 DOM 中分离，则该方法将抛出一个错误。

#### elementHandle.toString()
- returns: <[string]>

#### elementHandle.type(text[, options])
- `text` <[string]> 要输入到焦点元素中的文本。
- `options` <[Object]>
  - `delay` <[number]> 按键之间的等待时间，默认是 0。
- returns: <[Promise]>

聚焦元素，然后为文本中的每个字符发送 `keydown`，`keypress` / `input` 和 `keyup` 事件。

按一个特殊的键，像 `Control` 或 `ArrowDown`，使用 [`elementHandle.press`](#elementhandlepresskey-options)。

```js
elementHandle.type('Hello'); // 立即输入
elementHandle.type('World', {delay: 100}); // 慢点输入，像一个用户
```

键入文本字段然后提交表单的例子：
```js
const elementHandle = await page.$('input');
await elementHandle.type('some text');
await elementHandle.press('Enter');
```

#### elementHandle.uploadFile(...filePaths)
- `...filePaths` <...[string]> 设置输入这些路径的文件的值。如果某些 `filePaths` 是相对路径，那么它们将被解析为相对于 [当前工作目录](https://nodejs.org/api/process.html#process_process_cwd)。
- returns: <[Promise]>

这个方法期望 `elementHandle` 指向一个 [输入元素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)。
