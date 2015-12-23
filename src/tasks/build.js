export function load(gulp, config) {
  gulp.task('build',
    ['lint'].concat(Object.keys(gulp.tasks).filter(task => /\:build$/.test(task)))
  );
}