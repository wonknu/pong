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
            URL : "http://192.168.1.34:1337/"
        };
    }
); 