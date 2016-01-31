'use strict';

const _gulp = require('gulp');
const multidest = require('../util/gulp-multidest');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const stream = require('./browserSync').stream;
const del = require('del');
const flatten = require('array-flatten');
const prod = require('../util/env').prod;

// Sprites
// =======

const defaultConfig = {
  minify: prod(),
  bundle: 'sprites.svg',
  svgmin: {},
  svgstore: {
    inlineSvg: true
  }
};

module.exports = {defaultConfig, build, watch, clean};

// Build
// -----

function build(_config) {
  const config = Object.assign({}, defaultConfig, _config);

  return _gulp.src(config.src)
    .pipe(gulpif(config.minify, svgmin(config.svgmin)))
    .pipe(svgstore(config.svgstore))
    .pipe(rename(config.bundle))
    .pipe(multidest(config.dest))
    .pipe(stream());
}
build.displayName = 'sprites:build';
build.description = 'Build sprites';

// Watch
// -----

function watch(config) {
  _gulp.watch(config.src, () => build(config));
}
watch.displayName = 'sprites:watch';
watch.description = 'Watch sprites for changes and re-build';

// Clean
// -----

function clean(config) {
  return del(flatten([config.dest]).map(dest => `${dest}/${config.bundle}`));
}
clean.displayName = 'sprites:clean';
clean.description = 'Clean sprites';
