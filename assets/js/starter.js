require.config({
    baseUrl: '',
    paths: {
        VAR: 'assets/js/config/var',
        preloader: 'assets/js/utils/preloader',
        button: 'assets/js/components/button',
        ball: 'assets/js/game/ball',
        paddle: 'assets/js/game/paddle',
        introView: 'assets/js/views/intro',
        pong: 'assets/js/pong',
        createjs: 'vendors/createjs.min'
    },
    shim: { // Sets the configuration for your third party scripts that are not AMD compatible
        "createjs": {
            //deps: ["underscore", "jquery"],
            exports: "createjs"  //attaches "createjs" to the window object
        },
        "pong": {
            //deps: ['createjs'],
            exports: "pong"  //attaches "createjs" to the window object
        }
    }
});

require(
    ['preloader', 'pong'],
    function (preload, Pong)
    {
        // Add canvas to fit full window
        var canv = document.createElement("canvas");
        canv.setAttribute('width', window.innerWidth);
        canv.setAttribute('height', window.innerHeight);
        canv.setAttribute("id", "PongStage");
        document.getElementById('wrapper').appendChild(canv);
        
        preload.load(
            function (e)
            { // Progress event
                //console.log(e);
            },
            function (e)
            { // complete event
                Pong.initialize('PongStage');
            }
        );
    }
);