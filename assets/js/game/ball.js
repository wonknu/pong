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
    ['VAR', 'createjs'],
    function (VAR)
    {
        /**
         * Create a button
         */
        var create = function ()
        {
            this.ball = new createjs.Shape();
            this.ball.graphics.beginFill(this.color).drawCircle(0, 0, this.radius);
            this.ball.x = this.x;
            this.ball.y = this.y;
            this.container.addChild(this.ball);
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
            if(x !== null && x !== undefined && x !== "NaN") this.ball.x = x;
            if(y !== null && y !== undefined && y !== "NaN") this.ball.y = y;
            
            _x = this.ball.x;
            _y = this.ball.y;
            return {
                x : _x,
                y : _y
            };
        };
        
        var reset = function (x, y)
        {
            this.ball.x = window.innerWidth * .5;
            this.ball.y = window.innerHeight * .5;
        };
        
        /**
         * Constructor create a button
         * @param {Object} container, new createjs.Container()
         */
        return function (container)
        {
            this.x = window.innerWidth * .5;
            this.y = window.innerHeight * .5;
            this.radius = VAR.BALL.WIDTH;
            this.color = "#FFF";
            
            this.container = container;
            this.create = create;
            this.position = position;
            this.reset = reset;
            
            this.create(); // Call constructor
            return this;
        };
    }
);
