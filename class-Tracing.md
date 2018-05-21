- [class: Tracing](#class-tracing)
  * [tracing.start(options)](#tracingstartoptions)
  * [tracing.stop()](#tracingstop)

### class: Tracing

你可以使用 [`tracing.start`](#tracingstartoptions) 和 [`tracing.stop`](#tracingstop) 创建一个可以在 Chrome DevTools or [timeline viewer] 中打开的跟踪文件。

```js
await page.tracing.start({path: 'trace.json'});
await page.goto('https://www.google.com');
await page.tracing.stop();
```

#### tracing.start(options)
- `options` <[Object]>
  - `path` <[string]> 跟踪文件写入的路径
  - `screenshots` <[boolean]> 捕获跟踪中的屏幕截图
  - `categories` <[Array]<[string]>> 指定要使用的自定义类别替换默认值
- returns: <[Promise]>

每个浏览器一次只能激活一条跟踪。

#### tracing.stop()
- returns: <[Promise]<[Buffer]>> 承诺解决跟踪数据的缓冲区
