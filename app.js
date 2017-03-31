"use strict";

const express = require("express");
const fs = require("fs");
const handleBars = require("express-handlebars");
const realm = require('./routes/realm');

//Create app instance
let app = express();


app.engine('handlebars', handleBars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/', realm);

//Initialize port
let port = process.env.PORT || 3000;

function promiseWrap(resolve, reject) {
  return function errorFirstConverter(err, data) {
  if (err){
  reject(err);
  }
  resolve(data);
  };
}

let p = new Promise( (resolve, reject) => {
	let cb = promiseWrap(resolve, reject);
	fs.readFile('./data/realms.json', 'utf8', cb);
});







app.listen(port, function() {
    console.log("Server started!");
});
