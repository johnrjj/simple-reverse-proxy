# Simple Reverse Proxy

Super simple reverse proxy. I use it to get around CORS requests for the client without having any extra web server complexity. Can be rate limited easily through AWS.

If you don't what a reverse proxy is: a reverse proxy is a type of proxy server that retrieves resources on behalf of a client from one or more servers. These resources are then returned to the client as if they originated from the proxy server itself [(via wikipedia)](https://en.wikipedia.org/wiki/Reverse_proxy).
A client browser has cross-origin (CORS) problems, and a reverse proxy gets around that by hosting the reverse proxy on the same domain as the web application. 

tl;dr: A browser is limited where it can make requests to, a reverse proxy can make requests wherever it wants.


## Install

### yarn

`yarn install` 

`yarn start`

### npm

If you don't have yarn (I highly advise to switch to yarn though), npm still works.

`npm install` 

`npm start
`


## Usage

### API

**Healthcheck** `localhost:port/healthcheck` returns a 200.

**Reverse Proxy** `localhost:port/fwd/:url` where **:url** is the encoded url to forward to


####Example:

`localhost:port/fwd/google.com` will forward to **google.com**

`localhost:port/fwd/https%3A%2F%2Fgoogle.com` will forward to **https://google.com**


## Deploy

Use [Now](https://zeit.co/now) to deploy your app with one command. Simply install [Now](https://zeit.co/now) and run `now` in the project's root directory.