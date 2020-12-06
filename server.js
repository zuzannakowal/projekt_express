"use strict";

const Users = require("./users.js")
const userViews = require("./userviews.js")
const appViews = require("./appviews.js")

let uczniowie = new Users();
let widokUczniow = new userViews();
let aplikacja = new appViews();

uczniowie.zapiszUzytkownika("aaa", "sss", 24, true, "k")
uczniowie.zapiszUzytkownika("def", "sss", 45, true, "m")
uczniowie.zapiszUzytkownika("swd", "sss", 12, false, "k")
console.log(uczniowie.zaloguj("swd", "sss"))
console.log(uczniowie.zaloguj("sad", "wer"))
console.log(uczniowie.filtrujPlec("m"))
console.log(uczniowie.filtrujPlec("k"))
console.log(uczniowie.sortujWiekiem("asc"))
console.log(uczniowie.sortujWiekiem("desc"))
console.log(widokUczniow.tableView(uczniowie.sortujWiekiem("desc")))


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

app.get("/show", function(req, res){
    res.send(widokUczniow.tableView(uczniowie.sortujWiekiem("desc")))
})

app.get("/", function(req,res){
    res.send(aplikacja.rysujMenuNiezalogowane() + "<br>" + aplikacja.rysujMsgBox("zaloguj się!"))
})

app.get('/admin', function(req, res){
    res.send(aplikacja.rysujMenuZalogowane() + '<br>' + aplikacja.rysujMenuAdmin())

})

app.get('/register', function(req, res){
    res.send(aplikacja.rysujFormularzRejestracji())
})

app.get('/login', function(req, res){
    res.send(aplikacja.rysujFormularzLogowania())
})

app.listen(PORT, function(){
    console.log('start serwera na porcie ' + PORT)
})