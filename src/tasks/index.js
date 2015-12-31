export * as build from './build';
export * as browserSync from './browserSync';
export * as clean from './clean';
export * as copy from './copy';
export * as df from './default';
export * as deploy from './deploy';
export * as elements from './elements';
export * as fonts from './fonts';
export * as images from './images';
export * as lint from './lint';
export * as scripts from './scripts';
export * as sprites from './sprites';
export * as styles from './styles';
export * as test from './test';
export * as watch from './watch';

export var configurable = [
  'browserSync', 'copy', 'deploy', 'elements',
  'fonts', 'images', 'scripts', 'sprites', 'styles'
]

export var convenience = [
  'build', 'clean', 'lint', 'test', 'watch', 'df'
]