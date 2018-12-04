# Puppeteer

<!-- [START badges] -->
[![Linux Build Status](https://img.shields.io/travis/GoogleChrome/puppeteer/master.svg)](https://travis-ci.org/GoogleChrome/puppeteer) [![Windows Build Status](https://img.shields.io/appveyor/ci/aslushnikov/puppeteer/master.svg?logo=appveyor)](https://ci.appveyor.com/project/aslushnikov/puppeteer/branch/master) [![Build Status](https://api.cirrus-ci.com/github/GoogleChrome/puppeteer.svg)](https://cirrus-ci.com/github/GoogleChrome/puppeteer) [![NPM puppeteer package](https://img.shields.io/npm/v/puppeteer.svg)](https://npmjs.org/package/puppeteer)
<!-- [END badges] -->

<img src="https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png" height="200" align="right">

###### [API](https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md) | [FAQ](#faq) | [Contributing](https://github.com/GoogleChrome/puppeteer/blob/master/CONTRIBUTING.md) | [Troubleshooting](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md)

> Puppeteer 是一个 Node 库，它提供了一个高级 API 来通过 [DevTools]((https://chromedevtools.github.io/devtools-protocol/)) 协议控制 Chromium 或 Chrome。Puppeteer 默认以 [headless](https://developers.google.com/web/updates/2017/04/headless-chrome) 模式运行，但是可以通过修改配置文件运行“有头”模式。

<!-- [START usecases] -->
###### 能做什么?

你可以在浏览器中手动执行的绝大多数操作都可以使用 Puppeteer 来完成！ 下面是一些示例：

* 生成页面 PDF。
* 抓取 SPA（单页应用）并生成预渲染内容（即“SSR”（服务器端渲染））。
* 自动提交表单，进行 UI 测试，键盘输入等。
* 创建一个时时更新的自动化测试环境。 使用最新的 JavaScript 和浏览器功能直接在最新版本的Chrome中执行测试。
* 捕获网站的 [timeline trace](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)，用来帮助分析性能问题。
* 测试浏览器扩展。
<!-- [END usecases] -->

演示地址: https://try-puppeteer.appspot.com/

<!-- [START getstarted] -->
## 开始使用

### 安装

在项目中使用 Puppeteer：

```bash
npm i puppeteer
# or "yarn add puppeteer"
```

Note: 当你安装 Puppeteer 时，它会下载最新版本的Chromium（~170MB Mac，~282MB Linux，~280MB Win），以保证可以使用 API。 如果想要跳过下载，请阅读[环境变量](https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md#environment-variables)。


### puppeteer-core

自 1.7.0 版本以来，我们都会发布一个 [`puppeteer-core`](https://www.npmjs.com/package/puppeteer-core) 包，这个包默认不会下载 Chromium。

```bash
npm i puppeteer-core
# or "yarn add puppeteer-core"
```

`puppeteer-core` 是一个的轻量级的 Puppeteer 版本，用于启动现有浏览器安装或连接到远程安装。

具体见 [puppeteer vs puppeteer-core](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteer-vs-puppeteer-core).

### 使用

Note: Puppeteer 至少需要 Node v6.4.0，下面的示例使用 async / await，它们仅在 Node v7.6.0 或更高版本中被支持。

Puppeteer 使用起来和其他测试框架类似。你需要创建一个 `Browser` 实例，打开页面，然后使用 [Puppeteer 的 API](https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md#)。

**Example** - 跳转到 https://example.com 并保存截图至 *example.png*:

文件为 **example.js**

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
```

在命令行中执行

```bash
node example.js
```

Puppeteer 初始化的屏幕大小默认为 800px x 600px。但是这个尺寸可以通过 [`Page.setViewport()`](https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md#pagesetviewportviewport) 设置。

**Example** - 创建一个 PDF。

文件为 **hn.js**

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
  await page.pdf({path: 'hn.pdf', format: 'A4'});

  await browser.close();
})();
```

在命令行中执行

```bash
node hn.js
```

查看 [`Page.pdf()`](https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md#pagepdfoptions) 了解跟多内容。

**Example** - 在页面中执行脚本

文件为 **get-dimensions.js**

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  console.log('Dimensions:', dimensions);

  await browser.close();
})();
```

在命令行中执行

```bash
node get-dimensions.js
```

查看 [`Page.evaluate()`](https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md#pageevaluatepagefunction-args) 了解更多相关内容，该方法有点类似于 `evaluateOnNewDocument` and `exposeFunction`。

<!-- [END getstarted] -->

<!-- [START runtimesettings] -->
## 默认设置

**1. 使用无头模式**

Puppeteer 运行 Chromium 的[headless mode](https://developers.google.com/web/updates/2017/04/headless-chrome)。如果想要使用完全版本的 Chromium，设置 ['headless' option](https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md#puppeteerlaunchoptions) 即可。

```js
const browser = await puppeteer.launch({headless: false}); // default is true
```

**2. 运行绑定的 Chromium 版本**

默认情况下，Puppeteer 下载并使用特定版本的 Chromium 以及其 API 保证开箱即用。 如果要将 Puppeteer 与不同版本的 Chrome 或 Chromium 一起使用，在创建`Browser`实例时传入 Chromium 可执行文件的路径即可：

```js
const browser = await puppeteer.launch({executablePath: '/path/to/Chrome'});
```

具体见：[`Puppeteer.launch()`](https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md#puppeteerlaunchoptions)

看[`这篇文章`](https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/)了解 Chromium 与 Chrome 的不同。[`这篇文章`](https://chromium.googlesource.com/chromium/src/+/master/docs/chromium_browser_vs_google_chrome.md) 介绍了一些 Linux 用户在使用上的区别。

**3. 创建用户配置文件**

Puppeteer 会创建自己的 Chromium 用户配置文件，**它会在每次运行时清理**。

<!-- [END runtimesettings] -->

## 资源

- [API Documentation](https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md)
- [Examples](https://github.com/GoogleChrome/puppeteer/tree/master/examples/)
- [Community list of Puppeteer resources](https://github.com/transitive-bullshit/awesome-puppeteer)


<!-- [START debugging] -->

## Debugging tips

1. Turn off headless mode - sometimes it's useful to see what the browser is
   displaying. Instead of launching in headless mode, launch a full version of
   the browser using  `headless: false`:

        const browser = await puppeteer.launch({headless: false});

2. Slow it down - the `slowMo` option slows down Puppeteer operations by the
   specified amount of milliseconds. It's another way to help see what's going on.

        const browser = await puppeteer.launch({
          headless: false,
          slowMo: 250 // slow down by 250ms
        });

3. Capture console output - You can listen for the `console` event.
   This is also handy when debugging code in `page.evaluate()`:

        page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        await page.evaluate(() => console.log(`url is ${location.href}`));

4. Stop test execution and use a debugger in browser

  - Use `{devtools: true}` when launching Puppeteer:

      `const browser = await puppeteer.launch({devtools: true});`

  - Change default test timeout:

      jest: `jest.setTimeout(100000);`

      jasmine: `jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;`

      mocha: `this.timeout(100000);` (don't forget to change test to use [function and not '=>'](https://stackoverflow.com/a/23492442))

  - Add an evaluate statement with `debugger` inside / add  `debugger` to an existing evaluate statement:

    `await page.evaluate(() => {debugger;});`

     The test will now stop executing in the above evaluate statement, and chromium will stop in debug mode.

5. Enable verbose logging - internal DevTools protocol traffic
   will be logged via the [`debug`](https://github.com/visionmedia/debug) module under the `puppeteer` namespace.

        # Basic verbose logging
        env DEBUG="puppeteer:*" node script.js

        # Debug output can be enabled/disabled by namespace
        env DEBUG="puppeteer:protocol" node script.js # protocol connection messages
        env DEBUG="puppeteer:session" node script.js # protocol session messages (protocol messages to targets)

        # Protocol traffic can be rather noisy. This example filters out all Network domain messages
        env DEBUG="puppeteer:session" env DEBUG_COLORS=true node script.js 2>&1 | grep -v '"Network'

6. Debug your Puppeteer (node) code easily, using [ndb](https://github.com/GoogleChromeLabs/ndb)

  - `npm install -g ndb` (or even better, use [npx](https://github.com/zkat/npx)!)

  - add a `debugger` to your Puppeteer (node) code

  - add `ndb` (or `npx ndb`) before your test command. For example:

    `ndb jest` or `ndb mocha` (or `npx ndb jest` / `npx ndb mocha`)

  - debug your test inside chromium like a boss!


<!-- [END debugging] -->

## 贡献指南

Check out [contributing guide](https://github.com/GoogleChrome/puppeteer/blob/master/CONTRIBUTING.md) to get an overview of Puppeteer development.

<!-- [START faq] -->

# FAQ

#### Q: Who maintains Puppeteer?

The Chrome DevTools team maintains the library, but we'd love your help and expertise on the project!
See [Contributing](https://github.com/GoogleChrome/puppeteer/blob/master/CONTRIBUTING.md).

#### Q: What are Puppeteer’s goals and principles?

The goals of the project are:

- Provide a slim, canonical library that highlights the capabilities of the [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/).
- Provide a reference implementation for similar testing libraries. Eventually, these other frameworks could adopt Puppeteer as their foundational layer.
- Grow the adoption of headless/automated browser testing.
- Help dogfood new DevTools Protocol features...and catch bugs!
- Learn more about the pain points of automated browser testing and help fill those gaps.

We adapt [Chromium principles](https://www.chromium.org/developers/core-principles) to help us drive product decisions:
- **Speed**: Puppeteer has almost zero performance overhead over an automated page.
- **Security**: Puppeteer operates off-process with respect to Chromium, making it safe to automate potentially malicious pages.
- **Stability**: Puppeteer should not be flaky and should not leak memory.
- **Simplicity**: Puppeteer provides a high-level API that’s easy to use, understand, and debug.

#### Q: Is Puppeteer replacing Selenium/WebDriver?

**No**. Both projects are valuable for very different reasons:
- Selenium/WebDriver focuses on cross-browser automation; its value proposition is a single standard API that works across all major browsers.
- Puppeteer focuses on Chromium; its value proposition is richer functionality and higher reliability.

That said, you **can** use Puppeteer to run tests against Chromium, e.g. using the community-driven [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer). While this probably shouldn’t be your only testing solution, it does have a few good points compared to WebDriver:

- Puppeteer requires zero setup and comes bundled with the Chromium version it works best with, making it [very easy to start with](https://github.com/GoogleChrome/puppeteer/#getting-started). At the end of the day, it’s better to have a few tests running chromium-only, than no tests at all.
- Puppeteer has event-driven architecture, which removes a lot of potential flakiness. There’s no need for evil “sleep(1000)” calls in puppeteer scripts.
- Puppeteer runs headless by default, which makes it fast to run. Puppeteer v1.5.0 also exposes browser contexts, making it possible to efficiently parallelize test execution.
- Puppeteer shines when it comes to debugging: flip the “headless” bit to false, add “slowMo”, and you’ll see what the browser is doing. You can even open Chrome DevTools to inspect the test environment.

#### Q: Why doesn’t Puppeteer v.XXX work with Chromium v.YYY?

We see Puppeteer as an **indivisible entity** with Chromium. Each version of Puppeteer bundles a specific version of Chromium – **the only** version it is guaranteed to work with.

This is not an artificial constraint: A lot of work on Puppeteer is actually taking place in the Chromium repository. Here’s a typical story:
- A Puppeteer bug is reported: https://github.com/GoogleChrome/puppeteer/issues/2709
- It turned out this is an issue with the DevTools protocol, so we’re fixing it in Chromium: https://chromium-review.googlesource.com/c/chromium/src/+/1102154
- Once the upstream fix is landed, we roll updated Chromium into Puppeteer: https://github.com/GoogleChrome/puppeteer/pull/2769

However, oftentimes it is desirable to use Puppeteer with the official Google Chrome rather than Chromium. For this to work, you should pick the version of Puppeteer that uses the Chromium version close enough to Chrome.

#### Q: Which Chromium version does Puppeteer use?

Look for `chromium_revision` in [package.json](https://github.com/GoogleChrome/puppeteer/blob/master/package.json).

#### Q: What’s considered a “Navigation”?

From Puppeteer’s standpoint, **“navigation” is anything that changes a page’s URL**.
Aside from regular navigation where the browser hits the network to fetch a new document from the web server, this includes [anchor navigations](https://www.w3.org/TR/html5/single-page.html#scroll-to-fragid) and [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) usage.

With this definition of “navigation,” **Puppeteer works seamlessly with single-page applications.**

#### Q: What’s the difference between a “trusted" and "untrusted" input event?

In browsers, input events could be divided into two big groups: trusted vs. untrusted.

- **Trusted events**: events generated by users interacting with the page, e.g. using a mouse or keyboard.
- **Untrusted event**: events generated by Web APIs, e.g. `document.createEvent` or `element.click()` methods.

Websites can distinguish between these two groups:
- using an [`Event.isTrusted`](https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted) event flag
- sniffing for accompanying events. For example, every trusted `'click'` event is preceded by `'mousedown'` and `'mouseup'` events.

For automation purposes it’s important to generate trusted events. **All input events generated with Puppeteer are trusted and fire proper accompanying events.** If, for some reason, one needs an untrusted event, it’s always possible to hop into a page context with `page.evaluate` and generate a fake event:

```js
await page.evaluate(() => {
  document.querySelector('button[type=submit]').click();
});
```

#### Q: What features does Puppeteer not support?

You may find that Puppeteer does not behave as expected when controlling pages that incorporate audio and video. (For example, [video playback/screenshots is likely to fail](https://github.com/GoogleChrome/puppeteer/issues/291).) There are two reasons for this:

* Puppeteer is bundled with Chromium--not Chrome--and so by default, it inherits all of [Chromium's media-related limitations](https://www.chromium.org/audio-video). This means that Puppeteer does not support licensed formats such as AAC or H.264. (However, it is possible to force Puppeteer to use a separately-installed version Chrome instead of Chromium via the [`executablePath` option to `puppeteer.launch`](https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md#puppeteerlaunchoptions). You should only use this configuration if you need an official release of Chrome that supports these media formats.)
* Since Puppeteer (in all configurations) controls a desktop version of Chromium/Chrome, features that are only supported by the mobile version of Chrome are not supported. This means that Puppeteer [does not support HTTP Live Streaming (HLS)](https://caniuse.com/#feat=http-live-streaming).

#### Q: I am having trouble installing / running Puppeteer in my test environment?
We have a [troubleshooting](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md) guide for various operating systems that lists the required dependencies.

#### Q: How do I try/test a prerelease version of Puppeteer?

You can check out this repo or install the latest prerelease from npm:

```bash
npm i --save puppeteer@next
```

Please note that prerelease may be unstable and contain bugs.

#### Q: I have more questions! Where do I ask?

There are many ways to get help on Puppeteer:
- [bugtracker](https://github.com/GoogleChrome/puppeteer/issues)
- [stackoverflow](https://stackoverflow.com/questions/tagged/puppeteer)
- [slack channel](https://join.slack.com/t/puppeteer/shared_invite/enQtMzU4MjIyMDA5NTM4LTM1OTdkNDhlM2Y4ZGUzZDdjYjM5ZWZlZGFiZjc4MTkyYTVlYzIzYjU5NDIyNzgyMmFiNDFjN2UzNWU0N2ZhZDc)

Make sure to search these channels before posting your question.


<!-- [END faq] -->
