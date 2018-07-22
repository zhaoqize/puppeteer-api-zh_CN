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
- returns: <?[Frame]> 一个相应的 [Frame] 对象，如果导航到错误页面的话，则是'null'

#### request.headers()
- returns: <[Object]> 该请求的 http 头对象. 所有头都采用小写的命名方式

#### request.isNavigationRequest()
- returns: <[boolean]>

这个请求是否正在驱动框架的导航。

#### request.method()
- returns: <[string]> 请求方法 ( GET，POST，等。)

#### request.postData()
- returns: <[string]> 请求提交的数据，如果有的话.

#### request.redirectChain()
- returns: <[Array]<[Request]>>

`redirectChain` 是一条获取资源的请求链

- 如果没有被重定向而且请求成功的话, 链将会被置空
- 如果服务器至少响应了一次重定向, 那么这条链将会包含所有重定向请求

`redirectChain` 会共享相同链上的所有请求。


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
