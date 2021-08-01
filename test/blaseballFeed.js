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
    
    
    
    addEventListener("message", (event) => {
        const games = JSON.parse(event.data).value?.games?.schedule
        console.log(games);
    });
    
    
    evtSource.onmessage = function(event)
    {
        try
        {
            update = JSON.parse(event.data);
            games = update.value.games.schedule;

            if(gameId === undefined)
            {
                gameId = games[GAME_INDEX].id;
            }
            // TODO: pick what game to care about
            oneGame = games.filter(function(x) { return x.id === gameId; })[0];
            console.log(oneGame);
            if(play)
                updateGame(oneGame);
        }
        catch(err)
        {
            console.log(err.message);
            //console.log(event.data);
        }

    }