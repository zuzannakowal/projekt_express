"use strict";

const Users = require("./users.js")
const userViews = require("./userviews.js")
const appViews = require("./appviews.js")

let uczniowie = new Users();
let widokUczniow = new userViews();
let aplikacja = new appViews();

uczniowie.zapiszUzytkownika("aaa", "sss", 24, true, "k")
uczniowie.zapiszUzytkownika("aab", "sss", 45, true, "m")
uczniowie.zapiszUzytkownika("swd", "sss", 12, false, "k")
console.log(uczniowie.zaloguj("swd", "sss"))
console.log(uczniowie.zaloguj("sad", "wer"))
console.log(uczniowie.filtrujPlec("m"))
console.log(uczniowie.filtrujPlec("k"))
console.log(uczniowie.sortujWiekiem("asc"))
console.log(uczniowie.sortujWiekiem("desc"))
console.log(widokUczniow.tableView(uczniowie.sortujWiekiem("desc")))


console.log(uczniowie.listujUzytkownikow())

console.log(uczniowie.sprawdzSekret('e533e4c4aad46b1f062c7b1ce862634e'))
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

class Sesja{
    constructor(baza){
        this.baza = baza
        this.ciasteczko = "usersecret"
    }
    zapamietaj(res, sekret){
        res.cookie(this.ciasteczko, sekret, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 4),
            httpOnly:true
        })
        return true
    }
    wyloguj(res){
        res.clearCookie(this.ciasteczko)
        return true
    }
    czyZalogowany(req){
        if (typeof req.cookies[this.ciasteczko] === 'undefined'){
            console.log("brak ciasteczka")
            return false
        } else {

            let sekretValue = req.cookies[this.ciasteczko]
            let userid = this.baza.sprawdzSekret(sekretValue)
            console.log("logowanie: ", sekretValue, userid)
            if (userid !== null){
                return true
            } else {
                return false
            }
        }
    }
}

const sesja = new Sesja(uczniowie)


app.get("/show", function(req, res){
    if (!sesja.czyZalogowany(req)){
        res.send(aplikacja.rysujMenuNiezalogowane() + "<br>" + aplikacja.rysujMsgBox("zaloguj się!"))
        return
    }
    res.send(widokUczniow.tableView(uczniowie.sortujWiekiem("desc")))
})

app.get("/", function(req,res){
    res.send(aplikacja.rysujMenuNiezalogowane() + "<br>" + aplikacja.rysujMsgBox("zaloguj się!"))
})

app.get('/admin', function(req, res){
    if (!sesja.czyZalogowany(req)){
        res.send(aplikacja.rysujMenuNiezalogowane() + "<br>" + aplikacja.rysujMsgBox("zaloguj się!"))
        return
    }
    
    res.send(aplikacja.rysujMenuZalogowane() + '<br>' + aplikacja.rysujMenuAdmin())
})

app.get('/register', function(req, res){
    res.send(aplikacja.rysujFormularzRejestracji())
})

app.get('/login', function(req, res){
    res.send(aplikacja.rysujFormularzLogowania())
})

app.post("/login", function(req, res){
    if (typeof req.body.login !== 'undefined' || typeof req.body.pass !== 'undefined'){
        let wynik = uczniowie.zaloguj(req.body.login, req.body.pass)
        if (wynik){
            sesja.zapamietaj(res, wynik.sekret)
            res.redirect("/admin")
        } else {
            res.send(aplikacja.rysujMenuNiezalogowane() + "<br>" + aplikacja.rysujMsgBox("błędny login lub hasło!") + "<br>" + aplikacja.rysujFormularzLogowania())
        }
    } else {
        console.log("brak zmiennych logowania")
        res.redirect("/login")
    }

})

app.get("/logout", function(req, res){
    sesja.wyloguj(res)
    res.send(aplikacja.rysujMenuNiezalogowane() + "<br>" + aplikacja.rysujMsgBox("zostałeś wylogowany"))
})

app.listen(PORT, function(){
    console.log('start serwera na porcie ' + PORT)
})