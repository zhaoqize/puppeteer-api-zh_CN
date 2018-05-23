
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
[![GitHub license](https://img.shields.io/github/license/zhaoqize/puppeteer-api-zh_CN.svg)](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/LICENSE)
# Puppeteer 中文文档
### 翻译进展
- [class: Puppeteer](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Puppeteer.md)
- [class: BrowserFetcher](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-BrowserFetcher.md)
- [class: Browser](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Browser.md)
- class: BrowserContext 【待领取】
- class: Page 【已被 [ilaipi](https://github.com/ilaipi) 领取】
- class: Keyboard 已被 [15vTechAdmin5](https://github.com/15vTechAdmin5) 领取】
- [class: Mouse](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Mouse.md)
- [class: Touchscreen](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Touchscreen.md)
- [class: Tracing](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Tracing.md)
- [class: Dialog](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Dialog.md)
- [class: ConsoleMessage](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-ConsoleMessage.md)
- class: Frame 【待领取】
- class: ExecutionContext 【待领取】
- [class: JSHandle](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-JSHandle.md)
- class: ElementHandle 【待领取】
- [class: Request](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Request.md)
- [class: Response](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Response.md)
- [class: SecurityDetails](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-SecurityDetails.md)
- [class: Target](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Target.md)
- [class: CDPSession](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-CDPSession.md)
- [class: Coverage](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Coverage.md)

### 交流群
<img src="./img/pu.png" height="300">


### 贡献
欢迎大家积极参与 Puppeteer 中文文档的翻译。[如何贡献](./CONTRIBUTING.md)

# Puppeteer API v1.4.0

### 介绍

Puppeteer是一个Node库，它提供了一个高级API来通过DevTools协议控制Chromium或Chrome。

Puppeteer API是分层次的，反映了浏览器结构。 在下面的图表中，浅色框体目前不在 Puppeteer 中表现。

![puppeteer 图示](https://user-images.githubusercontent.com/746130/31592143-089f6f9a-b1db-11e7-9a20-16b7fc754fa1.png)

- [`Puppeteer`](#class-puppeteer) 使用 [DevTools协议](https://chromedevtools.github.io/devtools-protocol/) 与浏览器进行通信。
- [`浏览器`](#class-browser) 实例可以拥有多个页面。
- [`页面`](#class-page) 至少有一个框架：主框架。 可能还有其他框架由 [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) 或 [框架标签](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/frame) 创建。
- [`框架`](#class-frame) 至少有一个执行上下文 - 默认的执行上下文 - 框架的JavaScript被执行。 一个框架可能有额外的与 [扩展](https://developer.chrome.com/extensions) 关联的执行上下文。

(图例资源: [链接](https://docs.google.com/drawings/d/1Q_AM6KYs9kbyLZF-Lpp5mtpAWth73Cq8IKCsWYgi8MM/edit?usp=sharing))

### 环境变量

Puppeteer 寻找某些环境变量来帮助其操作。 如果 puppeteer 在环境中没有找到它们，这些变量的小写变体将从 [npm配置](https://docs.npmjs.com/cli/config) 中使用。

- `HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY` - 定义用于下载和运行Chromium的HTTP代理设置。
- `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` - 请勿在安装步骤中下载绑定的Chromium。
- `PUPPETEER_DOWNLOAD_HOST` - 覆盖用于下载Chromium的URL的主机部分。
- `PUPPETEER_CHROMIUM_REVISION` - 在安装步骤中指定一个你喜欢puppeteer使用的特定版本的chrome。
