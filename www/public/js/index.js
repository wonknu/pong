var PONG = PONG || {
	//URL : "http://192.168.1.34:1337/"
	URL : "http://192.168.1.108:1337/"
};

$(document).ready(function ()
{
    $.getScript(PONG.URL + "socket.io/socket.io.js")
        .done(function(script, textStatus) { PONG.start(); })
        .fail(function(jqxhr, settings, exception) { console.log('something wrong happened'); });
        
    PONG.start = function ()
    {
        var socket = io.connect(),
            users = null;
        
        /**
         * Wait for node.js to say it's alright we're connected 
         */
        socket.on('connect', function ()
        {
            console.log('connect');
            socket.emit('wanttoplay');
	        /**
	         * tell node.js to connect and wait -> scroll up : socket.on('connect'....
	         */
	        $('body').on('mousemove touchmove', function(e)
	        {
	        	var y;
	            e.preventDefault();
	            if(e.originalEvent.touches !== null && e.originalEvent.touches !== undefined)
	            	y = (e.originalEvent.touches[0].pageY * 100) / window.innerHeight;
	            else 
	            	y = (e.originalEvent.pageY * 100) / window.innerHeight;
	            
	            socket.emit('move', { y : y });
	        });
	        
        	socket.on('roomfull', function ()
        	{
        		alert('There are already two players using Pong');
        	});
        });
        
    }
});
