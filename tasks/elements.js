'use strict';

const _gulp = require('gulp');
const stream = require('./browserSync').stream;
const multidest = require('../util/gulp-multidest');
const gulpif = require('gulp-if');
const vulcanize = require('gulp-vulcanize');
const uglify = require('gulp-uglify');
const crisper = require('gulp-crisper');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');
const wcTest = require('web-component-tester').test;
const path = require('path');
const del = require('del');
const flatten = require('array-flatten');
const prod = require('../util/env').prod;
const noop = require('gulp-util').noop;
const styles = require('./styles');
const scripts = require('./scripts');

// Elements
// ========

const defaultConfig = {
  entry: 'index.html',
  minify: prod(),
  htmlmin: {
    removeComments: true,
    collapseWhitespace: true,
    removeOptionalTags: true
  }
};

module.exports = {defaultConfig, lint, build, watch, clean, test};

const temp = config => path.relative(
  process.cwd(),
  path.resolve(`${config.base}/../elements.tmp`)
);
const js = config => `${config.base}/**/*.{${scripts.supportedExts.join('')}}`;

// Lint
// ----

function lint(config, gulp) {
  return scripts.lint({
    all: js(config)
  }, gulp);
}
lint.displayName = 'elements:lint';
lint.description = 'Lint elements';

// Build
// -----

function build(done, _config, gulp) {
  const config = Object.assign({}, defaultConfig, _config);
  const tmp = temp(config);
  const jsExts = scripts.supportedExts.filter(ext => ext !== 'html').join();

  _gulp.series(
    // Create temporary working directory
    () => _gulp.src(
      `${config.base}/**/*`, {since: gulp.lastRun('elements:build')}
      ).pipe(_gulp.dest(tmp)),
    _gulp.parallel(
      // Styles
      () => styles.build({
        src: `${tmp}/**/*.{${styles.supportedExts.join()}}`,
        dest: tmp,
        modularize: true,
        minify: config.minify,
        includePaths: config.includePaths
      }),
      // Scripts
      cb => scripts.build(cb, {
        all: js(config),
        src: [
          `${tmp}/**/*.{${jsExts}}`,
          `${tmp}/**/__tests__/**/*.html`
        ],
        dest: tmp,
        sourcemaps: false,
        // we'll minify at end
        minify: false
      }, gulp)
    ),
    // Templates
    () => _gulp.src(`${tmp}/${config.entry}`)
      .pipe(vulcanize({
        inlineScripts: true,
        inlineCss: true
      }))
      .pipe(crisper())
      // Strip sourcemaps
      .pipe(replace(/^\/[\/\*]\#\s*sourceMapping.*$/gm, ''))
      .pipe(gulpif('*.html', config.minify ? htmlmin(config.htmlmin) : noop()))
      .pipe(gulpif('*.js', config.minify ?
        uglify(scripts.defaultConfig.uglify) :
        noop()
      ))
      .pipe(multidest(config.dest))
      .pipe(stream())
  )(done);
}
build.displayName = 'elements:build';
build.description = 'Build elements';

// Watch
// -----

function watch(config, gulp) {
  _gulp.watch(
    [`${config.base}/**/*`, `!${config.base}/**/__tests__/**/*`],
    done => build(done, config, gulp)
  );
}
watch.displayName = 'elements:watch';
watch.description = 'Watch elements for changes and re-build';

// Clean
// -----

function clean(config) {
  return del(flatten([config.dest]).concat(temp(config)));
}
clean.displayName = 'elements:clean';
clean.description = 'Clean elements';

// Test
// ----

function test(done, config, gulp) {
  _gulp.series(
    cb => build(cb, config, gulp),
    cb => wcTest({
      suites: [`${temp(config)}/**/__tests__/**/*.html`]
    }, cb)
  )(done);
}
test.displayName = 'elements:test';
test.description = 'Test elements';
