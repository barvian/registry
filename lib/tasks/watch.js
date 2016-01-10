'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Watch
// =====

function watch(done, gulp) {
  var watchTasks = gulp.parallel.apply(gulp, _toConsumableArray(gulp.tree().nodes.filter(function (task) {
    return (/\:watch$/.test(task)
    );
  })));
  if (gulp.tree().nodes.indexOf('browserSync:init') !== -1) {
    gulp.series('browserSync:init', watchTasks)(done);
  } else {
    watchTasks(done);
  }
}
watch.displayName = 'watch';
watch.description = 'Run all watch tasks';

exports.default = watch;