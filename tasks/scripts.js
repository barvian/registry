import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import debowerify from 'debowerify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import {scripts as config} from '../config';
import sourcemaps from 'gulp-sourcemaps';
import filter from 'gulp-filter';
import uglify from 'gulp-uglify';
import size from 'gulp-size';
import browserSync from 'browser-sync';

const compile = watch => {
  let bundler = browserify(config.source, { debug: false })
    .transform(babelify.configure({
      ignore: config.babelIgnore
    }))
    .transform(debowerify);


  const rebundle = () => {
    const pipeline = bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source(`${config.bundle}.js`))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify({preserveComments: 'some'}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.dest))
      .pipe(filter('*.js'))
      .pipe(size({title: 'scripts'}));

    return watch ? pipeline.pipe(browserSync.get('assets').stream()) : pipeline
  }

  if (watch) {
    bundler = watchify(bundler);
    bundler.on('update', () => {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

gulp.task('scripts', () => compile());
gulp.task('scripts:watch', () => compile(true));
