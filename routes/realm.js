const express = require('express');
const fs = require("fs");

//let kingdomReader = require("../services/readKingdoms.js");

var router = express.Router();


/*
router.use(function(req, res, next) {
	let kingdoms = kingdomReader();
	req.kingdoms = [];
	
});
*/

function kingdomGetter() {
    return new Promise( (resolve, reject) => {
	    let cb = promiseWrap(resolve, reject);
	    fs.readFile('./data/realms.json', 'utf8', cb);
    });
}

router.get("/", function(req, res) {
	console.log("Got it");
	
	let kingdoms = {};
	res.render("realms.handlebars", { "kingdoms": kingdoms });
});


module.exports = router;


//Helper function
function promiseWrap(resolve, reject) {
  return function errorFirstConverter(err, data) {
  if (err){
  reject(err);
  }
  resolve(data);
  };
}