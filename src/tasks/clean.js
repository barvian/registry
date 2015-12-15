import del from 'del';

export function clean(target) {
  return del(target);
}

export function load(gulp, config) {
  gulp.task('clean', (cb) => {
    Object.keys(gulp.tasks).filter(task => /\:clean$/.test(task)).forEach(task => gulp.start(task));

    if (config) return clean(config, cb);
  });
};

export default clean;
