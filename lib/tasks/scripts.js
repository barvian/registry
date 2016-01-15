'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = exports.clean = exports.build = exports.lint = exports.defaultConfig = exports.supportedExts = undefined;

var _gulp = require('gulp');

var _browserSync = require('./browserSync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _gulpMultidest = require('../util/gulp-multidest');

var _gulpMultidest2 = _interopRequireDefault(_gulpMultidest);

var _lazypipe = require('lazypipe');

var _lazypipe2 = _interopRequireDefault(_lazypipe);

var _gulpUglify = require('gulp-uglify');

var _gulpUglify2 = _interopRequireDefault(_gulpUglify);

var _gulpSourcemaps = require('gulp-sourcemaps');

var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

var _gulpEslint = require('gulp-eslint');

var _gulpEslint2 = _interopRequireDefault(_gulpEslint);

var _gulpHtmlExtract = require('gulp-html-extract');

var _gulpHtmlExtract2 = _interopRequireDefault(_gulpHtmlExtract);

var _gulpCrisper = require('gulp-crisper');

var _gulpCrisper2 = _interopRequireDefault(_gulpCrisper);

var _browserify = require('browserify');

var _browserify2 = _interopRequireDefault(_browserify);

var _watchify = require('watchify');

var _watchify2 = _interopRequireDefault(_watchify);

var _babelify = require('babelify');

var _babelify2 = _interopRequireDefault(_babelify);

var _debowerify = require('debowerify');

var _debowerify2 = _interopRequireDefault(_debowerify);

var _browserifyData = require('browserify-data');

var _browserifyData2 = _interopRequireDefault(_browserifyData);

var _vinylSourceStream = require('vinyl-source-stream');

var _vinylSourceStream2 = _interopRequireDefault(_vinylSourceStream);

var _vinylBuffer = require('vinyl-buffer');

var _vinylBuffer2 = _interopRequireDefault(_vinylBuffer);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

var _env = require('../util/env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Scripts
// =======

var supportedExts = exports.supportedExts = ['js', 'es6', 'html'];
var defaultConfig = exports.defaultConfig = {
  sourcemaps: true,
  minify: (0, _env.prod)(),
  uglify: {},
  crisper: {
    scriptInHead: false
  }
};

// Lint
// ----

function lint(config, gulp, watch) {
  var pipeline = (0, _gulp.src)(config.all, { since: gulp.lastRun('scripts:lint') }).pipe((0, _gulpIf2.default)('*.html', (0, _gulpHtmlExtract2.default)({ strip: true }))).pipe((0, _gulpEslint2.default)({
    parser: 'babel-eslint',
    extends: 'google'
  })).pipe(_gulpEslint2.default.format()).pipe((0, _gulpIf2.default)(!_browserSync2.default.active, _gulpEslint2.default.failAfterError()));

  if (watch) {
    (0, _gulp._watch)(config.all, function () {
      return pipeline;
    });
  }
  return pipeline;
}
lint.displayName = 'scripts:lint';
lint.description = 'Lint scripts';

exports.lint = lint;

// Build
// -----

function compileBundle(config, watch) {
  var bundler = (0, _browserify2.default)(config.src, { debug: false }).transform(_babelify2.default).transform(_debowerify2.default).transform(_browserifyData2.default);

  var rebundle = function rebundle() {
    var minifyPipe = (0, _lazypipe2.default)().pipe(function () {
      return (0, _gulpIf2.default)(config.sourcemaps, _gulpSourcemaps2.default.init());
    }).pipe(_gulpUglify2.default, config.uglify).pipe(function () {
      return (0, _gulpIf2.default)(config.sourcemaps, _gulpSourcemaps2.default.write('.'));
    });

    return bundler.bundle().on('error', function (err) {
      console.error(err);
      this.emit('end');
    }).pipe((0, _vinylSourceStream2.default)(config.bundle)).pipe((0, _vinylBuffer2.default)()).pipe((0, _gulpIf2.default)(config.minify, minifyPipe())).pipe((0, _gulpMultidest2.default)(config.dest)).pipe((0, _gulpIf2.default)(watch, (0, _browserSync.stream)()));
  };

  if (watch) {
    bundler = (0, _watchify2.default)(bundler);
    bundler.on('update', function () {
      rebundle();
    });
  }

  return rebundle();
}

function compile(config, gulp, watch) {
  var pipeline = (0, _gulp.src)(config.src, { since: gulp.lastRun(compile) }).pipe((0, _gulpIf2.default)('*.html', (0, _gulpCrisper2.default)(config.crisper))).pipe((0, _gulpIf2.default)(config.sourcemaps, _gulpSourcemaps2.default.init())).pipe((0, _gulpIf2.default)(/\.(js|es6)$/, (0, _gulpBabel2.default)())).pipe((0, _gulpIf2.default)(config.minify, (0, _gulpUglify2.default)(config.uglify))).pipe((0, _gulpIf2.default)(config.sourcemaps, _gulpSourcemaps2.default.write('.'))).pipe((0, _gulpMultidest2.default)(config.dest)).pipe((0, _gulpIf2.default)(watch, (0, _browserSync.stream)()));

  if (watch) {
    (0, _gulp._watch)(config.all, function () {
      return pipeline;
    });
  }
  return pipeline;
}

function build(done, config, gulp, watch) {
  (0, _gulp.series)(function () {
    return lint(config, gulp, watch);
  }, function () {
    return config.bundle ? compileBundle(config, watch) : compile(config, gulp, watch);
  })(done);
}
build.displayName = 'scripts:build';
build.description = 'Build scripts';

exports.build = build;

// Clean
// -----

function clean(config) {
  return (0, _del2.default)((0, _arrayFlatten2.default)([config.dest]).map(function (dest) {
    return config.bundle ? dest + '/' + config.bundle + '*' : dest + '/*.js*';
  }));
}
clean.displayName = 'scripts:clean';
clean.description = 'Clean scripts';

exports.clean = clean;

// Watch
// -----

function watch(done, config, gulp) {
  return build(done, config, gulp, true);
}
watch.displayName = 'scripts:watch';
watch.description = 'Watch scripts for changes and re-build/lint';

exports.watch = watch;