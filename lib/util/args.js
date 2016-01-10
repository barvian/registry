'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = args;
var comments = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
var argNames = /([^\s,]+)/g;

function args(fn) {
  // Strip comments
  var result = fn.toString().replace(comments, '');
  result = result
  // Strip parens
  .slice(result.indexOf('(') + 1, result.indexOf(')'))
  // Match args
  .match(argNames);

  return result || [];
}