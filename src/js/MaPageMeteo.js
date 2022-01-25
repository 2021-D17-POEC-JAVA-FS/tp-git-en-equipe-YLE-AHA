
let doc =  document.getElementById('tabmeteo');
let meteo;

/*
o Heure
o Température
o Description du temps
o Pression
o Vitesse et direction du vent
o Icône correspondante : Exemple de lien pour récupérer l’icône 04d correspondant à temps couvert : https://openweathermap.org/img/w/04d.png
*/
let orderArrayHeader = ["Heure", "T°","Temps","Vent (Vitesse / Direction)", "icone"];

function init(lien){
        fetch(lien)
            .then(function(reponse){
                return reponse.json();
            })
            .then (function(data){
                meteo = [data];
                //console.log(meteo)
                loadTabMeteo();
            });
        }


 function loadTabMeteo(){
    loadTable()
 }

function loadTable(){			
    let tab = loadTHead();
    loadTBody(tab);
}

function loadTHead(){
    let newTab = document.createElement("table");
    newTab.className = "table table-striped table-hover table-bordered";
    
    let newTHead = document.createElement("thead");
    newTHead.className = "table-dark";
    newTab.appendChild(newTHead);
    doc.appendChild(newTab);

    let newTr = document.createElement("tr");
    newTHead.appendChild(newTr);
			
    orderArrayHeader.forEach(h => {
            let newTh = document.createElement("th");
            let textNode = document.createTextNode(h) ;
            newTh.setAttribute("scope","row");
            newTr.appendChild(newTh).appendChild(textNode);
            
        });
    return newTab;
}

function loadTBody(tab){
    let newTBody = document.createElement("tbody");
    tab.appendChild(newTBody);

    for (const m of meteo) {
        let newTr = document.createElement("tr");
        newTBody.appendChild(newTr);
        initTd(newTr,m);
    }

}


function initTd(tr,m){
    let i = 1;
    for (const el of orderArrayHeader) {
        //console.log(el);
        newTd = document.createElement("td");
        tr.appendChild(newTd);
    }

    td = tr.querySelectorAll("td");

    // img.width = "32"

    console.log(m);

    td[0].innerHTML = new Date(m.dt*1000).toLocaleTimeString();
    td[1].innerHTML = m.main.temp;
    td[2].innerHTML = m.weather[0].description;
    
    td[3].innerHTML = m.wind.speed;
    let img = document.createElement('img'); 
    img.src = "img/arrow-wind.png";
    img.width = "32"
    img.style.transform = "rotate(" + m.wind.deg + "deg) scale(0.9)";
    td[3].appendChild(img);
    let img2 = document.createElement('img'); 
    img2.src = "https://openweathermap.org/img/w/" + m.weather[0].icon + ".png";
    td[4].appendChild(img2);

}
