'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sync = exports.deploy = undefined;

var _deploys = require('./deploys');

var deploys = _interopRequireWildcard(_deploys);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// Deploy
// ======

function deploy(done, _config, gulp) {
  gulp.series('build', function (cb) {
    var type = _config.type;
    var syncable = _config.syncable;

    var config = _objectWithoutProperties(_config, ['type', 'syncable']);

    deploys[type].deploy(cb, config);
  })(done);
}
deploy.displayName = 'deploy';
deploy.description = 'Deploy site';

exports.deploy = deploy;

// Sync
// ----

function sync(done, _config) {
  var type = _config.type;
  var syncable = _config.syncable;

  var config = _objectWithoutProperties(_config, ['type', 'syncable']);

  deploys[type].deploy(done, config, true);
}
sync.enabled = function (config) {
  return config.type === 'rsync' && config.syncable;
};
sync.displayName = 'sync';
sync.description = 'Sync files from server';

exports.sync = sync;