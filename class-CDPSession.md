- [class: CDPSession](#class-cdpsession)
  * [cdpSession.detach()](#cdpsessiondetach)
  * [cdpSession.send(method[, params])](#cdpsessionsendmethod-params)

### class: CDPSession

* 继承自: [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)

`CDPSession` 实例用于与 Chrome Devtools 协议的原生沟通：
- 协议方法可以用 `session.send` 方法调用。
- 协议事件可以通过 `session.on` 方法订阅。

DevTools Protocol 的文档具体见这里: [DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).

```js
const client = await page.target().createCDPSession();
await client.send('Animation.enable');
client.on('Animation.animationCreated', () => console.log('Animation created!'));
const response = await client.send('Animation.getPlaybackRate');
console.log('playback rate is ' + response.playbackRate);
await client.send('Animation.setPlaybackRate', {
  playbackRate: response.playbackRate / 2
});
```

#### cdpSession.detach()
- returns: <[Promise]>

从目标中分离 cdpSession。 一旦分离，cdpSession 对象将不会触发任何事件并且不能用于发送消息。

#### cdpSession.send(method[, params])
- `method` <[string]> protocol method name
- `params` <[Object]> Optional method parameters
- returns: <[Promise]<[Object]>>
