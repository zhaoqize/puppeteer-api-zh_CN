[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/v1.7.0/docs/api.md#class-keyboard)

#### class: Keyboard

Keyboard 提供一个接口来管理虚拟键盘. 高级接口为 [`keyboard.type`](#keyboardtypetext-options), 其接收原始字符, 然后在你的页面上生成对应的 keydown, keypress/input, 和  keyup 事件.

为了更精细的控制(虚拟键盘), 你可以使用 [`keyboard.down`](#keyboarddownkey-options), [`keyboard.up`](#keyboardupkey) 和 [`keyboard.sendCharacter`](#keyboardsendcharacterchar) 来手动触发事件, 就好像这些事件是由真实的键盘生成的.

持续按下 `Shift` 来选择一些字符串并且删除的例子:
```js
await page.keyboard.type('Hello World!');
await page.keyboard.press('ArrowLeft');

await page.keyboard.down('Shift');
for (let i = 0; i < ' World'.length; i++)
  await page.keyboard.press('ArrowLeft');
await page.keyboard.up('Shift');

await page.keyboard.press('Backspace');
// 结果字符串最终为 'Hello!'
```

按下 `A` 的例子:
```js
await page.keyboard.down('Shift');
await page.keyboard.press('KeyA');
await page.keyboard.up('Shift');
```

> **注意** 在 MacOS 上, `⌘ A` -> 选择全部等键盘快捷键不工作. 另见 [#1313](https://github.com/GoogleChrome/puppeteer/issues/1313)

#### keyboard.down(key[, options])
- `key` <[string]> 按下的键名, 比如 `ArrowLeft`. 一个包含所有键名的列表见 [USKeyboardLayout].
- `options` <[Object]>
  - `text` <[string]> 如果指定，则使用此文本生成输入事件.
- returns: <[Promise]>

会分发一个 `keydown` 事件。

如果 `key` 是一个单独字符并且没有除了 `Shift` 的其他修饰符键正在被按下, 一个 `keypress`/`input` 事件也将被生成. 可以指定 `text` 选项来强制生成输入事件。

如果 `key` 是一个修饰键, `Shift`, `Meta`, `Control`, 或者是 `Alt`, 随后的按键将与该修饰符一起发送. 要释放修饰键, 请使用 [`keyboard.up`](#keyboardupkey)。

在键被按下一次之后(译者注: 按下之后没有被释放, 一般会持续的触发该按键), 随后将持续调用 [`keyboard.down`](#keyboarddownkey-options), 事件对象的 [repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat) 将被设置为 true. 要释放该键, 请使用 [`keyboard.up`](#keyboardupkey).

> **注意** 修饰键会影响 `keyboard.down`, 持续按下 `Shift` 键将以大写形式输入文本。

#### keyboard.press(key[, options])
- `key` <[string]> 按下的键名, 比如 `ArrowLeft`. 一个包含所有键名的列表见 [USKeyboardLayout]。
- `options` <[Object]>
  - `text` <[string]> 如果指定，则使用此文本生成输入事件。
  - `delay` <[number]> 在 `keydown` 和 `keyup` 间隔的时间, 以毫秒为单位. 默认为 0。
- returns: <[Promise]>

如果 `key` 是一个单独字符并且没有除了 `Shift` 的其他修饰符键正在被按下, 一个 `keypress`/`input` 事件也将被生成。可以指定 `text` 选项来强制生成输入事件。

> **注意** 修饰键会影响 `keyboard.press`, 持续按下 `Shift` 键将已大写形式输入文本。

[`keyboard.down`](#keyboarddownkey-options) 和 [`keyboard.up`](#keyboardupkey) 的快捷方式。

#### keyboard.sendCharacter(char)
- `char` <[string]> 发送到页面的字符。
- returns: <[Promise]>

分发一个 `keypress` 和 `input` 事件。该方法不会发送 `keydown` 或 `keyup` 事件。

```js
page.keyboard.sendCharacter('嗨');
```

> **注意** 修饰键不会影响 `keyboard.sendCharacter`。持续按下 `Shift` 键将不会已大写形式输入文本。

#### keyboard.type(text, options)
- `text` <[string]> 要输入到焦点元素中的文本。
- `options` <[Object]>
  - `delay` <[number]> 按键间隔的时间, 以毫秒为单位. 默认为 0。
- returns: <[Promise]>

为文本中的每个字符发送一个`keydown`, `keypress`/`input` 和 `keyup` 事件。

要按下一个特别的键, 像 `Control` 或 `ArrowDown`. 请使用[`keyboard.press`](#keyboardpresskey-options)

```js
page.keyboard.type('Hello'); // 立即输入
page.keyboard.type('World', {delay: 100}); // 更缓慢的输入, 像一个用户
```

> **注意** 修饰键不会影响 `keyboard.type`。持续按下 `Shift` 键将不会已大写形式输入文本。

#### keyboard.up(key)
- `key` <[string]> 要释放的键的键名, 例如 `ArrowLeft`。一个包含所有键名的列表见 [USKeyboardLayout]。
- returns: <[Promise]>

分发一个 `keyup` 事件。
