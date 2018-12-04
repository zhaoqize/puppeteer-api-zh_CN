[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-response)

#### class: Response

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
