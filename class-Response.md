- [class: Response](#class-response)
  * [response.buffer()](#responsebuffer)
  * [response.fromCache()](#responsefromcache)
  * [response.fromServiceWorker()](#responsefromserviceworker)
  * [response.headers()](#responseheaders)
  * [response.json()](#responsejson)
  * [response.ok()](#responseok)
  * [response.request()](#responserequest)
  * [response.securityDetails()](#responsesecuritydetails)
  * [response.status()](#responsestatus)
  * [response.text()](#responsetext)
  * [response.url()](#responseurl)

### class: Response

[Response] 类表示页面接收的响应。

#### response.buffer()
- returns: <Promise<[Buffer]>> （意译：返回响应主体的缓冲区。）

#### response.fromCache()
- returns: <[boolean]>

如果响应来自浏览器的磁盘缓存或内存缓存，则为 true。

#### response.fromServiceWorker()
- returns: <[boolean]>

如果响应是由 service worker 提供的，则为 true。

#### response.headers()
- returns: <[Object]> 具有与响应关联的 HTTP 头对象。 所有标题名称都是小写。

#### response.json()
- returns: <Promise<[Object]>> （意译：返回解析为响应主体的 JSON 表示。）

如果响应主体不能通过 `JSON.parse` 解析，则此方法将抛出。

#### response.ok()
- returns: <[boolean]>

包含一个布尔值，说明响应是否成功（状态范围为200-299）。

#### response.request()
- returns: <[Request]> 一个匹配的 [Request] 对象.

#### response.securityDetails()
- returns: <?[SecurityDetails]> 如果通过安全连接接收到响应，则为安全细节，否则为null。

#### response.status()
- returns: <[number]>

包含响应的状态代码（例如，200成功）。

#### response.text()
- returns: <[Promise]<[string]>> （意译：返回响应主体的文本表示。）

#### response.url()
- returns: <[string]>

包含响应的 URL。
