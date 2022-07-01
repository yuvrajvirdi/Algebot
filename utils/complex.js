/**
 * Finds conjugate of complex expression
 * 
 * @param {String} x The complex expression
 * @returns The conjugate form of the conjugate expression
 */
export const conjugate = function(x) {
  try {
    if (x.includes('+')) {
      return x.replace('+', '-');
    }
    return x.replace('-', '+');
  } catch (err) {
    return `invalid format: ${err}`
  }
}

/**
 * Finds polar form of complex expression
 * 
 * @param {String} x The complex expression
 * @returns The polar equation
 */
export const polarForm = function(x) {
  try {
    let arr = x.includes('+') ? x.split('+') : x.split('-');
    arr[1] = arr[1].replace('i','')
    const real = parseInt(arr[0]);
    const imaginary = parseInt(arr[1]);
    const r = ((real*real) + (imaginary*imaginary)) ** 0.5;
    if (r) {
      const theta = Math.asin(imaginary / real);
      return `z = ${r.toFixed(2)}(cos(${theta.toFixed(2)}) + isin(${theta.toFixed(2)}))`;
    } 
    return "not computable";
  } catch (err) {
    return `${err}`
  }
}