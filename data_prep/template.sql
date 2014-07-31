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
