import gulp from 'gulp';

// Watch
// =====

function watch(done) {
  let watchTasks = this.gulp.parallel(
    ...Object.keys(this.tasks()).filter(task => /\:watch$/.test(task))
  );
  if ('browserSync:init' in this.tasks()) {
    this.gulp.series(
      'browserSync:init',
      watchTasks
    )(done);
  } else {
    watchTasks(done);
  }
};
watch.displayName = 'watch';
watch.description = 'Run all watch tasks';

export {watch as default};
