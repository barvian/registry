// Gulpfile
// ========

import * as tasks from './tasks';

export default function load(gulp, config) {
  config = Object.assign({build: null, clean: null, watch: null}, config);
  Object.keys(tasks).filter(task => config.hasOwnProperty(task)).forEach(task =>
    tasks[task].load(gulp, config[task])
  );

  gulp.task('default', ['build', 'watch']);
};
