export default function bindProperties(fn, ...params) {
  return Object.assign(
    fn.bind(...params),
    fn
  );
}