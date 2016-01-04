// Default
// =======

function df(done) {
  this.gulp.series(
    'build',
    'watch'
  )(done);
}
df.displayName = 'default';
df.description = 'Build and watch for changes';

export {df as default};
