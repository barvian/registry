import gulp from 'gulp';
import {stream} from './browserSync';
import multidest from '../util/gulp-multidest';
import del from 'del';
import flatten from 'array-flatten';

// Fonts
// =====

export const configurable = true;
export const defaultConfig = {};

// Build
// -----

function build() {
  let config = Object.assign({}, defaultConfig, this);

  return gulp.src(config.src, {since: gulp.lastRun('fonts:build')})
    .pipe(multidest(config.dest))
    .pipe(stream());
}
build.displayName = 'fonts:build';
build.description = 'Build fonts';

export {build};

// Watch
// -----

function watch() {
  let config = Object.assign({}, defaultConfig, this);

  gulp.watch(config.src, build.bind(this));
}
watch.displayName = 'fonts:watch';
watch.description = 'Watch fonts for changes and re-build';

export {watch};

// Clean
// -----

function clean() {
  let config = Object.assign({}, defaultConfig, this);

  return del(flatten([config.dest]));
}
clean.displayName = 'fonts:clean';
clean.description = 'Clean fonts';

export {clean};
