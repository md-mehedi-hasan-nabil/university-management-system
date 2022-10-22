export default function debounce(fn, delay) {
  let timeOut;
  return function () {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      fn();
    }, delay);
  };
}
