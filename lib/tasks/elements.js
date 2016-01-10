'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = exports.clean = exports.watch = exports.build = exports.lint = exports.defaultConfig = undefined;

var _gulp = require('gulp');

var _browserSync = require('./browserSync');

var _gulpMultidest = require('../util/gulp-multidest');

var _gulpMultidest2 = _interopRequireDefault(_gulpMultidest);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _gulpVulcanize = require('gulp-vulcanize');

var _gulpVulcanize2 = _interopRequireDefault(_gulpVulcanize);

var _gulpUglify = require('gulp-uglify');

var _gulpUglify2 = _interopRequireDefault(_gulpUglify);

var _gulpCrisper = require('gulp-crisper');

var _gulpCrisper2 = _interopRequireDefault(_gulpCrisper);

var _webComponentTester = require('web-component-tester');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

var _env = require('../util/env');

var _gulpUtil = require('gulp-util');

var _styles = require('./styles');

var styles = _interopRequireWildcard(_styles);

var _scripts = require('./scripts');

var scripts = _interopRequireWildcard(_scripts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Elements
// ========

var defaultConfig = exports.defaultConfig = {
  entry: 'index.html',
  minify: (0, _env.prod)()
};

var temp = function temp(config) {
  return _path2.default.relative(process.cwd(), _path2.default.resolve(config.base + '/../elements.tmp'));
};
var js = function js(config) {
  return config.base + '/**/*.{' + scripts.supportedExts.join('') + '}';
};

// Lint
// ----

function lint(config, gulp) {
  return scripts.lint({
    all: js(config)
  }, gulp);
}
lint.displayName = 'elements:lint';
lint.description = 'Lint elements';

exports.lint = lint;

// Build
// -----

function build(done, _config, gulp) {
  var config = Object.assign({}, defaultConfig, _config);
  var tmp = temp(config);
  var jsExts = scripts.supportedExts.filter(function (ext) {
    return ext !== 'html';
  }).join();

  (0, _gulp.series)(
  // Create temporary working directory
  function () {
    return (0, _gulp.src)(config.base + '/**/*', { since: gulp.lastRun('elements:build') }).pipe((0, _gulp.dest)(tmp));
  }, (0, _gulp.parallel)(
  // Styles
  function () {
    return styles.build({
      src: tmp + '/**/*.{' + styles.supportedExts.join() + '}',
      dest: tmp,
      modularize: true,
      minify: config.minify,
      includePaths: config.includePaths
    });
  },
  // Scripts
  function (cb) {
    return scripts.build(cb, {
      all: js(config),
      src: [tmp + '/**/*.{' + jsExts + '}', tmp + '/**/__tests__/**/*.html'],
      dest: tmp,
      sourcemaps: false,
      // we'll minify at end
      minify: false
    }, gulp);
  }),
  // Templates
  function () {
    return (0, _gulp.src)(tmp + '/' + config.entry).pipe((0, _gulpVulcanize2.default)({
      inlineScripts: true,
      inlineCss: true
    })).pipe((0, _gulpCrisper2.default)()).pipe((0, _gulpIf2.default)('*.js', config.minify ? (0, _gulpUglify2.default)(scripts.defaultConfig.uglify) : (0, _gulpUtil.noop)())).pipe((0, _gulpMultidest2.default)(config.dest)).pipe((0, _browserSync.stream)());
  })(done);
}
build.displayName = 'elements:build';
build.description = 'Build elements';

exports.build = build;

// Watch
// -----

function watch(config) {
  (0, _gulp.watch)([config.base + '/**/*', '!' + config.base + '/**/__tests__/**/*'], function (done) {
    return build(done, config);
  });
}
watch.displayName = 'elements:watch';
watch.description = 'Watch elements for changes and re-build';

exports.watch = watch;

// Clean
// -----

function clean(config) {
  return (0, _del2.default)((0, _arrayFlatten2.default)([config.dest]).concat(temp(config)));
}
clean.displayName = 'elements:clean';
clean.description = 'Clean elements';

exports.clean = clean;

// Test
// ----

function test(done, config, gulp) {
  (0, _gulp.series)(function (cb) {
    return build(cb, config, gulp);
  }, function (cb) {
    return (0, _webComponentTester.test)({
      suites: [temp(config) + '/**/__tests__/**/*.html']
    }, cb);
  })(done);
}
test.displayName = 'elements:test';
test.description = 'Test elements';

exports.test = test;