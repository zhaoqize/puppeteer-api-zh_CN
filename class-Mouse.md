- [class: Mouse](#class-mouse)
  * [mouse.click(x, y, [options])](#mouseclickx-y-options)
  * [mouse.down([options])](#mousedownoptions)
  * [mouse.move(x, y, [options])](#mousemovex-y-options)
  * [mouse.up([options])](#mouseupoptions)

### class: Mouse

#### mouse.click(x, y, [options])
- `x` <[number]>
- `y` <[number]>
- `options` <[Object]>
  - `button` <[string]> `left`, `right`, 或 `middle`, 默认是 `left`.
  - `clickCount` <[number]> 默认是 1. 见 [UIEvent.detail].
  - `delay` <[number]> 在毫秒内且在 `mousedown` 和 `mouseup` 之间等待的时间。 默认为0。
- returns: <[Promise]>

[`mouse.move`](#mousemovex-y-options), [`mouse.down`](#mousedownoptions) 和 [`mouse.up`](#mouseupoptions) 的快捷方式。

#### mouse.down([options])
- `options` <[Object]>
  - `button` <[string]> `left`, `right`, 或 `middle`, 默认是 `left`.
  - `clickCount` <[number]> 默认是 1. 见 [UIEvent.detail].
- returns: <[Promise]>

触发一个 `mousedown` 事件。

#### mouse.move(x, y, [options])
- `x` <[number]>
- `y` <[number]>
- `options` <[Object]>
  - `steps` <[number]> 默认是 1. 中间触发 `mousemove` 事件。
- returns: <[Promise]>

触发一个 `mousemove` 事件。

#### mouse.up([options])
- `options` <[Object]>
  - `button` <[string]> `left`, `right`, 或 `middle`, 默认是 `left`.
  - `clickCount` <[number]> 默认是 1. 见 [UIEvent.detail].
- returns: <[Promise]>

触发一个 `mouseup` 事件。

