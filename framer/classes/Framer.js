const fs = require('fs')
const ModelBuilder = require('./ModelBuilder')
const { spawn } = require('child_process');

class Framer {
    constructor (appName, MongoURI, model){
    this.appName = appName.split(" ").join("_")
    this.MongoURI = MongoURI
    this.model = model
    }

    buildApp = () => {
        fs.mkdir(this.appName, { recursive: true }, err => {
            if (err) throw err;
        });
    }

    buildMongo = () => {
        fs.mkdir(this.appName + "/config", { recursive: true }, err => {
            if (err) throw err;
        });
    }

    buildModel = () => {
        const ModelBuilder = new ModelBuilder(this.model)
        fs.mkdir(this.appName + "/Models", { recursive: true }, err => {
            if (err) throw err;
        });
    };

    buildController = () => {
        fs.mkdir(this.appName + "/controllers", {recursive: true}, err => {
            if (err) throw err;
        })
    }
    
    bootBuild = function () {
        this.packageJson()
        this.nodeModulues()
    }

    packageJson = () => {
        const npm = spawn('npm', ['init', '-y'], {cwd: `./${this.appName}`});
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

    nodeModules = () => {
        const installer = spawn('npm', ['install', 'express', 'mongoose', 'body-parser'], {cwd: `./${this.appName}`});
        installer.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        installer.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        installer.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    }

}

module.exports = Framer;
