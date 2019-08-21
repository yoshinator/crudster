const fs = require('fs')
const { spawn } = require('child_process');

class Framer {
    constructor (app_name, MongoURI, model){
    this.app_name = app_name.split(" ").join("_")
    this.MongoURI = MongoURI
    this.model = model
    }
    
    buildApp = () => {
        fs.mkdir(this.app_name, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }

    buildMongo = () => {
        fs.mkdir(this.app_name + "/config", { recursive: true }, (err) => {
            if (err) throw err;
        });
    }

    buildModel = () => {
        fs.mkdir(this.app_name + "/Models", { recursive: true }, (err) => {
            if (err) throw err;
        })
    };
    
    runThings = function () {
        const cd = spawn('cd', [this.app_name])
        const npm = spawn('npm', ['init', '-y']);
        npm.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        npm.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        npm.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    }
}
module.exports = framer;