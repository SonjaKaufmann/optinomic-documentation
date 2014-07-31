![image](http://www.ottiger.org/optinomic_logo/optinomic_logo_small.png)
Optinomic - Directive
=====================


####`<scale>`
Displays a nice `Numerical Value - Graph` - with Ranges:   

![image](https://raw.githubusercontent.com/Optinomic/optinomic-documentation/master/optinomic-directives/images/score_threshold_ranges.png)

Without Ranges:   

![image](https://raw.githubusercontent.com/Optinomic/optinomic-documentation/master/optinomic-directives/images/score_threshold_no_ranges.png)


####Use it
```
<score-threshold score="current_bdi2.BDI_Score" max="63" min="0" show-percent-scale="false" scale-ranges="scale_ranges">
</score-threshold>
```

Where `scale_ranges` is declared in `ngController` like this:

```
    $scope.scale_ranges = {
        "ranges": [{
            "from": 0,
            "to": 8,
            "result": "Keine Depression"
        }, {
            "from": 9,
            "to": 13,
            "result": "Minimale Depression"
        }, {
            "from": 14,
            "to": 19,
            "result": "Leichte Depression"
        }, {
            "from": 20,
            "to": 28,
            "result": "Mittelschwere Depression"
        }, {
            "from": 29,
            "to": 63,
            "result": "Schwere Depression"
        }]
    };
```

####Attributes

######`score`    
-  Numerical value         

######`min`    
- The Min of the Graph. (Because of BUG: Must be 0!)

######`max`    
- The Max of the Graph.

######`scale-ranges`    
- If declared: Show Ranges.

######`show-percent-scale`    
- true / false:  if true: Show some small lines to show the %. The example image above `Without Ranges` have set show-percent-scale="true". 

