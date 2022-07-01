import { Client, Intents } from 'discord.js'
import { parseVectors, dotProduct, projection, magnitude, scaleVector, orthogonal } from './utils/vectors.js';
import { matrixToString, dimensions, scaleMatrix, transpose, rref, determinant, inverse, parseMatrices, multiplyMatrices } from './utils/matrices.js';
import { conjugate, polarForm } from './utils/complex.js';
import { parse, dx, evaluateDx } from './utils/equations.js';

const TOKEN = 'secret'

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on('ready', function(e) {
  console.log(`${client.user.tag} is online.`)
});

const prefix = '!';

client.on('messageCreate', function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    const time = Date.now() - message.createdTimestamp;
    message.reply(`Active with a latency of ${time}ms`);
  } else if (command === 'commands') {
    message.reply(`Hi, ${message.client.user}, here are the available commands: \n
      **!add_vectors**: returns additive sum of vectors\n
      **!subtract_vectors**: returns subtractive sum of vectors\n
      **!dot_product**: returns dot product of vectors\n
      **!scale_vector**: returns scalarized vector\n
      **!project** returns projection of vector a onto vector b\n
      **!add_matrices**: returns additive sum of matrices\n
      **!subtract_matrices**: returns subtractive sum of matrices\n
      **!multiply_matrices**: returns product of matrices\n
      **!scalarize_matrix**: returns scalarized matrix\n
      **!inverse** returns inverse of matrix\n
      **!transpose** returns transposed matrix\n
      **!determinant** returns determinant of matrix\n
      **!dimension** returns dimension of matrix\n
      **!rref** returns row-reduced echelon form of matrix\n
      **!evaluate**: returns the value of a solved equation\n
      **!dx**: returns the derivative of an equation\n
      **!evaluate_dx**: returns sum of derivative with a value for x passed in\n
      **!conjugate**: returns conjugate of complex expression\n
      **!polar_form**: returns polar form of complex expression\n
    `);
  } else if (command === 'add_vectors') {
    message.reply(`The result vector is [${parseVectors(args,'add')}]`)
  } else if (command === 'subtract_vectors') {
    message.reply(`The result vector is [${parseVectors(args,'subtract')}]`)
  } else if (command === 'scale_vector') {
    message.reply(`The result vector is [${scaleVector(args[0], args[1])}]`)
  } else if (command === 'dot_product') {
    message.reply(`The dot product is ${dotProduct(args[0], args[1])}`)
  } else if (command === 'projection') {
    message.reply(`The projection of ${args[0]} on ${args[1]} is [${projection(args[0], args[1])}]`)
  } else if (command === 'magnitude') {
    message.reply(`The magnitude of vector ${args[0]} is [${magnitude(args[0])}]`)
  } else if (command === 'orthogonal') {
    message.reply(`These vectors ${orthogonal(args)}`)
  } else if (command === 'conjugate') {
    message.reply(`The conjugate form of ${args[0]} is ${conjugate(args[0])}`)
  } else if (command === 'polar_form') {
    message.reply(`The polar form of ${args[0]} is ${polarForm(args[0])}`)
  } else if (command === 'dimensions') {
    const dims = dimensions(args[0])
    message.reply(`The dimensions are ${dims[0]}x${dims[1]}`) 
  } else if (command === 'scale_matrix') {
    message.reply(`The result matrix is \n${matrixToString(scaleMatrix(args[0], args[1]))}`);
  } else if (command === 'transpose') {
    message.reply(`The tranposed matrix is\n${matrixToString(transpose(args[0]))}`);
  } else if (command === 'rref') {
    message.reply(`The row-reduced echelon form matrix is\n${matrixToString(rref(args[0]))}`);
  } else if (command === 'determinant') {
    message.reply(`The determinant is ${determinant(args[0])}`);
  } else if (command === 'inverse') {
    message.reply(`The inverse matrix is\n${matrixToString(inverse(args[0]))}`);
  } else if (command === 'add_matrices') {
    message.reply(`The resultant matrix is\n${matrixToString(parseMatrices(args[0], args[1], 'add'))}`);
  } else if (command === 'subtract_matrices') {
    message.reply(`The resultant matrix is\n${matrixToString(parseMatrices(args[0], args[1], 'sub'))}`);
  } else if (command === 'multiply_matrices') {
    message.reply(`The resultant matrix is\n${matrixToString(multiplyMatrices(args[0], args[1]))}`);
  } else if (command === 'evaluate') {
    message.reply(`The solved equation is: ${parse(args[0])}`);
  } else if (command === 'derivative') {
    message.reply(`The derivative is: ${dx(args[0])}`);
  } else if (command === 'evaluate_derivative') {
    message.reply(`The evaluated derivative is: ${evaluateDx(args[0], args[1])}`);
  } else {
    message.reply(`Use !commands to see commands`);
  }
})

client.login(TOKEN)
