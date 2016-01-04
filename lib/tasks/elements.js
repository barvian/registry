'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = exports.clean = exports.watch = exports.build = exports.lint = exports.defaultConfig = exports.configurable = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

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

var configurable = exports.configurable = true;
var defaultConfig = exports.defaultConfig = {
  minify: (0, _env.prod)()
};

var temp = function temp(config) {
  return _path2.default.relative(process.cwd(), _path2.default.resolve(config.base + '/../elements.tmp'));
};
var all = function all(config) {
  return config.base + '/**/*.{js,html}';
};

// Lint
// ----

function lint() {
  var config = Object.assign({}, defaultConfig, this);

  return scripts.lint.call({
    all: all(config)
  });
}
lint.displayName = 'elements:lint';
lint.description = 'Lint elements';

exports.lint = lint;

// Build
// -----

function build(done) {
  var config = Object.assign({}, defaultConfig, this);
  var tmp = temp(config);
  var js = scripts.supportedExts.filter(function (ext) {
    return ext !== 'html';
  }).join();

  _gulp2.default.series(
  // Create temporary working directory
  function () {
    return _gulp2.default.src(config.base + '/**/*', { since: _gulp2.default.lastRun(build) }).pipe(_gulp2.default.dest(tmp));
  }, _gulp2.default.parallel(
  // Styles
  styles.build.bind({
    src: tmp + '/**/*.{' + styles.supportedExts.join() + '}',
    dest: tmp,
    modularize: true,
    minify: config.minify
  }),
  // Scripts
  scripts.build.bind({
    all: all(config),
    src: [tmp + '/**/*.{' + js + '}', tmp + '/**/__tests__/**/*.html'],
    dest: tmp,
    sourcemaps: false,
    // we'll minify at end
    minify: false
  })),
  // Templates
  function () {
    return _gulp2.default.src(tmp + '/' + config.entry).pipe((0, _gulpVulcanize2.default)({
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

function watch() {
  var config = Object.assign({}, defaultConfig, this);

  _gulp2.default.watch([config.base + '/**/*', '!' + config.base + '/**/__tests__/**/*'], build.bind(this));
}
watch.displayName = 'elements:watch';
watch.description = 'Watch elements for changes and re-build';

exports.watch = watch;

// Clean
// -----

function clean() {
  var config = Object.assign({}, defaultConfig, this);

  return (0, _del2.default)((0, _arrayFlatten2.default)([config.dest]).concat(temp(config)));
}
clean.displayName = 'elements:clean';
clean.description = 'Clean elements';

exports.clean = clean;

// Test
// ----

function test(done) {
  var config = Object.assign({}, defaultConfig, this);

  _gulp2.default.series(build.bind(this), function (cb) {
    return (0, _webComponentTester.test)({
      suites: [temp(config) + '/**/__tests__/**/*.html']
    }, cb);
  })(done);
}
test.displayName = 'elements:test';
test.description = 'Test elements';

exports.test = test;