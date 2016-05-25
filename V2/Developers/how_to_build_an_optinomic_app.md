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

```JS 
    $scope.setExport = function() {

        // ------------------------------------------------
        // Export - Pakete definieren
        // i n c l u d e _ a s _ j s _ s t r i n g 
        // => (export.sql) muss sich in /includes befinden
        // ------------------------------------------------

        // Hinzufügen gespeicherter SQL-Dateien in /includes
        var module_packages = [];
        var data_query = {};

        data_query = {
            name: 'AASE-G',
            sql: include_as_js_string(
                export.sql)
        };
        module_packages.push(data_query);

        // Init the given Export Settings
        $scope.d.sql_box = $scope.d.functions.getDefaultExportSettings($scope.d.dataMain.params.app_id, module_packages);

    };
    ```
d.	Base.opapp.m4:
[template data_export 6 7]
include(templates/export.html)
8.	Ordner „calculations“: Berechnungen einfügen, die für die Datenausgabe benötigt werden.
Nicht vergessen: in base.opapp.m4 bei calculations (Ende des Files) anpassen!
9.	Templates anpassen → Verknüpfung mit calculations / Ausgaben


1.	Template kopieren	
2.	FBn unique machen	- base.opapp.m4 anpassen (v.a. [module], [survey] & [event])
- main.js: data_query von Export anpassen
- scores: etwas, was ganz sicher eine Ausgabe ergibt, “Frame”, z.B.
include(../lib/html/optinomic/page/start.m4)
<h3 class="md-headline">actInfo | Austritt</h3>
<div>
    <h4 class="md-subhead">Fagerström</h4>
</div>
include(../lib/html/optinomic/page/end.m4)
3.	Export anpassen	Variablen-Ausgabe in Konsole nachschauen
 
4.	Calculations	z.B. Summenbildung, Skalenbildung → ähnliche bestehende App als Vorlage

bei //do not modify stuff here myResults.full = myResponses; an Beginn stellen
5.	Score Verfeinerung	Verknüpfung der Ausgabe (Konsole), z.B. 
<div ng-repeat="response in d.dataMain.survey_responses_group[0]">
    <div>
        <h4 class="md-headline">Fagerström</h4> {{response.calculations[0].calculation_result.FAGERSTROEM.FAGERSTROEM_Score}}
        <pre>{{response.calculations[0].calculation_result.FAGERSTROEM.interpretation | json}}</pre>
    </div>
→ ähnliche bestehende App als Vorlage verwenden
→ Kontrolle, dass mit richtigen Variablen gearbeitet wird, sonst Rückmeldung von CI
6.	Main.js / base.opapp bereinigen	- Nicht verwendete Funktionen aus main.js rausnehmen
- Nicht verwendete Templates aus base.opapp.m4 rausnehmen
- Nicht verwendete Templates löschen

Jenkins:
http://ci.optinomic.org/job/Apps/
http://ci.optinomic.org/job/Apps/293/console (wobei „293“ für die jeweilige Änderung angepasst werden muss)


