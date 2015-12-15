'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.

clean = clean;exports.



load = load;var _del = require('del');var _del2 = _interopRequireDefault(_del);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function clean(target) {return (0, _del2.default)(target);}function load(gulp, config) {
  gulp.task('clean', function (cb) {
    Object.keys(gulp.tasks).filter(function (task) {return (/\:clean$/.test(task));}).forEach(function (task) {return gulp.start(task);});

    if (config) return clean(config, cb);});}

;exports.default = 

clean;