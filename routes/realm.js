const express = require('express');
const fs = require("fs");

let { kingdomGetter, writeToFile, realmInfoScrubber } = require("../services/readKingdoms.js");

var router = express.Router();


router.use(kingdomGetter);

router.use(realmInfoScrubber);

router.get("/", function(req, res) {
	//console.log("Got it");
	//console.log("Here in get handler req.kingdoms", req.kingdoms);
	
	//realmsInfoScrubber(req.kingdoms)
	res.render("realms.handlebars", { "kingdoms": req.kingdoms });
});

router.post("/", function(req, res) {
	
	//If we find a match
	if(req.kingdoms.find(function(element) {
		return element.name === req.body.kingdom;
	})) {
		//Rerender the page
		console.log("That kingdom already exists!");
		
	} else {//If we don't a kingdom with the same name as the submitted data
		console.log("Adding new kingdom!");
			//make new object with post data
		let newKingdom = {};
		newKingdom.name = req.body.kingdom;
			//push new kingdom to req.kingdoms
		req.kingdoms.push(newKingdom);
			//change req.kingdoms back to string
		let stringKings = JSON.stringify(req.kingdoms, null, 2);
			//overwrite json file
		fs.writeFileSync('./data/realms.json', stringKings);
		
		

	}
	res.redirect("back");

});


module.exports = router;

