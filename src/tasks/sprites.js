import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';
import browserSync from './browserSync';
import del from 'del';
import flatten from 'array-flatten';
import {prod} from '../util/env';

export const defaultConfig = {
  minify: prod(),
  bundle: 'sprites.svg',
  svgmin: {}
}

export function combine(config) {
  config = Object.assign({}, defaultConfig, config);
  let pipeline = gulp.src(config.src)
    .pipe(gulpif(config.minify, svgmin(config.svgmin)))
    .pipe(svgstore())
    .pipe(rename(config.bundle));

  flatten([config.dest]).forEach(function(dest) {
    pipeline = pipeline.pipe(gulp.dest(dest));
  });

  return pipeline;
}

export function load(gulp, config) {
  gulp.task('sprites:build', () => combine(config));
  gulp.task('sprites:watch', () => gulp.watch(config.src, () => combine(config).pipe(browserSync.stream())));
  gulp.task('sprites:clean', () => del(flatten([config.dest]).map(dest => `${dest}/${config.bundle || defaultConfig.bundle}`)));
}

export default combine;
