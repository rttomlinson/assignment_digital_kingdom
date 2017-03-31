const express = require('express');
const fs = require("fs");

let kingdomReader = require("../services/readKingdoms.js");

var router = express.Router();


router.use(kingdomReader);



router.get("/", function(req, res) {
	//console.log("Got it");
	//console.log("Here in get handler req.kingdoms", req.kingdoms);
	let allKingdoms = [];
	req.kingdoms.forEach( (el) => {
 		allKingdoms.push(el.name);
	});
	
	res.render("realms.handlebars", { "kingdoms": allKingdoms });
});

router.post("/", function(req, res) {
	

	if(!req.kingdoms.find(function(element) {
		return element.name === req.body.kingdom
	}))
	//make new object with post data
	//push new kingdom to req.kingdom
	//change req.kingdoms back to string
	//overwrite json file
})


module.exports = router;

