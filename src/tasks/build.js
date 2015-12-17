export function load(gulp, config) {
  gulp.task('build',
    Object.keys(gulp.tasks).filter(task => /\:build$/.test(task))
  );
};
