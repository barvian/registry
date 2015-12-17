import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import size from 'gulp-size';
import browserSync from './browserSync';
import del from 'del';
import rename from 'gulp-rename';
import flatten from 'array-flatten';
import gulpif from 'gulp-if';
import {prod} from '../util/env';

export function process(config) {
  let pipeline = gulp.src(config.src)
    .pipe(gulpif(prod(), svgmin()))
    .pipe(svgstore())
    .pipe(rename('sprites.svg'));

  flatten([config.dest]).forEach(function(dest) {
    pipeline = pipeline.pipe(gulp.dest(dest));
  });

  return pipeline
    .pipe(size({title: 'sprites'}));
};

export function load(gulp, config) {
  gulp.task('sprites:build', () => process(config));
  gulp.task('sprites:watch', () => gulp.watch(config.src, () => process(config).pipe(browserSync.stream())));
  gulp.task('sprites:clean', () => del(flatten([config.dest]).map(dest => `${dest}/sprites.svg`)));
};

export default process;
