'use strict';

const _gulp = require('gulp');
const browserSync = require('./browserSync');
const multidest = require('../util/gulp-multidest');
const lazypipe = require('lazypipe');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const htmlExtract = require('gulp-html-extract');
const crisper = require('gulp-crisper');
const plumber = require('gulp-plumber');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const debowerify = require('debowerify');
const browserifyData = require('browserify-data');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const del = require('del');
const flatten = require('array-flatten');
const prod = require('../util/env').prod;

// Scripts
// =======

const supportedExts = ['js', 'es6', 'html'];
const defaultConfig = {
  sourcemaps: true,
  minify: prod(),
  uglify: {},
  crisper: {
    scriptInHead: false
  }
};

module.exports = {supportedExts, defaultConfig, lint, build, watch, clean};

// Lint
// ----

function lint(config, gulp, watch) {
  let pipeline = _gulp.src(config.all, {since: gulp.lastRun('scripts:lint')})
    .pipe(gulpif('*.html', htmlExtract({strip: true})))
    .pipe(eslint({
      parser: 'babel-eslint',
      extends: 'google'
    }))
    .pipe(eslint.format())
    .pipe(gulpif(!browserSync.active, eslint.failAfterError()));

  if (watch) {
    _gulp.watch(config.all, () => pipeline);
  }
  return pipeline;
}
lint.displayName = 'scripts:lint';
lint.description = 'Lint scripts';

// Build
// -----

function compileBundle(config, watch) {
  let bundler = browserify(config.src, {debug: true})
    .transform(babelify);
    // .transform(debowerify)
    // .transform(browserifyData);

  const rebundle = function() {
    let minifyPipe = lazypipe()
      .pipe(() => gulpif(config.sourcemaps, sourcemaps.init()))
      .pipe(uglify, config.uglify)
      .pipe(() => gulpif(config.sourcemaps, sourcemaps.write('.')));

    return bundler.bundle()
      .on('error', function(err) {
        console.error(err);
        this.emit('end');
      })
      .pipe(source(config.bundle))
      .pipe(buffer())
      // .pipe(gulpif(config.minify, minifyPipe()))
      .pipe(multidest(config.dest))
      .pipe(gulpif(watch, browserSync.stream()));
  };

  if (watch) {
    bundler = watchify(bundler);
    bundler.on('update', function() {
      rebundle();
    });
  }

  return rebundle();
}

function compile(config, gulp, watch) {
  let pipeline = _gulp.src(config.src, {since: gulp.lastRun(compile)})
    .pipe(gulpif('*.html', crisper(config.crisper)))
    .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
    .pipe(gulpif(/\.(js|es6)$/, babel()))
    .pipe(gulpif(config.minify, uglify(config.uglify)))
    .pipe(gulpif(config.sourcemaps, sourcemaps.write('.')))
    .pipe(multidest(config.dest))
    .pipe(gulpif(watch, browserSync.stream()));

  if (watch) {
    _gulp.watch(config.all, () => pipeline);
  }
  return pipeline;
}

function build(done, config, gulp, watch) {
  _gulp.series(
    () => config.lint ? lint(config, gulp, watch) : null,
    () => config.bundle ?
      compileBundle(config, watch) :
      compile(config, gulp, watch)
  )(done);
}
build.displayName = 'scripts:build';
build.description = 'Build scripts';

// Clean
// -----

function clean(config) {
  return del(flatten([config.dest]).map(dest =>
    config.bundle ? `${dest}/${config.bundle}*` : `${dest}/*.js*`
  ));
}
clean.displayName = 'scripts:clean';
clean.description = 'Clean scripts';

// Watch
// -----

function watch(config, gulp) {
  build(() => {}, config, gulp, true);
}
watch.displayName = 'scripts:watch';
watch.description = 'Watch scripts for changes and re-build/lint';
