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

export class EventEmitter {
  constructor() {
    /** @type {!Map<string, !Set<function(*)>>} */
    this._eventListeners = new Map();
  }

  /**
   * @param {string} eventName
   * @param {function(*)} listener
   * @return {!{emitter: EventEmitter, eventName: string, listener: function(*)}}
   */
  on(eventName, listener) {
    let listeners = this._eventListeners.get(eventName);
    if (!listeners) {
      listeners = new Set();
      this._eventListeners.set(eventName, listeners);
    }
    listeners.add(listener);
    return {
      emitter: this,
      eventName,
      listener
    };
  }

  /**
   * @param {string} eventName
   * @param {function(*)} listener
   */
  removeListener(eventName, listener) {
    let listeners = this._eventListeners.get(eventName);
    if (!listeners || !listeners.size)
      return;
    listeners.delete(listener);
  }

  /**
   * @param {string} eventName
   * @param {...*} args
   */
  emit(eventName, ...args) {
    let listeners = this._eventListeners.get(eventName);
    if (!listeners || !listeners.size)
      return;
    listeners = new Set(listeners);
    for (const listener of listeners)
      listener.call(null, ...args);
  }

  /**
   * @param {!Array<!{emitter: EventEmitter, eventName: string, listener: function(*)}>} descriptors
   */
  static removeEventListeners(descriptors) {
    for (const descriptor of descriptors)
      descriptor.emitter.removeListener(descriptor.eventName, descriptor.listener);
    descriptors.splice(0, descriptors.length);
  }
}
