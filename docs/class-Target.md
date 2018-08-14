[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/v1.7.0/docs/api.md#class-target)

#### class: Target

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
