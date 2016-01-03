import gulp from 'gulp';

// Build
// =====

function build(done) {
  this.gulp.parallel(
    ...Object.keys(this.tasks()).filter(task => /\:build$/.test(task))
  )(done);
};
build.displayName = 'build';
build.description = 'Run all build tasks';

export {build as default};

