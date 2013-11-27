var assert = require('assert'),
    Buffer = require('buffer').Buffer,
    faviconCanvas = require('../favicon-canvas'),
    sketch,
    rand;

//get a random element out of an Array
rand = function( arr ){
    return arr[ ~~(Math.random()*arr.length) ];
};
//draw a basic design with the canvas2d api
sketch = function( canvas, next ){
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = rand(['aquamarine','teal','red','yellow','lime']);
    var border = 8,
        sqSize = canvas.width - (border*2);
    ctx.fillRect( border, border, sqSize, sqSize );
    next();
};

describe('faviconCanvas(sketch)', function(){
    it('should respond with the generated image with default settings', function(done){
        var req = {
            url: '/favicon.ico'
        };

        var res = {
            writeHead: function( status, headers ){
                assert.equal( status, 200 );
                assert.equal( headers['Content-Type'], 'image/x-icon' );
                assert.ok( headers['Content-Length'] > 0 );
            },
            end: function( body ){
                assert.ok( Buffer.isBuffer(body) );
                done();
            }
        };

        var next = function(err){
            done('next should not have been called');
        };
        faviconCanvas( sketch )( req, res, next );
    });

    it('should let the request pass through to next without error', function(done){
        var req = { url: '/about' },
            res = {
                writeHead: function( status, headers ){
                    done( Error('res.writeHead called when not the correct path') );
                },
                end: function(){
                    done( Error('res.end called when not correct path') );
                }
            },
            next = function(err){
                assert.equal( err, null );
                done();
            };
        faviconCanvas( sketch )( req, res, next );
    });

    it('should create a custom png at the given route', function( done ){
        var req = { url: '/apple-touch-icon-precomposed.png' },
            res = {
                writeHead: function( status, headers ){
                    assert.equal( status, 200 );
                    assert.equal( headers['Content-Type'], 'image/png' );
                    assert.ok( headers['Content-Length'] > 0 );
                },
                end: function( body ){
                    assert.ok( Buffer.isBuffer( body ) );
                    done();
                }
            },
            next = function( err ){
                done( Error('Next should not have been called') );
            };

        faviconCanvas( sketch, {
            route: '/apple-touch-icon-precomposed.png',
            size: 152
        })( req, res, next );
    });
});
