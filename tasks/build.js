'use strict';

// Build
// =====

function build(done, gulp) {
  gulp.parallel(
    ...gulp.tree().nodes.filter(task => /\:build$/.test(task))
  )(done);
}
build.displayName = 'build';
build.description = 'Run all build tasks';

module.exports = build;
