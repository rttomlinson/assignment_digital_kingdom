const express = require('express');
const fs = require("fs");

let kingdomReader = require("../services/readKingdoms.js");

var router = express.Router();



router.use(function(req, res, next) {
	let kingdoms = kingdomReader();
	req.kingdoms = [];
	
});


let kingdoms = kingdomGetter();
let allKingdoms = [];

kingdoms.then(function onfullfilled(data) {
	let json = JSON.parse(data);
	json.forEach( (el) => {
		allKingdoms.push(el.name);
	})

})


router.get("/", function(req, res) {
	console.log("Got it");
	res.render("realms.handlebars", { "kingdoms": allKingdoms });
});


module.exports = router;
