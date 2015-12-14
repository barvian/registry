import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import minifyCSS from 'gulp-minify-css';
import sass from 'gulp-sass';
import size from 'gulp-size';
import gulpif from 'gulp-if';
import filter from 'gulp-filter';
import pixrem from 'gulp-pixrem';
import browserSync from 'browser-sync';
import jsonImporter from 'node-sass-json-importer';
import del from 'del';
import flatten from 'array-flatten';

export function process(config) {
  let pipeline = gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      importer: jsonImporter,
      includePaths: config.includePaths,
      precision: 10
    }).on('error', sass.logError))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(pixrem())
    // Concatenate and minify styles
    .pipe(gulpif('*.css', minifyCSS({
      mediaMerging: false
    })))
    .pipe(sourcemaps.write('.'));

  flatten([config.dest]).forEach(function(dest) {
    pipeline = pipeline.pipe(gulp.dest(dest));
  });

  return pipeline
    .pipe(filter('*.css'))
    .pipe(size({title: 'styles'}));
};

export function load(gulp, config) {
  gulp.task('styles:build', () => process(config));
  gulp.task('styles:watch', () => gulp.watch(config.all, () => process(config).pipe(browserSync.get('assets').stream())));
  gulp.task('styles:clean', (cb) => del(flatten([config.dest, '.sass-cache/']), cb));
};

export default process;
