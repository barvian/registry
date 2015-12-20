'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multi = exports.configurable = exports.watch = exports.styles = exports.sprites = exports.scripts = exports.images = exports.fonts = exports.elements = exports.deploy = exports.df = exports.copy = exports.clean = exports.browserSync = exports.build = undefined;

var _build2 = require('./build');

var _build = _interopRequireWildcard(_build2);

var _browserSync2 = require('./browserSync');

var _browserSync = _interopRequireWildcard(_browserSync2);

var _clean2 = require('./clean');

var _clean = _interopRequireWildcard(_clean2);

var _copy2 = require('./copy');

var _copy = _interopRequireWildcard(_copy2);

var _default = require('./default');

var _df = _interopRequireWildcard(_default);

var _deploy2 = require('./deploy');

var _deploy = _interopRequireWildcard(_deploy2);

var _elements2 = require('./elements');

var _elements = _interopRequireWildcard(_elements2);

var _fonts2 = require('./fonts');

var _fonts = _interopRequireWildcard(_fonts2);

var _images2 = require('./images');

var _images = _interopRequireWildcard(_images2);

var _scripts2 = require('./scripts');

var _scripts = _interopRequireWildcard(_scripts2);

var _sprites2 = require('./sprites');

var _sprites = _interopRequireWildcard(_sprites2);

var _styles2 = require('./styles');

var _styles = _interopRequireWildcard(_styles2);

var _watch2 = require('./watch');

var _watch = _interopRequireWildcard(_watch2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.build = _build;
exports.browserSync = _browserSync;
exports.clean = _clean;
exports.copy = _copy;
exports.df = _df;
exports.deploy = _deploy;
exports.elements = _elements;
exports.fonts = _fonts;
exports.images = _images;
exports.scripts = _scripts;
exports.sprites = _sprites;
exports.styles = _styles;
exports.watch = _watch;
var configurable = exports.configurable = ['browserSync', 'copy', 'deploy', 'elements', 'fonts', 'images', 'scripts', 'sprites', 'styles'];

var multi = exports.multi = ['build', 'clean', 'watch', 'df'];