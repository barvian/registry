import gulp from 'gulp';
import del from 'del';

// Clean
// =====

function clean(done) {
  this.gulp.parallel(
    () => del(this.config.clean),
    ...Object.keys(this.tasks()).filter(task => /\:clean$/.test(task))
  )(done);
};
clean.displayName = 'clean';
clean.description = 'Run all clean tasks';

export {clean as default};

