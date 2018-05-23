- [class: Coverage](#class-coverage)
  * [coverage.startCSSCoverage(options)](#coveragestartcsscoverageoptions)
  * [coverage.startJSCoverage(options)](#coveragestartjscoverageoptions)
  * [coverage.stopCSSCoverage()](#coveragestopcsscoverage)
  * [coverage.stopJSCoverage()](#coveragestopjscoverage)

### class: Coverage

Coverage 收集相关页面使用的 JavaScript 和 CSS 部分的信息。

使用 JavaScript 和 CSS 覆盖率来获取初始百分比的例子
执行代码：

```js
// 启用 JavaScript 和 CSS 覆盖
await Promise.all([
  page.coverage.startJSCoverage(),
  page.coverage.startCSSCoverage()
]);
// 导航至页面
await page.goto('https://example.com');
// 禁用 JavaScript 和 CSS 覆盖
const [jsCoverage, cssCoverage] = await Promise.all([
  page.coverage.stopJSCoverage(),
  page.coverage.stopCSSCoverage(),
]);
let totalBytes = 0;
let usedBytes = 0;
const coverage = [...jsCoverage, ...cssCoverage];
for (const entry of coverage) {
  totalBytes += entry.text.length;
  for (const range of entry.ranges)
    usedBytes += range.end - range.start - 1;
}
console.log(`Bytes used: ${usedBytes / totalBytes * 100}%`);
```

_使用 [Istanbul](https://github.com/istanbuljs) 输出一个覆盖率表格，见
[puppeteer-to-istanbul](https://github.com/istanbuljs/puppeteer-to-istanbul)._

#### coverage.startCSSCoverage(options)
- `options` <[Object]>  覆盖范围的配置项
  - `resetOnNavigation` <[boolean]> 是否重置每个导航的覆盖范围。默认是 `true`。
- returns: <[Promise]> （意译：当覆盖开始的时候返回一个 Promise）

#### coverage.startJSCoverage(options)
- `options` <[Object]> 覆盖范围的配置项
  - `resetOnNavigation` <[boolean]> 是否重置每个导航的覆盖范围。默认是 `true`。
- returns: <[Promise]> （意译：当覆盖开始的时候返回一个 Promise）

#### coverage.stopCSSCoverage()
- returns: <[Promise]<[Array]<[Object]>>> （意译：所有样式表的覆盖率报告）
  - `url` <[string]> 样式表 URL
  - `text` <[string]> 样式表内容
  - `ranges` <[Array]<[Object]>> 所使用的StyleSheet范围。 范围已排序且不重叠。
    - `start` <[number]> 包含文字的起始偏移量
    - `end` <[number]> 文本中的结尾偏移，独占

> **注意** CSS Coverage 不包含没有 sourceURL 的动态注入式样式标签。

#### coverage.stopJSCoverage()
- returns: <[Promise]<[Array]<[Object]>>> （意译：返回所有非匿名脚本的覆盖报告数组）
  - `url` <[string]> 脚本 URL
  - `text` <[string]> 脚本内容
  - `ranges` <[Array]<[Object]>> 已执行的脚本范围。 范围已排序且不重叠。
    - `start` <[number]> 包含文字的起始偏移量
    - `end` <[number]> 文本中的结尾偏移，独占

> **注意** JavaScript Coverage 不包含匿名脚本。 但是，具有 sourceURL 的脚本将被上报。
