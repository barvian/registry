'use strict';

const ForwardRefRegistry = require('undertaker-forward-reference');
const args = require('./util/args');
const tasks = require('./tasks');

// Barvian Registry
// ================

const defaultConfig = {
  build: true,
  clean: [],
  df: true,
  lint: true,
  test: true,
  watch: true
};

class BarvianRegistry extends ForwardRefRegistry {
  constructor(config) {
    super();

    this.config = Object.assign({}, defaultConfig, config);
  }

  init(gulp) {
    this.gulp = gulp;

    Object.keys(tasks)
      // Filter out tasks that haven't been configured
      .filter(task => this.config[task])
      // For each task, reduce to only named functions
      .reduce((taskFns, task) => taskFns.concat(
        (typeof tasks[task] === 'function' ?
          [tasks[task]] :
          Object.keys(tasks[task]).map(key => tasks[task][key])
        ).filter(obj => typeof obj === 'function' && obj.displayName)
        // Allow functions to disable themselves based on config
        .filter(fn => typeof fn.enabled === 'function' ?
          fn.enabled(this.config[task]) :
          true)
        // Bind remaining functions
        .map(fn => this.wrapTask(task, fn))
      ), [])
      // Add to gulp
      .forEach(fn => gulp.task(fn));
  }

  // Bind task to its config and other props
  wrapTask(task, fn) {
    return Object.assign(done => {
      return fn.apply(undefined, args(fn).map(arg => {
        switch (arg) {
          case 'cb':
          case 'done':
            return done;
          case 'config':
          case '_config':
            return this.config[task];
          case 'gulp':
            return this.gulp;
          default:
            return undefined;
        }
      }));
    }, fn);
  }
}

module.exports = BarvianRegistry;
module.exports.defaultConfig = defaultConfig;
