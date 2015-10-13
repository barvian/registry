import gulp from 'gulp';
import tasks from '../config';
import browserSync from 'browser-sync';

gulp.task('watch', () => {
  const server = browserSync.create('assets');
  server.init(tasks.browserSync.config);
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
