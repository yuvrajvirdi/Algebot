/**
 * Creates an int list representing a vector
 * 
 * @param {String} x The vector from message arguments
 * @returns {Array[number]} vector The vector
 */
export const createVector = function(x) {
  const cleaned = x.replace(/[\])}[{(]/g, '')
  const vector = cleaned.split(',').map(Number);
  return vector;
};

/**
 * Adds or subtracts given vectors by parsing given message arguments
 * 
 * @param {string} args The vectors passed in
 * @param {string} operation The additive or subtractive operation
 * @returns {Array[number]} vector The resultant vvector
 */
export const parseVectors = function(args, operation) {
  for (let i = 1; i < args.length; i++) {
    if (args[i].length !== args[i-1].length) return;
  }

  const vectors = []
  for (let i = 0; i < args.length; i++) {
    vectors.push(createVector(args[i]));
  }

  const vector = []
  for (let i = 0; i < vectors[0].length; i++) {
    vector.push(vectors[0][i])
  }

  for (let i = 1; i < vectors.length; i++) {
    for (let j = 0; j < vector.length; j++) {
      if (operation === 'add') {
        vector[j] += vectors[i][j]
      } 
      if (operation === 'subtract_vectors') {
        vector[j] -= vectors[i][j]
      }
    }
  }

  return vector;
}

/**
 * Gets the scalar dot product of two vectors
 * 
 * @param {String} x The first vector
 * @param {String} y The second vector
 * @returns {number} res The scalar dot product
 */
export const dotProduct = function(x, y) {
  const vectorX = createVector(x);
  const vectorY = createVector(y);

  if (vectorX.length !== vectorY.length) return;

  let res = 0
  for (let i = 0; i < vectorX.length; i++) {
    res += vectorX[i] * vectorY[i];
  }

  return res
}

/**
 * Scales a vector by some arbitrary value, c
 * 
 * @param {String} c The scalar string arg
 * @param {String} x The vector string arg
 * @returns {Array[number]} vector The scaled vector
 */
export const scaleVector = function(c, x) {
  const scalar = parseInt(c);
  const vector = createVector(x);

  for (let i = 0; i < vector.length; i++) {
    vector[i] *= scalar;
  }
  
  return vector;
}

/**
 * Projects a vector onto another vector
 * 
 * @param {String} x The first vector
 * @param {String} y The second vector
 * @returns {Array[number]} vector The projection of vector x onto y
 */
export const projection = function(x, y) {
  const scalar = dotProduct(x,y) / dotProduct(y,y);
  const vector = createVector(y);

  for (let i = 0; i < vector.length; i++) {
    vector[i] *= scalar;
  }

  return vector;
}

/**
 * Finds the magnitude, or apparent length, of a vector
 * 
 * @param {String} x The vector
 * @returns {number} magnitude The magnitude of the vector
 */
export const magnitude = function(x) {
  const vector = createVector(x);
  return Math.sqrt(dotProduct(vector,vector))
}

/**
 * Determines whether a set of vectors is orthogonal 
 *
 * @param {String} args The vectors passed through the message arguments
 * @returns {String} The concluding statement
 */
export const orthogonal = function(args) {
  for (let i = 1; i < args.length; i++) {
    if (args[i].length !== args[i-1].length) {
      return "must be even length";
    }
  }

  for (let i = 0; i < args.length; i++) {
    for (let j = 0; j < args.length; j++) {
      if (i !== j && dotProduct(args[i], args[j]) !== 0) {
        return "are not an orthogonal set"
      }
    }
  }
  
  return "form an orthogonal set";
}
