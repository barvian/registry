'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;
function load(gulp, config) {
  gulp.task('build', Object.keys(gulp.tasks).filter(function (task) {
    return (/\:build$/.test(task)
    );
  }));
}