import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import changed from 'gulp-changed';
import pngquant from 'imagemin-pngquant';
import {images as config} from '../config';
import gulpif from 'gulp-if';
import size from 'gulp-size';
import browserSync from 'browser-sync';

const process = watch => {
  const pipeline = gulp.src(config.source)
    .pipe(changed(config.dest))
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(size({title: 'images'}));

  return watch ? pipeline.pipe(browserSync.get('assets').stream()) : pipeline
};

gulp.task('images', () => process());
gulp.task('images:watch', () => process(true));
