var gulp = require('gulp');
var browserSync = require('browser-sync').create('assets');

module.exports = function(config) {
  gulp.task('watch', function() {
    browserSync.init(config.browserSync);
    gulp.watch(config.needsReload, browserSync.reload);

    Object.keys(gulp.tasks).forEach(function(task) {
      if (/\:watch$/.test(task)) {
        gulp.start(task);
      }
    });
  });
};
