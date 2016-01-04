'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Default
// =======

function df(done) {
  this.gulp.series('build', 'watch')(done);
}
df.displayName = 'default';
df.description = 'Build and watch for changes';

exports.default = df;