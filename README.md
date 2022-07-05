# Algebot

Discord bot for advanced algebra.

Topics:

* Equations
* Vectors
* Matrices
* Derivatives
* Complex Numbers

# Commands

## General

`!ping`: Get the latency of the bot.
`!commands`: Get the list of commands.

## Vectors

**add_vectors**: Adds a set of vectors

`!add_vectors [1,2] [3,4]`]

**subtract_vectors**: Subtracts a set of vectors

`!subtract_vectors [1,2] [1,2]`

**dot_product**: Computes the dot product of two vectors

`!dot_product [1,2] [1,2]` 

**scale_vector**: Scales a vector by a value

`!scale_vector 3 [1,2]` 

**!project**: Projects a vector onto another and returns the projected vector

`!project [1,2] [7,4]`

**!orthogonal**: Checks if a set of vectors forms an orthogonal set

`!orthogonal [1,2] [3,4]`

## Matrices

**!add_matrices**: Adds two matrices

`!add_matrices [1,2]/[1,2] [3,4]/[2,5]`

**!subtract_matrices**: Subtracts two matrices

`!subtract_matrices [1,2]/[1,2] [3,4]/[2,5]`

**!multiply_matrices**: Multiplies two matrices

`!multiplies_matrices [1,2]/[1,2] [3,4]/[2,5]`

**!inverse**: Finds the inverse of a matrix

`!inverse [1,2]/[1,2]`

**!determinant**: Finds a determinant of a matrix

`!determinant [1,2]/[1,2]`

**!rref**: Computes the row-reduced echelon form of a matrix

`!rref [1,2,3]/[1,2,6]/[7,4,6]`

**!transpose**: Transposes a matrix

`!tranpose [1,2]/[1,2]`

**!dimensions**: Finds the dimensions of a matrix

`!dimensions [1,2]/[1,2]`
