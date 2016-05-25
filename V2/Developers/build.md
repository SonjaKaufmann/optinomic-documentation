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
 > git rev-parse --is-inside-work-tree # timeout=10
Fetching changes from the remote Git repository
 > git config remote.origin.url git@github.com:Optinomic/apps.git # timeout=10
Fetching upstream changes from git@github.com:Optinomic/apps.git
 > git --version # timeout=10
using GIT_SSH to set credentials Git key for apps
 > git -c core.askpass=true fetch --tags --progress git@github.com:Optinomic/apps.git +refs/heads/*:refs/remotes/origin/*
 > git rev-parse refs/remotes/origin/develop^{commit} # timeout=10
 > git rev-parse refs/remotes/origin/origin/develop^{commit} # timeout=10
Checking out Revision cf770f4a42df7116a02d93db07cf9d8f3c90ef47 (refs/remotes/origin/develop)
 > git config core.sparsecheckout # timeout=10
 > git checkout -f cf770f4a42df7116a02d93db07cf9d8f3c90ef47
 > git rev-list b48664aa79d704d6b6b5a3a0cb2a52a2e6f1969f # timeout=10
[Apps] $ /bin/sh -xe /tmp/hudson6591366347089645572.sh
+ set -e
+ cat
+ export GIT_SSH=/var/lib/jenkins/git_ssh_wrapper
+ chmod +x /var/lib/jenkins/git_ssh_wrapper
+ ./gen.sh
Generating ch.suedhang.apps.neuroanamnese_todo-1.0.opapp ...
Generating com.optinomic.cis.hisoryentry_chart-1.0.opapp ...
Generating ch.suedhang.apps.case_todo-1.0.opapp ...
Generating ch.suedhang.apps.bscl.anq_user-1.0.opapp ...
Generating com.optinomic.apps.dass-1.0.opapp ...
Generating com.optinomic.apps.whoqol-1.0.opapp ...
Generating com.optinomic.apps.example-1.0.opapp ...
Generating ch.suedhang.apps.bdi-1.0.opapp ...
Generating ch.suedhang.apps.bscl.anq-1.0.opapp ...
Generating com.optinomic.apps.template-1.0.opapp ...
Generating ch.suedhang.apps.aase_doing-1.0.opapp ...
Generating ch.suedhang.apps.tmt_doing-1.0.opapp ...
m4:main.js:138: cannot open `includes/export.sql': No such file or directory
Build step 'Execute shell' marked build as failure
Sending e-mails to: beat@optinomic.org thomas.feron@redspline.com
ERROR: Invalid Addresses
javax.mail.SendFailedException: Invalid Addresses;
  nested exception is:
	com.sun.mail.smtp.SMTPAddressFailedException: 553 5.1.8 <beat@optinomic.org>... Domain of sender address nobody@nowhere does not exist
;
  nested exception is:
	com.sun.mail.smtp.SMTPAddressFailedException: 553 5.1.8 <thomas.feron@redspline.com>... Domain of sender address nobody@nowhere does not exist

	at com.sun.mail.smtp.SMTPTransport.rcptTo(SMTPTransport.java:1835)
	at com.sun.mail.smtp.SMTPTransport.sendMessage(SMTPTransport.java:1098)
	at javax.mail.Transport.send0(Transport.java:195)
	at javax.mail.Transport.send(Transport.java:124)
	at hudson.tasks.MailSender.run(MailSender.java:128)
	at hudson.tasks.Mailer.perform(Mailer.java:145)
	at hudson.tasks.BuildStepCompatibilityLayer.perform(BuildStepCompatibilityLayer.java:78)
	at hudson.tasks.BuildStepMonitor$1.perform(BuildStepMonitor.java:20)
	at hudson.model.AbstractBuild$AbstractBuildExecution.perform(AbstractBuild.java:779)
	at hudson.model.AbstractBuild$AbstractBuildExecution.performAllBuildSteps(AbstractBuild.java:720)
	at hudson.model.Build$BuildExecution.post2(Build.java:185)
	at hudson.model.AbstractBuild$AbstractBuildExecution.post(AbstractBuild.java:665)
	at hudson.model.Run.execute(Run.java:1766)
	at hudson.model.FreeStyleBuild.run(FreeStyleBuild.java:43)
	at hudson.model.ResourceController.execute(ResourceController.java:98)
	at hudson.model.Executor.run(Executor.java:410)
Caused by: com.sun.mail.smtp.SMTPAddressFailedException: 553 5.1.8 <beat@optinomic.org>... Domain of sender address nobody@nowhere does not exist
;
  nested exception is:
	com.sun.mail.smtp.SMTPAddressFailedException: 553 5.1.8 <thomas.feron@redspline.com>... Domain of sender address nobody@nowhere does not exist

	at com.sun.mail.smtp.SMTPTransport.rcptTo(SMTPTransport.java:1686)
	... 15 more
Caused by: com.sun.mail.smtp.SMTPAddressFailedException: 553 5.1.8 <thomas.feron@redspline.com>... Domain of sender address nobody@nowhere does not exist

	... 16 more
Finished: FAILURE
```

Bei genauerer Betrachtung fällt uns der Fehler sofort auf. Der für uns interessante Teil ist:
```
m4:main.js:138: cannot open `includes/export.sql': No such file or directory
```

Entsprechend gilt es die Datei ```includes/export.sql'``` anzulegen oder diesen Verweis in ```main.js``` zu entfernen.
