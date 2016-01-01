import gulp from 'gulp';
import gulpif from 'gulp-if';
import vulcanize from 'gulp-vulcanize';
import uglify from 'gulp-uglify';
import crisper from 'gulp-crisper';
import babel from 'gulp-babel';
import browserSync from './browserSync';
import {test as wcTest} from 'web-component-tester';
import path from 'path';
import del from 'del';
import flatten from 'array-flatten';
import {prod} from '../util/env';
import * as styleTask from './styles';
import * as scriptTask from './scripts';

function temp(config) {
  return path.relative(process.cwd(), path.resolve(`${config.base}/../elements.tmp`));
}

function all(config) {
  return `${config.base}/**/*.{js,html}`;
}

export function compile(config, watch) {
  const tmp = temp(config);

  return new Promise((res, rej) => {
    // Copy
    gulp.src(`${config.base}/**/*`)
      .pipe(gulp.dest(tmp))
      .on('end', res).on('error', rej);
  }).then(() => Promise.all([
    new Promise((res, rej) => {
      // Styles
      styleTask.compile({
        src: `${tmp}/**/*.{${styleTask.supportedExts.join()}}`,
        dest: tmp,
        modularize: true
      }).on('end', res).on('error', rej);
    }),
    new Promise((res, rej) => {
      const js = scriptTask.supportedExts.filter(ext => ext !== 'html').join();
      // Scripts
      scriptTask.compile({
        src: [
          `${tmp}/**/*.{${js}}`,
          `${tmp}/**/__tests__/**/*.html`
        ],
        dest: tmp,
        sourcemaps: false,
        minify: false // we'll minify at end
      }).on('end', res).on('error', rej)
    })
  ])).then(() => new Promise((res, rej) => {
    // Templates
    let pipeline = gulp.src(`${tmp}/${config.entry}`)
      .pipe(vulcanize({
        inlineScripts: true,
        inlineCss: true
      }))
      .pipe(crisper())
      .pipe(gulpif('*.js', uglify(scriptTask.defaultConfig.uglify)));

    flatten([config.dest]).forEach(function(dest) {
      pipeline = pipeline.pipe(gulp.dest(dest));
    });
    if (watch) pipeline = pipeline.pipe(browserSync.stream());

    pipeline.on('end', res).on('error', rej);
  }));
}

export function lint(config) {
  return scriptTask.lint({
    all: all(config)
  });
}

export function test(config, cb) {
  wcTest({
    suites: [`${temp(config)}/**/__tests__/**/*.html`]
  }, cb);
}


export function load(gulp, config) {
  gulp.task('elements:build', () => compile(config));
  gulp.task('elements:watch', () => gulp.watch([`${config.base}/**/*`, `!${config.base}/**/__tests__/**/*`], () => compile(config, true)));
  gulp.task('elements:clean', () => del(flatten([config.dest]).concat(temp(config))));
  gulp.task('elements:test', ['elements:build'], (cb) => test(config, cb));

  gulp.task('elements:lint', () => lint(config));
  gulp.task('elements:lint:watch', () => gulp.watch(all(config), () => lint(config)));
}

export default compile;
