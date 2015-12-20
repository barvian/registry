'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultConfig = exports.supportedExts = undefined;
exports.process = process;
exports.processBundle = processBundle;
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

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _arrayFlatten = require('array-flatten');

var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);

var _env = require('../util/env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var supportedExts = exports.supportedExts = ['js', 'es6'];

var defaultConfig = exports.defaultConfig = {
  sourcemaps: true,
  minify: (0, _env.prod)(),
  uglify: {
    preserveComments: 'some'
  }
};

function process(config) {
  config = Object.assign(defaultConfig, config);
  var pipeline = _gulp2.default.src(config.src).pipe((0, _gulpIf2.default)(config.sourcemaps, _gulpSourcemaps2.default.init())).pipe((0, _gulpBabel2.default)()).pipe((0, _gulpIf2.default)(config.minify, (0, _gulpUglify2.default)(config.uglify))).pipe((0, _gulpIf2.default)(config.sourcemaps, _gulpSourcemaps2.default.write('.')));

  (0, _arrayFlatten2.default)([config.dest]).forEach(function (dest) {
    pipeline = pipeline.pipe(_gulp2.default.dest(dest));
  });

  return pipeline;
}

function processBundle(config, watch) {
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

function load(gulp, config) {
  gulp.task('scripts:build', function () {
    return config.bundle ? processBundle(config) : process(config);
  });
  gulp.task('scripts:watch', function () {
    return config.bundle ? processBundle(config, true) : gulp.watch(config.src, function () {
      return process(config).pipe(_browserSync2.default.stream());
    });
  });
  gulp.task('scripts:clean', function () {
    return (0, _del2.default)((0, _arrayFlatten2.default)([config.dest]).map(function (dest) {
      return config.bundle ? dest + '/' + config.bundle + '*' : dest + '/*.js*';
    }));
  });
}

exports.default = process;