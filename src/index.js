// Gulpfile
// ========

import * as tasks from './tasks';

export const browserSync = tasks.browserSync.browserSync;

export function load(gulp, config) {
  tasks.configurable.filter(task => config.hasOwnProperty(task)).forEach(task =>
    tasks[task].load(gulp, config[task])
  );
  tasks.convenience.forEach(task => tasks[task].load(gulp, config[task]));
};

export default load;