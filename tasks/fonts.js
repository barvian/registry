'use strict';

const _gulp = require('gulp');
const stream = require('./browserSync').stream;
const multidest = require('../util/gulp-multidest');
const del = require('del');
const flatten = require('array-flatten');

// Fonts
// =====

module.exports = {build, watch, clean};

// Build
// -----

function build(config, gulp) {
  return _gulp.src(config.src, {since: gulp.lastRun('fonts:build')})
    .pipe(multidest(config.dest))
    .pipe(stream());
}
build.displayName = 'fonts:build';
build.description = 'Build fonts';

// Watch
// -----

function watch(config, gulp) {
  _gulp.watch(config.src, () => build(config, gulp));
}
watch.displayName = 'fonts:watch';
watch.description = 'Watch fonts for changes and re-build';

// Clean
// -----

function clean(config) {
  return del(flatten([config.dest]));
}
clean.displayName = 'fonts:clean';
clean.description = 'Clean fonts';
