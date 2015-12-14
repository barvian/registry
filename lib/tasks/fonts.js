'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.process = process;
exports.load = load;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpSize = require('gulp-size');

var _gulpSize2 = _interopRequireDefault(_gulpSize);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function process(config) {
  var pipeline = _gulp2.default.src(config.src);

  (0, _arrayFlatten2.default)([config.dest]).forEach(function (dest) {
    pipeline = pipeline.pipe(_gulp2.default.dest(dest));
  });

  return pipeline.pipe((0, _gulpSize2.default)({ title: 'fonts' }));
};

function load(gulp, config) {
  gulp.task('fonts:build', function () {
    return process(config);
  });
  gulp.task('fonts:watch', function () {
    return gulp.watch(config.src, function () {
      return process(config).pipe(_browserSync2.default.get('assets').stream());
    });
  });
  gulp.task('fonts:clean', function (cb) {
    return (0, _del2.default)(config.dest, cb);
  });
};

exports.default = process;