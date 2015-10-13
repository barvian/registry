// Gulpfile
// --------

var gulp = require('gulp');
var requireDir = require('require-dir');
requireDir('./tasks');

module.exports = function(config) {
  return gulp.tasks;
});
