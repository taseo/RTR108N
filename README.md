# Web page for RTR108N course

Rather small Single Page Application, built with vanilla Javascript

Currently it resides [here](http://artursipatenko.com/RTR108N/)

## Running it locally

As it uses [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) for routing, you are going to need to serve its static files using a server

The simplest would be just to use Python simple HTTP server and serve `docs` folder, like:

```
python -m SimpleHTTPServer 8000
```
