[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-puppeteer)

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
  - `defaultViewport` <?[Object]> 为每个页面设置一个默认视口大小。默认是 800x600。如果为 `null` 的话就禁用视图口。
    - `width` <[number]> 页面宽度像素。
    - `height` <[number]> 页面高度像素。
    - `deviceScaleFactor` <[number]> 设置设备的缩放（可以认为是 dpr）。默认是 `1`。
    - `isMobile` <[boolean]> 是否在页面中设置了 `meta viewport` 标签。默认是 `false`。
    - `hasTouch`<[boolean]> 指定viewport是否支持触摸事件。默认是 `false`。
    - `isLandscape` <[boolean]> 指定视口是否处于横向模式。默认是 `false`。
  - `slowMo` <[number]> 将 Puppeteer 操作减少指定的毫秒数。这样你就可以看清发生了什么，这很有用。
- returns: <[Promise]<[Browser]>>

此方法将 Puppeteer 添加到现有的 Chromium 实例。

#### puppeteer.createBrowserFetcher([options])
- `options` <[Object]>
  - `host` <[string]> 要使用的下载主机. 默认是 `https://storage.googleapis.com`.
  - `path` <[string]> 下载文件夹的路径. 默认是 `<root>/.local-chromium`, `<root>` 是 puppeteer 的包根目录。
  - `platform` <[string]> 可能的值有: `mac`, `win32`, `win64`, `linux`. 默认是当前平台。
- returns: <[BrowserFetcher]>

#### puppeteer.defaultArgs([options])
- `options` <[Object]>  设置浏览器可选项。有一下字段：
  - `headless` <[boolean]> 是否在 [无头模式]((https://developers.google.com/web/updates/2017/04/headless-chrome) 下运行浏览器。默认是 `true` 除非  `devtools` 选项是 `true`。
  - `args` <[Array]<[string]>> 传递给浏览器实例的其他参数。可以 [在这](http://peter.sh/experiments/chromium-command-line-switches/) 找到 Chromium 标志列表。
  - `userDataDir` <[string]> [用户数据目录](https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md) 的路径。
  - `devtools` <[boolean]> 是否为每个选项卡自动打开 DevTools 面板。如果这个选项是 `true` 的话, `headless` 选项将被设置为 `false`。
- returns: <[Array]<[string]>>

Chromium 启动时将使用的默认参数。

#### puppeteer.executablePath()
- returns: <[string]> Puppeteer 希望找到绑定的 Chromium 的路径。 如果使用 [`PUPPETEER_SKIP_CHROMIUM_DOWNLOAD`](#environment-variables) 跳过下载，则 Chromium 可能不存在。

#### puppeteer.launch([options])
- `options` <[Object]>  在浏览器上设置的一组可配置选项。 有以下字段：
  - `ignoreHTTPSErrors` <[boolean]> 是否在导航期间忽略 HTTPS 错误. 默认是 `false`。
  - `headless` <[boolean]> 是否以 [无头模式](https://developers.google.com/web/updates/2017/04/headless-chrome) 运行浏览器。默认是 `true`，除非 `devtools` 选项是 `true`。
  - `executablePath` <[string]> 可运行 Chromium 或 Chrome 可执行文件的路径，而不是绑定的的 Chromium。如果 `executablePath` 是一个相对路径，那么他相对于 [当前工作路径](https://nodejs.org/api/process.html#process_process_cwd) 解析。
  - `slowMo` <[number]> 将 Puppeteer 操作减少指定的毫秒数。这样你就可以看清发生了什么，这很有用。
  - `defaultViewport` <?[Object]> 为每个页面设置一个默认视口大小。默认是 800x600。如果为 `null` 的话就禁用视图口。
    - `width` <[number]> 页面宽度像素。
    - `height` <[number]> 页面高度像素。
    - `deviceScaleFactor` <[number]> 设置设备的缩放（可以认为是 dpr）。默认是 `1`。
    - `isMobile` <[boolean]> 是否在页面中设置了 `meta viewport` 标签。默认是 `false`。
    - `hasTouch`<[boolean]> 指定viewport是否支持触摸事件。默认是 `false`。
    - `isLandscape` <[boolean]> 指定视口是否处于横向模式。默认是 `false`。
  - `args` <[Array]<[string]>> 传递给浏览器实例的其他参数。 这些参数可以参考 [这里](http://peter.sh/experiments/chromium-command-line-switches/)。
  - `ignoreDefaultArgs` <([boolean]|<[Array]<[string]>>)> 如果是 `true`，那就不要使用 [`puppeteer.defaultArgs()`](#puppeteerdefaultargs-options)。 如果给出了数组，则过滤掉给定的默认参数。这个选项请谨慎使用。默认为 `false`。
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

这个方法结合了下面3个步骤：
1、使用 `puppeteer.defaultArgs()` 作为一组默认值来启动 Chromium。
2、启动浏览器并根据 `executablePath` ，`handleSIGINT`，`dumpio` 和其他选项开始管理它的进程。
3、创建一个 [Browser] 类的实例，并根据 `defaultViewport`，`slowMo` 和 `ignoreHTTPSErrors` 初始化它。

`ignoreDefaultArgs` 选项可用于自定义（1）步骤的行为。 例如，要从参数中过滤掉 `--mute-audio`：
```js
const browser = await puppeteer.launch({
  ignoreDefaultArgs: ['--mute-audio']
});
```

> **NOTE** Puppeteer 也可以用来控制 Chrome 浏览器， 但它与绑定的 Chromium 版本在一起使用效果最好。不能保证它可以与任何其他版本一起使用。谨慎地使用 `executablePath` 选项。
>
> 如果 Google Chrome（而不是Chromium）是首选，一个 [Chrome Canary](https://www.google.com/chrome/browser/canary.html) 或 [Dev Channel](https://www.chromium.org/getting-involved/dev-channel) 版本是建议的。
>
> 在上面的 [puppeteer.launch([options])](#puppeteerlaunchoptions) 中，任何提及的 Chromium 同样也适用于 Chrome。
>
> 参考 [这篇文章](https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/) 了解 Chromium and Chrome 的不同。 [`本文`](https://chromium.googlesource.com/chromium/src/+/lkcr/docs/chromium_browser_vs_google_chrome.md) 介绍了 Linux 用户的一些差异。
