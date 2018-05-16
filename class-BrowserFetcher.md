- [class: BrowserFetcher](#class-browserfetcher)
  * [browserFetcher.canDownload(revision)](#browserfetchercandownloadrevision)
  * [browserFetcher.download(revision[, progressCallback])](#browserfetcherdownloadrevision-progresscallback)
  * [browserFetcher.localRevisions()](#browserfetcherlocalrevisions)
  * [browserFetcher.platform()](#browserfetcherplatform)
  * [browserFetcher.remove(revision)](#browserfetcherremoverevision)
  * [browserFetcher.revisionInfo(revision)](#browserfetcherrevisioninforevision)

### class: BrowserFetcher

BrowserFetcher can download and manage different versions of Chromium.

BrowserFetcher operates on revision strings that specify a precise version of Chromium, e.g. `"533271"`. Revision strings can be obtained from [omahaproxy.appspot.com](http://omahaproxy.appspot.com/).

Example on how to use BrowserFetcher to download a specific version of Chromium and run
Puppeteer against it:

```js
const browserFetcher = puppeteer.createBrowserFetcher();
const revisionInfo = await browserFetcher.download('533271');
const browser = await puppeteer.launch({executablePath: revisionInfo.executablePath})
```

> **NOTE** BrowserFetcher is not designed to work concurrently with other
> instances of BrowserFetcher that share the same downloads directory.

#### browserFetcher.canDownload(revision)
- `revision` <[string]> a revision to check availability.
- returns: <[Promise]<[boolean]>>  returns `true` if the revision could be downloaded from the host.

The method initiates a HEAD request to check if the revision is available.

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

The method initiates a GET request to download the revision from the host.

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
