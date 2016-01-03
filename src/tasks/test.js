import gulp from 'gulp';

// Test
// ====

function test(done) {
  this.gulp.parallel(
    ...Object.keys(this.tasks()).filter(task => /\:test$/.test(task))
  )(done);
};
test.displayName = 'test';
test.description = 'Run all test tasks';

export {test as default};

