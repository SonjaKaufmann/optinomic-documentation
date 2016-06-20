# Optinomic-App |  Specification


# Note about JS/CSS

When displaying a view of a module, some basic JS and CSS are included with it. The JS defines `helpers` with the following methods:

* `helpers.getToken()` returns the API token;
* `helpers.getUserID()` returns the ID of the user currently logged in, some API endpoint uses this;
* `helpers.getPatientID()` returns the patient ID for which this module is displayed;
* `helpers.getAppName()` returns the human-readable name of the app;
* `helpers.getAppID()` returns the ID of the module to be used in the API;
* `helpers.getApiURL()` returns the base URL of the API;
* `helpers.getStayID()` returns the ID of the stay assigned to this module if present;
* `helpers.callAPI(method, path, query, body, callback)` calls the API with the specified values (`query` and `body` are objects, e.g. `{"count": 4}`) and the callback function takes the `XMLHttpRequest` object.

For apps wanting to use AngularJS, they can include the modules from the main website and use the service called `SurveyResponseService`.

# Sections

## module (required)

Example:

```
[module]

id = com.myorganisation.apps.example
name = example
short_description = A simple module
version = 1.0
type = patient
```

* `id` gives a unique identifier to the module, it is a good idea to prefix with a Java-style prefix to avoid name clashes.
* `parent` is the identifier of the optional parent module from which sections are inherited.
* `name` is the name displayed to the user.
* `short_description` is a small description in a few words of what the application does.
* `version` is used for dependencies and must be formatted as such: `M.m` where M is the major version which changes only when some modifications are not compatible with the previous version and m is the minor version which changes with retro-compatible modifications. For bug fixes, the version does not need to be changed; that way, the module will automatically be updated on the servers.
* `type` is optional and can be set to either `user` or `patient` (default). 

## dependencies (optional, can have many)

Example:

```
[dependencies]

com.example.apps.some_app >= 2.0 && < 2.4
com.example.apps.another_app < 2.0
```

These sections contain one dependency per line. Each dependencies consist of the module identifier followed by version constraints (or not if you want any version though it might not be a good idea). Version constraints are seperated by `&&` and are formatted as either `>= M.m` or `< M.m`. Spaces are ignored except between the identifier and the constraints.

If you want `<=4.5`, wite `<4.6` and if you want `>4.5`, write `>=4.6`.

## description (required)

Example:

```
[description]

This application does X and Y but not Z. It is inspired by the research from Pr. P in the paper "K".
```

This section contains a long description / additional information about the app. This can be as long as needed.

## developer (required)

Example:

```
[developer]

first_name = John
last_name = Smith
github_user = j.smith
email = j.smith@bigcorp.com
company = Big Corp Inc
phone = +44 207 568789
website = http://www.optinomic.com
```

* `first_name` and `last_name` specifies the identity of the main developer in charge of the app.
* `email` gives the email address with which the developer can be contacted.
* `github_user` (optional) specifies the Github username of the developer.
* `company` (optional) is the name of the organisation which developed the app.
* `phone` is the phone number of the main developer.
* `website` is a URL to a relevant website or page.

## template (optional, can have many)

Example:

```
[template hello_world 6 2]

<head>
  <meta ...></meta>
</head>
<div>Hello, world !</div>
```

Templates are named (any characters but whitespaces) and contain markup that is sent to the browser when calling GET /modules/com.myorganisation.apps.example/view/hello_world (see API). The two numbers are, respectively, the width and the height of the box in which they are going to be rendered. The width must be an integer between 1 and 6 and the height any positive integer. If they are not present, the default values are 6 and 4. 

If a `<head>` tag is present, its contents is added to the appropriate place in the generated document.

##### Specials
* **_admin:** If the name of the template (```hello_world```) contains ```_admin``` like ```hello_world_admin``` the template will be displayed to Admins only.
* **report_only:** If the name of the template (```hello_world```) contains ```report_only``` like ```hello_world_report_only``` the template will not be displayed in the app-view. This is useful if you want to display the given templates only in "Reports".


## pdf_template (optional, can have many)

Example:

```
[pdf_template hello_world some_calculation]

\begin{itemize}
{% forall item %}
  \item{Item "{%= .name %}"} 
{% end %}
\end{itemize}
```

PDF templates are named (any characters but whitespaces) and contain a Yate template (see https://hackage.haskell.org/package/yate) to generate Tex content. The name is followed by the identifier of the calculations that need to be available in the template. The data passed to the template look like:

```
{
  "survey_responses": [OBJECT (same as the JSON returned by the API],
  "calculations": {
    "some_calculation": OBJECT
  },
  "patient": [OBJECT (same as the JSON returned by the API],
  "annotations": {
    "module": OBJECT, 
    "patient": OBJECT,
    "patient_module": OBJECT
  }
}
```

## javascript (optional)

Example:

```
[javascript]

function ExampleController($scope) {
  // ...
} 
```

This section contains Javascript code which is displayed together with the template (called a view in the API) when displaying it in the user's browser. It is common to all views.

## css (optional)

```
[css]

body, html {
  background-color: #eee;
}
```

The `css` section works exactly in the same way as the `javascript` section.

## survey (optional, can have many)

There are two types of surveys: `lime` and `ng` depending on the survey system they use: respectively LimeSurvey and ng-survey.

Variables in common are:

* `id` is an identifier for the survey (see the sections `survey_markup` and `event`) also used in the API.
* `type` needs to be set to `lime` for LimeSurvey.
* `responsibility` specifies who needs to manage events. Possible values are:
 * `patient_via_email`: the patient will receive an email when an event is created or overdue;
 * `patient_via_assessment`: the patient won't receive email, he/she is supposed to do them in the "assessment room";
 * `lead_therapist`: the therapist in charge of the patient;
 * `lead_therapist_and_deputy`: the therapist in charge of the patient and his/her deputy if available;
 * a role like `Admin` or `Therapist` (no emails are going to be sent). Avoid this last value for generic modules as roles can vary depending on the hospital's configuration.
* `name` is the name of the survey to be displayed to the user.
* `host` is the key to use in order to retrieve the base URL (and credentials for LimeSurvey) from the configuration file, typically `default`. 

### LimeSurvey

Example:

```
[survey]

id = my_survey
type = lime
responsibility = patient_via_email
name = Example survey
host = default
survey_id = 12
hash = 67890
pid = 4567
fid = 34567
min_questions = A,B,C
min_lastpage = 2
```

* `survey_id` is the survey's ID on LimeSurvey's side.
* `hash`, `pid` and `fid` are the identifiers of the fields which contain, respectively, the random hash of the event, the patient ID and the FID in the resulting JSON.
* `min_questions` is a comma-separated list of fields which needs to be present to accept the survey as filled.
* `min_lastpage` is the page number the user needs to reach to complete the survey.

### ng-survey

Example:

```
[survey]

id = my_ng_survey
type = ng
responsibility = patient_via_email
name = Second example survey
host = default
```

This section MUST have a corresponding `survey_markup` section.

## survey_markup (optional, required for every ng survey)

Example:

```
[survey_markup my_ng_survey]

<div>Markup of the survey</div>
```

This section specifies the markup to be sent to the ng-survey server when creating a specific survey for the `survey` section which `id` corresponds (here `id = my_ng_survey`).

## event (optional, can have many)

Example:

```
[event name]

type = daily
time = 13:00
due_after = 86400
overdue = ignore
description = A daily reminder to disable this example module
survey = my_survey
```

* `type` specifies when the event is triggered. Possible values are:
 * `daily`: once a day at a specific time;
 * `weekday`: on a specific day of the week at a specific time;
 * `every_x_days`: every N days at a specific time;
 * `before_exit`: N days before the end of the stay at a specific time;
 * `unplanned`: never;
 * `on_activation`: when the module is activated for a patient;
 * `on_deactivation`: when the module is deactivated for a patient;
 * `once`: on a specific date and time;
 * `on_new_entry`: when a survey is filled;
 * `every_x_entries`: every N survey responses filled.
 * `on_annotation`: every time an annotation for this module and a patient is changed;
 * `every_x_annotations`: every X times an annotation is changed.
* `due_after` is the amount of time before the event is marked as due in seconds.
* `overdue` specifies what to do when an event is due. Possible values are:
 * `ignore`: the event is aborted;
 * `send_reminder_once`: a reminder is sent, if nothing changes afterwards, the event is aborted;
 * `send_x_reminders`: a maximum of N reminders are sent separated by a certain amount of time.
* `reminder_count` (for `overdue = send_x_reminders`) specifies the number of reminders to send before aborting.
* `description` gives a description of the nature of the event (keep it short).
* `survey_id` links to a `survey` section with the same `id`.
* `time` specifies the time of the day at which the event needs to be generated. The format is `HH:MM`. For the type `once`, this value is the date and time when to generate the events and its format is 'YYYY-mm-dd HH:MM'.
* `day` (for `weekday`) is the day number (1 for Monday - 7 for Sunday).
* `days`(for `every_x_days` and `before_exit`) is an amount of days for, respectively, the interval between events and the time before the stay exit.
* `entries` (for `every_x_entries`) is the amount of survey responses filled between two events.
* `annotations` (for `every_x_annotations`) is the amount of changes to the annotation to trigger the event.

## email (optional)

Example:

```
[email overdue html]

Hello $patient$,

A task is overdue <a href="$survey_link$">here</a>.

Thank you
```

There are two types of email: `new_event` and `overdue`, the former for emails sent when an event is created and the latter for emails sent when an event hits its deadline. Similarly, there are three parts: `subject`, `plain` and `html` for the email subject, the body as plain text and the enriched HTML body.

For a given type, default templates will be used if none is given in the file. If either `plain` or `html`, only this one will be sent and the default templates will be ignored. You can of course (and it is a good idea) give both. There is also a default value for the subject.

Inside the templates, the following strings will be replaced:

* `$survey_link$` by the URL of the survey;
* `$patient$` by the name of the patient, e.g. "John Smith;
* `$patient_secure$` by the initials followed by the birth year, e.g. "J. S. (1973)" (if a birth date is present);
* `$recipient_name$` by the name of the patient or the user depending of the email's recipient;
* `$event_date$`, `$event_time$` and `$event_datetime$` by the time the event was created in the formats `1970-01-31`, `12:34` and `1970-01-31 12:34`;
* `$patient_link$` by the URL of the patient page.

## calculation (optional, can have many)

Example:

```
[calculation javascript my_calculation some_other_module some_other_module:some_calculation]

function main(data) {
  // Something
  return { "key": "value" };
}
```

There are two types of calculation: `javascript` and `lua`. For JS calculation, you need to define a function `main` taking the relevant data and returning an object which is going to be sent to the user through the API.

For patient modules, the data passed to calculations are of the following form:

```
{
  "patient": ENTITY,
  "survey_responses": [ENTITY],
  "foreign_survey_responses": {"MODULE_IDENTIIFER": [ENTITY]},
  "other_calculations": {"MODULE_IDENTIFIER:CALCULATION_IDENTIFIER": OBJECT},
  "annotations": {
    "module": OBJECT,
    "patient": OBJECT,
    "patient_module": OBJECT
  }
}
```

For user modules, the data passed are the same but in an array.

For Lua calculations, this is a bit more complicated: responses are passed to the function `main` as plain text and so should be the returning object. For that purpose, the function `dkjson` returns an object which can be used to encode/decode JSON. (dkjson library by David Kolf, see http://dkolf.de/src/dkjson-lua.fsl/home). Here is a short example:

```
local json = dkjson()

function main(respjson)
  local responses = json.decode(respjson)
  -- Do something
  return json.encode(responses)
end
``` 

## patient_group (optional, can have many)

Example:

```
[patient_group my_patient_group]

sql_filter = WHERE gender = 'Male'
modules_to_activate = module1,module2
```

* `sql_filter` is some SQL code filtering the patients that should be in the group;
* `modules_to_activate` (optional) is a comma-separated list of modules to activate for those patients;
* `modules_to_deactivate` (optional) is for module deactivation.

For more complex queries, say a `LEFT JOIN`, you can access fields from the table `patient` with `p.`.