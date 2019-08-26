#!/usr/bin/env node
const inquirer = require('inquirer')
const framer = require('./framer/classes/Framer');

if (process.argv[2]) {
    return 0;
} else {
    inquirer.prompt([
        {
            message: "App name",
            name: "app_name"
        },
        {
            message: "Mongo URI",
            name: "MongoURI"
        },
        {
            message: "First Model",
            name: "model"
        }
        ]).then( answers => {
            FRAMER = new framer(answers.app_name, answers.MongoURI, answers.model)
            console.log(FRAMER)
            FRAMER.buildApp()
            FRAMER.buildMongo()
            FRAMER.buildModel()
            FRAMER.bootBuild()
        });
    }
