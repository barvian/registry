'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sync = exports.deploy = exports.configurable = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _deploys = require('./deploys');

var deploys = _interopRequireWildcard(_deploys);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// Deploy
// ======

var configurable = exports.configurable = true;

function deploy(done) {
  var _this = this;

  _gulp2.default.series('build', function (cb) {
    var type = _this.type;
    var syncable = _this.syncable;

    var config = _objectWithoutProperties(_this, ['type', 'syncable']);

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