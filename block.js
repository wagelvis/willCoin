// Importamos la librería crypto-js para la generación de la clave criptográfica
const SHA256 = require('crypto-js/sha256');

class Block {
    // Construcción del Bloque
    constructor(index, data, previousHash = '0'){
        this.index = index;
        this.date = new Date();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.createHash();
        this.nonce = 0;
    }

    // Creación del Hash
    createHash() {
        return SHA256(this.index + this.previousHash + this.date + this.data + this.nonce).toString();
    }

    // Generación del Minado.  
    // La dificultad viene dada por la cantidad de "CEROS" que se agregan al principio del hash y que hay validar antes de poder minar un bloque satisfacoriamente (entre más ceros, la dificutad aumenta).
    mineBlock(difficulty) {
        while (!this.hash.startsWith(difficulty)) {
            this.nonce++;
            this.hash = this.createHash();
        }
    }
}

module.exports = Block