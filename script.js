class Igra{
    constructor(){
        this.name="Yut Nuri";
        this.skupMal=[];
        this.naPotezu="A";
        this.scoreA=0;
        this.scoreB=0;
        this.zadnjeBacanje=0;
    }
}

class Mal{
    constructor(pIme,pIgrac,pPosition){
        this.ime=pIme;
        this.igrac=pIgrac; //Mora da bude "A" ili "B"
        this.position=pPosition;
    }
}

Igra.prototype.napraviMal=function(pIme,pIgrac,pPosition){
    var s=new Mal(pIme,pIgrac,pPosition);
    this.skupMal.push(s);
}

//Bacaju se 4 Jut stapa.
Igra.prototype.bacanje=function(){
    var s="",
        br=0;
    for (let i=1;i<=4;i++){
        t=parseInt(Math.random()*2);
        br+=t;
        s+=t;
    }
    if (br==0) br=5;
    this.zadnjeBacanje=br;
}

//U zavisnosti od bacenih Jut stapova, Mal se krece po tabli na sledeci nacin:

Igra.prototype.kretanje=function(predhodno,bacanje){
    var sledece;
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
    else if(predhodno>17){
        if(predhodno+bacanje<27) sledece=predhodno+bacanje;
        else sledece=29;
    }
    return sledece;
}

//Sta se desava kada se odigra potez
Igra.prototype.potez=function(){
   this.bacanje();  //1. Bacaju se Jut stapovi
   if(this.naPotezu=="A"){  //Zavisi koji igrac igra
        this.skupMal[0].position=this.kretanje(this.skupMal[0].position,this.zadnjeBacanje); //2. Kretanje
        if(this.skupMal[0].position==this.skupMal[1].position && this.skupMal[0].position>0){ this.skupMal[1].position=0; //3. Ako je polje zauzeto, Mal pojede portivnika. 
            alert('A je pojeo B');}
        if(this.skupMal[0].position>=29){ //4. Ako je Mal dosao do kraja, dodaje se pojen igracu.
            this.scoreA=this.scoreA+1;
            this.skupMal[0].position=0;
        }

        if(this.scoreA>=4) alert("Igrac A je pobedio!"); //5. AKo igrac sakupi 4 poena, pobedio je. 

        if(this.zadnjeBacanje<=3) this.naPotezu="B"; //6. Ako nije bacen Jut (4 poena), ili Mo (4 poena), menja se igrac koji je na potezu
        
        }
    else{
        this.skupMal[1].position=this.kretanje(this.skupMal[1].position,this.zadnjeBacanje);
        if(this.skupMal[1].position==this.skupMal[0].position && this.skupMal[1].position>0) {this.skupMal[0].position=0; 
            alert('B je pojeo A');}
        if(this.skupMal[1].position>=29){
            this.scoreB=this.scoreB+1;
            this.skupMal[1].position=0;
        }

        if(this.scoreB>=4)  alert("Igrac B je pobedio!");

        if(this.zadnjeBacanje<=3) this.naPotezu="A";
        
    }
};

//Stampanje rezultata
Igra.prototype.stampa=function(){

    //Stampanje igleda polja start
    document.querySelector("div.polje[data-imePolja='"+0+"']").innerHTML="S";
    document.querySelector("div.polje[data-imePolja='"+0+"']").classList.add("poljeN");

    //Stampanje polja po tabli. Ako je neki Mal na nekom polju, onda se ovde to pokaze. 
    for(i=1;i<=28;i++){
        if(this.skupMal[0].position==i){
        document.querySelector("div.polje[data-imePolja='"+i+"']").classList.add("poljeA");
        document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeB");
        document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeN");
        document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeN2");
    }
        else if(this.skupMal[1].position==i){
        document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeA");
        document.querySelector("div.polje[data-imePolja='"+i+"']").classList.add("poljeB");
        document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeN");
        document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeN2");
    }
        else {
            document.querySelector("div.polje[data-imePolja='"+i+"']").innerHTML=" ";    
        document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeA");
        document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeB");
        document.querySelector("div.polje[data-imePolja='"+i+"']").classList.remove("poljeN2");
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
    };

    //Stampanje rezultata

    document.querySelector('#naPotezu').innerHTML="Na potezu je igrac "+this.naPotezu;
    document.querySelector('#rezultatA').innerHTML="Rezultat A je: "+this.scoreA;
    document.querySelector('#rezultatB').innerHTML="Rezultat B je: "+this.scoreB;
    if(igra.naPotezu=="A"){
        if(igra.zadnjeBacanje<=3)
            document.querySelector('#bacanje').innerHTML="B je bacio: "+this.zadnjeBacanje;
        else 
            document.querySelector('#bacanje').innerHTML="A je bacio: "+this.zadnjeBacanje;
    }
    else {
        if(igra.zadnjeBacanje<=3)
            document.querySelector('#bacanje').innerHTML="A je bacio: "+this.zadnjeBacanje;
        else
            document.querySelector('#bacanje').innerHTML="B je bacio: "+this.zadnjeBacanje;
    }

    //Meni rezultat je vidljiv samo posle prvih bacenih Jut stapova. 
    if(this.zadnjeBacanje>0){
        document.querySelector("#rezultat").classList.remove("rezultatPocetno");
        document.querySelector("#rezultat").classList.add("rezultat");
    }
    else{
        document.querySelector("#rezultat").classList.remove("rezultat");
        document.querySelector("#rezultat").classList.add("rezultatPocetno");
    }
}

//Resetovanje rezultata
Igra.prototype.reset=function(){
    this.naPotezu="A";
    this.skupMal[0].position=0;
    this.skupMal[1].position=0;
    this.scoreA=0;
    this.scoreB=0;
    this.zadnjeBacanje=0;
}

var igra=new Igra();

igra.napraviMal("A1","A",0);
igra.napraviMal("B1","B",0);

igra.stampa();


document.querySelector('#potez').onclick=function(){
    igra.potez();
    igra.stampa();
}

document.querySelector('#reset').onclick=function(){
    igra.reset();
    igra.stampa();
}

//Kako bi igra mogla da se igra i preko tastature. Space za odigraj i Enter za reset. 
window.addEventListener('keyup',function(e){
    var key=e.keyCode;
    if (key==32){
    igra.potez();
    }
    if (key==13){
        igra.reset();
        }
    igra.stampa();
})

document.querySelector('#pravila').onclick=function(){
    var temp="Ovo je verzija tradicionalne Korejske igre Yut Nuri. Postoje dva igraca, A (sa belim Malom) i B (sa tamnim Malom). Mal je dugme sa kojim se igra. Na dugme odigraj, bacaju se 4 Jut stapa, i Mal se pomera u zavisnosti od bacenih poena. Ukoliko se baci Jut (4 poena) ili Mo (5 poena) igrac baca opet. Kada Mal stane na cosak, ili centar table, njegov se put skracuje. Ako Mal stane na polje na kome je protivnicki Mal, on pojede protivnicki Mal. Cilj je da Mal dodje do krajnjeg polja S, 4 puta. Pritiskom na taster space, odigrava se potez, a pritiskom na taster enter, igra se resetuje; a mozete da koristite i mis. Uzivajte u igri!"
    alert(temp);
}


