var gulp = require('gulp');
var browserSync = require('browser-sync').create('assets');

module.exports = function(tasks) {
  gulp.task('watch', function() {
    browserSync.init(tasks.browserSync.config);
    gulp.watch(tasks.browserSync.needsReload, browserSync.reload);

    Object.keys(tasks).forEach(function(task) {
      var config = tasks[task];
      var watchTask = task+':watch';
      if (config.watchable) {
        var source = typeof config.watchable == 'string' || Array.isArray(config.watchable) ? config.watchable : config.source;
        gulp.watch(source, () => gulp.start(gulp.hasTask(watchTask) ? watchTask : task));
      } else if (gulp.hasTask(watchTask)) {
        gulp.start(watchTask);
      }
    });
  });
};
