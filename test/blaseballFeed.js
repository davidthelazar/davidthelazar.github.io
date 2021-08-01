eventSource = new EventSource(`https://api.sibr.dev/replay/v1/replay?from=2020-08-27T01:00:08.17Z`);
const gameIdx = 0;
let gameId = undefined;
eventSource.onmessage = function(event)
{
    try
    {
        update = JSON.parse(event.data);
        games = update.value.games.schedule;
		
        // if(gameId === undefined)
//         {
//
//         }
	    $("#updates").html("<ul></ul>");
		for (let idx = 0; idx < games.length; idx++) 
		{
            gameId = games[idx].id;
			thisGame = games.filter(function(x) { return x.id === gameId; })[0];

	        console.log(thisGame);
		    // $("#updates").text(thisGame.lastUpdate);
			$("#updates").append("<li>"+thisGame.lastUpdate+"</li>");
			
		}
		
    }
    catch(err)
    {
        console.log(err.message);
    }
}
    
    
    