'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;
function load(gulp, config) {
  gulp.task('lint', Object.keys(gulp.tasks).filter(function (task) {
    return (/\:lint$/.test(task)
    );
  }));
}