import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import pngquant from 'imagemin-pngquant';
import browserSync from './browserSync';
import del from 'del';
import flatten from 'array-flatten';
import {prod} from '../util/env';

export function process(config) {
  let pipeline = gulp.src(config.src)
    .pipe(changed(flatten([config.dest])[0]))
    .pipe(gulpif(prod(), imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })));

  flatten([config.dest]).forEach(function(dest) {
    pipeline = pipeline.pipe(gulp.dest(dest));
  });

  return pipeline;
}

export function load(gulp, config) {
  gulp.task('images:build', () => process(config));
  gulp.task('images:watch', () => gulp.watch(config.src, () => process(config).pipe(browserSync.stream())));
  gulp.task('images:clean', () => del(flatten([config.dest])));
}

export default process;