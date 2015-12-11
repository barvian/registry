// Gulpfile
// ========

var fs = require('fs');
var path = require('path');

module.exports = function(gulp, config) {
  fs.readdirSync(path.join(__dirname, 'tasks')).forEach(function(file) {
    var task = path.basename(file, path.extname(file));
    if (config[task]) require('./tasks/'+task)(gulp, config[task]);
  });
  require('./tasks/build')(gulp);
  require('./tasks/default')(gulp);

  return gulp.tasks;
};
