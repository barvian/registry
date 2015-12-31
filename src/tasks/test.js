export function load(gulp, config) {
  gulp.task('test',
    Object.keys(gulp.tasks).filter(task => /\:test$/.test(task))
  );
}