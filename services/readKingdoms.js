"use strict";

const fs = require("fs");




function kingdomGetter() {
    return new Promise( (resolve, reject) => {
	    let cb = promiseWrap(resolve, reject);
	    fs.readFile('./data/realms.json', 'utf8', cb);
    });
}






function promiseWrap(resolve, reject) {
  return function errorFirstConverter(err, data) {
  if (err){
  reject(err);
  }
  resolve(data);
  };
}


module.exports = kingdomGetter;