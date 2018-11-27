[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-mouse)

#### class: Mouse

Mouse 类在相对于视口左上角的主框架 CSS 像素中运行。

每个 `page` 对象都有它自己的 Mouse 对象，使用见 [`page.mouse`](#pagemouse)。

```js
// 使用 ‘page.mouse’ 追踪 100x100 的矩形。
await page.mouse.move(0, 0);
await page.mouse.down();
await page.mouse.move(0, 100);
await page.mouse.move(100, 100);
await page.mouse.move(100, 0);
await page.mouse.move(0, 0);
await page.mouse.up();
```

#### mouse.click(x, y, [options])
- `x` <[number]>
- `y` <[number]>
- `options` <[Object]>
  - `button` <[string]> `left` ，`right` 或 `middle`，默认是 `left`。
  - `clickCount` <[number]> 默认是 1。见 [UIEvent.detail]。
  - `delay` <[number]> 在毫秒内且在 `mousedown` 和 `mouseup` 之间等待的时间。 默认为0。
- returns: <[Promise]>

[`mouse.move`](#mousemovex-y-options)，[`mouse.down`](#mousedownoptions) 和 [`mouse.up`](#mouseupoptions) 的快捷方式。

#### mouse.down([options])
- `options` <[Object]>
  - `button` <[string]> `left`，`right` 或 `middle`，默认是 `left`。
  - `clickCount` <[number]> 默认是 1。见 [UIEvent.detail]。
- returns: <[Promise]>

触发一个 `mousedown` 事件。

#### mouse.move(x, y, [options])
- `x` <[number]>
- `y` <[number]>
- `options` <[Object]>
  - `steps` <[number]> 默认是 1。中间触发 `mousemove` 事件。
- returns: <[Promise]>

触发一个 `mousemove` 事件。

#### mouse.up([options])
- `options` <[Object]>
  - `button` <[string]> `left`，`right`，或 `middle`，默认是 `left`。
  - `clickCount` <[number]> 默认是 1。见 [UIEvent.detail]。
- returns: <[Promise]>

触发一个 `mouseup` 事件。

