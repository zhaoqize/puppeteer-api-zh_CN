import {} from './ui/polyfills.js';
import {App} from './ui/App.js';
import {PPTRProduct} from './pptr/PPTRProduct.js';

window.addEventListener('DOMContentLoaded', async () => {
  window.app = new App(document.body);
  const loadPromise = new Promise(x => window.addEventListener('load', x));
  const product = await PPTRProduct.create(App.urlVersionName());
  // await 'load' event: app navigation is based on 'popstate' event which doesn't fire
  // until 'load' is fired.
  await loadPromise;
  app.initialize(product);
});

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator)
    navigator.serviceWorker.register('./sw.js');
});
