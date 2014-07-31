![image](http://www.ottiger.org/optinomic_logo/optinomic_logo_small.png)
Templates
=========


####General:     
Inside `Lime Creator` you can create a 'data-view'. Optinomic uses [PostgreSQL](http://www.postgresql.org/) as Database.

####Data Preparation
Inside `Data Prep View Names` you can set the name of the 'view'. 
Inside `Data Prep View Definitions` stuff like this:

```
create or replace temp view XXX_NAME_OF_VIEW_XXX as

SELECT
  patient as Optinomic_PID
, module as Module_Name
, scheduled as When_was_module_scheduled
, filled as When_was_survey_done
, NULL as Empty_Cell 
, recode_into(((cast(response AS json))->>'Suchtdruck_1'), '9', '0') as Recode_Example
, ((cast(response AS json))->>'datestamp') as Renamed_Cell_from_Response 
, response as Response_from_Survey
, *

FROM 
  survey_response

WHERE
  module = 'Suchtdruck (Craving)'

```  


####Template |  Starting Point
A good starting point for `ngController` can be found here:    
-	[BASIC SQL VIEW](https://github.com/Optinomic/optinomic-documentation/blob/master/data_prep/template.sql)  


####Resources
The following Resources are helpful:    
-	[Google PostgreSQL](http://lmgtfy.com/?q=PostgreSQL)   
-	[PostgreSQL](http://www.postgresql.org/)    




####Contact
*Optinomic GmbH*   
*Haldenstrasse 7*     
*CH - 8942 Oberrieden*     
*+41(0)44 508 26 76*    
*info@optinomic.com*   
*[www.optinomic.com](http://www.optinomic.com)*     

