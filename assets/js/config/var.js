define(
    [],
    function ()
    {
        var PATH_TO_ASSETS = "assets/";
        return {
            manifest : [ /* To load */
                { src : PATH_TO_ASSETS + "img/ball.png", id : "ball" }
            ],
            EVENTS : {
                START_GAME : "startGame"
            },
            BALL : {
            	WIDTH : 12,
            	SPEED : 5
            },
            PADDLE : {
            	PERCENT_WIDTH : .02,
            	PERCENT_HEIGHT : .4,
            	PERCENT_PADDING : .01
            },
            //URL : "http://192.168.1.34:1337/"
            URL : "http://192.168.1.108:1337/"
        };
    }
); 