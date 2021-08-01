eventSource = new EventSource(`https://api.sibr.dev/replay/v1/replay?from=2020-08-30T01:00:08.17Z`);
eventSource.onmessage = function(event)
let gameIdx = 1;
{
    try
    {
        update = JSON.parse(event.data);
        games = update.value.games.schedule;

        if(gameId === undefined)
        {
            gameId = games[gameIdx].id;
        }
		thisGame = games.filter(function(x) { return x.id === gameId; })[0];

        console.log(thisGame);

    }
    catch(err)
    {
        console.log(err.message);
    }
}
    
    
    