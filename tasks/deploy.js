module.exports = function(gulp, config) {
  gulp.task('deploy', ['build'], function(cb) {
    require('./deploy/'+config.type)(cb, config);
  });

  if (config.type === 'rsync' && config.syncable) {
    gulp.task('sync', function(cb) { require('./deploy/rsync')(cb, config, true) });
  }
};
