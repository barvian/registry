import gulp from 'gulp';
import {copy as config} from '../config';
import gulpif from 'gulp-if';
import browserSync from 'browser-sync';

const copy = watch => {
  const pipeline = gulp.src(config.source, { base: config.base, dot: true })
    .pipe(gulp.dest(config.dest))
    
  return watch ? pipeline.pipe(browserSync.get('assets').stream()) : pipeline
};

gulp.task('copy', () => copy());
gulp.task('copy:watch', () => copy(true));
