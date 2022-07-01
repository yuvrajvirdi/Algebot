import { createVector } from "./vectors.js";

/**
 * Creates a string representation of a matrix
 * 
 * @param {Array[number]} x The matrix
 * @returns {String} matrix The matrix in string representation
 */
export const matrixToString = function(x) {
  let matrix = "";

  for (let i = 0; i < x.length; i++) {
    matrix += `[${x[i].toString()}]\n`
  }

  return matrix
}

/**
 * Creates a matrix
 * 
 * @param {String} x The matrix from message arguments
 * @returns {Array[number]} matrix The matrix
 */
export const createMatrix = function(x) {
  // input form: [1,2,3]/[1,2,3]/[1,2,3]
  const split = x.split('/');
  const matrix = []

  for (let i = 0; i < split.length; i++) {
    matrix.push(createVector(split[i]))
  }

  return matrix;
}

/**
 * Gets dimensions of matrix
 * 
 * @param {String} x 
 * @returns {Array[number]} The dimensions
 */
export const dimensions = function(x) {
  const matrix = createMatrix(x);
  return [matrix.length, matrix[0].length];
}

/**
 * Scales a matrix by some arbitrary value, c
 * 
 * @param {String} c The scalar string arg
 * @param {String} x The matrix string arg
 * @returns {Array[number]} matrix The scaled matrix
 */
export const scaleMatrix = function(c, x) {
  const scalar = parseInt(c);
  const matrix = createMatrix(x);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] *= scalar;
    }
  }

  return matrix;
}

/**
 * Finds the inverse of a matrix
 * 
 * @param {String} x 
 * @returns {Array[number]} matrix The inverse
 */
export const inverse = function(x) {
  if (determinant(x) === 0) return ["Not invertible"]

  const matrix = createMatrix(x);
  const rows = matrix.length;
  let unitMatrix = [];
  let tmp;

  for (let i = 0; i < rows; i++) {
    unitMatrix[i] = [];
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      unitMatrix[i][j] = 0;
      if (i == j) {
        unitMatrix[i][j] = 1;
      }
    }
  }

  // i = k, j = j, k = i, l = j
  for (let i = 0; i < rows; i++) {
    tmp = matrix[i][i];
    
    for (let j = 0; j < rows; j++) {
      matrix[i][j] /= tmp;
      unitMatrix[i][j] /=  tmp;
    }

    for (let k = i + 1; k < rows; k++) {
      tmp = matrix[k][i];

      for (let l = 0; l < rows; l++) {
        matrix[k][l] -= matrix[i][l] * tmp;
        unitMatrix[k][l] -= unitMatrix[i][l] * tmp;
      }
    }
  }

  for (let i = rows - 1; i > 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      tmp = matrix[j][i];

      for (let k = 0; k < rows; k++) {
        matrix[j][k] -= matrix[i][k] * tmp;
        unitMatrix[j][k] -= unitMatrix[i][k] * tmp;
      }
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      matrix[i][j] = unitMatrix[i][j];
      matrix[i][j] = Math.round(matrix[i][j]);
    }
  }
  return matrix
}

/**
 * Tranposes a matrix
 * 
 * @param {String} x The matrix passed in
 * @returns {Array[number]} transposedMatrix The transposed matrix
 */
export const transpose = function(x) {
  const matrix = createMatrix(x);
  return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

/**
 * Finds the determinant of a matrix
 * 
 * @param {String} x The passed in matrix 
 * @returns {number} det The determinant
 */
export const determinant = function(x) {
  const matrix = createMatrix(x);
  return det(matrix);
}

/**
 * Helper function
 */
const det = function(matrix) {
  if (matrix.length === 1) {
    return matrix[0][0]
  } else if (matrix.length === 2) {
    return matrix[0][0]*matrix[1][1] - matrix[0][1]*matrix[1][0];
  } 
  let det = 0;
  for (let i = 0; i < matrix.length; i++) {
    det += matrix[0][i] * cofactor(matrix, 0, i);
  }
  return det;
}

/**
 * Helper function
 */
const cofactor = function(matrix, row, col) {
  const subMatrix = [] 
  let counter = 0

  for (let i = 1; i < matrix.length; i++) {
    subMatrix[counter] = [];

    for (let j = 0; j < matrix.length; j++) {
      if (j !== col) {
        subMatrix[counter].push(matrix[i][j]);
      }
    }
    counter++
  }

  return (col % 2 ? -1 : 1) * det(subMatrix);
}

/**
 * Computes the Row-Reduced Echelon Form of a given matrix
 * 
 * @param {String} x The passed in matrix
 * @returns {Array[number]} matrix The matrix in RREF
 */
export const rref = function(x) {
  const matrix = createMatrix(x);
  const rows = matrix.length;
  const cols = matrix[0].length;
  let lead = 0;

  for (let r = 0; r < rows; r++) {
    if (cols <=  lead) {
      return;
    }

    let i = r;
    while (matrix[i][lead] == 0) {
      i++;
      if (rows == i) {
        i = r;
        lead++;
        if (cols == lead) {
          return;
        }
      }
    }

    let tmp = matrix[i];
    matrix[i] = matrix[r]
    matrix[r] = tmp;

    let val = matrix[r][lead];
    for (let i = 0; i < cols; i++) {
      matrix[r][i] /= val;
    }

    for (let i = 0; i < rows; i++) {
      if (i == r) continue;
      val = matrix[i][lead];
      for (let j = 0; j < cols; j++) {
        matrix[i][j] -= val * matrix[r][j];
      }
    }
    lead++;
  }

  return matrix
}

/**
 * 
 * @param {String} x The first matrix
 * @param {String} y The second matrix
 * @param {String} operation The additive or subtractive operation
 * @returns {Array[number]} matrix The resultant matrix
 */
export const parseMatrices = function(x, y, operation) {
  const matrixA = createMatrix(x);
  const matrixB = createMatrix(y);

  if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
    return ["Matrices must be have the same dimensions"]
  }
  
  const matrix = [];
  for (let i = 0; i < matrixA.length; i++) {
    matrix.push([])
  }

  for (let i = 0; i < matrixA.length; i++) {
    for (let j = 0; j < matrixA.length; j++) {
      if (operation === 'add') {
        matrix[i].push(matrixA[i][j] + matrixB[i][j])
      }
      if (operation === 'sub') {
        matrix[i].push(matrixA[i][j] - matrixB[i][j])
      }
    }
  }
  return matrix
}

/**
 * Multiplys two matrices
 * 
 * @param {String} x The first matrix
 * @param {String} y The second matrix
 */
export const multiplyMatrices = function(x, y) {
  const matrixA = createMatrix(x),
  matrixB = createMatrix(y),
  matrix = [];

  for (let i = 0; i < matrixA.length; i++) {
    matrix[i] = [];

    for (let j = 0; j < matrixB.length; j++) {
      let sum = 0;

      for (let k = 0; k < matrixA[0].length; k++) {
        sum  += matrixA[i][k] * matrixB[k][j];
      }
      matrix[i][j] = sum;
    }
  }
  return matrix;
}