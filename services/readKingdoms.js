"use strict";

const fs = require("fs");


function kingdomGetter(req, res, next) {
    let p = _readFile();
    p.then(function onFulfilled(data) {
        //console.log(data);
        req.kingdoms = JSON.parse(data);
        next();
    })
    .catch(function onError(err) {
        console.log(err);
    });
}

function realmInfoScrubber(req, res, next) {
    req.kingdoms.forEach(function (element, index, arr) {
		countCastles(element, 'castles');
	});
	next();
}





function countCastles(obj) {
	obj.numOfCastles = _propertyCounter(obj, "castles");
}


function _propertyCounter(obj, prop) {
    return obj[prop].length;
}

function writeToFile(data) {
    _writeFileSync(data);
}


function _readFile() {
    return new Promise( (resolve, reject) => {
	    let cb = promiseWrap(resolve, reject);
	    fs.readFile('./data/realms.json', 'utf8', cb);
    });
}

function _writeFileSync(data) {
    fs.writeFileSync('./data/realms.json', data);
}




function promiseWrap(resolve, reject) {
  return function errorFirstConverter(err, data) {
  if (err){
    reject(err);
  }
    resolve(data);
  };
}


module.exports = {
    kingdomGetter,
    writeToFile,
    realmInfoScrubber
};