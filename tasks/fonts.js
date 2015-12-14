var size = require('gulp-size');
var browserSync = require('browser-sync');
var del = require('del');
var flatten = require('array-flatten');

module.exports = function(gulp, config) {
  var copy = function() {
    var pipeline = gulp.src(config.src);

    flatten([config.dest]).forEach(function(dest) {
      pipeline = pipeline.pipe(gulp.dest(dest));
    });

    return pipeline
      .pipe(size({title: 'fonts'}));
  };

  gulp.task('fonts', function() { return copy() });
  gulp.task('fonts:watch', function() { gulp.watch(config.src, function() { return copy().pipe(browserSync.get('assets').stream()) }) });
  gulp.task('fonts:clean', function(cb) { del(config.dest, cb); });
};
