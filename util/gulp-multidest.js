'use strict';

const gulp = require('gulp');
const lazypipe = require('lazypipe');
const flatten = require('array-flatten');

module.exports = function multidest() {
  let pipeline = lazypipe();
  flatten(Array.apply(null, arguments)).forEach(dest => {
    pipeline = pipeline.pipe(gulp.dest, dest);
  });
  return pipeline();
};
