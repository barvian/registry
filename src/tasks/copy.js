import {src, watch as _watch} from 'gulp';
import multidest from '../util/gulp-multidest';
import {stream} from './browserSync';
import del from 'del';
import flatten from 'array-flatten';

// Copy
// ====

// Build
// -----

function build(config, gulp) {
  return src(
    config.src, config.base ? {
      base: config.base,
      cwd: config.base,
      dot: true,
      since: gulp.lastRun('copy:build')
    } : {since: gulp.lastRun('copy:build')})
    .pipe(multidest(config.dest))
    .pipe(stream());
}
build.displayName = 'copy:build';
build.description = 'Build copies';

export {build};

// Watch
// -----

function watch(config) {
  _watch(config.src, () => build(config));
}
watch.displayName = 'copy:watch';
watch.description = 'Watch fonts for changes and re-build';

export {watch};

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

export {clean};
