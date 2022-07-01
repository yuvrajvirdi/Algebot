import { evaluate, derivative } from 'mathjs';

export const parse = function(x) {
  return evaluate(x);
}

export const dx = function(x) {
  return derivative(x, 'x');
}

export const evaluateDx = function(x, y) {
  return derivative(x, 'x').evaluate({ x: y })
}


