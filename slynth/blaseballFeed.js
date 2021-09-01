// eventSource = new EventSource(`https://api.sibr.dev/replay/v1/replay?from=2020-08-27T01:00:08.17Z`);
let gameIdx = 0;
var updateTime = 4; //seconds, will control synth beats but also should control game updates 
var updateGamesListFlag = true;

//attach a click listener to a play button
document.getElementById('startButton').addEventListener('click', () => {initialize()});
this.timeGrabber = document.getElementById('startTime');
this.gameGrabber = document.getElementById('gamesOptions');

this.eventSource = new EventSource(`https://api.sibr.dev/replay/v1/replay?from=2021-07-21T01:00:08.17Z`);
this.eventSource.onmessage = doUpdates;
let self = this;
this.timeGrabber.addEventListener('change', (event) => {

	self.eventSource.close();
	self.eventSource = new EventSource(`https://api.sibr.dev/replay/v1/replay?from=${event.target.value}&interval=${updateTime*1000}`);
	self.eventSource.onmessage = doUpdates;	
	flipUpdateFlag();
	// self.updateGamesListFlag = true;

});
this.gameGrabber.addEventListener('change', (event) => {
	
	choice = $('#gamesOptions').val();
	setGameIdx(choice);

});
// this.gameGrabber.addEventListener('change', (event) => {
//
// 	self.gameIdx = event.target.value;
// });



//synth shit
var allNotes = ["C0","C#0","D0","D#0","E0","F0","F#0","G0","G#0","A0","A#0","B0","C1","C#1","D1","D#1","E1","F1","F#1","G1","G#1","A1","A#1","B1","C2","C#2","D2","D#2","E2","F2","F#2","G2","G#2","A2","A#2","B2","C3","C#3","D3","D#3","E3","F3","F#3","G3","G#3","A3","A#3","B3","C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4","C5","C#5","D5","D#5","E5","F5","F#5","G5","G#5","A5","A#5","B5","C6","C#6","D6","D#6","E6","F6","F#6","G6","G#6","A6","A#6","B6","C7","C#7","D7","D#7","E7","F7","F#7","G7","G#7","A7","A#7","B7","C8","C#8","D8","D#8","E8","F8","F#8","G8","G#8","A8","A#8","B8"];
var majorIdx = [0,2,4,5,7,9,11,12];
var minorIdx = [0,2,3,5,7,8,10,12];
var octaveStep = 12;
var minimumIndex = allNotes.indexOf('C3');
var rootIndex = minimumIndex;

var strikeScaleIdx = [0,3,4,6,8] //ugh, zero indexing. SO this is root, 4th,5th,7th
var ballScaleIdx = [0,2,4,5,6,7,9,11,12,14,16,17,18,19,21,23] //ugh, zero indexing. SO this is root, 3rd,5th,6th,7th
// var outWigglyFactors = [15,20,50,100]

const filter = new Tone.AutoFilter({
			baseFrequency:'C4',
			frequency: 0,
			depth: 0 
		}).toDestination().start();
// var homeSynth = new Tone.FMSynth().connect(filter);//toDestination();
var awaySynth = new Tone.Synth({
			"volume": 0,
			"detune": 0,
			"portamento": 0.05,
			"envelope": {
				"attack": 1,
				"attackCurve": "exponential",
				"decay": 0.1,
				"decayCurve": "linear",
				"release": 0,
				"releaseCurve": "exponential",
				"sustain": 1
			},
			"oscillator": {
				"partialCount": 0,
				"partials": [],
				"phase": 0,
				"type": "sawtooth",
				"count": 3,
				"spread": 10
			}
		}).connect(filter);
var homeSynth = new Tone.Synth({
			"volume": 0,
			"detune": 0,
			"portamento": 0.05,
			"envelope": {
				"attack": 1,
				"attackCurve": "exponential",
				"decay": 0.1,
				"decayCurve": "linear",
				"release": 0,
				"releaseCurve": "exponential",
				"sustain": 1
			},
			"oscillator": {
				"partialCount": 0,
				"partials": [],
				"phase": 0,
				"type": "square",
				"count": 3,
				"spread": 20
			}
		}).connect(filter);
		
var strikeSynth = new Tone.FMSynth().connect(filter);
strikeSynth.oscillator.type = 'sine';

var posHomeDrumSynth = new Tone.MembraneSynth({
			// pitchDecay: 0.008,
			// octaves: 2,
			// envelope: {
			// 	attack: 0.0006,
			// 	decay: 0.5,
			// 	sustain: 0
			// },
				volume: 0
		}).toDestination();
var negHomeDrumSynth = new Tone.PluckSynth().toDestination();// {
// 			// pitchDecay: 0.008,
// 			// octaves: 2,
// 			// envelope: {
// 			// 	attack: 0.0006,
// 			// 	decay: 0.5,
// 			// 	sustain: 0
// 			// },
// 				volume: 0
// 		}).toDestination();
var homeDrumSynth = new Tone.PluckSynth().toDestination();		
var homeSpacing = 0;
var	homeDrumSequence = new Tone.Sequence(((time, pitch) => {
			homeDrumSynth.triggerAttack(pitch, time);
		}), [allNotes[rootIndex-12]], homeSpacing).start(0);

var lowPass = new Tone.Filter({
		  frequency: 8000,
		}).toDestination();

var posAwayDrumSynth = new Tone.NoiseSynth({
		  volume: -15,
		  noise: {
		    type: 'white',
		    playbackRate: 3,
		  },
		  envelope: {
		    attack: 0.03,
		    decay: 0.20,
		    sustain: 0.15,
		    release: 0.001,
		  },
		}).connect(lowPass);
var negAwayDrumSynth = new Tone.PluckSynth().toDestination();// {
// 			// pitchDecay: 0.008,
// 			// octaves: 2,
// 			// envelope: {
// 			// 	attack: 0.0006,
// 			// 	decay: 0.5,
// 			// 	sustain: 0
// 			// },
// 				volume: 0
// 		}).toDestination();
var awayDrumSynth = new Tone.PluckSynth().toDestination();			
var awaySpacing = 0;

var	awayDrumSequence = new Tone.Sequence(((time) => {
			awayDrumSynth.triggerAttack(time);
		}),[]).start(0);
		
		
var baseSynth = new Tone.PolySynth({
	"volume": 5,
	"detune": 0,
	"portamento": 0.05,
	"envelope": {
		"attack": 0.005,
		"attackCurve": "linear",
		"decay": 0.1,
		"decayCurve": "exponential",
		"release": 1,
		"releaseCurve": "exponential",
		"sustain": 0.3
	},
	"oscillator": {
		"partialCount": 0,
		"partials": [],
		"phase": 0,
		"type": "triangle"
	}
}).toDestination(); //Should this go through the filter?
		
var baseNotes = [3,5,6,14]; //fuck, 4th, 6th, and 7th, sounds like LoZ
		// 467
var baseSequence = new Tone.Sequence((time, note) => {
	synth.triggerAttackRelease(note, .5, time);
}, [],updateTime/2).start(0);

var basepeggio=[];

Tone.Transport.start();	
		
// var allSynths = [inningSynth,strikeSynth,ballSynth];

var ballPattern = new Tone.Pattern(function(time, note){
			strikeSynth.triggerAttackRelease(note, 0.25);
		}, []).start(0);
var ballpeggio = [];

Tone.Transport.start();
function doUpdates(event)
{		//TODO: negative scores
	//TODO:don't play weird non-inning bits
	//TODO: still overlapping on inning change?
	//TODO: Fix on iOS
	// Tone.Transport.stop();
    let snapshots = digestSnapshots(event);
	let snapshot = snapshots[gameIdx];
	if (Tone.context.state === "running" && snapshot.inning>-1)
	{
		Tone.Transport.cancel();

		if (updateGamesListFlag)
		{
			updateGamesList(snapshots);
			updateGamesListFlag = false;
		}
	
		if (snapshot.topOfInning)
		{
			strikeSynth = awaySynth;
		}
		else
		{
			strikeSynth = homeSynth;
		}
		rootIndex = minimumIndex+snapshot.inning;
		if (snapshot.homeScore == 0)
		{
			homeSpacing = 0;
		} //will never play?
		else
		{ 
			homeSpacing = updateTime/(Math.abs(snapshot.homeScore));
			if (snapshot.homeScore<0)
			{
				console.log('butts');
				homeDrumSynth = negHomeDrumSynth;
				homeDrumSequence = new Tone.Sequence(((time, pitch) => {
					homeDrumSynth.triggerAttack(pitch, time);
				}), [allNotes[rootIndex-24]], homeSpacing).start(0);
			}
			else
			{
				homeDrumSynth = posHomeDrumSynth;
				homeDrumSequence = new Tone.Sequence(((time, pitch) => {
					homeDrumSynth.triggerAttack(pitch, time);
				}), [allNotes[rootIndex-24]], homeSpacing).start(0);				
			}

		}
		if (snapshot.awayScore == 0)
		{
			awaySpacing = 0;
		} //will never play?
		else
		{
			awaySpacing = updateTime/(Math.abs(snapshot.awayScore));
			if (snapshot.awayScore<0)
			{
				console.log('butts but away');
				awayDrumSynth = negAwayDrumSynth;
				awayDrumSequence = new Tone.Sequence(((time,pitch) => {
					awayDrumSynth.triggerAttack(pitch,time);
				}), [allNotes[rootIndex+12]],[awaySpacing]).start(0); 
			}
			else
			{
				awayDrumSynth = posAwayDrumSynth;
				awayDrumSequence = new Tone.Sequence(((time,pitch) => {
					awayDrumSynth.triggerAttack(time);
				}),[1],[awaySpacing]).start(0); //1 is just a bs placeholder
			}
		}			
	
		filter.set({
			frequency: (4**snapshot.outs),
			depth: .4*snapshot.outs
		});
		// strikeSynth.triggerAttack();
	
		ballpeggio = [];
		for (var idx=0;idx<2**snapshot.balls;idx++)
		{
			ballpeggio.push(allNotes[rootIndex+getMajorIdx(strikeScaleIdx[snapshot.strikes])+getMajorIdx(ballScaleIdx[idx])]);
		}
		ballPattern = new Tone.Pattern(function(time, note){
			strikeSynth.triggerAttackRelease(note, updateTime/(2**snapshot.balls));
		}, ballpeggio);
		ballPattern.start(0);
	
		basepeggio = [];
		for (var idx=0;idx<snapshot.basesOccupied.length;idx++)
			{basepeggio.push(allNotes[rootIndex+getMajorIdx(baseNotes[snapshot.basesOccupied[idx]])]);}

		baseSequence = new Tone.Sequence((time, note) => {
			baseSynth.triggerAttackRelease(note, .5, time);
		}, basepeggio,updateTime/(2*basepeggio.length)).start(0);
	
		baseSequence.start(0);
		console.log('|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|')				
		console.log('inning: '+snapshot.inning);				
		console.log('strikes: '+snapshot.strikes);
		console.log('balls: '+snapshot.balls);
		console.log('outs: '+snapshot.outs);
		console.log('bases: '+snapshot.basesOccupied);
		console.log('homeScore: '+snapshot.homeScore);
		console.log('awayScore: '+snapshot.awayScore);

		Tone.Transport.start();
	}
}
function getMajorIdx(scaleIdx)
{
	let baseIdx = [0,2,4,5,7,9,11,12];
	let scaleInBase = scaleIdx%8;	//Get scaleIdx as scale degree without octave
	let noteInBase = baseIdx[scaleInBase]; //Get note index in base octave
	return noteInBase + Math.floor(scaleIdx/8)*12; //Add in octave info
}
function getMinorIdx(scaleIdx)
{
	let baseIdx = [0,2,3,5,7,8,10,12];
	let scaleInBase = scaleIdx%8;	//Get scaleIdx as scale degree without octave
	let noteInBase = baseIdx[scaleInBase];
	return noteInBase + Math.floor(scaleIdx/8)*12;
}
function updateGamesList(allSnapshots)
{
	console.log('lol');
	var away = '';
	var home = '';
	var str = '';
	$('#gamesOptions').empty();
	for (var idx=0;idx<allSnapshots.length;idx++)
	{
		away = allSnapshots[idx].awayTeamNickname;
		home = allSnapshots[idx].homeTeamNickname;
		str = `${idx+1}: ${away} at ${home}`;

		$('#gamesOptions').append($('<option></option>').val(idx).html(str));
	}
}
function flipUpdateFlag()
{
	updateGamesListFlag= true;
}
function setGameIdx(choice)
{
	gameIdx = choice;
}
function initialize()
{
	Tone.start();
	var trashSynth = new Tone.Synth();
	trashSynth.triggerAttack();
}
// const bell = new Tone.MetalSynth({
// 			harmonicity: 12,
// 			resonance: 800,
// 			modulationIndex: 20,
// 			envelope: {
// 				decay: 0.4,
// 			},
// 			volume: -15
// 		}).toDestination();
//
// 		const bellPart = new Tone.Sequence(((time, freq) => {
// 			bell.triggerAttack(freq, time, Math.random()*0.5 + 0.5);
// 		}), [[300, null, 200],
// 			[null, 200, 200],
// 			[null, 200, null],
// 			[200, null, 200]
// 		], "4n").start(0);
//
// 		const conga = new Tone.MembraneSynth({
// 			pitchDecay: 0.008,
// 			octaves: 2,
// 			envelope: {
// 				attack: 0.0006,
// 				decay: 0.5,
// 				sustain: 0
// 			}
// 		}).toDestination();
//
// 		const congaPart = new Tone.Sequence(((time, pitch) => {
// 			conga.triggerAttack(pitch, time, Math.random()*0.5 + 0.5);
// 		}), ["G3", "C4", "C4", "C4"], "4n").start(0);
//
// 		Tone.Transport.bpm.value = 115;
//
// 		drawer().add({
// 			tone: conga,
// 			title: "Conga"
// 		}).add({
// 			tone: bell,
// 			title: "Bell"
// 		});
//
// 		// connect the UI with the components
// 		document.querySelector("tone-play-toggle").addEventListener("start", () => Tone.Transport.start());
// 		document.querySelector("tone-play-toggle").addEventListener("stop", () => Tone.Transport.stop());
//