const express = require('express');
const fs = require("fs");

let { kingdomGetter, writeToFile } = require("../services/readKingdoms.js");

var router = express.Router();


router.use(kingdomGetter);



router.get("/:kingdom", function(req, res) {
	console.log("trying to get the page");
	let kingdom = req.params.kingdom;
	//locate kingdom in req.kingdoms
	let jsonKingdom = req.kingdoms.find(function(element) {
		return element.name === kingdom;
	});
	jsonKingdom.castles.forEach(function (element, index, arr) {
		
		
		element.lieges = element.lieges.length;
		
	});
	if(jsonKingdom){
		console.log(jsonKingdom);	
	} else {//If we don't a kingdom with the same name as the submitted data
		console.log("Kingdom doesn't exist!");


	}
	//grab king, queen, # of castles, name


	//display info on kingdoms.hb

	// let allLieges = [];
	// req.kingdoms.forEach( (el) => {
 // 		allKingdoms.push(el.name);
	// });
	
	res.render("kingdoms.handlebars", { "kingdom": jsonKingdom });
});

// router.post("/", function(req, res) {
	
// 	//If we find a match
// 	if(req.kingdoms.find(function(element) {
// 		return element.name === req.body.kingdom;
// 	})) {
// 		//Rerender the page
// 		console.log("That kingdom already exists!");
		
// 	} else {//If we don't a kingdom with the same name as the submitted data
// 		console.log("Adding new kingdom!");
// 			//make new object with post data
// 		let newKingdom = {};
// 		newKingdom.name = req.body.kingdom;
// 			//push new kingdom to req.kingdoms
// 		req.kingdoms.push(newKingdom);
// 			//change req.kingdoms back to string
// 		let stringKings = JSON.stringify(req.kingdoms, null, 2);
// 			//overwrite json file
// 		fs.writeFileSync('./data/realms.json', stringKings);
		
		

// 	}
// 	res.redirect("back");

// });


module.exports = router;

