module.exports = function(gulp, config) {
  gulp.task('build', ['images','sprites','fonts','styles','scripts','copy']);
};
