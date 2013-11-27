# connect-favicon-canvas
[connect](http://github.com/senchalabs/connect) middleware for generating server-side images and icons with [node-canvas](https://github.com/learnboost/node-canvas).

## Install:

	npm install connect-favicon-canvas

## Example:

```js
    var connect = require('connect'),
        faviconCanvas = require('connect-favicon-canvas'),
        generator,
        rand,
        app;

    rand = function( arr ){
        return arr[ ~~(Math.random()*arr.length) ];
    };
    //draw an image using the canvas2d API    
    generator = function( canvas, next ){
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = rand(['aquamarine','teal','red','yellow','lime']);
        var border = 8,
            sqSize = canvas.width - (border*2);
        ctx.fillRect( border, border, sqSize, sqSize );
        next();
    };
	//start a connect server that servers the generative /favicon.ico
    app = connect()
        .use(faviconCanvas( generator ))
        .use(faviconCanvas( generator, {
            route: '/apple-touch-icon-precomposed.png',
            size: 152
        }))
        .use(function( req, res ){
            res.end('Look at the tab! generative favicon!\n');
        })
        .listen(5000);
```


Released under MIT License, created by [Kyle Phillips](http://haptic-data.com)
