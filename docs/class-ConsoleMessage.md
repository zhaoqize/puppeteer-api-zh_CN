[📚 查看原文](//github.com/GoogleChrome/puppeteer/blob/v1.7.0/docs/api.md#class-consolemessage)

#### class: ConsoleMessage

[ConsoleMessage] 对象由页面通过 ['console'](#event-console) 事件分发。

#### consoleMessage.args()
- returns: <[Array]<[JSHandle]>>

#### consoleMessage.text()
- returns: <[string]>

#### consoleMessage.type()
- returns: <[string]>

以下值之一：`'log'` ， `'debug'` ， `'info'` ， `'error'` ， `'warning'` ， `'dir'` ， `'dirxml'` ， `'table'` ， `'trace'` ， `'clear'` ， `'startGroup'` ， `'startGroupCollapsed'` ， `'endGroup'` ， `'assert'` ， `'profile'` ， `'profileEnd'` ， `'count'` ， `'timeEnd'`。
