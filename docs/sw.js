/**
 * Copyright 2018 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

workbox.skipWaiting();
workbox.clientsClaim();

// Enable offline GoogleAnalytics.
workbox.googleAnalytics.initialize();

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute([
  {
    "url": "favicons/android-chrome-192x192.png",
    "revision": "05be0b0c0d82fd26e50eef9fd255f21e"
  },
  {
    "url": "favicons/android-chrome-384x384.png",
    "revision": "0b84f07f6d1a9f09b52f47dc9a744ba8"
  },
  {
    "url": "favicons/apple-touch-icon.png",
    "revision": "f993b772518d7d488b1f2f7e03908f22"
  },
  {
    "url": "favicons/browserconfig.xml",
    "revision": "a89eb8c368c15b982c5808ce906e8ac2"
  },
  {
    "url": "favicons/favicon-16x16.png",
    "revision": "9af3980ba3ffc11ccb9b01dfbe2555b6"
  },
  {
    "url": "favicons/favicon-32x32.png",
    "revision": "e2f8da1b76492c82494e071e4c9e3d64"
  },
  {
    "url": "favicons/favicon.ico",
    "revision": "ddd8a3f15f6a2a620d9011aaf2559178"
  },
  {
    "url": "favicons/mstile-150x150.png",
    "revision": "203fc1bff1934f7b478c0bd2c6713854"
  },
  {
    "url": "favicons/safari-pinned-tab.svg",
    "revision": "d4e8575115db91ea0154f94a64686b08"
  },
  {
    "url": "favicons/site.webmanifest",
    "revision": "a9c9fb6c3df71946b07c72a3ee687918"
  },
  {
    "url": "images/checkmark.svg",
    "revision": "094c946e202c6b49672d422f3c50307f"
  },
  {
    "url": "images/close.svg",
    "revision": "e22e537e8340ffc1ab24bfe61956644f"
  },
  {
    "url": "images/cog.svg",
    "revision": "767280f704baffa60642f681d490ca3b"
  },
  {
    "url": "images/github.png",
    "revision": "d56df49a807a9fd06eb1667a84d3810e"
  },
  {
    "url": "images/home.svg",
    "revision": "5a5d43fb5504cd8984e4e59f1832ee3e"
  },
  {
    "url": "images/menu.svg",
    "revision": "6aa1bfbadbdeb0e73c5c945c2dbc0019"
  },
  {
    "url": "images/pptr.png",
    "revision": "924f28bd0281fb8e45b19f1364cfaf8e"
  },
  {
    "url": "images/search.svg",
    "revision": "69536ad6f996355f6c73270a0c018ac8"
  },
  {
    "url": "images/slack.svg",
    "revision": "9619ac706025ffb434bd25df418e5591"
  },
  {
    "url": "images/stackoverflow.svg",
    "revision": "4f62b6320d08038f64406b39f3943108"
  },
  {
    "url": "images/wrench.svg",
    "revision": "dba7613975ea6b812b22d6a6c8f74db7"
  },
  {
    "url": "index.html",
    "revision": "3fb42cad16a7265ef2af4e97f8c7a576"
  },
  {
    "url": "index.js",
    "revision": "b0e17364ac2326b69395c0b08d912072"
  },
  {
    "url": "offcial/api.md",
    "revision": "a8829791835938c155b5c96ba68a3695"
  },
  {
    "url": "offcial/readme.md",
    "revision": "1b34ca513415279fee092e08eeef7b57"
  },
  {
    "url": "style.css",
    "revision": "7109c4326ee2e614834ba781866e3187"
  }
], {});

// This is needed to make SPA to work offline.
workbox.routing.registerNavigationRoute("index.html");

// Cache common github images (e.g. pptr logo).
workbox.routing.registerRoute(/^https:\/\/user-images\.githubusercontent\.com\/.*/, workbox.strategies.staleWhileRevalidate(), 'GET');
