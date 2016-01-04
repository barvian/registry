import gulp from 'gulp';
import multidest from '../util/gulp-multidest';
import imagemin from 'gulp-imagemin';
import gulpif from 'gulp-if';
import pngquant from 'imagemin-pngquant';
import {stream} from './browserSync';
import del from 'del';
import flatten from 'array-flatten';
import {prod} from '../util/env';

// Images
// ======

export const configurable = true;
export const defaultConfig = {
  minify: prod(),
  imagemin: {
    progressive: true,
    interlaced: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }
};

// Build
// -----

function build() {
  let config = Object.assign({}, defaultConfig, this);

  return gulp.src(config.src, {since: gulp.lastRun('images:build')})
    .pipe(gulpif(config.minify, imagemin(config.imagemin)))
    .pipe(multidest(config.dest))
    .pipe(stream());
}
build.displayName = 'images:build';
build.description = 'Compress images';

export {build};

// Watch
// -----

function watch() {
  let config = Object.assign({}, defaultConfig, this);

  gulp.watch(config.src, build.bind(this));
}
watch.displayName = 'images:watch';
watch.description = 'Watch images for changes and re-compress';

export {watch};

// Clean
// -----

function clean() {
  let config = Object.assign({}, defaultConfig, this);

  return del(flatten([config.dest]));
}
clean.displayName = 'images:clean';
clean.description = 'Clean fonts';

export {clean};
