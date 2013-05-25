/* SERVER UTILITIES */
var CONF = require('./config/config.js'),
    express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server, { log: CONF.IO_LOG, origins: CONF.IO_ORIGINS }),
/* APPLICATION VARIABLES */
    player1 = null,
    player2 = null;

console.log("Configure Express framework");

/* Server */
app.configure(function ()
{
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set("view options", {layout : true});
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
});

/* Listen to specific port */
server.listen(CONF.PORT);

/* Define default index router */
app.get('/', function (req, res)
{
    res.render('index', { title: 'Welcome to pong' });
});

console.log("Configure sockets.io");

/* a user connect to our I/O server */
io.sockets.on('connection', function (client)
{
    client.on('wanttoplay', function (data) // data must contain
    {
    	console.log('fuuuuuuuuuuuuuuu');
		if(player1 == null) player1 = client;
		else if(player2 == null) player2 = client;
		else{
			client.emit('roomfull');
		}
		
    });
    
	console.log("nouvelle utilisateur connecté a un pong!\n"); // sortie console sur serveur
    client.on('move', function (data) // data must contain
    {
		if(player1 == client) data.player = 1;
		if(player2 == client) data.player = 2;
        client.broadcast.emit('move', data);
    });
	// Listen for connection close to remove the user from the room he was
	client.on('disconnect', function ()
	{
		if(player1 == client){
			player1 = null;
		}
		if(player2 == client){
			player2 = null;
		}
    });
    
});

console.log("server started on port :" + CONF.PORT + "\n");
