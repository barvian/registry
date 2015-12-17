import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import minifyCSS from 'gulp-minify-css';
import sass from 'gulp-sass';
import size from 'gulp-size';
import gulpif from 'gulp-if';
import filter from 'gulp-filter';
import pixrem from 'gulp-pixrem';
import browserSync from './browserSync';
import jsonImporter from 'node-sass-json-importer';
import del from 'del';
import flatten from 'array-flatten';
import fs from 'fs';
import filelist from 'gulp-filelist';
import {prod} from '../util/env';
import {noop} from 'gulp-util';
import delTracked from '../util/delete-tracked';

const logFile = 'styles.log';

export function process(config) {
  const sassFilter = filter(['*.scss', '*.sass'], { restore: true });

  let pipeline = gulp.src(config.src)
    .pipe(sourcemaps.init())
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
    .pipe(gulpif('*.css', prod() ? minifyCSS({
      mediaMerging: false
    }) : noop()))
    .pipe(sourcemaps.write('.'))
    .pipe(filelist(logFile, { flatten: true }));

  flatten([config.dest]).forEach(function(dest) {
    pipeline = pipeline.pipe(gulp.dest(dest));
  });

  return pipeline
    .pipe(filter('*.css'))
    .pipe(size({title: 'styles'}));
};

export function load(gulp, config) {
  gulp.task('styles:build', () => process(config));
  gulp.task('styles:watch', () => gulp.watch(config.all, () => process(config).pipe(browserSync.stream())));
  gulp.task('styles:clean', (cb) => delTracked(cb, config.dest, logFile, ['.sass-cache/']));
};

export default process;
