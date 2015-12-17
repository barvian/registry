import _browserSync from 'browser-sync'; const browserSync = _browserSync.create();

export default browserSync;

export function load(gulp, config) {
  gulp.task('browserSync:create', () => browserSync.init(config));
  gulp.task('browserSync:reload', () => browserSync.reload());
};