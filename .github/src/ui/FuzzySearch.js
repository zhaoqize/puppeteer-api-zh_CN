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

const REGEX_SPECIAL_CHARACTERS = '^[]{}()\\.^$*+?|-,';

/**
 * @unrestricted
 */
export class FuzzySearch {
  /**
   * @param {string} query
   */
  constructor(query) {
    this._filterRegex = FuzzySearch._createFilterRegex(query);
    this._query = query;
    this._queryUpperCase = query.toUpperCase();
    this._score = new Int32Array(20 * 100);
    this._sequence = new Int32Array(20 * 100);
    this._dataUpperCase = '';
  }

  /**
   * @return {string}
   */
  query() {
    return this._query;
  }

  /**
   * @param {string} data
   * @param {?Array<number>} matchIndexes
   * @return {number}
   */
  score(data, matchIndexes) {
    if (!data || !this._query || !this._filterRegex.test(data))
      return 0;
    var n = this._query.length;
    var m = data.length;
    if (!this._score || this._score.length < n * m) {
      this._score = new Int32Array(n * m * 2);
      this._sequence = new Int32Array(n * m * 2);
    }
    var score = this._score;
    var sequence = /** @type {!Int32Array} */ (this._sequence);
    this._dataUpperCase = data.toUpperCase();
    for (var i = 0; i < n; ++i) {
      for (var j = 0; j < m; ++j) {
        var skipCharScore = j === 0 ? 0 : score[i * m + j - 1];
        var prevCharScore = i === 0 || j === 0 ? 0 : score[(i - 1) * m + j - 1];
        var consecutiveMatch = i === 0 || j === 0 ? 0 : sequence[(i - 1) * m + j - 1];
        var pickCharScore = this._match(this._query, data, i, j, consecutiveMatch);
        if (pickCharScore && prevCharScore + pickCharScore >= skipCharScore) {
          sequence[i * m + j] = consecutiveMatch + 1;
          score[i * m + j] = (prevCharScore + pickCharScore);
        } else {
          sequence[i * m + j] = 0;
          score[i * m + j] = skipCharScore;
        }
      }
    }
    if (matchIndexes)
      this._restoreMatchIndexes(sequence, n, m, matchIndexes);
    return score[n * m - 1];
  }

  /**
   * @param {!Int32Array} sequence
   * @param {number} n
   * @param {number} m
   * @param {!Array<number>} out
   */
  _restoreMatchIndexes(sequence, n, m, out) {
    var i = n - 1, j = m - 1;
    while (i >= 0 && j >= 0) {
      switch (sequence[i * m + j]) {
        case 0:
          --j;
          break;
        default:
          out.push(j);
          --i;
          --j;
          break;
      }
    }
    out.reverse();
  }

  /**
   * @param {string} query
   * @param {string} data
   * @param {number} i
   * @param {number} j
   * @param {number} consecutiveMatch
   * @return {number}
   */
  _match(query, data, i, j, consecutiveMatch) {
    if (this._queryUpperCase[i] !== this._dataUpperCase[j])
      return 0;

    var isCapsMatch = query[i] === data[j] && query[i] === this._queryUpperCase[i];
    var score = 10;
    if (isCapsMatch)
      score += 6;
    if (!consecutiveMatch && (!j || /[^\w$]/.test(data[j - 1])))
      score += 2;
    score += consecutiveMatch * 4;
    return score;
  }

  /**
   * @param {string} query
   * @return {!RegExp}
   */
  static _createFilterRegex(query) {
    const toEscape = REGEX_SPECIAL_CHARACTERS;
    let regexString = '';
    for (let i = 0; i < query.length; ++i) {
      let c = query.charAt(i);
      if (toEscape.indexOf(c) !== -1)
        c = '\\' + c;
      if (i)
        regexString += '[^\\0' + c + ']*';
      regexString += c;
    }
    return new RegExp(regexString, 'i');
  }
};

