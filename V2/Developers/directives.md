# Directives

## General Ressources

We recommend the following ressources for a basic understanding:
-	[AngularJS](https://docs.angularjs.org/guide/directive)    
-	[w3schools](http://www.w3schools.com/angular/angular_directives.asp)    


## Optinomic Ressources
The following Directives are available inside Optinomic App-Templates:


### < z-score >  

____

![image](http://doc.optinomic.org/images/zscore_single.png)
____


Inside `templates.html` the following tag is all you need.  

```HTML
<z-score data="d.zScore.tmt_a.eintritt"></z-score>
<z-score data="d.zScore.tmt_a.austritt"></z-score>
```


Inside `main.js`:  The `data` property from the directive expects a JSON formatted as the following example:

```JSON
$scope.d.zScore.tmt_a.eintritt = {
          "zscore": 1.2,
          "zscore_color" : '#C5CAE9',
          "zscore_min": -5.2,
          "zscore_max": 3.1,
          "text_left": "Eintritt",
          "text_left_caption": "21.4.2016",
          "text_right": "TMT A",
          "text_right_caption": "",
          "clinicsample_start": -2,
          "clinicsample_end": 1.8,
          "clinicsample_color": '#3F51B5',
          "show_numbers": true,
          "show_clinicsample": true,
          "show_clinicsample_scores": true,
          "show_text": true,
          "marker_1_score": -3.4,
          "marker_1_text"; 'Zeitabbruch',
          "marker_1_color"; '#F44336',
      };
```


`zscore`:  Is the main z-Score. The color of the main z-Score can be defined by `zscore_color`. `zscore_min` & `zscore_max`:  Default this is from `-3` to `3`, but this can be overwritten. All the `text_*` are the explaining texts for the user. They can be shown/hide by the toggle `show_text`. Clinic Sample is the light blue section which represents the clinical sample. The color from the sample can be overwritten by `clinicsample_color`. Also the sample can be shown/hide by the toggle `show_clinicsample`. While `show_clinicsample = true` you can finecontrol if the scores from the sample is shown to the user by `show_clinicsample_scores`.


____

![image](http://doc.optinomic.org/images/zscore_group.png)
____


As you see in the above chart. You can easily add multiple `<z-score data="'XXX'"></z-score>` in a row. In this situation it is recommended that you show the numbers from the ruler only on the last chart. You can control this by the toggle `show_numbers`.  Also you have one special marker. The marker is shown if `marker_1_score` is not null or undifined. The color and the text is defined by `marker_1_color` and `marker_1_text`.

