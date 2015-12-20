'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = process;
exports.load = load;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpVulcanize = require('gulp-vulcanize');

var _gulpVulcanize2 = _interopRequireDefault(_gulpVulcanize);

var _gulpCrisper = require('gulp-crisper');

var _gulpCrisper2 = _interopRequireDefault(_gulpCrisper);

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

var _browserSync = require('./browserSync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

var _env = require('../util/env');

var _styles = require('./styles');

var styleTask = _interopRequireWildcard(_styles);

var _scripts = require('./scripts');

var scriptTask = _interopRequireWildcard(_scripts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function temp(config) {
  return _path2.default.resolve(config.base + '/../elements.tmp');
}

function process(config, watch) {
  var tmp = temp(config);

  return new Promise(function (res, rej) {
    // Copy
    _gulp2.default.src(config.base + '/**/*').pipe(_gulp2.default.dest(tmp)).on('end', res).on('error', rej);
  }).then(function () {
    return Promise.all([new Promise(function (res, rej) {
      // Styles
      styleTask.process({
        src: tmp + '/**/*.{' + styleTask.supportedExts.join() + '}',
        dest: tmp,
        modularize: true
      }).on('end', res).on('error', rej);
    }), new Promise(function (res, rej) {
      // Scripts
      scriptTask.process({
        src: tmp + '/**/*.{' + scriptTask.supportedExts.join() + '}',
        dest: tmp,
        sourcemaps: false
      }).on('end', res).on('error', rej);
    })]);
  }).then(function () {
    return new Promise(function (res, rej) {
      var pipeline = _gulp2.default.src(tmp + '/' + config.entry).pipe((0, _gulpVulcanize2.default)({
        inlineScripts: true,
        inlineCss: true
      })).pipe((0, _gulpCrisper2.default)());

      (0, _arrayFlatten2.default)([config.dest]).forEach(function (dest) {
        pipeline = pipeline.pipe(_gulp2.default.dest(dest));
      });
      if (watch) pipeline = pipeline.pipe(_browserSync2.default.stream());

      pipeline.on('end', res).on('error', rej);
    });
  });
}

function load(gulp, config) {
  gulp.task('elements:build', function () {
    return process(config);
  });
  gulp.task('elements:watch', function () {
    return gulp.watch(config.base + '/**/*', function () {
      return process(config, true);
    });
  });
  gulp.task('elements:clean', function () {
    return (0, _del2.default)((0, _arrayFlatten2.default)([config.dest]).concat(temp(config)));
  });
}