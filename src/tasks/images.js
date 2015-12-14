import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import changed from 'gulp-changed';
import pngquant from 'imagemin-pngquant';
import gulpif from 'gulp-if';
import size from 'gulp-size';
import browserSync from 'browser-sync';
import del from 'del';
import flatten from 'array-flatten';

export function process(config) {
  let pipeline = gulp.src(config.src)
    .pipe(changed(flatten([config.dest])[0]))
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }));

  flatten([config.dest]).forEach(function(dest) {
    pipeline = pipeline.pipe(gulp.dest(dest));
  });

  return pipeline
    .pipe(size({title: 'images'}));
};

export function load(gulp, config) {
  gulp.task('images:build', () => process(config));
  gulp.task('images:watch', () => gulp.watch(config.src, () => process(config).pipe(browserSync.get('assets').stream())));
  gulp.task('images:clean', (cb) => del(config.dest, cb));
};

export default process;