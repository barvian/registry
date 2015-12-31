'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = undefined;
exports.compile = compile;
exports.lint = lint;
exports.load = load;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _gulpVulcanize = require('gulp-vulcanize');

var _gulpVulcanize2 = _interopRequireDefault(_gulpVulcanize);

var _gulpUglify = require('gulp-uglify');

var _gulpUglify2 = _interopRequireDefault(_gulpUglify);

var _gulpCrisper = require('gulp-crisper');

var _gulpCrisper2 = _interopRequireDefault(_gulpCrisper);

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

var _browserSync = require('./browserSync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _webComponentTester = require('web-component-tester');

var _webComponentTester2 = _interopRequireDefault(_webComponentTester);

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

function all(config) {
  return config.base + '/**/*.{js,html}';
}

function compile(config, watch) {
  var tmp = temp(config);

  return new Promise(function (res, rej) {
    // Copy
    _gulp2.default.src(config.base + '/**/*').pipe(_gulp2.default.dest(tmp)).on('end', res).on('error', rej);
  }).then(function () {
    return Promise.all([new Promise(function (res, rej) {
      // Styles
      styleTask.compile({
        src: tmp + '/**/*.{' + styleTask.supportedExts.join() + '}',
        dest: tmp,
        modularize: true
      }).on('end', res).on('error', rej);
    }), new Promise(function (res, rej) {
      // Scripts
      scriptTask.compile({
        src: tmp + '/**/*.{' + scriptTask.supportedExts.join() + '}',
        dest: tmp,
        sourcemaps: false,
        minify: false // we'll minify at end
      }).on('end', res).on('error', rej);
    })]);
  }).then(function () {
    return new Promise(function (res, rej) {
      // Templates
      var pipeline = _gulp2.default.src(tmp + '/' + config.entry).pipe((0, _gulpVulcanize2.default)({
        inlineScripts: true,
        inlineCss: true
      })).pipe((0, _gulpCrisper2.default)()).pipe((0, _gulpIf2.default)('*.js', (0, _gulpUglify2.default)(scriptTask.defaultConfig.uglify)));

      (0, _arrayFlatten2.default)([config.dest]).forEach(function (dest) {
        pipeline = pipeline.pipe(_gulp2.default.dest(dest));
      });
      if (watch) pipeline = pipeline.pipe(_browserSync2.default.stream());

      pipeline.on('end', res).on('error', rej);
    });
  });
}

function lint(config) {
  return scriptTask.lint({
    all: all(config)
  });
}

exports.test = _webComponentTester2.default;
function load(gulp, config) {
  gulp.task('elements:build', function () {
    return compile(config);
  });
  gulp.task('elements:watch', function () {
    return gulp.watch(config.base + '/**/*', function () {
      return compile(config, true);
    });
  });
  gulp.task('elements:clean', function () {
    return (0, _del2.default)((0, _arrayFlatten2.default)([config.dest]).concat(temp(config)));
  });
  gulp.task('elements:test', function (cb) {
    return (0, _webComponentTester.test)({ suites: [config.base + '/**/__tests__/'] }, cb);
  });

  gulp.task('elements:lint', function () {
    return lint(config);
  });
  gulp.task('elements:lint:watch', function () {
    return gulp.watch(all(config), function () {
      return lint(config);
    });
  });
}

exports.default = compile;