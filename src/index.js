// Gulpfile
// ========

import * as tasks from './tasks';

export browserSync from './tasks/browserSync';

export function load(gulp, config) {
  tasks.configurable.filter(task => config.hasOwnProperty(task)).forEach(task =>
    tasks[task].load(gulp, config[task])
  );
  tasks.multi.forEach(task => tasks[task].load(gulp, config[task]));
};

export default load;