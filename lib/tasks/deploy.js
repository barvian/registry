'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;

var _deploys = require('./deploys');

var deploys = _interopRequireWildcard(_deploys);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function load(gulp, config) {
  gulp.task('deploy', ['build'], function (cb) {
    deploys[config.type].deploy(cb, config);
  });

  if (config.type === 'rsync' && config.syncable) {
    gulp.task('sync', function (cb) {
      return deploys.rsync.deploy(cb, config, true);
    });
  }
}