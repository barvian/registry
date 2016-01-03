'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _gulp2 = require('gulp');

var _gulp3 = _interopRequireDefault(_gulp2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Lint
// ====

function lint(done) {
  var _gulp;

  (_gulp = this.gulp).parallel.apply(_gulp, _toConsumableArray(Object.keys(this.tasks()).filter(function (task) {
    return (/\:lint$/.test(task)
    );
  })))(done);
};
lint.displayName = 'lint';
lint.description = 'Run all lint tasks';

exports.default = lint;