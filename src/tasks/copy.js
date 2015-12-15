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
  gulp.task('copy:clean', () => Promise.all(flatten([config.dest]).map(dest => del(config.src, { cwd: dest, dot: true }))));
};

export default copy;