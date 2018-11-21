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

export class SidebarComponent {
  constructor() {
    this.element = document.createElement('sidebar-component');
    this.element.addEventListener('click', this._onClick.bind(this), false);
    this.glasspane = document.createElement('sidebar-glasspane');
    this.glasspane.addEventListener('click', event => {
      this.hideOnMobile();
      event.stopPropagation();
      event.preventDefault();
    }, false);

    this._selectedItem = null;
  }

  _onClick(event) {
    let item = event.target;
    while (item && item.parentElement !== this.element)
      item = item.parentElement;
    if (item && this._selectedItem !== item) {
      this.hideOnMobile();
      if (this._selectedItem)
        this._selectedItem.classList.remove('selected');
      this._selectedItem = item;
      this._selectedItem.classList.add('selected');
    }
  }

  setElements(elements) {
    this.element.innerHTML = '';
    for (const element of elements) {
      const item = document.createElement('sidebar-item');
      item.appendChild(element);
      this.element.appendChild(item);
    }
  }

  hideOnMobile() {
    this.element.classList.remove('show-on-mobile');
    this.glasspane.classList.remove('show-on-mobile');
  }

  toggleOnMobile() {
    this.element.classList.toggle('show-on-mobile');
    this.glasspane.classList.toggle('show-on-mobile');
  }

  setSelected(element) {
    if (this._selectedItem) {
      this._selectedItem.classList.remove('selected');
      this._selectedItem = null;
    }
    if (!element)
      return;
    const item = element.parentElement;
    if (!item || item.parentElement !== this.element)
      return;
    this._selectedItem = item;
    this._selectedItem.classList.add('selected');
  }
}

