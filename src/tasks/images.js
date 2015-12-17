import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import changed from 'gulp-changed';
import pngquant from 'imagemin-pngquant';
import size from 'gulp-size';
import browserSync from './browserSync';
import del from 'del';
import flatten from 'array-flatten';
import gulpif from 'gulp-if';
import {prod} from '../util/env';
import filelist from 'gulp-filelist';
import delTracked from '../util/delete-tracked';

const logFile = 'images.log';

export function process(config) {
  let pipeline = gulp.src(config.src)
    .pipe(changed(flatten([config.dest])[0]))
    .pipe(filelist(logFile, { flatten: true }))
    .pipe(gulpif(prod(), imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })));

  flatten([config.dest]).forEach(function(dest) {
    pipeline = pipeline.pipe(gulp.dest(dest));
  });

  return pipeline
    .pipe(size({title: 'images'}));
};

export function load(gulp, config) {
  gulp.task('images:build', () => process(config));
  gulp.task('images:watch', () => gulp.watch(config.src, () => process(config).pipe(browserSync.stream())));
  gulp.task('images:clean', (cb) => delTracked(cb, config.dest, logFile));
};

export default process;