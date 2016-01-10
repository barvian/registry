'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Lint
// ====

function lint(done, gulp) {
  gulp.parallel.apply(gulp, _toConsumableArray(gulp.tree().nodes.filter(function (task) {
    return (/\:lint$/.test(task)
    );
  })))(done);
}
lint.displayName = 'lint';
lint.description = 'Run all lint tasks';

exports.default = lint;