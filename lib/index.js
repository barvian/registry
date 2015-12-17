'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browserSync = undefined;
exports.load = load;

var _tasks = require('./tasks');

var tasks = _interopRequireWildcard(_tasks);

var _browserSync2 = require('./tasks/browserSync');

var _browserSync3 = _interopRequireDefault(_browserSync2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Gulpfile
// ========

exports.browserSync = _browserSync3.default;
function load(gulp, config) {
  tasks.configurable.filter(function (task) {
    return config.hasOwnProperty(task);
  }).forEach(function (task) {
    return tasks[task].load(gulp, config[task]);
  });
  tasks.multi.forEach(function (task) {
    return tasks[task].load(gulp, config[task]);
  });
};

exports.default = load;