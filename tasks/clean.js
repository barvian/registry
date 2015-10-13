import gulp from 'gulp';
import del from 'del';
import {clean as config} from '../config';

/* Clean the public directory */
gulp.task('clean', (cb) => {
  del(config.all, cb);
});
