var del = require('del');

module.exports = function(gulp, config) {
  gulp.task('clean', function(cb) {
    Object.keys(gulp.tasks).forEach(function(task) {
      if (/\:clean$/.test(task)) {
        gulp.start(task);
      }
    });

    del(config, cb);
  });
};
