'use strict';

const browserSync = require('browser-sync');
const lazypipe = require('lazypipe');
const gulpif = require('gulp-if');
const noop = require('gulp-util').noop;

// BrowserSync
// ===========

const server = browserSync.create();

// Convenience pipeline for streaming updates
const stream = lazypipe()
  .pipe(() => gulpif('!*.map',
    server.active ? server.stream() : noop())
  );

module.exports = {server, stream, init, reload};

// Create
// ------

function init(done, config) {
  if (!server.active) {
    server.init(config);
  }
  done();
}
init.displayName = 'browserSync:init';
init.description = 'Initialize browserSync instance';

// Reload
// ------

function reload(done) {
  server.reload();
  done();
}
reload.displayName = 'browserSync:reload';
reload.description = 'Reload browserSync instance';
