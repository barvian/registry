export function load(gulp, config) {
  gulp.task('watch',
    ['browserSync:create'].concat(Object.keys(gulp.tasks).filter(task => /\:watch$/.test(task)))
  );
};
