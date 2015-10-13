import gulp from 'gulp';
import {styles as config} from '../config';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import minifyCSS from 'gulp-minify-css';
import sass from 'gulp-sass';
import size from 'gulp-size';
import gulpif from 'gulp-if';
import filter from 'gulp-filter';
import pixrem from 'gulp-pixrem';
import browserSync from 'browser-sync';

const compile = watch => {
  const pipeline = gulp.src(config.source)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: config.includePaths,
      precision: 10
    }).on('error', sass.logError))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(pixrem())
    // Concatenate and minify styles
    .pipe(gulpif('*.css', minifyCSS()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest))
    .pipe(filter('*.css'))
    .pipe(size({title: 'styles'}));

  return watch ? pipeline.pipe(browserSync.get('assets').stream()) : pipeline
};

gulp.task('styles', () => compile());
gulp.task('styles:watch', () => compile(true));
