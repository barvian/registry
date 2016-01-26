'use strict';

const comments = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg; // eslint-disable-line max-len
const argNames = /([^\s,]+)/g;

module.exports = function args(fn) {
  // Strip comments
  let result = fn.toString().replace(comments, '');
  result = result
    // Strip parens
    .slice(result.indexOf('(') + 1, result.indexOf(')'))
    // Match args
    .match(argNames);

  return result || [];
};
