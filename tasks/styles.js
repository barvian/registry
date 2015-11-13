var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var size = require('gulp-size');
var gulpif = require('gulp-if');
var filter = require('gulp-filter');
var pixrem = require('gulp-pixrem');
var browserSync = require('browser-sync');
var jsonImporter = require('node-sass-json-importer');

module.exports = function(config) {
  var compile = function(watch) {
    var pipeline = gulp.src(config.src)
      .pipe(sourcemaps.init())
      .pipe(sass({
        importer: jsonImporter,
        includePaths: config.includePaths,
        precision: 10
      }).on('error', sass.logError))
      .pipe(autoprefixer(config.autoprefixer))
      .pipe(pixrem())
      // Concatenate and minify styles
      .pipe(gulpif('*.css', minifyCSS({
        mediaMerging: false
      })))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.dest))
      .pipe(filter('*.css'))
      .pipe(size({title: 'styles'}));

    return watch ? pipeline.pipe(browserSync.get('assets').stream()) : pipeline;
  };

  gulp.task('styles', function() { return compile() });
  gulp.task('styles:watch', function() { gulp.watch(config.all, function() { return compile(true) }) });
};
