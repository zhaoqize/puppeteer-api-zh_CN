### 错误处理

如果 Puppeteer 方法无法执行一个请求，就会抛出一个错误。例如，[page.waitForSelector(selector[, options])](#pagewaitforselectorselector-options) 选择器如果在给定的时间范围内无法匹配节点，就会失败。

对于某些类型的错误，Puppeteer 使用特定的错误类处理。
这些类可以通过 `require('puppeteer/Errors')` 获得。

支持的类列表：
- [`TimeoutError`](#class-timeouterror)

一个处理超时错误的例子：
```js
const {TimeoutError} = require('puppeteer/Errors');

// ...

try {
  await page.waitForSelector('.foo');
} catch (e) {
  if (e instanceof TimeoutError) {
    // 如果超时，做一些处理。
  }
}
```