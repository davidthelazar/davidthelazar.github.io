// eventSource = new EventSource(`https://api.sibr.dev/replay/v1/replay?from=2020-08-27T01:00:08.17Z`);
let gameIdx = 0;
let gameId = undefined;
//attach a click listener to a play button
document.getElementById('startButton').addEventListener('click', Tone.start());
this.timeGrabber = document.getElementById('startTime');
// this.gameGrabber = document.getElementById('whichGame');
let self = this;
this.eventSource = new EventSource(`https://api.sibr.dev/replay/v1/replay?from=2021-07-21T01:00:08.17Z`);
gameIdx = 0;
this.eventSource.onmessage = doUpdates;
this.timeGrabber.addEventListener('change', (event) => {

	self.eventSource.close();
	self.eventSource = new EventSource(`https://api.sibr.dev/replay/v1/replay?from=${event.target.value}`);
	self.eventSource.onmessage = doUpdates;	
});
// this.gameGrabber.addEventListener('change', (event) => {
//
// 	self.gameIdx = event.target.value;
// });

var updateTime = 4; //seconds, will control synth beats but also should control game updates 

//synth shit
var allNotes = ["C0","C#0","D0","D#0","E0","F0","F#0","G0","G#0","A0","A#0","B0","C1","C#1","D1","D#1","E1","F1","F#1","G1","G#1","A1","A#1","B1","C2","C#2","D2","D#2","E2","F2","F#2","G2","G#2","A2","A#2","B2","C3","C#3","D3","D#3","E3","F3","F#3","G3","G#3","A3","A#3","B3","C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4","C5","C#5","D5","D#5","E5","F5","F#5","G5","G#5","A5","A#5","B5","C6","C#6","D6","D#6","E6","F6","F#6","G6","G#6","A6","A#6","B6","C7","C#7","D7","D#7","E7","F7","F#7","G7","G#7","A7","A#7","B7","C8","C#8","D8","D#8","E8","F8","F#8","G8","G#8","A8","A#8","B8"];
var majorIdx = [0,2,4,5,7,9,11,12];
var minorIdx = [0,2,3,5,7,8,10,12];
var octaveStep = 12;
var minimumIndex = allNotes.indexOf('C2');
var rootIndex = minimumIndex;

var strikeScaleIdx = [0,3,4,6] //ugh, zero indexing. SO this is root, 4th,5th,7th
var ballScaleIdx = [0,2,4,5,6] //ugh, zero indexing. SO this is root, 3rd,5th,6th,7th
var outWigglyFactors = [15,20,50,100]
// var outWigglyFactors = [1,1.2,1.6,1.8]

var inningSynth = new Tone.AMSynth().toDestination();
// var strikeSynth = new Tone.DuoSynth().toDestination();
var strikeSynth = new Tone.FMSynth().toDestination();
strikeSynth.oscillator.type = 'sine';
var ballSynth = new Tone.AMSynth().toDestination();
ballSynth.oscillator.type = "sine";

var homeSynth = new Tone.MembraneSynth({
			pitchDecay: 0.008,
			octaves: 2,
			envelope: {
				attack: 0.0006,
				decay: 0.5,
				sustain: 0
			},
			volume: 15
		}).toDestination();
var homeSpacing = 0;
var	homeSequence = new Tone.Sequence(((time, pitch) => {
			homeSynth.triggerAttack(pitch, time);
		}), [allNotes[rootIndex-12]], homeSpacing).start(0);
// var awaySynth = new Tone.MetalSynth({
// 			harmonicity: 12,
// 			resonance: 800,
// 			modulationIndex: 20,
// 			envelope: {
// 				decay: 0.4,
// 			},
// 			volume: -30
// 		}).toDestination();
var lowPass = new Tone.Filter({
		  frequency: 8000,
		}).toDestination();

var awaySynth = new Tone.NoiseSynth({
		  volume: -15,
		  noise: {
		    type: 'white',
		    playbackRate: 3,
		  },
		  envelope: {
		    attack: 0.001,
		    decay: 0.20,
		    sustain: 0.15,
		    release: 0.03,
		  },
		}).connect(lowPass);
		
var awaySpacing = 0;
// var	awaySequence = new Tone.Sequence(((time, pitch) => {
// 			awaySynth.triggerAttack(pitch, time);
// 		}), [allNotes[rootIndex+12]], awaySpacing).start(updateTime/8);
var	awaySequence = new Tone.Sequence(((time) => {
			awaySynth.triggerAttack(time);
		}),[]).start(updateTime/4);
var allSynths = [inningSynth,strikeSynth,ballSynth];

var ballPattern = new Tone.Pattern(function(time, note){
			strikeSynth.triggerAttackRelease(note, 0.25);
		}, []).start(0);
var ballpeggio = [];
// function getNoteIndex(noteStr)
// {
// 	return allNotes.indexOf(noteStr);
// }
Tone.Transport.start();
function doUpdates(event)
{		
	// Tone.Transport.stop();
	Tone.Transport.cancel();
	    let snapshots = digestSnapshots(event);
		let snapshot = snapshots[gameIdx];
		
		rootIndex = minimumIndex+snapshot.inning;
		if (snapshot.homeScore == 0)
			{
				homeSpacing = 0;
			} //will never play?
		else
			{ 
				homeSpacing = updateTime/snapshot.homeScore;
			}
		if (snapshot.awayScore == 0)
			{
				awaySpacing = 0;
			} //will never play?
		else
			{
				awaySpacing = updateTime/snapshot.awayScore;
				awaySequence = new Tone.Sequence(((time) => {
					awaySynth.triggerAttack(time);
				}),[awaySpacing]).start(0);
			}			
		
		homeSequence = new Tone.Sequence(((time, pitch) => {
			homeSynth.triggerAttack(pitch, time);
		}), [allNotes[rootIndex-12]], homeSpacing).start(0);
		

		

		// inningSynth.triggerAttack(allNotes[rootIndex]);
		strikeSynth.modulationIndex.value = outWigglyFactors[snapshot.outs];
		// strikeSynth.harmonicity.value = outWigglyFactors[snapshot.outs];
		strikeSynth.triggerAttack(allNotes[rootIndex+strikeScaleIdx[snapshot.strikes]]);
		// ballSynth.triggerAttack(allNotes[rootIndex+12+ballScaleIdx[snapshot.balls]]);
		// strikeSynth.harmonicity.value = (strikeScaleIdx[snapshot.strikes]+12)/12
		ballpeggio = [];
		for (var idx=0;idx<snapshot.balls+1;idx++)
		{
			ballpeggio.push(allNotes[rootIndex+strikeScaleIdx[snapshot.strikes]+ballScaleIdx[idx]]);
		}
		ballPattern = new Tone.Pattern(function(time, note){
			strikeSynth.triggerAttackRelease(note, updateTime/(snapshot.balls+1));
		}, ballpeggio);
		ballPattern.start(0);
		console.log(updateTime/(snapshot.balls+1));
		
		console.log('strikes: '+snapshot.strikes);
		console.log('balls: '+snapshot.balls);
		console.log('outs: '+snapshot.outs);
		console.log('homeScore: '+snapshot.homeScore);
		console.log('awayScore: '+snapshot.awayScore);

		Tone.Transport.start();
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