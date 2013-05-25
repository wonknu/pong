/**
 * Ball module
 * 
 * dependencies :
 *  - createjs
 * 
 * How to use :
 * new button(options)
 * 
 */

define(
    ['createjs'],
    function ()
    {
        /**
         * Create a button
         */
        var create = function ()
        {
            this.paddle = new createjs.Shape();
            this.paddle = new createjs.Shape();
            this.paddle.graphics.beginFill(this.color).drawRect(0, 0, this.width, this.height);
            
            this.paddle.x = this.x;
            this.paddle.y = this.y;
            this.container.addChild(this.paddle);
            stage.update();
            
            return this;
        };
        
        /**
         * @param {Int} x, optional use "null" to set only y
         * @param {Int} y, optional 
         * @return {Object} Object that contain x and y values
         */
        var position = function (x, y)
        {
            var _x, _y;
            if(x !== null && x !== undefined && x !== "NaN")
            	this.paddle.x = x;
            if(y !== null && y !== undefined && y !== "NaN" && (y > (this.height * .5) && (y + (this.height * .5)) < window.innerHeight))
            	this.paddle.y = y - (this.height * 0.5);
            
            _x = (this.side == 'LEFT') ? 0 : this.paddle.x;
            _y = this.paddle.y;
            _h = this.height;
            _w = (this.width + (window.innerWidth * .01));
            return {
                x : _x,
                y : _y,
                h : _h,
                w : _w
            };
        };
        
        /**
         * Constructor create a button
         * @param {Object} container, new createjs.Container()
         */
        return function (container, side)
        {
            this.side = side || 'LEFT';
            this.width = (window.innerWidth * .05);
            this.height = (window.innerHeight * .3);
            this.x = (this.side == 'LEFT') ?
            			(window.innerWidth * .01) :
            			window.innerWidth - ((window.innerWidth * .01) + this.width);
            this.y = (window.innerHeight * 0.5) - (this.height * 0.5);
            this.color = "#FFF";
            
            this.side = side;
            this.container = container;
            this.create = create;
            this.position = position;
            
            this.create(); // Call constructor
            return this;
        };
    }
);
