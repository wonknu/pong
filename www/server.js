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
	console.log("nouvelle utilisateur conncecté a un pong!\n"); // sortie console sur serveur
    /*
	client.on('logged', function (data) // data must contain
	{
	    
	    return;
        if(!util.NotNull(data.room, "") || !util.NotNull(data.user, "")) return;
        // push user to the room Array ( and create hes room in the Array if it doesn't exist )
        if(!util.NotNull(allClients[data.room])) allClients[data.room] = [];
        allClients[data.room].push(client);
        
	    client.join(data.room); // Make the client user join the requested room
	    client.currentRoom = data.room; // Save hes room name so he know it
        client.userId = data.user;
	    //client.emit('notification', {test : 'test'});
	});
	*/
    client.on('move', function (data) // data must contain
    {
        client.broadcast.emit('move', data);
    });
	// Listen for connection close to remove the user from the room he was
	client.on('disconnect', function ()
	{
	    //player disconneted
    });
    
});

console.log("server started on port :" + CONF.PORT + "\n");
