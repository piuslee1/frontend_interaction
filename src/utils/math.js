function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max);
}

function smoothstep(x) {
  var t = clamp(x, 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

export default smoothstep;
