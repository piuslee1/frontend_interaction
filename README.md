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

## To build and host on rpi

0. connect to the yonder_rover wifi
1. npm build on your local computer
    * this will build a static /build
2. scp the build folder to the raspberry pi (scp -r build yonder@yonder_rover.com:~)
3. move the contents of build to /var/www/html (sudo mv build/* /var/www/html/)
4. go to any non cached website in your browser while connected to the yonder_rover wifi and the updated page will load