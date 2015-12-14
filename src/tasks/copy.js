import gulp from 'gulp';
import gulpif from 'gulp-if';
import browserSync from 'browser-sync';
import del from 'del';
import flatten from 'array-flatten';

export function copy(config) {
  let pipeline = gulp.src(config.src, { base: config.base, cwd: config.base, dot: true });

  flatten([config.dest]).forEach(function(dest) {
    pipeline = pipeline.pipe(gulp.dest(dest));
  });

  return pipeline;
};

export function load(gulp, config) {
  gulp.task('copy:build', () => copy(config));
  gulp.task('copy:watch', () => gulp.watch(config.src, () => copy(config).pipe(browserSync.get('assets').stream())));
  gulp.task('copy:clean', (cb) => del(config.src, { cwd: flatten([config.dest])[0], dot: true }, cb));
};

export default copy;