'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultConfig = undefined;
exports.deploy = deploy;

var _gulpUtil = require('gulp-util');

var _rsyncwrapper = require('rsyncwrapper');

var defaultConfig = exports.defaultConfig = {
  ssh: true,
  args: ['-azih']
};

function deploy(cb, config, reverse) {
  var dest = config.username + '@' + config.host + ':' + config.dest;
  (0, _rsyncwrapper.rsync)(Object.assign(defaultConfig, config, {
    src: reverse ? dest : config.src,
    dest: reverse ? config.src : dest
  }), function (error, stdout, stderr, cmd) {
    if (error) return cb(error);
    (0, _gulpUtil.log)(stdout);
    cb();
  });
};

exports.default = deploy;