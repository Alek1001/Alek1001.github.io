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

//Kretanje u animaciji
Igra.prototype.kretanjeAnimacija=function(j,start){
    var rez;

    if(start<5) rez=j+1;

    else if(start==5 || start==11 || start==12 || start==16 || start==17) {
        switch(j){
            case 5: rez=11; break;
            case 11: rez=12; break;
            case 12: rez=15; break;
            case 15: rez=16; break;
            case 16: rez=17; break;
            case 17: rez=22; break;
            case 22: rez=23; break;
            case 23: rez=24; break;
            case 24: rez=25; break;
            case 25: rez=26; break;
            case 26: rez=26; break;
            default: rez=26;
        }
    }
    
    else if(start>=6 && start<10 || start>=18 && start<=26){
        switch(j){
            case 6: rez=7; break;
            case 7: rez=8; break;
            case 8: rez=9; break;
            case 9: rez=10; break;
            case 10: rez=18; break;
            case 18: rez=19; break;
            case 19: rez=20; break;
            case 20: rez=21; break;
            case 21: rez=22; break;
            case 22: rez=23; break;
            case 23: rez=24; break;
            case 24: rez=25; break;
            case 25: rez=26; break;
            case 26: rez=26; break;
            default: rez=26;
        }
    }

    else if(start>=10 && start<=15 || start>=27){
        switch(j){
            case 10: rez=13; break;
            case 13: rez=14; break;
            case 14: rez=15; break;
            case 15: rez=27; break;
            case 27: rez=28; break;
            case 28: rez=28; break;
            default: rez=28;
        }

    }
    return rez;
}
//Animacija

Igra.prototype.animacija=function(){
    if (this.naPotezu=="A"){
        this.bacanje(); //1. Bacaju se Jut stapovi
        var j=this.skupMal[0].position;
        var start=this.skupMal[0].position;
            var that=this;
            var t=0;
            var f1=setInterval(function(){
                if(j==0) j=that.kretanjeAnimacija(j,start);
                else if(j<29){
                    document.querySelector("div.polje[data-imePolja='"+j+"']").classList.add("poljeA");
                    document.querySelector("div.polje[data-imePolja='"+j+"']").classList.remove("poljeB");
                    document.querySelector("div.polje[data-imePolja='"+j+"']").classList.remove("poljeN");
                    document.querySelector("div.polje[data-imePolja='"+j+"']").classList.remove("poljeN2");
                    j=that.kretanjeAnimacija(j,start);}
                    else{
                        j=that.kretanjeAnimacija(j,start);
                    }
                t=t+1;
                    if (t>that.zadnjeBacanje){
                    clearInterval(f1);
                    that.potez();
                    that.stampa();
                    }
            },300);
    }
    else{
        this.bacanje(); //1. Bacaju se Jut stapovi
        var j=this.skupMal[1].position;
        var start=this.skupMal[1].position;
        var finish=this.kretanje(start,this.zadnjeBacanje);
            var that=this;
            var t=0;
            var f1=setInterval(function(){
                if(j==0) j=that.kretanjeAnimacija(j,start);
                else if(j<29){
                    document.querySelector("div.polje[data-imePolja='"+j+"']").classList.add("poljeB");
                    document.querySelector("div.polje[data-imePolja='"+j+"']").classList.remove("poljeA");
                    document.querySelector("div.polje[data-imePolja='"+j+"']").classList.remove("poljeN");
                    document.querySelector("div.polje[data-imePolja='"+j+"']").classList.remove("poljeN2");
                    j=that.kretanjeAnimacija(j,start);}
                    else{
                        j=that.kretanjeAnimacija(j,start);
                    }
                t=t+1;
                    if (t>that.zadnjeBacanje){
                    clearInterval(f1);
                    that.potez();
                    that.stampa();
                    }
            },300);
    }
}

var igra=new Igra();

igra.napraviMal("A1","A",0);
igra.napraviMal("B1","B",0);

igra.stampa();
// console.log(igra.kretanje(15,1));


document.querySelector('#potez').onclick=function(){
    igra.animacija();
}

document.querySelector('#reset').onclick=function(){
    igra.reset();
    igra.stampa();
}

//Kako bi igra mogla da se igra i preko tastature. Space za odigraj i Enter za reset. 
window.addEventListener('keyup',function(e){
    var key=e.keyCode;
    if (key==32){
        igra.animacija();
    }
    if (key==13){
        igra.reset();
        igra.stampa();
        }
})

document.querySelector('#pravila').onclick=function(){
    var temp="Ovo je verzija tradicionalne Korejske igre Yut Nuri. Postoje dva igraca, A (sa belim Malom) i B (sa tamnim Malom). Mal je dugme sa kojim se igra. Na dugme odigraj, bacaju se 4 Jut stapa, i Mal se pomera u zavisnosti od bacenih poena. Ukoliko se baci Jut (4 poena) ili Mo (5 poena) igrac baca opet. Kada Mal stane na cosak, ili centar table, njegov se put skracuje. Ako Mal stane na polje na kome je protivnicki Mal, on pojede protivnicki Mal. Cilj je da Mal dodje do krajnjeg polja S, 4 puta. Pritiskom na taster space, odigrava se potez, a pritiskom na taster enter, igra se resetuje; a mozete da koristite i mis. Uzivajte u igri!"
    alert(temp);
}


