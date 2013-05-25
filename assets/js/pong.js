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
    ['VAR', 'introView', "text", 'paddle', 'ball', 'createjs'],
    function (VAR, introView, _Text, Paddle, Ball)
    {
        var canvas,
            stage,
            Ticker = createjs.Ticker,
            containerGame = null,
            ball = null,
            tkr = new Object(),
            xSpeed = 0,
            ySpeed = 0,
            positionToGo1 = null,
            positionToGo2 = null,
            STAGE_WIDTH = window.innerWidth,
            STAGE_HEIGHT = window.innerHeight,
            text_left = null,
            text_right = null;
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
            xSpeed = VAR.BALL.SPEED;
            ySpeed = VAR.BALL.SPEED;
            stage.removeEventListener(VAR.EVENTS.START_GAME);
            
            // GAME CONTAINER
            containerGame = new createjs.Container();
            stage.addChild(containerGame);
            
            text_left = new _Text(0, 10, 0, 100, 100, "700 small-caps 20px/2 Arial, sans-serif", "#FFF", "left");
            text_right = new _Text(window.innerWidth - 50, 10, 0, 100, 100, "700 small-caps 20px/2 Arial, sans-serif", "#FFF", "left");
            
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
	            /**
	             * tell node.js to connect and wait -> scroll up : socket.on('connect'....
	             */
	            socket.on('move', function (data)
	            {
	            	if(data.player == 1) positionToGo1 = (data.y * window.innerHeight) / 100;
	            	if(data.player == 2) positionToGo2 = (data.y * window.innerHeight) / 100;
	            });
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
            
			if ( positionToGo1 != null && (pl.y > positionToGo1 + 1) || (pl.y < positionToGo1 + 1) ){
				//var goTo = positionToGo - ((positionToGo - pl.y) * 0.01);
				//_movie.y -= ( _movie.y - _startY ) /  VITESSE;
				var goTo1 = pl.y - ((pl.y - positionToGo1) / 2);
				//pl.y + ((positionToGo - pl.y)/5)
				/*
				console.log(pl.y);
				console.log(positionToGo);
				console.log(goTo);
				console.log("-------------");
				*/
				paddle_left.position( null, goTo1 );
			}
			
			if ( positionToGo2 != null && (pr.y > positionToGo2 + 1) || (pr.y < positionToGo2 + 1) ){
				var goTo2 = pr.y - ((pr.y - positionToGo2) / 2);
				paddle_right.position( null, goTo2 );
			}
			
            pos = ball.position(posX + xSpeed, posY + ySpeed);
            posX = pos.x;
            posY = pos.y;
			
            // Wall Collision 
            if(posY < 0) ySpeed = -ySpeed; //Up
            if(posY > STAGE_HEIGHT) ySpeed = -ySpeed; //down
            
            /* CPU Score */
            if(posX < 0) {
                xSpeed = -xSpeed;
                text_right.setText(parseInt(text_right.setText() + 1));
                ball.reset();
                xSpeed = Math.abs(xSpeed);
            }
            
            /* Player Score */
            if(posX > STAGE_WIDTH) {
                xSpeed = -xSpeed;
                text_left.setText(parseInt(text_left.setText() + 1));
                ball.reset();
                xSpeed = -Math.abs(xSpeed);
            }
            if(posX <= (pl.x + pl.w) && posX > pl.x && posY >= pl.y && posY < (pl.y + pl.h)) {
                xSpeed *= -1; // Player collision
            }
            if(posX > pr.x && posX < (pr.x + pr.w) && posY >= pr.y && posY < (pr.y + pr.h) ) {
                xSpeed *= -1; // Cpu collision
            }
            //if(playerScore.text == '10') alert('win'); // Check for Win
            //if(cpuScore.text == '10') alert('lose'); // Check for Game Over
        };
        
        return p;
    }
);
