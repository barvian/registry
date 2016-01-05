import gulp from 'gulp';
import {stream} from './browserSync';
import multidest from '../util/gulp-multidest';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import nano from 'gulp-cssnano';
import sass from 'gulp-sass';
import gulpif from 'gulp-if';
import pixrem from 'gulp-pixrem';
import styleMod from 'gulp-style-modules';
import {noop} from 'gulp-util';
import jsonImporter from 'node-sass-json-importer';
import del from 'del';
import flatten from 'array-flatten';
import {prod} from '../util/env';

// Styles
// ======

export const configurable = true;
export const supportedExts = ['sass', 'scss', 'css'];
export const defaultConfig = {
  modularize: false,
  minify: prod(),
  sourcemaps: true,
  autoprefixer: {
    browsers: ['> 5%', 'last 2 versions'],
    cascade: false
  },
  nano: {}
};

// Build
// -----

function build() {
  const config = Object.assign({}, defaultConfig, this);

  return gulp.src(config.src)
    .pipe(gulpif(!config.modularize && config.sourcemaps, sourcemaps.init()))
    .pipe(gulpif(/\.(sass|scss)$/, sass({
      importer: jsonImporter,
      includePaths: config.includePaths,
      precision: 10
    }).on('error', sass.logError)))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(pixrem())
    // Concatenate and minify styles
    .pipe(gulpif('*.css', config.minify ? nano(config.nano) : noop()))
    .pipe(gulpif(config.modularize, styleMod()))
    .pipe(gulpif(!config.modularize && config.sourcemaps, sourcemaps.write('.')))
    .pipe(multidest(config.dest))
    .pipe(stream());
}
build.displayName = 'styles:build';
build.description = 'Build styles';

export {build};

// Watch
// -----

function watch() {
  const config = Object.assign({}, defaultConfig, this);

  gulp.watch(config.all, build.bind(this));
}
watch.displayName = 'styles:watch';
watch.description = 'Watch styles for changes and re-build';

export {watch};

// Clean
// -----

function clean() {
  const config = Object.assign({}, defaultConfig, this);

  return del(flatten([config.dest]).concat(['.sass-cache/']));
}
clean.displayName = 'styles:clean';
clean.description = 'Clean styles';

export {clean};
