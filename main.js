// Importamos los módulos del bloque y la cadena
const Block = require('./block');
const Blockchain = require('./blockchain');
const Transaction = require('./transactions');

// Generación de los Bloques
let willCoin = new Blockchain();

/* console.log('Minando bloque ...')
willCoin.addBlock('Esta es la Criptomoneda de Wilmer Hernández');
console.log('Minando bloque ...')
willCoin.addBlock('willCoin se cotiza a 10.000.000 CTOs');
console.log('Minando bloque ...')
willCoin.addBlock('Valor cotizado en Coinmarket: 250.000 USD');
console.log('Minando bloque ...')
willCoin.addBlock({Cantidad_wC: 20});
console.log('Minando bloque ...')
willCoin.addBlock('Este es el Último bloque de la cadena');

console.log('Detalle de la Cadena:') */

willCoin.addTransaction(new Transaction('willCoin', 'LeoQuintana', 10));
willCoin.addTransaction(new Transaction('LeoQuintana', 'Nico', 1));

console.log('Comienza el minado de willCoin ...');
willCoin.minePendingTransactions('willCoin');

// console.log('Nuestro Balance es: ', willCoin.getBalanceOfAddress('willCoin'));
// console.log('El Balance de Leo Quintana es: ', willCoin.getBalanceOfAddress('LeoQuintana'));

console.log('Comienza el minado de willCoin ...');
willCoin.minePendingTransactions('willCoin');

console.log('El Balance Nuestro es: ', willCoin.getBalanceOfAddress('willCoin'));
console.log('El Balance de Leo Quintana es: ', willCoin.getBalanceOfAddress('LeoQuintana'));
console.log('El Balance de Nico es: ', willCoin.getBalanceOfAddress('Nico'));

// Mostramos el contenido del bloque por consola
console.log(JSON.stringify(willCoin.chain, null, 4));

// Resultado de la Validación de la cadena
console.log('La cadena de bloques es valida? -> ' +willCoin.isValid() + ': La validación de la cadena es Positiva.');

// Tratamos de alterar la cadena
willCoin.chain[1].transactions = 'Estoy tratando de alterar la cadena';
// willCoin.chain[1].hash = willCoin.chain[1].createHash;
console.log('La cadena de bloques es valida? -> ' +willCoin.isValid() + ': Alerta! Hubo un intento de alterar la cadena.');