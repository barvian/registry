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

function deploy(done) {
  var _this = this;

  this.gulp.series('build', function (cb) {
    var _config$deploy = _this.config.deploy;
    var type = _config$deploy.type;
    var syncable = _config$deploy.syncable;

    var config = _objectWithoutProperties(_config$deploy, ['type', 'syncable']);

    deploys[type].deploy(cb, config);
  })(done);
}
deploy.displayName = 'deploy';
deploy.description = 'Deploy site';

exports.deploy = deploy;

// Sync
// ----

function sync(done) {
  var type = this.type;
  var syncable = this.syncable;

  var config = _objectWithoutProperties(this, ['type', 'syncable']);

  deploys[type].deploy(done, config, true);
}
sync.enabled = function () {
  return this.type === 'rsync' && this.syncable;
};
sync.displayName = 'sync';
sync.description = 'Sync files from server';

exports.sync = sync;