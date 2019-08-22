const fs = require('fs');
const { spawn } = require('child_process');

class Model {
    constructor(name){
        this.name = name
    }

    createNewModel =() => {
        fs.appendFile('message.txt', 'data to append', (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    }
    
}

module.exports = Model;