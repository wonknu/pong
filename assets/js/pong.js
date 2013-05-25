/**
 * Pong module
 * 
 * dependencies :
 *  - createjs
 * 
 * How to use :
 * PongInstance.initialize();
 * 
 */

define(
    ['VAR', 'introView', 'paddle', 'ball', 'createjs'],
    function (VAR, introView, Paddle, Ball)
    {
        var canvas,
            stage,
            Ticker = createjs.Ticker,
            containerGame = null,
            ball = null,
            tkr = new Object(),
            xSpeed = 5,
            ySpeed = 5,
            positionToGo = null,
            STAGE_WIDTH = window.innerWidth,
            STAGE_HEIGHT = window.innerHeight,
            p = {
                canvas : canvas,
                stage : stage,
                Ticker : Ticker
            },
            defaults = {
                fps : 30
            };
        /**
         * @param canvasName, to set the stage (canvas in createjs) from getElementById
         */
        p.initialize = function (canvasName)
        {
            canvas = document.getElementById(canvasName); /* Link Canvas */
            stage = new createjs.Stage(canvas);
            //stage.mouseEventsEnabled = true;
            
            window.stage = stage;
            
            Ticker.setFPS(defaults.fps); /* Ticker */
            Ticker.addListener(stage);
            
            introView.render(stage);
            
            stage.addEventListener(VAR.EVENTS.START_GAME, function () { p.launchGame(); });
        };
        
        /**
         * Launch pong game 
         */
        p.launchGame = function ()
        {
            stage.removeEventListener(VAR.EVENTS.START_GAME);
            
            // GAME CONTAINER
            containerGame = new createjs.Container();
            stage.addChild(containerGame);
            
            // PLAYER
            paddle_left = new Paddle(containerGame, "LEFT");
            paddle_right = new Paddle(containerGame, "RIGHT");
            
            // BALL
            ball = new Ball(containerGame);
            
            // GAME LOOP
            Ticker.addListener(tkr, false);
            tkr.tick = p.update;
            
            $.getScript(VAR.URL + "socket.io/socket.io.js")
                .done(function(script, textStatus) {
                    p.connect();
                })
                .fail(function(jqxhr, settings, exception) { console.log('something wrong happened'); });
        };
        
        p.connect = function ()
        {
            var socket = io.connect(VAR.URL),
                users = null;
            
            /**
             * Wait for node.js to say it's alright we're connected 
             */
            socket.on('connect', function ()
            {
                console.log('connect');
            });
            
            /**
             * tell node.js to connect and wait -> scroll up : socket.on('connect'....
             */
            socket.on('move', function (data)
            {
                positionToGo = (data.y * window.innerHeight) / 100;
            });
        };
        
        /**
         * GAME LOOP 
         */
        p.update = function ()
        {
            var pos = ball.position(), posX = pos.x, posY = pos.y,
                pl = paddle_left.position(),
                pr = paddle_right.position();
            //paddle_left.position(null, positionToGo);
            
			if ( positionToGo != null && (pl.y > positionToGo + 1) && (pl.y < positionToGo + 1) ){
				var goTo = positionToGo - ((positionToGo - pl.y) * 0.01);
				//pl.y + ((positionToGo - pl.y)/5)
				console.log(positionToGo);
				console.log(goTo);
				console.log("-------------");
				paddle_left.position( null, goTo );
			}
			
            pos = ball.position(posX + xSpeed, posY + ySpeed);
            posX = pos.x;
            posY = pos.y;
            /*
            // Cpu Movement
            if(cpu.y < ball.y) cpu.y = cpu.y + 4;
            else if(cpu.y > ball.y) cpu.y = cpu.y - 4;
            */
            // Wall Collision 
            if(posY < 0) ySpeed = -ySpeed; //Up
            if(posY > STAGE_HEIGHT) ySpeed = -ySpeed; //down
            
            /* CPU Score */
            if(posX < 0) {
                xSpeed = -xSpeed;
                //cpuScore.text = parseInt(cpuScore.text + 1);
                //reset();
            }
            
            /* Player Score */
            if(posX > STAGE_WIDTH) {
                xSpeed = -xSpeed;
                //playerScore.text = parseInt(playerScore.text + 1);
                //reset();
            }
            if(posX <= (pl.x + pl.w) && posX > pl.x && posY >= pl.y && posY < (pl.y + pl.h)) {
                console.log('HIT PLAYER LEFT');
                xSpeed *= -1; // Player collision
            }
            if(posX > pr.x && posX < (pr.x + pr.w) && posY >= pr.y && posY < (pr.y + pr.h) ) {
                console.log('HIT PLAYER RIGHT');
                xSpeed *= -1; // Cpu collision
            }
            //if(player.y >= 249) player.y = 249; // Stop Paddle from going out of canvas
            
            //if(playerScore.text == '10') alert('win'); // Check for Win
            //if(cpuScore.text == '10') alert('lose'); // Check for Game Over
        };
        
        return p;
    }
);
