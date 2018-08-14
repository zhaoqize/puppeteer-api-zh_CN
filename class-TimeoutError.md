### class: TimeoutError

* extends: [Error]

每当某些操作因超时而终止时，就会触发 TimeoutError。例如 [page.waitForSelector(selector[, options])](#pagewaitforselectorselector-options) 或者 [puppeteer.launch([options])](#puppeteerlaunchoptions)。