const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(data) {
        this.index = 0;
        this.date = new Date();
        this.data = data;
        this.previousHash = "0";
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.date + this.data + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(!this.hash.startsWith(difficulty)) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

class Blockchain {
    constructor(difficulty = '00') {
        this.chain = [this.createGenesis()];
        this.difficulty = difficulty;
    }

    createGenesis() {
        return new Block(0, {amount: 100});
    }

    latestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.index = this.latestBlock().index + 1;
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        console.log('Minado!! '+ newBlock.hash+' con nonce '+ newBlock.nonce);
        this.chain.push(newBlock);
    }

    checkValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let myCoin = new Blockchain('0000');
myCoin.addBlock(new Block({amount: 50}));
myCoin.addBlock(new Block({amount: 25}));

console.log("La cadena de bloques es valida?", myCoin.checkValid());

// En este caso podemos observar, que aunque se muestra la alerta durante la validación, el bloque se modifica, lo cual es un ERROR GRAVE de la cadena.
myCoin.chain[1].data = 'Estoy tratando de alterar la cadena';
console.log("La cadena de bloques es valida?", myCoin.checkValid(), 'Alerta, la cadena ha sido comprometida!');
// BUG

console.log(JSON.stringify(myCoin, null, 4));