'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BarvianRegistry = undefined;

var _undertakerForwardReference = require('undertaker-forward-reference');

var _undertakerForwardReference2 = _interopRequireDefault(_undertakerForwardReference);

var _args = require('./util/args');

var _args2 = _interopRequireDefault(_args);

var _tasks = require('./tasks');

var tasks = _interopRequireWildcard(_tasks);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Barvian Registry
// ================

var BarvianRegistry = exports.BarvianRegistry = (function (_ForwardRefRegistry) {
  _inherits(BarvianRegistry, _ForwardRefRegistry);

  function BarvianRegistry(config) {
    _classCallCheck(this, BarvianRegistry);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BarvianRegistry).call(this));

    _this.config = Object.assign({}, BarvianRegistry.defaultConfig, config);
    return _this;
  }

  _createClass(BarvianRegistry, [{
    key: 'init',
    value: function init(gulp) {
      var _this2 = this;

      this.gulp = gulp;

      Object.keys(tasks)
      // Filter out configurable tasks that haven't been configured
      .filter(function (task) {
        return _this2.config[task];
      })
      // For each task, reduce to only named functions
      .reduce(function (taskFns, task) {
        return taskFns.concat(Object.keys(tasks[task]).map(function (key) {
          return tasks[task][key];
        }).filter(function (obj) {
          return typeof obj === 'function' && obj.displayName;
        })
        // Allow functions to disable themselves based on config
        .filter(function (fn) {
          return typeof fn.enabled === 'function' ? fn.enabled(_this2.config[task]) : true;
        })
        // Bind remaining functions
        .map(function (fn) {
          return _this2.wrapTask(task, fn);
        }));
      }, [])
      // Add to gulp
      .forEach(function (fn) {
        return gulp.task(fn);
      });
    }

    // Bind task to its config and other props

  }, {
    key: 'wrapTask',
    value: function wrapTask(task, fn) {
      var _this3 = this;

      return Object.assign(function (done) {
        return fn.apply(undefined, (0, _args2.default)(fn).map(function (arg) {
          switch (arg) {
            case 'cb':
            case 'done':
              return done;
            case 'config':
            case '_config':
              return _this3.config[task];
            case 'gulp':
              return _this3.gulp;
            default:
              return undefined;
          }
        }));
      }, fn);
    }
  }]);

  return BarvianRegistry;
})(_undertakerForwardReference2.default);

BarvianRegistry.defaultConfig = {
  build: true,
  clean: [],
  df: true,
  lint: true,
  test: true,
  watch: true
};
exports.default = BarvianRegistry;