'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Default
// =======

function df(done) {
  this.gulp.series('build', 'watch')(done);
};
df.displayName = 'default';
df.description = 'Build and watch for changes';

exports.default = df;