function digestSnapshots(event)
{
    update = JSON.parse(event.data);
    games = update.value.games.schedule;
	let snapshots=[];
    //TODO  setup a "games I care about" vector and only loop over those
	//TODO deal with fifth base
	for (let idx = 0; idx < games.length; idx++) 
	{
        gameId = games[idx].id;
		thisGame = games.filter(function(x) { return x.id === gameId; })[0];
		let snapshot={};
        // console.log(thisGame);
        //need: inning, halfInningOuts, atBatStrikes, atBatBalls, awayScore,homeScore, basesOccupied (or baserunnerCount)
	    // $("#updates").text(thisGame.lastUpdate);
		snapshot.awayTeamNickname = thisGame.awayTeamNickname;
		snapshot.homeTeamNickname = thisGame.homeTeamNickname;			
		snapshot.lastUpdate = thisGame.lastUpdate;
		snapshot.inning = thisGame.inning;
		snapshot.outs = thisGame.halfInningOuts;
		snapshot.strikes = thisGame.atBatStrikes;
		snapshot.balls = thisGame.atBatBalls;
		snapshot.awayScore = thisGame.awayScore;
		snapshot.homeScore = thisGame.homeScore;
		snapshot.basesOccupied = thisGame.basesOccupied;
		snapshot.baserunnerCount = snapshot.basesOccupied.length;
		snapshot.baseString = (thisGame.basesOccupied.includes(0) ? '1' : '0')+(thisGame.basesOccupied.includes(1) ? '1' : '0') +(thisGame.basesOccupied.includes(2) ? '1' : '0');
		
		snapshots[idx] = snapshot;
		
	}	

	return snapshots;
}


    