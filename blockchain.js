// Importamos la clase Block
const Block = require('./block');
const Transaction = require('./transactions');

// Creamos la cadena de bloques
class Blockchain {
    constructor(){
        this.chain = [this.createFirstBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    // Creando primer bloque de la cadena
    createFirstBlock(){
        return new Block('10/01/2020', 'Bloque Genesis', '0');
    }

    // Último bloque de la cadena
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Añadir bloques a la cadena
    /* addBlock(data) {
        let prevBlock = this.getLastBlock();
        let block = new Block(prevBlock.index + 1, data, prevBlock.hash);

        // Agregamos el grado de dificultad de la cadena (que es el problema que tienen que resolver los nodos de la red)
        block.mineBlock(this.difficulty);
        console.log('Minado! ' +block.hash+ ' con nonce ' +block.nonce);
        this.chain.push(block);
    } */

    addTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    minePendingTransactions(addressMiner) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.previousHash = this.getLastBlock().hash;
        block.mineBlock(this.difficulty);

        console.log('Bloque Minado: ' +block.hash+ ' con nonce ' +block.nonce);
        console.log('Se ha minado el bloque satisfactoriamente!');

        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, addressMiner, this.miningReward)
        ]
    }

    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if(trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance
    }

    // Validación de la Cadena
    isValid() {
        for (let i=1; i < this.chain.length; i++){
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