This is a description of the configuration file in `/var/therapyserver/config/config.json`. The following subtitles are the keys of the main object.

# base_url

This is the root URL of the API, e.g. `"http://optinomic.awesome-clinic.com"`. Changing this value won't change where the website is accessible. If you want to change the base URL of the application, you need to tweak nginx's configuration, then change this value.

# port

The port which the API is listening on. The API will open a listening socket on this port when started. nginx should then proxy the HTTP requests to this port.

# database

An object containing the connection information of the database of the following form. Fields are self-explanatory.

```javascript
{
  "host": "127.0.0.1",
  "user": "optinomics",
  "password": "secret",
  "name": "therapy-server_production",
  "port": 5432      
}
```

# permissions

An object of the form `{"ROLE_NAME": { "constructors": [CONSTRUCTORS], "patient_accesses": [PATIENT_ACCESS_IDENTIFIERS]}, ...}` where CONSTRUCTORS are strings beginning with `TSAC` describing a permitted access, e.g. `"TSACDeleteSurveyResponse"` and PATIENT_ACCESSES_IDENTIFIERS are identifiers (strings) of some patient accesses (see the `patient_accesses` section).

# front_end_directories

A list of directories in which to look for a front-end file. If a request is received with the relative `/a/b/c` and this API endpoint does not exist, the application will then look for the file `a/b/c` in the directories specified with this key.

# assessment_directories

Similar to `front_end_directories` but for the assessment application (via `/assessment`).

# apps_directory

Directory containing the modules (.opapp files). This is where the application will fetch and read modules.

# timezone

Timezone in which the application is used, e.g. `"Europe/Zurich"`.

# repositories

A list of Git repositories containing the apps one wants to make available to the users.

# lime_survey_base_urls

An object of the form `{"HOST_NAME": {"url": "URL", "username": "USER", "password": "SECRET"}, ...}`. Those hosts can be used in the module definitions, more specifically in the `survey` sections. /!\ It must have a host called `default`.

# ng_survey_base_urls

Very much like `lime_survey_base_urls` without the keys `username` and `password`.

# pdfs_directory

Where to write the PDF files when generating a patient report.

# run_sql_files_directory

Where to write the result of a call to `POST /run_sql`.

# extra

Any object. It will be served to the front-end application.

# cis

This is for the CIS importer.

## delimiter

Delimiter used in the CSV files.

## directory

The CIS importer will read files in this directory to import in the application's DB.

## patient_columns, stay_columns and user_columns

Arrays containing the name of the columns in the CSV files.

# origin_email

The email address to use as the sender's address when sending an email.

# sysadmin_emails

A list of email addresses to notify if the application is down.

# access_forms

An array of access form description of the following form:

```javascript
{
  "identifier": "IDENTIFIER",
  "type": "patient",
  "title": "FORM_TITLE",
  "description": "FORM_DESCRIPTION", // should explain what this form is for briefly (when to use it and when not to)
  "header": "FORM_HEADER",
  "fields": [FIELDS],
  "footer": "FORM_FOOTER",
  "validity": SECONDS
}
```

where the title, header and footer are strings to be displayed by the application; the validity is the amount of time when having filled the access form allows the user to access the resource (only a patient for now).

The fields have the following format:

```javascript
{
  "type": "TYPE",
  "identifier": "IDENTIFIER",
  "label": "LABEL",
  // additional fields depending on the type
}
```

The possible types are `input`, `textarea`, `checkbox` and `select`. For the type `select`, an additional field called `options` is required containing an array of objects of the form `{"value": "VALUE", "text": "TEXT"}`.

# patient_accesses

An array of object describing a patient access. This is to be used in conjunction with `permissions` to allow users with a certain role to acccess patient matching this patient access, i.e. this filter. These objects have the following form.

```javascript
{
  "identifier": "IDENTIFIER",
  "is_male": CRITERION,
  "city": CRITERION,
  "zip_code": CRITERION,
  "age": CRITERION,
  "in_stay": CRITERION,
  "stay_start": CRITERION,
  "stay_stop": CRITERION,
  "user_is_lead_therapist": BOOLEAN, // default: false
  "user_is_lead_therapist_or_deputy": BOOLEAN, // default: false
  "user_is_lead_doctor": BOOLEAN, // default: false
  "in_patient_groups": [NAMES] // default: []
}
```

A criterion has the following possible forms:

* `{"type": "all"}` matches everything
* `{"type": "equal", "value": VALUE"}`
* `{"type": "lt", "value": VALUE"}` matches if the field is lower than VALUE
* `{"type": "gt", "value": VALUE"}` matches if the field is greater than VALUE
* `{"type": "and", "left": CRITERION, "right": CRITERION}`
* `{"type": "or", "left": CRITERION, "right": CRITERION}`

NB: Instead of writing `"is_male": {"type": "all"}`, you can also omit the key `is_male` altogether to have the same effect.

For example, to describe all the patients between the age of 12 and 18 and living in London, we can have the following patient access. Note that `lt` and `gt` are strict.

```javascript
{
  "identifier": "london_teenagers",
  "city": {"type": "equal", "value": "London"},
  "age": {
    "type": "and",
    "left": {"type": "gt", "value": 11},
    "right": {"type": "lt", "value": 19}
  }
}
```

Omitting a boolean field results in the patients not being filtered by this criterion. `in_patient_groups` specifies a list of patient groups (by name) in which the patient should be (all of them).

# clinic

Any object. If it contains something like `{"a": "b"}`, the variable `$clinic_a$` will be available in the email templates and contain `b`.