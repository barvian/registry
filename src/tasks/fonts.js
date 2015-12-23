import gulp from 'gulp';
import browserSync from './browserSync';
import del from 'del';
import flatten from 'array-flatten';

export function minify(config) {
  let pipeline = gulp.src(config.src);

  flatten([config.dest]).forEach(function(dest) {
    pipeline = pipeline.pipe(gulp.dest(dest));
  });

  return pipeline;
}

export function load(gulp, config) {
  gulp.task('fonts:build', () => minify(config));
  gulp.task('fonts:watch', () => gulp.watch(config.src, () => minify(config).pipe(browserSync.stream())));
  gulp.task('fonts:clean', () => del(flatten([config.dest])));
}

export default minify;