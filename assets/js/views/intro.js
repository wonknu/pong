/**
 * Intro module
 * 
 * dependencies :
 *  - createjs
 * 
 * How to use :
 * introView.render(stage);
 * 
 */

define(
    ['VAR', 'button', 'ball', 'createjs'],
    function (VAR, button, Ball, Pong)
    {
        var buttonPlay_easy = null,
        	buttonPlay_medium = null,
        	buttonPlay_hard = null;
        
        /**
         * Render something on the screen
         */
        var render = function ()
        {
            buttonPlay_easy = new button( (window.innerWidth * .5) - 50, ((window.innerHeight * .5) - 12.5) - 50, 100, 25, "#999" );
            buttonPlay_easy.addText("Easy", "700 small-caps 20px/2 Arial, sans-serif", "#000", "center").display();
            
            buttonPlay_medium = new button( (window.innerWidth * .5) - 50, (window.innerHeight * .5) - 12.5, 100, 25, "#999" );
            buttonPlay_medium.addText("Medium", "700 small-caps 20px/2 Arial, sans-serif", "#000", "center").display();
            
            buttonPlay_hard = new button( (window.innerWidth * .5) - 50, ((window.innerHeight * .5) - 12.5) + 50, 100, 25, "#999" );
            buttonPlay_hard.addText("Hard", "700 small-caps 20px/2 Arial, sans-serif", "#000", "center").display();
            
            buttonPlay_easy.container.onPress = function (evt)
            {
            	remove();
            };
            
            buttonPlay_medium.container.onPress = function (evt)
            {
	            VAR.BALL.WIDTH = 8;
	            VAR.BALL.SPEED = 8;
	            VAR.PADDLE.PERCENT_WIDTH = .015;
            	VAR.PERCENT_HEIGHT = .3;
            	remove();
            };
            
            buttonPlay_hard.container.onPress = function (evt)
            {
	            VAR.BALL.WIDTH = 5;
	            VAR.BALL.SPEED = 15;
	            VAR.PADDLE.PERCENT_WIDTH = .015;
            	VAR.PADDLE.PERCENT_HEIGHT = .2;
            	remove();
            };
        };
        
        /**
         * Remove intro UI and send starting game event
         */
        var remove = function ()
        {
            buttonPlay_easy.remove();
            buttonPlay_medium.remove();
            buttonPlay_hard.remove();
            stage.dispatchEvent(VAR.EVENTS.START_GAME);
        };
        
        return { 
            render: render
        };
    }
);
