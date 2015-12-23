import browserSync from './browserSync';
import _runSequence from 'run-sequence';

export function load(gulp, config) {
  const runSequence = _runSequence.use(gulp),
    watchTasks = Object.keys(gulp.tasks).filter(task => /\:watch$/.test(task));

  if (gulp.hasTask('browserSync:create') && !browserSync.active) {
    gulp.task('watch', (cb) => runSequence('browserSync:create', watchTasks, cb));
  } else {
    gulp.task('watch', watchTasks);
  }
}
