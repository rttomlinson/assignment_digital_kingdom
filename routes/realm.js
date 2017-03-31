const express = require('express');
const fs = require("fs");

let { kingdomGetter, writeToFile, propertyCounter } = require("../services/readKingdoms.js");

var router = express.Router();


router.use(kingdomGetter);



router.get("/", function(req, res) {
	//console.log("Got it");
	//console.log("Here in get handler req.kingdoms", req.kingdoms);
	
	req.kingdoms.forEach(function (element, index, arr) {
		propertyCounter(element, 'castles');
	});
	
	
	/*req.kingdoms.forEach( function(element, index, arr) {
		conuter('castles', element);
	
		countCastles(element);
	}
	function countCastles(someObject) {
		element.numOfCastles = element.castles.length;
	}
	counter('castles', <a kingdom>);
	
	function counter(nameOfProperty, element) {
		element["numOf" + nameOfProperty] = element['nameOfProperty'].length
	}
	*/
	
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

