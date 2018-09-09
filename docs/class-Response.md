[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/v1.7.0/docs/api.md#class-response)

#### class: Response

[Response] 类表示页面接收的响应。

#### response.buffer()
- returns: <Promise<[Buffer]>> Promise which resolves to a buffer with response body.

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

如果响应主体不能通过 `JSON.parse` 解析，则此方法将抛出。

#### response.ok()
- returns: <[boolean]>

包含一个布尔值，说明响应是否成功（状态范围为200-299）。

#### response.remoteAddress()
- returns: <[Object]>
  - `ip` <[string]> the IP address of the remote server
  - `port` <[number]> the port used to connect to the remote server

#### response.request()
- returns: <[Request]> 一个匹配的 [Request] 对象.

#### response.securityDetails()
- returns: <?[SecurityDetails]> 如果通过安全连接接收到响应，则为安全细节，否则为null。

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
