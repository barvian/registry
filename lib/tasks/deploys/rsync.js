'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deploy = deploy;

var _rsyncwrapper = require('rsyncwrapper');

function deploy(cb, config, reverse) {
  var dest = config.username + '@' + config.host + ':' + config.dest;
  (0, _rsyncwrapper.rsync)({
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