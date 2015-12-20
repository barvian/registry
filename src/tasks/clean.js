import del from 'del';

export function clean(target) {
  return del(target);
}

export function load(gulp, config) {
  gulp.task('clean',
    Object.keys(gulp.tasks).filter(task => /\:clean$/.test(task)),
    () => {
      if (config) return clean(config);
    }
  );
}

export default clean;
