var size = require('gulp-size');
var browserSync = require('browser-sync');
var del = require('del');

module.exports = function(gulp, config) {
  var copy = function(watch) {
    var pipeline = gulp.src(config.src)
      .pipe(gulp.dest(config.dest))
      .pipe(size({title: 'fonts'}));

    return watch ? pipeline.pipe(browserSync.get('assets').stream()) : pipeline;
  };

  gulp.task('fonts', function() { return copy() });
  gulp.task('fonts:watch', function() { gulp.watch(config.src, function() { return copy(true) }) });
  gulp.task('fonts:clean', function(cb) { del(config.dest, cb); });
};
