var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var size = require('gulp-size');
var browserSync = require('browser-sync');
var del = require('del');
var rename = require('gulp-rename');

module.exports = function(gulp, config) {
  var process = function() {
    return gulp.src(config.src)
      .pipe(svgmin())
      .pipe(svgstore())
      .pipe(rename('sprites.svg'))
      .pipe(gulp.dest(config.dest))
      .pipe(size({title: 'sprites'}));
  };

  gulp.task('sprites', function() { return process() });
  gulp.task('sprites:watch', function() { gulp.watch(config.src, function() { return process().pipe(browserSync.get('assets').reload()) }) });
  gulp.task('sprites:clean', function(cb) { del(config.dest+'/sprites.svg', cb); });
};
