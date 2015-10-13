// Gulpfile
// --------

var gulp = require('gulp');

module.exports = function(config) {
  require('./tasks/clean')(config.clean);
  require('./tasks/copy')(config.copy);
  require('./tasks/fonts')(config.fonts);
  require('./tasks/images')(config.images);
  require('./tasks/scripts')(config.scripts);
  require('./tasks/styles')(config.styles);
  require('./tasks/sync')(config.sync);
  require('./tasks/watch')(config);
  require('./tasks/build');
  require('./tasks/default');

  return gulp.tasks;
};
