# E-Mail Templates


There are two types of email: `new_event` and `overdue`, the former for emails sent when an event is created and the latter for emails sent when an event hits its deadline. Similarly, there are three parts: `subject`, `plain` and `html` for the email subject, the body as plain text and the enriched HTML body. Check the [Optinomic App-Specification | Email](http://doc.optinomic.org/V2/Developers/app_spezifikation.html#email-optional) for more details.



## Clinic - Configuration

To make sure that the given E-Mail Templates are working we have to configure the [Clinic - Configuration](http://doc.optinomic.org/V2/Developers/config.html#clinic). At least you have to provide the following JSON.


```JSON
 "clinic": {
     "clinic_name": "Klinik Localhost",
     "clinic_slogan": "Kompetenzzentrum für Menschen",
     "clinic_address": "Irgendwo 1, 8942 Oberrieden",
     "clinic_phone": "+41 (0)44 XX XX XX",
     "clinic_email": "info@optinomic.com",
     "clinic_logo": "http://www.optinomic.com/_download/logo/optinomic_logo_trademark_indigo.png",
     "clinic_www": "http://www.optinomic.com/"
 }
```




## App - E-Mail Template

Inside your Optinomic-App you are able to have the following sections. Based on the [Optinomic App-Specification | Email](http://doc.optinomic.org/V2/Developers/app_spezifikation.html#email-optional).


```
[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)
```




### Templates 

Based on the above App-Configuration `emails/new_event.html` and `emails/overdue.html` is to be filled with the following `E-Mail Templates | Starter Kit`.  



```HTML
include(../lib/html/optinomic/email/email_template_start.m4)
<table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tbody>
        <tr>
            <td>
                <!-- CONTENT | Beschreibung der Applikation -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td align="center" class="padding-copy" style="font-size: 25px; font-family: Helvetica, Arial, sans-serif; color: #3F3D33; padding-top: 0px; margin-top: 48px;">
                                <br>$recipient_name$
                            </td>
                        </tr>
                        <tr>
                            <td align="center" class="padding-copy textlightStyle" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #3F3D33;">
                                <p style="margin:0px;" data-mce-style="margin: 0px;">
                                    <strong>App-Name (DASS):</strong>  Beschreibung.
                                </p>
                                <p style="margin:0px;" data-mce-style="margin: 0px;">
                                    <br data-mce-bogus="1">
                                </p>
                                <p style="margin:0px; font-size: 12px; color: rgb(40, 53, 147);" data-mce-style="margin: 0px;">
                                    Herzlichen Dank für Ihre Teilnahme!
                                    <br><span style="color: rgb(197,202,233);" data-mce-style="color: #C5CAE9;">
                                    Geschätzter Zeitaufwand: 1-2 Minuten.</span>
                                    <br>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <!-- Survey - Link | BUTTON -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mobile-button-container">
                    <tbody>
                        <tr>
                            <td align="center" style="padding: 25px 0 0 0;" class="padding-copy">
                                <table border="0" cellspacing="0" cellpadding="0" class="responsive-table">
                                    <tbody>
                                        <tr>
                                            <td align="center">
                                                <a href="$survey_link$" class="mobile-button" style="display: inline-block; font-size: 18px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #ffffff; text-decoration: none; background-color: #283593; padding-top: 15px; padding-bottom: 15px; padding-left: 25px; padding-right: 25px; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-bottom: 3px solid #1b2463;">
                                                    Name der Befragung | Jetzt ausfüllen
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
include(../lib/html/optinomic/email/email_template_end.m4)

```
Please make sure that you change ```<strong>App-Name (DASS):</strong>``` into ```<strong>Reminder | App-Name (DASS):</strong>``` for `emails/overdue.html`. 


### Result 

The sent emails are responsive and should look great on any devices:

____

![image](http://doc.optinomic.org/images/email_template_example.png)
____

