// Importamos la librería crypto-js para la generación de la clave criptográfica
const SHA256 = require('crypto-js/sha256');

class Block {
    // Construcción del Bloque
    constructor(timestamp, transactions, previousHash = ''){
        // this.index = index;
        // this.date = new Date();
        // this.data = data;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.createHash();
        this.nonce = 0;
    }

    // Creación del Hash
    createHash() {
        // return SHA256(this.index + this.previousHash + this.timestamp + this.transactions + this.nonce).toString();
        return SHA256(this.timestamp + this.previousHash + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    // Generación del Minado.  
    // La dificultad viene dada por la cantidad de "CEROS" que se agregan al principio del hash y que hay validar antes de poder minar un bloque satisfactoriamente (entre más ceros, la dificutad aumenta).
    mineBlock(difficulty) {
        /* while (!this.hash.startsWith(difficulty)) {
            this.nonce++;
            this.hash = this.createHash();
        } */

        while (this.hash.substr(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.createHash();
        }
        console.log('Bloque Minado' + this.hash);
    }
}

module.exports = Block