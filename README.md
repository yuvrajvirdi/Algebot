# Algebot

Discord bot for advanced algebra.

1. Add to your server with the link below

```bash
https://discord.com/api/oauth2/authorize?client_id=990799046211952700&permissions=8&scope=bot
```

2. Build your docker container 

```bash
docker build -t my-bot .
```

3. Run the container 

```bash
docker run -d my-bot
```

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

Vectors used in commands can be of any size as long as they are compatible in the operations and must be in the format `[x,y,z,...n]` where n is the number of elements in the vector

`!add_vectors [x,y,z] [x2,y2,z2]`: adds a set of two or more vectors 

`!subtract_vectors [x,y,z] [x2,y2,z2]`: subtracts a set of two or more vectors

`!dot_product [x,y,z] [x2,y2,z2]`: computes the scalar dot product of two vectors

`!scale_vector c [x,y,z]`: scales a vector by some arbitrary number, c

`!project [x,y,z] [x2,y2,z2]`: computes the projection vector of the first onto the second

`!orthogonal [x,y,z] [x2,y2,z2]`: checks whether a vector set of any size forms an orthogonal set

## Matrices

Matrices used in commands can be of any dimensions as long as they are compatible in the operations and must be in the format `[x,y,z]/[x2,y2,z2]/[x3,y3,z3]` where `/` seperates the rows in the matrix

`!add_matrices [x,y,z]/[x2,y2,z2] [x,y,z]/[x2,y2,z2]`: adds two matrices

`!subtract_matrices [x,y,z]/[x2,y2,z2] [x,y,z]/[x2,y2,z2]`: subtracts two matrices

`!scalerize_matrix c [x,y,z]/[x2,y2,z2]`: scales a matrix by some arbitrary number, c

`!inverse [x,y,z]/[x2,y2,z2]/[x3,y3,z3]`: computes the inverse of any invertible matrix

`!tranpose [x,y,z]/[x2,y2,z2]/[x3,y3,z3]`: computes the tranposed matrix of any matrix

`!determinant [x,y,z]/[x2,y2,z2]/[x3,y3,z3]`: computes the determinant of any matrix

`!inverse [x,y,z]/[x2,y2,z2]/[x3,y3,z3]`: computes the inverse of any invertible matrix

`!dimesion [x,y,z]/[x2,y2,z2]/[x3,y3,z3]`: gets the dimensions of a matrix

`!rref [x,y,z]/[x2,y2,z2]/[x3,y3,z3]`: computes the row-reduced echelon form of a matrix

## Equations

`!evaluate sqrt(3^2 + 4^2)`: computes the sum of an equations

`!derivative x^3 + 2x`: computes the derivative of an equation

`!evaluate_derivative x^3 + 2x 5`: computes the derivate sum of an equation with a passed in value for x 

## Complex Numbers

`!conjugate x+yi`: computes the conjugate expression of the passed in expression, where x and y are passed in values

`!polar_form x+yi`: computes the polar form of the passed in equatiom, where x and y are passed in values

