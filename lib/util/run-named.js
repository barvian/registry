"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = runNamed;
function runNamed(fn) {
  for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return gulp.series(Object.assign(fn.bind.apply(fn, params), fn));
}