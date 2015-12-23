'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minify = minify;
exports.load = load;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _browserSync = require('./browserSync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function minify(config) {
  var pipeline = _gulp2.default.src(config.src);

  (0, _arrayFlatten2.default)([config.dest]).forEach(function (dest) {
    pipeline = pipeline.pipe(_gulp2.default.dest(dest));
  });

  return pipeline;
}

function load(gulp, config) {
  gulp.task('fonts:build', function () {
    return minify(config);
  });
  gulp.task('fonts:watch', function () {
    return gulp.watch(config.src, function () {
      return minify(config).pipe(_browserSync2.default.stream());
    });
  });
  gulp.task('fonts:clean', function () {
    return (0, _del2.default)((0, _arrayFlatten2.default)([config.dest]));
  });
}

exports.default = minify;