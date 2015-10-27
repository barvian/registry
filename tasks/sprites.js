var gulp = require('gulp');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var size = require('gulp-size');
var browserSync = require('browser-sync');

module.exports = function(config) {
  var process = function(watch) {
    var pipeline = gulp.src(config.src)
      .pipe(svgmin())
      .pipe(svgstore())
      .pipe(gulp.dest(config.dest))
      .pipe(size({title: 'sprites'}));

    return watch ? pipeline.pipe(browserSync.get('assets').reload()) : pipeline
  };

  gulp.task('sprites', function() { return process() });
  gulp.task('sprites:watch', function() { gulp.watch(config.src, function() { return process(true) }) });
};
