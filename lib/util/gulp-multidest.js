'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = multidest;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _lazypipe = require('lazypipe');

var _lazypipe2 = _interopRequireDefault(_lazypipe);

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function multidest() {
  var pipeline = (0, _lazypipe2.default)();

  for (var _len = arguments.length, dests = Array(_len), _key = 0; _key < _len; _key++) {
    dests[_key] = arguments[_key];
  }

  (0, _arrayFlatten2.default)(dests).forEach(function (dest) {
    pipeline = pipeline.pipe(_gulp2.default.dest, dest);
  });
  return pipeline();
}