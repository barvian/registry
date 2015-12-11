var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var debowerify = require('debowerify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var browserSync = require('browser-sync');
var del = require('del');

module.exports = function(gulp, config) {
  var compile = function(watch) {
    var bundler = browserify(config.src, { debug: false })
      .transform(babelify.configure({
        ignore: config.babelIgnore
      }))
      .transform(debowerify);

    var rebundle = function() {
      var pipeline = bundler.bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source(config.bundle+'.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest))
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
  }

  gulp.task('scripts', function() { return compile() });
  gulp.task('scripts:watch', function() { return compile(true) });
  gulp.task('scripts:clean', function(cb) { del(config.dest, cb); });
};
