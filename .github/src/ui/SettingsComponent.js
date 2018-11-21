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
import {EventEmitter} from './EventEmitter.js';

export class SettingsComponent extends EventEmitter {
  constructor() {
    super();
    this.element = document.createElement('settings-component');
    this._contentElement = document.createElement('settings-content');
    this.element.appendChild(this._contentElement);

    this._selectedItem = null;
    document.body.addEventListener('keydown', event => {
      if (!this.element.parentElement)
        return;
      if (event.key === 'Escape') {
        this.hide();
        event.preventDefault();
        event.stopPropagation();
      }
    }, false);
    this._contentElement.addEventListener('click', event => {
      // Support clicks on links, e.g. "file a bug".
      if (event.target.tagName === 'A') {
        event.stopPropagation();
        return;
      }
      event.preventDefault();
      // Allow selecting versions.
      if (!window.getSelection().isCollapsed)
        return;
      if (event.target.classList.contains('settings-close-icon')) {
        this.hide();
        return;
      }
      let item = event.target;
      while (item && item.tagName !== 'PRODUCT-VERSION')
        item = item.parentElement;
      if (!item)
        return;
      this._selectItem(item);
      const {product, versionName} = item[SettingsComponent._Symbol];
      this.hide();
      this.emit(SettingsComponent.Events.VersionSelected, product, versionName);
    }, false);
    this.element.addEventListener('click', () => this.hide(), false);
  }

  _selectItem(item) {
    if (this._selectedItem)
      this._selectedItem.classList.remove('selected');
    this._selectedItem = item;
    if (this._selectedItem)
      this._selectedItem.classList.add('selected');
  }

  show(product, version) {
    this._contentElement.innerHTML = '';
    const settingsHeader = document.createElement('settings-header');
    settingsHeader.innerHTML = `<h3>Settings</h3>`;
    const closeIcon = document.createElement('img');
    closeIcon.classList.add('settings-close-icon');
    closeIcon.src = './images/close.svg';
    settingsHeader.appendChild(closeIcon);
    this._contentElement.appendChild(settingsHeader);
    if (product) {
      const versionsContainer = document.createElement('product-versions');
      for (const description of product.versionDescriptions()) {
        const item = document.createElement('product-version');
        const name = document.createElement('version-name');
        name.textContent = description.name;
        item.appendChild(name);
        const subtitle = document.createElement('version-description');
        subtitle.textContent = description.description;
        item.appendChild(subtitle);
        const date = document.createElement('version-date');
        date.textContent = formatDate(description.date);
        item.appendChild(date);
        item[SettingsComponent._Symbol] = {product, versionName: description.name};
        versionsContainer.appendChild(item);
        if (description.name === version.name())
          this._selectItem(item);
      }
      this._contentElement.appendChild(versionsContainer);
      this._contentElement.appendChild(product.settingsFooterElement());
    }
    const websiteVersionText = window.__WEBSITE_VERSION__ || 'tip-of-tree';
    const websiteVersion = document.createElement('website-version');
    websiteVersion.innerHTML = `<div>WebSite Version: <code>${websiteVersionText}</code> <a href="https://github.com/GoogleChromeLabs/pptr.dev/issues">File a bug!</a></div>`;
    this._contentElement.appendChild(websiteVersion);
    document.body.appendChild(this.element);
    if (this._selectedItem)
      this._selectedItem.scrollIntoViewIfNeeded();

    function formatDate(date) {
      if (!date)
        return 'N/A';
      const monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      return monthNames[month] + ' ' + day + ', ' + year;
    }
  }

  hide() {
    this.element.remove();
    // Cleanup content to free some memory.
    this._contentElement.innerHTML = '';
    this._selectedItem = null;
  }
}

SettingsComponent._Symbol = Symbol('SettingsComponent._Symbol');

SettingsComponent.Events = {
  VersionSelected: 'VersionSelected',
};
