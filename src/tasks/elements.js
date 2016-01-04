import gulp from 'gulp';
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

export const configurable = true;
export const defaultConfig = {
  minify: prod()
};

const temp = config => path.relative(
  process.cwd(),
  path.resolve(`${config.base}/../elements.tmp`)
);
const all = config => `${config.base}/**/*.{js,html}`;

// Lint
// ----

function lint() {
  const config = Object.assign({}, defaultConfig, this);

  return scripts.lint.call({
    all: all(config)
  });
}
lint.displayName = 'elements:lint';
lint.description = 'Lint elements';

export {lint};

// Build
// -----

function build(done) {
  const config = Object.assign({}, defaultConfig, this);
  const tmp = temp(config);
  const js = scripts.supportedExts.filter(ext => ext !== 'html').join();

  gulp.series(
    // Create temporary working directory
    () => gulp.src(`${config.base}/**/*`, {since: gulp.lastRun(build)})
      .pipe(gulp.dest(tmp)),
    gulp.parallel(
      // Styles
      styles.build.bind({
        src: `${tmp}/**/*.{${styles.supportedExts.join()}}`,
        dest: tmp,
        modularize: true,
        minify: config.minify
      }),
      // Scripts
      scripts.build.bind({
        all: all(config),
        src: [
          `${tmp}/**/*.{${js}}`,
          `${tmp}/**/__tests__/**/*.html`
        ],
        dest: tmp,
        sourcemaps: false,
        // we'll minify at end
        minify: false
      })
    ),
    // Templates
    () => gulp.src(`${tmp}/${config.entry}`)
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

function watch() {
  const config = Object.assign({}, defaultConfig, this);

  gulp.watch(
    [`${config.base}/**/*`, `!${config.base}/**/__tests__/**/*`],
    build.bind(this)
  );
}
watch.displayName = 'elements:watch';
watch.description = 'Watch elements for changes and re-build';

export {watch};

// Clean
// -----

function clean() {
  const config = Object.assign({}, defaultConfig, this);

  return del(flatten([config.dest]).concat(temp(config)));
}
clean.displayName = 'elements:clean';
clean.description = 'Clean elements';

export {clean};

// Test
// ----

function test(done) {
  const config = Object.assign({}, defaultConfig, this);

  gulp.series(
    build.bind(this),
    cb => wcTest({
      suites: [`${temp(config)}/**/__tests__/**/*.html`]
    }, cb)
  )(done);
}
test.displayName = 'elements:test';
test.description = 'Test elements';

export {test};
