'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultConfig = exports.requiredLintFiles = exports.supportedExts = undefined;
exports.compile = compile;
exports.compileBundle = compileBundle;
exports.lint = lint;
exports.load = load;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpFilter = require('gulp-filter');

var _gulpFilter2 = _interopRequireDefault(_gulpFilter);

var _gulpUglify = require('gulp-uglify');

var _gulpUglify2 = _interopRequireDefault(_gulpUglify);

var _gulpSourcemaps = require('gulp-sourcemaps');

var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

var _gulpJshint = require('gulp-jshint');

var _gulpJshint2 = _interopRequireDefault(_gulpJshint);

var _gulpJscs = require('gulp-jscs');

var _gulpJscs2 = _interopRequireDefault(_gulpJscs);

var _gulpJscsStylish = require('gulp-jscs-stylish');

var _gulpJscsStylish2 = _interopRequireDefault(_gulpJscsStylish);

var _gulpHtmlExtract = require('gulp-html-extract');

var _gulpHtmlExtract2 = _interopRequireDefault(_gulpHtmlExtract);

var _browserify = require('browserify');

var _browserify2 = _interopRequireDefault(_browserify);

var _watchify = require('watchify');

var _watchify2 = _interopRequireDefault(_watchify);

var _babelify = require('babelify');

var _babelify2 = _interopRequireDefault(_babelify);

var _debowerify = require('debowerify');

var _debowerify2 = _interopRequireDefault(_debowerify);

var _vinylSourceStream = require('vinyl-source-stream');

var _vinylSourceStream2 = _interopRequireDefault(_vinylSourceStream);

var _vinylBuffer = require('vinyl-buffer');

var _vinylBuffer2 = _interopRequireDefault(_vinylBuffer);

var _browserSync = require('./browserSync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

var _env = require('../util/env');

var _ensureFiles = require('../util/ensure-files');

var _ensureFiles2 = _interopRequireDefault(_ensureFiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var supportedExts = exports.supportedExts = ['js', 'es6'];
var requiredLintFiles = exports.requiredLintFiles = ['.jscsrc', '.jshintrc', '.bowerrc'];

var defaultConfig = exports.defaultConfig = {
  sourcemaps: true,
  minify: (0, _env.prod)(),
  uglify: {}
};

function compile(config) {
  config = Object.assign(defaultConfig, config);
  var pipeline = _gulp2.default.src(config.src).pipe((0, _gulpIf2.default)(config.sourcemaps, _gulpSourcemaps2.default.init())).pipe((0, _gulpBabel2.default)()).pipe((0, _gulpIf2.default)(config.minify, (0, _gulpUglify2.default)(config.uglify))).pipe((0, _gulpIf2.default)(config.sourcemaps, _gulpSourcemaps2.default.write('.')));

  (0, _arrayFlatten2.default)([config.dest]).forEach(function (dest) {
    pipeline = pipeline.pipe(_gulp2.default.dest(dest));
  });

  return pipeline;
}

function compileBundle(config, watch) {
  config = Object.assign(defaultConfig, config);
  var bundler = (0, _browserify2.default)(config.src, { debug: false }).transform(_babelify2.default).transform(_debowerify2.default);

  var rebundle = function rebundle() {
    var pipeline = bundler.bundle().on('error', function (err) {
      console.error(err);this.emit('end');
    }).pipe((0, _vinylSourceStream2.default)(config.bundle)).pipe((0, _vinylBuffer2.default)());

    if ((0, _env.prod)()) {
      pipeline = pipeline.pipe((0, _gulpIf2.default)(config.sourcemaps, _gulpSourcemaps2.default.init())).pipe((0, _gulpIf2.default)(config.minify, (0, _gulpUglify2.default)(config.uglify))).pipe((0, _gulpIf2.default)(config.sourcemaps, _gulpSourcemaps2.default.write('.')));
    }

    (0, _arrayFlatten2.default)([config.dest]).forEach(function (dest) {
      pipeline = pipeline.pipe(_gulp2.default.dest(dest));
    });

    pipeline = pipeline;

    return watch ? pipeline.pipe(_browserSync2.default.stream()) : pipeline;
  };

  if (watch) {
    console.log('watching');
    bundler = (0, _watchify2.default)(bundler);
    bundler.on('update', function () {
      rebundle();
    });
  }

  return rebundle();
}

function lint(config) {
  config = Object.assign(defaultConfig, config);

  (0, _ensureFiles2.default)(requiredLintFiles.map(function (p) {
    return _path2.default.join(process.cwd(), p);
  }));
  return _gulp2.default.src(config.all).pipe(_browserSync2.default.reload({
    stream: true,
    once: true
  })).pipe((0, _gulpIf2.default)('*.html', (0, _gulpHtmlExtract2.default)({ strip: true }))).pipe((0, _gulpJshint2.default)()).pipe((0, _gulpJscs2.default)()).pipe(_gulpJscsStylish2.default.combineWithHintResults()).pipe(_gulpJshint2.default.reporter('jshint-stylish')).pipe((0, _gulpIf2.default)(!_browserSync2.default.active, _gulpJshint2.default.reporter('fail')));
}

function load(gulp, config) {
  gulp.task('scripts:build', function () {
    return config.bundle ? compileBundle(config) : compile(config);
  });
  gulp.task('scripts:watch', function () {
    return config.bundle ? compileBundle(config, true) : gulp.watch(config.src, function () {
      return compile(config).pipe(_browserSync2.default.stream());
    });
  });
  gulp.task('scripts:clean', function () {
    return (0, _del2.default)((0, _arrayFlatten2.default)([config.dest]).map(function (dest) {
      return config.bundle ? dest + '/' + config.bundle + '*' : dest + '/*.js*';
    }));
  });

  gulp.task('scripts:lint', function () {
    return lint(config);
  });
  gulp.task('scripts:lint:watch', function () {
    return gulp.watch(config.all, function () {
      return lint(config);
    });
  });
}

exports.default = compile;