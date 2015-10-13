import gulp from 'gulp';
var tasks = require('../config');
var browserSync = require('browser-sync').create('assets');

gulp.task('watch', () => {
  browserSync.init(tasks.browserSync.config);
  gulp.watch(tasks.browserSync.needsReload, server.reload);

  Object.keys(tasks).forEach(task => {
    const config = tasks[task];
    const watchTask = `${task}:watch`;
    if (config.watchable) {
      const source = typeof config.watchable == 'string' || Array.isArray(config.watchable) ? config.watchable : config.source;
      gulp.watch(source, () => gulp.start(gulp.hasTask(watchTask) ? watchTask : task));
    } else if (gulp.hasTask(watchTask)) {
      gulp.start(watchTask);
    }
  });
});
