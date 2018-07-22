- [class: Dialog](#class-dialog)
  * [dialog.accept([promptText])](#dialogacceptprompttext)
  * [dialog.defaultValue()](#dialogdefaultvalue)
  * [dialog.dismiss()](#dialogdismiss)
  * [dialog.message()](#dialogmessage)
  * [dialog.type()](#dialogtype)

### class: Dialog

[Dialog] 对象通过 ['dialog'](#event-dialog) 事件的页面分发。

一个使用 `Dialog` 类的例子：
```js
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.dismiss();
    await browser.close();
  });
  page.evaluate(() => alert('1'));
});
```

#### dialog.accept([promptText])
- `promptText` <[string]> 提示中输入的文本。 如果对话框的`类型`不提示，不会产生任何影响。
- returns: <[Promise]> Promise which resolves when the dialog has been accepted.

#### dialog.defaultValue()
- returns: <[string]> 如果对话框出现提示，则返回默认提示值。 否则，返回空字符串。

#### dialog.dismiss()
- returns: <[Promise]> Promise which resolves when the dialog has been dismissed.

#### dialog.message()
- returns: <[string]> 显示在对话框中的信息。

#### dialog.type()
- returns: <[string]> 对话框类型，可以是 `alert` ，`beforeunload` ，`confirm` 或 `prompt` 中的一个。
