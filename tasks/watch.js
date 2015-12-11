var browserSync = require('browser-sync');

module.exports = function(gulp, config) {
  gulp.task('watch', function() {
    browserSync.create('assets').init(config.browserSync);
    gulp.watch(config.promptsReload, browserSync.reload);

    Object.keys(gulp.tasks).forEach(function(task) {
      if (/\:watch$/.test(task)) {
        gulp.start(task);
      }
    });
  });
};
