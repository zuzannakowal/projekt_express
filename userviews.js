"use strict";

class userViews{
    fullTableView(tablica){
        let html = "<table>"
        tablica.forEach(elem => {
            html += "<tr><td>id: " + elem.id  + "</td><td>user: " + elem.login  + " - " + elem.pass + "</td><td>uczeń: ";
            if (elem.uczen){
                html += "&#9745"
            } else {
                html += "&#9744"
            }
            html += "</td><td> wiek: " + elem.wiek + "</td><td> płeć: " + elem.plec + "</td></tr>"
        });
        html += "</table>"
        return html
    }

    ageTableView(tablica){
        let html = "<table>"
        tablica.forEach(elem => {
            html += "<tr><td>id: " + elem.id  + "</td><td>user: " + elem.login  + " - " + elem.pass + "</td><td> wiek: " + elem.wiek + "</td></tr>"
        });
        html += "</table>"
        return html
    }
    genderTableView(tablica){
        let html = "<table>"
        tablica.forEach(elem => {
            html += "<tr><td>id: " + elem.id  + "</td><td> płeć: " + elem.plec + "</td></tr>"
        });
        html += "</table>"
        return html
    }
}

module.exports = userViews