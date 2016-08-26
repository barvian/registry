'use strict';

const _gulp = require('gulp');
const stream = require('./browserSync').stream;
const multidest = require('../util/gulp-multidest');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const nano = require('gulp-cssnano');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const styleMod = require('gulp-style-modules');
const noop = require('gulp-util').noop;
const importOnce = require('node-sass-import-once');
const del = require('del');
const flatten = require('array-flatten');
const prod = require('../util/env').prod;

// Styles
// ======

const supportedExts = ['sass', 'scss', 'css'];
const defaultConfig = {
  modularize: false,
  minify: prod(),
  sourcemaps: true,
  autoprefixer: {
    browsers: ['> 5%', 'last 2 versions'],
    cascade: false
  },
  nano: {}
};

module.exports = {supportedExts, defaultConfig, build, watch, clean};

// Build
// -----

function build(_config) {
  const config = Object.assign({}, defaultConfig, _config);

  return _gulp.src(config.src)
    .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
    .pipe(gulpif(/\.(sass|scss)$/, sass({
      importer: importOnce,
      importOnce: {
        index: true,
        css: true,
        bower: true
      },
      includePaths: config.includePaths,
      precision: 10
    })).on('error', sass.logError))
    .pipe(autoprefixer(config.autoprefixer))
    // Concatenate and minify styles
    .pipe(gulpif('*.css', config.minify ? nano(config.nano) : noop()))
    .pipe(gulpif(config.modularize, styleMod()))
    .pipe(gulpif('*.css', config.sourcemaps ? sourcemaps.write('.') : noop()))
    .pipe(multidest(config.dest))
    .pipe(stream());
}
build.displayName = 'styles:build';
build.description = 'Build styles';

// Watch
// -----

function watch(config) {
  _gulp.watch(config.all, () => build(config));
}
watch.displayName = 'styles:watch';
watch.description = 'Watch styles for changes and re-build';

// Clean
// -----

function clean(config) {
  return del(flatten([config.dest]).concat(['.sass-cache/']));
}
clean.displayName = 'styles:clean';
clean.description = 'Clean styles';
