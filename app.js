"use strict";

const express = require("express");
const fs = require("fs");
const handleBars = require("express-handlebars");
const bodyParser = require("body-parser");

//Require routers
const realm = require('./routes/realm');
const kingdoms = require('./routes/kingdom');

//Create app instance
let app = express();


app.engine('handlebars', handleBars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', realm);
app.use('/kingdoms/', kingdoms);

//Initialize port
let port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log("Server started!");
});
