#### class: Puppeteer

Puppeteer 模块提供了一种启动 Chromium 实例的方法。
下面就是使用 Puppeteer 进行自动化的一个典型示例：
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  // 其他操作...
  await browser.close();
});
```

#### puppeteer.connect(options)
- `options` <[Object]>
  - `browserWSEndpoint` <[string]> 一个 [浏览器 websocket 端点链接](#browserwsendpoint)。
  - `ignoreHTTPSErrors` <[boolean]> 是否在导航期间忽略 HTTPS 错误. 默认是 `false`。
  - `slowMo` <[number]> 将 Puppeteer 操作减少指定的毫秒数。这样你就可以看清发生了什么，这很有用。
- returns: <[Promise]<[Browser]>>

此方法将 Puppeteer 添加到现有的 Chromium 实例。

#### puppeteer.createBrowserFetcher([options])
- `options` <[Object]>
  - `host` <[string]> 要使用的下载主机. 默认是 `https://storage.googleapis.com`.
  - `path` <[string]> 下载文件夹的路径. 默认是 `<root>/.local-chromium`, `<root>` 是 puppeteer 的包根目录。
  - `platform` <[string]> 可能的值有: `mac`, `win32`, `win64`, `linux`. 默认是当前平台。
- returns: <[BrowserFetcher]>

#### puppeteer.defaultArgs()
- returns: <[Array]<[string]>> 与 Chromium 一同启动带入的默认参数。

#### puppeteer.executablePath()
- returns: <[string]> Puppeteer 希望找到绑定的 Chromium 的路径。 如果使用 [`PUPPETEER_SKIP_CHROMIUM_DOWNLOAD`](#environment-variables) 跳过下载，则 Chromium 可能不存在。

#### puppeteer.launch([options])
- `options` <[Object]>  在浏览器上设置的一组可配置选项。 有以下字段：
  - `ignoreHTTPSErrors` <[boolean]> 是否在导航期间忽略 HTTPS 错误. 默认是 `false`。
  - `headless` <[boolean]> 是否以 [无头模式](https://developers.google.com/web/updates/2017/04/headless-chrome) 运行浏览器。默认是 `true`，除非 `devtools` 选项是 `true`。
  - `executablePath` <[string]> 可运行 Chromium 或 Chrome 可执行文件的路径，而不是绑定的的 Chromium。如果 `executablePath` 是一个相对路径，那么他相对于 [当前工作路径](https://nodejs.org/api/process.html#process_process_cwd) 解析。
  - `slowMo` <[number]> 将 Puppeteer 操作减少指定的毫秒数。这样你就可以看清发生了什么，这很有用。
  - `args` <[Array]<[string]>> 传递给浏览器实例的其他参数。 这些参数可以参考 [这里](http://peter.sh/experiments/chromium-command-line-switches/)。
  - `ignoreDefaultArgs` <[boolean]> 不要使用 [`puppeteer.defaultArgs()`](#puppeteerdefaultargs)。危险的选项; 谨慎使用。默认是 `false`。
  - `handleSIGINT` <[boolean]> Ctrl-C 关闭浏览器进程。默认是 `true`。
  - `handleSIGTERM` <[boolean]> 关闭 SIGTERM 上的浏览器进程。默认是 `true`。
  - `handleSIGHUP` <[boolean]> 关闭 SIGHUP 上的浏览器进程。默认是 `true`.
  - `timeout` <[number]> 等待浏览器实例启动的最长时间（以毫秒为单位）。默认是 `30000` (30 秒). 通过 `0` 来禁用超时。
  - `dumpio` <[boolean]> 是否将浏览器进程标准输出和标准错误输入到 `process.stdout` 和 `process.stderr` 中。默认是 `false`。
  - `userDataDir` <[string]> [用户数据目录](https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md) 路径。
  - `env` <[Object]> 指定浏览器可见的环境变量。默认是 `process.env`。
  - `devtools` <[boolean]> 是否为每个选项卡自动打开DevTools面板。如果这个选项是 `true`，`headless` 选项将会设置成 `false`。
  - `pipe` <[boolean]> 通过管道而不是WebSocket连接到浏览器。默认是 `false`。
- returns: <[Promise]<[Browser]>> 浏览器实例支持 Promise。

该方法启动具有给定参数的浏览器实例。当父节点 node.js 进程关闭时，浏览器将被关闭。

> **NOTE** Puppeteer 也可以用来控制 Chrome 浏览器， 但它与绑定的 Chromium 版本在一起使用效果最好。不能保证它可以与任何其他版本一起使用。谨慎地使用 `executablePath` 选项。
>
> 如果 Google Chrome（而不是Chromium）是首选，一个 [Chrome Canary](https://www.google.com/chrome/browser/canary.html) 或 [Dev Channel](https://www.chromium.org/getting-involved/dev-channel) 版本是建议的。
>
> 在上面的 [puppeteer.launch([options])](#puppeteerlaunchoptions) 中，任何提及的 Chromium 同样也适用于 Chrome。
>
> 参考 [这篇文章](https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/) 了解 Chromium and Chrome 的不同。 [`本文`](https://chromium.googlesource.com/chromium/src/+/lkcr/docs/chromium_browser_vs_google_chrome.md) 介绍了 Linux 用户的一些差异。
