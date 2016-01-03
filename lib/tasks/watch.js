'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _gulp2 = require('gulp');

var _gulp3 = _interopRequireDefault(_gulp2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Watch
// =====

function watch(done) {
  var _gulp;

  var watchTasks = (_gulp = this.gulp).parallel.apply(_gulp, _toConsumableArray(Object.keys(this.tasks()).filter(function (task) {
    return (/\:watch$/.test(task)
    );
  })));
  if ('browserSync:init' in this.tasks()) {
    this.gulp.series('browserSync:init', watchTasks)(done);
  } else {
    watchTasks(done);
  }
};
watch.displayName = 'watch';
watch.description = 'Run all watch tasks';

exports.default = watch;