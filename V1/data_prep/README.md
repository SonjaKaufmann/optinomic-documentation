![image](http://www.ottiger.org/optinomic_logo/optinomic_logo_small.png)
Data Preparation
================


####General:     
Inside `Lime Creator` you can create a 'data-view'. Optinomic uses [PostgreSQL](http://www.postgresql.org/) as Database.

####Resources
The following Resources are helpful:    
-	[PostgreSQL](http://www.postgresql.org/)    
-	[PostgreSQL / Documentation](http://www.postgresql.org/docs/9.4/static/index.html)
-	[Google PostgreSQL for you](http://lmgtfy.com/?q=PostgreSQL)   


#Data Preparation
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


####Best pracitces:     
On the Home-Page (User-Level) of the Optinomic-App - activate module: `Data Preparation` or `Datenaufbereitung`. Now inside this card you can test-run SQL commands. Run only the `SELECT` part - do not run `create or replace temp view XXX_NAME_OF_VIEW_XXX as`! 
```
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
**Tip** Or if the field `SQL` is empty - just click on the `Tables (orange)` or on the `Views (blue)` and a `SELECT *` will be created for you automaticaly. Here you see also the created `VIEW` by `create or replace temp view XXX_NAME_OF_VIEW_XXX as` from the modules as `XXX_NAME_OF_VIEW_XXX` (Rename this).


####Joins Between Tables:     
Thus far, our queries have only accessed one table at a time. Queries can access multiple tables at once, or access the same table in such a way that multiple rows of the table are being processed at the same time. A query that accesses multiple rows of the same or different tables at one time is called a join query. This can be done like:
```
select
   * 
from 
   patient, survey_response 
where 
   survey_response.patient = patient.id

```  



####Template |  Starting Point
A good starting point for `SQL VIEW` can be found here:    
-	[BASIC SQL VIEW](https://github.com/Optinomic/optinomic-documentation/blob/master/data_prep/template.sql)  

**Important** Overwrite `XXX_NAME_OF_VIEW_XXX` with the name of your view - same as declared @ `Data Prep View Names` 



#Data-Functions
On the Home-Page (User-Level) of the Optinomic-App - activate module: `Data Functions` or `Datenfunktionen`. Here you can specify SQL-functions like this:

```  
CREATE OR REPLACE FUNCTION recode_from_to(x varchar, my_from varchar, my_to varchar)
   RETURNS "varchar" AS
$$
BEGIN    
   IF (x = my_from) then
       return my_to;
   else
       return x;
   end if;
END;
$$
LANGUAGE 'plpgsql';
```    

In the following example - the value `Suchtdruck_1` will be recoded like this: `If value = 9 then 0 else value`:


```

SELECT
  recode_from_to(((cast(response AS json))->>'Suchtdruck_1'), '9', '0') as Recode_Example
, *

FROM 
  survey_response

WHERE
  module = 'Suchtdruck (Craving)'

```  


#Data-Calculations
Whenever possible you should use `Calculations`:
```
VZEA090::int4 + VZEA100::int4
```
Remeber - you can do simple `Recalculations` here:
```
ESCI_Unsicherheit_ESCIU1::int4 + ( 5 - ESCI_Unsicherheit_ESCIU2::int4)
```
This example would be: '=IF(`value`=1; 4; IF(`value`=2; 3; IF(`value`=3; 2; IF(`value`=4; 1;0))))'





####Contact
*Optinomic GmbH*   
*Haldenstrasse 7*     
*CH - 8942 Oberrieden*     
*+41(0)44 508 26 76*    
*info@optinomic.com*   
*[www.optinomic.com](http://www.optinomic.com)*     


