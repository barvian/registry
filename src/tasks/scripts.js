import gulp from 'gulp';
import filter from 'gulp-filter';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import gulpif from 'gulp-if';
import babel from 'gulp-babel';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import debowerify from 'debowerify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserSync from './browserSync';
import del from 'del';
import flatten from 'array-flatten';
import {prod} from '../util/env';

export const supportedExts = ['js', 'es6'];

export function process(config) {
  let pipeline = gulp.src(config.src)
    .pipe(gulpif(config.sourcemaps == null && !config.sourcemaps, sourcemaps.init()))
    .pipe(babel())
    .pipe(gulpif(prod(), uglify({preserveComments: 'some'})))
    .pipe(gulpif(config.sourcemaps == null && !config.sourcemaps, sourcemaps.write('.')));

  flatten([config.dest]).forEach(function(dest) {
    pipeline = pipeline.pipe(gulp.dest(dest));
  });

  return pipeline;
}

export function processBundle(config, watch) {
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
        .pipe(sourcemaps.init())
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(sourcemaps.write());
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

export function load(gulp, config) {
  gulp.task('scripts:build', () => config.bundle ? processBundle(config) : process(config));
  gulp.task('scripts:watch', () => config.bundle ? processBundle(config, true) : gulp.watch(config.src, () => process(config).pipe(browserSync.stream())));
  gulp.task('scripts:clean', () => del(flatten([config.dest]).map(dest => config.bundle ? `${dest}/${config.bundle}*` : `${dest}/*.js*`)));
}

export default process;
