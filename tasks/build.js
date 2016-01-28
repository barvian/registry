'use strict';

// Build
// =====

module.exports = build;

function build(done, gulp) {
  gulp.parallel(
    ...gulp.tree().nodes.filter(task => /\:build$/.test(task))
  )(done);
}
build.displayName = 'build';
build.description = 'Run all build tasks';
