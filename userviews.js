"use strict";

class userViews{
    fullTableView(tablica){
        let html = "<table>"
        tablica.forEach(elem => {
            html += `<tr><td class="fullTd">id: ` + elem.id  + `</td><td class="fullTd">user: ` + elem.login  + " - " + elem.pass + `</td><td class="fullTd">uczeń: `;
            if (elem.uczen){
                html += "&#9745"
            } else {
                html += "&#9744"
            }
            html += `</td><td class="fullTd"> wiek: ` + elem.wiek + `</td><td class="fullTd"> płeć: ` + elem.plec + "</td></tr>"
        });
        html += "</table>"
        return html
    }

    ageTableView(tablica){
        let html = "<table>"
        tablica.forEach(elem => {
            html += `<tr><td class="ageTd">id: ` + elem.id  + `</td><td class="ageTd">user: ` + elem.login  + " - " + elem.pass + `</td><td class="ageTd"> wiek: ` + elem.wiek + "</td></tr>"
        });
        html += "</table>"
        return html
    }
    genderTableView(tablica){
        let html = "<table>"
        tablica.forEach(elem => {
            html += `<tr><td class="genderTd">id: ` + elem.id  + `</td><td class="genderTd"> płeć: ` + elem.plec + "</td></tr>"
        });
        html += "</table>"
        return html
    }
}

module.exports = userViews