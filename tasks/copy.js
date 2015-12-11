var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var del = require('del');

module.exports = function(gulp, config) {
  var copy = function(watch) {
    var pipeline = gulp.src(config.src, { base: config.base, cwd: config.base, dot: true })
      .pipe(gulp.dest(config.dest))

    return watch ? pipeline.pipe(browserSync.get('assets').stream()) : pipeline;
  };

  gulp.task('copy', function() { return copy() });
  gulp.task('copy:watch', function() { gulp.watch(config.src, function() { return copy(true) }) });
  gulp.task('copy:clean', function(cb) { del(config.src, { cwd: config.dest, dot: true }, cb); });
};
