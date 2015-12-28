import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import nano from 'gulp-cssnano';
import sass from 'gulp-sass';
import gulpif from 'gulp-if';
import filter from 'gulp-filter';
import pixrem from 'gulp-pixrem';
import styleMod from 'gulp-style-modules';
import {noop} from 'gulp-util';
import browserSync from './browserSync';
import jsonImporter from 'node-sass-json-importer';
import del from 'del';
import flatten from 'array-flatten';
import {prod} from '../util/env';

export const defaultConfig = {
  modularize: false,
  minify: prod(),
  sourcemaps: true,
  autoprefixer: {
    browsers: ['> 5%', 'last 2 versions'],
    cascade: false
  }
};
export const supportedExts = ['sass', 'scss', 'css']

export function compile(config) {
  config = Object.assign(defaultConfig, config);
  const sassFilter = filter(['*.scss', '*.sass'], { restore: true });

  let pipeline = gulp.src(config.src)
    .pipe(gulpif(!config.modularize && config.sourcemaps, sourcemaps.init()))
    .pipe(sassFilter)
    .pipe(sass({
      importer: jsonImporter,
      includePaths: config.includePaths,
      precision: 10
    }).on('error', sass.logError))
    .pipe(sassFilter.restore)
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(pixrem())
    // Concatenate and minify styles
    .pipe(gulpif('*.css', config.minify ? nano({
      mediaMerging: false
    }) : noop()))
    .pipe(gulpif(config.modularize, styleMod()))
    .pipe(gulpif(!config.modularize && config.sourcemaps, sourcemaps.write('.')));

  flatten([config.dest]).forEach(function(dest) {
    pipeline = pipeline.pipe(gulp.dest(dest));
  });

  return pipeline;
}

export function load(gulp, config) {
  gulp.task('styles:build', () => compile(config));
  gulp.task('styles:watch', () => gulp.watch(config.all, () => compile(config).pipe(browserSync.stream())));
  gulp.task('styles:clean', () => del(flatten([config.dest]).concat(['.sass-cache/'])));
}

export default compile;
