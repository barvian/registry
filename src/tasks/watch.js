import browserSync from 'browser-sync';

export function load(gulp, config) {
  gulp.task('watch', () => {
    browserSync.create('assets').init(config.browserSync);
    if (config.promptsReload) gulp.watch(config.promptsReload, browserSync.get('assets').reload);

    Object.keys(gulp.tasks).filter(task => /\:watch$/.test(task)).forEach(task => gulp.start(task));
  });
};
