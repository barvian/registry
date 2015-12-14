var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var size = require('gulp-size');
var browserSync = require('browser-sync');
var del = require('del');
var rename = require('gulp-rename');
var flatten = require('array-flatten');

module.exports = function(gulp, config) {
  var process = function() {
    var pipeline = gulp.src(config.src)
      .pipe(svgmin())
      .pipe(svgstore())
      .pipe(rename('sprites.svg'));

    flatten([config.dest]).forEach(function(dest) {
      pipeline = pipeline.pipe(gulp.dest(dest));
    });

    return pipeline
      .pipe(size({title: 'sprites'}));
  };

  gulp.task('sprites', function() { return process() });
  gulp.task('sprites:watch', function() { gulp.watch(config.src, function() { return process().pipe(browserSync.get('assets').reload()) }) });
  gulp.task('sprites:clean', function(cb) { del(config.dest+'/sprites.svg', cb); });
};
