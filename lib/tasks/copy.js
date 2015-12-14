'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = copy;
exports.load = load;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function copy(config) {
  var pipeline = _gulp2.default.src(config.src, { base: config.base, cwd: config.base, dot: true });

  (0, _arrayFlatten2.default)([config.dest]).forEach(function (dest) {
    pipeline = pipeline.pipe(_gulp2.default.dest(dest));
  });

  return pipeline;
};

function load(gulp, config) {
  gulp.task('copy:build', function () {
    return copy(config);
  });
  gulp.task('copy:watch', function () {
    return gulp.watch(config.src, function () {
      return copy(config).pipe(_browserSync2.default.get('assets').stream());
    });
  });
  gulp.task('copy:clean', function (cb) {
    return (0, _del2.default)(config.src, { cwd: (0, _arrayFlatten2.default)([config.dest])[0], dot: true }, cb);
  });
};

exports.default = copy;