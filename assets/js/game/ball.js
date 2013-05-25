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
            this.ball = new createjs.Shape();
            this.ball.graphics.beginFill(this.color).drawCircle(this.x, this.y, this.radius);
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
        
        /**
         * Constructor create a button
         * @param {Object} container, new createjs.Container()
         */
        return function (container)
        {
            this.x = 0;
            this.y = 0;
            this.radius = 15;
            this.color = "#FFF";
            
            this.container = container;
            this.create = create;
            this.position = position;
            
            this.create(); // Call constructor
            return this;
        };
    }
);
