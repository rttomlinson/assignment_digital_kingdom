const express = require('express');
const fs = require("fs");

let kingdomReader = require("../services/readKingdoms.js");

var router = express.Router();


router.use(kingdomReader);



router.get("/", function(req, res) {
	//console.log("Got it");
	//console.log("Here in get handler req.kingdoms", req.kingdoms);
	let allKingdoms = [];
	let json = JSON.parse(req.kingdoms);
	json.forEach( (el) => {
 		allKingdoms.push(el.name);
	});
	
	
	
	res.render("realms.handlebars", { "kingdoms": allKingdoms });
});


module.exports = router;

