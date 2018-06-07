- [class: BrowserFetcher](#class-browserfetcher)
  * [browserFetcher.canDownload(revision)](#browserfetchercandownloadrevision)
  * [browserFetcher.download(revision[, progressCallback])](#browserfetcherdownloadrevision-progresscallback)
  * [browserFetcher.localRevisions()](#browserfetcherlocalrevisions)
  * [browserFetcher.platform()](#browserfetcherplatform)
  * [browserFetcher.remove(revision)](#browserfetcherremoverevision)
  * [browserFetcher.revisionInfo(revision)](#browserfetcherrevisioninforevision)

### class: BrowserFetcher

BrowserFetcher 用来下载和管理 Chromium 的不同版本.

BrowserFetcher 操作一个修订版本字符串，修订版本字符串指定一个 Chromium 的确切版本，例如 `"533271"`。修订版本字符串可以从 [omahaproxy.appspot.com](http://omahaproxy.appspot.com/) 获取。

如何使用 BrowserFetcher 下载一个指定版本的 Chromium 并且 Puppeteer 使用其运行的例子：

```js
const browserFetcher = puppeteer.createBrowserFetcher();
const revisionInfo = await browserFetcher.download('533271');
const browser = await puppeteer.launch({executablePath: revisionInfo.executablePath})
```

> **注意** BrowserFetcher 不适用于与共享下载目录的其他实例同时运行.

#### browserFetcher.canDownload(revision)
- `revision` <[string]> 修订版本号, 检查其可用性
- returns: <[Promise]<[boolean]>> 返回 `true` 如果该修订版本可以从主机下载

该方法发起一个 HEAD 请求来检查该修订版本是否有效。

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

该方法发起一个 GET 请求来从主机下载该修订版本.

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
  
