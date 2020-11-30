#!/bin/node
const fs = require('fs'); //Obtain the environment string passed to the node script
const envFileContent = require('../.env.example.json'); //copy the json inside the env.json file
fs.writeFileSync(
  './.env.development.json',
  JSON.stringify(envFileContent, undefined, 2),
);
fs.writeFileSync(
  './.env.staging.json',
  JSON.stringify(envFileContent, undefined, 2),
);
fs.writeFileSync(
  './.env.production.json',
  JSON.stringify(envFileContent, undefined, 2),
);
