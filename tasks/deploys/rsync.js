'use strict';

const log = require('gulp-util').log;
const rsync = require('rsyncwrapper').rsync;

// rsync
// =====

module.exports = function (done, config, reverse) {
  const dest = `${config.username}@${config.host}:${config.dest}`;
  rsync({
    src: reverse ? dest : config.src,
    dest: reverse ? config.src : dest,
    ssh: true,
    args: ['-azih'],
    dryRun: config.dryRun,
    excludeFirst: config.excludeFirst,
    include: config.include,
    exclude: config.exclude
  }, function(error, stdout) {
    if (error) {
      return done(error);
    }
    log(stdout);
    done();
  });
}
