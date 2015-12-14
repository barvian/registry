var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var pngquant = require('imagemin-pngquant');
var gulpif = require('gulp-if');
var size = require('gulp-size');
var browserSync = require('browser-sync');
var del = require('del');
var flatten = require('array-flatten');

module.exports = function(gulp, config) {
  var process = function() {
    var pipeline = gulp.src(config.src)
      .pipe(changed(flatten([config.dest])[0]))
      .pipe(imagemin({
        progressive: true,
        interlaced: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }));

    flatten([config.dest]).forEach(function(dest) {
      pipeline = pipeline.pipe(gulp.dest(dest));
    });

    return pipeline
      .pipe(size({title: 'images'}));
  };

  gulp.task('images', function() { return process() });
  gulp.task('images:watch', function() { gulp.watch(config.src, function() { return process().pipe(browserSync.get('assets').stream()) }) });
  gulp.task('images:clean', function(cb) { del(config.dest, cb); });
};
