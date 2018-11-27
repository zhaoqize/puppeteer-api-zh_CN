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
import {Store as IDBStore, get as idbGet, set as idbSet} from '../third_party/idb-keyval.mjs';

import {APIDocumentation, APISection, APIMethod, APIClass} from './APIDocumentation.js';
import {App} from '../ui/App.js';
import {SearchComponent} from '../ui/SearchComponent.js';

const LOCAL_STORAGE_KEY = 'pptr-api-data';
const PRODUCT_NAME = 'Puppeteer';

export class PPTRProduct extends App.Product {
  static async fetchReleaseAndReadme(staleData) {
    const fetchTimestamp = Date.now();
    const [releasesText, readmeText] = await Promise.all([
      fetch('https://api.github.com/repos/GoogleChrome/puppeteer/releases').then(r => r.text()),
      fetch('./offcial/readme.md').then(r => r.text()),
    ]);
    const releases = JSON.parse(releasesText).map(release => ({
      name: release.tag_name,
      releaseNotes: release.body,
      timestamp: (new Date(release.published_at)).getTime(),
      apiText: ''
    }));
    // Add initial release - was published as a tag.
    releases.push({
      name: 'v0.9.0',
      timestamp: (new Date('August 16, 2017')).getTime(),
      releaseNotes: '',
      apiText: '',
    });

    // Initialize release priorities that define their sorting order.
    for (const release of releases) {
      const [major, minor, patch] = release.name.substring(1).split('.').map(e => parseInt(e, 10));
      release.priority = major * 100 * 100 + minor * 100 + patch;
    }

    releases.sort((a, b) => b.priority - a.priority);

    // Fulfill api.md for every release using staleData, if any.
    if (staleData) {
      const staleAPITexts = new Map(staleData.releases.map(release => [release.name, release.apiText]));
      for (const release of releases)
        release.apiText = staleAPITexts.get(release.name);
    }

    // Fill predefined chromium versions for past releases:
    for (const release of releases) {
      if (release.name === 'v0.9.0') {
        release.chromiumVersion = 'Chromium 62.0.3188.0 (r494755)';
      } else if (release.name === 'v0.10.0' || release.name === 'v0.10.1') {
        release.chromiumVersion = 'Chromium 62.0.3193.0 (r496140)';
      } else if (release.name === 'v0.13.0') {
        release.chromiumVersion = 'Chromium 64.0.3265.0 (r515411)';
      } else if (release.name === 'v1.1.0' || release.name === 'v1.1.1') {
        release.chromiumVersion = 'Chromium 66.0.3347.0 (r536395)';
      } else if (release.name === 'v1.3.0') {
        release.chromiumVersion = 'Chromium 67.0.3392.0 (r536395)';
      }
    }

    // Add tip-of-tree version.
    releases.unshift({
      name: 'master',
      chromiumVersion: 'N/A',
      releaseNotes: '',
      apiText: ''
    });

    // Parse chromium versions from release notes, where possible.
    for (const release of releases) {
      if (!release.releaseNotes || release.chromiumVersion)
        continue;
      const match = release.releaseNotes.match(/Chromium\s+(\d+\.\d+.\d+.\d+)\s*\((r\d{6})\)/i);
      if (match)
        release.chromiumVersion = `Chromium ${match[1]} (${match[2]})`;
    }

    // Download api.md for every release.
    // Forcefully re-download it for "master" release.
    await Promise.all(releases.map(async release => {
      if (release.name === 'master' || !release.apiText)
        release.apiText = await fetch('./offcial/api.md').then((r) => r.text())
    }));
    return {fetchTimestamp, readmeText, releases};
  }

  static async create(productVersion) {
    const store = new IDBStore('pptr-db', 'pptr-store');
    let data = await idbGet(LOCAL_STORAGE_KEY, store);
    const hasRequiredProductVersion = productVersion ? data && !!data.releases.find(release => release.name === productVersion) : true;

    if (!data || !hasRequiredProductVersion) {
      const message = data ? 'Downloading Puppeteer release ' + productVersion : 'Please give us a few seconds to download Puppeteer releases for the first time.\n Next time we\'ll do it in background.';
      app.setLoadingScreen(true, message);
      data = await PPTRProduct.fetchReleaseAndReadme(data);
      await idbSet(LOCAL_STORAGE_KEY, data, store);
      app.setLoadingScreen(false);
    } else if (Date.now() - data.fetchTimestamp > 5 * 60 * 1000 /* 5 minutes */) {
      // Kick off update process in the background.
      PPTRProduct.fetchReleaseAndReadme(data).then(data => idbSet(LOCAL_STORAGE_KEY, data, store));
    }
    return new PPTRProduct(data.readmeText, data.releases, data.fetchTimestamp);
  }

  constructor(readmeText, releases, fetchTimestamp) {
    super();
    this._readmeText = readmeText;
    this._releases = releases;
    this._fetchTimestamp = fetchTimestamp;
    this._initializeAPILifespan();
  }

  toolbarElements() {
    const toolbarElements = [];
    toolbarElements.push(iconButton('https://stackoverflow.com/questions/tagged/puppeteer', './images/stackoverflow.svg', 'pptr-stackoverflow'));
    toolbarElements.push(iconButton('https://join.slack.com/t/puppeteer/shared_invite/enQtMzU4MjIyMDA5NTM4LTM1OTdkNDhlM2Y4ZGUzZDdjYjM5ZWZlZGFiZjc4MTkyYTVlYzIzYjU5NDIyNzgyMmFiNDFjN2UzNWU0N2ZhZDc', './images/slack.svg', 'pptr-slack'));
    toolbarElements.push(iconButton('https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md', './images/wrench.svg', 'pptr-troubleshooting'));
    toolbarElements.push(iconButton('https://github.com/GoogleChrome/puppeteer', './images/github.png', 'pptr-github'));
    return toolbarElements;

    function iconButton(linkURL, iconURL, iconClass) {
      const a = document.createElement('a');
      a.innerHTML = `<img src="${iconURL}"></img>`;
      a.classList.add(iconClass);
      a.href = linkURL;
      return a;
    }
  }

  _initializeAPILifespan() {
    // Compute "since" and "until" versions for API entities.
    const classRegex = /### class:\s+(\w+)\s*$/;
    const eventRegex = /#### event:\s+'(\w+)'\s*$/;
    const methodRegex = /#### \w+\.([\w$]+)\(/;
    const nsRegex = /#### \w+\.(\w+)\s*$/;

    for (const release of this._releases) {
      release.classesLifespan = new Map();
      let classOutline = null;
      const titles = release.apiText.split('\n').filter(line => line.startsWith('###'));
      for (const title of titles) {
        // Handle classes
        if (classRegex.test(title)) {
          if (classOutline)
            release.classesLifespan.set(classOutline.name, classOutline);
          const className = title.match(classRegex)[1];
          classOutline = {
            name: className,
            since: release.name,
            until: '',
            // Maps of name -> first introduced version
            eventsSince: new Map(),
            methodsSince: new Map(),
            namespacesSince: new Map(),
            // Maps of name -> first removed version
            eventsUntil: new Map(),
            methodsUntil: new Map(),
            namespacesUntil: new Map(),
          };
        } else if (eventRegex.test(title)) {
          console.assert(classOutline);
          const eventName = title.match(eventRegex)[1];
          classOutline.eventsSince.set(eventName, release.name);
        } else if (methodRegex.test(title)) {
          console.assert(classOutline);
          const methodName = title.match(methodRegex)[1];
          classOutline.methodsSince.set(methodName, release.name);
        } else if (nsRegex.test(title)) {
          console.assert(classOutline);
          const nsName = title.match(nsRegex)[1];
          classOutline.namespacesSince.set(nsName, release.name);
        }
      }
      if (classOutline)
        release.classesLifespan.set(classOutline.name, classOutline);
    }

    // Compute "since" for classes, methods, namespaces and events.
    for (let i = this._releases.length - 2; i >= 0; --i) {
      const previousRelease = this._releases[i + 1];
      const release = this._releases[i];
      for (const [className, classOutline] of release.classesLifespan) {
        const previousClassOutline = previousRelease.classesLifespan.get(className);
        if (!previousClassOutline)
          continue;
        classOutline.since = previousClassOutline.since;
        for (const [eventName, since] of previousClassOutline.eventsSince) {
          if (classOutline.eventsSince.has(eventName))
            classOutline.eventsSince.set(eventName, since);
        }
        for (const [methodName, since] of previousClassOutline.methodsSince) {
          if (classOutline.methodsSince.has(methodName))
            classOutline.methodsSince.set(methodName, since);
        }
        for (const [namespaceName, since] of previousClassOutline.namespacesSince) {
          if (classOutline.namespacesSince.has(namespaceName))
            classOutline.namespacesSince.set(namespaceName, since);
        }
      }
    }
    // Compute "until" for classes, methods, namespaces and events.
    for (let i = 0; i < this._releases.length - 1; ++i) {
      const nextRelease = this._releases[i];
      const release = this._releases[i + 1];
      for (const [className, classOutline] of release.classesLifespan) {
        const nextReleaseOutline = nextRelease.classesLifespan.get(className);
        if (!nextReleaseOutline) {
          classOutline.until = nextRelease.name;
          for (const eventName of classOutline.eventsUntil.keys())
            classOutline.eventsUntil.set(eventName, nextRelease.name);
          for (const methodName of classOutline.methodsUntil.keys())
            classOutline.methodsUntil.set(methodName, nextRelease.name);
          for (const namespaceName of classOutline.namespacesUntil.keys())
            classOutline.namespacesUntil.set(namespaceName, nextRelease.name);
          continue;
        }
        classOutline.until = nextReleaseOutline.until;
        for (const eventName of classOutline.eventsSince.keys()) {
          if (nextReleaseOutline.eventsUntil.has(eventName))
            classOutline.eventsUntil.set(eventName, nextReleaseOutline.eventsUntil.get(eventName));
          else if (!nextReleaseOutline.eventsSince.has(eventName))
            classOutline.eventsUntil.set(eventName, nextRelease.name);
        }
        for (const methodName of classOutline.methodsSince.keys()) {
          if (nextReleaseOutline.methodsUntil.has(methodName))
            classOutline.methodsUntil.set(methodName, nextReleaseOutline.methodsUntil.get(methodName));
          else if (!nextReleaseOutline.methodsSince.has(methodName))
            classOutline.methodsUntil.set(methodName, nextRelease.name);
        }
        for (const namespaceName of classOutline.namespacesSince.keys()) {
          if (nextReleaseOutline.namespacesUntil.has(namespaceName))
            classOutline.namespacesUntil.set(namespaceName, nextReleaseOutline.namespacesUntil.get(namespaceName));
          else if (!nextReleaseOutline.namespacesSince.has(namespaceName))
            classOutline.namespacesUntil.set(namespaceName, nextRelease.name);
        }
      }
    }
  }

  name() {
    return PRODUCT_NAME;
  }

  defaultVersionName() {
    return this._releases[1].name;
  }

  versionNames() {
    return this._releases.map(release => release.name);
  }

  /**
   * @return {!Array<!{name: string, description: string}>}
   */
  versionDescriptions() {
    const descriptions = this._releases.map(release => {
      return {
        name: release.name,
        description: release.chromiumVersion,
        date: release.timestamp ? new Date(release.timestamp) : null,
      };
    });
    return descriptions;
  }

  settingsFooterElement() {
    const settingsFooter = document.createElement('pptr-settings-footer');
    const diff = Date.now() - this._fetchTimestamp;
    let time = '';
    if (diff < 1000)
      time = 'Just Now';
    else if (1000 <= diff && diff <= 60 * 1000)
      time = `${Math.round(diff / 1000)} seconds ago`;
    else if (60 * 1000 <= diff && diff <= 60 * 60 * 1000)
      time = `${Math.round(diff / 60 / 1000)} minutes ago`;
    else if (60 * 60 * 1000 <= diff && diff <= 24 * 60 * 60 * 1000)
      time = `${Math.round(diff / 60 / 60 / 1000)} hours ago`;
    else if (24 * 60 * 60 * 1000 <= diff)
      time = `${Math.round(diff / 24 / 60 / 60 / 1000)} days ago`;
    settingsFooter.textContent = 'Data fetched ' + time;
    return settingsFooter;
  }

  create404(title = '') {
    const element = document.createElement('pptr-api');
    element.classList.add('pptr-not-found');
    const contentBox = document.createElement('content-box');
    element.appendChild(contentBox);
    contentBox.innerHTML = `
      <h1>Not Found</h1>
      <p>${title}</p>
      <p><a href='${app.linkURL(PRODUCT_NAME, this.defaultVersionName())}'>Home</a></p>
    `;
    return {element, title: 'Not Found'};
  }

  getVersion(name) {
    const release = this._releases.find(release => release.name === name);
    if (!release)
      return null;
    return new PPTRVersion(this._readmeText, release);
  }
}

class PPTRVersion extends App.ProductVersion {
  constructor(readmeText, {name, releaseNotes, apiText, classesLifespan}) {
    super();
    this._name = name;
    this._readmeText = readmeText;

    this.api = APIDocumentation.create(name, releaseNotes, apiText, classesLifespan);

    this._sidebarElements = [];
    this._entryToSidebarElement = new Map();
    this._initializeSidebarElements();

    this._searchItems = [];
    for (const apiClass of this.api.classes) {
      this._searchItems.push(PPTRSearchItem.createForClass(apiClass));
      for (const apiEvent of apiClass.events)
        this._searchItems.push(PPTRSearchItem.createForEvent(apiEvent));
      for (const apiNamespace of apiClass.namespaces)
        this._searchItems.push(PPTRSearchItem.createForNamespace(apiNamespace));
      for (const apiMethod of apiClass.methods)
        this._searchItems.push(PPTRSearchItem.createForMethod(apiMethod));
    }

  }

  name() {
    return this._name;
  }

  searchItems() {
    return this._searchItems;
  }

  sidebarElements() {
    return this._sidebarElements;
  }

  toolbarElements() {
    return this._toolbarElements;
  }

  content(contentId) {
    if (!contentId) {
      const element = document.createElement('pptr-api');
      element.classList.add('pptr-readme');
      const contentBox = document.createElement('content-box');
      element.appendChild(contentBox);
      const rendered = APIDocumentation.markdownToDOM(this._readmeText);
      var fragment = document.createDocumentFragment();
      while (rendered.firstChild)
        fragment.appendChild(rendered.firstChild);
      contentBox.appendChild(fragment);
      // Move logo to the very beginning - it will look better.
      const logo = contentBox.querySelector('img[align=right]');
      if (logo) {
        logo.remove();
        contentBox.insertBefore(logo, contentBox.firstChild);
      }
      return { element, title: '' };
    }
    if (contentId === 'outline') {
      const element = document.createElement('pptr-api');
      element.appendChild(this.api.createOutline());
      return { element, title: '', selectedSidebarElement: this._outlineItem };
    }
    const entry = this.api.idToEntry(contentId);
    if (!entry)
      return null;
    if (entry instanceof APIClass) {
      const element = this._showAPIClass(entry);
      const title = entry.name;
      const selectedSidebarElement = this._entryToSidebarElement.get(entry);
      return {element, title, selectedSidebarElement};
    }
    if (entry instanceof APISection) {
      const element = document.createElement('pptr-api');
      this._renderElements(element, null, [entry.element]);
      const title = '';
      const selectedSidebarElement = this._entryToSidebarElement.get(entry);
      return {element, title, selectedSidebarElement};
    }
    const element = this._showAPIClass(entry.apiClass);
    const scrollAnchor = this._scrollAnchor(entry.element);
    const title = entry.apiClass.loweredName + '.' + entry.name;
    const selectedSidebarElement = this._entryToSidebarElement.get(entry.apiClass);
    return {element, title, selectedSidebarElement, scrollAnchor};
  }

  _initializeSidebarElements() {
    this._sidebarElements = [];
    const resourcesDivider = document.createElement('pptr-sidebar-divider');

    const apiDivider = document.createElement('pptr-sidebar-divider');
    apiDivider.textContent = `API`;
    const outlineIcon = document.createElement('a');
    this._sidebarElements.push(apiDivider);

    this._outlineItem = createItem(null, 'Outline', app.linkURL(PRODUCT_NAME, this.api.version, 'outline'));
    this._sidebarElements.push(this._outlineItem);
    for (const apiEntry of [...this.api.sections, ...this.api.classes]) {
      const icon = apiEntry instanceof APIClass ?  document.createElement('pptr-class-icon') : null;
      const item = createItem(icon, apiEntry.name, apiEntry.linkURL());
      this._sidebarElements.push(item);
      this._entryToSidebarElement.set(apiEntry, item);
    }

    function createItem(icon, text, route) {
      const item = document.createElement('a');
      item.classList.add('pptr-sidebar-item');
      item.href = route;
      if (icon)
        item.appendChild(icon);
      item.appendChild(document.createTextNode(text));
      return item;
    }
  }

  _showAPIClass(apiClass) {
    const element = document.createElement('pptr-api');

    this._insertBox(element).appendChild(apiClass.element);

    this._renderElements(element, 'NameSpaces', apiClass.namespaces.map(ns => ns.element));
    this._renderElements(element, 'Events', apiClass.events.map(e => e.element));
    this._renderElements(element, 'Methods', apiClass.methods.map(method => method.element));

    const padding = document.createElement('pptr-api-padding');
    padding.innerHTML = '<img width=30 src="./images/pptr.png"></img>';
    element.appendChild(padding);
    return element;
  }

  _scrollAnchor(entryElement) {
    if (entryElement.previousSibling && entryElement.previousSibling.tagName === 'CONTENT-DELIMETER')
      return entryElement.previousSibling;
    let parentBox = entryElement;
    while (parentBox && parentBox.tagName !== 'CONTENT-BOX')
      parentBox = parentBox.parentElement;
    return parentBox;
  }

  _insertBox(container) {
    const box = document.createElement('content-box');
    container.appendChild(box);
    return box;
  }

  _renderElements(container, title, elements) {
    if (!elements.length)
      return;
    if (title) {
      const header = document.createElement('h3');
      header.textContent = title;
      container.appendChild(header);
    }
    const box = this._insertBox(container);
    let lastDelimeter = null;
    for (const element of elements) {
      box.appendChild(element);
      lastDelimeter = document.createElement('content-delimeter');
      box.appendChild(lastDelimeter);
    }
    lastDelimeter.remove();
  }
}

class PPTRSearchItem extends SearchComponent.Item {
  static createForMethod(apiMethod) {
    const className = apiMethod.apiClass.loweredName;
    const name = apiMethod.name;
    const args = apiMethod.args;

    const desc = apiMethod.element.querySelector('p');
    const text = `${className}.${name}(${args})`;
    const titleRenderer = matches => renderTokensWithMatches(matches, [
      {text: className + '.', tagName: 'search-item-api-method-class'},
      {text: `${name}(${args})`, tagName: 'search-item-api-method-name'},
    ]);
    return new PPTRSearchItem(apiMethod, text, 'pptr-method-icon', titleRenderer, desc ? desc.textContent : '');
  }

  static createForEvent(apiEvent) {
    const className = apiEvent.apiClass.loweredName;
    const name = apiEvent.name;

    const desc = apiEvent.element.querySelector('p');
    const text = `${className}.on('${name}')`;
    const titleRenderer = matches => renderTokensWithMatches(matches, [
      {text: className + '.on(', tagName: 'search-item-api-method-class'},
      {text: `'${name}'`, tagName: 'search-item-api-method-name'},
      {text: ')', tagName: 'search-item-api-method-class'},
    ]);
    return new PPTRSearchItem(apiEvent, text, 'pptr-event-icon', titleRenderer, desc ? desc.textContent : '');
  }

  static createForNamespace(apiNamespace) {
    const className = apiNamespace.apiClass.loweredName;
    const name = apiNamespace.name;

    const desc = apiNamespace.element.querySelector('p');
    const text = `${className}.${name}`;
    const titleRenderer = matches => renderTokensWithMatches(matches, [
      {text: className + '.', tagName: 'search-item-api-method-class'},
      {text: name, tagName: 'search-item-api-method-name'},
    ]);
    return new PPTRSearchItem(apiNamespace, text, 'pptr-ns-icon', titleRenderer, desc ? desc.textContent : '');
  }

  static createForClass(apiClass) {
    const className = apiClass.name;

    const desc = apiClass.element.querySelector('p');
    const text = className;
    const titleRenderer = matches => renderTokensWithMatches(matches, [
      {text: className, tagName: 'search-item-api-method-name'},
    ]);
    return new PPTRSearchItem(apiClass, text, 'pptr-class-icon', titleRenderer, desc ? desc.textContent : '');
  }

  constructor(apiEntry, text, iconTagName, titleRenderer, description) {
    super();
    this._url = apiEntry.linkURL(PRODUCT_NAME);
    this._text = text;
    this._iconTagName = iconTagName;
    this._titleRenderer = titleRenderer;
    this._description = description;

    this._subtitleElement = null;
    this._iconElement = null;
  }

  url() {
    return this._url;
  }

  text() {
    return this._text;
  }

  titleElement(matches) {
    return this._titleRenderer.call(null, matches);
  }

  iconElement() {
    if (!this._iconElement && this._iconTagName)
      this._iconElement = document.createElement(this._iconTagName);
    return this._iconElement;
  }

  subtitleElement() {
    if (!this._description)
      return null;
    if (!this._subtitleElement)
      this._subtitleElement = document.createTextNode(this._description);
    return this._subtitleElement;
  }
}

/**
 * @param {string} text
 * @param {!Array<number>} matches
 * @param {number} fromIndex
 * @param {number} fromIndex
 * @return {!Element}
 */
function renderTokensWithMatches(matches, tokens) {
  if (!matches.length) {
    const fragment = document.createDocumentFragment();
    for (let token of tokens) {
      if (token.tagName) {
        const node = document.createElement(token.tagName);
        node.textContent = token.text;
        fragment.appendChild(node);
      } else {
        fragment.appendChild(document.createTextNode(token.text));
      }
    }
    return fragment;
  }

  const fragment = document.createDocumentFragment();
  let offset = 0;
  let matchesSet = new Set(matches);
  for (let token of tokens) {
    const result = token.tagName ? document.createElement(token.tagName) : document.createDocumentFragment();
    let from = 0;
    let lastInsideHighlight = false;
    for (let to = 0; to <= token.text.length; ++to) {
      const insideHighlight = matchesSet.has(to + offset);
      if (insideHighlight === lastInsideHighlight && to < token.text.length)
        continue;
      if (from < to) {
        if (lastInsideHighlight) {
          const node = document.createElement('search-highlight');
          node.textContent = token.text.substring(from, to);
          result.appendChild(node);
        } else {
          const node = document.createTextNode(token.text.substring(from, to));
          result.appendChild(node);
        }
        from = to;
      }
      lastInsideHighlight = insideHighlight;
    }
    offset += token.text.length;
    fragment.appendChild(result);
  }
  return fragment;
}

