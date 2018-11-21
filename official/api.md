# Puppeteer API <!-- GEN:version -->Tip-Of-Tree<!-- GEN:stop-->

<!-- GEN:empty-if-release -->
> Next Release: **Nov 29, 2018**
<!-- GEN:stop -->
- API Translations: [中文|Chinese](https://zhaoqize.github.io/puppeteer-api-zh_CN/#/)
- Releases per Chromium Version:
  * Chromium 72.0.3582.0 - [Puppeteer v1.10.0](https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md)
  * Chromium 71.0.3563.0 - [Puppeteer v1.9.0](https://github.com/GoogleChrome/puppeteer/blob/v1.9.0/docs/api.md)
  * Chromium 70.0.3508.0 - [Puppeteer v1.7.0](https://github.com/GoogleChrome/puppeteer/blob/v1.7.0/docs/api.md)
  * Chromium 69.0.3494.0 - [Puppeteer v1.6.2](https://github.com/GoogleChrome/puppeteer/blob/v1.6.2/docs/api.md)
  * Chromium 68.0.3419.0 - [Puppeteer v1.4.0](https://github.com/GoogleChrome/puppeteer/blob/v1.4.0/docs/api.md)
  * Chromium 67.0.3392.0 - [Puppeteer v1.3.0](https://github.com/GoogleChrome/puppeteer/blob/v1.3.0/docs/api.md)
  * [All releases](https://github.com/GoogleChrome/puppeteer/releases)


##### Table of Contents

<!-- GEN:toc -->
- [Overview](#overview)
- [puppeteer vs puppeteer-core](#puppeteer-vs-puppeteer-core)
- [Environment Variables](#environment-variables)
- [Error handling](#error-handling)
- [Working with Chrome Extensions](#working-with-chrome-extensions)
- [class: Puppeteer](#class-puppeteer)
  * [puppeteer.connect(options)](#puppeteerconnectoptions)
  * [puppeteer.createBrowserFetcher([options])](#puppeteercreatebrowserfetcheroptions)
  * [puppeteer.defaultArgs([options])](#puppeteerdefaultargsoptions)
  * [puppeteer.executablePath()](#puppeteerexecutablepath)
  * [puppeteer.launch([options])](#puppeteerlaunchoptions)
- [class: BrowserFetcher](#class-browserfetcher)
  * [browserFetcher.canDownload(revision)](#browserfetchercandownloadrevision)
  * [browserFetcher.download(revision[, progressCallback])](#browserfetcherdownloadrevision-progresscallback)
  * [browserFetcher.localRevisions()](#browserfetcherlocalrevisions)
  * [browserFetcher.platform()](#browserfetcherplatform)
  * [browserFetcher.remove(revision)](#browserfetcherremoverevision)
  * [browserFetcher.revisionInfo(revision)](#browserfetcherrevisioninforevision)
- [class: Browser](#class-browser)
  * [event: 'disconnected'](#event-disconnected)
  * [event: 'targetchanged'](#event-targetchanged)
  * [event: 'targetcreated'](#event-targetcreated)
  * [event: 'targetdestroyed'](#event-targetdestroyed)
  * [browser.browserContexts()](#browserbrowsercontexts)
  * [browser.close()](#browserclose)
  * [browser.createIncognitoBrowserContext()](#browsercreateincognitobrowsercontext)
  * [browser.defaultBrowserContext()](#browserdefaultbrowsercontext)
  * [browser.disconnect()](#browserdisconnect)
  * [browser.newPage()](#browsernewpage)
  * [browser.pages()](#browserpages)
  * [browser.process()](#browserprocess)
  * [browser.target()](#browsertarget)
  * [browser.targets()](#browsertargets)
  * [browser.userAgent()](#browseruseragent)
  * [browser.version()](#browserversion)
  * [browser.waitForTarget(predicate[, options])](#browserwaitfortargetpredicate-options)
  * [browser.wsEndpoint()](#browserwsendpoint)
- [class: BrowserContext](#class-browsercontext)
  * [event: 'targetchanged'](#event-targetchanged-1)
  * [event: 'targetcreated'](#event-targetcreated-1)
  * [event: 'targetdestroyed'](#event-targetdestroyed-1)
  * [browserContext.browser()](#browsercontextbrowser)
  * [browserContext.clearPermissionOverrides()](#browsercontextclearpermissionoverrides)
  * [browserContext.close()](#browsercontextclose)
  * [browserContext.isIncognito()](#browsercontextisincognito)
  * [browserContext.newPage()](#browsercontextnewpage)
  * [browserContext.overridePermissions(origin, permissions)](#browsercontextoverridepermissionsorigin-permissions)
  * [browserContext.pages()](#browsercontextpages)
  * [browserContext.targets()](#browsercontexttargets)
  * [browserContext.waitForTarget(predicate[, options])](#browsercontextwaitfortargetpredicate-options)
- [class: Page](#class-page)
  * [event: 'close'](#event-close)
  * [event: 'console'](#event-console)
  * [event: 'dialog'](#event-dialog)
  * [event: 'domcontentloaded'](#event-domcontentloaded)
  * [event: 'error'](#event-error)
  * [event: 'frameattached'](#event-frameattached)
  * [event: 'framedetached'](#event-framedetached)
  * [event: 'framenavigated'](#event-framenavigated)
  * [event: 'load'](#event-load)
  * [event: 'metrics'](#event-metrics)
  * [event: 'pageerror'](#event-pageerror)
  * [event: 'request'](#event-request)
  * [event: 'requestfailed'](#event-requestfailed)
  * [event: 'requestfinished'](#event-requestfinished)
  * [event: 'response'](#event-response)
  * [event: 'workercreated'](#event-workercreated)
  * [event: 'workerdestroyed'](#event-workerdestroyed)
  * [page.$(selector)](#pageselector)
  * [page.$$(selector)](#pageselector-1)
  * [page.$$eval(selector, pageFunction[, ...args])](#pageevalselector-pagefunction-args)
  * [page.$eval(selector, pageFunction[, ...args])](#pageevalselector-pagefunction-args-1)
  * [page.$x(expression)](#pagexexpression)
  * [page.accessibility](#pageaccessibility)
  * [page.addScriptTag(options)](#pageaddscripttagoptions)
  * [page.addStyleTag(options)](#pageaddstyletagoptions)
  * [page.authenticate(credentials)](#pageauthenticatecredentials)
  * [page.bringToFront()](#pagebringtofront)
  * [page.browser()](#pagebrowser)
  * [page.click(selector[, options])](#pageclickselector-options)
  * [page.close(options)](#pagecloseoptions)
  * [page.content()](#pagecontent)
  * [page.cookies(...urls)](#pagecookiesurls)
  * [page.coverage](#pagecoverage)
  * [page.deleteCookie(...cookies)](#pagedeletecookiecookies)
  * [page.emulate(options)](#pageemulateoptions)
  * [page.emulateMedia(mediaType)](#pageemulatemediamediatype)
  * [page.evaluate(pageFunction, ...args)](#pageevaluatepagefunction-args)
  * [page.evaluateHandle(pageFunction, ...args)](#pageevaluatehandlepagefunction-args)
  * [page.evaluateOnNewDocument(pageFunction, ...args)](#pageevaluateonnewdocumentpagefunction-args)
  * [page.exposeFunction(name, puppeteerFunction)](#pageexposefunctionname-puppeteerfunction)
  * [page.focus(selector)](#pagefocusselector)
  * [page.frames()](#pageframes)
  * [page.goBack(options)](#pagegobackoptions)
  * [page.goForward(options)](#pagegoforwardoptions)
  * [page.goto(url, options)](#pagegotourl-options)
  * [page.hover(selector)](#pagehoverselector)
  * [page.isClosed()](#pageisclosed)
  * [page.keyboard](#pagekeyboard)
  * [page.mainFrame()](#pagemainframe)
  * [page.metrics()](#pagemetrics)
  * [page.mouse](#pagemouse)
  * [page.pdf(options)](#pagepdfoptions)
  * [page.queryObjects(prototypeHandle)](#pagequeryobjectsprototypehandle)
  * [page.reload(options)](#pagereloadoptions)
  * [page.screenshot([options])](#pagescreenshotoptions)
  * [page.select(selector, ...values)](#pageselectselector-values)
  * [page.setBypassCSP(enabled)](#pagesetbypasscspenabled)
  * [page.setCacheEnabled(enabled)](#pagesetcacheenabledenabled)
  * [page.setContent(html)](#pagesetcontenthtml)
  * [page.setCookie(...cookies)](#pagesetcookiecookies)
  * [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout)
  * [page.setExtraHTTPHeaders(headers)](#pagesetextrahttpheadersheaders)
  * [page.setGeolocation(options)](#pagesetgeolocationoptions)
  * [page.setJavaScriptEnabled(enabled)](#pagesetjavascriptenabledenabled)
  * [page.setOfflineMode(enabled)](#pagesetofflinemodeenabled)
  * [page.setRequestInterception(value)](#pagesetrequestinterceptionvalue)
  * [page.setUserAgent(userAgent)](#pagesetuseragentuseragent)
  * [page.setViewport(viewport)](#pagesetviewportviewport)
  * [page.tap(selector)](#pagetapselector)
  * [page.target()](#pagetarget)
  * [page.title()](#pagetitle)
  * [page.touchscreen](#pagetouchscreen)
  * [page.tracing](#pagetracing)
  * [page.type(selector, text[, options])](#pagetypeselector-text-options)
  * [page.url()](#pageurl)
  * [page.viewport()](#pageviewport)
  * [page.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])](#pagewaitforselectororfunctionortimeout-options-args)
  * [page.waitForFunction(pageFunction[, options[, ...args]])](#pagewaitforfunctionpagefunction-options-args)
  * [page.waitForNavigation(options)](#pagewaitfornavigationoptions)
  * [page.waitForRequest(urlOrPredicate, options)](#pagewaitforrequesturlorpredicate-options)
  * [page.waitForResponse(urlOrPredicate, options)](#pagewaitforresponseurlorpredicate-options)
  * [page.waitForSelector(selector[, options])](#pagewaitforselectorselector-options)
  * [page.waitForXPath(xpath[, options])](#pagewaitforxpathxpath-options)
  * [page.workers()](#pageworkers)
- [class: Worker](#class-worker)
  * [worker.evaluate(pageFunction, ...args)](#workerevaluatepagefunction-args)
  * [worker.evaluateHandle(pageFunction, ...args)](#workerevaluatehandlepagefunction-args)
  * [worker.executionContext()](#workerexecutioncontext)
  * [worker.url()](#workerurl)
- [class: Accessibility](#class-accessibility)
  * [accessibility.snapshot([options])](#accessibilitysnapshotoptions)
- [class: Keyboard](#class-keyboard)
  * [keyboard.down(key[, options])](#keyboarddownkey-options)
  * [keyboard.press(key[, options])](#keyboardpresskey-options)
  * [keyboard.sendCharacter(char)](#keyboardsendcharacterchar)
  * [keyboard.type(text, options)](#keyboardtypetext-options)
  * [keyboard.up(key)](#keyboardupkey)
- [class: Mouse](#class-mouse)
  * [mouse.click(x, y, [options])](#mouseclickx-y-options)
  * [mouse.down([options])](#mousedownoptions)
  * [mouse.move(x, y, [options])](#mousemovex-y-options)
  * [mouse.up([options])](#mouseupoptions)
- [class: Touchscreen](#class-touchscreen)
  * [touchscreen.tap(x, y)](#touchscreentapx-y)
- [class: Tracing](#class-tracing)
  * [tracing.start(options)](#tracingstartoptions)
  * [tracing.stop()](#tracingstop)
- [class: Dialog](#class-dialog)
  * [dialog.accept([promptText])](#dialogacceptprompttext)
  * [dialog.defaultValue()](#dialogdefaultvalue)
  * [dialog.dismiss()](#dialogdismiss)
  * [dialog.message()](#dialogmessage)
  * [dialog.type()](#dialogtype)
- [class: ConsoleMessage](#class-consolemessage)
  * [consoleMessage.args()](#consolemessageargs)
  * [consoleMessage.text()](#consolemessagetext)
  * [consoleMessage.type()](#consolemessagetype)
- [class: Frame](#class-frame)
  * [frame.$(selector)](#frameselector)
  * [frame.$$(selector)](#frameselector-1)
  * [frame.$$eval(selector, pageFunction[, ...args])](#frameevalselector-pagefunction-args)
  * [frame.$eval(selector, pageFunction[, ...args])](#frameevalselector-pagefunction-args-1)
  * [frame.$x(expression)](#framexexpression)
  * [frame.addScriptTag(options)](#frameaddscripttagoptions)
  * [frame.addStyleTag(options)](#frameaddstyletagoptions)
  * [frame.childFrames()](#framechildframes)
  * [frame.click(selector[, options])](#frameclickselector-options)
  * [frame.content()](#framecontent)
  * [frame.evaluate(pageFunction, ...args)](#frameevaluatepagefunction-args)
  * [frame.evaluateHandle(pageFunction, ...args)](#frameevaluatehandlepagefunction-args)
  * [frame.executionContext()](#frameexecutioncontext)
  * [frame.focus(selector)](#framefocusselector)
  * [frame.goto(url, options)](#framegotourl-options)
  * [frame.hover(selector)](#framehoverselector)
  * [frame.isDetached()](#frameisdetached)
  * [frame.name()](#framename)
  * [frame.parentFrame()](#frameparentframe)
  * [frame.select(selector, ...values)](#frameselectselector-values)
  * [frame.setContent(html)](#framesetcontenthtml)
  * [frame.tap(selector)](#frametapselector)
  * [frame.title()](#frametitle)
  * [frame.type(selector, text[, options])](#frametypeselector-text-options)
  * [frame.url()](#frameurl)
  * [frame.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])](#framewaitforselectororfunctionortimeout-options-args)
  * [frame.waitForFunction(pageFunction[, options[, ...args]])](#framewaitforfunctionpagefunction-options-args)
  * [frame.waitForNavigation(options)](#framewaitfornavigationoptions)
  * [frame.waitForSelector(selector[, options])](#framewaitforselectorselector-options)
  * [frame.waitForXPath(xpath[, options])](#framewaitforxpathxpath-options)
- [class: ExecutionContext](#class-executioncontext)
  * [executionContext.evaluate(pageFunction, ...args)](#executioncontextevaluatepagefunction-args)
  * [executionContext.evaluateHandle(pageFunction, ...args)](#executioncontextevaluatehandlepagefunction-args)
  * [executionContext.frame()](#executioncontextframe)
  * [executionContext.queryObjects(prototypeHandle)](#executioncontextqueryobjectsprototypehandle)
- [class: JSHandle](#class-jshandle)
  * [jsHandle.asElement()](#jshandleaselement)
  * [jsHandle.dispose()](#jshandledispose)
  * [jsHandle.executionContext()](#jshandleexecutioncontext)
  * [jsHandle.getProperties()](#jshandlegetproperties)
  * [jsHandle.getProperty(propertyName)](#jshandlegetpropertypropertyname)
  * [jsHandle.jsonValue()](#jshandlejsonvalue)
- [class: ElementHandle](#class-elementhandle)
  * [elementHandle.$(selector)](#elementhandleselector)
  * [elementHandle.$$(selector)](#elementhandleselector-1)
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
- [class: Request](#class-request)
  * [request.abort([errorCode])](#requestaborterrorcode)
  * [request.continue([overrides])](#requestcontinueoverrides)
  * [request.failure()](#requestfailure)
  * [request.frame()](#requestframe)
  * [request.headers()](#requestheaders)
  * [request.isNavigationRequest()](#requestisnavigationrequest)
  * [request.method()](#requestmethod)
  * [request.postData()](#requestpostdata)
  * [request.redirectChain()](#requestredirectchain)
  * [request.resourceType()](#requestresourcetype)
  * [request.respond(response)](#requestrespondresponse)
  * [request.response()](#requestresponse)
  * [request.url()](#requesturl)
- [class: Response](#class-response)
  * [response.buffer()](#responsebuffer)
  * [response.frame()](#responseframe)
  * [response.fromCache()](#responsefromcache)
  * [response.fromServiceWorker()](#responsefromserviceworker)
  * [response.headers()](#responseheaders)
  * [response.json()](#responsejson)
  * [response.ok()](#responseok)
  * [response.remoteAddress()](#responseremoteaddress)
  * [response.request()](#responserequest)
  * [response.securityDetails()](#responsesecuritydetails)
  * [response.status()](#responsestatus)
  * [response.statusText()](#responsestatustext)
  * [response.text()](#responsetext)
  * [response.url()](#responseurl)
- [class: SecurityDetails](#class-securitydetails)
  * [securityDetails.issuer()](#securitydetailsissuer)
  * [securityDetails.protocol()](#securitydetailsprotocol)
  * [securityDetails.subjectName()](#securitydetailssubjectname)
  * [securityDetails.validFrom()](#securitydetailsvalidfrom)
  * [securityDetails.validTo()](#securitydetailsvalidto)
- [class: Target](#class-target)
  * [target.browser()](#targetbrowser)
  * [target.browserContext()](#targetbrowsercontext)
  * [target.createCDPSession()](#targetcreatecdpsession)
  * [target.opener()](#targetopener)
  * [target.page()](#targetpage)
  * [target.type()](#targettype)
  * [target.url()](#targeturl)
- [class: CDPSession](#class-cdpsession)
  * [cdpSession.detach()](#cdpsessiondetach)
  * [cdpSession.send(method[, params])](#cdpsessionsendmethod-params)
- [class: Coverage](#class-coverage)
  * [coverage.startCSSCoverage(options)](#coveragestartcsscoverageoptions)
  * [coverage.startJSCoverage(options)](#coveragestartjscoverageoptions)
  * [coverage.stopCSSCoverage()](#coveragestopcsscoverage)
  * [coverage.stopJSCoverage()](#coveragestopjscoverage)
- [class: TimeoutError](#class-timeouterror)
<!-- GEN:stop -->

### Overview

Puppeteer 是一个 Node 库，它提供了一个高级 API 来通过 DevTools 协议控制 Chromium 或 Chrome。

Puppeteer API 是分层次的，反映了浏览器结构。 

> 注意：在下面的图表中，浅色框体内容目前不在 Puppeteer 中体现。

![puppeteer 概述](https://user-images.githubusercontent.com/746130/40333229-5df5480c-5d0c-11e8-83cb-c3e371de7374.png)

- [`Puppeteer`](#class-puppeteer) 使用 [DevTools 协议](https://chromedevtools.github.io/devtools-protocol/) 与浏览器进行通信。
- [`Browser`](#class-browser) 实例可以拥有浏览器上下文。
- [`BrowserContext`](#class-browsercontext) 实例定义了一个浏览会话并可拥有多个页面。
- [`Page`](#class-page) 至少有一个框架：主框架。 可能还有其他框架由 [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) 或 [框架标签](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/frame) 创建。
- [`frame`](#class-frame) 至少有一个执行上下文 - 默认的执行上下文 - 框架的 JavaScript 被执行。 一个框架可能有额外的与 [扩展](https://developer.chrome.com/extensions) 关联的执行上下文。
- [`Worker`](#class-worker) 具有单一执行上下文，并且便于与 [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 进行交互。

(图例资源: [链接](https://docs.google.com/drawings/d/1Q_AM6KYs9kbyLZF-Lpp5mtpAWth73Cq8IKCsWYgi8MM/edit?usp=sharing))

### puppeteer vs puppeteer-core

[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteer-vs-puppeteer-core)

自 v1.7.0 以来的每个版本我们都发布了两个包:
- [puppeteer](https://www.npmjs.com/package/puppeteer)
- [puppeteer-core](https://www.npmjs.com/package/puppeteer-core)

`puppeteer` 是浏览器自动化的 *产品*。安装后，它会下载一个版本的 Chromium，然后使用`puppeteer-core` 驱动工作。作为最终用户产品，`puppeteer` 支持一堆方便的 `PUPPETEER_*` env 变量来调整行为。

`puppeteer-core` 是一个 *库* 来帮助驱动任何支持 DevTools 协议的东西。`puppeteer-core` 在安装时不会下载 Chromium。作为一个库，`puppeteer-core` 是完全是通过其编程接口驱动的并忽略所有`PUPPETEER_*` env 变量。

总结一下，`puppeteer-core` 与 `puppeteer` 不同的地方：
- `puppeteer-core` 在安装时不会自动下载 Chromium。
- `puppeteer-core`忽略所有的 `PUPPETEER_*` env 变量.

在大多数情况下，你可以使用 `puppeteer` 包。

然而, 如果是下面这些情况那你需要使用 `puppeteer-core`:
- 你正在构建 DevTools 协议顶部的另一个最终用户产品或库。例如，可以使用 `puppeteer-core` 构建 PDF 生成器并编写下载 [`headless_shell`](https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md) 的自定义`install.js`脚本而不是 Chromium 来节省磁盘空间。
- 你正在打包 Puppeteer 用在 Chrome 扩展应用或浏览器中以使用 DevTools 协议，因为下载额外的 Chromium 二进制文件不是必须的。

当使用 `puppeteer-core` 时，使用下面这行代替原来的使用方式：

```js
const puppeteer = require('puppeteer-core');
```


### Environment Variables

[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#environment-variables)

Puppeteer 寻找某些环境变量来帮助其操作。 如果 puppeteer 在环境中没有找到它们，这些变量的小写变体将从 [npm 配置](https://docs.npmjs.com/cli/config) 中使用。

- `HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY` - 定义用于下载和运行 Chromium 的 HTTP 代理设置。
- `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` - 请勿在安装步骤中下载绑定的 Chromium。
- `PUPPETEER_DOWNLOAD_HOST` - 覆盖用于下载 Chromium 的 URL 的主机部分。
- `PUPPETEER_CHROMIUM_REVISION` - 在安装步骤中指定一个你喜欢 puppeteer 使用的特定版本的 Chromium。
- `PUPPETEER_EXECUTABLE_PATH` - 指定一个 Chrome 或者 Chromium 的可执行路径，会被用于 `puppeteer.launch`。具体关于可执行路径参数的意义，可参考[`puppeteer.launch([options])`](#puppeteerlaunchoptions)。

> **NOTE** 在使用 [`puppeteer-core`](https://www.npmjs.com/package/puppeteer-core) 时，上述环境变量中以 PUPPETEER_* 开头的会被忽略.

### Error handling

[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#error-handling)

如果 Puppeteer 方法无法执行一个请求，就会抛出一个错误。例如，[page.waitForSelector(selector[, options])](#pagewaitforselectorselector-options) 选择器如果在给定的时间范围内无法匹配节点，就会失败。

对于某些类型的错误，Puppeteer 使用特定的错误类处理。这些类可以通过 `require('puppeteer/Errors')` 获得。

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


### Working with Chrome Extensions

[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#working-with-chrome-extensions)

Puppeteer 可以用来测试 Chrome 扩展

> **注意** Chrome / Chromium 扩展当前只能在非无头模式下使用。

下面的代码用来处理扩展的 [background page](https://developer.chrome.com/extensions/background_pages)，该扩展的代码在 `./my-extension`:

```js
const puppeteer = require('puppeteer');

(async () => {
  const pathToExtension = require('path').join(__dirname, 'my-extension');
  const browser = puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  });
  const targets = await browser.targets();
  const backgroundPageTarget = targets.find(target => target.type() === 'background_page');
  const backgroundPage = await backgroundPageTarget.page();
  // 像处理任何其他页面一样测试背景页面。
  await browser.close();
})();
```

> **注意** 目前还无法测试扩展弹出窗口或内容脚本。

### class: Puppeteer

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

### class: BrowserFetcher

BrowserFetcher 可以用来下载和管理不同版本的 Chromium。

BrowserFetcher 操作一个修订版本字符串，修订版本字符串指定了一个 Chromium 的确定版本，例如 `"533271"`。修订版本字符串可以从 [omahaproxy.appspot.com](http://omahaproxy.appspot.com/) 获取。

见下面这个例子，告诉你如何使用 BrowserFetcher 下载一个指定版本的 Chromium：

```js
const browserFetcher = puppeteer.createBrowserFetcher();
const revisionInfo = await browserFetcher.download('533271');
const browser = await puppeteer.launch({executablePath: revisionInfo.executablePath})
```

> **注意** BrowserFetcher 不适用于与共享下载目录的其他实例同时运行。

#### browserFetcher.canDownload(revision)
- `revision` <[string]> 修订版本号, 检查其可用性
- returns: <[Promise]<[boolean]>> 返回 `true` 如果该修订版本可以从主机下载

该方法将会发起一个 HEAD 请求来检查该修订版本是否有效。

#### browserFetcher.download(revision[, progressCallback])
- `revision` <[string]> 下载的修订版本
  - `progressCallback` <[function]([number], [number])> 一个函数, 调用时将会传入两个参数：
  - `downloadedBytes` <[number]> 多少字节已经被下载
  - `totalBytes` <number> 下载全部的字节数(译者注: 也就是需要下载的文件大小)
- returns: <[Promise]<Object>> Resolves with revision information when the revision is downloaded and extracted
  - `revision` <[string]> 该修订版本被创建时的信息
  - `folderPath` <[string]> 解压该修订版本的路径
  - `executablePath` <[string]> 该修订版本的可执行文件的路径
  - `url` <[string]> URL 该修订版本的下载路径
  - `local` <[boolean]> 该修订版本是否是在本地的磁盘上是可用的

该方法将会发起一个 GET 请求来从主机下载该修订版本。

#### browserFetcher.localRevisions()
- returns: <[Promise]<[Array]<[string]>>> 一个列表, 包含所有的在本地磁盘可用的修订版本

#### browserFetcher.platform()
- returns: <[string]> 返回 `mac`， `linux`， `win32` 或 `win64` 之一。

#### browserFetcher.remove(revision)
- `revision` <[string]> 想要移除的修订版本，如果指定的修订版本还没有被下载，该方法将抛出一个错误
- returns: <[Promise]> Resolves when the revision has been removed.

#### browserFetcher.revisionInfo(revision)
- `revision` <[string]> 想要获取信息的修订版本
- returns: <[Object]>
  - `revision` <[string]> 该修订版本被创建时的信息
  - `folderPath` <[string]> 解压该修订版本的路径
  - `executablePath` <[string]> 该修订版本的可执行文件的路径
  - `url` <[string]> URL 该修订版本的下载路径
  - `local` <[boolean]> 该修订版本是否是在本地的磁盘上是可用的

### class: Browser

* extends: [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)

当 Puppeteer 连接到一个 Chromium 实例的时候会通过 [`puppeteer.launch`](#puppeteerlaunchoptions) 或 [`puppeteer.connect`](#puppeteerconnectoptions) 创建一个 Browser 对象。

下面是使用 ```Browser``` 创建 ```Page``` 的例子

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await browser.close();
});
```

一个断开连接和重连到 [Browser] 的例子：

```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  // 存储节点以便能重新连接到 Chromium
  const browserWSEndpoint = browser.wsEndpoint();
  // 从 Chromium 断开和 puppeteer 的连接
  browser.disconnect();

  // 使用节点来重新建立连接
  const browser2 = await puppeteer.connect({browserWSEndpoint});
  // 关闭 Chromium
  await browser2.close();
});
```

#### event: 'disconnected'
当 Puppeteer 从 Chromium 实例断开连接时被触发。原因可能如下：

- Chromium 关闭或崩溃
- 调用[`browser.disconnect`](#browserdisconnect) 方法

#### event: 'targetchanged'
- <[Target]>

当目标的 url 改变时被触发

> **注意** 这包括匿名浏览器上下文中的目标更改。


#### event: 'targetcreated'
- <[Target]>

当目标被创建时被触发，例如当通过 [`window.open`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) 或 [`browser.newPage`](#browsernewpage) 打开一个新的页面。

> **注意** 这包括匿名浏览器上下文中的目标创建。

#### event: 'targetdestroyed'
- <[Target]>

当目标被销毁时被触发，例如当一个页面被关闭时。

> **注意** 这包括匿名浏览器上下文中的目标销毁。

#### browser.browserContexts()
- returns: <[Array]<[BrowserContext]>>

返回一个包含所有打开的浏览器上下文的数组。在新创建的浏览器中，这将返回 [BrowserContext] 的单一实例。

#### browser.close()
- returns: <[Promise]>

关闭 Chromium 及其所有页面(如果页面被打开的话)。[Browser] 对象本身被认为是处理过的并不能再被使用。

#### browser.createIncognitoBrowserContext()
- returns: <[Promise]<[BrowserContext]>>

创建一个匿名的浏览器上下文。这将不会与其他浏览器上下文分享 cookies/cache。

```js
const browser = await puppeteer.launch();
// 创建一个匿名的浏览器上下文
const context = await browser.createIncognitoBrowserContext();
// 在一个原生的上下文中创建一个新页面
const page = await context.newPage();
// 做一些事情
await page.goto('https://example.com');
```

#### browser.defaultBrowserContext()
- returns: <[BrowserContext]>

返回一个默认的浏览器上下文。这个上下文不能被关闭。

#### browser.disconnect()

断开 Puppeteer 和浏览器的连接，但 Chromium 进程仍然在运行。在调用 ```disconnect``` 之后，[Browser] 对象本身被认为是处理过的并不能再被使用。

#### browser.newPage()
- returns: <[Promise]<[Page]>>

返回一个新的 [Page] 对象。[Page] 在一个默认的浏览器上下文中被创建。

#### browser.pages()
- returns: <[Promise]<[Array]<[Page]>>> 返回一个包含所有打开的页面的数组。页面不可见的，比如 `"background_page"` 将不会列在这。不过你可以通过 [target.page()](#targetpage) 找到它们。

返回一个浏览器中所有页面的数组。 在多个浏览器上下文的情况下，
该方法将返回一个包含所有浏览器上下文中所有页面的数组。

#### browser.process()
- returns: <?[ChildProcess]> 产生浏览器的进程。如果浏览器实例是由 [`puppeteer.connect`](#puppeteerconnectoptions) 方法创建的则返回null。

#### browser.target()
- returns: <[Target]>

返回浏览器相关的目标对象。

#### browser.targets()
- returns: <[Array]<[Target]>>

浏览器内所有活动目标组成的数组。在多个浏览器上下文的情况下，该方法将返回一个包含所有浏览器上下文中的所有目标的数组。

#### browser.userAgent()
- returns: <[Promise]<[string]>> 返回浏览器原始的 user-agent

> **注意** 页面可以使用 [page.setUserAgent](#pagesetuseragentuseragent) 覆盖浏览器的 user-agent

#### browser.version()
- returns: <[Promise]<[string]>> 对于无头的 Chromium，这类似于 `HeadlessChrome/61.0.3153.0`. 对于非无头的Chromium, 这类似于 `Chrome/61.0.3153.0。`

> **注意** browser.version() 的格式可能在未来版本的 Chromium 中发生变化。

#### browser.waitForTarget(predicate[, options])
- `predicate` <[function]\([Target]\):[boolean]> A function to be run for every target
- `options` <[Object]>
  - `timeout` <[number]> Maximum wait time in milliseconds. Pass `0` to disable the timeout. Defaults to 30 seconds.
- returns: <[Promise]<[Target]>> Promise which resolves to the first target found that matches the `predicate` function.

This searches for a target in all browser contexts.

An example of finding a target for a page opened via `window.open`:
```js
await page.evaluate(() => window.open('https://www.example.com/'));
const newWindowTarget = await browser.waitForTarget(target => target.url() === 'https://www.example.com/');
```

#### browser.wsEndpoint()
- returns: <[string]> 返回浏览器 websocket 的地址

[puppeteer.connect](#puppeteerconnectoptions) 可以将浏览器 websocket 端作为一个参数。其格式为 `ws://${host}:${port}/devtools/browser/<id>`。

你可以从 `http://${host}:${port}/json/version` 找到 `webSocketDebuggerUrl` 。了解更多有关 [devtools protocol](https://chromedevtools.github.io/devtools-protocol) 和 [browser endpoint](https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target) 的信息。

### class: BrowserContext

* 继承自: [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)

BrowserContexts 提供了一种操作多个独立浏览器会话的方法。 当浏览器启动时，它已经默认使用一个 BrowserContext。 `browser.newPage()` 方法在默认的浏览器上下文中创建一个页面。

如果一个页面打开另一个页面，例如通过 `window.open` 调用，弹出的窗口将属于父页面的浏览器上下文。

Puppeteer 允许使用 `browser.createIncognitoBrowserContext()` 方法创建"隐身"浏览器上下文。
"隐身"浏览器上下文不会将任何浏览数据写入磁盘。

```js
// 创建一个新的隐身浏览器上下文
const context = await browser.createIncognitoBrowserContext();
// 在上下文中创建一个新页面
const page = await context.newPage();
// ... 在页面上做一些操作 ...
await page.goto('https://example.com');
// 不再需要时处理上下文
await context.close();
```

#### event: 'targetchanged'
- <[Target]>

浏览器上下文中目标的 url 更改时触发。

#### event: 'targetcreated'
- <[Target]>

在浏览器上下文中创建新目标时触发，例如打开了一个新页面 [`window.open`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) 或 [`browserContext.newPage`](#browsercontextnewpage)。

#### event: 'targetdestroyed'
- <[Target]>

当浏览器上下文中的目标被销毁时，例如关闭页面时触发。

#### browserContext.browser()
- returns: <[Browser]>

此浏览器上下文所属的浏览器。

#### browserContext.clearPermissionOverrides()
- returns: <[Promise]>

清除浏览器上下文的所有权限覆盖。

```js
const context = browser.defaultBrowserContext();
context.overridePermissions('https://example.com', ['clipboard-read']);
// 做些事 ..
context.clearPermissionOverrides();
```

#### browserContext.close()
- returns: <[Promise]>

关闭浏览器上下文。 所有属于浏览器上下文的目标将被关闭。

> **注意** 只有隐身浏览器上下文才能关闭。

#### browserContext.isIncognito()
- returns: <[boolean]>

返回 BrowserContext 是否隐身。
默认浏览器上下文是唯一的非隐身浏览器上下文。

> **注意** 默认浏览器上下文无法关闭。

#### browserContext.newPage()
- returns: <[Promise]<[Page]>>

在浏览器上下文中创建一个新页面。


#### browserContext.overridePermissions(origin, permissions)
- `origin` <[string]> The [origin] to grant permissions to, e.g. "https://example.com".
- `permissions` <[Array]<[string]>> 授予的一组权限。未在这里列出的权限都将会被自动拒绝。权限可以是以下值之一:
    - `'geolocation'`
    - `'midi'`
    - `'midi-sysex'` (system-exclusive midi)
    - `'notifications'`
    - `'push'`
    - `'camera'`
    - `'microphone'`
    - `'background-sync'`
    - `'ambient-light-sensor'`
    - `'accelerometer'`
    - `'gyroscope'`
    - `'magnetometer'`
    - `'accessibility-events'`
    - `'clipboard-read'`
    - `'clipboard-write'`
    - `'payment-handler'`
- returns: <[Promise]>


```js
const context = browser.defaultBrowserContext();
await context.overridePermissions('https://html5demos.com', ['geolocation']);
```


#### browserContext.pages()
- returns: <[Promise]<[Array]<[Page]>>> Promise which resolves to an array of all open pages. Non visible pages, such as `"background_page"`, will not be listed here. You can find them using [target.page()](#targetpage).

#### browserContext.targets()
- returns: <[Array]<[Target]>>

浏览器上下文中所有活动目标的数组。

#### browserContext.waitForTarget(predicate[, options])
- `predicate` <[function]\([Target]\):[boolean]> A function to be run for every target
- `options` <[Object]>
  - `timeout` <[number]> Maximum wait time in milliseconds. Pass `0` to disable the timeout. Defaults to 30 seconds.
- returns: <[Promise]<[Target]>> Promise which resolves to the first target found that matches the `predicate` function.

This searches for a target in this specific browser context.

An example of finding a target for a page opened via `window.open`:
```js
await page.evaluate(() => window.open('https://www.example.com/'));
const newWindowTarget = await browserContext.waitForTarget(target => target.url() === 'https://www.example.com/');
```

### class: Page

* 继承: [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)

Page 提供操作一个 tab 页或者 [extension background page](https://developer.chrome.com/extensions/background_pages) 的方法。一个 [Browser] 实例可以有多个 [Page] 实例。

下面的例子创建一个 Page 实例，导航到一个 url ，然后保存截图：
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'screenshot.png'});
  await browser.close();
});
```
Page会触发多种事件（下面描述的），可以用 `node` [原生的方法](https://nodejs.org/api/events.html#events_class_eventemitter) 来捕获处理，比如 `on`,`once` 或者 `removeListener`。

下面的例子捕获了一个 `page` 实例的 `load` 事件，打印了一句话：
```js
page.once('load', () => console.log('Page loaded!'));
```

可以用 `removeListener` 取消对事件的监听：

```js
function logRequest(interceptedRequest) {
  console.log('A request was made:', interceptedRequest.url());
}
page.on('request', logRequest);
// 一段时间后...
page.removeListener('request', logRequest);
```

#### event: 'close'

当页面关闭时触发。

#### event: 'console'
- <[ConsoleMessage]>

当页面js代码调用了 `console` 的某个方法，比如 `console.log`，或者 `console.dir` 的时候触发。（如果不监听这个事件，js源码的console语句不会输出）。当页面抛出一个错误或者经过的时候也会触发。

js源码中传给 `console.log` 的参数，会传给 `console` 事件的监听器。

一个监听 `console` 事件的例子：
```js
page.on('console', msg => {
  for (let i = 0; i < msg.args().length; ++i)
    console.log(`${i}: ${msg.args()[i]}`); // 译者注：这句话的效果是打印到你的代码的控制台
});
page.evaluate(() => console.log('hello', 5, {foo: 'bar'})); // 这个代码表示在页面实例中执行了console.log。如果没有监听console事件，这里的输出不会出现在你的控制台
```

#### event: 'dialog'
- <[Dialog]>

当js对话框出现的时候触发，比如`alert`, `prompt`, `confirm` 或者 `beforeunload`。Puppeteer可以通过[Dialog]'s [accept](#dialogacceptprompttext) 或者 [dismiss](#dialogdismiss)来响应弹窗。

#### event: 'domcontentloaded'

当页面的 [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)事件被触发时触发。

#### event: 'error'
- <[Error]>

当页面崩溃时触发。

> **注意** `error` 在 `node` 中有特殊的意义, 点击 [error events](https://nodejs.org/api/events.html#events_error_events) 查看详情。

#### event: 'frameattached'
- <[Frame]>

当 `iframe` 加载的时候触发。

#### event: 'framedetached'
- <[Frame]>

当 `iframe` 从页面移除的时候触发。

#### event: 'framenavigated'
- <[Frame]>

当 `iframe` 导航到新的 url 时触发。

#### event: 'load'

当页面的 [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load) 事件被触发时触发。

#### event: 'metrics'
- <[Object]>
  - `title` <[string]> 传给 `console.timeStamp` 方法的title参数。
  - `metrics` <[Object]> 包含度量对象的键值对，值是<[number]>类型

当页面js代码调用了 `console.timeStamp` 方法时触发。`page.metrics` 章节有描述所有的 metrics。

#### event: 'pageerror'
- <[Error]> 异常信息

当发生页面js代码没有捕获的异常时触发。

#### event: 'request'
- <[Request]>

当页面发送一个请求时触发。参数 [request] 对象是只读的。
如果需要拦截并且改变请求，参考 `page.setRequestInterception` 章节。

#### event: 'requestfailed'
- <[Request]>

当页面的请求失败时触发。比如某个请求超时了。

#### event: 'requestfinished'
- <[Request]>

当页面的某个请求成功完成时触发。

#### event: 'response'
- <[Response]>

当页面的某个请求接收到对应的 [response] 时触发。

#### event: 'workercreated'
- <[Worker]>

当页面生成相应的 [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 时触发。

#### event: 'workerdestroyed'
- <[Worker]>

当页面终止相应的 [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 时触发。

#### page.$(selector)
- `selector` <[string]> 选择器
- 返回: <[Promise]<?[ElementHandle]>>

此方法在页面内执行 `document.querySelector`。如果没有元素匹配指定选择器，返回值是 `null`。

[page.mainFrame().$(selector)](#frameselector) 的简写。

#### page.$$(selector)
-- `selector` <[string]> 选择器
- 返回: <[Promise]<[Array]<[ElementHandle]>>>

此方法在页面内执行 `document.querySelectorAll`。如果没有元素匹配指定选择器，返回值是 `[]`。

[page.mainFrame().$$(selector)](#frameselector-1) 的简写。

#### page.$$eval(selector, pageFunction[, ...args])
- `selector` <[string]> 一个框架选择器
- `pageFunction` <[function]> 在浏览器实例上下文中要执行的方法
- `...args` <...[Serializable]|[JSHandle]> 要传给 `pageFunction` 的参数。（比如你的代码里生成了一个变量，在页面中执行方法时需要用到，可以通过这个 `args` 传进去）
- 返回: <[Promise]<[Serializable]>> Promise对象，完成后是 `pageFunction` 的返回值

此方法在页面内执行 `Array.from(document.querySelectorAll(selector))`，然后把匹配到的元素数组作为第一个参数传给 `pageFunction`。

如果 `pageFunction` 返回的是 [Promise]，那么此方法会等 promise 完成后返回其返回值。

示例:
```js
const divsCounts = await page.$$eval('div', divs => divs.length);
```

#### page.$eval(selector, pageFunction[, ...args])
- `selector` <[string]> 选择器
- `pageFunction` <[function]> 在浏览器实例上下文中要执行的方法
- `...args` <...[Serializable]|[JSHandle]> 要传给 `pageFunction` 的参数。（比如你的代码里生成了一个变量，在页面中执行方法时需要用到，可以通过这个 `args` 传进去）
- 返回: <[Promise]<[Serializable]>> Promise对象，完成后是 `pageFunction` 的返回值

此方法在页面内执行 `document.querySelector`，然后把匹配到的元素作为第一个参数传给 `pageFunction`。

如果 `pageFunction` 返回的是 [Promise]，那么此方法会等 promise 完成后返回其返回值。

示例:
```js
const searchValue = await page.$eval('#search', el => el.value);
const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
const html = await page.$eval('.main-container', e => e.outerHTML);
```

[page.mainFrame().$eval(selector, pageFunction)](#frameevalselector-pagefunction-args) 的简写。

#### page.$x(expression)
- `expression` <[string]> XPath表达式，参考： [evaluate](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate).
- 返回: <[Promise]<[Array]<[ElementHandle]>>>

此方法解析指定的XPath表达式。

[page.mainFrame().$x(expression)](#framexexpression) 的简写。

#### page.accessibility
- returns: <[Accessibility]>

#### page.addScriptTag(options)
- `options` <[Object]>
  - `url` <[string]> 要添加的script的src
  - `path` <[string]> 要注入frame的js文件路径. 如果 `path` 是相对路径, 那么相对 [当前路径](https://nodejs.org/api/process.html#process_process_cwd) 解析。
  - `content` <[string]> 要注入页面的js代码（即<script>content</script>）
  - `type` <[string]> 脚本类型。 如果要注入 `ES6 module`，值为'module'。点击 [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) 查看详情。
- 返回: <[Promise]<[ElementHandle]>> Promise对象，即注入完成的tag标签。当 script 的 onload 触发或者代码被注入到 frame。

注入一个指定src(url)或者代码(content)的 `script` 标签到当前页面。

[page.mainFrame().addScriptTag(options)](#frameaddscripttagoptions) 的简写。

#### page.addStyleTag(options)
- `options` <[Object]>
  - `url` <[string]> link标签的href属性值
  - `path` <[string]> 样式文件的路径. 如果`path` 是相对路径,那么相对 [当前路径](https://nodejs.org/api/process.html#process_process_cwd)解析。
  - `content` <[string]> css代码（即<style>content</style>）
- 返回: <[Promise]<[ElementHandle]>> Promise对象，即注入完成的tag标签。当style的onload触发或者代码被注入到frame。

添加一个指定link(url)的 `<link rel="stylesheet">` 标签。
或者添加一个指定代码(content)的 `<style type="text/css">` 标签。

[page.mainFrame().addStyleTag(options)](#frameaddstyletagoptions) 的简写。

#### page.authenticate(credentials)
- `credentials` <?[Object]>
  - `username` <[string]>
  - `password` <[string]>
- 返回: <[Promise]>

为[HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) 提供认证凭据 。

传 `null` 禁用认证。

#### page.bringToFront()

- returns: <[Promise]>

相当于多个tab时，切换到某个tab。

#### page.browser()

- returns: <[Browser]>

得到当前 page 实例所属的 browser 实例。

#### page.click(selector[, options])
- `selector` <[string]> 要点击的元素的选择器。 如果有多个匹配的元素, 点击第一个。
- `options` <[Object]>
  - `button` <[string]> `left`, `right`, 或者 `middle`, 默认是 `left`。
  - `clickCount` <[number]> 默认是 1. 查看 [UIEvent.detail]。
  - `delay` <[number]> `mousedown` 和 `mouseup` 之间停留的时间，单位是毫秒。默认是0
- 返回: <[Promise]> Promise对象，匹配的元素被点击。 如果没有元素被点击，Promise对象将被rejected。

此方法找到一个匹配 `selector` 选择器的元素，如果需要会把此元素滚动到可视，然后通过 [page.mouse](#pagemouse) 点击它。
如果选择器没有匹配任何元素，此方法将会报错。

要注意如果 `click()` 触发了一个跳转，会有一个独立的 `page.waitForNavigation()` Promise对象需要等待。
正确的等待点击后的跳转是这样的：

```javascript
const [response] = await Promise.all([
  page.waitForNavigation(waitOptions),
  page.click(selector, clickOptions),
]);
```

[page.mainFrame().click(selector[, options])](#frameclickselector-options) 的简写。

#### page.close(options)
- `options` <[Object]>
  - `runBeforeUnload` <[boolean]> 默认 `false`. 是否执行 [before unload](https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload)
- 返回: <[Promise]>

`page.close()` 在 beforeunload 处理之前默认不执行

> **注意** 如果 `runBeforeUnload` 设置为true，可能会弹出一个 `beforeunload` 对话框。
> 这个对话框需要通过页面的 ['dialog'](#event-dialog) 事件手动处理。

#### page.content()
- returns: <[Promise]<[string]>>

返回页面的完整 html 代码，包括 doctype。

#### page.cookies(...urls)
- `...urls` <...[string]>
- returns: <[Promise]<[Array]<[Object]>>>
  - `name` <[string]>
  - `value` <[string]>
  - `domain` <[string]>
  - `path` <[string]>
  - `expires` <[number]> Unix time, 单位是秒
  - `httpOnly` <[boolean]>
  - `secure` <[boolean]>
  - `session` <[boolean]>
  - `sameSite` <[string]> `"Strict"` 或者 `"Lax"`。

如果不指定任何 url，此方法返回当前页面域名的 cookie。
如果指定了 url，只返回指定的 url 下的 cookie。

#### page.coverage

- returns: <[Coverage]>

#### page.deleteCookie(...cookies)
- `...cookies` <...[Object]>
  - `name` <[string]> **必须的参数**
  - `url` <[string]>
  - `domain` <[string]>
  - `path` <[string]>
  - `secure` <[boolean]>
- 返回: <[Promise]>

#### page.emulate(options)
- `options` <[Object]>
  - `viewport` <[Object]>
    - `width` <[number]> 页面的宽度，单位像素.
    - `height` <[number]> 页面的高度，单位像素.
    - `deviceScaleFactor` <[number]> 定义设备缩放， (类似于 dpr). 默认 `1`。
    - `isMobile` <[boolean]> 要不要包含`meta viewport` 标签. 默认 `false`。
    - `hasTouch`<[boolean]> 指定终端是否支持触摸。默认 `false`
    - `isLandscape` <[boolean]> 指定终端是不是 landscape 模式. 默认 `false`。
  - `userAgent` <[string]>
- 返回: <[Promise]>

根据指定的参数和 user agent 生成模拟器。此方法是和下面两个方法效果相同：
- [page.setUserAgent(userAgent)](#pagesetuseragentuseragent)
- [page.setViewport(viewport)](#pagesetviewportviewport)

为了支持模拟器，puppeteer 提供了一些设备的参数选项，可以通过 `require('puppeteer/DeviceDescriptors')` 命令引入。
下面是通过 puppeteer 生成 iPhone 6 模拟器的例子：
```js
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto('https://www.google.com');
  // 其他操作...
  await browser.close();
});
```

支持的设备可以在这里找到： [DeviceDescriptors.js](https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js)。

#### page.emulateMedia(mediaType)
- `mediaType` <?[string]> 改变页面的css媒体类型。支持的值仅包括 `'screen'`, `'print'` 和 `null`。传 `null` 禁用媒体模拟
- 返回: <[Promise]>

#### page.evaluate(pageFunction, ...args)
- `pageFunction` <[function]|[string]> 要在页面实例上下文中执行的方法
- `...args` <...[Serializable]|[JSHandle]> 要传给 `pageFunction` 的参数
- 返回: <[Promise]<[Serializable]>> `pageFunction`执行的结果

如果pageFunction返回的是[Promise]，`page.evaluate`将等待promise完成，并返回其返回值。

如果pageFunction返回的是不能序列化的值，将返回`undefined`

给`pageFunction`传参数示例：
```js
const result = await page.evaluate(x => {
  return Promise.resolve(8 * x);
}, 7); // （译者注： 7 可以是你自己代码里任意方式得到的值）
console.log(result); // 输出 "56"
```

也可以传一个字符串：
```js
console.log(await page.evaluate('1 + 2')); // 输出 "3"
const x = 10;
console.log(await page.evaluate(`1 + ${x}`)); // 输出 "11"
```

[ElementHandle] 实例 可以作为参数传给 `page.evaluate`:
```js
const bodyHandle = await page.$('body');
const html = await page.evaluate(body => body.innerHTML, bodyHandle);
await bodyHandle.dispose();
```

[page.mainFrame().evaluate(pageFunction, ...args)](#frameevaluatepagefunction-args) 的简写。

#### page.evaluateHandle(pageFunction, ...args)
- `pageFunction` <[function]|[string]> 要在页面实例上下文中执行的方法
- `...args` <...[Serializable]|[JSHandle]> 要传给 `pageFunction` 的参数
- 返回: <[Promise]<[JSHandle]>> `pageFunction` 执行的结果 页内类型(JSHandle)

此方法和 `page.evaluate` 的唯一区别是此方法返回的是页内类型(JSHandle)

如果传给此方法的方法（参数）返回的是Promise对象，将等待promise完成并返回其返回值

也可以传一个字符串替代方法：
```js
const aHandle = await page.evaluateHandle('document'); // 'document'对象
```

[JSHandle] 实例可以作为 `page.evaluateHandle`的参数:
```js
const aHandle = await page.evaluateHandle(() => document.body);
const resultHandle = await page.evaluateHandle(body => body.innerHTML, aHandle);
console.log(await resultHandle.jsonValue());
await resultHandle.dispose();
```

[page.mainFrame().executionContext().evaluateHandle(pageFunction, ...args)](#executioncontextevaluatehandlepagefunction-args) 的简写。

#### page.evaluateOnNewDocument(pageFunction, ...args)
- `pageFunction` <[function]|[string]> 要在页面实例上下文中执行的方法
- `...args` <...[Serializable]> 要传给 `pageFunction` 的参数
- 返回: <[Promise]>

添加一个方法，在以下某个场景被调用：
- 页面导航完成后
- 页面的iframe加载或导航完成。这种场景，指定的函数被调用的上下文是新加载的iframe。

指定的函数在所属的页面被创建并且所属页面的任意 script 执行之前被调用。常用于修改页面js环境，比如给 `Math.random` 设定种子

下面是在页面加载前重写 `navigator.languages` 属性的例子：

```js
// preload.js

// 重写 `languages` 属性，使其用一个新的get方法
Object.defineProperty(navigator, "languages", {
  get: function() {
    return ["en-US", "en", "bn"];
  }
});

// 假设 preload.js 和当前的代码在同一个目录
const preloadFile = fs.readFileSync('./preload.js', 'utf8');
await page.evaluateOnNewDocument(preloadFile);
```

#### page.exposeFunction(name, puppeteerFunction)
- `name` <[string]> 挂载到window对象的方法名
- `puppeteerFunction` <[function]> 调用name方法时实际执行的方法
- 返回: <[Promise]>

此方法添加一个命名为 `name` 的方法到页面的 `window` 对象
当调用 `name` 方法时，在 `node.js` 中执行 `puppeteerFunction`，并且返回 Promise 对象，解析后返回 `puppeteerFunction` 的返回值

如果 `puppeteerFunction` 返回的是 Promise 对象，此方法会等其解析后再返回

> **注意** 通过 `page.exposeFunction` 挂载到页面的方法在多次跳转后扔有用
(原文：> **NOTE** Functions installed via `page.exposeFunction` survive navigations.)

添加md5()到页面的例子：
```js
const puppeteer = require('puppeteer');
const crypto = require('crypto');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg.text()));
  await page.exposeFunction('md5', text =>
    crypto.createHash('md5').update(text).digest('hex')
  );
  await page.evaluate(async () => {
    // 使用 window.md5 计算哈希
    const myString = 'PUPPETEER';
    const myHash = await window.md5(myString);
    console.log(`md5 of ${myString} is ${myHash}`);
  });
  await browser.close();
});
```

添加 readfile() 到页面的例子：

```js
const puppeteer = require('puppeteer');
const fs = require('fs');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg.text()));
  await page.exposeFunction('readfile', async filePath => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, text) => {
        if (err)
          reject(err);
        else
          resolve(text);
      });
    });
  });
  await page.evaluate(async () => {
    // 使用 window.readfile 读取文件内容
    const content = await window.readfile('/etc/hosts');
    console.log(content);
  });
  await browser.close();
});

```

#### page.focus(selector)
- `selector` <[string]> 要给焦点的元素的选择器[selector]。如果有多个匹配的元素，焦点给第一个元素。
- 返回: <[Promise]> Promise对象，当`selector`选择器匹配的元素获得焦点后resolve。如果没有元素匹配指定选择器，将会rejected。

此方法找到一个匹配`selector`的元素，并且把焦点给它。
如果没有匹配的元素，此方法将报错。

[page.mainFrame().focus(selector)](#framefocusselector) 的简写。

#### page.frames()
- 返回: <[Array]<[Frame]>> 加载到页面中的所有iframe标签

#### page.goBack(options)
- `options` <[Object]> 导航配置，可选值：
  - `timeout` <[number]> 跳转等待时间，单位是毫秒, 默认是30秒, 传 `0` 表示无限等待。可以通过[page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout)方法修改默认值
  - `waitUntil` <[string]|[Array]<[string]>> 满足什么条件认为页面跳转完成，默认是`load`事件触发时。指定事件数组，那么所有事件触发后才认为是跳转完成。事件包括：
    - `load` - 页面的load事件触发时
    - `domcontentloaded` - 页面的`DOMContentLoaded`事件触发时
    - `networkidle0` - 不再有网络连接时触发（至少500毫秒后）
    - `networkidle2` - 只有2个网络连接时触发（至少500毫秒后）
- 返回: <[Promise]<?[Response]>> Promise对象resolve后是主要的请求的响应。如果有多个跳转, resolve后是最后一次跳转的响应. 如果不能回退，解析后是null

导航到页面历史的前一个页面。

#### page.goForward(options)
- `options` <[Object]> 导航配置，可选值：
  - `timeout` <[number]> 跳转等待时间，单位是毫秒, 默认是30秒, 传 `0` 表示无限等待。可以通过[page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout)方法修改默认值
  - `waitUntil` <[string]|[Array]<[string]>> 满足什么条件认为页面跳转完成，默认是 `load` 事件触发时。指定事件数组，那么所有事件触发后才认为是跳转完成。事件包括：
    - `load` - 页面的load事件触发时
    - `domcontentloaded` - 页面的 `DOMContentLoaded` 事件触发时
    - `networkidle0` - 不再有网络连接时触发（至少500毫秒后）
    - `networkidle2` - 只有2个网络连接时触发（至少500毫秒后）
- 返回: <[Promise]<?[Response]>> Promise对象resolve后是主要的请求的响应. 如果有多个跳转, resolve后是最后一次跳转的响应. 如果不能向前，resolve后是null

导航到页面历史的后一个页面。

#### page.goto(url, options)
- `url` <[string]> 导航到的地址. 地址应该带有http协议, 比如 `https://`.
- `options` <[Object]> 导航配置，可选值：
  - `timeout` <[number]> 跳转等待时间，单位是毫秒, 默认是30秒, 传 `0` 表示无限等待。可以通过[page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout)方法修改默认值
  - `waitUntil` <[string]|[Array]<[string]>> 满足什么条件认为页面跳转完成，默认是 `load` 事件触发时。指定事件数组，那么所有事件触发后才认为是跳转完成。事件包括：
    - `load` - 页面的load事件触发时
    - `domcontentloaded` - 页面的 `DOMContentLoaded` 事件触发时
    - `networkidle0` - 不再有网络连接时触发（至少500毫秒后）
    - `networkidle2` - 只有2个网络连接时触发（至少500毫秒后）
  - `referer` <[string]> Referer header value. If provided it will take preference over the referer header value set by [page.setExtraHTTPHeaders()](#pagesetextrahttpheadersheaders).
- 返回: <[Promise]<?[Response]>> Promise对象resolve后是主要的请求的响应。如果有多个跳转, resolve后是最后一次跳转的响应

以下情况此方法将报错： 
- 发生了 SSL 错误 (比如有些自签名的https证书).
- 目标地址无效
- 超时
- 主页面不能加载
- the main resource failed to load.

> **注意** `page.goto` 抛出或返回主页面的响应。唯一的例外是导航到 `about：blank` 或导航到具有不同散列的相同URL，这将成功并返回 `null`。

> **注意** 无头模式不支持打开 PDF 文件。查看 [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295)。

快捷方式 [page.mainFrame().goto(url, options)](#framegotourl-options)

#### page.hover(selector)
- `selector` <[string]> 要hover的元素的选择器。如果有多个匹配的元素，hover第一个。
- 返回: <[Promise]> Promise对象，当匹配的元素成功被hover后resolve。如果没有匹配的元素，将会rejected。

此方法找到一个匹配的元素，如果需要会把此元素滚动到可视，然后通过 [page.mouse](#pagemouse) 来hover到元素的中间。
如果没有匹配的元素，此方法将会报错。

[page.mainFrame().hover(selector)](#framehoverselector) 的简写。

#### page.isClosed()

- returns: <[boolean]>

表示页面是否被关闭。

#### page.keyboard

- returns: <[Keyboard]>

#### page.mainFrame()
- 返回: <[Frame]> 返回页面的主frame

保证页面一直有有一个主 frame

#### page.metrics()
- 返回: <[Promise]<[Object]>> 包含指标数据的键值对：
  - `Timestamp` <[number]> 时间点(when the metrics sample was taken)
  - `Documents` <[number]> 页面的documents数量。
  - `Frames` <[number]> 页面的iframe数量。
  - `JSEventListeners` <[number]> 页面的js事件数量。
  - `Nodes` <[number]> 页面的dom节点数量。
  - `LayoutCount` <[number]> 整页面或部分页面的布局数量。
  - `RecalcStyleCount` <[number]> 页面样式重新计算数量。
  - `LayoutDuration` <[number]> 页面布局总时间。
  - `RecalcStyleDuration` <[number]> 页面样式重新计算总时间。
  - `ScriptDuration` <[number]> 页面js代码执行总时间。
  - `TaskDuration` <[number]> 页面任务执行总时间。
  - `JSHeapUsedSize` <[number]> 页面占用堆内存大小。
  - `JSHeapTotalSize` <[number]> 总的页面堆内存大小。

> **注意** All timestamps are in monotonic time: monotonically increasing time in seconds since an arbitrary point in the past.

#### page.mouse

- returns: <[Mouse]>

#### page.pdf(options)
- `options` <[Object]> 可以有以下配置项：
  - `path` <[string]> pdf文件保存的路径。如果是相对路径，则相对[当前路径](https://nodejs.org/api/process.html#process_process_cwd)。如果不指定路径，将不保存到硬盘。
  - `scale` <[number]> 页面渲染的缩放。默认是1。缩放值必须介于0.1到2之间。
  - `displayHeaderFooter` <[boolean]> 显示页眉和页脚。默认是不显示
  - `headerTemplate` <[string]> 页眉的html模板，可以有这些变量：
    - `date` 格式化的日期
    - `title` 网页标题
    - `url` 网页地址
    - `pageNumber` 当前页码
    - `totalPages` 总页数
  - `footerTemplate` <[string]> 页脚的html模板。和页眉模板变量相同。
  - `printBackground` <[boolean]> 是否打印背景图. 默认是 `false`。
  - `landscape` <[boolean]> 页面横向(?Paper orientation). 默认为 `false`.
  - `pageRanges` <[string]> 要输出的页码范围, 比如, '1-5, 8, 11-13'。默认是空字符串，表示全部页码。
  - `format` <[string]> 页面格式。如果设置了，将覆盖 `width` 和 `height` 配置. 默认是 'Letter'。
  - `width` <[string]> 页面宽度, 接受带单位的字符串。
  - `height` <[string]> 页面高度, 接受带单位的字符串。
  - `margin` <[Object]> 页面空白白边配置，默认是空
    - `top` <[string]> 顶部的白边
    - `right` <[string]> 右侧白边, 接受带单位的字符串
    - `bottom` <[string]> 底部白边, 接受带单位的字符串
    - `left` <[string]> 左侧白边, 接受带单位的字符串
  - `preferCSSPageSize` <[boolean]> 给页面优先级声明的任何CSS `@page` 大小超过 `width` 和 `height` 或 `format` 选项中声明的大小。 默认为 `false`，它将缩放内容以适合纸张大小。
- 返回: <[Promise]<[Buffer]>> Promise对象，resolve后是pdf buffer。

> **注意** 目前仅支持无头模式的 Chrome

`page.pdf()` 生成当前页面的pdf格式，带着 `pring` css media。如果要生成带着 `screen` media的pdf，在`page.pdf()` 前面先调用 [page.emulateMedia('screen')](#pageemulatemediamediatype)

> **注意** 默认情况下，`page.pdf()` 生成一个带有修改颜色的 pdf 用于打印。 使用[`-webkit-print-color-adjust`]（https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-print-color-adjust）属性强制渲染精确的颜色。

```js
// 生成 'screen' media 格式的pdf.
await page.emulateMedia('screen');
await page.pdf({path: 'page.pdf'});
```

`width`, `height`, 和 `margin` 接受带单位的字符串. 不带单位的默认是像素(px)

几个例子:
- `page.pdf({width: 100})` - pdf将是 100 pixels宽
- `page.pdf({width: '100px'})` - pdf将是 100 pixels宽
- `page.pdf({width: '10cm'})` - pdf将是 10 厘米宽.

支持的单位包括:
- `px` - 像素
- `in` - 英寸
- `cm` - 厘米
- `mm` - 毫米

`format` 可选值：
- `Letter`: 8.5in x 11in
- `Legal`: 8.5in x 14in
- `Tabloid`: 11in x 17in
- `Ledger`: 17in x 11in
- `A0`: 33.1in x 46.8in
- `A1`: 23.4in x 33.1in
- `A2`: 16.5in x 23.4in
- `A3`: 11.7in x 16.5in
- `A4`: 8.27in x 11.7in
- `A5`: 5.83in x 8.27in
- `A6`: 4.13in x 5.83in

> **注意** `headerTemplate` 和 `footerTemplate` 有下面的限制：
> 1. js脚本不会被执行
> 2. 页面的样式对模板内无效

#### page.queryObjects(prototypeHandle)
- `prototypeHandle` <[JSHandle]> A handle to the object prototype.
- returns: <[Promise]<[JSHandle]>> Promise which resolves to a handle to an array of objects with this prototype.

此方法遍历js堆栈，找到所有带有指定原型的对象

```js
// 创建 Map 对象
await page.evaluate(() => window.map = new Map());
// 获取 Map 对象的原型
const mapPrototype = await page.evaluateHandle(() => Map.prototype);
// 查询所有的 map 实例，存储为一个数组
const mapInstances = await page.queryObjects(mapPrototype);
// 计算堆栈中 map 对象的数量
const count = await page.evaluate(maps => maps.length, mapInstances);
await mapInstances.dispose();
await mapPrototype.dispose();
```

[page.mainFrame().executionContext().queryObjects(prototypeHandle)](#executioncontextqueryobjectsprototypehandle) 的简写

#### page.reload(options)
- `options` <[Object]> 导航配置，可选值：
  - `timeout` <[number]> 跳转等待时间，单位是毫秒, 默认是30秒, 传 `0` 表示无限等待。可以通过[page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout)方法修改默认值
  - `waitUntil` <[string]|[Array]<[string]>> 满足什么条件认为页面跳转完成，默认是 `load` 事件触发时。指定事件数组，那么所有事件触发后才认为是跳转完成。事件包括：
    - `load` - 页面的load事件触发时
    - `domcontentloaded` - 页面的 `DOMContentLoaded` 事件触发时
    - `networkidle0` - 不再有网络连接时触发（至少500毫秒后）
    - `networkidle2` - 只有2个网络连接时触发（至少500毫秒后）
- 返回: <[Promise]<?[Response]>> Promise对象解析后是主要的请求的响应. 如果有多个跳转, 解析后是最后一次跳转的响应

#### page.screenshot([options])
- `options` <[Object]> 可选配置：
  - `path` <[string]> 截图保存路径。截图图片类型将从文件扩展名推断出来。如果是相对路径，则从[当前路径](https://nodejs.org/api/process.html#process_process_cwd)解析。如果没有指定路径，图片将不会保存到硬盘。
  - `type` <[string]> 指定截图类型, 可以是 `jpeg` 或者 `png`。默认 'png'.
  - `quality` <[number]> 图片质量, 可选值 0-100. `png` 类型不适用。
  - `fullPage` <[boolean]> 如果设置为true，则对完整的页面（需要滚动的部分也包含在内）。默认是false
  - `clip` <[Object]> 指定裁剪区域。需要配置：
    - `x` <[number]> 裁剪区域相对于左上角（0， 0）的x坐标
    - `y` <[number]> 裁剪区域相对于左上角（0， 0）的y坐标
    - `width` <[number]> 裁剪的宽度
    - `height` <[number]> 裁剪的高度
  - `omitBackground` <[boolean]> 隐藏默认的白色背景，背景透明。默认不透明
  - `encoding` <[string]> 图像的编码可以是 `base64` 或 `binary`。 默认为“二进制”。
- 返回: <[Promise]<[Buffer|String]>> Promise对象，resolve后是截图的buffer

> **备注** 在OS X上 截图需要至少1/6秒。查看讨论：https://crbug.com/741689.

#### page.select(selector, ...values)
- `selector` <[string]> 要查找的选择器
- `...values` <...[string]> 查找的配置项。如果选择器有多个属性，所有的值都会查找，否则只有第一个元素被找到。(翻译不一定准确，具体要实验)
- 返回: <[Promise]<[Array]<[string]>>> 所有符合的元素

当提供的选择器完成选中后，触发`change`和`input`事件
如果没有元素匹配指定选择器，将报错。

```js
page.select('select#colors', 'blue'); // 单选择器
page.select('select#colors', 'red', 'green', 'blue'); // 多选择器
```

[page.mainFrame().select()](#frameselectselector-values) 的简写

#### page.setBypassCSP(enabled)
- `enabled` <[boolean]> 设置绕过页面的安全政策
- 返回: <[Promise]>

设置绕过页面的安全政策

> **注意** CSP 发生在 CSP 初始化而不是评估阶段。也就是说应该在导航到这个域名前设置

#### page.setCacheEnabled(enabled)
- `enabled` <[boolean]> 设置缓存的 `enabled` 状态
- 返回: <[Promise]>

设置每个请求忽略缓存。默认是启用缓存的。

#### page.setContent(html)
- `html` <[string]> 设置页面源码
- returns: <[Promise]>

#### page.setCookie(...cookies)
- `...cookies` <...[Object]>
  - `name` <[string]> **required**
  - `value` <[string]> **required**
  - `url` <[string]>
  - `domain` <[string]>
  - `path` <[string]>
  - `expires` <[number]> Unix time in seconds.
  - `httpOnly` <[boolean]>
  - `secure` <[boolean]>
  - `sameSite` <"Strict"|"Lax">
- returns: <[Promise]>

```js
await page.setCookie(cookieObject1, cookieObject2);
```

#### page.setDefaultNavigationTimeout(timeout)
-- `timeout` <[number]> 最多等待时间，单位是毫秒

此方法会改变下面几个方法的默认30秒等待时间：
- [page.goto(url, options)](#pagegotourl-options)
- [page.goBack(options)](#pagegobackoptions)
- [page.goForward(options)](#pagegoforwardoptions)
- [page.reload(options)](#pagereloadoptions)
- [page.waitForNavigation(options)](#pagewaitfornavigationoptions)

#### page.setExtraHTTPHeaders(headers)
- `headers` <[Object]> 每个 HTTP 请求都会带上这些请求头。值必须是字符串
- 返回: <[Promise]>

当前页面发起的每个请求都会带上这些请求头

> **注意** 此方法不保证请求头的顺序

#### page.setGeolocation(options)
- `options`
  - `latitude` <[number]> Latitude between -90 and 90.
  - `longitude` <[number]> Longitude between -180 and 180.
  - `accuracy` <[number]> Optional non-negative accuracy value.
- returns: <[Promise]>

Sets the page's geolocation.

```js
await page.setGeolocation({latitude: 59.95, longitude: 30.31667});
```

> **注意** 考虑使用 [browserContext.overridePermissions](#browsercontextoverridepermissionsorigin-permissions) 授予页面权限去读取地址位置。

#### page.setJavaScriptEnabled(enabled)
- `enabled` <[boolean]> 是否启用js
- 返回: <[Promise]>

> **注意** 改变这个值不会影响已经执行的js。下一个跳转会完全起作用。

#### page.setOfflineMode(enabled)
- `enabled` <[boolean]> 设置 `true`, 启用离线模式。
- 返回: <[Promise]>

#### page.setRequestInterception(value)
- `value` <[boolean]> 是否启用请求拦截器
- 返回: <[Promise]>

启用请求拦截器，会激活 `request.abort`, `request.continue` 和 `request.respond` 方法。这提供了修改页面发出的网络请求的功能。

一旦启用请求拦截，每个请求都将停止，除非它继续，响应或中止。
通过请求拦截器取消所有图片请求：
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg'))
      interceptedRequest.abort();
    else
      interceptedRequest.continue();
  });
  await page.goto('https://example.com');
  await browser.close();
});
```

> **注意** 启用请求拦截器会禁用页面缓存。

#### page.setUserAgent(userAgent)
- `userAgent` <[string]> Specific user agent to use in this page
- returns: <[Promise]> Promise which resolves when the user agent is set.

#### page.setViewport(viewport)
- `viewport` <[Object]>
  - `width` <[number]> 宽度，单位是像素
  - `height` <[number]> 高度，单位是像素
  - `deviceScaleFactor` <[number]> 定义设备缩放， (类似于 dpr)。 默认 `1`。
  - `isMobile` <[boolean]> 要不要包含`meta viewport` 标签。 默认 `false`。
  - `hasTouch`<[boolean]> 指定终端是否支持触摸。 默认 `false`
  - `isLandscape` <[boolean]> 指定终端是不是 landscape 模式。 默认 `false`。
- 返回: <[Promise]>

> **注意** 在大部分情况下，改变 viewport 会重新加载页面以设置 `isMobile` 或者 `hasTouch`

如果是一个浏览器多个页面的情况，每个页面都可以有单独的viewport

#### page.tap(selector)
- `selector` <[string]> 要点击的元素的选择器。如果有多个匹配的元素，点击第一个
- 返回: <[Promise]>

此方法找到一个匹配的元素，如果需要会把此元素滚动到可视，然后通过 [page.touchscreen](#pagetouchscreen) 来点击元素的中间位置
如果没有匹配的元素，此方法会报错

[page.mainFrame().tap(selector)](#frametapselector) 的简写

#### page.target()
- returns: <[Target]> a target this page was created from.

#### page.title()
- returns: <[Promise]<[string]>> 页面标题.

[page.mainFrame().tap(selector)](#frametapselector) 的简写

#### page.touchscreen
- returns: <[Touchscreen]>

#### page.tracing
- returns: <[Tracing]>

#### page.type(selector, text[, options])
- `selector` <[string]> 要输入内容的元素选择器。如果有多个匹配的元素，输入到第一个匹配的元素。
- `text` <[string]> 要输入的内容
- `options` <[Object]>
  - `delay` <[number]> 每个字符输入的延迟，单位是毫秒。默认是 0。
- 返回: <[Promise]>

每个字符输入后都会触发 `keydown`, `keypress`/`input` 和 `keyup` 事件

要点击特殊按键，比如 `Control` 或 `ArrowDown`，用 [`keyboard.press`](#keyboardpresskey-options)

```js
page.type('#mytextarea', 'Hello'); // 立即输入
page.type('#mytextarea', 'World', {delay: 100}); // 输入变慢，像一个用户
```

[page.mainFrame().type(selector, text[, options])](#frametypeselector-text-options) 的简写

#### page.url()
- returns: <[string]>

[page.mainFrame().url()](#frameurl) 的简写

#### page.viewport()
- 返回: <?[Object]>
  - `width` <[number]> 宽度，单位是像素
  - `height` <[number]> 高度，单位是像素
  - `deviceScaleFactor` <[number]> 定义设备缩放， (类似于 dpr)。 默认 `1`。
  - `isMobile` <[boolean]> 要不要包含`meta viewport` 标签。 默认 `false`。
  - `hasTouch`<[boolean]> 指定终端是否支持触摸。 默认 `false`
  - `isLandscape` <[boolean]> 指定终端是不是 landscape 模式。 默认 `false`。

#### page.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])
- `selectorOrFunctionOrTimeout` <[string]|[number]|[function]> 选择器, 方法 或者 超时时间
- `options` <[Object]> 可选的等待参数
- `...args` <...[Serializable]|[JSHandle]> 传给  `pageFunction` 的参数
- returns: <[Promise]<[JSHandle]>> Promise which resolves to a JSHandle of the success value

此方法根据第一个参数的不同有不同的结果：
- 如果 `selectorOrFunctionOrTimeout` 是 `string`, 那么认为是 css 选择器或者一个xpath, 根据是不是'//'开头, 这时候此方法是
  [page.waitForSelector](#pagewaitforselectorselector-options) 或 [page.waitForXPath](#pagewaitforxpathxpath-options)的简写
- 如果 `selectorOrFunctionOrTimeout` 是 `function`, 那么认为是一个predicate，这时候此方法是[page.waitForFunction()](#pagewaitforfunctionpagefunction-options-args)的简写
- 如果 `selectorOrFunctionOrTimeout` 是 `number`, 那么认为是超时时间，单位是毫秒，返回的是Promise对象,在指定时间后resolve
- 否则会报错

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

[page.mainFrame().waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])](#framewaitforselectororfunctionortimeout-options-args)的简写

#### page.waitForFunction(pageFunction[, options[, ...args]])
- `pageFunction` <[function]|[string]> 要在浏览器实例上下文执行的方法
- `options` <[Object]> 可选的等待参数：
  - `polling` <[string]|[number]> An interval at which the `pageFunction` is executed, defaults to `raf`. If `polling` is a number, then it is treated as an interval in milliseconds at which the function would be executed. If `polling` is a string, then it can be one of the following values:
    - `raf` - to constantly execute `pageFunction` in `requestAnimationFrame` callback. This is the tightest polling mode which is suitable to observe styling changes.
    - `mutation` - to execute `pageFunction` on every DOM mutation.
  - `timeout` <[number]> 最长时间，单位是毫秒. 默认 `30000` (30 seconds). 传 `0` 表示不会超时。
- `...args` <...[Serializable]|[JSHandle]> 传给  `pageFunction`的参数
- returns: <[Promise]<[JSHandle]>> Promise 对象，当 `pageFunction` 返回等于true的结果时resolve, resolves 为结果的 JSHandle 类型

`waitForFunction` 可以用来监控页面的大小变化：
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  const watchDog = page.waitForFunction('window.innerWidth < 100');
  await page.setViewport({width: 50, height: 50});
  await watchDog;
  await browser.close();
});
```

将 node.js 中的参数传递给 `page.waitForFunction` 函数：

```js
const selector = '.foo';
await page.waitForFunction(selector => !!document.querySelector(selector), {}, selector);
```

[page.mainFrame().waitForFunction(pageFunction[, options[, ...args]])](#framewaitforfunctionpagefunction-options-args) 的简写

#### page.waitForNavigation(options)
- `options` <[Object]> 导航配置，可选值：
  - `timeout` <[number]> 跳转等待时间，单位是毫秒, 默认是30秒, 传 `0` 表示无限等待. 可以通过[page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout)方法修改默认值
  - `waitUntil` <[string]|[Array]<[string]>> 满足什么条件认为页面跳转完成，默认是 `load` 事件触发时。指定事件数组，那么所有事件触发后才认为是跳转完成。事件包括：
    - `load` - 页面的load事件触发时
    - `domcontentloaded` - 页面的`DOMContentLoaded`事件触发时
    - `networkidle0` - 不再有网络连接时触发（至少500毫秒后）
    - `networkidle2` - 只有2个网络连接时触发（至少500毫秒后）
- 返回: <[Promise]<[?Response]>> Promise对象resolve后是主要的请求的响应。如果有多个跳转, resolve后是最后一次跳转的响应。如果由于使用 History API 而导航到不同的锚点或导航，导航将以 `null` 解析。

此方法在页面跳转到一个新地址或重新加载时解析，如果你的代码会间接引起页面跳转，这个方法比较有用：
比如这个例子：

```js
const [response] = await Promise.all([
  page.waitForNavigation(), // The promise resolves after navigation has finished
  page.click('a.my-link'), // 点击该链接将间接导致导航(跳转)
]);
```

**注意** 通过 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) 改变地址会认为是一次跳转。

快捷方式 [page.mainFrame().waitForNavigation(options)](#framewaitfornavigationoptions)。

#### page.waitForRequest(urlOrPredicate, options)
- `urlOrPredicate` <[string]|[Function]> A URL or predicate to wait for.
- `options` <[Object]> Optional waiting parameters
  - `timeout` <[number]> Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout.
- returns: <[Promise]<[Request]>> Promise which resolves to the matched request.

```js
const firstRequest = await page.waitForRequest('http://example.com/resource');
const finalRequest = await page.waitForRequest(request => request.url() === 'http://example.com' && request.method() === 'GET');
return firstRequest.url();
```

#### page.waitForResponse(urlOrPredicate, options)
- `urlOrPredicate` <[string]|[Function]> A URL or predicate to wait for.
- `options` <[Object]> Optional waiting parameters
  - `timeout` <[number]> Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout.
- returns: <[Promise]<[Response]>> Promise which resolves to the matched response.

```js
const firstResponse = await page.waitForResponse('https://example.com/resource');
const finalResponse = await page.waitForResponse(response => response.url() === 'https://example.com' && response.status() === 200);
return finalResponse.ok();
```

#### page.waitForSelector(selector[, options])
- `selector` <[string]> 要等待的元素选择器
- `options` <[Object]> 可选参数：
  - `visible` <[boolean]> 等元素出现在dom中并且可以看到, 比如。 没有 `display: none` 或者 `visibility: hidden` 样式。 默认是 `false`。
  - `hidden` <[boolean]> 等元素在dom中消失或看不到, 比如。 有 `display: none` 或者 `visibility: hidden` 样式。 默认是 `false`。
  - `timeout` <[number]> 最大等待时间，单位是毫秒，默认是`30000` (30 seconds)，传0表示不会超时
- 返回: <[Promise]<[ElementHandle]>> Promise对象，当指定选择器匹配的元素添加到dom中时resolve

等待指定的选择器匹配的元素出现在页面中，如果调用此方法时已经有匹配的元素，那么此方法立即返回。
如果指定的选择器在超时时间后扔不出现，此方法会报错。

此方法在页面跳转时仍然有效：
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  let currentURL;
  page
    .waitForSelector('img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com'])
    await page.goto(currentURL);
  await browser.close();
});
```
[page.mainFrame().waitForSelector(selector[, options])](#framewaitforselectorselector-options) 的简写

#### page.waitForXPath(xpath[, options])
- `xpath` <[string]> 要等待的元素的xpath
- `options` <[Object]> 可选参数：
  - `visible` <[boolean]> 等元素出现在dom中并且可以看到, 比如. 没有 `display: none` 或者 `visibility: hidden` 样式. 默认是 `false`.
  - `hidden` <[boolean]> 等元素在dom中消失或看不到, 比如. 有 `display: none` 或者 `visibility: hidden` 样式. 默认是 `false`.
  - `timeout` <[number]> 最大等待时间，单位是毫秒，默认是`30000` (30 seconds)，传0表示不会超时
- 返回: <[Promise]<[ElementHandle]>> Promise对象，当指定xpath匹配的元素添加到dom中时resolve

等待指定的xpath匹配的元素出现在页面中，如果调用此方法时已经有匹配的元素，那么此方法立即返回。
如果指定的xpath在超时时间后扔不出现，此方法会报错。

此方法在页面跳转时仍然有效：
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  let currentURL;
  page
    .waitForXPath('//img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com'])
    await page.goto(currentURL);
  await browser.close();
});
```
[page.mainFrame().waitForXPath(xpath[, options])](#framewaitforxpathxpath-options) 的简写

#### page.workers()
- returns: <Array<Worker>> 该方法返回所有与页面关联的 [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

> **备注** 这不包含 ServiceWorkers

### class: Worker

Worker 类表示一个 [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)。在页面对象上 `workercreated` 和 `workerdestroyed` 事件被触发，以标识 worker 的生命周期。

```js
page.on('workercreated', worker => console.log('Worker created: ' + worker.url()));
page.on('workerdestroyed', worker => console.log('Worker destroyed: ' + worker.url()));

console.log('Current workers:');
for (const worker of page.workers())
  console.log('  ' + worker.url());
```

#### worker.evaluate(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in the worker context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

如果传递给 `worker.evaluate` 的函数返回一个 [Promise]，那么 `worker.evaluate` 将等待解析并返回它的值。

如果传递给 `worker.evaluate` 的函数返回一个 非[序列化]的值，那么 `worker.evaluate` 解析为 `undefined`。

[(await worker.executionContext()).evaluate(pageFunction, ...args)](#executioncontextevaluatepagefunction-args) 的快捷链接。

#### worker.evaluateHandle(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in the page context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

`worker.evaluate` 和 `worker.evaluateHandle` 之间的唯一区别是 `worker.evaluateHandle` 返回页内对象（JSHandle）。

如果传递给 `worker.evaluateHandle` 的函数返回一个 [Promise]，那么 `worker.evaluateHandle` 将等待解析并返回它的值。

[(await worker.executionContext()).evaluateHandle(pageFunction, ...args)](#executioncontextevaluatehandlepagefunction-args) 的快捷链接。

#### worker.executionContext()
- returns: <[Promise]<[ExecutionContext]>>

#### worker.url()
- returns: <[string]>

### class: Accessibility

The Accessibility class provides methods for inspecting Chromium's accessibility tree. The accessibility tree is used by assistive technology such as [screen readers](https://en.wikipedia.org/wiki/Screen_reader).

Accessibility is a very platform-specific thing. On different platforms, there are different screen readers that might have wildly different output.

Blink - Chrome's rendering engine - has a concept of "accessibility tree", which is than translated into different platform-specific APIs. Accessibility namespace gives users
access to the Blink Accessibility Tree.

Most of the accessibility tree gets filtered out when converting from Blink AX Tree to Platform-specific AX-Tree or by screen readers themselves. By default, Puppeteer tries to approximate this filtering, exposing only the "interesting" nodes of the tree.



#### accessibility.snapshot([options])
- `options` <[Object]>
  - `interestingOnly` <[boolean]> Prune uninteresting nodes from the tree. Defaults to `true`.
- returns: <[Promise]<[Object]>> Returns an [AXNode] object with the following properties:
  - `role` <[string]> The [role](https://www.w3.org/TR/wai-aria/#usage_intro).
  - `name` <[string]> A human readable name for the node.
  - `value` <[string]|[number]> The current value of the node.
  - `description` <[string]> An additional human readable description of the node.
  - `keyshortcuts` <[string]> Keyboard shortcuts associated with this node.
  - `roledescription` <[string]> A human readable alternative to the role.
  - `valuetext` <[string]> A description of the current value.
  - `disabled` <[boolean]> Whether the node is disabled.
  - `expanded` <[boolean]> Whether the node is expanded or collapsed.
  - `focused` <[boolean]> Whether the node is focused.
  - `modal` <[boolean]> Whether the node is [modal](https://en.wikipedia.org/wiki/Modal_window).
  - `multiline` <[boolean]> Whether the node text input supports multiline.
  - `multiselectable` <[boolean]> Whether more than one child can be selected.
  - `readonly` <[boolean]> Whether the node is read only.
  - `required` <[boolean]> Whether the node is required.
  - `selected` <[boolean]> Whether the node is selected in its parent node.
  - `checked` <[boolean]|"mixed"> Whether the checkbox is checked, or "mixed".
  - `pressed` <[boolean]|"mixed"> Whether the toggle button is checked, or "mixed".
  - `level` <[number]> The level of a heading.
  - `valuemin` <[number]> The minimum value in a node.
  - `valuemax` <[number]> The maximum value in a node.
  - `autocomplete` <[string]> What kind of autocomplete is supported by a control.
  - `haspopup` <[string]> What kind of popup is currently being shown for a node.
  - `invalid` <[string]> Whether and in what way this node's value is invalid.
  - `orientation` <[string]> Whether the node is oriented horizontally or vertically.
  - `children` <[Array]<[Object]>> Child [AXNode]s of this node, if any.

Captures the current state of the accessibility tree. The returned object represents the root accessible node of the page.

> **NOTE** The Chromium accessibility tree contains nodes that go unused on most platforms and by
most screen readers. Puppeteer will discard them as well for an easier to process tree,
unless `interestingOnly` is set to `false`.

An example of dumping the entire accessibility tree:
```js
const snapshot = await page.accessibility.snapshot();
console.log(snapshot);
```

An example of logging the focused node's name:
```js
const snapshot = await page.accessibility.snapshot();
const node = findFocusedNode(snapshot);
console.log(node && node.name);

function findFocusedNode(node) {
  if (node.focused)
    return node;
  for (const child of node.children || []) {
    const foundNode = findFocusedNode(child);
    return foundNode;
  }
  return null;
}
```

### class: Keyboard

Keyboard 提供一个接口来管理虚拟键盘. 高级接口为 [`keyboard.type`](#keyboardtypetext-options), 其接收原始字符, 然后在你的页面上生成对应的 keydown, keypress/input, 和  keyup 事件.

为了更精细的控制(虚拟键盘), 你可以使用 [`keyboard.down`](#keyboarddownkey-options), [`keyboard.up`](#keyboardupkey) 和 [`keyboard.sendCharacter`](#keyboardsendcharacterchar) 来手动触发事件, 就好像这些事件是由真实的键盘生成的.

持续按下 `Shift` 来选择一些字符串并且删除的例子:
```js
await page.keyboard.type('Hello World!');
await page.keyboard.press('ArrowLeft');

await page.keyboard.down('Shift');
for (let i = 0; i < ' World'.length; i++)
  await page.keyboard.press('ArrowLeft');
await page.keyboard.up('Shift');

await page.keyboard.press('Backspace');
// 结果字符串最终为 'Hello!'
```

按下 `A` 的例子:
```js
await page.keyboard.down('Shift');
await page.keyboard.press('KeyA');
await page.keyboard.up('Shift');
```

> **注意** 在 MacOS 上, `⌘ A` -> 选择全部等键盘快捷键不工作. 另见 [#1313](https://github.com/GoogleChrome/puppeteer/issues/1313)

#### keyboard.down(key[, options])
- `key` <[string]> 按下的键名, 比如 `ArrowLeft`. 一个包含所有键名的列表见 [USKeyboardLayout].
- `options` <[Object]>
  - `text` <[string]> 如果指定，则使用此文本生成输入事件.
- returns: <[Promise]>

会分发一个 `keydown` 事件。

如果 `key` 是一个单独字符并且没有除了 `Shift` 的其他修饰符键正在被按下, 一个 `keypress`/`input` 事件也将被生成. 可以指定 `text` 选项来强制生成输入事件。

如果 `key` 是一个修饰键, `Shift`, `Meta`, `Control`, 或者是 `Alt`, 随后的按键将与该修饰符一起发送. 要释放修饰键, 请使用 [`keyboard.up`](#keyboardupkey)。

在键被按下一次之后(译者注: 按下之后没有被释放, 一般会持续的触发该按键), 随后将持续调用 [`keyboard.down`](#keyboarddownkey-options), 事件对象的 [repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat) 将被设置为 true. 要释放该键, 请使用 [`keyboard.up`](#keyboardupkey).

> **注意** 修饰键会影响 `keyboard.down`, 持续按下 `Shift` 键将以大写形式输入文本。

#### keyboard.press(key[, options])
- `key` <[string]> 按下的键名, 比如 `ArrowLeft`. 一个包含所有键名的列表见 [USKeyboardLayout]。
- `options` <[Object]>
  - `text` <[string]> 如果指定，则使用此文本生成输入事件。
  - `delay` <[number]> 在 `keydown` 和 `keyup` 间隔的时间, 以毫秒为单位. 默认为 0。
- returns: <[Promise]>

如果 `key` 是一个单独字符并且没有除了 `Shift` 的其他修饰符键正在被按下, 一个 `keypress`/`input` 事件也将被生成。可以指定 `text` 选项来强制生成输入事件。

> **注意** 修饰键会影响 `keyboard.press`, 持续按下 `Shift` 键将已大写形式输入文本。

[`keyboard.down`](#keyboarddownkey-options) 和 [`keyboard.up`](#keyboardupkey) 的快捷方式。

#### keyboard.sendCharacter(char)
- `char` <[string]> 发送到页面的字符。
- returns: <[Promise]>

分发一个 `keypress` 和 `input` 事件。该方法不会发送 `keydown` 或 `keyup` 事件。

```js
page.keyboard.sendCharacter('嗨');
```

> **注意** 修饰键不会影响 `keyboard.sendCharacter`。持续按下 `Shift` 键将不会已大写形式输入文本。

#### keyboard.type(text, options)
- `text` <[string]> 要输入到焦点元素中的文本。
- `options` <[Object]>
  - `delay` <[number]> 按键间隔的时间, 以毫秒为单位. 默认为 0。
- returns: <[Promise]>

为文本中的每个字符发送一个`keydown`, `keypress`/`input` 和 `keyup` 事件。

要按下一个特别的键, 像 `Control` 或 `ArrowDown`. 请使用[`keyboard.press`](#keyboardpresskey-options)

```js
page.keyboard.type('Hello'); // 立即输入
page.keyboard.type('World', {delay: 100}); // 更缓慢的输入, 像一个用户
```

> **注意** 修饰键不会影响 `keyboard.type`。持续按下 `Shift` 键将不会已大写形式输入文本。

#### keyboard.up(key)
- `key` <[string]> 要释放的键的键名, 例如 `ArrowLeft`。一个包含所有键名的列表见 [USKeyboardLayout]。
- returns: <[Promise]>

分发一个 `keyup` 事件。

### class: Mouse

Mouse 类在相对于视口左上角的主框架 CSS 像素中运行。

每个 `page` 对象都有它自己的 Mouse 对象，使用见 [`page.mouse`](#pagemouse)。

```js
// 使用 ‘page.mouse’ 追踪 100x100 的矩形。
await page.mouse.move(0, 0);
await page.mouse.down();
await page.mouse.move(0, 100);
await page.mouse.move(100, 100);
await page.mouse.move(100, 0);
await page.mouse.move(0, 0);
await page.mouse.up();
```

#### mouse.click(x, y, [options])
- `x` <[number]>
- `y` <[number]>
- `options` <[Object]>
  - `button` <[string]> `left` ，`right` 或 `middle`，默认是 `left`。
  - `clickCount` <[number]> 默认是 1。见 [UIEvent.detail]。
  - `delay` <[number]> 在毫秒内且在 `mousedown` 和 `mouseup` 之间等待的时间。 默认为0。
- returns: <[Promise]>

[`mouse.move`](#mousemovex-y-options)，[`mouse.down`](#mousedownoptions) 和 [`mouse.up`](#mouseupoptions) 的快捷方式。

#### mouse.down([options])
- `options` <[Object]>
  - `button` <[string]> `left`，`right` 或 `middle`，默认是 `left`。
  - `clickCount` <[number]> 默认是 1。见 [UIEvent.detail]。
- returns: <[Promise]>

触发一个 `mousedown` 事件。

#### mouse.move(x, y, [options])
- `x` <[number]>
- `y` <[number]>
- `options` <[Object]>
  - `steps` <[number]> 默认是 1。中间触发 `mousemove` 事件。
- returns: <[Promise]>

触发一个 `mousemove` 事件。

#### mouse.up([options])
- `options` <[Object]>
  - `button` <[string]> `left`，`right`，或 `middle`，默认是 `left`。
  - `clickCount` <[number]> 默认是 1。见 [UIEvent.detail]。
- returns: <[Promise]>

触发一个 `mouseup` 事件。

### class: Touchscreen

#### touchscreen.tap(x, y)
- `x` <[number]>
- `y` <[number]>
- returns: <[Promise]>

触发 `touchstart` 和 `touchend` 事件。

### class: Tracing

你可以使用 [`tracing.start`](#tracingstartoptions) 和 [`tracing.stop`](#tracingstop) 创建一个可以在 Chrome DevTools or [timeline viewer](https://chromedevtools.github.io/timeline-viewer/) 中打开的跟踪文件。

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
- returns: <[Promise]<[Buffer]>> Promise which resolves to buffer with trace data.

### class: Dialog

[Dialog] 对象通过 ['dialog'](#event-dialog) 事件的页面分发。

一个使用 `Dialog` 类的例子：
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.dismiss();
    await browser.close();
  });
  page.evaluate(() => alert('1'));
});
```

#### dialog.accept([promptText])
- `promptText` <[string]> 提示中输入的文本。 如果对话框的`类型`不提示，不会产生任何影响。
- returns: <[Promise]> Promise which resolves when the dialog has been accepted.

#### dialog.defaultValue()
- returns: <[string]> 如果对话框出现提示，则返回默认提示值。 否则，返回空字符串。

#### dialog.dismiss()
- returns: <[Promise]> Promise which resolves when the dialog has been dismissed.

#### dialog.message()
- returns: <[string]> 显示在对话框中的信息。

#### dialog.type()
- returns: <[string]> 对话框类型，可以是 `alert` ，`beforeunload` ，`confirm` 或 `prompt` 中的一个。

### class: ConsoleMessage

[ConsoleMessage] 对象由页面通过 ['console'](#event-console) 事件分发。

#### consoleMessage.args()
- returns: <[Array]<[JSHandle]>>

#### consoleMessage.text()
- returns: <[string]>

#### consoleMessage.type()
- returns: <[string]>

以下值之一：`'log'` ， `'debug'` ， `'info'` ， `'error'` ， `'warning'` ， `'dir'` ， `'dirxml'` ， `'table'` ， `'trace'` ， `'clear'` ， `'startGroup'` ， `'startGroupCollapsed'` ， `'endGroup'` ， `'assert'` ， `'profile'` ， `'profileEnd'` ， `'count'` ， `'timeEnd'`。

### class: Frame

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

一个从 iframe 元素中获取文本的例子：

```js
  const frame = page.frames().find(frame => frame.name() === 'myframe');
  const text = await frame.$eval('.selector', element => element.textContent);
  console.log(text);
```

#### frame.$(selector)
- `selector` <[string]> A [selector] to query frame for
- returns: <[Promise]<?[ElementHandle]>> Promise which resolves to ElementHandle pointing to the frame element.

这个方法在框架中查询指定的选择器。如果在框架中没有匹配的元素会返回 `null`

#### frame.$$(selector)
- `selector` <[string]> A [selector] to query frame for
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
- returns: <[Promise]<[string]>>

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
- `selector` <[string]> 一个选择器元素。A [selector] of an element to focus. If there are multiple elements satisfying the selector, the first will be focused.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully focused. The promise will be rejected if there is no element matching `selector`.

这个方法选择传入的元素并且使之获得焦点。如果没有匹配到元素，会抛出异常。

#### frame.goto(url, options)
- `url` <[string]> URL to navigate frame to. The url should include scheme, e.g. `https://`.
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) method.
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
    - `load` - consider navigation to be finished when the `load` event is fired.
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms.
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms.
  - `referer` <[string]> Referer header value. If provided it will take preference over the referer header value set by [page.setExtraHTTPHeaders()](#pagesetextrahttpheadersheaders).
- returns: <[Promise]<?[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

如果存在下面的情况 `frame.goto` 将会抛出错误：
- SSL 错误 (e.g. in case of self-signed certificates).
- 目标 URL 不可用。
- 导航过程中 `timeout` 被触发。
- 主资源加载失败。

> **注意** `frame.goto`抛出或返回一个主资源响应。 唯一的例外是导航到`about：blank`或导航到具有不同 hash 的相同URL，这将成功并返回`null`。

> **注意** 无头模式将不支持导航到一个 PDF 文档。具体见 [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).


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

#### frame.waitForNavigation(options)
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) method.
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
    - `load` - consider navigation to be finished when the `load` event is fired.
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms.
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms.
- returns: <[Promise]<[?Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. In case of navigation to a different anchor or navigation due to History API usage, the navigation will resolve with `null`.

当框架导航到新 URL 时将被解析。它在运行代码时很有用。这将间接导致框架进行导航。看下这个例子：

```js
const [response] = await Promise.all([
  frame.waitForNavigation(), // The navigation promise resolves after navigation has finished
  frame.click('a.my-link'), // Clicking the link will indirectly cause a navigation
]);
```

**注意** 使用 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) 去改变 URL 将会被认为是导航。


#### frame.waitForSelector(selector[, options])
- `selector` <[string]> A [selector] of an element to wait for
- `options` <[Object]> Optional waiting parameters
  - `visible` <[boolean]> wait for element to be present in DOM and to be visible, i.e. to not have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `hidden` <[boolean]> wait for element to not be found in the DOM or to be hidden, i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
- returns: <[Promise]<[ElementHandle]>> Promise which resolves when element specified by selector string is added to DOM.

等待被选择等待元素出现在页面中。如果调用时选择的元素已存在，则立即返回。如果在设定的毫秒时间之后还没有出现，则抛出异常。

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

等待 `xpath` 出现在页面中。如果在调用函数的时候 `xpath` 已经存在，会立即返回。如果在设定的毫秒时间之后还没有出现，则抛出异常。

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

### class: ExecutionContext

该类表示一个 JavaScript 执行的上下文。 [Page] 可能有许多执行上下文：
- 每个 [frame](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) 都有 "默认" 的执行上下文，它始终在将帧附加到 DOM 后创建。该上下文由 [`frame.executionContext()`](#frameexecutioncontext) 方法返回。
- [Extensions](https://developer.chrome.com/extensions) 的内容脚本创建了其他执行上下文。

除了页面，执行上下文可以在 [workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 中找到。

#### executionContext.evaluate(pageFunction, ...args)
- `pageFunction` <[function]|[string]> Function to be evaluated in `executionContext`
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

如果传递给 `executionContext.evaluate` 的函数返回一个[Promise]，那么 `executionContext.evaluate` 将等待承诺解析并返回它的值。

```js
const executionContext = await page.mainFrame().executionContext();
const result = await executionContext.evaluate(() => Promise.resolve(8 * 7));
console.log(result); // 输出 "56"
```

入参可以是一个字符串，但不能是函数。

```js
console.log(await executionContext.evaluate('1 + 2')); // 输出 "3"
```

[JSHandle] 实例可以作为参数传递给 `executionContext.evaluate`：
```js
const oneHandle = await executionContext.evaluateHandle(() => 1);
const twoHandle = await executionContext.evaluateHandle(() => 2);
const result = await executionContext.evaluate((a, b) => a + b, oneHandle, twoHandle);
await oneHandle.dispose();
await twoHandle.dispose();
console.log(result); // 输出 '3'
```

#### executionContext.evaluateHandle(pageFunction, ...args)
- `pageFunction` <[function]|[string]> 函数在 `executionContext` 中被运行
- `...args` <...[Serializable]|[JSHandle]> 传递给 `pageFunction` 的参数
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

`executionContext.evaluate` 和 `executionContext.evaluateHandle` 唯一的区别在于`executionContext.evaluateHandle` 会返回页内对象（JSHandle）。

如果传递给 `executionContext.evaluateHandle` 的函数返回一个 [Promise]，那么`executionContext.evaluateHandle`将等待承诺解析并返回它的值。

```js
const context = await page.mainFrame().executionContext();
const aHandle = await context.evaluateHandle(() => Promise.resolve(self));
aHandle; // 处理全局对象
```

入参可以是一个字符串，但不能是函数。

```js
const aHandle = await context.evaluateHandle('1 + 2'); // 处理'3'对象
```

[JSHandle] 实例可以作为参数传递给 `executionContext.evaluateHandle`：
```js
const aHandle = await context.evaluateHandle(() => document.body);
const resultHandle = await context.evaluateHandle(body => body.innerHTML, aHandle);
console.log(await resultHandle.jsonValue()); // 输出 body 的 innerHTML
await aHandle.dispose();
await resultHandle.dispose();
```

#### executionContext.frame()
- returns: <?[Frame]> 与此执行上下文相关的框架。

> **注意** 并非每个执行的上下文都与框架有关系。 例如，workers 和扩展程序具有与框架无关的执行上下文。

#### executionContext.queryObjects(prototypeHandle)
- `prototypeHandle` <[JSHandle]> 对象原型的句柄
- returns: <[JSHandle]> 这个原型的一个对象数组的句柄

该方法重复查找 JavaScript 堆，找到具有给定原型的所有对象。

```js
// 创建一个 Map 对象
await page.evaluate(() => window.map = new Map());
// 获取 Map 对象原型的句柄
const mapPrototype = await page.evaluateHandle(() => Map.prototype);
// 将所有映射实例查询到一个数组中
const mapInstances = await page.queryObjects(mapPrototype);
// 计算堆中映射对象的数量
const count = await page.evaluate(maps => maps.length, mapInstances);
await mapInstances.dispose();
await mapPrototype.dispose();
```

### class: JSHandle

JSHandle 表示页面内的 JavaScript 对象。 JSHandles 可以使用 [page.evaluateHandle](＃pageevaluatehandlepagefunction-args) 方法创建。

```js
const windowHandle = await page.evaluateHandle(() => window);
// ...
```

JSHandle 可防止引用的 JavaScript 对象被垃圾收集，除非是句柄 [disposed](＃jshandledispose)。 当原始框架被导航或父上下文被破坏时，JSHandles 会自动处理。

JSHandle 实例可以使用在 [`page.$eval()`](＃pageevalselector-pagefunction-args)，[`page.evaluate()`](＃pageevaluatepagefunction-args) 和 [`page.evaluateHandle`](＃pageevaluatehandlepagefunction-args) 方法。

#### jsHandle.asElement()
- returns: <?[ElementHandle]>

如果对象句柄是 [ElementHandle] 的一个实例，则返回 `null` 或对象句柄本身。

#### jsHandle.dispose()
- returns: <[Promise]> Promise which resolves when the object handle is successfully disposed.

`jsHandle.dispose` 方法停止引用元素句柄。

#### jsHandle.executionContext()
- returns: [ExecutionContext]

返回句柄所属的执行上下文。

#### jsHandle.getProperties()
- returns: <[Promise]<[Map]<[string], [JSHandle]>>>

该方法返回一个包含属性名称作为键的映射和属性值的 JSHandle 实例。

```js
const handle = await page.evaluateHandle(() => ({window, document}));
const properties = await handle.getProperties();
const windowHandle = properties.get('window');
const documentHandle = properties.get('document');
await handle.dispose();
```

#### jsHandle.getProperty(propertyName)
- `propertyName` <[string]> 属性获取
- returns: <[Promise]<[JSHandle]>>

从引用的对象中获取单个属性。

#### jsHandle.jsonValue()
- returns: <[Promise]<[Object]>>

返回对象的 JSON 表示。如果对象又一个 [`toJSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON()_behavior)
函数, 它 **将不会被调用**。

> **注意** 如果引用的对象不可字符串化，该方法将返回一个空的 JSON 对象。 如果对象具有循环引用，它将引发一个错误。

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
- `selector` <[string]> 用于选取页面 DOM 元素的 [CSS Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
- returns: <[Promise]<?[ElementHandle]>>

该方法在页面内运行 `element.querySelector`。 如果没有元素匹配选择器，则返回值为 `null`。

#### elementHandle.$$(selector)
- `selector` <[string]> 用于选取页面 DOM 元素的 [CSS Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
- returns: <[Promise]<[Array]<[ElementHandle]>>>

该方法在页面内运行 `element.querySelectorAll`。 如果没有元素匹配选择器，则返回值为 `[]`。

#### elementHandle.$eval(selector, pageFunction, ...args)
- `selector` <[string]> 用于选取页面 DOM 元素的 [CSS Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
- `pageFunction` <[function]> 在浏览器上下文中执行的函数
- `...args` <...[Serializable]|[JSHandle]> 传递给 `pageFunction` 的参数
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
- `selector` <[string]> 用于选取页面 DOM 元素的 [CSS Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
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
  - width <[number]> 元素的宽度.
  - height <[number]> 元素的高度.

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

### class: Request

每当页面发送一个请求，例如网络请求，以下事件会被 puppeteer 页面触发：
- ['request'](#event-request) 当请求发起后页面会触发这个事件。
- ['response'](#event-response) 请求收到响应的时候触发。
- ['requestfinished'](#event-requestfinished) 请求完成并且响应体下载完成时触发


如果某些时候请求失败，后续不会触发 'requestfinished' 事件(可能也不会触发 'response' 事件)，而是触发   ['requestfailed'](#event-requestfailed) 事件

如果请求得到一个重定向的响应，请求会成功地触发 'requestfinished' 事件，并且对重定向的 `url` 发起一个新的请求

#### request.abort([errorCode])
- `errorCode` <[string]> 可选的错误码。默认为`failed`，可以是以下值：
  - `aborted` - 操作被取消 (因为用户的行为)
  - `accessdenied` - 访问资源权限不足(非网络原因)
  - `addressunreachable` - 找不到IP地址 这通常意味着没有路由通向指定主机或者网络
  - `blockedbyclient` - 客户端选择阻止请求
  - `blockedbyresponse` - 请求失败，因为响应是与未满足的要求一起传递出去的（例如，'X-Frame-Options' 和'Content-Security-Policy' 祖先检查）
  - `connectionaborted` - 未收到数据发送的ACK信号导致的连接超时
  - `connectionclosed` - 连接关闭(对应 TCP FIN 包)
  - `connectionfailed` - 尝试连接失败。
  - `connectionrefused` - 尝试连接拒绝。
  - `connectionreset` - 连接被重置 (对应 TCP RST 包)。
  - `internetdisconnected` - 网络连接丢失。
  - `namenotresolved` - 主机名字无法被解析。
  - `timedout` - 操作超时。
  - `failed` - 发生通用错误。
- returns: <[Promise]>

想要中断请求，应该使用 `page.setRequestInterception` 来开启请求拦截，如果请求拦截没有开启会立即抛出异常。

#### request.continue([overrides])
- `overrides` <[Object]> 可选的请求覆写选项，可以是以下值中的一个：
  - `url` <[string]> 如果设置的话，请求 url 将会改变
  - `method` <[string]> 如果设置的话，会改变请求方法 (例如，`GET` 或者 `POST`)
  - `postData` <[string]> 如果设置的话，会改变请求要提交的数据
  - `headers` <[Object]> 如果设置的话，改变 http 请求头
- returns: <[Promise]>

想要用可选的请求覆写选项继续请求，应该使用 `page.setRequestInterception` 来开启请求拦截，如果请求拦截没有开启会立即抛出异常

#### request.failure()
- returns: <?[Object]> 描述请求失败的对象，如果有的话
  - `errorText` <[string]> 人类可读的错误信息，例如，`'net::ERR_FAILED'`。

`requestfailed` 事件触发后，在没有请求失败的情况下，这个方法会返回 `null`。

输出所有失败请求示例:
```js
page.on('requestfailed', request => {
  console.log(request.url() + ' ' + request.failure().errorText);
});
```

#### request.frame()
- returns: <?[Frame]> 发起请求的 [Frame]，如果导航到错误页面，则为`null`。

#### request.headers()
- returns: <[Object]> 该请求的 http 头对象。所有头都采用小写的命名方式

#### request.isNavigationRequest()
- returns: <[boolean]>

这个请求是否正在驱动框架在导航。

#### request.method()
- returns: <[string]> 请求方法 ( GET，POST，等。)

#### request.postData()
- returns: <[string]> 请求提交的数据。

#### request.redirectChain()
- returns: <[Array]<[Request]>>

`redirectChain` 是一条获取资源的请求链

- 如果没有被重定向而且请求成功的话, 链路将会被置空
- 如果服务器至少响应了一次重定向, 那么这条链路将会包含所有重定向请求

`redirectChain` 会共享相同链路上的所有请求。

举个例子，如果网站 `http://example.com` 重定向一次到
`https://example.com`，那么这条链就会包含一个请求：

```js
const response = await page.goto('http://example.com');
const chain = response.request().redirectChain();
console.log(chain.length); // 1
console.log(chain[0].url()); // 'http://example.com'
```

如果网站 `https://google.com` 没有重定向，那么链(数组)就会被置空：
```js
const response = await page.goto('https://google.com');
const chain = response.request().redirectChain();
console.log(chain.length); // 0
```

#### request.resourceType()
- returns: <[string]>

包含渲染引擎识别出的请求资源类型
资源类型为以下值中的一个：`document`，`stylesheet`，`image`，`media`，`font`，`script`，`texttrack`，`xhr`，`fetch`，`eventsource`，`websocket`，`manifest`，`other`。

#### request.respond(response)
- `response` <[Object]> 完成请求的响应对象
  - `status` <[number]> 响应状态码，默认为 `200`。
  - `headers` <[Object]> 可选的响应头
  - `contentType` <[string]> 设置的话，等同于 `Content-Type` 响应头
  - `body` <[Buffer]|[string]> 可选的响应体
- returns: <[Promise]>

完成请求后会返回一个响应。可以通过开启 `page.setRequestInterception` 选项来使用请求拦截，如果请求拦截没有开启则会抛出异常。

下面例子中，所有执行完成的请求都会返回 404 响应体

```js
await page.setRequestInterception(true);
page.on('request', request => {
  request.respond({
    status: 404,
    contentType: 'text/plain',
    body: 'Not Found!'
  });
});
```

> **注意** `request.respond` 不支持模拟响应 `dataURL` 请求。
> 对 `dataURL`请求使用 `request.respond` 并不会起任何作用。

#### request.response()
- returns: <?[Response]> 相应的 Response 对象，如果没有收到响应则是`null`。

#### request.url()
- returns: <[string]> 请求的 URL。

### class: Response

[Response] 类表示页面接收的响应。

#### response.buffer()
- returns: <Promise<[Buffer]>> Promise which resolves to a buffer with response body.

#### response.frame()
- returns: <?[Frame]> 响应请求的 [Frame]，如果导航到错误页面，则为`null`。

#### response.fromCache()
- returns: <[boolean]>

如果响应来自浏览器的磁盘缓存或内存缓存，则为 true。

#### response.fromServiceWorker()
- returns: <[boolean]>

如果响应是由 service worker 提供的，则为 true。

#### response.headers()
- returns: <[Object]> 具有与响应关联的 HTTP 头对象。 所有标题名称都是小写。

#### response.json()
- returns: <Promise<[Object]>> Promise which resolves to a JSON representation of response body.

如果响应主体无法进行 `JSON.parse` 解析，则此方法将抛出错误。

#### response.ok()
- returns: <[boolean]>

包含一个布尔值，说明响应是否成功（状态范围为200-299）。

#### response.remoteAddress()
- returns: <[Object]>
  - `ip` <[string]> 远程服务的 IP 地址
  - `port` <[number]> 连接远程服务的端口号

#### response.request()
- returns: <[Request]> 一个匹配的 [Request] 对象.

#### response.securityDetails()
- returns: <?[SecurityDetails]> 如果通过安全连接接收到响应，则为安全细节，否则为`null`。

#### response.status()
- returns: <[number]>

包含响应的状态代码（例如，200成功）。

#### response.statusText()
- returns: <[string]>

包含响应的状态文本（例如,通常成功的 "OK"）。

#### response.text()
- returns: <[Promise]<[string]>> Promise which resolves to a text representation of response body.

#### response.url()
- returns: <[string]>

包含响应的 URL。

### class: SecurityDetails

[SecurityDetails] 类表示通过安全连接收到响应时的安全性详细信息。

#### securityDetails.issuer()
- returns: <[string]> 具有证书颁发者名称的字符串。

#### securityDetails.protocol()
- returns: <[string]> 带安全协议的字符串，例如："TLS 1.2"。

#### securityDetails.subjectName()
- returns: <[string]> 证书颁发给的主体的名称。

#### securityDetails.validFrom()
- returns: <[number]> [UnixTime](https://en.wikipedia.org/wiki/Unix_time) 说明证书有效期的开始。

#### securityDetails.validTo()
- returns: <[number]> [UnixTime](https://en.wikipedia.org/wiki/Unix_time) 说明证书的有效期结束。

### class: Target

#### target.browser()

- returns: <[Browser]>

获取目标所属的浏览器。

#### target.browserContext()

- returns: <[BrowserContext]>

目标所属的浏览器上下文。

#### target.createCDPSession()
- returns: <[Promise]<[CDPSession]>>

创建一个 Chrome Devtools 协议会话至目标。

#### target.opener()
- returns: <?[Target]>

获取打开此目标的目标。 顶级目标返回`null`。

#### target.page()
- returns: <[Promise]<?[Page]>>

如果目标不是 `"page"` 或 `"background_page"` 类型，则返回 `null`。

#### target.type()
- returns: <[string]>

确定目标是怎么样的类型。 可以是 `"page"`，[`"background_page"`](https://developer.chrome.com/extensions/background_pages)，`"service_worker"`，`"browser"` 或 `"其他"`。

#### target.url()
- returns: <[string]>

### class: CDPSession

* extends: [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)

`CDPSession` 实例用于与 Chrome Devtools 协议的原生通信：
- 协议方法可以用 `session.send` 方法调用。
- 协议事件可以通过 `session.on` 方法订阅。

DevTools Protocol 的文档具体见这里: [DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).

```js
const client = await page.target().createCDPSession();
await client.send('Animation.enable');
client.on('Animation.animationCreated', () => console.log('Animation created!'));
const response = await client.send('Animation.getPlaybackRate');
console.log('playback rate is ' + response.playbackRate);
await client.send('Animation.setPlaybackRate', {
  playbackRate: response.playbackRate / 2
});
```

#### cdpSession.detach()
- returns: <[Promise]>

从目标中分离 cdpSession。 一旦分离，cdpSession 对象将不会触发任何事件并且不能用于发送消息。

#### cdpSession.send(method[, params])
- `method` <[string]> protocol method name
- `params` <[Object]> Optional method parameters
- returns: <[Promise]<[Object]>>

### class: Coverage

Coverage 收集相关页面使用的 JavaScript 和 CSS 部分的信息。

使用 JavaScript 和 CSS 覆盖率来获取初始百分比的例子
执行代码：

```js
// 启用 JavaScript 和 CSS 覆盖
await Promise.all([
  page.coverage.startJSCoverage(),
  page.coverage.startCSSCoverage()
]);
// 导航至页面
await page.goto('https://example.com');
// 禁用 JavaScript 和 CSS 覆盖
const [jsCoverage, cssCoverage] = await Promise.all([
  page.coverage.stopJSCoverage(),
  page.coverage.stopCSSCoverage(),
]);
let totalBytes = 0;
let usedBytes = 0;
const coverage = [...jsCoverage, ...cssCoverage];
for (const entry of coverage) {
  totalBytes += entry.text.length;
  for (const range of entry.ranges)
    usedBytes += range.end - range.start - 1;
}
console.log(`Bytes used: ${usedBytes / totalBytes * 100}%`);
```

_使用 [Istanbul](https://github.com/istanbuljs) 输出一个覆盖率表格，见
[puppeteer-to-istanbul](https://github.com/istanbuljs/puppeteer-to-istanbul)._

#### coverage.startCSSCoverage(options)
- `options` <[Object]>  覆盖范围的配置项
  - `resetOnNavigation` <[boolean]> 是否重置每个导航的覆盖范围。默认是 `true`。
- returns: <[Promise]> Promise that resolves when coverage is started

#### coverage.startJSCoverage(options)
- `options` <[Object]> 覆盖范围的配置项
  - `resetOnNavigation` <[boolean]> 是否重置每个导航的覆盖范围。默认是 `true`。
  - `reportAnonymousScripts` <[boolean]> 是否应报告页面生成的匿名脚本。 默认为 `false`。
- returns: <[Promise]> Promise that resolves when coverage is started

> **注意** 匿名脚本指的是没有关联 URL 的脚本。 它们是使用 `eval` 或 `new Function` 在页面上动态创建的脚本。如果`reportAnonymousScripts` 设置为 `true`，匿名脚本将使用 `__puppeteer_evaluation_script__` 作为其URL。

#### coverage.stopCSSCoverage()
- returns: <[Promise]<[Array]<[Object]>>> Promise that resolves to the array of coverage reports for all stylesheets
  - `url` <[string]> 样式表 URL
  - `text` <[string]> 样式表内容
  - `ranges` <[Array]<[Object]>> 所使用的StyleSheet范围。 范围已排序且不重叠。
    - `start` <[number]> 包含文字的起始偏移量
    - `end` <[number]> 文本中的结尾偏移，独占

> **注意** CSS Coverage 不包含没有 sourceURL 的动态注入式样式标签。

#### coverage.stopJSCoverage()
- returns: <[Promise]<[Array]<[Object]>>> Promise that resolves to the array of coverage reports for all non-anonymous scripts
  - `url` <[string]> 脚本 URL
  - `text` <[string]> 脚本内容
  - `ranges` <[Array]<[Object]>> 已执行的脚本范围。 范围已排序且不重叠。
    - `start` <[number]> 包含文字的起始偏移量
    - `end` <[number]> 文本中的结尾偏移，独占

> **注意** JavaScript Coverage 默认情况下不包含匿名脚本。 但是，具有 sourceURL 的脚本将被上报。

### class: TimeoutError

* extends: [Error]

每当某些操作因超时而终止时，就会触发 TimeoutError。例如 [page.waitForSelector(selector[, options])](#pagewaitforselectorselector-options) 或者 [puppeteer.launch([options])](#puppeteerlaunchoptions)。


[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array "Array"
[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean"
[Buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer "Buffer"
[function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "Function"
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number"
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object"
[origin]: https://developer.mozilla.org/en-US/docs/Glossary/Origin "Origin"
[Page]: #class-page "Page"
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String"
[stream.Readable]: https://nodejs.org/api/stream.html#stream_class_stream_readable "stream.Readable"
[CDPSession]: #class-cdpsession  "CDPSession"
[BrowserFetcher]: #class-browserfetcher  "BrowserFetcher"
[BrowserContext]: #class-browsercontext  "BrowserContext"
[Error]: https://nodejs.org/api/errors.html#errors_class_error "Error"
[Frame]: #class-frame "Frame"
[ConsoleMessage]: #class-consolemessage "ConsoleMessage"
[ChildProcess]: https://nodejs.org/api/child_process.html "ChildProcess"
[Coverage]: #class-coverage "Coverage"
[iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols "Iterator"
[Response]: #class-response  "Response"
[Request]: #class-request  "Request"
[Browser]: #class-browser  "Browser"
[Body]: #class-body  "Body"
[Element]: https://developer.mozilla.org/en-US/docs/Web/API/element "Element"
[Keyboard]: #class-keyboard "Keyboard"
[Dialog]: #class-dialog  "Dialog"
[JSHandle]: #class-jshandle "JSHandle"
[ExecutionContext]: #class-executioncontext "ExecutionContext"
[Mouse]: #class-mouse "Mouse"
[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Map"
[selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
[Tracing]: #class-tracing "Tracing"
[ElementHandle]: #class-elementhandle "ElementHandle"
[UIEvent.detail]: https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail "UIEvent.detail"
[Serializable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description "Serializable"
[Touchscreen]: #class-touchscreen "Touchscreen"
[Target]: #class-target "Target"
[USKeyboardLayout]: ../lib/USKeyboardLayout.js "USKeyboardLayout"
[xpath]: https://developer.mozilla.org/en-US/docs/Web/XPath "xpath"
[UnixTime]: https://en.wikipedia.org/wiki/Unix_time "Unix Time"
[SecurityDetails]: #class-securitydetails "SecurityDetails"
[Worker]: #class-worker "Worker"
[Accessibility]: #class-accessibility "Accessibility"
[AXNode]: #accessibilitysnapshotoptions "AXNode"
[ConnectionTransport]: ../lib/WebSocketTransport.js "ConnectionTransport"