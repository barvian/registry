'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;

var _runSequence2 = require('run-sequence');

var _runSequence3 = _interopRequireDefault(_runSequence2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function load(gulp, config) {
  var runSequence = _runSequence3.default.use(gulp),
      watchTasks = Object.keys(gulp.tasks).filter(function (task) {
    return (/\:watch$/.test(task)
    );
  });

  if (gulp.hasTask('browserSync:create')) {
    gulp.task('watch', function (cb) {
      return runSequence('browserSync:create', watchTasks, cb);
    });
  } else {
    gulp.task('watch', watchTasks);
  }
}