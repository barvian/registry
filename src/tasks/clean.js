import del from 'del';

export function clean(target, cb) {
  del(target, cb);
}

export function load(gulp, config) {
  gulp.task('clean', (cb) => {
    Object.keys(gulp.tasks).filter(task => /\:clean$/.test(task)).forEach(task => gulp.start(task));

    if (config) clean(config, cb);
  });
};

export default clean;
