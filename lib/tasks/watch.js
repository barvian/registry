'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;
function load(gulp, config) {
  gulp.task('watch', ['browserSync:create'].concat(Object.keys(gulp.tasks).filter(function (task) {
    return (/\:watch$/.test(task)
    );
  })));
};