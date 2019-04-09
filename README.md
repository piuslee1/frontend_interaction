## 


## To control
* arm
* drivetrain
* science modules and crap

## input from user
* actual controller 
* in browser joystick/keybinds

## communcation
* rest api, just push the input on an interval
    * potentially use sockets

To access the REST API while developing, the dev server must have a [proxy](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development)
set up. Requests that the dev server cannot handle are forwarded to the proxy,
which allows us to avoid dealing with CORS and other issues which arise when
working with separate servers.

The server backend uses __swagger__ for API specification.