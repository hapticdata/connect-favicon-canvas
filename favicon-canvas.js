var fs = require('fs'),
    utils = require('connect').utils,
    Canvas = require('canvas');

/**
 * Favicon Canvas:
 *
 * By default serves the connect favicon, or the favicon
 * located by the given `path`.
 * de
 *
 * Options:
 *
 *   - `maxAge`  cache-control max-age directive, defaulting to 1 day
 *   - `size`    the size of the icon to generate, default to 32px
 *   - `route`   the url route for serving the icon, default to `/favicon.ico`
 *   - `width`   if you wish to specify a unique width, default to 32px
 *   - `height`  if you wish to specify a unique height, default to 32px
 *
 * Examples:
 *
 *   Serve generative favicon:
 *
 *     connect()
 *       .use(connect.faviconCanvas(generator)))
 *
 *   Serve generative apple-touch-icon:
 *
 *      connect()
 *          .use(faviconCanvas(generator, {
 *              path: '/apple-touch-icon-precomposed.png',
 *              size: 152
 *          }))
 *
 * @param {Function} generator function to generate image, generator( canvas, callback(error) )
 * @param {Object} options
 * @return {Function}
 * @api public
 */

module.exports = function(generator, options){
    options = options || {};
    options.maxAge = options.maxAge || 86400000;
    options.width = options.width || options.size || 32;
    options.height = options.height || options.size || 32;
    options.route = options.route || '/favicon.ico';
    options.contentType = options.contentType || options.route.match(/\.ico$/) ?
        'image/x-icon' : 'image/png';

    return function(req, res, next){
        if (options.route === req.url) {
            var canvas = new Canvas(options.width, options.height);
            generator( canvas, function(err){
                var buf = canvas.toBuffer();
                if (err) return next(err);
                var headers = {
                    'Content-Type': options.contentType,
                    'Content-Length': buf.length,
                    'ETag': '"' + utils.md5(buf) + '"',
                    'Cache-Control': 'public, max-age=' + (options.maxAge / 1000)
                };
                res.writeHead(200, headers);
                res.end(buf);
            });
        } else {
            next();
        }
    };
};
