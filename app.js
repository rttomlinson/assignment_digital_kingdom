"use strict";


const express = require("express");
const fs = require("fs");

//Create app instance
let app = express();


//Initialize port
let port = process.env.PORT || 3000;





app.listen(port, function() {
    console.log("Server started!");
});
