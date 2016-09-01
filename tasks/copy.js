'use strict';

const _gulp = require('gulp');
const multidest = require('../util/gulp-multidest');
const stream = require('./browserSync').stream;
const del = require('del');
const flatten = require('array-flatten');

// Copy
// ====

module.exports = {build, watch, clean};

// Build
// -----

function build(config, gulp) {
  return _gulp.src(
    config.src, config.base ? {
      base: config.base,
      cwd: config.base,
      dot: true/*,
      since: gulp.lastRun('copy:build')*/
    } : {/*since: gulp.lastRun('copy:build')*/})
    .pipe(multidest(config.dest))
    .pipe(stream());
}
build.displayName = 'copy:build';
build.description = 'Build copies';

// Watch
// -----

function watch(config) {
  _gulp.watch(config.src, () => build(config));
}
watch.displayName = 'copy:watch';
watch.description = 'Watch fonts for changes and re-build';

// Clean
// -----

function clean(config) {
  return config.base ? Promise.all(
    flatten([config.dest])
      .map(dest => del(config.src, {cwd: dest, dot: true}))
  ) : del(flatten([config.dest]));
}
clean.displayName = 'copy:clean';
clean.description = 'Clean copies';
