- [class: Target](#class-target)
  * [target.createCDPSession()](#targetcreatecdpsession)
  * [target.page()](#targetpage)
  * [target.type()](#targettype)
  * [target.url()](#targeturl)

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

#### target.page()
- returns: <[Promise]<?[Page]>>

如果目标不是 `"页面"` 类型，则返回 `null`。

#### target.type()
- returns: <[string]>

确定目标是怎么样的类型。 可以是 `"页面"`，`"service_worker"`，`"浏览器"` 或 `"其他"`。

#### target.url()
- returns: <[string]>
