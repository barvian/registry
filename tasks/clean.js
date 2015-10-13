var gulp from 'gulp';
var del from 'del';
var {clean as config} from '../config';

/* Clean the public directory */
gulp.task('clean', (cb) => {
  del(config.all, cb);
});
