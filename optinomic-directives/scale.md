![image](http://www.ottiger.org/optinomic_logo/optinomic_logo_small.png)
Optinomic - Directive
=====================


####`<scale>`
Displays a `Standard Nine` in a nice view:   

![image](https://raw.githubusercontent.com/Optinomic/optinomic-documentation/master/optinomic-directives/images/scale.png)



####Use it
```
    <scale scaledata="current_XXX.label" scale="9"></scale>

```

Where `current_XXX.label` is declared in `ngController` like this:

```
    $sope.current_XXX.label = {
        "results": {
            "0": {
                "question": "Soziale Orientierung",
                "subquestion": "Ausmass, in dem eine Person anderen Menschen offen und mit positiver Grundhaltung gegenüber tritt.",
                "stanine": 0,
                "sum_score": 0
            },
            "1": {
                "question": "Offensivität",
                "subquestion": "Fähigkeit, aus sich herauszugehen und im Kontakt mit anderen Menschen eigene Interessen aktiv verwirklichen zu können.",
                "stanine": 0,
                "sum_score": 0
            },
            "2": {
                "question": "Selbststeuerung",
                "subquestion": "Fähigkeit eines Menschen, flexibel und rational zu handeln, wobei man sich selbst bewusst als Akteur begreift.",
                "stanine": 0,
                "sum_score": 0
            },
            "3": {
                "question": "Reflexibilität",
                "subquestion": "Fähigkeit einer Person, bei anderen Menschen einen positiven bzw. gewünschten Eindruck zu erzeugen.",
                "stanine": 0,
                "sum_score": 0
            }
        }
    };
```

####Attributes

######`scaledata`    
-  graph - data.

######`scale`    
-  must be set to '9' (scale="9") for a `Standard Nine`.




####Pro Tips
You should start taking other 'Modules' as a 'Starting Point'! A good start could be the module: Inventar sozialer Kompetenzen (ISK-K).

