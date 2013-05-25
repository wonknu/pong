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
        var buttonPlay = null;
        
        /**
         * Render something on the screen
         */
        var render = function ()
        {
            buttonPlay = new button( (window.innerWidth * .5) - 50, (window.innerHeight * .5) - 12.5, 100, 25, "#999" );
            buttonPlay.addText("Play", "700 small-caps 20px/2 Arial, sans-serif", "#000", "center").display();
            
            buttonPlay.container.onPress = function (evt)
            {
                buttonPlay.remove();
                stage.dispatchEvent(VAR.EVENTS.START_GAME);
            };
        };
        
        return { 
            render: render
        };
    }
);
