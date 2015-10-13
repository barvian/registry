var gulp = require('gulp');
var rsync = require('rsyncwrapper').rsync;

module.exports = function(config) {
  gulp.task('deploy', ['build'], function() {
    rsync({
      src: config.src,
      dest: config.username+'@'+config.host+':'+config.dest,
      ssh: true,
      recursive: true,
      syncDest: true,
      args: ['--verbose', '--exclude-from=.rsyncignore'],
      include: config.include,
      exclude: config.exclude
    }, function(error, stdout, stderr, cmd) {
      if (error) {
        console.log(error.message);
      } else {
      }
    });
  });
};
