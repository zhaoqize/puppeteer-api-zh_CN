自 v1.7.0 以来的每个版本我们都发布了两个包:
- [puppeteer](https://www.npmjs.com/package/puppeteer)
- [puppeteer-core](https://www.npmjs.com/package/puppeteer-core)

`puppeteer` 是浏览器自动化的 *产品*。安装后，它会下载一个版本的 Chromium，然后使用`puppeteer-core` 驱动工作。作为最终用户产品，`puppeteer` 支持一堆方便的 `PUPPETEER_ *` env 变量来调整行为。

`puppeteer-core` 是一个 *库* 来帮助驱动任何支持 DevTools 协议的东西。`puppeteer-core` 在安装时不会下载 Chromium。作为一个库，`puppeteer-core` 是完全是通过其编程接口驱动的并忽略所有`PUPPETEER_ *` env 变量。

总结一下，`puppeteer-core` 与 `puppeteer` 不同的地方：
- `puppeteer-core` 在安装时不会自动下载 Chromium。
- `puppeteer-core`忽略所有的 `PUPPETEER_*` env 变量.

在大多数情况下，你可以使用 `puppeteer` 包。

然而, 如果是下面这些情况那你需要使用 `puppeteer-core`:
- 你正在构建 DevTools 协议顶部的另一个最终用户产品或库。例如，可以使用 `puppeteer-core` 构建PDF生成器并编写下载 [`headless_shell`](https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md) 的自定义`install.js`脚本 而不是 Chromium 来节省磁盘空间。
- 你正在打包 Puppeteer 用在 Chrome 扩展应用或浏览器中以使用 DevTools 协议，因为下载额外的 Chromium 二进制文件不是必须的。