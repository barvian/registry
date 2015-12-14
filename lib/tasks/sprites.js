'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.process = process;
exports.load = load;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpSvgmin = require('gulp-svgmin');

var _gulpSvgmin2 = _interopRequireDefault(_gulpSvgmin);

var _gulpSvgstore = require('gulp-svgstore');

var _gulpSvgstore2 = _interopRequireDefault(_gulpSvgstore);

var _gulpSize = require('gulp-size');

var _gulpSize2 = _interopRequireDefault(_gulpSize);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function process(config) {
  var pipeline = _gulp2.default.src(config.src).pipe((0, _gulpSvgmin2.default)()).pipe((0, _gulpSvgstore2.default)()).pipe((0, _gulpRename2.default)('sprites.svg'));

  (0, _arrayFlatten2.default)([config.dest]).forEach(function (dest) {
    pipeline = pipeline.pipe(_gulp2.default.dest(dest));
  });

  return pipeline.pipe((0, _gulpSize2.default)({ title: 'sprites' }));
};

function load(gulp, config) {
  gulp.task('sprites:build', function () {
    return process(config);
  });
  gulp.task('sprites:watch', function () {
    return gulp.watch(config.src, function () {
      return process(config).pipe(_browserSync2.default.get('assets').stream());
    });
  });
  gulp.task('sprites:clean', function (cb) {
    return (0, _del2.default)((0, _arrayFlatten2.default)([config.dest])[0] + '/sprites.svg', cb);
  });
};

exports.default = process;