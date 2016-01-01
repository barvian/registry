import gulp from 'gulp';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import gulpif from 'gulp-if';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import jscsStylish from 'gulp-jscs-stylish';
import htmlExtract from 'gulp-html-extract';
import crisper from 'gulp-crisper';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import debowerify from 'debowerify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserSync from './browserSync';
import path from 'path';
import del from 'del';
import flatten from 'array-flatten';
import {prod} from '../util/env';

export const supportedExts = ['js', 'es6', 'html'];

export const defaultConfig = {
  sourcemaps: true,
  minify: prod(),
  uglify: {},
  crisper: {
    scriptInHead: false
  }
}

export function compile(config) {
  config = Object.assign(defaultConfig, config);

  let pipeline = gulp.src(config.src)
    .pipe(gulpif('*.html', crisper(config.crisper)))
    .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
    .pipe(gulpif(/\.(js|es6)$/, babel()))
    .pipe(gulpif(config.minify, uglify(config.uglify)))
    .pipe(gulpif(config.sourcemaps, sourcemaps.write('.')));

  flatten([config.dest]).forEach(function(dest) {
    pipeline = pipeline.pipe(gulp.dest(dest));
  });

  return pipeline;
}

export function compileBundle(config, watch) {
  config = Object.assign(defaultConfig, config);
  let bundler = browserify(config.src, { debug: false })
    .transform(babelify)
    .transform(debowerify);

  const rebundle = function() {
    let pipeline = bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source(config.bundle))
      .pipe(buffer());

    if (prod()) {
      pipeline = pipeline
        .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
        .pipe(gulpif(config.minify, uglify(config.uglify)))
        .pipe(gulpif(config.sourcemaps, sourcemaps.write('.')));
    }

    flatten([config.dest]).forEach(function(dest) {
      pipeline = pipeline.pipe(gulp.dest(dest));
    });

    pipeline = pipeline;

    return watch ? pipeline.pipe(browserSync.stream()) : pipeline;
  }

  if (watch) {
    console.log('watching');
    bundler = watchify(bundler);
    bundler.on('update', function() {
      rebundle();
    });
  }

  return rebundle();
}

export function lint(config) {
  config = Object.assign(defaultConfig, config);

  return gulp.src(config.all)
    .pipe(gulpif('*.html', htmlExtract({strip: true})))
    .pipe(eslint({
      parser: 'babel-eslint',
      extends: 'google'
    }))
    .pipe(eslint.format())
    .pipe(gulpif(!browserSync.active, eslint.failOnError()));
}

export function load(gulp, config) {
  gulp.task('scripts:build', () => config.bundle ? compileBundle(config) : compile(config));
  gulp.task('scripts:watch', () => config.bundle ? compileBundle(config, true) : gulp.watch(config.src, () => compile(config).pipe(browserSync.stream())));
  gulp.task('scripts:clean', () => del(flatten([config.dest]).map(dest => config.bundle ? `${dest}/${config.bundle}*` : `${dest}/*.js*`)));

  gulp.task('scripts:lint', () => lint(config));
  gulp.task('scripts:lint:watch', () => gulp.watch(config.all, () => lint(config)));
}

export default compile;
