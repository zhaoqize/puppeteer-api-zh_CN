[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#environment-variables)

** 环境变量 **

Puppeteer 寻找某些环境变量来帮助其操作。 如果 puppeteer 在环境中没有找到它们，这些变量的小写变体将从 [npm 配置](https://docs.npmjs.com/cli/config) 中使用。

- `HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY` - 定义用于下载和运行 Chromium 的 HTTP 代理设置。
- `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` - 请勿在安装步骤中下载绑定的 Chromium。
- `PUPPETEER_DOWNLOAD_HOST` - 覆盖用于下载 Chromium 的 URL 的主机部分。
- `PUPPETEER_CHROMIUM_REVISION` - 在安装步骤中指定一个你喜欢 puppeteer 使用的特定版本的 Chromium。
- `PUPPETEER_EXECUTABLE_PATH` - 指定一个 Chrome 或者 Chromium 的可执行路径，会被用于 `puppeteer.launch`。具体关于可执行路径参数的意义，可参考[`puppeteer.launch([options])`](#puppeteerlaunchoptions)。

> **NOTE** 在使用 [`puppeteer-core`](https://www.npmjs.com/package/puppeteer-core) 时，上述环境变量中以 PUPPETEER_* 开头的会被忽略.
