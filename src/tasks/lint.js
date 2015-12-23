export function load(gulp, config) {
  gulp.task('lint',
    Object.keys(gulp.tasks).filter(task => /\:lint$/.test(task))
  );
}