import ForwardRefRegistry from 'undertaker-forward-reference';
import args from './util/args';
import bindProps from './util/bind-properties';
import * as tasks from './tasks';

// Barvian Registry
// ================

export class BarvianRegistry extends ForwardRefRegistry {
  static defaultConfig = {
    build: true,
    clean: [],
    df: true,
    lint: true,
    test: true,
    watch: true
  };

  constructor(config) {
    super();

    this.config = Object.assign({}, BarvianRegistry.defaultConfig, config);
  }

  init(gulp) {
    this.gulp = gulp;

    Object.keys(tasks)
      // Filter out configurable tasks that haven't been configured
      .filter(task => this.config[task])
      // For each task, reduce to only named functions
      .reduce((taskFns, task) => taskFns.concat(
        Object.keys(tasks[task]).map(key => tasks[task][key])
          .filter(obj => typeof obj === 'function' && obj.displayName)
          // Allow functions to disable themselves based on config
          .filter(fn => typeof fn.enabled === 'function' ?
            fn.enabled(this.config[task]) :
            true)
          // Bind remaining functions
          .map(fn => this.wrapTask(task, fn))
      ), [])
      // Add to gulp
      .forEach(fn => {gulp.task(fn); console.log(fn)});
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

export default BarvianRegistry;
