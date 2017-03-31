"use strict";

const fs = require("fs");


function kingdomGetter(req, res, next) {
    let p = new Promise( (resolve, reject) => {
	    let cb = promiseWrap(resolve, reject);
	    fs.readFile('./data/realms.json', 'utf8', cb);
    });
    
    p.then(function onFulfilled(data) {
        //console.log(data);
        req.kingdoms = JSON.parse(data);
        next();
    })
    .catch(function onError(err) {
        console.log(err);
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