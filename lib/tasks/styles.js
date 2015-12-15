'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.














process = process;exports.
























load = load;var _gulp = require('gulp');var _gulp2 = _interopRequireDefault(_gulp);var _gulpSourcemaps = require('gulp-sourcemaps');var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);var _gulpAutoprefixer = require('gulp-autoprefixer');var _gulpAutoprefixer2 = _interopRequireDefault(_gulpAutoprefixer);var _gulpMinifyCss = require('gulp-minify-css');var _gulpMinifyCss2 = _interopRequireDefault(_gulpMinifyCss);var _gulpSass = require('gulp-sass');var _gulpSass2 = _interopRequireDefault(_gulpSass);var _gulpSize = require('gulp-size');var _gulpSize2 = _interopRequireDefault(_gulpSize);var _gulpIf = require('gulp-if');var _gulpIf2 = _interopRequireDefault(_gulpIf);var _gulpFilter = require('gulp-filter');var _gulpFilter2 = _interopRequireDefault(_gulpFilter);var _gulpPixrem = require('gulp-pixrem');var _gulpPixrem2 = _interopRequireDefault(_gulpPixrem);var _browserSync = require('browser-sync');var _browserSync2 = _interopRequireDefault(_browserSync);var _nodeSassJsonImporter = require('node-sass-json-importer');var _nodeSassJsonImporter2 = _interopRequireDefault(_nodeSassJsonImporter);var _del = require('del');var _del2 = _interopRequireDefault(_del);var _arrayFlatten = require('array-flatten');var _arrayFlatten2 = _interopRequireDefault(_arrayFlatten);var _path = require('path');var _path2 = _interopRequireDefault(_path);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function process(config) {var pipeline = _gulp2.default.src(config.src).pipe(_gulpSourcemaps2.default.init()).pipe((0, _gulpSass2.default)({ importer: _nodeSassJsonImporter2.default, includePaths: config.includePaths, precision: 10 }).on('error', _gulpSass2.default.logError)).pipe((0, _gulpAutoprefixer2.default)(config.autoprefixer)).pipe((0, _gulpPixrem2.default)()) // Concatenate and minify styles
  .pipe((0, _gulpIf2.default)('*.css', (0, _gulpMinifyCss2.default)({ mediaMerging: false }))).pipe(_gulpSourcemaps2.default.write('.'));(0, _arrayFlatten2.default)([config.dest]).forEach(function (dest) {pipeline = pipeline.pipe(_gulp2.default.dest(dest));});return pipeline.pipe((0, _gulpFilter2.default)('*.css')).pipe((0, _gulpSize2.default)({ title: 'styles' }));};function load(gulp, config) {gulp.task('styles:build', function () {return process(config);});
  gulp.task('styles:watch', function () {return gulp.watch(config.all, function () {return process(config).pipe(_browserSync2.default.get('assets').stream());});});

  var destFile = _path2.default.basename(config.src, _path2.default.extname(config.src));
  gulp.task('styles:clean', function () {return (0, _del2.default)((0, _arrayFlatten2.default)([config.dest]).map(function (dest) {return dest + '/' + destFile + '.css*';}).concat(['.sass-cache/']));});}
;exports.default = 

process;