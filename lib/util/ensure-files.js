'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureFiles = ensureFiles;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Array<string>} files
 * @param {Function} cb
 */

function ensureFiles(files) {
  var missingFiles = files.reduce(function (prev, filePath) {
    var fileFound = false;

    try {
      fileFound = _fs2.default.statSync(filePath).isFile();
    } catch (e) {}

    if (!fileFound) {
      prev.push(filePath + ' Not Found');
    }

    return prev;
  }, []);

  if (missingFiles.length) {
    throw new Error('Missing Required Files\n' + missingFiles.join('\n'));
  }
}

exports.default = ensureFiles;