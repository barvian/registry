'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;
function load(gulp, config) {
  gulp.task('default', ['build', 'watch']);
}