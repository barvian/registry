'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;

var _browserSync2 = require('browser-sync');

var _browserSync3 = _interopRequireDefault(_browserSync2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browserSync = _browserSync3.default.create();

exports.default = browserSync;
function load(gulp, config) {
  gulp.task('browserSync:create', function () {
    return browserSync.init(config);
  });
  gulp.task('browserSync:reload', function () {
    return browserSync.reload();
  });
}