import {src, watch as _watch} from 'gulp';
import {stream} from './browserSync';
import multidest from '../util/gulp-multidest';
import del from 'del';
import flatten from 'array-flatten';

// Fonts
// =====

// Build
// -----

function build(config, gulp) {
  return src(config.src, {since: gulp.lastRun('fonts:build')})
    .pipe(multidest(config.dest))
    .pipe(stream());
}
build.displayName = 'fonts:build';
build.description = 'Build fonts';

export {build};

// Watch
// -----

function watch(config, gulp) {
  _watch(config.src, () => build(config, gulp));
}
watch.displayName = 'fonts:watch';
watch.description = 'Watch fonts for changes and re-build';

export {watch};

// Clean
// -----

function clean(config) {
  return del(flatten([config.dest]));
}
clean.displayName = 'fonts:clean';
clean.description = 'Clean fonts';

export {clean};
