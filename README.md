# connect-favicon-canvas
connect middleware for generating server-side images and icons with node-canvas.

## Example:

```js
    var connect = require('connect'),
        faviconCanvas = require('connect-favicon-canvas'),
        generator,
        app;

    generator = function( canvas, next ){
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = rand(['aquamarine','teal','red','yellow','lime']);
        var border = 8,
            sqSize = canvas.width - (border*2);
        ctx.fillRect( border, border, sqSize, sqSize );
        next();
    };

    app = connect()
        .use(faviconCanvas( generator ))
        .use(function( req, res ){
            res.end('Hello world!\n');
        })
        .listen(5000);
```
