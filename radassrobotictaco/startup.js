var CANVAS_RESIZE_MODE=1;	//0=locked, 1=stretch, 2=resize

var CANVAS_WIDTH=640;
var CANVAS_HEIGHT=480;

window.onload=function( e ){

	var canvas=document.getElementById( "GameCanvas" );
	var splitter=document.getElementById( "Splitter" );
	var console=document.getElementById( "GameConsole" );
	
	var mouseDown=false;
	var startY=0;
	var canvasH=CANVAS_HEIGHT;
	var cmousemove=null;
	var cmouseup=null;
	var cmouseout=null;
	var fscreen=false;

	canvas.width=CANVAS_WIDTH;
	canvas.height=CANVAS_HEIGHT;

	function eatEvent( e ){
		if( e.stopPropagation ){
			e.stopPropagation();
			e.preventDefault();
		}else{
			e.cancelBubble=true;
			e.returnValue=false;
		}
	}
	
	function requestFullscreen(){
		var rfs=canvas.requestFullscreen || canvas.webkitRequestFullScreen || canvas.mozRequestFullScreen;
		if( rfs ) rfs.call( canvas );
	}
	
	function updateSize(){
	
		if( fscreen ){
			canvasH=window.innerHeight;
		}else if( canvasH<0 ){
			canvasH=0;
		}else if( canvasH+splitter.clientHeight>=window.innerHeight ){
			canvasH=window.innerHeight-splitter.clientHeight;
		}
		
		switch( CANVAS_RESIZE_MODE ){
		case 0:
			canvas.parentNode.style.height=canvasH+"px";
			break;
		case 1:
			canvas.style.height=canvasH+"px";
			break;
		case 2:
			canvas.width=document.body.clientWidth;
			canvas.height=canvasH;
			canvas.style.height=canvasH+"px";
			break;
		}
		console.style.height=(fscreen ? 0 : window.innerHeight-splitter.clientHeight-canvasH)+"px";

		//Note! Any resize code that modifies canvas.width/canvas.height/canvas.style.width/canvas.style.height should call this to update canvas...
		if( canvas.updateSize ) canvas.updateSize();
	}
	
	canvas.onfullscreenchange=function( e ){
		fscreen=(document.fullscreenElement==canvas);
		updateSize();
	}
	
	canvas.onwebkitfullscreenchange=function( e ){
		fscreen=(document.webkitFullscreenElement==canvas);
		updateSize();
	}
	
	canvas.onmozfullscreenchange=function( e ){
		fscreen=(document.mozFullscreenElement==canvas);
		updateSize();
	}
	
	splitter.onmousedown=function( e ){
		mouseDown=true;
		startY=e.clientY;
		cmousemove=canvas.onmousemove;
		cmouseup=canvas.onmouseup;
		cmouseout=canvas.onmouseout;
		canvas.onmousemove=null;
		canvas.onmouseup=null;
		canvas.onmouseout=null;
		eatEvent( e );
	}
	
	window.onmousemove=function( e ){
		if( mouseDown ){
			var dy=e.clientY-startY;
			startY+=dy;
			canvasH+=dy;
			updateSize();
			eatEvent( e );
		}
	}
	
	window.onmouseup=function( e ){
		if( mouseDown ){
			canvas.onmousemove=cmousemove;
			canvas.onmouseup=cmouseup;
			canvas.onmouseout=cmouseout;
			mouseDown=false;
			eatEvent( e );
			
			if( canvasH+splitter.clientHeight>=window.innerHeight ) requestFullscreen();
		}
	}
	
	window.onresize=function( e ){
		updateSize();
	}
	
	updateSize();
	
	BBMonkeyGame.Main( canvas );
}
