![image](http://www.ottiger.org/optinomic_logo/optinomic_logo_small.png)
Optinomic - Directive
=====================


####`<card-title>`
Displays a Title, Subtitle and a 'Sub-Subtitle':    
![image](https://raw.githubusercontent.com/Optinomic/optinomic-documentation/master/optinomic-directives/images/card_title.png)



####Use it
```
<card-title title="current_directive.title" subtitle="current_directive.description" info="current_directive.info">
</card-title>
```

####Attributes

######`title`    
-  Main Title:  In the above Example = "Beck-Depr..."    
-  Mandatory   
-  Default: 'Title is undefined'
-  Text-Transformation: Uppercase is generated automaticaly.     


######`subtitle`    
- Subtitle:  In the above Example =  "Schwereg..."
- if not set: no subtile will be displayed.


######`info`    
- Infoline:  In the above Example =   "Muster Beat..."
- if not set: no subtile will be displayed.


####Pro Tips
If you want to pass strings directly into this directive use it like this:
```
<card-title title="'Main Title'" subtitle="'Subtitle'" info="'Infozeile'"></card-title>
```

