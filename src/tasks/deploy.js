import * as deploys from './deploys';

// Deploy
// ======

function deploy(done) {
  this.gulp.series(
    'build',
    cb => {
      let {type, syncable, ...config} = this.config.deploy;
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
