"use strict";

const Users = require("./users.js")
const userViews = require("./userviews.js")
const appViews = require("./appviews.js")

let uczniowie = new Users();
let widokUczniow = new userViews();
let aplikacja = new appViews(widokUczniow);

uczniowie.zapiszUzytkownika("aaa", "sss", 24, true, "k")
uczniowie.zapiszUzytkownika("aab", "sss", 45, true, "m")
uczniowie.zapiszUzytkownika("swd", "sss", 12, false, "k")

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

var cookieParser = require("cookie-parser");
const { type } = require("os");
const { nextTick } = require("process");

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

function sprawdzLogowanie(req, res){
    if (!sesja.czyZalogowany(req)){
        res.send(aplikacja.rysujEkranNiezalogowany("Zaloguj się!"))
        return false
    } else {
        return true
    }
}

app.use(express.static('static'));

app.use("/",function(req,res,next){
    console.log('obsluguje url: ',req.url)
    next()
})

app.get("/", function(req,res){
    if (!sprawdzLogowanie(req,res)) { return }
    let msg = null
    if (typeof req.query.msg !== 'undefined'){
        msg = req.query.msg
    }
    res.send(aplikacja.rysujEkranZalogowany(msg))
})

app.get('/admin', function(req, res){
    if (!sprawdzLogowanie(req,res)) { return }
        
    res.send(aplikacja.rysujEkranAdmin("wybierz raport"))
})

/*
app.get("/sort", function(req, res){
    if (!sprawdzLogowanie(req,res)) { return }
    const dane = uczniowie.sortujWiekiem("asc")
    res.send(aplikacja.rysujEkranRaportu1(dane, "asc", "sort"))    
})
*/

app.all("/sort", function(req, res){
    if (!sprawdzLogowanie(req,res)) { return }
    console.log(req.body)
    let order = "asc"
    if (typeof req.body.order !== 'undefined'){
        console.log("jest podany kierunek")
        if (req.body.order == "desc"){
            order = req.body.order
        }
    }
    const dane = uczniowie.sortujWiekiem(order)
    res.send(aplikacja.rysujEkranRaportu1(dane, order, "sort"))  
})

app.get("/gender", function(req, res){
    if (!sprawdzLogowanie(req,res)) { return }
    const daneK = uczniowie.filtrujPlec("k")
    const daneM = uczniowie.filtrujPlec("m")
    res.send(aplikacja.rysujEkranRaportu2(daneK, daneM, "gender"))    
})

app.get("/show", function(req, res){
    if (!sprawdzLogowanie(req,res)) { return }
    const dane = uczniowie.listujUzytkownikow()
    res.send(aplikacja.rysujEkranRaportu3(dane, "show"))    
})

app.get('/register', function(req, res){

    res.send(aplikacja.rysujEkranRejestracji(sesja.czyZalogowany(req), null))
})

app.post("/register", function(req, res){
    console.log(req.body)
    if (
        typeof req.body.login !== 'undefined' ||
        typeof req.body.pass !== 'undefined' ||
        typeof req.body.wiek !== 'undefined' ||
        typeof req.body.gender !== 'undefined'
        ){
        if (req.body.login !== '' && req.body.pass !== ''){
            let uczen = false
            if (typeof req.body.uczen !== 'undefined'){
                // uczniowie.zapiszUzytkownika("aaa", "sss", 24, true, "k")
                uczen = true
            }
            let wynik = uczniowie.zapiszUzytkownika(req.body.login, req.body.pass, req.body.wiek, uczen, req.body.gender)
            if (wynik){
                res.redirect("/?msg=Konto pomyślnie dodane")
            } else {
                res.send(aplikacja.rysujEkranRejestracji(sesja.czyZalogowany(req), "Błąd dodawania użytkownika"))
            }

            
        }else {
            res.send(aplikacja.rysujEkranRejestracji(sesja.czyZalogowany(req), "Błędne dane rejestracji"))
        }

        
    } else {
        console.log("Brak zmiennych rejestracji")
        res.redirect("/register")
    }
})

app.get('/login', function(req, res){
    res.send(aplikacja.rysujStroneLogowania(null))
})

app.post("/login", function(req, res){
    if (typeof req.body.login !== 'undefined' || typeof req.body.pass !== 'undefined'){
        let wynik = uczniowie.zaloguj(req.body.login, req.body.pass)
        if (wynik){
            sesja.zapamietaj(res, wynik.sekret)
            res.redirect("/admin")
        } else {
            res.send(aplikacja.rysujStroneLogowania("błędny login lub hasło!"))
        }
    } else {
        console.log("brak zmiennych logowania")
        res.redirect("/login")
    }

})

app.get("/logout", function(req, res){
    sesja.wyloguj(res)
    res.send(aplikacja.rysujEkranNiezalogowany("zostałeś wylogowany"))
})



app.listen(PORT, function(){
    console.log('start serwera na porcie ' + PORT)
})