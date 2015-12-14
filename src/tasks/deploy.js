import * as deploys from './deploys';

export function load(gulp, config) {
  gulp.task('deploy', ['build'], (cb) => {
    deploys[config.type](cb, config);
  });

  if (config.type === 'rsync' && config.syncable) {
    gulp.task('sync', (cb) => deploys.rsync(cb, config, true));
  }
};
