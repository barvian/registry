import _browserSync from 'browser-sync';
import lazypipe from 'lazypipe';
import gulpif from 'gulp-if';
import {noop} from 'gulp-util';

// BrowserSync
// ===========

export const browserSync = _browserSync.create();
export default browserSync;

// Convenience pipeline for streaming updates
export const stream = lazypipe()
  .pipe(() => gulpif('!*.map',
    browserSync.active ? browserSync.stream() : noop())
  );

// Create
// ------

function init(done, config) {
  if (!browserSync.active) {
    browserSync.init(config);
  }
  done();
}
init.displayName = 'browserSync:init';
init.description = 'Initialize browserSync instance';

export {init};

// Reload
// ------

function reload(done) {
  browserSync.reload();
  done();
}
reload.displayName = 'browserSync:reload';
reload.description = 'Reload browserSync instance';

export {reload};
