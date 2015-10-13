// Tasks
// -----

import gulp from 'gulp';

export * from './clean';
export * from './copy';
export * from './fonts';
export * from './images';
export * from './scripts';
export * from './styles';
export * from './sync';
export * from './watch';

gulp.task('build', ['images','fonts','styles','scripts','copy']);
gulp.task('default', ['build','watch']);
