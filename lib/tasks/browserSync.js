'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reload = exports.init = exports.stream = exports.browserSync = exports.defaultConfig = exports.configurable = undefined;

var _browserSync2 = require('browser-sync');

var _browserSync3 = _interopRequireDefault(_browserSync2);

var _lazypipe = require('lazypipe');

var _lazypipe2 = _interopRequireDefault(_lazypipe);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// BrowserSync
// ===========

var configurable = exports.configurable = true;
var defaultConfig = exports.defaultConfig = {};

var browserSync = exports.browserSync = _browserSync3.default.create();
exports.default = browserSync;

// Convenience pipeline for streaming updates

var stream = exports.stream = (0, _lazypipe2.default)().pipe(function () {
  return (0, _gulpIf2.default)(browserSync.active, browserSync.stream());
});

// Create
// ------

function init(done) {
  var config = Object.assign({}, defaultConfig, this);

  if (!browserSync.active) {
    browserSync.init(config);
  }
  done();
}
init.displayName = 'browserSync:init';
init.description = 'Initialize browserSync instance';

exports.init = init;

// Reload
// ------

function reload(done) {
  var config = Object.assign({}, defaultConfig, this);

  browserSync.reload();
  done();
}
reload.displayName = 'browserSync:reload';
reload.description = 'Reload browserSync instance';

exports.reload = reload;