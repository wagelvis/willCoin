// Importamos la librería crypto-js para la generación de la clave criptográfica
const SHA256 = require('crypto-js/sha256');

class Block {
    // Construcción del Bloque
    constructor(index, data, previousHash = ''){
        this.index = index;
        this.date = new Date();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.createHash();
    }

    // Creación del Hash
    createHash() {
        return SHA256(this.index + this.date + this.data).toString();
    }
}

// Creamos la cadena de bloques
class Blockchain {
    constructor(genesis){
        this.chain = [this.createFirstBlock(genesis)];
    }

    // Creando primer bloque de la cadena
    createFirstBlock(genesis){
        return new Block(0, genesis);
    }

    // Último bloque de la cadena
    getLastBlock() {
        return this.chain[this.chain.length-1];
    }

    // Añadir bloques a la cadena
    addBlock(data) {
        let prevBlock = this.getLastBlock();
        let block = new Block(prevBlock.index+1, data, prevBlock.hash);
        this.chain.push(block);
    }
}

// Generación de los Bloques
let willCoin = new Blockchain('Este es el primer bloque de la cadena');

willCoin.addBlock('Esta es la Criptomoneda de Wilmer Hernández');
willCoin.addBlock('willCoin se cotiza a 1.000.000 CTOs');
willCoin.addBlock('Valor cotizado en Coinmarket: 25.000 USD');
willCoin.addBlock('Este es el Último bloque de la cadena');

// Mostramos el contenido del bloque por consola
console.log(JSON.stringify(willCoin.chain, null, 2));