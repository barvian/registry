import gulp from 'gulp';
import lazypipe from 'lazypipe';
import flatten from 'array-flatten';

export default function multidest(...dests) {
  let pipeline = lazypipe();
  flatten(dests).forEach(function(dest) {
    pipeline = pipeline.pipe(gulp.dest, dest);
  });
  return pipeline();
}