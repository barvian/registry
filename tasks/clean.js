'use strict';

const del = require('del');

// Clean
// =====

module.exports = clean;

function clean(done, config, gulp) {
  gulp.parallel(
    () => del(config),
    ...gulp.tree().nodes.filter(task => /\:clean$/.test(task))
  )(done);
}
clean.displayName = 'clean';
clean.description = 'Run all clean tasks';
