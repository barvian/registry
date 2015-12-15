import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import debowerify from 'debowerify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import filter from 'gulp-filter';
import uglify from 'gulp-uglify';
import size from 'gulp-size';
import browserSync from 'browser-sync';
import del from 'del';
import flatten from 'array-flatten';
import path from 'path';

export function process(config, watch) {
  let bundler = browserify(config.src, { debug: false })
    .transform(babelify)
    .transform(debowerify);

  const rebundle = function() {
    let pipeline = bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source(path.basename(config.src, path.extname(config.src))+'.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify({preserveComments: 'some'}))
      .pipe(sourcemaps.write('.'));

    flatten([config.dest]).forEach(function(dest) {
      pipeline = pipeline.pipe(gulp.dest(dest));
    });

    pipeline = pipeline
      .pipe(filter('*.js'))
      .pipe(size({title: 'scripts'}));

    return watch ? pipeline.pipe(browserSync.get('assets').stream()) : pipeline;
  }

  if (watch) {
    bundler = watchify(bundler);
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  return rebundle();
};

export function load(gulp, config) {
  gulp.task('scripts:build', () => process(config));
  gulp.task('scripts:watch', () => process(config, true));

  const destFile = path.basename(config.src, path.extname(config.src));
  gulp.task('scripts:clean', () => del(flatten([config.dest]).map(dest => `${dest}/${destFile}.js*`)));
};

export default process;
