// Default
// =======

function df(done, gulp) {
  gulp.series(
    'build',
    'watch'
  )(done);
}
df.displayName = 'default';
df.description = 'Build and watch for changes';

export {df as default};
