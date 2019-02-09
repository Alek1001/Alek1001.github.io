# YutNuriPublic
Zavrsni rad za kurs za Front End Developer-a
Predstavljena je tradicionalna Korejska društvena Igra Yut Nuri. Igraju je dva igraca. Cilj igre je da Mal obiđe tablu 4 puta. Igraci bacaju Yut stapove i u zavisnosti od toga kako oni padnu, igraci svojim Malovim-a igraju 1 do 5 polja. Za bačenih 4 ili 5 igrač baca ponovo. Ako Mal stane na ćosak ili na centar table, ima mogučnost da promeni pravac i krene prečicom, a ako stane na Mal protivnika, pojede ga i vrati na pocetni položaj. 
Aplikacija se sastoji od tri dela: HTML-a, CSS-a i Java Script-a.
U HTML-u je predstavljena tabla sa 29 polja, meni sa tri dugmeta (za igranje poteza, reset igre i za pravila) i sekcija u kojoj se štampa ko je na potezu, šta je bačeno u predhodnom potezu i rezultat igre. 
U CSS-u je najzastupljenija flex tehnologija, mada se za sam centar table koristi grid. Malovi su definisani kao zasebni stilovi sa svojom pozadinskom slikom. Sve diminzije su date u formi rem-a i sajt je responsivan u zavisnosti od širine ekrana. 
Java Script je zasnovan na objektno orijenitasnom programiranju. Igra je jedan objekat, dok su Malovi, objekti unutar igre. Bacanje Yutova je metoda zasnivana na cetiri nasumicna broja od 0 ili 1. Postoji metoda koja u zavisnosti od toga ko je na potezu i šta je bačeno pomera Mal. Takodje postoji metoda štampa rezultat u HTML. Postoje i metoda za resetovanje igre, kao i metoda koja omogućava igranje poteza tastaturom. 
Dodata je i metoda koja prati pomeranje Mala korak po korak, i metoda koja pakuje sve navedene metode u animativni prikaz uz pomoc funkicje setInterval. Prov se obavi animacija, a onda se odigra potez. 