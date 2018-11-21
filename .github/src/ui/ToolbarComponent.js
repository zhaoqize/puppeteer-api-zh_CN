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

export class ToolbarComponent {
  constructor() {
    this.element = document.createElement('toolbar-component');
    this._left = document.createElement('toolbar-section');
    this._left.classList.add('left');
    this._middle = document.createElement('toolbar-section');
    this._middle.classList.add('middle');
    this._right = document.createElement('toolbar-section');
    this._right.classList.add('right');
    this.element.appendChild(this._left);
    this.element.appendChild(this._middle);
    this.element.appendChild(this._right);
  }

  left() {
    return this._left;
  }

  middle() {
    return this._middle;
  }

  right() {
    return this._right;
  }
}

