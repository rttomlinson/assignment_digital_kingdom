"use strict";

const fs = require("fs");


function kingdomGetter(req, res, next) {
    let p = _readFile();
    p.then(function onFulfilled(data) {
        req.kingdoms = JSON.parse(data);
		next();
    }, function onRejected(err) {
        console.log("An error occured when calling _readFile()", err);
        //Maybe just dummy req.kingdoms value?
        next();
    })
    .catch(function onError(err) {
        console.log("An error occurred when processing kingdomGetter", err);
    });

}

function realmInfoScrubber(obj) {
    return new Promise(function (resolve, reject) {
        obj.forEach(function (element, index, arr) {
		    countCastles(element, 'castles');
	    });
	    resolve();
    });
}

function kingdomInfoScrubber(obj) {
    obj.forEach((element) => {
        countLieges(element, 'lieges');
    })
}

function countCastles(obj) {
    obj.numOfCastles = _propertyCounter(obj, "castles");
}

function countLieges(obj) {
	obj.numOfLieges = _propertyCounter(obj, "lieges");
}

function kingdomExists(kingdomName, kingdomsList) {
    return kingdomsList.find(function(element) {
        return element.name === kingdomName;
    });
}

function makeNewKingdom(kingdomData) {
    let kingdom = {};
    //Add name of new kingdom from kingdomData
    kingdom.name = kingdomData.kingdom
    //Extract Castles from kingdomData if available
    kingdom.castles = [];
    return kingdom;
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
    realmInfoScrubber,
    kingdomExists,
    kingdomInfoScrubber,
    makeNewKingdom
};