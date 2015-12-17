'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (cb, dests, logFile) {
  var extra = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];

  (0, _arrayFlatten2.default)([dests]).forEach(function (dest) {
    _fs2.default.readFile(dest + '/' + logFile, 'utf8', function (err, data) {
      var files = (err ? [] : JSON.parse(data)).concat([logFile]);
      (0, _del2.default)(files.map(function (file) {
        return dest + '/' + file;
      }).concat(extra), cb);
    });
  });
};

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }