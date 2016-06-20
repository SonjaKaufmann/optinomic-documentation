# Schritt für Schritt Anleitung 
:thumbsup:

### Erstellen einer Optinomic-App auf Basis einer Vorlage
Diese Anleitung erklärt Schritt für Schritt die Vorgehensweise zur Erstellung einer Optinomic-App. Als Basis zur Erstellung unserer Applikation dient die Vorlage [com.optinomic.apps.template](https://github.com/Optinomic/apps/tree/master/com.optinomic.apps.template).



### Schritt 1:  Vorlage kopieren und Anpassungen vornehmen


1.	Kopieren Sie den kompletten Ordner [com.optinomic.apps.template](https://github.com/Optinomic/apps/tree/master/com.optinomic.apps.template).
2.	Benennen Sie diesen Ordner wie folgt:    
	`TLD (Top-Level-Domain)`.`domain`.`apps`.`Name ihrer App`    
	
	```
	Beschreibung: Angenommen Ihre Klinik hat die Homepage: http://www.awesome-clinic.com und Sie wollen ein 'Schlaftagebuch-App' erstellen. Dann würde der Ordner wie folgt benannt werden:   
	`com.awesome-clinic.apps.schlaftagebuch`.
	```


### Schritt 2:  Anpassungen in `base.opapp.m4` vornehmen

Die Komplette Beschreibung der Möglichkeiten entnehmen Sie der [3.2  Optinomic App - Specification](http://doc.optinomic.org/V2/Developers/app_spezifikation.html)

1. Wechseln Sie nun in dieses Verzeichnis und öffnen das File `base.opapp.m4` mit Ihrem Editor.   
	Stellen Sie sicher, dass Sie `[module]` wie folgt anpassen:    
	
	```
	[module]
	id = com.awesome-clinic.apps.schlaftagebuch
	name = Schlaftagebuch
	short_description = Schlafstörung (Insomnie) zu erkennen sowie den Verlauf und Erfolg einer Therapie zu kontrollieren.
	version = include(VERSION)
	type = patient
	```


2. Ergänzen / korrigieren Sie die `[dependencies]`.    
	Dependencies sind abhängigkeiten Ihres Modules. Dies wird benötigt, falls Ihr Schlaftagebuch auf einer anderen App 'basiert' oder deren Werte/Scores benötigt. 

3. Ergänzen / korrigieren Sie die `[description]`.


4. Ergänzen / korrigieren Sie die `[developer]`.

5. Ergänzen / korrigieren Sie die `[template]`.    
	Templates beinhaltet die Darstellung Ihres Schlaftagebuchs in `HTML` Form.

6. Ergänzen / korrigieren Sie die `[survey]`.    
	Ihr Schlaftagebuch wird Fragebögen verwenden. Passen Sie diese hier an. Falls Sie die App auf dem Demo-Server testen wollen und  `LimeSurvey` verwenden, müssen Sie sicherstellen, dass der Fragebogen auf dem Demo-Limesurvey vorhanden ist.    
	Login: [Lime-Survey Installation](http://limesurvey.optinomic.org/admin/authentication/sa/login):  Stellen Sie sicher, dass folgende Angaben korrekt angegeben sind.      
	
	```
	hash = 67890
    pid = 4567
    fid = 34567
    min_questions = A,B,C
    min_lastpage = 2 
	```

	
 

### Schritt 3:  Applikation erstellen.

##### Ressourcen.
Vergleichen Sie diesbezüglich [GitHub | Repository](http://doc.optinomic.org/V2/Developers/repository.html) sowie [Jenkins- Build](http://doc.optinomic.org/V2/Developers/build.html).

##### Änderung in die Repo `develop` pushen.

Sobald Sie unter *Schritt 2* das `base.opapp.m4` File soweit möglich vervollständigt haben, können Sie die App ins Repository pushen.  **Wichtiger Hinweis:**  Alle Änderungen dürfen ausschliesslich an den Branch `develop` gepushed werden. 

##### Überprüfung.

Prüfen Sie ob Ihre Änderungen in [Jenkins- Build](http://doc.optinomic.org/V2/Developers/build.html) erfolgreich 'compiliert' wurden.


### Schritt 3:  Applikation aktivieren.



.	

2.	Base.opapp.m4:
a.	Anpassen von eindeutigem Survey-Namen (am einfachsten mit „Codierung“ ch.suedhang.apps.AppName)
b.	Anpassung der [survey]-section:
i.	Kontrollieren, dass Fragebogen auf Demo-Limesurvey vorhanden ist:
http://limesurvey.optinomic.org/admin/authentication/sa/login; 
ii.	Pfade für hash, pid & fid rausschreiben für base.opapp.m4 [survey] → T:/QM/Optinomic/Module/V2.BaseOpApp_Survey.xlsx
3.	Aktivierung des neuen Moduls in Optinomic
4.	Auslesen der Items für Berechnungen etc.
Für Berechnungen Ergänzung v. Item-Ausgabe: score + parseInt(result['Item-Name‘]);
5.	Base.opapp.m4 soweit möglich vervollständigen
6.	Main soweit möglich vervollständigen bzw. zusammenkürzen, was für die Ausgabe benötigt wird.
7.	Zusatz Export-Funktion:
a.	Templates: export.html
b.	Includes: export.sql
c.	Main:

:beer:

