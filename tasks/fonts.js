import gulp from 'gulp';
import size from 'gulp-size';
import browserSync from 'browser-sync';

module.exports = function(config) {
  var copy = function(watch) {
    var pipeline = gulp.src(config.source)
      .pipe(gulp.dest(config.dest))
      .pipe(size({title: 'fonts'}));

    return watch ? pipeline.pipe(browserSync.get('assets').stream()) : pipeline;
  };

  gulp.task('fonts', function() { return copy() });
  gulp.task('fonts:watch', function() { copy(true) });
};
