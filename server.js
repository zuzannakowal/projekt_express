"use strict";

const Users = require("./users.js")

let uczniowie = new Users();
uczniowie.zapiszUzytkownika("aaa", "sss", 24, true, "k")
uczniowie.zapiszUzytkownika("def", "sss", 45, true, "m")
uczniowie.zapiszUzytkownika("swd", "sss", 12, false, "k")
console.log(uczniowie.zaloguj("swd", "sss"))
console.log(uczniowie.zaloguj("sad", "wer"))
console.log(uczniowie.filtrujPlec("m"))
console.log(uczniowie.filtrujPlec("k"))
console.log(uczniowie.sortujWiekiem("asc"))
console.log(uczniowie.sortujWiekiem("desc"))

console.log(uczniowie.listujUzytkownikow())
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