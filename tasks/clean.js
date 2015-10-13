var gulp = require('gulp');
var del = require('del');

module.exports = function(config) {
  gulp.task('clean', function(cb) {
    del(config.source, cb);
  });
};
