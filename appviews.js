"use strict";

class appViews{
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
        return this.rysujMenu([{name:'main',url:'/'},{name:'register',url:'/register'},{name:'login',url:'/login'},{name:'admin',url:'/admin'},{name:'logout',url:'/logout'}]
        ,'menuNiebieskie')
    }

    rysujMenuAdmin(){
        return this.rysujMenu([{name:'sort',url:'/sort'},{name:'gender',url:'/gender'},{name:'show',url:'/show'}]
        ,'menuZolte')
    }

    rysujMsgBox(info){
        let html = `<div class="msgbox">${info}</div>`
        return html
    }

    rysujFormularzRejestracji(){
        let html = `<div class="rejestracja">
        <form method="POST" action="/register2">
        login: <input type="text" name="login"><br>
        password: <input type="password" name="pass"><br>
        wiek: <select name="wiek">`
        for (let i = 10; i <= 50; i++)
            html += `<option value="${i}">${i}</option>`
        html += `</select><br>
        uczeń: <input type="checkbox" name="uczen" value="1"><br>
        płeć: <input type="radio" name="gender" value="m">
        <label for="male">M</label>
        <input type="radio" name="gender" value="k">
        <label for="female">K</label><br>
        <input type="submit" value="submit">
        </form>
        </div>`;
        return html;
    }

    rysujFormularzLogowania(){
        let html = `<div class="rejestracja">
        <form method="POST" action="/login2">
        login: <input type="text" name="login"><br>
        password: <input type="password" name="pass"><br>
        <input type="submit" value="submit">
        </form>
        </div>`;
        return html;
    }
}

module.exports = appViews