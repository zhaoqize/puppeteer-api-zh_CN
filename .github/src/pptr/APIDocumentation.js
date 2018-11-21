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
import {} from '../third_party/commonmark.min.js';
import {} from '../third_party/runmode-standalone.js';
import {} from '../third_party/javascript.js';

export class APIDocumentation {
  static markdownToDOM(markdownText, safe = false, softbreak) {
    const reader = new commonmark.Parser();
    const ast = reader.parse(markdownText);
    const writer = new commonmark.HtmlRenderer({safe, softbreak});
    const result = writer.render(ast);
    const domParser = new DOMParser();
    const doc = document.importNode(domParser.parseFromString(result, 'text/html').body, true);

    // Linkify Github Issue references
    const issueRegex = /#(\d+)\b/gm;
    let walker = document.createTreeWalker(doc, NodeFilter.SHOW_TEXT, {acceptNode: node => {
      if (node.parentElement.tagName === 'A')
        return false;
      issueRegex.lastIndex = 0;
      return issueRegex.test(node.textContent);
    }});
    const issueNodes = [];
    while (walker.nextNode()) issueNodes.push(walker.currentNode);

    for (const issueNode of issueNodes) {
      const fragment = document.createDocumentFragment();
      const text = issueNode.textContent;
      issueRegex.lastIndex = 0;
      let lastIndex = 0;
      let match = null;
      while (match = issueRegex.exec(text)) {
        fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
        const link = document.createElement('a');
        link.href = 'https://github.com/GoogleChrome/puppeteer/issues/' + match[1];
        link.textContent = '#' + match[1];
        fragment.appendChild(link);
        lastIndex = issueRegex.lastIndex;
      }
      if (lastIndex < text.length)
        fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
      issueNode.parentElement.replaceChild(fragment, issueNode);
    }

    // Linkify SHA references
    const shaRegex = /\b([0123456789abcdef]{7,})\b/g;
    walker = document.createTreeWalker(doc, NodeFilter.SHOW_TEXT, {acceptNode: node => {
      if (node.parentElement.tagName === 'A')
        return false;
      shaRegex.lastIndex = 0;
      return shaRegex.test(node.textContent);
    }});
    const shaNodes = [];
    while (walker.nextNode()) shaNodes.push(walker.currentNode);
    for (const shaNode of shaNodes) {
      const fragment = document.createDocumentFragment();
      const text = shaNode.textContent;
      shaRegex.lastIndex = 0;
      let lastIndex = 0;
      let match = null;
      while (match = shaRegex.exec(text)) {
        fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
        const link = document.createElement('a');
        link.href = 'https://github.com/GoogleChrome/puppeteer/commit/' + match[1];
        link.innerHTML = `<code>${match[1]}</code>`;
        fragment.appendChild(link);
        lastIndex = shaRegex.lastIndex;
      }
      if (lastIndex < text.length)
        fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
      shaNode.parentElement.replaceChild(fragment, shaNode);
    }

    // Translate all links to api.md to local links.
    for (const a of doc.querySelectorAll('a')) {
      const match = a.href.match(/github.com\/GoogleChrome\/puppeteer\/blob\/([^/]+)\/official\/api.md#(.*)/);
      if (match)
        a.href = app.linkURL('Puppeteer', match[1], APIDocumentation._idFromGHAnchor(match[2]));
      // Mark link as external if necessary
      const isImgLink = a.children.length === 1 && a.children[0].tagName === 'IMG';
      if (a.hostname !== location.hostname && a.hostname.length && !isImgLink) {
        const icon = document.createElement('external-link-icon')
        if (a.children.length === 1 && a.children[0].tagName === 'CODE')
          a.children[0].appendChild(icon);
        else
          a.appendChild(icon);
      }
    }
    // Highlight all code blocks.
    for (const node of doc.querySelectorAll('code.language-javascript')) {
      node.classList.remove('language-javascript');
      node.classList.add('language-js');
    }
    for (const code of doc.querySelectorAll('code.language-js'))
      CodeMirror.runMode(code.textContent, 'text/javascript', code);

    return doc;
  }

  /**
   * @param {string} version
   * @param {string} releaseNotes
   * @param {string} markdownText
   * @param {*} classesLifespan
   */
  static create(version, releaseNotes, markdownText, classesLifespan) {
    console.time('Generate API HTML');
    // Parse markdown into HTML
    const doc = APIDocumentation.markdownToDOM(markdownText);

    // Translate all relative links to ppdoc links.
    for (const anchor of doc.querySelectorAll('a')) {
      const href = anchor.getAttribute('href') || '';
      if (href.startsWith('#')) {
        // Link referencing other part of documentation.
        const githubAnchor = href.substring(1);
        const entryId = APIDocumentation._idFromGHAnchor(githubAnchor);
        anchor.setAttribute('href', app.linkURL('Puppeteer', version, entryId));
      } else if (href.startsWith('/') || href.startsWith('../') || href.startsWith('./')) {
        // Link pointing somewhere to PPTR repository.
        const isRelease = /^\d+\.\d+\.\d+$/.test(version);
        const branch = isRelease ? 'v' + version : 'master';
        anchor.setAttribute('href', `https://github.com/GoogleChrome/puppeteer/blob/${branch}/docs/${href}`);
      }
    }

    const api = new APIDocumentation(version);

    // Add release notes if we have any.
    if (releaseNotes) {
      api.sections.push(APISection.createReleaseNotes(api, APIDocumentation.markdownToDOM(releaseNotes, true, '<br/>')));
    }

    // All class headers are rendered as H3 tags
    const headers = doc.querySelectorAll('h3');
    for (let i = 0; i < headers.length; ++i) {
      const header = headers[i];
      const nextHeader = i + 1 < headers.length ? headers[i + 1] : null;
      const title = header.textContent;
      // Import all HTML from section until we hit next top-level header.
      const content = extractSiblingsIntoFragment(header.nextSibling, nextHeader);
      if (title.toLowerCase().startsWith('class:'))
        api.classes.push(APIClass.create(api, title, content));
      else
        api.sections.push(APISection.create(api, title, content));
    }
    api._initializeContentIds();
    for (const apiClass of api.classes) {
      const classLifespan = classesLifespan.get(apiClass.name);
      apiClass._initializeSinceAndUntilLabels(classLifespan);
      apiClass._appendTableOfContents();
    }
    console.timeEnd('Generate API HTML');
    return api;
  }

  static _idFromGHAnchor(githubAnchor) {
    return 'api-' + githubAnchor;
  }

  constructor(version) {
    this.version = version;
    this.sections = [];
    this.classes = [];

    this._idToEntry = new Map();
  }

  createOutline() {
    const outline = document.createElement('content-box');
    const header = document.createElement('h2');
    header.textContent = 'Puppeteer ' + this.version;
    outline.appendChild(header);
    const ul = document.createElement('ul');
    for (const apiSection of this.sections) {
      const li = document.createElement('li');
      li.classList.add('table-of-contents-entry');
      li.appendChild(apiSection.createTableOfContentsElement());
      ul.appendChild(li);
    }
    for (const apiClass of this.classes) {
      const li = document.createElement('li');
      li.classList.add('table-of-contents-entry');
      li.appendChild(apiClass.createTableOfContentsElement());
      ul.appendChild(li);
      const childUL = document.createElement('ul');
      for (const entry of [...apiClass.events, ...apiClass.namespaces, ...apiClass.methods]) {
        const li = document.createElement('li');
        li.classList.add('table-of-contents-entry');
        li.appendChild(entry.createTableOfContentsElement());
        childUL.appendChild(li);
      }
      li.appendChild(childUL);
    }
    outline.appendChild(ul);
    return outline;
  }

  _initializeContentIds() {
    const githubAnchors = new Set();

    const generateGithubAnchor = (title) => {
      const id = title.trim().toLowerCase().replace(/\s/g, '-').replace(/[^-0-9a-zа-яё]/ig, '');
      let dedupId = id;
      let counter = 0;
      while (githubAnchors.has(dedupId))
        dedupId = id + '-' + (++counter);
      githubAnchors.add(dedupId);
      return dedupId;
    }

    const assignId = (entry, title) => {
      const contentId = APIDocumentation._idFromGHAnchor(generateGithubAnchor(title));
      entry.contentId = contentId;
      this._idToEntry.set(contentId, entry);
    };

    for (const section of this.sections)
      assignId(section, section.name);
    for (const apiClass of this.classes) {
      assignId(apiClass, `class: '${apiClass.name}'`);
      for (const apiEvent of apiClass.events)
        assignId(apiEvent, `event: '${apiEvent.name}'`);
      for (const apiMethod of apiClass.methods)
        assignId(apiMethod, `${apiClass.loweredName}.${apiMethod.name}(${apiMethod.args})`);
      for (const ns of apiClass.namespaces)
        assignId(ns, `${apiClass.loweredName}.${ns.name}`);
    }
  }

  idToEntry(id) {
    return this._idToEntry.get(id) || null;
  }
}

export class APIEntry {
  constructor(api, name, element, contentId) {
    this.api = api;
    this.name = name;
    this.tableOfContentsText = name;
    this.element = element;
    // This has to be assigned later.
    this.contentId = null;
    // Version when the APIEntry was first introduced.
    this.sinceVersion = '';
    // Version when the APIEntry was removed.
    this.untilVersion = '';
  }

  linkURL() {
    return app.linkURL('Puppeteer', this.api.version, this.contentId);
  }

  createTableOfContentsElement() {
    const fragment = document.createDocumentFragment();
    const a = document.createElement('a');
    a.href = this.linkURL();
    a.textContent = this.tableOfContentsText;
    fragment.appendChild(a);
    if (this.sinceVersion) {
      const since = document.createElement('pptr-api-since');
      since.textContent = this.sinceVersion;
      if (this.api.version === this.sinceVersion)
        since.classList.add('pptr-new-api');
      fragment.appendChild(since);
    }
    if (this.untilVersion) {
      const until = document.createElement('pptr-api-until');
      until.textContent = this.untilVersion;
      fragment.appendChild(until);
    }
    return fragment;
  }
}

export class APISection extends APIEntry {
  static create(api, title, descFragment) {
    const element = document.createElement('api-section');
    element.classList.add('api-entry');
    element.innerHTML = `<h1>${title}</h1>`;
    element.appendChild(descFragment);
    return new APISection(api, title, element);
  }

  static createReleaseNotes(api, descFragment) {
    const element = document.createElement('api-section');
    element.classList.add('api-entry');
    element.innerHTML = `<h2>Puppeteer ${api.version} Release Notes</h2>`;
    while (descFragment.firstChild)
      element.appendChild(descFragment.firstChild);
    return new APISection(api, 'Release Notes', element);
  }

  constructor(api, name, element) {
    super(api, name, element);
  }
}

export class APIClass extends APIEntry {
  static create(api, title, fragment) {
    const name = title.replace(/^class:/i, '').trim();
    const headers = fragment.querySelectorAll('h4');

    const element = document.createElement('api-class');
    element.classList.add('api-entry');
    element.innerHTML = `<h3><pptr-class-icon></pptr-class-icon> <api-class-name>class: ${name}</api-class-name> <pptr-api-since></pptr-api-since> <pptr-api-until></pptr-api-until></h3>`;
    element.appendChild(extractSiblingsIntoFragment(fragment.firstChild, headers[0]));
    const apiClass = new APIClass(api, name, element);

    for (let i = 0; i < headers.length; ++i) {
      const header = headers[i];
      const nextHeader = i + 1 < headers.length ? headers[i + 1] : null;
      const title = header.textContent;
      const fragment = extractSiblingsIntoFragment(header.nextSibling, nextHeader);
      if (title.toLowerCase().startsWith('event:'))
        apiClass.events.push(APIEvent.create(apiClass, title, fragment));
      else if (title.includes('('))
        apiClass.methods.push(APIMethod.create(apiClass, title, fragment));
      else
        apiClass.namespaces.push(APINamespace.create(apiClass, title, fragment));
    }
    return apiClass;
  }

  constructor(api, name, element) {
    super(api, name, element);
    this.tableOfContentsText = `class: ${name}`;
    let lowerIndex = 1;
    while (lowerIndex < this.name.length && this.name[lowerIndex + 1] === this.name[lowerIndex + 1].toUpperCase()) ++lowerIndex;
    this.loweredName = name.substring(0, lowerIndex).toLowerCase() + name.substring(lowerIndex);
    this.methods = [];
    this.events = [];
    this.namespaces = [];
  }

  _initializeSinceAndUntilLabels(classLifespan) {
    if (!classLifespan) {
      console.error('Error: missing Class API Lifespan information for class ' + this.name);
      return;
    }
    this.sinceVersion = classLifespan.since;
    const sinceElement = this.element.querySelector('pptr-api-since');
    if (this.sinceVersion) {
      sinceElement.textContent = classLifespan.since;
      if (this.sinceVersion === this.api.version)
        sinceElement.classList.add('pptr-new-api');
    } else {
      sinceElement.remove();
    }

    this.untilVersion = classLifespan.until;
    const untilElement = this.element.querySelector('pptr-api-until');
    if (this.untilVersion)
      untilElement.textContent = classLifespan.until;
    else
      untilElement.remove();

    for (const apiEvent of this.events) {
      const sinceElement = apiEvent.element.querySelector('pptr-api-since');
      if (classLifespan.eventsSince.has(apiEvent.name)) {
        apiEvent.sinceVersion = classLifespan.eventsSince.get(apiEvent.name);
        sinceElement.textContent = apiEvent.sinceVersion;
        if (apiEvent.sinceVersion === this.api.version)
          sinceElement.classList.add('pptr-new-api');
      } else {
        sinceElement.remove();
      }
      const untilElement = apiEvent.element.querySelector('pptr-api-until');
      if (classLifespan.eventsUntil.has(apiEvent.name)) {
        apiEvent.untilVersion = classLifespan.eventsUntil.get(apiEvent.name);
        untilElement.textContent = apiEvent.untilVersion;
      } else {
        untilElement.remove();
      }
    }
    for (const apiMethod of this.methods) {
      const sinceElement = apiMethod.element.querySelector('pptr-api-since');
      if (classLifespan.methodsSince.has(apiMethod.name)) {
        apiMethod.sinceVersion = classLifespan.methodsSince.get(apiMethod.name);
        sinceElement.textContent = apiMethod.sinceVersion;
        if (apiMethod.sinceVersion === this.api.version)
          sinceElement.classList.add('pptr-new-api');
      } else {
        sinceElement.remove();
      }
      const untilElement = apiMethod.element.querySelector('pptr-api-until');
      if (classLifespan.methodsUntil.has(apiMethod.name)) {
        apiMethod.untilVersion = classLifespan.methodsUntil.get(apiMethod.name);
        untilElement.textContent = apiMethod.untilVersion;
      } else {
        untilElement.remove();
      }
    }
    for (const apiNamespace of this.namespaces) {
      const sinceElement = apiNamespace.element.querySelector('pptr-api-since');
      if (classLifespan.namespacesSince.has(apiNamespace.name)) {
        apiNamespace.sinceVersion = classLifespan.namespacesSince.get(apiNamespace.name);
        sinceElement.textContent = apiNamespace.sinceVersion;
        if (apiNamespace.sinceVersion === this.api.version)
          sinceElement.classList.add('pptr-new-api');
      } else {
        sinceElement.remove();
      }
      const untilElement = apiNamespace.element.querySelector('pptr-api-until');
      if (classLifespan.namespacesUntil.has(apiNamespace.name)) {
        apiNamespace.untilVersion = classLifespan.namespacesUntil.get(apiNamespace.name);
        untilElement.textContent = apiNamespace.untilVersion;
      } else {
        untilElement.remove();
      }
    }
  }

  _appendTableOfContents() {
    const addSection = (title, entities) => {
      const header = document.createElement('h4');
      header.textContent = title;
      this.element.appendChild(header);
      const ul = document.createElement('ul');
      ul.classList.add('pptr-table-of-contents');
      for (const entity of entities) {
        const li = document.createElement('li');
        li.classList.add('table-of-contents-entry');
        li.appendChild(entity.createTableOfContentsElement());
        ul.appendChild(li);
      }
      this.element.appendChild(ul);
    };

    if (this.events.length)
      addSection('Events', this.events);
    if (this.namespaces.length)
      addSection('Namespaces', this.namespaces);
    if (this.methods.length)
      addSection('Methods', this.methods);
  }
}

export class APINamespace extends APIEntry {
  static create(apiClass, title, fragment) {
    const name = title.split('.').pop();
    const element = document.createElement('api-ns');
    element.classList.add('api-entry');
    element.innerHTML = [
      `<h4>`,
        '<pptr-ns-icon></pptr-ns-icon> ',
        `<api-ns-classname>${apiClass.loweredName}</api-ns-classname>`,
        `<api-ns-name>.${name}</api-ns-name>`,
        `<pptr-api-since></pptr-api-since>`,
        `<pptr-api-until></pptr-api-until>`,
      `</h4>`
    ].join('');
    element.appendChild(fragment);
    return new APINamespace(apiClass, name, element);
  }

  constructor(apiClass, name, element) {
    super(apiClass.api, name, element);
    this.tableOfContentsText = `${apiClass.loweredName}.${name}`;
    this.apiClass = apiClass;
  }
}

export class APIMethod extends APIEntry {
  static create(apiClass, title, descFragment) {
    const name = title.match(/\.([^(]*)/)[1];
    const args = title.match(/\((.*)\)/)[1];
    const element = document.createElement('api-method');
    element.classList.add('api-entry');
    element.innerHTML = [
      `<h4>
        <pptr-method-icon></pptr-method-icon>
        <api-method-classname>${apiClass.loweredName}</api-method-classname>`,
        `<api-method-name>.${name}</api-method-name>`,
        `<api-method-args>(${args})</api-method-args>`,
        `<pptr-api-since></pptr-api-since>`,
        `<pptr-api-until></pptr-api-until>`,
      `</h4>`
    ].join('');
    element.appendChild(descFragment);
    return new APIMethod(apiClass, name, args, element);
  }

  constructor(apiClass, name, args, element) {
    super(apiClass.api, name, element);
    this.tableOfContentsText = `${apiClass.loweredName}.${name}(${args})`;
    this.apiClass = apiClass;
    this.args = args;
  }
}

export class APIEvent extends APIEntry {
  static create(apiClass, title, descFragment) {
    const name = title.match(/'(.*)'/)[1];
    const element = document.createElement('api-event');
    element.classList.add('api-entry');
    element.innerHTML = `<h4><pptr-event-icon></pptr-event-icon> ${apiClass.loweredName}.on(<api-event-name>'${name}'</api-event-name>) <pptr-api-since></pptr-api-since> <pptr-api-until></pptr-api-until></h4>`;
    element.appendChild(descFragment);
    return new APIEvent(apiClass, name, element);
  }

  constructor(apiClass, name, element) {
    super(apiClass.api, name, element);
    this.tableOfContentsText = `${apiClass.loweredName}.on('${name}')`;
    this.apiClass = apiClass;
  }
}

/**
 * @param {!Node} fromInclusive
 * @param {!Node} toExclusive
 * @return {!DocumentFragment}
 */
function extractSiblingsIntoFragment(fromInclusive, toExclusive) {
  const fragment = document.createDocumentFragment();
  let node = fromInclusive;
  while (node && node !== toExclusive) {
    const next = node.nextSibling;
    fragment.appendChild(node);
    node = next;
  }
  return fragment;
}

