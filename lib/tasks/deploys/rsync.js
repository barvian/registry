'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deploy = deploy;

var _rsyncwrapper = require('rsyncwrapper');

var _rsyncwrapper2 = _interopRequireDefault(_rsyncwrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rsync = _rsyncwrapper2.default.rsync;
function deploy(cb, config, reverse) {
  var dest = config.username + '@' + config.host + ':' + config.dest;
  rsync({
    src: reverse ? dest : config.src,
    dest: reverse ? config.src : dest,
    ssh: true,
    args: ['-azih'],
    dryRun: config.dryRun,
    excludeFirst: config.excludeFirst,
    include: config.include,
    exclude: config.exclude
  }, function (error, stdout, stderr, cmd) {
    if (error) return cb(error);
    console.log(stdout);
    cb();
  });
};

exports.default = deploy;