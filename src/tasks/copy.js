import gulp from 'gulp';
import multidest from '../util/gulp-multidest';
import gulpif from 'gulp-if';
import {stream} from './browserSync';
import del from 'del';
import flatten from 'array-flatten';

// Copy
// ====

export const configurable = true;
export const defaultConfig = {};

// Build
// -----

function build() {
  let config = Object.assign({}, defaultConfig, this);

  return gulp.src(
    config.src, {
      base: config.base,
      cwd: config.base,
      dot: true/*,
      since: gulp.lastRun('copy:build')*/
    })
    .pipe(multidest(config.dest))
    .pipe(stream());
}
build.displayName = 'copy:build';
build.description = 'Build copies';

export {build};


// Watch
// -----

function watch() {
  let config = Object.assign({}, defaultConfig, this);

  gulp.watch(config.src, build.bind(this));
}
watch.displayName = 'copy:watch';
watch.description = 'Watch fonts for changes and re-build';

export {watch};

// Clean
// -----

function clean() {
  let config = Object.assign({}, defaultConfig, this);

  return Promise.all(
    flatten([config.dest])
      .map(dest => del(config.src, { cwd: dest, dot: true }))
  );
}
clean.displayName = 'copy:clean';
clean.description = 'Clean copies';

export {clean};
