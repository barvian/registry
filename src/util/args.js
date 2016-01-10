const comments = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
const argNames = /([^\s,]+)/g;

export default function args(fn) {
  // Strip comments
  let result = fn.toString().replace(comments, '');
  result = result
    // Strip parens
    .slice(result.indexOf('(')+1, result.indexOf(')'))
    // Match args
    .match(argNames);

  return result || [];
}