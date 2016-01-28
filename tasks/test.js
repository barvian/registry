'use strict';

// Test
// ====

module.exports = test;

function test(done, gulp) {
  gulp.parallel(
    ...gulp.tree().nodes.filter(task => /\:test$/.test(task))
  )(done);
}
test.displayName = 'test';
test.description = 'Run all test tasks';
