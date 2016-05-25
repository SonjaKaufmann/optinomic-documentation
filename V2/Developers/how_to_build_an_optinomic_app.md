# How to build an Optinomic App


1.	Kopieren vom Ordner der Vorlage “angular_template“
2.	Base.opapp.m4:
a.	Anpassen von eindeutigem Survey-Namen (am einfachsten mit „Codierung“ ch.suedhang.apps.AppName)
b.	Anpassung der [survey]-section:
i.	Kontrollieren, dass Fragebogen auf Demo-Limesurvey vorhanden ist:
http://limesurvey.optinomic.org/admin/authentication/sa/login; 23or5P6gSv3YjAcJCUe4
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
Jenkins:
http://ci.optinomic.org/job/Apps/
http://ci.optinomic.org/job/Apps/293/console (wobei „293“ für die jeweilige Änderung angepasst werden muss)


