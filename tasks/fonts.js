import gulp from 'gulp';
import size from 'gulp-size';
import {fonts as config} from '../config';
import browserSync from 'browser-sync';

const copy = watch => {
  const pipeline = gulp.src(config.source)
    .pipe(gulp.dest(config.dest))
    .pipe(size({title: 'fonts'}));

  return watch ? pipeline.pipe(browserSync.get('assets').stream()) : pipeline
};

gulp.task('fonts', () => copy());
gulp.task('fonts:watch', () => copy(true));
