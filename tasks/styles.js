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
var del = require('del');
var flatten = require('array-flatten');

module.exports = function(gulp, config) {
  var compile = function() {
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
      .pipe(sourcemaps.write('.'));

    flatten([config.dest]).forEach(function(dest) {
      pipeline = pipeline.pipe(gulp.dest(dest));
    });

    return pipeline
      .pipe(filter('*.css'))
      .pipe(size({title: 'styles'}));
  };

  gulp.task('styles', function() { return compile() });
  gulp.task('styles:watch', function() { gulp.watch(config.all, function() { return compile().pipe(browserSync.get('assets').stream()) }) });
  gulp.task('styles:clean', function(cb) { del([config.dest, '.sass-cache/'], cb); });
};
