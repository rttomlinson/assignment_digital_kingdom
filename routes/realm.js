const express = require('express');
const fs = require("fs");

let { kingdomGetter, writeToFile, realmInfoScrubber, kingdomExists } = require("../services/readKingdoms.js");

var router = express.Router();

router.use(kingdomGetter);


router.get("/", function(req, res) {

	let p = realmInfoScrubber(req.kingdoms);
    p.then(function onFulfilled(data) {
    	res.render("realms.handlebars", { "kingdoms": req.kingdoms });
    })
    .catch(function onError(err) {
        console.log(err);
    });

});

router.post("/", function(req, res) {
	
	//If we find a match

	if (kingdomExists(req.body.kingdom, req.kingdoms)) {
		console.log("That kingdom already exists!");
	} else {
		console.log("Adding new kingdom!");
			//make new object with post data
		let newKingdom = {};
		newKingdom.name = req.body.kingdom;
			//push new kingdom to req.kingdoms
			//Add castles array to newKingdom
		newKingdom.castles = [];
		req.kingdoms.push(newKingdom);
			//change req.kingdoms back to string
		let stringKings = JSON.stringify(req.kingdoms, null, 2);
			//overwrite json file
		fs.writeFileSync('./data/realms.json', stringKings);
	}

	res.redirect("back");

});


module.exports = router;

