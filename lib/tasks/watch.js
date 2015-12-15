'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.

load = load;var _browserSync = require('browser-sync');var _browserSync2 = _interopRequireDefault(_browserSync);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function load(gulp, config) {
  gulp.task('watch', function () {
    _browserSync2.default.create('assets').init(config.browserSync);
    if (config.promptsReload) gulp.watch(config.promptsReload, _browserSync2.default.get('assets').reload);

    Object.keys(gulp.tasks).filter(function (task) {return (/\:watch$/.test(task));}).forEach(function (task) {return gulp.start(task);});});}

;