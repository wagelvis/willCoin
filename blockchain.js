// Importamos la clase Block
const Block = require('./block');

// Creamos la cadena de bloques
class Blockchain {
    constructor(genesis, difficulty = '0'){
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
        block.mineBlock(this.difficulty);
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

module.exports = Blockchain