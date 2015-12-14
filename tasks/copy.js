var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var del = require('del');
var flatten = require('array-flatten');

module.exports = function(gulp, config) {
  var copy = function() {
    var pipeline = gulp.src(config.src, { base: config.base, cwd: config.base, dot: true });

    flatten([config.dest]).forEach(function(dest) {
      pipeline = pipeline.pipe(gulp.dest(dest));
    });

    return pipeline;
  };

  gulp.task('copy', function() { return copy() });
  gulp.task('copy:watch', function() { gulp.watch(config.src, function() { return copy().pipe(browserSync.get('assets').stream()) }) });
  gulp.task('copy:clean', function(cb) { del(config.src, { cwd: config.dest, dot: true }, cb); });
};
