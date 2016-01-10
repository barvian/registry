'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Clean
// =====

function clean(done, config, gulp) {
  gulp.parallel.apply(gulp, [function () {
    return (0, _del2.default)(config);
  }].concat(_toConsumableArray(gulp.tree().nodes.filter(function (task) {
    return (/\:clean$/.test(task)
    );
  }))))(done);
}
clean.displayName = 'clean';
clean.description = 'Run all clean tasks';

exports.default = clean;