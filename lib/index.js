'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browserSync = undefined;
exports.load = load;

var _tasks = require('./tasks');

var tasks = _interopRequireWildcard(_tasks);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var browserSync = exports.browserSync = tasks.browserSync.browserSync; // Gulpfile
// ========

function load(gulp, config) {
  tasks.configurable.filter(function (task) {
    return config.hasOwnProperty(task);
  }).forEach(function (task) {
    return tasks[task].load(gulp, config[task]);
  });
  tasks.convenience.forEach(function (task) {
    return tasks[task].load(gulp, config[task]);
  });
};

exports.default = load;