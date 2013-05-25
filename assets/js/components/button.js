/**
 * Button module
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
            this.container.x = this.x;
            this.container.y = this.y;
            this.container.width = this.width;
            this.container.height = this.height;
            
            this.shape = new createjs.Shape();
            this.shape.graphics.beginFill(this.color).drawRect(0, 0, this.width, this.height);
            stage.addChild(this.container);
            this.container.addChild(this.shape);
            stage.update();
            
            return this;
        };
        
        /**
         * Add text to the button shape
         * @param {String} text, ex : "Hello World"
         * @param {String} style, ex : "italic 400 12px/2 Arial, sans-serif"
         * @param {String} color, ex : "#ff7700"
         * @param {String} textAlign, "start", "end", "left", "right", and "center", default is "left"
         */
        var addText = function (text, style, color, textAlign)
        {
            this.text = new createjs.Text(text, style, color);
            
            this.text.lineWidth = (this.width - (this.padding * 2));
            this.text.x = this.padding;
            if(textAlign !== null && textAlign !== undefined) {
                this.text.textAlign = textAlign;
                if(textAlign == "center") this.text.x = (this.width * .5);
                if(textAlign == "right") this.text.x = (this.width - this.padding);
            }
            this.text.textAlign = textAlign;
            return this;
        };
        
        /**
         * Display Button
         */
        var display = function ()
        {
            stage.addChild(this.container);
            if(this.shape !== null) this.container.addChild(this.shape);
            if(this.text !== null) this.container.addChild(this.text);
            stage.update();
            
            return this;
        };
        
        /**
         * Display Button
         */
        var remove = function ()
        {
            if(this.shape !== null) this.container.removeChild(this.shape);
            if(this.text !== null) this.container.removeChild(this.text);
            if(this.container.parent !== null && this.container.parent !== undefined) this.container.parent.removeChild(this.container);
            return this;
        };
        
        /**
         * Constructor create a button
         * @param {Int} x
         * @param {Int} y
         * @param {Int} width
         * @param {Int} height
         * @param {String} color, ex : "#ff0000"
         * @param {Object} container, new createjs.Container()
         * @param {Int} padding
         */
        return function (x, y, width, height, color, container, padding)
        {
            this.create = create;
            this.display = display;
            this.addText = addText;
            this.remove = remove;
            this.padding = padding || 5;
            this.text = null;
            
            this.x = x || 0;
            this.y = y || 0;
            this.width = width || 100;
            this.height = height || 100;
            this.color = color || "#ff0000";
            this.container = container || new createjs.Container();
            
            this.create(); // Call constructor
            return this;
        };
    }
);
