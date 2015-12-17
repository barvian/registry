import gulp from 'gulp';
import size from 'gulp-size';
import browserSync from './browserSync';
import del from 'del';
import flatten from 'array-flatten';
import filelist from 'gulp-filelist';
import delTracked from '../util/delete-tracked';

const logFile = 'fonts.log';

export function process(config) {
  let pipeline = gulp.src(config.src)
    .pipe(filelist(logFile, { flatten: true }));

  flatten([config.dest]).forEach(function(dest) {
    pipeline = pipeline.pipe(gulp.dest(dest));
  });

  return pipeline
    .pipe(size({title: 'fonts'}));
};

export function load(gulp, config) {
  gulp.task('fonts:build', () => process(config));
  gulp.task('fonts:watch', () => gulp.watch(config.src, () => process(config).pipe(browserSync.stream())));
  gulp.task('fonts:clean', (cb) => delTracked(cb, config.dest, logFile));
};

export default process;