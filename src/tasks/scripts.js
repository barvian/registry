import {src, watch as _watch, series} from 'gulp';
import browserSync, {stream} from './browserSync';
import multidest from '../util/gulp-multidest';
import lazypipe from 'lazypipe';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import gulpif from 'gulp-if';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import htmlExtract from 'gulp-html-extract';
import crisper from 'gulp-crisper';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import debowerify from 'debowerify';
import bd from 'browserify-data';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import del from 'del';
import flatten from 'array-flatten';
import {prod} from '../util/env';

// Scripts
// =======

export const supportedExts = ['js', 'es6', 'html'];
export const defaultConfig = {
  sourcemaps: true,
  minify: prod(),
  uglify: {},
  crisper: {
    scriptInHead: false
  }
};

// Lint
// ----

function lint(config, gulp, watch) {
  let pipeline = src(config.all, {since: gulp.lastRun('scripts:lint')})
    .pipe(gulpif('*.html', htmlExtract({strip: true})))
    .pipe(eslint({
      parser: 'babel-eslint',
      extends: 'google'
    }))
    .pipe(eslint.format())
    .pipe(gulpif(!browserSync.active, eslint.failAfterError()));

  if (watch) {
    _watch(config.all, () => pipeline);
  }
  return pipeline;
}
lint.displayName = 'scripts:lint';
lint.description = 'Lint scripts';

export {lint};

// Build
// -----

function compileBundle(config, watch) {
  let bundler = browserify(config.src, {debug: false})
    .transform(babelify)
    .transform(debowerify)
    .transform(bd);

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
      .pipe(gulpif(config.minify, minifyPipe()))
      .pipe(multidest(config.dest))
      .pipe(gulpif(watch, stream()));
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
  let pipeline = src(config.src, {since: gulp.lastRun(compile)})
    .pipe(gulpif('*.html', crisper(config.crisper)))
    .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
    .pipe(gulpif(/\.(js|es6)$/, babel()))
    .pipe(gulpif(config.minify, uglify(config.uglify)))
    .pipe(gulpif(config.sourcemaps, sourcemaps.write('.')))
    .pipe(multidest(config.dest))
    .pipe(gulpif(watch, stream()));

  if (watch) {
    _watch(config.all, () => pipeline);
  }
  return pipeline;
}

function build(done, config, gulp, watch) {
  series(
    () => lint(config, gulp, watch),
    () => config.bundle ?
      compileBundle(config, watch) :
      compile(config, gulp, watch)
  )(done);
}
build.displayName = 'scripts:build';
build.description = 'Build scripts';

export {build};

// Clean
// -----

function clean(config) {
  return del(flatten([config.dest]).map(dest =>
    config.bundle ? `${dest}/${config.bundle}*` : `${dest}/*.js*`
  ));
}
clean.displayName = 'scripts:clean';
clean.description = 'Clean scripts';

export {clean};

// Watch
// -----

function watch(done, config, gulp) {
  return build(done, config, gulp, true);
}
watch.displayName = 'scripts:watch';
watch.description = 'Watch scripts for changes and re-build/lint';

export {watch};
