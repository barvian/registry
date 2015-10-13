// Gulpfile
// ========

var gulp = require('gulp');
var fs = require('fs');
var path = require('path');

module.exports = function(config) {
  fs.readdirSync(path.join(__dirname, 'tasks')).forEach(function(file) {
    var task = path.basename(file, path.extname(file));
    if (config[task]) require('./tasks/'+task)(config[task]);
  });
  require('./tasks/build');
  require('./tasks/default');

  return gulp.tasks;
};
