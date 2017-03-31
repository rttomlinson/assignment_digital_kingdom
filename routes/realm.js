const express = require('express');

var router = express.Router();



router.get("/", function(req, res) {
	console.log("Got it");
	res.end("hello browser")
})


module.exports = router;