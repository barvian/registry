// Gulpfile
// --------

var gulp = require('gulp');
var fs = require('fs');
var path = require('path');

module.exports = function(config) {
  fs.readdirSync(path.join(__dirname, 'tasks')).forEach(function(file) {
    var task = path.basename(file, path.extname(file));
    require('./tasks/'+task)(config[task]);
  });

  return gulp.tasks;
};
