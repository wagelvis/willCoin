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

    // Generación del Minado
    mine(difficulty) {
        while(!this.hash.startsWith(difficulty)) {
            this.nonce++;
            this.hash = this.createHash();
        }
    }
}

// Creamos la cadena de bloques
class Blockchain {
    constructor(genesis, difficulty = '00'){
        this.chain = [this.createFirstBlock(genesis)];
        this.difficulty = difficulty;
    }

    // Creando primer bloque de la cadena
    createFirstBlock(genesis){
        return new Block(0, genesis);
    }

    // Último bloque de la cadena
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Añadir bloques a la cadena
    addBlock(data) {
        let prevBlock = this.getLastBlock();
        let block = new Block(prevBlock.index + 1, data, prevBlock.hash);

        // Agregamos el grado de dificultad de la cadena (que es el problema que tienen que resolver los nodos de la red)
        block.mine(this.difficulty);
        console.log('Minado! ' +block.hash+ ' con nonce ' +block.nonce);
        this.chain.push(block);
    }

    // Validación de la Cadena
    isValid() {
        for(let i=1; i < this.chain.length; i++){
            let prevBlock = this.chain[i-1];
            let currentBlock = this.chain[i];

            if(currentBlock.previousHash !== prevBlock.hash)
                return false;

            if(currentBlock.createHash() !== currentBlock.hash)
                return false;
        }
        return true;
    }
}

// Generación de los Bloques
let willCoin = new Blockchain('Este es el primer bloque de la cadena', '0a');

willCoin.addBlock('Esta es la Criptomoneda de Wilmer Hernández');
willCoin.addBlock('willCoin se cotiza a 10.000.000 CTOs');
willCoin.addBlock('Valor cotizado en Coinmarket: 250.000 USD');
willCoin.addBlock('Este es el Último bloque de la cadena');

// Mostramos el contenido del bloque por consola
console.log(JSON.stringify(willCoin.chain, null, 4));

// Resultado de la Validación de la cadena
console.log('La cadena de bloques es valida? -> ' +willCoin.isValid() + ': La validación de la cadena es Positiva.');

// Tratamos de alterar la cadena
willCoin.chain[1].data = 'Estoy tratando de alterar la cadena';
console.log('La cadena de bloques es valida? -> ' +willCoin.isValid() + ': Alerta! Hubo un intento de alterar la cadena.');