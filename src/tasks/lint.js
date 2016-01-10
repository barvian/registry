// Lint
// ====

function lint(done, gulp) {
  gulp.parallel(
    ...gulp.tree().nodes.filter(task => /\:lint$/.test(task))
  )(done);
}
lint.displayName = 'lint';
lint.description = 'Run all lint tasks';

export {lint as default};
