var gulp = require('gulp');
var rsync = require('rsyncwrapper').rsync;

module.exports = function(config) {
  var r = function(cb, reverse) {
    rsync({
      src: reverse ? config.dest : config.src,
      dest: config.username+'@'+config.host+':'+(reverse ? config.src : config.dest),
      ssh: true,
      args: ['-azih'],
      dryRun: config.dryRun,
      excludeFirst: config.excludeFirst,
      include: config.include,
      exclude: config.exclude
    }, function(error, stdout, stderr, cmd) {
      if (error) return cb(error);
      console.log(stdout);
      cb();
    });
  };

  gulp.task('deploy', /*['build'],*/ function(cb) { r(cb) });
  if (config.syncable) gulp.task('sync', function(cb) { r(cb, true) });
};
