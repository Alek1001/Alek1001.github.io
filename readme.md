# YutNuriPublic
Zavrsni rad za kurs za Front End Developer-a
Predstavljena je tradicionalna Korejska društvena Igra Yut Nori. Igraju je dva igraca. Cilj igre je da igrac sakupi 4 poena, a dobija po poen kada zeton obidje citavu tablu. Kretnanje zetona je odredjeno bacanjem Juto stapova. Za bacenih 4 ili 5 igrač baca ponovo. Ako zeton stane na cosak ili na centar table, ima mogucnost da promeni pravac i krene prečicom, ako stane na svoj zeton, ima mogucnost da grupise zetone, a ako stane na zeton protivnika, pojede ga i vrati na pocetni položaj. Zeton se pomera prevlacenjem i postoji potpuna sloboda njegovog pomeranja. Dodatne opcije za zeton se dobijaju desnim klikom na njega, a ostale komande u igri su postigunte preko tastera. 
Aplikacija se sastoji od tri dela: HTML-a, CSS-a i JavaScript-a.
HTML-a:
Postje tri strane, glavna za igranje, i pomocne za uputstvo za igru i za litaraturu. 
U glavnoj se nalazi:
-Navigacioni meni,
-Padajuci meni sa podesavanjima,
-Dodatna kartica za meni sa dodatnim podesavanjima,
-Tabala sa 29 polja,
-Meni sa komandama za igru
-Prikazi informacija za svakog igraca pojadinacno, i obavestenje za citavu igru,
-Kartica sa kratkim uputstvom koje se pojavljuje prvi put kada se sajt ucita,
-Kartica za proveru reseta igre,
-Kartica u kojoje se pojavljuje slika sa rezultatima bacanja,
-Kartica koja obavestava da je neki igrac pobedio,
-Kanvas platno sa vatrometom,
-Pozadina koja je dodata kao pseudo element,
-Zetoni koji se dodaju dinamicki,
-I kartica sa opcijama za zeton koja se dobija na desni klik zetona.
CSS:
Tabla je uradjena kombinacijom fleksa i grida. Grid za cetralnih 5 polja i fleks za ostale. Fleks je koriscen i za druge glavne lemente sajta.
Padajuci meni je uradjen kombinacijom hover-a i keyframes css animacije. 
Vecina elemenata ima dodatu senku. Sajt je uradjen u dimenziji rem, i responzivan je za razlicite velicine ekrana. 
U CSS je dodata animacija kada mis ide preko svakog dugmeta uz pomoc scale i transition. Animacija tranzition je dodata i za vecinu senki. 
Kada mis ide preko tastera ili zetona izlazi mali malo objasnjenje uradjeno preko pseudo-elementa. 
Kurzor misa se menja kada se pomera zeton. 
U CSS-u su definisani i klase okvira koji se dodaju interaktivno, kao i povezane su slike bacanja stapova.
JavaScript
Korisceno je objektno-orijentisano programiranje po medelu ES6. Uradjene su sledece klase:
Klasa 1-definise igru i konstruktor ima 25 varijabila
Klasa 2-definise zeton sa cetiri varijabile
Ugradjene su i sledece metode preko prototipova:
M1-Za resetovanje rezultata
M2-Za bacanje stapova
M3-Metoda za promenu poteza igraca
M4-Metoda koja pokazuje kretanje zetona po tabli najkracim putem
M5-Metoda za dodavanje CSS-a tabli za igru
M6-Metoda za stampanje trenutnih obavestenja i rezultata
M7-Metoda za dodavanje poena prvom igracu
M8-Metoda za dodavanje poena drugom igracu
M9-Metoda za dodavanje zetona prvome igracu
M10-Metoda za dodavanje zetona drugome igracu
M11-Metoda za trazenje indeksa zetona
M12-Metoda za pomeranje zetona po tabli, pracenje pozicije zetona po tabli i davanje sugestije o poziciji zetona u zavisnosti od situacije
M13-Metoda za ukljucivanje menija kada se klikne desnim klikom na zeton
M14-Metoda za iskljucenje menija koji se dobije kada se klikne desnim klikom na zeton
M15-Metoda za grupisanje zetona
M16-Metoda za razgrupisanje zetona
M17-Metoda za uklanjanje zetona iz HTML-a
M18-Metoda za dodatne sugestije (br. 1)
M19-Metoda za dodatne sugestije (br. 2)
M20-Metoda za pokazivanje slike bacenih Jut stapova
Dodate su i sledece nezavisne funkcije
F1-F3-Set funkcija koja upisuje u local storage da igrac vise en zeli da vidi kratko uputstvo prilikom ucitavanja. Ova familija funkcija je ugradjena u try-catch. Tri funkcije. 
F4-Funkcija koja menja parametre programa u zavisnosti od podesavanja iz padajuceg menija (5 podesavanja). Aktivira se na mouseleave.
F5-Funkcija koja menja parametre programa u zavisnosti od podesavanja iz dodatnih podesavanja (3 podesavanja)
F6-Funkcija koja aktivira komande preko tastature (u kojoj su duplirane i F7 i F8)
F7-Funkcija za dodavanje zetona prvom igracu
F8-funkcija za dodavanje zetona drugom igracu
F9-funkcija za resetovanje igre na zahtev igraca
F10-Funkcija za reset igre posle proglasenja pobednika
F11-F17: 7 dodatnih povezivanja dugmeta sa onclick
F18-F21: 4 dodatnih povezivanja preko eventListener-a za komande menija desnog klika misa na zeton
Takodje postoji i poseban fajl za vatromet koji vrsi preko kanvasa, i css fajl koji ga prati. 
Sajt prati i 13 slika. 
