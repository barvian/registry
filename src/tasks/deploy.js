import * as deploys from './deploys';

// Deploy
// ======

function deploy(done, _config, gulp) {
  gulp.series(
    'build',
    cb => {
      let {type, syncable, ...config} = _config;
      deploys[type].deploy(cb, config);
    }
  )(done);
}
deploy.displayName = 'deploy';
deploy.description = 'Deploy site';

export {deploy};

// Sync
// ----

function sync(done, _config) {
  let {type, syncable, ...config} = _config;
  deploys[type].deploy(done, config, true);
}
sync.enabled = (config) => config.type === 'rsync' && config.syncable;
sync.displayName = 'sync';
sync.description = 'Sync files from server';

export {sync};
