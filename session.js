"use strict";

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

module.exports = Sesja