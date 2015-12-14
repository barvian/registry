'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = load;

var _tasks = require('./tasks');

var tasks = _interopRequireWildcard(_tasks);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function load(gulp, config) {
  config = Object.assign({ build: null, clean: null, watch: null }, config);
  Object.keys(tasks).filter(function (task) {
    return config.hasOwnProperty(task);
  }).forEach(function (task) {
    return tasks[task].load(gulp, config[task]);
  });

  gulp.task('default', ['build', 'watch']);
} // Gulpfile
// ========

;