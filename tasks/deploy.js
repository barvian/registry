'use strict';

const deploys = require('./deploys');

// Deploy
// ======

module.exports = {deploy, sync};

function deploy(done, config, gulp) {
  gulp.series(
    'build',
    cb => {
      deploys[config.type](cb, config);
    }
  )(done);
}
deploy.displayName = 'deploy';
deploy.description = 'Deploy site';

// Sync
// ----

function sync(done, config) {
  deploys[config.type].deploy(done, config, true);
}
sync.enabled = config => config.type === 'rsync' && config.syncable;
sync.displayName = 'sync';
sync.description = 'Sync files from server';
