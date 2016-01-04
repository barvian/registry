import _browserSync from 'browser-sync';
import lazypipe from 'lazypipe';
import gulpif from 'gulp-if';

// BrowserSync
// ===========

export const configurable = true;
export const defaultConfig = {};

export const browserSync = _browserSync.create();
export default browserSync;

// Convenience pipeline for streaming updates
export const stream = lazypipe()
  .pipe(() => gulpif(browserSync.active, browserSync.stream()));

// Create
// ------

function init(done) {
  const config = Object.assign({}, defaultConfig, this);

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
