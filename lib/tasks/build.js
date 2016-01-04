'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Build
// =====

function build(done) {
  var _gulp;

  (_gulp = this.gulp).parallel.apply(_gulp, _toConsumableArray(Object.keys(this.tasks()).filter(function (task) {
    return (/\:build$/.test(task)
    );
  })))(done);
}
build.displayName = 'build';
build.description = 'Run all build tasks';

exports.default = build;