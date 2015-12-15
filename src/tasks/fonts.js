import gulp from 'gulp';
import size from 'gulp-size';
import browserSync from 'browser-sync';
import del from 'del';
import flatten from 'array-flatten';

export function process(config) {
  let pipeline = gulp.src(config.src);

  flatten([config.dest]).forEach(function(dest) {
    pipeline = pipeline.pipe(gulp.dest(dest));
  });

  return pipeline
    .pipe(size({title: 'fonts'}));
};

export function load(gulp, config) {
  gulp.task('fonts:build', () => process(config));
  gulp.task('fonts:watch', () => gulp.watch(config.src, () => process(config).pipe(browserSync.get('assets').stream())));
  gulp.task('fonts:clean', () => del(config.dest));
};

export default process;