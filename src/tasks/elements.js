import {src, dest, watch as _watch, series, parallel} from 'gulp';
import {stream} from './browserSync';
import multidest from '../util/gulp-multidest';
import gulpif from 'gulp-if';
import vulcanize from 'gulp-vulcanize';
import uglify from 'gulp-uglify';
import crisper from 'gulp-crisper';
import {test as wcTest} from 'web-component-tester';
import path from 'path';
import del from 'del';
import flatten from 'array-flatten';
import {prod} from '../util/env';
import {noop} from 'gulp-util';
import * as styles from './styles';
import * as scripts from './scripts';

// Elements
// ========

export const defaultConfig = {
  entry: 'index.html',
  minify: prod()
};

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

export {lint};

// Build
// -----

function build(done, _config, gulp) {
  const config = Object.assign({}, defaultConfig, _config);
  const tmp = temp(config);
  const jsExts = scripts.supportedExts.filter(ext => ext !== 'html').join();

  series(
    // Create temporary working directory
    () => src(`${config.base}/**/*`, {since: gulp.lastRun('elements:build')})
      .pipe(dest(tmp)),
    parallel(
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
    () => src(`${tmp}/${config.entry}`)
      .pipe(vulcanize({
        inlineScripts: true,
        inlineCss: true
      }))
      .pipe(crisper())
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

export {build};

// Watch
// -----

function watch(config) {
  _watch(
    [`${config.base}/**/*`, `!${config.base}/**/__tests__/**/*`],
    done => build(done, config)
  );
}
watch.displayName = 'elements:watch';
watch.description = 'Watch elements for changes and re-build';

export {watch};

// Clean
// -----

function clean(config) {
  return del(flatten([config.dest]).concat(temp(config)));
}
clean.displayName = 'elements:clean';
clean.description = 'Clean elements';

export {clean};

// Test
// ----

function test(done, config, gulp) {
  series(
    cb => build(cb, config, gulp),
    cb => wcTest({
      suites: [`${temp(config)}/**/__tests__/**/*.html`]
    }, cb)
  )(done);
}
test.displayName = 'elements:test';
test.description = 'Test elements';

export {test};
