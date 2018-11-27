[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#working-with-chrome-extensions)

** 使用 Chrome 扩展程序 **

Puppeteer 可以用来测试 Chrome 扩展

> **注意** Chrome / Chromium 扩展当前只能在非无头模式下使用。

下面的代码用来处理扩展的 [background page](https://developer.chrome.com/extensions/background_pages)，该扩展的代码在 `./my-extension`:

```js
const puppeteer = require('puppeteer');

(async () => {
  const pathToExtension = require('path').join(__dirname, 'my-extension');
  const browser = puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  });
  const targets = await browser.targets();
  const backgroundPageTarget = targets.find(target => target.type() === 'background_page');
  const backgroundPage = await backgroundPageTarget.page();
  // 像处理任何其他页面一样测试背景页面。
  await browser.close();
})();
```

> **注意** 目前还无法测试扩展弹出窗口或内容脚本。