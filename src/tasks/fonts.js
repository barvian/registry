import gulp from 'gulp';
import {stream} from './browserSync';
import multidest from '../util/gulp-multidest';
import del from 'del';
import flatten from 'array-flatten';
import bindProps from '../util/bind-properties';

// Fonts
// =====

export const configurable = true;
export const defaultConfig = {};

// Build
// -----

function build() {
  const config = Object.assign({}, defaultConfig, this);

  return gulp.src(config.src, {since: gulp.lastRun(build)})
    .pipe(multidest(config.dest))
    .pipe(stream());
}
build.displayName = 'fonts:build';
build.description = 'Build fonts';

export {build};

// Watch
// -----

function watch() {
  const config = Object.assign({}, defaultConfig, this);

  gulp.watch(config.src, bindProps(build, this));
}
watch.displayName = 'fonts:watch';
watch.description = 'Watch fonts for changes and re-build';

export {watch};

// Clean
// -----

function clean() {
  const config = Object.assign({}, defaultConfig, this);

  return del(flatten([config.dest]));
}
clean.displayName = 'fonts:clean';
clean.description = 'Clean fonts';

export {clean};
