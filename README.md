i little-url-api
written in responce to <https://www.freecodecamp.com/challenges/url-shortener-microservice>
##Usage
###creation example 
run server.js in one terminal window, open another and
```bash 
  curl api-projects-marc-mcintosh.c9users.io/new/http://www.google.com
```
  The responce should be somthing like
```JSON
{"original_url":"http://www.google.com","short_url":"api-projects-marc-mcintosh.c9users.io/1"}
```
###Redirect Expample
Opening the short\_url in a browser to be redirected
ie <https://api-projects-marc-mcintosh.c9users.io/1>
should redirect to <http://www.google.com>
