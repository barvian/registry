var gulp = require('gulp');

module.exports = function(config) {
  gulp.task('build', ['images','fonts','styles','scripts','copy']);
};
