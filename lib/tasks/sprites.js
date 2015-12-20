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

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _browserSync = require('./browserSync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

var _env = require('../util/env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function process(config) {
  var pipeline = _gulp2.default.src(config.src).pipe((0, _gulpIf2.default)((0, _env.prod)(), (0, _gulpSvgmin2.default)())).pipe((0, _gulpSvgstore2.default)()).pipe((0, _gulpRename2.default)('sprites.svg'));

  (0, _arrayFlatten2.default)([config.dest]).forEach(function (dest) {
    pipeline = pipeline.pipe(_gulp2.default.dest(dest));
  });

  return pipeline;
}

function load(gulp, config) {
  gulp.task('sprites:build', function () {
    return process(config);
  });
  gulp.task('sprites:watch', function () {
    return gulp.watch(config.src, function () {
      return process(config).pipe(_browserSync2.default.stream());
    });
  });
  gulp.task('sprites:clean', function () {
    return (0, _del2.default)((0, _arrayFlatten2.default)([config.dest]).map(function (dest) {
      return dest + '/sprites.svg';
    }));
  });
}

exports.default = process;