- [class: BrowserFetcher](#class-browserfetcher)
  * [browserFetcher.canDownload(revision)](#browserfetchercandownloadrevision)
  * [browserFetcher.download(revision[, progressCallback])](#browserfetcherdownloadrevision-progresscallback)
  * [browserFetcher.localRevisions()](#browserfetcherlocalrevisions)
  * [browserFetcher.platform()](#browserfetcherplatform)
  * [browserFetcher.remove(revision)](#browserfetcherremoverevision)
  * [browserFetcher.revisionInfo(revision)](#browserfetcherrevisioninforevision)

### class: BrowserFetcher

BrowserFetcher can download and manage different versions of Chromium.
BrowserFetcher 用来下载和管理 Chromium 的不同版本.

BrowserFetcher operates on revision strings that specify a precise version of Chromium, e.g. `"533271"`. Revision strings can be obtained from [omahaproxy.appspot.com](http://omahaproxy.appspot.com/).

BrowserFetcher 接受一个修订字符串, 修订字符串指定一个 Chromium 的确切版本, 例如 `"533271"`. 修订字符串可以从 [omahaproxy.appspot.com](http://omahaproxy.appspot.com/) 获取 

例子, 如何使用 BrowserFetcher 下载一个指定版本的 Chromium 并且 Puppeteer 依赖其启动:

Example on how to use BrowserFetcher to download a specific version of Chromium and run
Puppeteer against it:

```js
const browserFetcher = puppeteer.createBrowserFetcher();
const revisionInfo = await browserFetcher.download('533271');
const browser = await puppeteer.launch({executablePath: revisionInfo.executablePath})
```

> **NOTE** BrowserFetcher is not designed to work concurrently with other
> instances of BrowserFetcher that share the same downloads directory.

> **注意** BrowserFetcher 不适用于与共享下载目录的其他实例同时运行.

#### browserFetcher.canDownload(revision)
- `revision` <[string]> a revision to check availability.
- returns: <[Promise]<[boolean]>>  returns `true` if the revision could be downloaded from the host.

- `revision` <[string]> 修订版本, 检查其可用性
- returns <[Promise]<[boolean]>> return `true` 如果该修订版本可以从主机被下载

The method initiates a HEAD request to check if the revision is available.
该方法发起一个 HEAD 请求来检查该修订版本是否有效.

#### browserFetcher.download(revision[, progressCallback])
- `revision` <[string]> a revision to download.
- `progressCallback` <[function]([number], [number])> A function that will be called with two arguments:
  - `downloadedBytes` <[number]> how many bytes have been downloaded
  - `totalBytes` <[number]> how large is the total download.
- returns: <[Promise]<[Object]>> Resolves with revision information when the revision is downloaded and extracted
  - `revision` <[string]> the revision the info was created from
  - `folderPath` <[string]> path to the extracted revision folder
  - `executablePath` <[string]> path to the revision executable
  - `url` <[string]> URL this revision can be downloaded from
  - `local` <[boolean]> whether the revision is locally available on disk
 
- `revision` <[string]> 下载的修订版本
 - `progressCallback` <[function]([number], [number])> 一个函数, 调用时将会传入两个参数:
 - `downloadedBytes` <[number]> 多少字节已经被下载
 - `totalBytes` <number> 下载全部的字节数(译者注: 也就是需要下载的文件大小)
- return: <[Promise<Object>]> 当该修订版本已经下载完成并解压完成, resolve 该 Promise并传入该修订版本信息
 - `revision` <[string]> 

The method initiates a GET request to download the revision from the host.
该方法发起一个 GET 请求来从主机下载该修订版本.

#### browserFetcher.localRevisions()
- returns: <[Promise]<[Array]<[string]>>> A list of all revisions available locally on disk.

#### browserFetcher.platform()
- returns: <[string]> Returns one of `mac`, `linux`, `win32` or `win64`.

#### browserFetcher.remove(revision)
- `revision` <[string]> a revision to remove. The method will throw if the revision has not been downloaded.
- returns: <[Promise]> Resolves when the revision has been removed.

#### browserFetcher.revisionInfo(revision)
- `revision` <[string]> a revision to get info for.
- returns: <[Object]>
  - `revision` <[string]> the revision the info was created from
  - `folderPath` <[string]> path to the extracted revision folder
  - `executablePath` <[string]> path to the revision executable
  - `url` <[string]> URL this revision can be downloaded from
  - `local` <[boolean]> whether the revision is locally available on disk
