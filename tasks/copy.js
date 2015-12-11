var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var del = require('del');

module.exports = function(gulp, config) {
  var copy = function() {
    return gulp.src(config.src, { base: config.base, cwd: config.base, dot: true })
      .pipe(gulp.dest(config.dest))
  };

  gulp.task('copy', function() { return copy() });
  gulp.task('copy:watch', function() { gulp.watch(config.src, function() { return copy().pipe(browserSync.get('assets').stream()) }) });
  gulp.task('copy:clean', function(cb) { del(config.src, { cwd: config.dest, dot: true }, cb); });
};
