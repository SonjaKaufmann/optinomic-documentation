# Jenkins - Build



#### Hinweis
Optinomic Apps werden automatisch durch Jenkins in ein ```.opapp``` File "kompiliert". Das ```.opapp``` File ist die eigentliche Applikation, welche ausgeführt wird.

**Jenkins:** Ist unter folgender URL zu erreichen:
[http://ci.optinomic.org/job/Apps/](http://ci.optinomic.org/job/Apps/)


#### Fehlerbehandlung
Falls die App nicht korrekt kompiliert, gilt es die Konsole des jeweiligen Jenkins-Jobs zu prüfen:

z.B.: http://ci.optinomic.org/job/Apps/917/console

Diese Ausgabe enthält dann z.B. folgende Ausgabe:
```
Started by an SCM change
Building in workspace /var/lib/jenkins/workspace/Apps
...

+ ./gen.sh
Generating ch.suedhang.apps.neuroanamnese_todo-1.0.opapp ...
Generating com.optinomic.cis.hisoryentry_chart-1.0.opapp ...
Generating ch.suedhang.apps.case_todo-1.0.opapp ...
Generating ch.suedhang.apps.bscl.anq_user-1.0.opapp ...
Generating com.optinomic.apps.dass-1.0.opapp ...
Generating com.optinomic.apps.whoqol-1.0.opapp ...
Generating com.optinomic.apps.example-1.0.opapp ...
Generating ch.suedhang.apps.bscl.anq-1.0.opapp ...
Generating com.optinomic.apps.template-1.0.opapp ...
Generating ch.suedhang.apps.aase_doing-1.0.opapp ...
Generating ch.suedhang.apps.tmt_doing-1.0.opapp ...
m4:main.js:138: cannot open `includes/export.sql': No such file or directory
Build step 'Execute shell' marked build as failure
Sending e-mails to: xxx@optinomic.org xxx@redspline.com
ERROR: Invalid Addresses
...
Finished: FAILURE
```

Bei genauerer Betrachtung fällt uns der Fehler sofort auf. Der für uns interessante Teil ist:
```
m4:main.js:138: cannot open `includes/export.sql': No such file or directory
```

Entsprechend gilt es die Datei ```includes/export.sql'``` anzulegen oder diesen Verweis in ```main.js``` zu entfernen.
