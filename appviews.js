"use strict";

class appViews{
    constructor(widokUczniow){
        this.widokUczniow = widokUczniow
    }

    rysujStroneLogowania(msg){
        let html = ''
        return html.concat(
            this.rysujHeader(msg),
            this.rysujMenu2(false),
            "<br>",
            this.rysujMsgBox(msg),
            this.rysujFormularzLogowania(),
            this.zakonczHTML()
        )
    }

    rysujEkranNiezalogowany(msg){
        let html = ''
        return html.concat(
            this.rysujHeader(msg),
            this.rysujMenuNiezalogowane(),
            "<br>",
            this.rysujMsgBox(msg),
            this.zakonczHTML()
        )
    }

    rysujEkranZalogowany(msg){
        let html = ''
        return html.concat(
            this.rysujHeader(msg),
            this.rysujMenuZalogowane(),
            "<br>",
            this.rysujMsgBox(msg),
            this.zakonczHTML()
        )
    }

    rysujEkranAdmin(msg){
        let html = ''
        return html.concat(
            this.rysujHeader(msg),
            this.rysujMenuZalogowane(),
            "<br>",
            this.rysujMenuAdmin(),
            "<br>",
            this.rysujMsgBox(msg),
            this.zakonczHTML()
        )
    }

    rysujEkranRaportu1(daneTab, order, msg){
        let html = ''
        return html.concat(
            this.rysujHeader(msg),
            this.rysujMenuZalogowane(),
            "<br>",
            this.rysujMenuAdmin(),
            "<br>",
            this.rysujMsgBox(msg),
            "<br>",
            this.rysujFormularzSortowania(order),
            this.widokUczniow.ageTableView(daneTab),
            this.zakonczHTML()
        )
    }

    rysujEkranRaportu2(daneTab1, daneTab2, msg){
        let html = ''
        return html.concat(
            this.rysujHeader(msg),
            this.rysujMenuZalogowane(),
            "<br>",
            this.rysujMenuAdmin(),
            "<br>",
            this.rysujMsgBox(msg),
            "<br>",
            this.widokUczniow.genderTableView(daneTab1),
            "<br>",
            this.widokUczniow.genderTableView(daneTab2),
            this.zakonczHTML()
        )
    }

    rysujEkranRaportu3(daneTab,msg){
        let html = ''
        return html.concat(
            this.rysujHeader(msg),
            this.rysujMenuZalogowane(),
            "<br>",
            this.rysujMenuAdmin(),
            "<br>",
            this.rysujMsgBox(msg),
            "<br>",
            this.widokUczniow.fullTableView(daneTab),
            this.zakonczHTML()
        )
    }

    rysujEkranRejestracji(czyZalogowany, msg){
        let html = ''
        return html.concat(
            this.rysujHeader("Rejestracja"),
            this.rysujMenu2(czyZalogowany),
            "<br>",
            this.rysujMsgBox(msg),
            this.rysujFormularzRejestracji(),
            this.zakonczHTML()
        )
    }

    rysujMenu2(czyZalogowany){
        if (czyZalogowany){
            return this.rysujMenuZalogowane()
        } else {
            return this.rysujMenuNiezalogowane()
        }
    }

    rysujHeader(title){
        const html = `
        <html><head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
        <link rel="icon" href="/favicon.ico" type="image/x-icon">
        <link rel="stylesheet" href="css/style.css">
        </head><body>
        `
        return html
    }

    zakonczHTML(){
        const html = '</body></html>'
        return html
    }

    rysujMenu(menuTab, nazwaKlasy){
        let html = `<table class="${nazwaKlasy}"><tr>`;
        menuTab.forEach(element => {
            html += `<td><a href="${element.url}">${element.name}</a></td>`
        });
        html += "</tr></table>"
        return html
    }
    rysujMenuNiezalogowane(){
        return this.rysujMenu([{name:'main',url:'/'},{name:'register',url:'/register'},{name:'login',url:'/login'},{name:'admin',url:'/admin'}]
        ,'menuCzerwone')
    }

    rysujMenuZalogowane(){
        return this.rysujMenu([{name:'main',url:'/'},{name:'register',url:'/register'},{name:'admin',url:'/admin'},{name:'logout',url:'/logout'}]
        ,'menuNiebieskie')
    }

    rysujMenuAdmin(){
        return this.rysujMenu([{name:'sort',url:'/sort'},{name:'gender',url:'/gender'},{name:'show',url:'/show'}]
        ,'menuZolte')
    }

    rysujMsgBox(info){
        let html = ''
        if (info !== null){
            html = `<div class="msgbox">${info}</div><br>`
        }
        return html
    }

    rysujFormularzRejestracji(){
        let html = `<div class="rejestracja"><table class="register">
        <form method="POST" action="/register">
        <tr><td class="registerTd">login: </td><td class="registerTd"><input type="text" name="login"></td></tr><br>
        <tr><td class="registerTd">password: </td><td class="registerTd"><input type="password" name="pass"></td></tr><br>
        <tr><td class="registerTd">wiek: </td><td class="registerTd"><select name="wiek">`
        for (let i = 10; i <= 50; i++)
            html += `<option value="${i}">${i}</option>`
        html += `</select></td></tr><br>
        <tr><td class="registerTd">uczeń: </td><td class="registerTd"><input type="checkbox" name="uczen" value="1"></td></tr><br>
        <tr><td class="registerTd">płeć: </td><td class="registerTd"><input type="radio" name="gender" value="m">
        <label for="male">M</label>
        <input type="radio" name="gender" value="k" checked>
        <label for="female">K</label></td></tr><br>
        <tr><td class="registerTd"><input type="submit" value="submit"></td></tr></table>
        </form>
        </div>`;
        return html;
    }

    rysujFormularzLogowania(){
        let html = `<div class="logowanie"><table class="login">
        <form method="POST" action="/login">
        <tr><td class="loginTd">login: </td><td class="loginTd"><input type="text" name="login"></td></tr><br>
        <tr><td class="loginTd">password: </td><td class="loginTd"><input type="password" name="pass"></td></tr><br>
        <tr><td class="loginTd"><input type="submit" value="submit"></td></tr></table>
        </form>
        </div>`;
        return html;
    }

    rysujFormularzSortowania(order){
        let html = `<div class="sortowanie">
        <form onchange="this.submit()" method="POST" action="/sort">
        <input type="radio" name="order" value="asc" `
        if (order == "asc"){
            html += 'checked'
        }
        html += `>
        <label>rosnąco</label>
        <input type="radio" name="order" value="desc" `
        if (order == "desc"){
            html += 'checked'
        }
        html += `>
        <label>malejąco</label><br>
        </form>
        </div>`;
        return html;
    }
}

module.exports = appViews