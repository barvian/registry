import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import pngquant from 'imagemin-pngquant';
import browserSync from './browserSync';
import del from 'del';
import flatten from 'array-flatten';
import {prod} from '../util/env';

export const defaultConfig = {
  minify: prod(),
  imagemin: {
    progressive: true,
    interlaced: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }
}

export function minify(config) {
  config = Object.assign({}, defaultConfig, config);
  let pipeline = gulp.src(config.src)
    .pipe(changed(flatten([config.dest])[0]))
    .pipe(gulpif(config.minify, imagemin(config.imagemin)));

  flatten([config.dest]).forEach(function(dest) {
    pipeline = pipeline.pipe(gulp.dest(dest));
  });

  return pipeline;
}

export function load(gulp, config) {
  gulp.task('images:build', () => minify(config));
  gulp.task('images:watch', () => gulp.watch(config.src, () => minify(config).pipe(browserSync.stream())));
  gulp.task('images:clean', () => del(flatten([config.dest])));
}

export default minify;