var gulp = require('gulp');
var size = require('gulp-size');
var browserSync = require('browser-sync');

module.exports = function(config) {
  var copy = function(watch) {
    var pipeline = gulp.src(config.src)
      .pipe(gulp.dest(config.dest))
      .pipe(size({title: 'fonts'}));

    return watch ? pipeline.pipe(browserSync.get('assets').stream()) : pipeline;
  };

  gulp.task('fonts', function() { return copy() });
  gulp.task('fonts:watch', function() { gulp.watch(config.src, function() { copy(true) }) });
};
