import gulp from 'gulp';

// Lint
// ====

function lint(done) {
  this.gulp.parallel(
    ...Object.keys(this.tasks()).filter(task => /\:lint$/.test(task))
  )(done);
};
lint.displayName = 'lint';
lint.description = 'Run all lint tasks';

export {lint as default};

