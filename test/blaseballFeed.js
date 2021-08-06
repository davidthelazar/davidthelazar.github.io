// eventSource = new EventSource(`https://api.sibr.dev/replay/v1/replay?from=2020-08-27T01:00:08.17Z`);
const gameIdx = 0;
let gameId = undefined;
this.timeGrabber = document.getElementById('startTime');
// const timeGrabber = $('#startTime')
let self = this;
this.eventSource = new EventSource(`https://api.sibr.dev/replay/v1/replay?from=2021-07-21T01:00:08.17Z`);
this.eventSource.onmessage = doUpdates;
getTicker('2021-07-21T01:00').then(tStr=>$("#ticker").html(`<marquee scrollamount="4"> ${tStr}`));
this.timeGrabber.addEventListener('change', (event) => {

	// console.log(fetch(`https://api.sibr.dev/chronicler/v2/entities?type=globalevents&at=${event.target.value}:00.000000Z`).json());
	self.eventSource.close();
	self.eventSource = new EventSource(`https://api.sibr.dev/replay/v1/replay?from=${event.target.value}`);
	self.eventSource.onmessage = doUpdates;	
	getTicker(event.target.value).then(tStr=>$("#ticker").html(`<marquee scrollamount="4"> ${tStr}`));
});
function doUpdates(event)
{
	try
	{
	    let snapshots = digestSnapshots(event)
		let scoreString = ``;
		let updatesString = ``;
	    // $("#updates").html("<ul>");
	    // $("#scores").html("<marquee>");
		for (let idx = 0; idx < snapshots.length; idx++) 
		{
			// updatesString = updatesString+`<li><div>`+snapshots[idx].lastUpdate+`<div class="wrap-wrapper"><div><img style="float:left" src=images/${snapshots[idx].baseString}.gif></div><div><p>butts</p><p>lol</p></div></div></div></li>`;
						updatesString = updatesString+`<li>`+snapshots[idx].lastUpdate+`<img src=images/${snapshots[idx].baseString}.gif></li>`;
			// scoreString = scoreString+`${snapshots[idx].homeTeamNickname} (${snapshots[idx].homeScore}) vs ${snapshots[idx].awayTeamNickname} (${snapshots[idx].awayScore})     `;
			// $("#updates").append(`<li>${snapshots[idx].homeTeamNickname}(${snapshots[idx].homeScore}) v ${snapshots[idx].awayTeamNickname}(${snapshots[idx].awayScore}): `+snapshots[idx].lastUpdate+`<img src=images/${snapshots[idx].baseString}.gif></li>`);
				// $("#updates").append(`<li>`+snapshots[idx].lastUpdate+`<img src=images/${snapshots[idx].baseString}.gif></li>`);
				// $("#scores").append(`${snapshots[idx].homeTeamNickname} (${snapshots[idx].homeScore}) vs ${snapshots[idx].awayTeamNickname} (${snapshots[idx].awayScore})     `);
		}
	    // $("#updates").html("<ul>"+updatesString+"</ul>");
	    $("#updates").html(updatesString);
	    // $("#scores").html("<marquee>"+scoreString+"</marquee>");
		

    }
    catch(err)
    {
        console.log(err.message);
    }
}
async function getTicker(timeStr){
	let tickerStr = ``
	let response = await fetch(`https://api.sibr.dev/chronicler/v2/entities?type=globalevents&at=${timeStr}:00.000000Z`).then(res=>res.json()).then(tree=>tree.items[0].data);
		for(let idx=0;idx<response.length;idx++)
			{
				tickerStr = tickerStr+response[idx].msg+'<tickertab>';
			} 
			console.log(tickerStr)
	 return tickerStr;
}
    
