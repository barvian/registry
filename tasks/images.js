'use strict';

const _gulp = require('gulp');
const multidest = require('../util/gulp-multidest');
const imagemin = require('gulp-imagemin');
const gulpif = require('gulp-if');
const pngquant = require('imagemin-pngquant');
const stream = require('./browserSync').stream;
const del = require('del');
const flatten = require('array-flatten');
const prod = require('../util/env').prod;

// Images
// ======

const defaultConfig = {
  minify: prod(),
  imagemin: {
    progressive: true,
    interlaced: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }
};

module.exports = {defaultConfig, build, watch, clean};

// Build
// -----

function build(_config, gulp) {
  const config = Object.assign({}, defaultConfig, _config);

  return _gulp.src(config.src, {since: gulp.lastRun('images:build')})
    .pipe(gulpif(config.minify, imagemin(config.imagemin)))
    .pipe(multidest(config.dest))
    .pipe(stream());
}
build.displayName = 'images:build';
build.description = 'Compress images';

// Watch
// -----

function watch(config, gulp) {
  _gulp.watch(config.src, () => build(config, gulp));
}
watch.displayName = 'images:watch';
watch.description = 'Watch images for changes and re-compress';

// Clean
// -----

function clean(config) {
  return del(flatten([config.dest]));
}
clean.displayName = 'images:clean';
clean.description = 'Clean fonts';
