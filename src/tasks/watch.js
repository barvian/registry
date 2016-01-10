// Watch
// =====

function watch(done, gulp) {
  let watchTasks = gulp.parallel(
    ...gulp.tree().nodes.filter(task => /\:watch$/.test(task))
  );
  if (gulp.tree().nodes.indexOf('browserSync:init') !== -1) {
    gulp.series(
      'browserSync:init',
      watchTasks
    )(done);
  } else {
    watchTasks(done);
  }
}
watch.displayName = 'watch';
watch.description = 'Run all watch tasks';

export {watch as default};
