"use strict";

class appViews{
    rysujStroneLogowania(msg){
        let html = ''
   //     html.
  //      html += this.rysujMenuNiezalogowane() + "<br>" + this.rysujMsgBox(msg)
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
   //     html.
  //      html += this.rysujMenuNiezalogowane() + "<br>" + this.rysujMsgBox(msg)
        return html.concat(
            this.rysujHeader(msg),
            this.rysujMenuNiezalogowane(),
            "<br>",
            this.rysujMsgBox(msg),
            this.zakonczHTML()
        )
    }

    rysujEkranRejestracji(czyZalogowany){
        let html = ''
   //     html.
  //      html += this.rysujMenuNiezalogowane() + "<br>" + this.rysujMsgBox(msg)

        return html.concat(
            this.rysujHeader("Rejestracja"),
            this.rysujMenu2(czyZalogowany),
            "<br>",
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
        return this.rysujMenu([{name:'main',url:'/'},{name:'register',url:'/register'},{name:'login',url:'/login'},{name:'admin',url:'/admin'},{name:'logout',url:'/logout'}]
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
        <form method="POST" action="/login">
        login: <input type="text" name="login"><br>
        password: <input type="password" name="pass"><br>
        <input type="submit" value="submit">
        </form>
        </div>`;
        return html;
    }
}

module.exports = appViews