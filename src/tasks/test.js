// Test
// ====

function test(done, gulp) {
  gulp.parallel(
    ...gulp.tree().nodes.filter(task => /\:test$/.test(task))
  )(done);
}
test.displayName = 'test';
test.description = 'Run all test tasks';

export {test as default};
