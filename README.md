# Puppeteer 中文文档
[![npm](https://img.shields.io/npm/v/puppeteer-api-zh_cn.svg?style=flat)](https://github.com/zhaoqize/puppeteer-api-zh_CN)
[![GitHub license](https://img.shields.io/github/license/zhaoqize/puppeteer-api-zh_CN.svg)](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
- [Environment Variables](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/Environment_Variables.md)
- [Working with Chrome Extensions](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/Working_with_Chrome_Extensions.md)
- [class: Puppeteer](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Puppeteer.md)
- [class: BrowserFetcher](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-BrowserFetcher.md)
- [class: Browser](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Browser.md)
- [class: BrowserContext](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-BrowserContext.md)
- [class: Page](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Page.md)
- [class: Keyboard](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Keyboard.md)
- [class: Mouse](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Mouse.md)
- [class: Touchscreen](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Touchscreen.md)
- [class: Tracing](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Tracing.md)
- [class: Dialog](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Dialog.md)
- [class: ConsoleMessage](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-ConsoleMessage.md)
- [class: Frame](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Frame.md)
- [class: ExecutionContext](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-ExecutionContext.md)
- [class: JSHandle](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-JSHandle.md)
- [class: ElementHandle](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-ElementHandle.md)
- [class: Request](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Request.md)
- [class: Response](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Response.md)
- [class: SecurityDetails](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-SecurityDetails.md)
- [class: Target](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Target.md)
- [class: CDPSession](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-CDPSession.md)
- [class: Coverage](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Coverage.md)
- [class: Worker](https://github.com/zhaoqize/puppeteer-api-zh_CN/blob/master/class-Worker.md)

### 技术交流
<img src="./img/a.jpeg" height="300">


### 贡献
欢迎大家积极参与 Puppeteer 中文文档的翻译。[如何贡献](./CONTRIBUTING.md)
> [译文排版规则指北](https://github.com/xitu/gold-miner/wiki/%E8%AF%91%E6%96%87%E6%8E%92%E7%89%88%E8%A7%84%E5%88%99%E6%8C%87%E5%8C%97)

# Puppeteer API Tip-Of-Tree

### 介绍

Puppeteer是一个Node库，它提供了一个高级API来通过DevTools协议控制Chromium或Chrome。

Puppeteer API是分层次的，反映了浏览器结构。 

> 注意：在下面的图表中，浅色框体内容目前不在 Puppeteer 中体现。

![puppeteer 概述](https://user-images.githubusercontent.com/746130/40333229-5df5480c-5d0c-11e8-83cb-c3e371de7374.png)

- [`Puppeteer`](#class-puppeteer) 使用 [DevTools协议](https://chromedevtools.github.io/devtools-protocol/) 与浏览器进行通信。
- [`Browser`](#class-browser) 实例可以拥有浏览器上下文。
- [`BrowserContext`](#class-browsercontext) 实例定义了一个浏览会话并可拥有多个页面。
- [`Page`](#class-page) 至少有一个框架：主框架。 可能还有其他框架由 [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) 或 [框架标签](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/frame) 创建。
- [`frame`](#class-frame) 至少有一个执行上下文 - 默认的执行上下文 - 框架的JavaScript被执行。 一个框架可能有额外的与 [扩展](https://developer.chrome.com/extensions) 关联的执行上下文。
- [`Worker`](#class-worker) 具有单一执行上下文，并且便于与 [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 进行交互。

(图例资源: [链接](https://docs.google.com/drawings/d/1Q_AM6KYs9kbyLZF-Lpp5mtpAWth73Cq8IKCsWYgi8MM/edit?usp=sharing))
