import {src, watch as _watch} from 'gulp';
import multidest from '../util/gulp-multidest';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';
import {stream} from './browserSync';
import del from 'del';
import flatten from 'array-flatten';
import {prod} from '../util/env';
import bindProps from '../util/bind-properties';

// Sprites
// =======

export const defaultConfig = {
  minify: prod(),
  bundle: 'sprites.svg',
  svgmin: {},
  svgstore: {
    inlineSvg: true
  }
};

// Build
// -----

function build(_config) {
  const config = Object.assign({}, defaultConfig, _config);

  return src(config.src)
    .pipe(gulpif(config.minify, svgmin(config.svgmin)))
    .pipe(svgstore(config.svgstore))
    .pipe(rename(config.bundle))
    .pipe(multidest(config.dest))
    .pipe(stream());
}
build.displayName = 'sprites:build';
build.description = 'Build sprites';

export {build};

// Watch
// -----

function watch(config) {
  _watch(config.src, () => build(config));
}
watch.displayName = 'sprites:watch';
watch.description = 'Watch sprites for changes and re-build';

export {watch};

// Clean
// -----

function clean(config) {
  return del(flatten([config.dest]).map(dest => `${dest}/${config.bundle}`));
}
clean.displayName = 'sprites:clean';
clean.description = 'Clean sprites';

export {clean};
