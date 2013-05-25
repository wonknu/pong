/**
 * Text module
 * 
 * dependencies :
 *  - createjs
 * 
 * How to use :
 * new Text(options)
 * 
 */

define(
    ['createjs'],
    function ()
    {
        /**
         * Add text
         */
        var create = function ()
        {
            this.container.x = this.x;
            this.container.y = this.y;
            this.container.width = this.width;
            this.container.height = this.height;
            
            this.text = new createjs.Text(this.content, this.style, this.color);
            
            this.text.lineWidth = (this.width - (this.padding * 2));
            this.text.x = this.padding;
            if(this.textAlign !== null && this.textAlign !== undefined) {
                this.text.textAlign = this.textAlign;
                if(this.textAlign == "center") this.text.x = (this.width * .5);
                if(this.textAlign == "right") this.text.x = (this.width - this.padding);
            }
            
            stage.addChild(this.container);
            this.container.addChild(this.text);
            stage.update();
            
            return this;
        };
        
        /**
         * Display Button
         */
        var setText = function (text)
        {
			if(text != null && text != undefined) this.text.text = text;
            return this.text.text;
        };
        
        /**
         * Display Button
         */
        var remove = function ()
        {
            if(this.text !== null) this.container.removeChild(this.text);
            if(this.container.parent !== null && this.container.parent !== undefined) this.container.parent.removeChild(this.container);
            return this;
        };
        
        /**
         * Constructor create a text
         * @param {String} text, ex : "Hello World"
         * @param {String} style, ex : "italic 400 12px/2 Arial, sans-serif"
         * @param {String} color, ex : "#ff7700"
         * @param {String} textAlign, "start", "end", "left", "right", and "center", default is "left"
         * @param {Object} container, new createjs.Container()
         * @param {Int} padding
         */
        return function (x, y, content, width, height, style, color, textAlign, container, padding)
        {
        	this.x = x || 0;
        	this.y = y || 0;
        	this.content = content;
            this.width = width || 100;
            this.height = height || 100;
            this.color = color || "#ff0000";
            this.textAlign = textAlign || 'left';
            this.container = container || new createjs.Container();
            
            this.setText = setText;
            this.create = create;
            this.remove = remove;
            this.padding = padding || 5;
            this.text = null;
            
            this.create(); // Call constructor
            return this;
        };
    }
);
