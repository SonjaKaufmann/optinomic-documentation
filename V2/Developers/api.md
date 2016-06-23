# Generalities

Every endpoint returns a JSON object with a key describing the data returned, e.g. `/patients` returns `{"patients": [...]}` and `/patients/1` returns `{"patient": ... }`. This is for consistency and because it must always return an object.

## Errors

In case of errors (4xx or 5xx), a JSON object is returned with an error key, e.g. 

    $ curl localhost:3001/signin -X POST -d 'email=admin@optinomics.com'
    {"error":"Parameter \"password\" is missing."}

## Entities vs objects

**Changed: all endpoints return entities**

Depending on the context, elements such as patients, modules, etc. are returned as-is or as an entity. For instance, when requesting a specific patient with `/patients/42`, it is useless to return the ID 42 so the patient is returned like this:

    {"patient":{"email":"a@b.com",...}}

On the other hand, when requesting the watchlist with `/watchlist/1`, we need to return patient IDs so the API returns entities like this:

    {
      "patients": [
        {
          "id": 42,
          "data": { "email": "a@b.com", ... }
        }, ...
      ]
    }

In the documentation thereafter, it will be shown with `ENTITY` and `OBJECT`.

## Lists as parameters

When the following documentation specifies a parameter such as `modules` as a parameter being a list, the client should set the parameter `modules_count` to the number of items in the list and `modulesN` to the value for each item. For example, if `modules = ["first", "second"]`, the corresponding query string is `modules_count=2&modules0=first&modules1=second`.

## Pairs as parameters

When the API requires pairs of values to be sent with the name `myname`, it will try to read the parameters `myname_left` and `myname_right`. Why not use two parameters instead, you ask? This is useful for list of pairs. For example, a list of people as pairs composed of the first and the last name can be passed as such:

    person_count=2&person0_left=John&person0_right=Smith&person1_left=Alice&person1_right=Miller

# Endpoints

The front-end should take care of all possible cases, the API might return an 500 (or other) for all endpoints. For example, if a parameter is missing, it returns a 400 Bad Request or, if not logged in or with the wrong user, it might return a 401 Unauthorized. Or even a 404 if something is not found.

## POST /signin

**Parameters:** `email`, `password`, `no_token` (optional, default: `False`)

**Responses:**
* 401 Unauthorized if the credentials are wrong
* 403 Forbidden if the account has been locked
* 200 OK in case of success with a JSON like this: `{"user_id": 1, "token": "b2bb30a2-72bb-4446-be0e-1942a8d9c202"}`.

The front-end must then send this token as a HTTP header named `X-API-Token` in all following requests to the API. Also, the server does not know the current user when receiving requests, that's why it is returned when signing in so the front-end can keep it in memory and use it later on when, for example, requesting the watchlist with `POST /watchlist/USER_ID`.

If the parameter `no_token` is set to `True`, no token is created and thus none is returned either.

## POST /signin/patient

**Parameters:** `cis_pid`, `birthdate`

**Responses:**
* 401 Unauthorized if the credentials are wrong
* 200 OK in case of success with a JSON like this: `{"patient_id": 1, "token": "b2bb30a2-72bb-4446-be0e-1942a8d9c202"}`.

The rest is exactly the same as with `POST /signin`.

## POST /signout

**Parameters:** None

**Responses:**
* 204 No Content (no JSON)

## POST /forgotten_password/:email

It sends an email with a link to `BASE_URL/#/reset_password/USER_ID/TOKEN`. The front-end can then use the token (in the header `X-API-Token`) to use the endpoint `PUT /users/:user_id/password`.

**Parameters:** None

**Responses:**
* 204 No Content (no JSON)
* 404 Not Found if the email is wrong

## GET /watchlist/:user_id

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"patients": [ENTITIES]}`.

## POST /watchlist/:user_id/watch/:patient_id

**Parameters:** None

**Responses:**
* 204 No Content (no JSON) in case of success.

## POST /watchlist/:user_id/unwatch/:patient_id

**Parameters:** None

**Responses:**
* 204 No Content (no JSON) in case of success.

## GET /patient_group_watchlist/:user_id

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"patient_groups": [ENTITIES]}`.

## POST /patient_group_watchlist/:user_id/watch/:patient_group_id

**Parameters:** None

**Responses:**
* 204 No Content (no JSON) in case of success.

## POST /patient_group_watchlist/:user_id/unwatch/:patient_group_id

**Parameters:** None

**Responses:**
* 204 No Content (no JSON) in case of success.

## POST /patients

**Parameters:** `first_name`, `last_name`, `birth_name`, `gender`, `title`, `birthdate`, `address1`, `address2`, `city`, `zip_code`, `country`, `language`, `deceased`, `email`, `phone_home`, `phone_mobile`, `cis_pid`, `ahv`, `notes`

**Responses:**
* 400 Bad Request in case of missing parameters or validation error
* 201 Created with a JSON like this: `{"patient": ENTITY}`.

## GET /patients

**Parameters:** (all optional) `gender`, `city`, `zip_code`, `age_over` (strict), `age_under` (strict), `in_stay`, `lead_therapist`, `cis_lead_doctor`, `stay_start_before`, `stay_start_after`, `stay_stop_before`, `stay_stop_after`

**Responses:**
* 200 OK with a JSON like this: `{"patients": [ENTITIES]}`.

## GET /patients/:patient_id

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"patient": ENTITY}`.

## GET /patients/:patient_id/full

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"patient": ENTITY, "stays": [ENTITIES], "patient_uses_module": [{"entity": ENTITY, "module": OBJECT}]}`.

## PUT /patients/:patient_id

**Parameters:** `first_name`, `last_name`, `birth_name`, `gender`, `title`, `birthdate`, `address1`, `address2`, `city`, `zip_code`, `country`, `language`, `deceased`, `email`, `phone_home`, `phone_mobile`, `cis_pid`, `ahv`, `notes`

**Responses:**
* 400 Bad Request in case of missing parameters or validation error
* 204 No Content (no JSON) in case of success

## DELETE /patients/:patient_id

**Parameters:** None

**Responses:**
* 204 No Content (no JSON)

## GET /patients/:patient_id/access

**Parameters:** None

**Responses:**
* 204 No Content if the user has access to the patient
* 401 Unauthorized otherwise


## POST /patients/:patient_id/stays

**Parameters:** `start`, `stop`, `lead_therapist_id`, `cis_fid`, `photo`, `status`, `first_contact`, `stop_status`, `class`, `service_provider`, `insurance_provider`, `insurance_number`, `cis_lead_doctor`, `notes`

**Responses:**
* 201 Created with a JSON like this: `{"stay": ENTITY}`.

Stays have phases:
* `before_stay`: the stay starts in the future;
* `in_stay`: the patient is currently in stay;
* `after_exit`: the stay ended less than 14 days ago (included);
* `frozen`: the stay has manually been frozen (no more events, changes, ...);
* `complete`: the stay ended more than 14 days ago;
* `unfrozen`: the stay is complete but has been unfrozen by somebody.

The key `frozen` contains a boolean which indicates if the stay is frozen, that is, the phase is `frozen` or `complete`.

## GET /patients/:patient_id/stays

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"stays": [ENTITIES]}`.

## PUT /stays/:stay_id/therapists

**Parameters:** `therapist_id` (this is to overwrite the therapist set by the CIS interface, leave empty to use the default one), `deputy_therapist_id` (empty by default)

**Responses:**
* 400 Bad request in case of missing parameter
* 204 No Content (no JSON) in case of success

## PUT /stays/:stay_id

**Parameters:** `patient_id`, `start`, `stop`, `lead_therapist_id`, `cis_fid`, `photo`, `status`, `first_contact`, `stop_status`, `class`, `service_provider`, `insurance_provider`, `insurance_number`, `cis_lead_doctor`, `notes`

**Responses:**
* 400 Bad request in case of missing parameter
* 204 No Content (no JSON) in case of success

## POST /stays/:stay_id/phase/freeze

**Parameters:** None

**Responses:**
* 204 No Content (no JSON) in case of success

If the patient is in stay and the stay has been frozen with this endpoint. It should be unfrozen with `POST /stays/:stay_id/phase/automatic`, otherwise it would stay unfrozen even after the stay has ended for more than 14 days.

## POST /stays/:stay_id/phase/unfreeze

**Parameters:** None

**Responses:**
* 204 No Content (no JSON) in case of success

## POST /stays/:stay_id/phase/automatic

**Parameters:** None

**Responses:**
* 204 No Content (no JSON) in case of success

Let the application decide what phase the stay should be in.

## DELETE /stays/:stay_id

**Parameters:** None

**Responses:**
* 204 No Content with no JSON

## POST /users

**Parameters:** `email`, `password`, `gender`, `title`, `first_name`, `last_name`, `birthday`, `phone`, `description`, `role`, `initials`, `ou`, `cis_uid`

**Responses:**
* 400 Bad Request in case of missing parameters or validation error
* 401 Unauthorized when trying to create a user with admin role from an account without admin access
* 201 Created with a JSON like this: `{"user": ENTITY}`.

## GET /users_roles

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"roles": [NAMES]}`.

Roles are defined in the configuration file in the key `permissions` plus the roles `Admin` and `NoRole`, i.e. `{"permissions": {"Therapist": []}}` will result in the roles `Admin`, `NoRole` and `Therapist`.

## GET /users

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"users": [ENTITIES]}`.

## GET /users/:user_id

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"user": ENTITY}`.

## PUT /users/:user_id

**Parameters:** `email`, `gender`, `title`, `first_name`, `last_name`, `birthday`, `phone`, `description`, `initials`, `ou`, `cis_uid`

**Responses:**
* 400 Bad Request in case of missing parameter or validation error
* 204 No Content (no JSON) in case of success

## PUT /users/:user_id/password

**Parameters:** `password`

**Responses:**
* 204 No Content in case of success
* 401 Unauthorized

## PUT /users/:user_id/role

**Parameters:** `role`

**Responses:**
* 204 No Content in case of success
* 401 Unauthorized

## DELETE /users/:user_id

**Parameters:** None

**Responses:**
* 204 No Content (no JSON)

## POST /users/:user_id/lock
## POST /users/:user_id/unlock

**Parameters:** None

**Responses:**
* 204 No Content (no JSON)
* 401 Unauthorized if not admin

## GET /patients/:patient_id/modules

**Parameters:** `stay_id` (optional)

**Responses:**
* 200 OK with a JSON like this: `{"activated_patient_uses_modules": [{"entity": PUM ENTITY, "module": MODULE OBJECT}], "deactivated_modules": [MODULE OBJECTS]}` (modules are not in the DB, so not entities) with deactivated modules empty if `stay_id` is passed.

## POST /patients/:patient_id/activate_module

**Parameters:** `module_identifier` and `stay_id` (optional)

**Responses:**
* 400 Bad Request in case of missing parameter or validation error (e.g. module already activated)
* 204 No Content (no JSON) in case of success

## POST /patients/:patient_id/deactivate_module

**Parameters:** `module_identifier`, `stay_id` (optional)

**Responses:**
* 400 Bad Request in case of missing parameter
* 204 No Content (no JSON) in case of success

Note: If no `stay_id` is given, any patient_uses_module will be deleted.

## GET /users/:user_id/modules

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"user_uses_modules": [{"entity": PUM ENTITY, "module": MODULE OBJECT}]}`.

## POST /users/:user_id/activate_module

**Parameters:** `module_identifier`

**Responses:**
* 400 Bad Request in case of missing parameter or validation error (e.g. module already activated)
* 204 No Content (no JSON) in case of success

## POST /users/:user_id/deactivate_module

**Parameters:** `module_identifier`

**Responses:**
* 400 Bad Request in case of missing parameter
* 204 No Content (no JSON) in case of success

## GET /patients/:patient_id/events

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this `{"events": [ENTITIES]}`

## GET /users/:user_id/events

**Parameters:** `status` (optional)

**Responses:**
* 200 OK with a JSON like this `{"user_events": [ENTITIES], "role_events": [ENTITIES]}`

## PUT /events/:event_id

**Parameters:** `status`

**Responses:**
* 204 No content

## GET /patients/:patient_id/event_calendar_url

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"calendar_url": URL}`

## POST /patient_uses_modules/:patient_uses_module_id/schedule_survey

**Parameters:** `survey_identifier`, `responsibility` (optional, see values for the corresponding field  in module specification)

**Responses:**
* 201 Created with a JSON like this `{"event": ENTITY}`

## GET /survey_responses/:module_identifier

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this `{"result":[{"patient":ENTITY,survey_responses": [{"entity": ENTITY, "event": OBJECT}]}}`

## GET /patients/:patient_id/survey_responses/:module_identifier

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this `{"survey_responses": [{"entity": ENTITY, "event": OBJECT}]}`

## GET /stays/:stay_id/survey_responses/:module_identifier

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this `{"survey_responses": [{"entity": ENTITY, "event": OBJECT}]}`

## POST /patients/:patient_id/survey_responses/:module_identifier

**Parameters:** None (The body is the response's JSON)

**Responses:**
* 201 Created with a JSON like this `{"survey_response": ENTITY}`

## POST /patient_uses_modules/:patient_uses_module_id/survey_responses

It's useful if a module wants to create a survey response directly without creating a survey and passing through ng-survey or LimeSurvey. Compared to the endpoint above, this one gives a chance to specify the correct stay as otherwise it is taking the most likely.

**Parameters:** None (The body is the response's JSON)

**Responses:**
* 201 Created with a JSON like this `{"survey_response": ENTITY}`

## PUT /survey_responses/:survey_response_id

**Parameters:** None (The body is the response's JSON)

**Responses:**
* 204 No Content

## POST /run_sql

**Parameters:** `query`, `delimiter` (optional, default ';'), `including_headers` (for CSV, default: `True`), `format` (default: `csv`), `direct` (default: `False`)

**Responses:**
* 201 Created with a JSON like this: `{"download_url": URL}`
* 400 Bad Request if the parameter `including_headers` is specified though the format is JSON

The JSON format is as such `{"headers": [HEADER], "rows": [OBJECT]}`.

## GET /patient_groups

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"patient_groups": [ENTITIES]}`

## POST /patient_groups

**Parameters:** `name`, `sql_filter`, `modules_to_activate` (list) and  `modules_to_deactivate` (list)

**Responses:**
* 400 Bad Request in case of validation error or missing parameter
* 401 Unauthorized if not admin (as the user can write SQL)
* 201 Created with a JSON like this: `{"patient_group": ENTITY}`

The presence of `sql_filter` determines the group type: automatic or manual.

## PUT /patient_groups/:patient_group_id

**Parameters:** `name`, `sql_filter`, `modules_to_activate` (list) and  `modules_to_deactivate` (list)

**Responses:**
* 400 Bad Request in case of validation error or missing parameter
* 401 Unauthorized if not admin
* 204 No Content (no JSON)

## DELETE /patient_groups/:patient_group_id

**Parameters:** None

**Responses:**
* 204 No Content (no JSON)

## GET /patient_groups/:patient_group_id/patients

**Parameters:** (see filtering parameters of GET /patients)

**Responses:**
* 200 OK with a JSON like this: `{"patients": [ENTITIES]}`

## POST /patient_groups/:patient_group_id/patients

**Parameters:** `patient_id`

**Responses:**
* 400 Bad request if the patient group is automatic (i.e. has a `sql_filter`)
* 204 No content (no JSON)

## DELETE /patient_groups/:patient_group_id/patients

**Parameters:** `patient_id`

**Responses:**
* 400 Bad request if the patient group is automatic (i.e. has a `sql_filter`)
* 204 No content (no JSON)

## PATCH /patient_groups/:patient_group_id/patients/bulk

**Parameters:** `patient_ids_to_add` (list) and `patient_ids_to_remove` (list)

**Responses:**
* 400 Bad request if the patient group is automatic (i.e. has a `sql_filter`)
* 204 No content (no JSON)

## GET /modules

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"patient_modules": [OBJECT], "user_modules": [OBJECTS]}`

## GET /modules/disabled

Return the list of modules installed but not yet enabled in the application.

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"disabled_patient_modules": [OBJECTS], "disabled_user_modules": [OBJECT]}`

## GET /modules/errors

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"module_errors": [STRINGS]}`

## GET /module_activations

Return the list of all module activations, that is, all the entities in the DB enabling an installed module. These entities contain an optional name overwrite for the module. Deleting one will disable the module.

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"module_activations": [ENTITIES]}`

## POST /module_activations

**Parameters:** `module_identifier`, `version`, `name_overwrite` (optional)

**Responses:**
* 400 Bad Request in case of a validation error 
* 409 Conflict in case of a problem with the module dependencies
* 200 OK with a JSON like this: `{"module_activations": [ENTITIES]}`

Install a module and its dependencies. Because there are potentially a lot of module activations created in the DB, a list of entities is returned.

## PUT /module_activations/:activation_id

**Parameters:** `name_overwrite`

**Responses:**
* 400 Bad Request in case of validation error
* 204 No Content (no JSON) in case of success

## DELETE /module_activations/:activation_id

**Parameters:** None

**Responses:**
* 204 No Content (no JSON) in case of success

## GET /modules/:module_identifier/view/:template_identifier

**Parameters:** None

**Responses:**
* 200 OK with HTML that can be shown in an iframe

**Notes:** 
* Available template identiifers are specified in the module JSON. (see GET /modules for example)
* Some helpers are available to the module's JS. For them to work, some data need to be passed in the URL hash. Here's how to include a module view in a page:

```html
<iframe src="/modules/some_module/view/chart#patient_id=2,token=542b2a71-c6b3-424c-939d-8ab5e57c8193,app_name=Some+app,app_id=com.optinomic.apps.example,api_url=the_api_url,user_id=42,stay_id=9">
</iframe>
```

## POST /patients/:patient_id/generate_pdf

**Parameters:** `part` (list of pairs module identifier/template name)

**Responses:**
* 201 Created with a JSON like this `{"url": PDF_URL}`.

There is no security check on the URL given so the user can simply be redirected or given the link to the document, no need for `X-API-Token`.

See https://github.com/ottigerb/therapy-server/wiki/API#pairs-as-parameters. Example of parameters: `part_count=1&part0_left=org.optinomic.apps.example&part1_right=show_items`

## GET /patients/:patient_id/calculations/:module_identifier/:calculation_identifier

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"calculation_result": OBJECT}`.
* 500 Internal Error if the calculation's code failed with a JSON like this: `{"error": "blah blah blah"}`.

## GET /patients/:patient_id/calculations/:module_identifier

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"calculation_results": [{"name": "NAME", "result": OBJECT}]}`.
* 500 Internal Error if the calculation's code failed with a JSON like this: `{"error": "blah blah blah"}`.

## GET /calculations/:module_identifier/:calculation_identifier

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"calculation_result": OBJECT}`.
* 500 Internal Error if the calculation's code failed with a JSON like this: `{"error": "blah blah blah"}`.

This endpoint is intended to be used on user modules, it runs the calculations with data from all patients.

## GET /extra_config

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"extra_config": OBJECT}`.

## GET /clinic

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"clinic": OBJECT}`.

## GET /version

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"version": "GITHUB_HASH"}`.

## POST /run_component

**Parameters:** `component`, `version` (optional, for the upgrader)

**Responses:**
* 204 No Content

Possible values from `component` are `patient-groups`, `event-generator`, `result-fetcher`, `app-fetcher`, `overdue-reminder`, `cis-importer` and `upgrader`.

## GET /patients/:patient_id/annotations
## GET /patient_groups/:patient_group_id/annotations
## GET /stays/:stay_id/annotations
## GET /users/:user_id/annotations
## GET /modules/:module_identifier/annotations
## GET /patients/:patient_id/modules/:module_identifier/annotations"
## GET /modules/:module_identifier/patient_annotations"
## GET /annotations

**Parameters:** None

**Responses:**
* 200 OK with a JSON body which is the JSON value put there by the corresponding POST endpoints

## PUT /patients/:patient_id/annotations
## PUT /patient_groups/:patient_group_id/annotations
## PUT /stays/:stay_id/annotations
## PUT /users/:user_id/annotations
## PUT /modules/:module_identifier/annotations
## PUT /patients/:patient_id/modules/:module_identifier/annotations
## PUT /annotations

**Parameters:** `value`, `benign_change` (optional, default: `False`)     

**Notes:** benign as in not important. If `benign_change` is set to `True`, the change counter will remain the same.

**Responses:**
* 204 No content

## GET /logs

**Parameters:** (all optional) `user_id`, `target_user_id`, `target_role`, `target_patient_id`, `target_patient_group_id`

**Responses:**
* 200 OK with a JSON like this: `{"logs": [OBJECT]}`

## GET /github_deploy_key

**Parameters:** None

**Responses:**
* 200 OK with the public key as plain text

## GET /patient_uses_modules/:patient_uses_module_id/module_event_overwrites

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"module_event_overwrites": [ENTITIES]}`

## POST /patient_uses_modules/:patient_uses_module_id/module_event_overwrites/:event_name

**Parameters:** (all optional) `type`, `time` (HH:MM:SS), `once_time` (YYYY-MM-DD HH:MM:SS), `day`, `days`, `entries`, `annotations`, `due_after`, `overdue`, `reminder_count` (see the module file specification)

**Responses:**
* 200 OK with a JSON like this: `{"module_event_overwrite_id": 89}`

## GET /user_uses_modules/:user_uses_module_id/module_event_overwrites

**Parameters:** None

**Responses:**
* 200 OK with a JSON like this: `{"module_event_overwrites": [ENTITIES]}`

## POST /user_uses_modules/:user_uses_module_id/module_event_overwrites/:event_name

**Parameters:** `type`, `time` (HH:MM:SS), `once_time` (YYYY-MM-DD HH:MM:SS), `day`, `days`, `entries`, `annotations` (see the module file specification)

**Responses:**
* 200 OK with a JSON like this: `{"module_event_overwrite_id": 89}`

## DELETE /module_event_overwrites/:module_event_overwrite_id

**Parameters:** None

**Responses:** 
* 204 No content

## GET /access_forms

**Parameters:** None

**Responses:**
* 200 OK with JSON body like `{"access_forms": [OBJECTS]}`

## POST /access_forms/:form_identifier

**Parameters:** `type`, `patient_id`, `value` (JSON object containing the form response)

**Responses:**
* 201 Created with a JSON body like `{"access_form_response_id": ID}`

## GET /patients/:patient_id/access_form_responses

**Parameters:** None

**Responses:**
* 200 OK with a JSON body like `{"access_form_responses": [ENTITIES]`

## GET /users/:user_id/access_form_responses

**Parameters:** None

**Responses:**
* 200 OK with a JSON body like `{"access_form_responses": [ENTITIES]`

# Examples

## Patient groups

Let's create a patient group that filters only men from Switzerland and activate the module with ID "com.example.my_app".

```
$ curl -v -H 'X-API-Token: 79dca73c-68c4-4ace-b9a3-badf384b6e25' localhost:3001/patient_groups -X POST -d 'sql_filter=WHERE%20gender%20%3D%20%27Male%27%20AND%20country%20%3D%20%27CH%27&name=my_patient_group&modules_to_activate_count=1&modules_to_activate0=com.example.my_app&modules_to_deactivate_count=0'
* Hostname was NOT found in DNS cache
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 3001 (#0)
> POST /patient_groups HTTP/1.1
> User-Agent: curl/7.37.0
> Host: localhost:3001
> Accept: */*
> X-API-Token: 79dca73c-68c4-4ace-b9a3-badf384b6e25
> Content-Length: 118
> Content-Type: application/x-www-form-urlencoded
>
* upload completely sent off: 118 out of 118 bytes
< HTTP/1.1 201 Created
< Transfer-Encoding: chunked
< Date: Thu, 26 Mar 2015 10:18:56 GMT
* Server Warp/3.0.5.2 is not blacklisted
< Server: Warp/3.0.5.2
< Set-Cookie: session=1w; path=/; expires=Sat, 26-May-2018 20:05:35 UTC;
< Content-Type: application/json; charset=utf-8
<
* Connection #0 to host localhost left intact
{"patient_group":{"id":1,"data":...}}
```

The patient group has been created:

```
$ curl -v -H 'X-API-Token: 79dca73c-68c4-4ace-b9a3-badf384b6e25' localhost:3001/patient_groups | jq .
* Hostname was NOT found in DNS cache
*   Trying 127.0.0.1...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0* Connected to localhost (127.0.0.1) port 3001 (#0)
> GET /patient_groups HTTP/1.1
> User-Agent: curl/7.37.0
> Host: localhost:3001
> Accept: */*
> X-API-Token: 79dca73c-68c4-4ace-b9a3-badf384b6e25
>
< HTTP/1.1 200 OK
< Transfer-Encoding: chunked
< Date: Thu, 26 Mar 2015 10:20:01 GMT
* Server Warp/3.0.5.2 is not blacklisted
< Server: Warp/3.0.5.2
< Set-Cookie: session=ZA; path=/; expires=Sat, 26-May-2018 20:06:40 UTC;
< Content-Type: application/json; charset=utf-8
<
{ [data not shown]
100   130    0   130    0     0  23465      0 --:--:-- --:--:-- --:--:-- 43333
* Connection #0 to host localhost left intact
{
  "patient_groups": [
    {
      "id": 1,
      "data": {
        "name": "my_patient_group",
        "sql_filter": "WHERE gender = 'Male' AND country = 'CH'",
        "modules_to_activate": [
          "com.example.my_app"
        ],
        "modules_to_deactivate": []
      }
    }
  ]
}
```

Note that you need to put the keyword `WHERE` yourself but it also means you can make more complex requests, e.g. a `OUTER JOIN`.

In the background, a CRON task (the executable is `therapy-server-patient-groups`) will detect patients belonging to a group and activate the specified modules for them.

When modifying a patient group, adding a module will activate for all already-detected patients in a group.

# JSON formats

## Overdue action

Example:

```
{
  // some event
  // ...
  "overdue": {
    "type": "send_reminder",
    "hours_in_between": 2
  }
  // ...
}
```

* `type` specifies which is the action to perform when the event is overdue. Possible values are:
 * `ignore`: The event is simply aborted.
 * `ignore_as_of`: The event is aborted after the specified time.
 * `send_reminder`: Reminder emails are sent every X hours.
 * `send_reminder_once`: A reminder email is sent and the overdue action changes to `ignore_as_of`.
* `time` (for `ignore_as_of`) is the date and time after which to abort the event.
* `hours_in_between` (for `send_reminder`) is the interval in hours between reminder emails.
* `next` (for `send_reminder`) is the date and time of the next reminder email. It is absent if no reminder emails have been sent yet.

## Event status

Example:

```
{
  // some event
  // ...
  "status": "done"
  // ...
}
```

Possible values are:
* `done`: The event has been done. Everything is in order.
* `to_be_done`: The event has yet to be done and can still be.
* `aborted`: The event has been aborted either manually or automatically because it was overdue. See overdue action.
* `irrelevant`: For some events, this field does not make sense. For example, an event can be a simple notification, there is nothing to do about it.
