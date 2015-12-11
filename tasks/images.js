var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var pngquant = require('imagemin-pngquant');
var gulpif = require('gulp-if');
var size = require('gulp-size');
var browserSync = require('browser-sync');
var del = require('del');

module.exports = function(gulp, config) {
  var process = function(watch) {
    var pipeline = gulp.src(config.src)
      .pipe(changed(config.dest))
      .pipe(imagemin({
        progressive: true,
        interlaced: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(gulp.dest(config.dest))
      .pipe(size({title: 'images'}));

    return watch ? pipeline.pipe(browserSync.get('assets').stream()) : pipeline
  };

  gulp.task('images', function() { return process() });
  gulp.task('images:watch', function() { gulp.watch(config.src, function() { return process(true) }) });
  gulp.task('images:clean', function(cb) { del(config.dest, cb); });
};
