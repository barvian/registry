var gulp = require('gulp');
var rsync = require('rsyncwrapper').rsync;

module.exports = function(config) {
  gulp.task('sync', function() {
    rsync({
      src: config.username+'@'+config.host+':'+config.src,
      dest: config.dest,
      ssh: true,
      recursive: true,
      syncDest: true,
      compareMode: 'checksum',
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
