"use strict";
console.log('start servera');

var express = require('express');
/*const { Server } = require('http');
const { dirname } = require('path');*/

var path = require("path")

var app = express()

const PORT = 3000;

app.use(express.urlencoded({
    extended: true
}))

var cookieParser = require("cookie-parser")

app.use(cookieParser())

app.listen(PORT, function(){
    console.log('start serwera na porcie ' + PORT)
})