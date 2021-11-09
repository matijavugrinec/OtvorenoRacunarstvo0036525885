const db = require('../db');

async function getData(filter,filtertype) {
    let clubRows;
    let upit
    if(filtertype != "wildcard")
        upit = ('SELECT * FROM osnovni_podaci natural join dvorane natural join igraci natural join pomocni_treneri WHERE '+  filtertype +' = ' +"'"+ filter + "'")
    else {
        if(isNaN(filter)){
            upit = 'SELECT * FROM osnovni_podaci natural join dvorane natural join igraci natural join pomocni_treneri WHERE '+ "naziv_kluba"  +' = ' +"'"+ filter  + "' or " + "ime_dvorane"  +' = ' +"'"+ filter  + "' or " + "mjesto_sjedista"  +' = ' +"'"+ filter  + "' or " + "glavni_trener"  +' = ' +"'"+ filter  + "' or " + "naziv_lige"  +' = ' +"'"+ filter  + "' or " + "punoime_igraca"  +' = ' +"'"+ filter  + "' or "+ "punoime_pomocnika" +' = ' +"'"+ filter + "'";

        } else 
            upit = 'SELECT * FROM osnovni_podaci natural join dvorane natural join igraci natural join pomocni_treneri WHERE '+ "naziv_kluba"  +' = ' +"'"+ filter  + "' or " + "ime_dvorane"  +' = ' +"'"+ filter  + "' or " + "mjesto_sjedista"  +' = ' +"'"+ filter  + "' or " + "glavni_trener"  +' = ' +"'"+ filter  + "' or " + "godina_osnutka"  +' = ' +"'"+ filter + "' or " + "pozicija2021"  +' = ' +"'"+ filter  + "' or "+ "naziv_lige"  +' = ' +"'"+ filter  + "' or "+ "kapacitet_dvorane"  +' = ' +"'"+ filter  + "' or " + "punoime_igraca"  +' = ' +"'"+ filter  + "' or "+ "punoime_pomocnika" +' = ' +"'"+ filter + "'";
    }
    console.log(upit);
    if(!(filter == "" || filter == undefined)) 
         clubRows = await (await db.query(upit)).rows;
    else
         clubRows = await (await db.query('SELECT * FROM osnovni_podaci natural join dvorane natural join igraci natural join pomocni_treneri')).rows;

    var clubs = [];
    var first = true;
    var club
    clubRows.forEach(element => {
        console.log(element);
        if(first){
         club = new clubClass(element.naziv_kluba,element.ime_dvorane,element.mjesto_sjedista,element.glavni_trener,element.godina_osnutka,element.pozicija2021,element.naziv_lige,element.kapacitet_dvorane,element.punoime_pomocnika);
        first = false;    
        }

        if(club.naziv_kluba == element.naziv_kluba ) {
            club.ime_igraca.push(element.punoime_igraca);
        } else {
            clubs.push(club);
             club = new clubClass(element.naziv_kluba,element.ime_dvorane,element.mjesto_sjedista,element.glavni_trener,element.godina_osnutka,element.pozicija2021,element.naziv_lige,element.kapacitet_dvorane,element.punoime_pomocnika);
                club.ime_igraca.push(element.punoime_igraca);
        }
    });

    clubs.push(club);

    return clubs;

}

class clubClass {
    constructor(
        naziv_kluba,
        ime_dvorane,
        mjesto,
        glavni_trener,
        god_osnutka,
        poz2021,
        naziv_lige,
        kapacitet_dvorane,
        ime_pomocnika
    ) {
        this.naziv_kluba = naziv_kluba;
        this.ime_dvorane = ime_dvorane;
        this.mjesto = mjesto
        this.glavni_trener =glavni_trener
        this.god_osnutka =god_osnutka;
        this.poz2021 = poz2021;
        this.naziv_lige = naziv_lige;
        this.kapacitet_dvorane = kapacitet_dvorane;
        this.ime_pomocnika = ime_pomocnika;
        this.ime_igraca = [];
    }



}





module.exports = {
    getData
}