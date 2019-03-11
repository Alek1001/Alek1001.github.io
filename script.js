class Igra{ //formiranje igre
    //mal=zeton, jut stapovi=kockice za bacanje
    constructor(){
        this.name="Yut Nuri";
        this.naPotezu="A"; //ko je na potezu
        this.scoreA=0; //broj malova koji su stigli do kraja za A
        this.scoreB=0; //broj malova koji su stigli do kraja za B
        this.zadnjeBacanje=0; //zadnje bacanje jut stapova
        this.malID=0; //osiuranje da svaki mal ima jedinstven id
        this.skupMal=[]; //niz objekata malova
        this.baceno=[]; //niz bacenih jotova od strane jednog igraca
        this.blokadaBacanja=false; //Da li igrac ima pravo da baca stapove?
        this.prikaz=false; //Prikazuje se samo bacanje igraca koji je na potezu, inace se ne vidi
        this.brojMalA=4; //ukupan broj malova koji mogu da se pozovu za A
        this.brojMalB=4; //ukupan broj malova koji mogu da se pozovu za B  
        this.pravilo_minus_1=false; //specijano pravilo u kome se dozvoljava -1 kao bacanje
        this.hint_0=false; //sugestije za igrace iz podesavanja
        this.hint_1=false; //sugestije za igrace iz podesavanja
        this.hint_2=true; //sugestije za igrace iz podesavanja
        this.blokadaMala=true; //blokira se dodavanje pozicije malu, osim ako se ne igra sa njime
        this.blokadaZavrsenogPoteza=true; //blokira se da se zavrsi potez pre nego sto se bace malovi
        this.anime=true; //graficki prikaz bacanja
        this.trajanjeHinta=4000; //duzina trjanja sugestije
        this.trajanjeAnimacija=2000; //duzina trajanja animacije bacanja
        this.obavestenje=""; //obavestenje o pobedniku ili o greskama
        this.auto_potez=true; //da li zelite opciju da se potezi zavrsavaju automatski
        this.auto_bodovi=true; //opcija da se bodovi dodaju automatski kada se obrise zeton koji je stigao do kraja
    }
}

class Mal{ //formiranje zetona za igru
    constructor(pdoc,ppripadnost,id){
        this.doc=pdoc; //zetonov selektor, tipa document.querySelctor
        this.value=1; //koliko je zetona grupisano
        this.pripadnost=ppripadnost; //igracu A ili B
        this.pos=0; //pozicija na tabli
        this.id=id;
    }
}

//Bacaju se 4 Jut stapa.
Igra.prototype.bacanje=function(){
    if(!this.blokadaBacanja && this.blokadaMala){
        this.obavestenje="";
        var q,t,
            s="",
            br=0;
        for (let i=1;i<=4;i++){
                q=Math.random();
                (q<=0.46)? t=0:t=1;
                br+=t;
                s+=t;
        }
        if (br==0) br=5;
        if (s=="1000" && this.pravilo_minus_1==true) br=-1; //-1 specijalno pravilo
        this.zadnjeBacanje=br;
        this.prikaz=true;
        this.blokadaMala=false;
        this.baceno.push(this.zadnjeBacanje);
        if(this.anime) this.animeBacanje(); //animacija bacanja
        if(this.zadnjeBacanje<=3){
        this.blokadaBacanja=true;
        this.blokadaZavrsenogPoteza=false;
            }
    }
    else{
        if(this.blokadaBacanja) {
            this.obavestenje="Bacanje je već obavljeno!"; 
        }
        else if(!this.blokadaMala) {
            this.obavestenje="Igrač treba da odigra potez sa žetonom!";
        }
    }
}

//funkcija za promenu poteza igraca
Igra.prototype.zavrsenPotez=function(){
        if(this.blokadaMala && !this.blokadaZavrsenogPoteza){
            if(this.naPotezu=="A") this.naPotezu="B";
            else   this.naPotezu="A";
            this.blokadaBacanja=false;
            this.prikaz=false;
            this.baceno=[];
            this.blokadaZavrsenogPoteza=true;
            this.obavestenje="";
        }
        else{
            if(!this.blokadaMala) this.obavestenje="Igrač treba da odigra potez sa žetonom!";
            else if(this.blokadaZavrsenogPoteza) this.obavestenje="Igrač mora da baci i onda da odigra potez sa žetonom!";
        }
}

//U zavisnosti od bacenih Jut stapova, Mal se krece po tabli na sledeci nacin:
Igra.prototype.kretanje=function(predhodno,bacanje){
    var sledece;
        if(bacanje>0){
            if (predhodno<5) sledece=predhodno+bacanje;
            else if (predhodno==5){
                if (bacanje<3) sledece=predhodno+bacanje+5;
                else sledece=predhodno+bacanje+7;
            } 
            else if (predhodno>5 && predhodno<10){
                if(predhodno+bacanje<11) sledece=predhodno+bacanje;
                else sledece=predhodno+bacanje+7;
            }
            else if(predhodno==10){
                if (bacanje<4) sledece=predhodno+bacanje+2;
                else sledece=predhodno+bacanje+13;
            }
            else if(predhodno==11){
                if(bacanje==1) sledece=12;
                else if(bacanje == 2) sledece=15;
                else if(bacanje >=3 && bacanje <5) sledece=predhodno+bacanje+2;
                else sledece=predhodno+bacanje+6;
            }
            else if(predhodno==12){
                if(bacanje < 4) sledece=predhodno+bacanje+2;
                else sledece=predhodno+bacanje+6;
            }
            else if(predhodno==13 || predhodno==14){
                if(predhodno+bacanje<16) sledece=predhodno+bacanje;
                else sledece=predhodno+bacanje+11;
            }
            else if(predhodno==15){
                if(predhodno+bacanje+11<29) sledece=predhodno+bacanje+11;
                else sledece=29;
            }
            else if(predhodno==16){
                if(bacanje==1) sledece=17;
                else sledece=predhodno+bacanje+4;
            }
            else if(predhodno==17) sledece=predhodno+bacanje+4;
            else if(predhodno>17 && predhodno<27){
                if(predhodno+bacanje<27) sledece=predhodno+bacanje;
                else sledece=29;
                }
            else if(predhodno>=27)
                if(predhodno+bacanje<=28) sledece=predhodno+bacanje;
                else sledece=29;
        }

        else if(bacanje==0){sledece=predhodno}

        else if(bacanje==-1){
            if (predhodno == 0) sledece=26;
            else if(predhodno==11) sledece=5;
            else if(predhodno==13) sledece=10;
            else if(predhodno ==15) sledece=14;
            else if(predhodno == 18) sledece=10;
            else if(predhodno == 27) sledece=15;
            else{
                sledece=predhodno-1;
            }
        }
    return sledece;
}

//Izgled table
Igra.prototype.stampaTable=function(){
    //Stampanje izgleda polja start
    document.querySelector("div.polje[data-imePolja='"+0+"']").innerHTML="S";
    document.querySelector("div.polje[data-imePolja='"+0+"']").classList.add("poljeN");

    //Sampanje ostalih polja
    for(i=1;i<=28;i++){
        document.querySelector("div.polje[data-imePolja='"+i+"']").innerHTML=" ";    
        document.querySelector("div.polje[data-imePolja='"+i+"']").classList.add("poljeN");

        if(i==5) {
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeN");
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.add("poljeN2");
        }

        if(i==10) {
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeN");
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.add("poljeN2");
        }

        if(i==15) {
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeN");
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.add("poljeN2");
        }

        if(i==22) {
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeN");
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.add("poljeN2");
        }
    }
}

//Stampanje rezultata
Igra.prototype.stampa=function(){
    document.querySelector('#naPotezu').innerHTML="Na potezu je igrač "+this.naPotezu;
    document.querySelector('#rezultatA').innerHTML="Rezultat igrača A je: "+this.scoreA;
    document.querySelector('#rezultatB').innerHTML="Rezultat igrača B je: "+this.scoreB;
    
    if(this.brojMalA==1) document.querySelector('#rezultatA1').innerHTML="Igrač A ima još: "+this.brojMalA+" žeton";
    else document.querySelector('#rezultatA1').innerHTML="Igrač A ima još: "+this.brojMalA+" žetona";
    if(this.brojMalB==1) document.querySelector('#rezultatB1').innerHTML="Igrač B ima još: "+this.brojMalB+" žeton";
    else document.querySelector('#rezultatB1').innerHTML="Igrač B ima još: "+this.brojMalB+" žetona";
    
    if(igra.naPotezu=="A"){
        document.querySelector('.statusA').classList.add("okvir");
        document.querySelector('.statusB').classList.remove("okvir");
    }
    else {
        document.querySelector('.statusB').classList.add("okvir");
        document.querySelector('.statusA').classList.remove("okvir");
    }
    
    if(this.prikaz){
            if (this.zadnjeBacanje<=3){
            document.querySelector('#bacanje').innerHTML="Zadnje je bačeno: "+this.baceno;
            }
            else{
            document.querySelector('#bacanje').innerHTML="Bacaj opet!"+"<br>"+"Zadnje je bačeno: "+this.baceno;
            }
    }
    else{
        document.querySelector('#bacanje').innerHTML="";
    }
    document.querySelector('#obavestenje').innerHTML=this.obavestenje;
}

//Resetovanje rezultata
Igra.prototype.reset=function(){
    this.naPotezu="A";
    this.scoreA=0;
    this.scoreB=0;
    this.zadnjeBacanje=0;
    this.malID=0;
    this.skupMal=[];
    this.baceno=[];
    this.blokadaBacanja=false;
    this.prikaz=false;
    this.brojMalA=4;
    this.brojMalB=4;
    this.blokadaMala=true;
    this.blokadaZavrsenogPoteza=true;
    this.obavestenje="";
        
    //Ovim komandama brisemo sve divove koji predstavljaju malove, odnosno zetone.
    var brisani=document.querySelectorAll('div.mal');
    var u=brisani.length;
    for (var i=0;i<u;i++){
        document.querySelector('div.mal').remove();
    };
}

//Dodavanje poena A i B
Igra.prototype.dodajA=function(){
    this.scoreA++;
    this.brojMalA--;
    if(this.scoreA>=4){
        this.obavestenje="Čestitamo! Igrač A je pobedio!";
        document.querySelector('#pobednik').innerHTML=this.obavestenje; //kartica obavestenje pobednik
        document.querySelector('#pobeda').classList.remove('hidden');
        loop(); //aktiviramo vatromet
        // start_fireworks();
        document.querySelector('.fireworks').classList.remove('hidden'); //otkrijemo canvas sa vatrometom
    }
}

Igra.prototype.dodajB=function(){
    this.scoreB++;
    this.brojMalB--;
    if(this.scoreB>=4){  
        this.obavestenje="Čestitamo! Igrač B je pobedio!";
        document.querySelector('#pobednik').innerHTML=this.obavestenje; //kartica obavestenje pobednik
        document.querySelector('#pobeda').classList.remove('hidden');
        loop(); //aktiviramo vatromet
        // start_fireworks();
        document.querySelector('.fireworks').classList.remove('hidden'); //otkrijemo canvas sa vatrometom
    }
}

//Pozivanje mala od strane igraca A i B
Igra.prototype.dodajMalA=function(){
    if(this.naPotezu == "A"){
            if(this.brojMalA>0){  
                var e=document.createElement('div'); //kreiranje mal-a kao novi div
                e.setAttribute("id","id"+this.malID+"");
                e.classList.add("malA");
                e.classList.add("mal");
                e.classList.add("ruka");
                document.querySelector('div.wraper').appendChild(e); //vezan za tablu
                var t=document.getElementById("id"+this.malID+"");
                var l=new Mal(t,"A",this.malID); //dodavanje mala i kao objekat unutar skripta
                this.skupMal.push(l);
                this.malID++;
                this.brojMalA--;
                this.obavestenje="";
        }
        else{
            this.obavestenje="Igrač A je dodao svih 4 žetona!";
        }
    }
    else{
        this.obavestenje="Igrač A nije na potezu!";
    }
}

Igra.prototype.dodajMalB=function(){
    if(this.naPotezu == "B"){
        if(this.brojMalB>0){
            var e=document.createElement('div');
            e.setAttribute("id","id"+this.malID+"");
            e.classList.add("malB");
            e.classList.add("mal");
            e.classList.add("ruka");
            document.querySelector('div.wraper').appendChild(e);
            var t=document.getElementById("id"+this.malID+"");
            var l=new Mal(t,"B",this.malID);
            this.skupMal.push(l);
            this.malID++;
            this.brojMalB--;
            this.obavestenje="";
        }
        else{
            this.obavestenje="Igrač B je dodao svih 4 žetona!";
        }
    }
    else{
        this.obavestenje="Igrač B nije na potezu!";
    }
}

//trazenje mala u nizu malova u zavisnosti od doc.selektora; selektor je jedinstven pa sluzi i kao ime
Igra.prototype.nadjiMalind=function(doc){
    var l=this.skupMal.length;
    for(let i=0;i<l;i++){
        if(this.skupMal[i].doc==doc) return i;
    }
}

//funkcija za pomeranje mala po tabli i dodavanje pozicije
Igra.prototype.pomerajMal=function(element) {
    
    var p1 = 0, 
        p2 = 0, 
        p3 = 0, 
        p4 = 0,
        that=this;
        
    element.onmousedown = klik_na_mis;

    function klik_na_mis(e) {
        e = e || window.event;
        e.preventDefault();
        //   console.log("onmouse down");
        // pozicija misa na pocetku:
        element.classList.remove("ruka");
        element.classList.add("vuci_rukom");
        p3 = e.clientX;
        p4 = e.clientY;
        var ind=that.nadjiMalind(element);
        var h=that.skupMal[ind].pos;
        if(h>=29) h=0; //trenutno
        var p=that.skupMal[ind].pripadnost;
        if(p==that.naPotezu) {
                var t=that.kretanje(h,that.zadnjeBacanje);
                if(t>=29) t=0; //buduce
                if(that.hint_2 && !that.blokadaMala) document.querySelector("div.polje[data-imePolja='"+t+"']").classList.add("okvir2");
                if(that.hint_2 && that.blokadaMala) document.querySelector("div.polje[data-imePolja='"+h+"']").classList.add("okvir2");
            }
            else{
                if(that.hint_2) document.querySelector("div.polje[data-imePolja='"+h+"']").classList.add("okvir2");
            }
        document.onmouseup = pustanje_misa;
        // pozovi funkciju kada se mis pomera:
        document.onmousemove = pomeraj;
    }

    function pomeraj(e) {
        e = e || window.event;
        e.preventDefault();
        // izracunaj novu poziciju misa:
        p1 = p3 - e.clientX;
        p2 = p4 - e.clientY;
        p3 = e.clientX;
        p4 = e.clientY;
        // postavi novu poziciju elementa:
        element.style.top = (element.offsetTop - p2) + "px";
        element.style.left = (element.offsetLeft - p1) + "px";
    }

    function pustanje_misa() {
      /* zavrsi operaciju prevlacenja:*/
      element.classList.remove("vuci_rukom");
      element.classList.add("ruka");
        var ind=that.nadjiMalind(element);
        var p=that.skupMal[ind].pripadnost;
        var h=that.skupMal[ind].pos;
        if(h>=29) h=0; //trenutno
            if(p==that.naPotezu){
                var t=that.kretanje(h,that.zadnjeBacanje);
                if (!that.blokadaMala) that.skupMal[ind].pos=t;
                if(t>=29) t=0; //buduce
                if(that.hint_2 && !that.blokadaMala) document.querySelector("div.polje[data-imePolja='"+t+"']").classList.remove("okvir2");
                if(that.hint_2 && that.blokadaMala) document.querySelector("div.polje[data-imePolja='"+h+"']").classList.remove("okvir2");
            that.blokadaMala=true;
            }
            else{
                if(that.hint_2) document.querySelector("div.polje[data-imePolja='"+h+"']").classList.remove("okvir2");
            }

        if(that.blokadaMala && !that.blokadaZavrsenogPoteza && that.auto_potez){
            that.zavrsenPotez();
            that.stampa();
        }
        document.onmouseup = null;
        document.onmousemove = null;
            }
}

//funkcija za brisanje mala iz HTML-a
Igra.prototype.obrisiMal=function(element){
    element.oncontextmenu=obrisi; 
    var that=this;
    function obrisi(e){
        e = e || window.event;
        e.preventDefault();
        
        var ind=that.nadjiMalind(element);
        var t=that.skupMal[ind].value;
        var p=that.skupMal[ind].pripadnost;
        var poz=that.skupMal[ind].pos;

        element.remove();
        if(p=="A"){
            that.brojMalA=that.brojMalA+t;
        }
        else if(p=="B"){
            that.brojMalB=that.brojMalB+t;
        }

        if(that.auto_bodovi && poz>=29){
            if(p=="A"){
                for(var i=0; i<t; i++){
                   that.dodajA();
                }
            }
            else if(p=="B"){
                for(var i=0; i<t; i++){
                    that.dodajB();
                 }
            }
        }
        that.stampa();
            }
}

//funkcija za dupliranje malova
Igra.prototype.duplirajMal=function(element){
    element.ondblclick=dupliraj; 
    var that=this;
    function dupliraj(e){
        e = e || window.event;
        e.preventDefault();

        var ind=that.nadjiMalind(element);
        var t=that.skupMal[ind].value;
        var p=that.skupMal[ind].pripadnost;
            
        if(that.naPotezu==p && !that.auto_potez || that.auto_potez){
            that.skupMal[ind].value++;
            element.innerHTML=t+1;
            if(p=="A"){
                that.brojMalA=that.brojMalA-1;
            }
            else if(p=="B"){
                that.brojMalB=that.brojMalB-1;
            }
        }
        
        that.stampa();
    }
}

//Slede dve metode za davanje sugestija vezanih za tablu
Igra.prototype.hint0=function(){
    var that=this;
    for(let i=0;i<=28;i++){
            document.querySelector("div.polje[data-imePolja='"+i+"']").addEventListener('mouseenter',function(){
            
                var t=that.kretanje(i,that.zadnjeBacanje);
                if(t>=29) t=0;
                if(that.hint_0) document.querySelector("div.polje[data-imePolja='"+t+"']").classList.add("okvirT");     
            });
        } 
    
        for(let i=0;i<=28;i++){
            document.querySelector("div.polje[data-imePolja='"+i+"']").addEventListener('mouseleave',function(){
                for(let i=0;i<=28;i++){
                    document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("okvirT");
                }
            });
        } 
}

Igra.prototype.hint1=function(){
    var that=this;
    function ocistiHint(){
        for(let i=0;i<=28;i++){
            document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("okvirTT");
        }
    }

    for(let i=0;i<=28;i++){
        document.querySelector("div.polje[data-imePolja='"+i+"']").addEventListener('mouseenter',function(){
        
            var t=that.kretanje(i,that.zadnjeBacanje);
            if(t>=29) t=0;

            if(that.hint_1) document.querySelector("div.polje[data-imePolja='"+t+"']").classList.add("okvirTT");

            setTimeout(function(){
                ocistiHint()}, that.trajanjeHinta); 
        });
    } 

    window.addEventListener('mouseup',function(){
        ocistiHint();
    });
}

Igra.prototype.animeBacanje=function(){
    if(this.zadnjeBacanje==1 && this.anime==true){
        document.querySelector('.animacija').classList.remove('hidden');
        document.querySelector('.animacija').classList.add('do');
        document.querySelector('#korejski').innerHTML="do";
        setTimeout(function(){
            document.querySelector('.animacija').classList.remove('do');
            document.querySelector('.animacija').classList.add('hidden');
            document.querySelector('#korejski').innerHTML="";
        },this.trajanjeAnimacija);
    }

    else if(this.zadnjeBacanje==2 && this.anime==true){
        document.querySelector('.animacija').classList.remove('hidden');
        document.querySelector('.animacija').classList.add('ge');
        document.querySelector('#korejski').innerHTML="ge";
        setTimeout(function(){
            document.querySelector('.animacija').classList.remove('ge');
            document.querySelector('.animacija').classList.add('hidden');
            document.querySelector('#korejski').innerHTML="";
        },this.trajanjeAnimacija);
    }

    else if(this.zadnjeBacanje==3 && this.anime==true){
        document.querySelector('.animacija').classList.remove('hidden');
        document.querySelector('.animacija').classList.add('geol');
        document.querySelector('#korejski').innerHTML="geol";
        setTimeout(function(){
            document.querySelector('.animacija').classList.remove('geol');
            document.querySelector('.animacija').classList.add('hidden');
            document.querySelector('#korejski').innerHTML="";
        },this.trajanjeAnimacija);
    }

    else if(this.zadnjeBacanje==4 && this.anime==true){
        document.querySelector('.animacija').classList.remove('hidden');
        document.querySelector('.animacija').classList.add('yut');
        document.querySelector('#korejski').innerHTML="yut";
        setTimeout(function(){
            document.querySelector('.animacija').classList.remove('yut');
            document.querySelector('.animacija').classList.add('hidden');
            document.querySelector('#korejski').innerHTML="";
        },this.trajanjeAnimacija);
    }

    else if(this.zadnjeBacanje==5 && this.anime==true){
        document.querySelector('.animacija').classList.remove('hidden');
        document.querySelector('.animacija').classList.add('mo');
        document.querySelector('#korejski').innerHTML="mo";
        setTimeout(function(){
            document.querySelector('.animacija').classList.remove('mo');
            document.querySelector('.animacija').classList.add('hidden');
            document.querySelector('#korejski').innerHTML="";
        },this.trajanjeAnimacija);
    }

    else if(this.zadnjeBacanje==-1 && this.anime==true){
        document.querySelector('.animacija').classList.remove('hidden');
        document.querySelector('.animacija').classList.add('back');
        document.querySelector('#korejski').innerHTML="backdo";
        setTimeout(function(){
            document.querySelector('.animacija').classList.remove('back');
            document.querySelector('.animacija').classList.add('hidden');
            document.querySelector('#korejski').innerHTML="";
        },this.trajanjeAnimacija);
    }
}

//Prvi put kada koristnik ucita igru, dobice kratko uputstvo. Moze da ponovi to pritiskom na odgovarajuci taster. 

try{
    if(localStorage.getItem('visited')==undefined) var visited=false;
    else var visited = localStorage.getItem('visited');
    if (!visited) {
    document.querySelector('#kratko_uputstvo').classList.toggle("hidden");
    }
} catch(e) {
    console.log(e,"Local storage ne radi!");
}

document.querySelector('#zavrseno_kratko_uputstvo').onclick=function(){
    document.querySelector('#kratko_uputstvo').classList.toggle("hidden");
    try{
        localStorage.setItem('visited', true);
    }  catch(e) {
        console.log(e,"Local storage ne radi!");
    }
}

document.querySelector('#ne_zavrseno_kratko_uputstvo').onclick=function(){
    document.querySelector('#kratko_uputstvo').classList.toggle("hidden");
}

document.querySelector('#ocisti_ls').onclick=function(){
    document.querySelector('#kratko_uputstvo').classList.toggle("hidden");
    try{
    localStorage.clear(); 
    } catch(e) {
        console.log(e,"Local storage ne radi!");
    }
}

//pozivamo objekat igra
var igra=new Igra();

//meni za podesavanje
document.querySelector('.settings').addEventListener('mouseleave',function(){

    var p=document.querySelector('#praviloMinus1').checked;
    (p)? igra.pravilo_minus_1=true:igra.pravilo_minus_1=false;

    var p3=document.querySelector('#checkHint2').checked;
    (p3)? igra.hint_2=false:igra.hint_2=true;

    var p4=document.querySelector('#anime').checked;
    (p4)? igra.anime=false:igra.anime=true;

    var p5=document.querySelector('#auto_zavrsi_potez').checked;
    (p5)? igra.auto_potez=false:igra.auto_potez=true;
    (p5)? document.querySelector('#zavrsen_potez').classList.remove('nestani'):document.querySelector('#zavrsen_potez').classList.add('nestani');

    var p6=document.querySelector('#auto_dodaj_poen').checked;
    if(p6){
        igra.auto_bodovi=false;
        document.querySelector('#dodajA').classList.remove('nestani');
        document.querySelector('#dodajB').classList.remove('nestani');
    }
    else{
        igra.auto_bodovi=true;
        document.querySelector('#dodajA').classList.add('nestani');
        document.querySelector('#dodajB').classList.add('nestani');
    }
});

//aktiiranje dodatnih podesavanja
document.querySelector('#dodatna_podesavanja').addEventListener("click" ,function(){
    document.querySelector('#podesavanje_kartica').classList.remove('hidden');
});

//dodatno podesavanje
document.querySelector('#zavrseno_podesavanje').onclick=function(){

    if(document.querySelector("input[name='hintTabla']:checked") !==null)
    var r1=document.querySelector("input[name='hintTabla']:checked").value;

    if(r1=='none'){
        igra.hint_0=false;
        igra.hint_1=false;
    }
    else if(r1=='opcija0'){
        igra.hint_0=true;
        igra.hint_1=false;
    }
    else if(r1=='opcija1'){
        igra.hint_0=false;
        igra.hint_1=true;
    }

    var t1=document.querySelector("#duzinaSugestije").value;
    igra.trajanjeHinta=t1*1000;

    var t2=document.querySelector("#duzinaAnimacije").value;
    igra.trajanjeAnimacija=t2*1000;

    var control=true;
    if (isNaN(t1) || t1<0 || t1>10) control=false;
    if (isNaN(t2) || t2<0 || t2>10) control=false;

    if(control){ document.querySelector('#podesavanje_kartica').classList.add('hidden'); }
}

//pozivamo sve potrebne funkcije
igra.stampaTable();
igra.stampa();
igra.hint0();
igra.hint1();

//povezivanje funkcija sa tasterima
document.querySelector('#potez').onclick=function(){
    igra.bacanje();
    igra.stampa();
}

document.querySelector('#zavrsen_potez').onclick=function(){
    igra.zavrsenPotez();
    igra.stampa();
}

document.querySelector('#reset').onclick=function(){
    document.querySelector('#zelim_reset').classList.toggle('hidden');
}

document.querySelector('#dodajA').onclick=function(){
    igra.dodajA();
    igra.stampa();
}

document.querySelector('#dodajB').onclick=function(){
    igra.dodajB();
    igra.stampa();
}

document.querySelector('#dodajMalA').onclick=function(){
    igra.dodajMalA();
    for(let i=0;i<igra.skupMal.length;i++){
            igra.pomerajMal(igra.skupMal[i].doc);
            igra.obrisiMal(igra.skupMal[i].doc);
            igra.duplirajMal(igra.skupMal[i].doc); 
        }
    igra.stampa();
}

document.querySelector('#dodajMalB').onclick=function(){
    igra.dodajMalB();
    for(let i=0;i<igra.skupMal.length;i++){
            igra.pomerajMal(igra.skupMal[i].doc);
            igra.obrisiMal(igra.skupMal[i].doc);
            igra.duplirajMal(igra.skupMal[i].doc);
    }
    igra.stampa();
}

//Kako bi igra mogla da se igra i preko tastature. Space za odigraj i Enter za reset. 
window.addEventListener('keyup',function(e){
    //https://keycode.info

    var key=e.keyCode;
    e.preventDefault();
    if (key==66 || key==32){
            igra.bacanje();
            igra.stampa();
    }

    if (key==13 && !igra.auto_potez){
        igra.zavrsenPotez();
        igra.stampa();
        }

    if (key==27){
        document.querySelector('#zelim_reset').classList.toggle('hidden');
        }

    if (key==65){
        igra.dodajMalA();
        for(let i=0;i<igra.skupMal.length;i++){
                igra.pomerajMal(igra.skupMal[i].doc);
                igra.obrisiMal(igra.skupMal[i].doc);
                igra.duplirajMal(igra.skupMal[i].doc);
        }
        igra.stampa();
    }

    if (key==68){
        igra.dodajMalB();
        for(let i=0;i<igra.skupMal.length;i++){
            igra.pomerajMal(igra.skupMal[i].doc);
            igra.obrisiMal(igra.skupMal[i].doc);
            igra.duplirajMal(igra.skupMal[i].doc);
        }
        igra.stampa();
    }

    if (key==49 && !igra.auto_bodovi){
        igra.dodajA();
        igra.stampa();
        }

    if (key==51 && !igra.auto_bodovi){
        igra.dodajB();
        igra.stampa();
        }
});

//Komande za resetovanje igre
document.querySelector('#yes_reset').onclick=function(){
    document.querySelector('#zelim_reset').classList.toggle('hidden');
    igra.reset();
    igra.stampa();
}

document.querySelector('#no_reset').onclick=function(){
    document.querySelector('#zelim_reset').classList.toggle('hidden');
}

//Reset igre posle proglasenja pobednika
document.querySelector('#posle_pobede').onclick=function(){
    document.querySelector('#pobeda').classList.add('hidden');
    igra.reset();
    igra.stampa();
    document.querySelector('.fireworks').classList.add('hidden'); //sakrijemo vatormet
    //trebalo bi da se doda funkcija koja zaustavlja animaciju vatrometa
    // stop_fireworks();
}