class Users{
    constructor(){
        this.tablica = []
        this.licznik = 0
        console.log("inicjalizuje pustą bazę użytkowników")
    }

    zapiszUzytkownika(login, haslo, wiek, czyUczen, plec){
        let user = {id: this.licznik, login: login, pass: haslo, wiek: wiek, uczen: czyUczen, plec: plec}
        console.log("dodaje użytkownika", user)
        this.tablica.push(user)
        this.licznik++
    }

    zaloguj(login, haslo){
        let wynik = this.tablica.find(element => element.login == login && element.pass == haslo)
        console.log("pasujacy rekord: ", wynik)
        if (typeof wynik !== 'undefined'){
            return wynik.id
        } else {
            return null
        }
    }

    listujUzytkownikow(){
        return this.tablica
    }

    filtrujPlec(plec){
        let wynik = []
        this.tablica.forEach(function(element, idx){
            if (element.plec == plec){
                wynik.push(element)
                console.log(element, idx)
            }
        })
        return wynik
    }

    sortujWiekiem(kierunek){
        let wynik = []
        this.tablica.forEach((element, idx) => {wynik.push(element)})
        wynik.sort(function(elem1, elem2){
            console.log('porownuje element: ', elem1, ' z elementem 2: ', elem2)
            if (kierunek == "asc"){
                return elem1.wiek - elem2.wiek;
            } else {
                return elem2.wiek - elem1.wiek;
            }
        })
        return wynik

    }
}

module.exports = Users