import ForwardRefRegistry from 'undertaker-forward-reference';
import * as tasks from './tasks';

// Barvian Registry
// ================

export class BarvianRegistry extends ForwardRefRegistry {
  static defaultConfig = {}

  constructor(config) {
    super()

    this.config = config;
  }

  init(gulp) {
    this.gulp = gulp;

    Object.keys(tasks)
      // Filter out configurable tasks that haven't been configured
      .filter(task => !(tasks[task].configurable && !this.config[task]))
      // For each task, reduce to only named functions and bind appropriately
      .reduce((taskFns, task) => taskFns.concat(
        Object.keys(tasks[task]).map(key => tasks[task][key])
          .filter(obj => typeof obj === 'function' && obj.displayName)
          // Allow functions to disable themselves based on config
          .filter(fn => typeof fn.enabled === 'function' ? fn.enabled.call(this.config[task]) : true)
          // Bind remaining functions to their config
          .map(fn => Object.assign(
            tasks[task].configurable ? fn.bind(this.config[task]) : fn.bind(this),
            fn
          ))
      ), [])
      // Add to gulp
      .forEach(fn => gulp.task(fn));

    // Optional sync task
    if (this.config.deploy &&
      this.config.deploy.type === 'rsync' && this.config.deploy.syncable) {

    }
  }
}

export default BarvianRegistry;