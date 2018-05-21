- [class: Request](#class-request)
  * [request.abort([errorCode])](#requestaborterrorcode)
  * [request.continue([overrides])](#requestcontinueoverrides)
  * [request.failure()](#requestfailure)
  * [request.frame()](#requestframe)
  * [request.headers()](#requestheaders)
  * [request.method()](#requestmethod)
  * [request.postData()](#requestpostdata)
  * [request.redirectChain()](#requestredirectchain)
  * [request.resourceType()](#requestresourcetype)
  * [request.respond(response)](#requestrespondresponse)
  * [request.response()](#requestresponse)
  * [request.url()](#requesturl)

### class: Request

每当页面发送一个请求, 以下事件会被 puppeteer 页面触发
- ['request'](#event-request) 当请求发起后页面会触发这个事件.
- ['response'](#event-response) 请求收到响应的时候触发.
- ['requestfinished'](#event-requestfinished) 请求完成并且响应体下载完成时触发


如果某些时候请求失败, 后续不会触发 'requestfinished' 事件(可能也不会触发 'response' 事件), 而是触发 ['requestfailed'](#event-requestfailed)事件

如果请求得到一个重定向的响应, 请求会成功地触发 'requestfinished' 事件, 并且对重定向的`url`发起一个新的请求

#### request.abort([errorCode])
- `errorCode` <[string]> 可选的错误码. 默认为`failed`, 可以是以下值:
  - `aborted` - 操作被取消 (因为用户的行为)
  - `accessdenied` - 访问资源权限不足(非网络原因)
  - `addressunreachable` - 找不到IP地址 这通常意味着没有路由通向指定主机或者网络
  - `connectionaborted` - 未收到数据发送的ACK信号导致的连接超时
  - `connectionclosed` - 连接关闭(对应 TCP FIN 包)
  - `connectionfailed` - 尝试连接失败.
  - `connectionrefused` - 尝试连接拒绝.
  - `connectionreset` - 连接被重置 (对应 TCP RST 包).
  - `internetdisconnected` - 网络连接丢失.
  - `namenotresolved` - 主机名字无法被解析.
  - `timedout` - 操作超时.
  - `failed` - 发生通用错误.
- returns: <[Promise]>

想要中断请求, 应该使用 `page.setRequestInterception` 来开启请求拦截, 如果请求拦截没有开启会立即抛出异常.

#### request.continue([overrides])
- `overrides` <[Object]> 可选的请求覆写选项, 可以是以下值中的一个:
  - `url` <[string]> 如果设置的话, 请求url将会改变
  - `method` <[string]> 如果设置的话, 会改变请求方法 (例如. `GET` 或者 `POST`)
  - `postData` <[string]> 如果设置的话, 会改变请求要提交的数据
  - `headers` <[Object]> 如果设置的话, 改变http请求头
- returns: <[Promise]>

想要用可选的请求覆写选项继续请求, 应该使用 `page.setRequestInterception` 来开启请求拦截, 如果请求拦截没有开启会立即抛出异常

#### request.failure()
- returns: <?[Object]> 描述请求失败的对象, 如果有的话
  - `errorText` <[string]> 人类可读的错误信息, 例如, `'net::ERR_FAILED'`.

`requestfailed` 事件触发后, 在没有请求失败的情况下, 这个方法会返回 `null`.

输出所有失败请求示例::

```js
page.on('requestfailed', request => {
  console.log(request.url() + ' ' + request.failure().errorText);
});
```

#### request.frame()
- returns: <?[Frame]> 一个相应的 [Frame] 对象, 如果导航到错误页面的话, 则是'null'

#### request.headers()
- returns: <[Object]> 该请求的 http 头对象. 所有头都采用小写的命名方式

#### request.method()
- returns: <[string]> 请求方法 (GET, POST, 等.)

#### request.postData()
- returns: <[string]> 请求提交的数据, 如果有的话.

#### request.redirectChain()
- returns: <[Array]<[Request]>>

A `redirectChain` is a chain of requests initiated to fetch a resource.
A `redirectChain` is a chain of requests initiated to fetch a resource.
- If there are no redirects and the request was successful, the chain will be empty.
- If a server responds with at least a single redirect, then the chain will
contain all the requests that were redirected.

`redirectChain` is shared between all the requests of the same chain.

For example, if the website `http://example.com` has a single redirect to
`https://example.com`, then the chain will contain one request:

```js
const response = await page.goto('http://example.com');
const chain = response.request().redirectChain();
console.log(chain.length); // 1
console.log(chain[0].url()); // 'http://example.com'
```

If the website `https://google.com` has no redirects, then the chain will be empty:
```js
const response = await page.goto('https://google.com');
const chain = response.request().redirectChain();
console.log(chain.length); // 0
```

#### request.resourceType()
- returns: <[string]>

Contains the request's resource type as it was perceived by the rendering engine.
ResourceType will be one of the following: `document`, `stylesheet`, `image`, `media`, `font`, `script`, `texttrack`, `xhr`, `fetch`, `eventsource`, `websocket`, `manifest`, `other`.

#### request.respond(response)
- `response` <[Object]> Response that will fulfill this request
  - `status` <[number]> Response status code, defaults to `200`.
  - `headers` <[Object]> Optional response headers
  - `contentType` <[string]> If set, equals to setting `Content-Type` response header
  - `body` <[Buffer]|[string]> Optional response body
- returns: <[Promise]>

Fulfills request with given response. To use this, request interception should
be enabled with `page.setRequestInterception`. Exception is thrown if
request interception is not enabled.

An example of fulfilling all requests with 404 responses:

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

> **NOTE** Mocking responses for dataURL requests is not supported.
> Calling `request.respond` for a dataURL request is a noop.

#### request.response()
- returns: <?[Response]> A matching [Response] object, or `null` if the response has not been received yet.

#### request.url()
- returns: <[string]> URL of the request.
