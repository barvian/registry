var gulp = require('gulp');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');

module.exports = function(config) {
  var copy = function(watch) {
    var pipeline = gulp.src(config.src, { base: config.base, dot: true })
      .pipe(gulp.dest(config.dest))

    return watch ? pipeline.pipe(browserSync.get('assets').stream()) : pipeline;
  };

  gulp.task('copy', function() { return copy() });
  gulp.task('copy:watch', function() { gulp.watch(config.src, function() { copy(true) }) });
}
