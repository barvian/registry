import gulp from 'gulp';
import * as deploys from './deploys';

// Deploy
// ======

export const configurable = true;

function deploy(done) {
  gulp.series(
    'build',
    cb => {
      let {type, syncable, ...config} = this;
      deploys[type].deploy(cb, config);
    }
  )(done);
}
deploy.displayName = 'deploy';
deploy.description = 'Deploy site';

export {deploy};

// Sync
// ----

function sync(done) {
  let {type, syncable, ...config} = this;
  deploys[type].deploy(done, config, true);
}
sync.enabled = function() {
  return this.type === 'rsync' && this.syncable;
};
sync.displayName = 'sync';
sync.description = 'Sync files from server';

export {sync};
