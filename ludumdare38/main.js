
//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BRL_DATABUFFER_IMPLEMENTED="1";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_BRL_STREAM_IMPLEMENTED="1";
CFG_BRL_THREAD_IMPLEMENTED="1";
CFG_CD="";
CFG_CONFIG="release";
CFG_HOST="macos";
CFG_HTML5_WEBAUDIO_ENABLED="1";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_LANG="js";
CFG_MODPATH="";
CFG_MOJO_AUTO_SUSPEND_ENABLED="1";
CFG_MOJO_DRIVER_IMPLEMENTED="1";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_GLES20_ENABLED="0";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.txt|*.ini;|*.tmx|*.tsx;*.ttf;*.txt|*.xml|*.json|*.csv";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[sprBug2.png];type=image/png;width=500;height=62;\n[sprBug2Test.png];type=image/png;width=500;height=62;\n[sprHammer.png];type=image/png;width=240;height=120;\n[sprHammerBar.png];type=image/png;width=1440;height=10;\n[sprHammerStick.png];type=image/png;width=10;height=100;\n[sprMenuButton.png];type=image/png;width=800;height=150;\n[sprMissing.png];type=image/png;width=128;height=64;\n[sprStrings.png];type=image/png;width=960;height=900;\n[sprStringsBetter.png];type=image/png;width=80;height=900;\n[sprStringsBetter2.png];type=image/png;width=80;height=900;\n[sprStringsBetter3.png];type=image/png;width=80;height=900;\n[titleScreen.png];type=image/png;width=1440;height=900;\n[titleScreenGS.png];type=image/png;width=1440;height=900;\n[titleScreenLol.png];type=image/png;width=1440;height=900;\n[mojo_font.png];type=image/png;width=864;height=13;\n";
//${METADATA_END}

//${TRANSCODE_BEGIN}

// Javascript Monkey runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

var err_info="";
var err_stack=[];

var dbg_index=0;

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	if( !err_info.length ) return "";
	var str=err_info+"\n";
	for( var i=err_stack.length-1;i>0;--i ){
		str+=err_stack[i]+"\n";
	}
	return str;
}

function print( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function alertError( err ){
	if( typeof(err)=="string" && err=="" ) return;
	alert( "Monkey Runtime Error : "+err.toString()+"\n\n"+stackTrace() );
}

function error( err ){
	throw err;
}

function debugLog( str ){
	if( window.console!=undefined ) window.console.log( str );
}

function debugStop(){
	debugger;	//	error( "STOP" );
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_charCodeAt( str,index ){
	if( index<0 || index>=str.length ) error( "Character index out of range" );
	return str.charCodeAt( index );
}

function dbg_array( arr,index ){
	if( index<0 || index>=arr.length ) error( "Array index out of range" );
	dbg_index=index;
	return arr;
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=false;
	return arr;
}

function resize_number_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=0;
	return arr;
}

function resize_string_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]="";
	return arr;
}

function resize_array_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=[];
	return arr;
}

function resize_object_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=null;
	return arr;
}

function string_compare( lhs,rhs ){
	var n=Math.min( lhs.length,rhs.length ),i,t;
	for( i=0;i<n;++i ){
		t=lhs.charCodeAt(i)-rhs.charCodeAt(i);
		if( t ) return t;
	}
	return lhs.length-rhs.length;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_startswith( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_endswith( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function string_tochars( str ){
	var arr=new Array( str.length );
	for( var i=0;i<str.length;++i ) arr[i]=str.charCodeAt(i);
	return arr;
}

function string_fromchars( chars ){
	var str="",i;
	for( i=0;i<chars.length;++i ){
		str+=String.fromCharCode( chars[i] );
	}
	return str;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function object_implements( obj,iface ){
	if( obj && obj.implments && obj.implments[iface] ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}

function ThrowableObject(){
}

ThrowableObject.prototype.toString=function(){ 
	return "Uncaught Monkey Exception"; 
}


function BBGameEvent(){}
BBGameEvent.KeyDown=1;
BBGameEvent.KeyUp=2;
BBGameEvent.KeyChar=3;
BBGameEvent.MouseDown=4;
BBGameEvent.MouseUp=5;
BBGameEvent.MouseMove=6;
BBGameEvent.TouchDown=7;
BBGameEvent.TouchUp=8;
BBGameEvent.TouchMove=9;
BBGameEvent.MotionAccel=10;

function BBGameDelegate(){}
BBGameDelegate.prototype.StartGame=function(){}
BBGameDelegate.prototype.SuspendGame=function(){}
BBGameDelegate.prototype.ResumeGame=function(){}
BBGameDelegate.prototype.UpdateGame=function(){}
BBGameDelegate.prototype.RenderGame=function(){}
BBGameDelegate.prototype.KeyEvent=function( ev,data ){}
BBGameDelegate.prototype.MouseEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.TouchEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.MotionEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.DiscardGraphics=function(){}

function BBDisplayMode( width,height ){
	this.width=width;
	this.height=height;
}

function BBGame(){
	BBGame._game=this;
	this._delegate=null;
	this._keyboardEnabled=false;
	this._updateRate=0;
	this._started=false;
	this._suspended=false;
	this._debugExs=(CFG_CONFIG=="debug");
	this._startms=Date.now();
}

BBGame.Game=function(){
	return BBGame._game;
}

BBGame.prototype.SetDelegate=function( delegate ){
	this._delegate=delegate;
}

BBGame.prototype.Delegate=function(){
	return this._delegate;
}

BBGame.prototype.SetUpdateRate=function( updateRate ){
	this._updateRate=updateRate;
}

BBGame.prototype.SetKeyboardEnabled=function( keyboardEnabled ){
	this._keyboardEnabled=keyboardEnabled;
}

BBGame.prototype.Started=function(){
	return this._started;
}

BBGame.prototype.Suspended=function(){
	return this._suspended;
}

BBGame.prototype.Millisecs=function(){
	return Date.now()-this._startms;
}

BBGame.prototype.GetDate=function( date ){
	var n=date.length;
	if( n>0 ){
		var t=new Date();
		date[0]=t.getFullYear();
		if( n>1 ){
			date[1]=t.getMonth()+1;
			if( n>2 ){
				date[2]=t.getDate();
				if( n>3 ){
					date[3]=t.getHours();
					if( n>4 ){
						date[4]=t.getMinutes();
						if( n>5 ){
							date[5]=t.getSeconds();
							if( n>6 ){
								date[6]=t.getMilliseconds();
							}
						}
					}
				}
			}
		}
	}
}

BBGame.prototype.SaveState=function( state ){
	localStorage.setItem( "monkeystate@"+document.URL,state );	//key can't start with dot in Chrome!
	return 1;
}

BBGame.prototype.LoadState=function(){
	var state=localStorage.getItem( "monkeystate@"+document.URL );
	if( state ) return state;
	return "";
}

BBGame.prototype.LoadString=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );
	
	xhr.send( null );
	
	if( xhr.status==200 || xhr.status==0 ) return xhr.responseText;
	
	return "";
}

BBGame.prototype.CountJoysticks=function( update ){
	return 0;
}

BBGame.prototype.PollJoystick=function( port,joyx,joyy,joyz,buttons ){
	return false;
}

BBGame.prototype.OpenUrl=function( url ){
	window.location=url;
}

BBGame.prototype.SetMouseVisible=function( visible ){
	if( visible ){
		this._canvas.style.cursor='default';	
	}else{
		this._canvas.style.cursor="url('data:image/cur;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA55ZXBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeWVxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnllcGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9////////////////////+////////f/////////8%3D'), auto";
	}
}

BBGame.prototype.GetDeviceWidth=function(){
	return 0;
}

BBGame.prototype.GetDeviceHeight=function(){
	return 0;
}

BBGame.prototype.SetDeviceWindow=function( width,height,flags ){
}

BBGame.prototype.GetDisplayModes=function(){
	return new Array();
}

BBGame.prototype.GetDesktopMode=function(){
	return null;
}

BBGame.prototype.SetSwapInterval=function( interval ){
}

BBGame.prototype.PathToFilePath=function( path ){
	return "";
}

//***** js Game *****

BBGame.prototype.PathToUrl=function( path ){
	return path;
}

BBGame.prototype.LoadData=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );

	if( xhr.overrideMimeType ) xhr.overrideMimeType( "text/plain; charset=x-user-defined" );

	xhr.send( null );
	if( xhr.status!=200 && xhr.status!=0 ) return null;

	var r=xhr.responseText;
	var buf=new ArrayBuffer( r.length );
	var bytes=new Int8Array( buf );
	for( var i=0;i<r.length;++i ){
		bytes[i]=r.charCodeAt( i );
	}
	return buf;
}

//***** INTERNAL ******

BBGame.prototype.Die=function( ex ){

	this._delegate=new BBGameDelegate();
	
	if( !ex.toString() ){
		return;
	}
	
	if( this._debugExs ){
		print( "Monkey Runtime Error : "+ex.toString() );
		print( stackTrace() );
	}
	
	throw ex;
}

BBGame.prototype.StartGame=function(){

	if( this._started ) return;
	this._started=true;
	
	if( this._debugExs ){
		try{
			this._delegate.StartGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.StartGame();
	}
}

BBGame.prototype.SuspendGame=function(){

	if( !this._started || this._suspended ) return;
	this._suspended=true;
	
	if( this._debugExs ){
		try{
			this._delegate.SuspendGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.SuspendGame();
	}
}

BBGame.prototype.ResumeGame=function(){

	if( !this._started || !this._suspended ) return;
	this._suspended=false;
	
	if( this._debugExs ){
		try{
			this._delegate.ResumeGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.ResumeGame();
	}
}

BBGame.prototype.UpdateGame=function(){

	if( !this._started || this._suspended ) return;

	if( this._debugExs ){
		try{
			this._delegate.UpdateGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.UpdateGame();
	}
}

BBGame.prototype.RenderGame=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.RenderGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.RenderGame();
	}
}

BBGame.prototype.KeyEvent=function( ev,data ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.KeyEvent( ev,data );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.KeyEvent( ev,data );
	}
}

BBGame.prototype.MouseEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MouseEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MouseEvent( ev,data,x,y );
	}
}

BBGame.prototype.TouchEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.TouchEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.TouchEvent( ev,data,x,y );
	}
}

BBGame.prototype.MotionEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MotionEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MotionEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.DiscardGraphics=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.DiscardGraphics();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.DiscardGraphics();
	}
}


var webglGraphicsSeq=1;

function BBHtml5Game( canvas ){

	BBGame.call( this );
	BBHtml5Game._game=this;
	this._canvas=canvas;
	this._loading=0;
	this._timerSeq=0;
	this._gl=null;
	
	if( CFG_OPENGL_GLES20_ENABLED=="1" ){

		//can't get these to fire!
		canvas.addEventListener( "webglcontextlost",function( event ){
			event.preventDefault();
//			print( "WebGL context lost!" );
		},false );

		canvas.addEventListener( "webglcontextrestored",function( event ){
			++webglGraphicsSeq;
//			print( "WebGL context restored!" );
		},false );

		var attrs={ alpha:false };
	
		this._gl=this._canvas.getContext( "webgl",attrs );

		if( !this._gl ) this._gl=this._canvas.getContext( "experimental-webgl",attrs );
		
		if( !this._gl ) this.Die( "Can't create WebGL" );
		
		gl=this._gl;
	}
	
	// --- start gamepad api by skn3 ---------
	this._gamepads = null;
	this._gamepadLookup = [-1,-1,-1,-1];//support 4 gamepads
	var that = this;
	window.addEventListener("gamepadconnected", function(e) {
		that.connectGamepad(e.gamepad);
	});
	
	window.addEventListener("gamepaddisconnected", function(e) {
		that.disconnectGamepad(e.gamepad);
	});
	
	//need to process already connected gamepads (before page was loaded)
	var gamepads = this.getGamepads();
	if (gamepads && gamepads.length > 0) {
		for(var index=0;index < gamepads.length;index++) {
			this.connectGamepad(gamepads[index]);
		}
	}
	// --- end gamepad api by skn3 ---------
}

BBHtml5Game.prototype=extend_class( BBGame );

BBHtml5Game.Html5Game=function(){
	return BBHtml5Game._game;
}

// --- start gamepad api by skn3 ---------
BBHtml5Game.prototype.getGamepads = function() {
	return navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
}

BBHtml5Game.prototype.connectGamepad = function(gamepad) {
	if (!gamepad) {
		return false;
	}
	
	//check if this is a standard gamepad
	if (gamepad.mapping == "standard") {
		//yup so lets add it to an array of valid gamepads
		//find empty controller slot
		var slot = -1;
		for(var index = 0;index < this._gamepadLookup.length;index++) {
			if (this._gamepadLookup[index] == -1) {
				slot = index;
				break;
			}
		}
		
		//can we add this?
		if (slot != -1) {
			this._gamepadLookup[slot] = gamepad.index;
			
			//console.log("gamepad at html5 index "+gamepad.index+" mapped to monkey gamepad unit "+slot);
		}
	} else {
		console.log('Monkey has ignored gamepad at raw port #'+gamepad.index+' with unrecognised mapping scheme \''+gamepad.mapping+'\'.');
	}
}

BBHtml5Game.prototype.disconnectGamepad = function(gamepad) {
	if (!gamepad) {
		return false;
	}
	
	//scan all gamepads for matching index
	for(var index = 0;index < this._gamepadLookup.length;index++) {
		if (this._gamepadLookup[index] == gamepad.index) {
			//remove this gamepad
			this._gamepadLookup[index] = -1
			break;
		}
	}
}

BBHtml5Game.prototype.PollJoystick=function(port, joyx, joyy, joyz, buttons){
	//is this the first gamepad being polled
	if (port == 0) {
		//yes it is so we use the web api to get all gamepad info
		//we can then use this in subsequent calls to PollJoystick
		this._gamepads = this.getGamepads();
	}
	
	//dont bother processing if nothing to process
	if (!this._gamepads) {
	  return false;
	}
	
	//so use the monkey port to find the correct raw data
	var index = this._gamepadLookup[port];
	if (index == -1) {
		return false;
	}

	var gamepad = this._gamepads[index];
	if (!gamepad) {
		return false;
	}
	//so now process gamepad axis/buttons according to the standard mappings
	//https://w3c.github.io/gamepad/#remapping
	
	//left stick axis
	joyx[0] = gamepad.axes[0];
	joyy[0] = -gamepad.axes[1];
	
	//right stick axis
	joyx[1] = gamepad.axes[2];
	joyy[1] = -gamepad.axes[3];
	
	//left trigger
	joyz[0] = gamepad.buttons[6] ? gamepad.buttons[6].value : 0.0;
	
	//right trigger
	joyz[1] = gamepad.buttons[7] ? gamepad.buttons[7].value : 0.0;
	
	//clear button states
	for(var index = 0;index <32;index++) {
		buttons[index] = false;
	}
	
	//map html5 "standard" mapping to monkeys joy codes
	/*
	Const JOY_A=0
	Const JOY_B=1
	Const JOY_X=2
	Const JOY_Y=3
	Const JOY_LB=4
	Const JOY_RB=5
	Const JOY_BACK=6
	Const JOY_START=7
	Const JOY_LEFT=8
	Const JOY_UP=9
	Const JOY_RIGHT=10
	Const JOY_DOWN=11
	Const JOY_LSB=12
	Const JOY_RSB=13
	Const JOY_MENU=14
	*/
	buttons[0] = gamepad.buttons[0] && gamepad.buttons[0].pressed;
	buttons[1] = gamepad.buttons[1] && gamepad.buttons[1].pressed;
	buttons[2] = gamepad.buttons[2] && gamepad.buttons[2].pressed;
	buttons[3] = gamepad.buttons[3] && gamepad.buttons[3].pressed;
	buttons[4] = gamepad.buttons[4] && gamepad.buttons[4].pressed;
	buttons[5] = gamepad.buttons[5] && gamepad.buttons[5].pressed;
	buttons[6] = gamepad.buttons[8] && gamepad.buttons[8].pressed;
	buttons[7] = gamepad.buttons[9] && gamepad.buttons[9].pressed;
	buttons[8] = gamepad.buttons[14] && gamepad.buttons[14].pressed;
	buttons[9] = gamepad.buttons[12] && gamepad.buttons[12].pressed;
	buttons[10] = gamepad.buttons[15] && gamepad.buttons[15].pressed;
	buttons[11] = gamepad.buttons[13] && gamepad.buttons[13].pressed;
	buttons[12] = gamepad.buttons[10] && gamepad.buttons[10].pressed;
	buttons[13] = gamepad.buttons[11] && gamepad.buttons[11].pressed;
	buttons[14] = gamepad.buttons[16] && gamepad.buttons[16].pressed;
	
	//success
	return true
}
// --- end gamepad api by skn3 ---------


BBHtml5Game.prototype.ValidateUpdateTimer=function(){

	++this._timerSeq;
	if( this._suspended ) return;
	
	var game=this;
	var seq=game._timerSeq;
	
	var maxUpdates=4;
	var updateRate=this._updateRate;
	
	if( !updateRate ){

		var reqAnimFrame=(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame);
	
		if( reqAnimFrame ){
			function animate(){
				if( seq!=game._timerSeq ) return;
	
				game.UpdateGame();
				if( seq!=game._timerSeq ) return;
	
				reqAnimFrame( animate );
				game.RenderGame();
			}
			reqAnimFrame( animate );
			return;
		}
		
		maxUpdates=1;
		updateRate=60;
	}
	
	var updatePeriod=1000.0/updateRate;
	var nextUpdate=0;

	function timeElapsed(){
		if( seq!=game._timerSeq ) return;
		
		if( !nextUpdate ) nextUpdate=Date.now();
		
		for( var i=0;i<maxUpdates;++i ){
		
			game.UpdateGame();
			if( seq!=game._timerSeq ) return;
			
			nextUpdate+=updatePeriod;
			var delay=nextUpdate-Date.now();
			
			if( delay>0 ){
				setTimeout( timeElapsed,delay );
				game.RenderGame();
				return;
			}
		}
		nextUpdate=0;
		setTimeout( timeElapsed,0 );
		game.RenderGame();
	}

	setTimeout( timeElapsed,0 );
}

//***** BBGame methods *****

BBHtml5Game.prototype.SetUpdateRate=function( updateRate ){

	BBGame.prototype.SetUpdateRate.call( this,updateRate );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.GetMetaData=function( path,key ){
	if( path.indexOf( "monkey://data/" )!=0 ) return "";
	path=path.slice(14);

	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

BBHtml5Game.prototype.PathToUrl=function( path ){
	if( path.indexOf( "monkey:" )!=0 ){
		return path;
	}else if( path.indexOf( "monkey://data/" )==0 ) {
		return "data/"+path.slice( 14 );
	}
	return "";
}

BBHtml5Game.prototype.GetLoading=function(){
	return this._loading;
}

BBHtml5Game.prototype.IncLoading=function(){
	++this._loading;
	return this._loading;
}

BBHtml5Game.prototype.DecLoading=function(){
	--this._loading;
	return this._loading;
}

BBHtml5Game.prototype.GetCanvas=function(){
	return this._canvas;
}

BBHtml5Game.prototype.GetWebGL=function(){
	return this._gl;
}

BBHtml5Game.prototype.GetDeviceWidth=function(){
	return this._canvas.width;
}

BBHtml5Game.prototype.GetDeviceHeight=function(){
	return this._canvas.height;
}

//***** INTERNAL *****

BBHtml5Game.prototype.UpdateGame=function(){

	if( !this._loading ) BBGame.prototype.UpdateGame.call( this );
}

BBHtml5Game.prototype.SuspendGame=function(){

	BBGame.prototype.SuspendGame.call( this );
	
	BBGame.prototype.RenderGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.ResumeGame=function(){

	BBGame.prototype.ResumeGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.Run=function(){

	var game=this;
	var canvas=game._canvas;
	
	var xscale=1;
	var yscale=1;
	
	var touchIds=new Array( 32 );
	for( i=0;i<32;++i ) touchIds[i]=-1;
	
	function eatEvent( e ){
		if( e.stopPropagation ){
			e.stopPropagation();
			e.preventDefault();
		}else{
			e.cancelBubble=true;
			e.returnValue=false;
		}
	}
	
	function keyToChar( key ){
		switch( key ){
		case 8:case 9:case 13:case 27:case 32:return key;
		case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 45:return key|0x10000;
		case 46:return 127;
		}
		return 0;
	}
	
	function mouseX( e ){
		var x=e.clientX+document.body.scrollLeft;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}
	
	function mouseY( e ){
		var y=e.clientY+document.body.scrollTop;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}

	function touchX( touch ){
		var x=touch.pageX;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}			
	
	function touchY( touch ){
		var y=touch.pageY;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}
	
	canvas.onkeydown=function( e ){
		game.KeyEvent( BBGameEvent.KeyDown,e.keyCode );
		var chr=keyToChar( e.keyCode );
		if( chr ) game.KeyEvent( BBGameEvent.KeyChar,chr );
		if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<122) ) eatEvent( e );
	}

	canvas.onkeyup=function( e ){
		game.KeyEvent( BBGameEvent.KeyUp,e.keyCode );
	}

	canvas.onkeypress=function( e ){
		if( e.charCode ){
			game.KeyEvent( BBGameEvent.KeyChar,e.charCode );
		}else if( e.which ){
			game.KeyEvent( BBGameEvent.KeyChar,e.which );
		}
	}

	canvas.onmousedown=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseDown,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseDown,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseDown,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmouseup=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmousemove=function( e ){
		game.MouseEvent( BBGameEvent.MouseMove,-1,mouseX(e),mouseY(e) );
		eatEvent( e );
	}

	canvas.onmouseout=function( e ){
		game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );
		eatEvent( e );
	}
	
	canvas.onclick=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		eatEvent( e );
		return;
	}
	
	canvas.oncontextmenu=function( e ){
		return false;
	}
	
	canvas.ontouchstart=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=-1 ) continue;
				touchIds[j]=touch.identifier;
				game.TouchEvent( BBGameEvent.TouchDown,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchmove=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				game.TouchEvent( BBGameEvent.TouchMove,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchend=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				touchIds[j]=-1;
				game.TouchEvent( BBGameEvent.TouchUp,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	window.ondevicemotion=function( e ){
		var tx=e.accelerationIncludingGravity.x/9.81;
		var ty=e.accelerationIncludingGravity.y/9.81;
		var tz=e.accelerationIncludingGravity.z/9.81;
		var x,y;
		switch( window.orientation ){
		case   0:x=+tx;y=-ty;break;
		case 180:x=-tx;y=+ty;break;
		case  90:x=-ty;y=-tx;break;
		case -90:x=+ty;y=+tx;break;
		}
		game.MotionEvent( BBGameEvent.MotionAccel,0,x,y,tz );
		eatEvent( e );
	}

	canvas.onfocus=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.ResumeGame();
		}else{
			game.ValidateUpdateTimer();
		}
	}
	
	canvas.onblur=function( e ){
		for( var i=0;i<256;++i ) game.KeyEvent( BBGameEvent.KeyUp,i );
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.SuspendGame();
		}
	}

	canvas.updateSize=function(){
		xscale=canvas.width/canvas.clientWidth;
		yscale=canvas.height/canvas.clientHeight;
		game.RenderGame();
	}
	
	canvas.updateSize();
	
	canvas.focus();
	
	game.StartGame();
	
	game.RenderGame();
}


function BBMonkeyGame( canvas ){
	BBHtml5Game.call( this,canvas );
}

BBMonkeyGame.prototype=extend_class( BBHtml5Game );

BBMonkeyGame.Main=function( canvas ){

	var game=new BBMonkeyGame( canvas );

	try{

		bbInit();
		bbMain();

	}catch( ex ){
	
		game.Die( ex );
		return;
	}

	if( !game.Delegate() ) return;
	
	game.Run();
}


// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

// ***** gxtkGraphics class *****

function gxtkGraphics(){
	this.game=BBHtml5Game.Html5Game();
	this.canvas=this.game.GetCanvas()
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	this.gl=null;
	this.gc=this.canvas.getContext( '2d' );
	this.tmpCanvas=null;
	this.r=255;
	this.b=255;
	this.g=255;
	this.white=true;
	this.color="rgb(255,255,255)"
	this.alpha=1;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	if( !this.gc ) return 0;
	this.gc.save();
	if( this.game.GetLoading() ) return 2;
	return 1;
}

gxtkGraphics.prototype.EndRender=function(){
	if( this.gc ) this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var game=this.game;

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	game.IncLoading();

	var image=new Image();
	image.onload=function(){ game.DecLoading(); }
	image.onerror=function(){ game.DecLoading(); }
	image.meta_width=parseInt( game.GetMetaData( path,"width" ) );
	image.meta_height=parseInt( game.GetMetaData( path,"height" ) );
	image.src=game.PathToUrl( path );

	return new gxtkSurface( image,this );
}

gxtkGraphics.prototype.CreateSurface=function( width,height ){
	var canvas=document.createElement( 'canvas' );
	
	canvas.width=width;
	canvas.height=height;
	canvas.meta_width=width;
	canvas.meta_height=height;
	canvas.complete=true;
	
	var surface=new gxtkSurface( canvas,this );
	
	surface.gc=canvas.getContext( '2d' );
	
	return surface;
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.r=r;
	this.g=g;
	this.b=b;
	this.white=(r==255 && g==255 && b==255);
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;	
	this.gc.globalAlpha=this.alpha;	
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.DrawPoint=function( x,y ){
	if( this.tformed ){
		var px=x;
		x=px * this.ix + y * this.jx + this.tx;
		y=px * this.iy + y * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
		this.gc.fillRect( x,y,1,1 );
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
		this.gc.fillRect( x,y,1,1 );
	}
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
	if( this.tformed ){
		var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
		var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
		var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
		var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1_t,y1_t );
	  	this.gc.lineTo( x2_t,y2_t );
	  	this.gc.stroke();
	  	this.gc.closePath();
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1,y1 );
	  	this.gc.lineTo( x2,y2 );
	  	this.gc.stroke();
	  	this.gc.closePath();
	}
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
  	var w2=w/2,h2=h/2;
	this.gc.save();
	this.gc.translate( x+w2,y+h2 );
	this.gc.scale( w2,h2 );
  	this.gc.beginPath();
	this.gc.arc( 0,0,1,0,Math.PI*2,false );
	this.gc.fill();
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawPoly=function( verts ){
	if( verts.length<2 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=2;i<verts.length;i+=2 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawPoly2=function( verts,surface,srx,srcy ){
	if( verts.length<4 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=4;i<verts.length;i+=4 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( !surface.image.complete ) return;
	
	if( this.white ){
		this.gc.drawImage( surface.image,x,y );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,0,0,surface.swidth,surface.sheight );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( !surface.image.complete ) return;

	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;

	if( this.white ){
		this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,srcx,srcy,srcw,srch  );
}

gxtkGraphics.prototype.DrawImageTinted=function( image,dx,dy,sx,sy,sw,sh ){

	if( !this.tmpCanvas ){
		this.tmpCanvas=document.createElement( "canvas" );
	}

	if( sw>this.tmpCanvas.width || sh>this.tmpCanvas.height ){
		this.tmpCanvas.width=Math.max( sw,this.tmpCanvas.width );
		this.tmpCanvas.height=Math.max( sh,this.tmpCanvas.height );
	}
	
	var tmpGC=this.tmpCanvas.getContext( "2d" );
	tmpGC.globalCompositeOperation="copy";
	
	tmpGC.drawImage( image,sx,sy,sw,sh,0,0,sw,sh );
	
	var imgData=tmpGC.getImageData( 0,0,sw,sh );
	
	var p=imgData.data,sz=sw*sh*4,i;
	
	for( i=0;i<sz;i+=4 ){
		p[i]=p[i]*this.r/255;
		p[i+1]=p[i+1]*this.g/255;
		p[i+2]=p[i+2]*this.b/255;
	}
	
	tmpGC.putImageData( imgData,0,0 );
	
	this.gc.drawImage( this.tmpCanvas,0,0,sw,sh,dx,dy,sw,sh );
}

gxtkGraphics.prototype.ReadPixels=function( pixels,x,y,width,height,offset,pitch ){

	var imgData=this.gc.getImageData( x,y,width,height );
	
	var p=imgData.data,i=0,j=offset,px,py;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			pixels[j++]=(p[i+3]<<24)|(p[i]<<16)|(p[i+1]<<8)|p[i+2];
			i+=4;
		}
		j+=pitch-width;
	}
}

gxtkGraphics.prototype.WritePixels2=function( surface,pixels,x,y,width,height,offset,pitch ){

	if( !surface.gc ){
		if( !surface.image.complete ) return;
		var canvas=document.createElement( "canvas" );
		canvas.width=surface.swidth;
		canvas.height=surface.sheight;
		surface.gc=canvas.getContext( "2d" );
		surface.gc.globalCompositeOperation="copy";
		surface.gc.drawImage( surface.image,0,0 );
		surface.image=canvas;
	}

	var imgData=surface.gc.createImageData( width,height );

	var p=imgData.data,i=0,j=offset,px,py,argb;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			argb=pixels[j++];
			p[i]=(argb>>16) & 0xff;
			p[i+1]=(argb>>8) & 0xff;
			p[i+2]=argb & 0xff;
			p[i+3]=(argb>>24) & 0xff;
			i+=4;
		}
		j+=pitch-width;
	}
	
	surface.gc.putImageData( imgData,x,y );
}

// ***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

// ***** GXTK API *****

gxtkSurface.prototype.Discard=function(){
	if( this.image ){
		this.image=null;
	}
}

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.image.complete;
}

gxtkSurface.prototype.OnUnsafeLoadComplete=function(){
}

if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

//print( "Using WebAudio!" );

// ***** WebAudio *****

var wa=null;

// ***** WebAudio gxtkSample *****

var gxtkSample=function(){
	this.waBuffer=null;
	this.state=0;
}

gxtkSample.prototype.Load=function( path ){
	if( this.state ) return false;

	var req=new XMLHttpRequest();
	
	req.open( "get",BBGame.Game().PathToUrl( path ),true );
	req.responseType="arraybuffer";
	
	var abuf=this;
	
	req.onload=function(){
		wa.decodeAudioData( req.response,function( buffer ){
			//success!
			abuf.waBuffer=buffer;
			abuf.state=1;
		},function(){
			abuf.state=-1;
		} );
	}
	
	req.onerror=function(){
		abuf.state=-1;
	}
	
	req.send();
	
	this.state=2;
			
	return true;
}

gxtkSample.prototype.Discard=function(){
}

// ***** WebAudio gxtkChannel *****

var gxtkChannel=function(){
	this.buffer=null;
	this.flags=0;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.waSource=null;
	this.waPan=wa.create
	this.waGain=wa.createGain();
	this.waGain.connect( wa.destination );
	this.waPanner=wa.createPanner();
	this.waPanner.rolloffFactor=0;
	this.waPanner.panningModel="equalpower";
	this.waPanner.connect( this.waGain );
	this.startTime=0;
	this.offset=0;
	this.state=0;
}

// ***** WebAudio gxtkAudio *****

var gxtkAudio=function(){

	if( !wa ){
		window.AudioContext=window.AudioContext || window.webkitAudioContext;
		wa=new AudioContext();
	}
	
	this.okay=true;
	this.music=null;
	this.musicState=0;
	this.musicVolume=1;
	this.channels=new Array();
	for( var i=0;i<32;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.Suspend=function(){
	if( this.MusicState()==1 ) this.music.pause();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=1 ) continue;
		this.PauseChannel( i );
		chan.state=5;
	}
}

gxtkAudio.prototype.Resume=function(){
	if( this.MusicState()==1 ) this.music.play();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=5 ) continue;
		chan.state=2;
		this.ResumeChannel( i );
	}
}

gxtkAudio.prototype.LoadSample=function( path ){

	var sample=new gxtkSample();
	if( !sample.Load( BBHtml5Game.Html5Game().PathToUrl( path ) ) ) return null;
	
	return sample;
}

gxtkAudio.prototype.PlaySample=function( buffer,channel,flags ){

	if( buffer.state!=1 ) return;

	var chan=this.channels[channel];
	
	if( chan.state ){
		chan.waSource.onended=null
		chan.waSource.stop( 0 );
	}
	
	chan.buffer=buffer;
	chan.flags=flags;

	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}

	chan.offset=0;	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0 );

	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){

	var chan=this.channels[channel];
	if( !chan.state ) return;
	
	if( chan.state==1 ){
		chan.waSource.onended=null;
		chan.waSource.stop( 0 );
		chan.waSource=null;
	}

	chan.state=0;
}

gxtkAudio.prototype.PauseChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=1 ) return;
	
	chan.offset=(chan.offset+(wa.currentTime-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
	
	chan.waSource.onended=null;
	chan.waSource.stop( 0 );
	chan.waSource=null;
	
	chan.state=2;
}

gxtkAudio.prototype.ResumeChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=2 ) return;
	
	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=chan.buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(chan.flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}
	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0,chan.offset );

	chan.state=1;
}

gxtkAudio.prototype.ChannelState=function( channel ){
	return this.channels[channel].state & 3;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];

	chan.volume=volume;
	
	chan.waGain.gain.value=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];

	chan.pan=pan;
	
	var sin=Math.sin( pan*3.14159265359/2 );
	var cos=Math.cos( pan*3.14159265359/2 );
	
	chan.waPanner.setPosition( sin,0,-cos );
}

gxtkAudio.prototype.SetRate=function( channel,rate ){

	var chan=this.channels[channel];

	if( chan.state==1 ){
		//update offset for pause/resume
		var time=wa.currentTime;
		chan.offset=(chan.offset+(time-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
		chan.startTime=time;
	}

	chan.rate=rate;
	
	if( chan.waSource ) chan.waSource.playbackRate.value=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	if( this.musicState ) this.music.pause();
	this.music=new Audio( BBGame.Game().PathToUrl( path ) );
	this.music.loop=(flags&1)!=0;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.StopMusic=function(){
	if( !this.musicState ) return;
	this.music.pause();
	this.music=null;
	this.musicState=0;
}

gxtkAudio.prototype.PauseMusic=function(){
	if( this.musicState!=1 ) return;
	this.music.pause();
	this.musicState=2;
}

gxtkAudio.prototype.ResumeMusic=function(){
	if( this.musicState!=2 ) return;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.MusicState=function(){
	if( this.musicState==1 && this.music.ended && !this.music.loop ){
		this.music=null;
		this.musicState=0;
	}
	return this.musicState;
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.musicVolume=volume;
	if( this.musicState ) this.music.volume=volume;
}

}else{

//print( "Using OldAudio!" );

// ***** gxtkChannel class *****

var gxtkChannel=function(){
	this.sample=null;
	this.audio=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.flags=0;
	this.state=0;
}

// ***** gxtkAudio class *****

var gxtkAudio=function(){
	this.game=BBHtml5Game.Html5Game();
	this.okay=typeof(Audio)!="undefined";
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
		if( !this.okay ) this.channels[i].state=-1;
	}
}

gxtkAudio.prototype.Suspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ){
			if( chan.audio.ended && !chan.audio.loop ){
				chan.state=0;
			}else{
				chan.audio.pause();
				chan.state=3;
			}
		}
	}
}

gxtkAudio.prototype.Resume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==3 ){
			chan.audio.play();
			chan.state=1;
		}
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	if( !this.okay ) return null;

	var audio=new Audio( this.game.PathToUrl( path ) );
	if( !audio ) return null;
	
	return new gxtkSample( audio );
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;
	
	var chan=this.channels[channel];

	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
	
	for( var i=0;i<33;++i ){
		var chan2=this.channels[i];
		if( chan2.state==1 && chan2.audio.ended && !chan2.audio.loop ) chan.state=0;
		if( chan2.state==0 && chan2.sample ){
			chan2.sample.FreeAudio( chan2.audio );
			chan2.sample=null;
			chan2.audio=null;
		}
	}

	var audio=sample.AllocAudio();
	if( !audio ) return;

	audio.loop=(flags&1)!=0;
	audio.volume=chan.volume;
	audio.play();

	chan.sample=sample;
	chan.audio=audio;
	chan.flags=flags;
	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
}

gxtkAudio.prototype.PauseChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==1 ){
		if( chan.audio.ended && !chan.audio.loop ){
			chan.state=0;
		}else{
			chan.audio.pause();
			chan.state=2;
		}
	}
}

gxtkAudio.prototype.ResumeChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==2 ){
		chan.audio.play();
		chan.state=1;
	}
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.state==1 && chan.audio.ended && !chan.audio.loop ) chan.state=0;
	if( chan.state==3 ) return 1;
	return chan.state;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.state>0 ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	this.StopMusic();
	
	this.music=this.LoadSample( path );
	if( !this.music ) return;
	
	this.PlaySample( this.music,32,flags );
}

gxtkAudio.prototype.StopMusic=function(){
	this.StopChannel( 32 );

	if( this.music ){
		this.music.Discard();
		this.music=null;
	}
}

gxtkAudio.prototype.PauseMusic=function(){
	this.PauseChannel( 32 );
}

gxtkAudio.prototype.ResumeMusic=function(){
	this.ResumeChannel( 32 );
}

gxtkAudio.prototype.MusicState=function(){
	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.SetVolume( 32,volume );
}

// ***** gxtkSample class *****

//function gxtkSample( audio ){
var gxtkSample=function( audio ){
	this.audio=audio;
	this.free=new Array();
	this.insts=new Array();
}

gxtkSample.prototype.FreeAudio=function( audio ){
	this.free.push( audio );
}

gxtkSample.prototype.AllocAudio=function(){
	var audio;
	while( this.free.length ){
		audio=this.free.pop();
		try{
			audio.currentTime=0;
			return audio;
		}catch( ex ){
//			print( "AUDIO ERROR1!" );
		}
	}
	
	//Max out?
	if( this.insts.length==8 ) return null;
	
	audio=new Audio( this.audio.src );
	
	//yucky loop handler for firefox!
	//
	audio.addEventListener( 'ended',function(){
		if( this.loop ){
			try{
				this.currentTime=0;
				this.play();
			}catch( ex ){
//				print( "AUDIO ERROR2!" );
			}
		}
	},false );

	this.insts.push( audio );
	return audio;
}

gxtkSample.prototype.Discard=function(){
}

}


function BBThread(){
	this.result=null;
	this.running=false;
}

BBThread.prototype.Start=function(){
	this.result=null;
	this.running=true;
	this.Run__UNSAFE__();
}

BBThread.prototype.IsRunning=function(){
	return this.running;
}

BBThread.prototype.Result=function(){
	return this.result;
}

BBThread.prototype.Run__UNSAFE__=function(){
	this.running=false;
}


function BBAsyncImageLoaderThread(){
	this._running=false;
}

BBAsyncImageLoaderThread.prototype.Start=function(){

	var thread=this;

	thread._surface=null;
	thread._result=false;
	thread._running=true;

	var image=new Image();

	image.onload=function( e ){
		image.meta_width=image.width;
		image.meta_height=image.height;
		thread._surface=new gxtkSurface( image,thread._device )
		thread._result=true;
		thread._running=false;
	}
	
	image.onerror=function( e ){
		thread._running=false;
	}
	
	image.src=BBGame.Game().PathToUrl( thread._path );
}

BBAsyncImageLoaderThread.prototype.IsRunning=function(){
	return this._running;
}



function BBAsyncSoundLoaderThread(){
	this._running=false;
}
  
if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	var req=new XMLHttpRequest();
	req.open( "get",BBGame.Game().PathToUrl( this._path ),true );
	req.responseType="arraybuffer";
	
	req.onload=function(){
		//load success!
		wa.decodeAudioData( req.response,function( buffer ){
			//decode success!
			thread._sample=new gxtkSample();
			thread._sample.waBuffer=buffer;
			thread._sample.state=1;
			thread._result=true;
			thread._running=false;
		},function(){	
			//decode fail!
			thread._running=false;
		} );
	}
	
	req.onerror=function(){
		//load fail!
		thread._running=false;
	}
	
	req.send();
}
	
}else{
 
BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var audio=new Audio();
	if( !audio ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	audio.src=BBGame.Game().PathToUrl( this._path );
	audio.preload='auto';	
	
	var success=function( e ){
		thread._sample=new gxtkSample( audio );
		thread._result=true;
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	var error=function( e ){
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	audio.addEventListener( 'canplaythrough',success,false );
	audio.addEventListener( 'error',error,false );
	
	//voodoo fix for Chrome!
	var timer=setInterval( function(){ if( !thread._running ) clearInterval( timer ); },200 );
	
	audio.load();
}

}
  
BBAsyncSoundLoaderThread.prototype.IsRunning=function(){
	return this._running;
}

var lazeng = new Object();

lazeng.systemMillisecs=function()
{
	return new Date().getTime();
};


function BBDataBuffer(){
	this.arrayBuffer=null;
	this.length=0;
}

BBDataBuffer.tbuf=new ArrayBuffer(4);
BBDataBuffer.tbytes=new Int8Array( BBDataBuffer.tbuf );
BBDataBuffer.tshorts=new Int16Array( BBDataBuffer.tbuf );
BBDataBuffer.tints=new Int32Array( BBDataBuffer.tbuf );
BBDataBuffer.tfloats=new Float32Array( BBDataBuffer.tbuf );

BBDataBuffer.prototype._Init=function( buffer ){
	this.arrayBuffer=buffer;
	this.length=buffer.byteLength;
	this.bytes=new Int8Array( buffer );	
	this.shorts=new Int16Array( buffer,0,this.length/2 );	
	this.ints=new Int32Array( buffer,0,this.length/4 );	
	this.floats=new Float32Array( buffer,0,this.length/4 );
}

BBDataBuffer.prototype._New=function( length ){
	if( this.arrayBuffer ) return false;
	
	var buf=new ArrayBuffer( length );
	if( !buf ) return false;
	
	this._Init( buf );
	return true;
}

BBDataBuffer.prototype._Load=function( path ){
	if( this.arrayBuffer ) return false;
	
	var buf=BBGame.Game().LoadData( path );
	if( !buf ) return false;
	
	this._Init( buf );
	return true;
}

BBDataBuffer.prototype._LoadAsync=function( path,thread ){

	var buf=this;
	
	var xhr=new XMLHttpRequest();
	xhr.open( "GET",BBGame.Game().PathToUrl( path ),true );
	xhr.responseType="arraybuffer";
	
	xhr.onload=function(e){
		if( this.status==200 || this.status==0 ){
			buf._Init( xhr.response );
			thread.result=buf;
		}
		thread.running=false;
	}
	
	xhr.onerror=function(e){
		thread.running=false;
	}
	
	xhr.send();
}


BBDataBuffer.prototype.GetArrayBuffer=function(){
	return this.arrayBuffer;
}

BBDataBuffer.prototype.Length=function(){
	return this.length;
}

BBDataBuffer.prototype.Discard=function(){
	if( this.arrayBuffer ){
		this.arrayBuffer=null;
		this.length=0;
	}
}

BBDataBuffer.prototype.PokeByte=function( addr,value ){
	this.bytes[addr]=value;
}

BBDataBuffer.prototype.PokeShort=function( addr,value ){
	if( addr&1 ){
		BBDataBuffer.tshorts[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		return;
	}
	this.shorts[addr>>1]=value;
}

BBDataBuffer.prototype.PokeInt=function( addr,value ){
	if( addr&3 ){
		BBDataBuffer.tints[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		this.bytes[addr+2]=BBDataBuffer.tbytes[2];
		this.bytes[addr+3]=BBDataBuffer.tbytes[3];
		return;
	}
	this.ints[addr>>2]=value;
}

BBDataBuffer.prototype.PokeFloat=function( addr,value ){
	if( addr&3 ){
		BBDataBuffer.tfloats[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		this.bytes[addr+2]=BBDataBuffer.tbytes[2];
		this.bytes[addr+3]=BBDataBuffer.tbytes[3];
		return;
	}
	this.floats[addr>>2]=value;
}

BBDataBuffer.prototype.PeekByte=function( addr ){
	return this.bytes[addr];
}

BBDataBuffer.prototype.PeekShort=function( addr ){
	if( addr&1 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		return BBDataBuffer.tshorts[0];
	}
	return this.shorts[addr>>1];
}

BBDataBuffer.prototype.PeekInt=function( addr ){
	if( addr&3 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		BBDataBuffer.tbytes[2]=this.bytes[addr+2];
		BBDataBuffer.tbytes[3]=this.bytes[addr+3];
		return BBDataBuffer.tints[0];
	}
	return this.ints[addr>>2];
}

BBDataBuffer.prototype.PeekFloat=function( addr ){
	if( addr&3 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		BBDataBuffer.tbytes[2]=this.bytes[addr+2];
		BBDataBuffer.tbytes[3]=this.bytes[addr+3];
		return BBDataBuffer.tfloats[0];
	}
	return this.floats[addr>>2];
}


function BBStream(){
}

BBStream.prototype.Eof=function(){
	return 0;
}

BBStream.prototype.Close=function(){
}

BBStream.prototype.Length=function(){
	return 0;
}

BBStream.prototype.Position=function(){
	return 0;
}

BBStream.prototype.Seek=function( position ){
	return 0;
}

BBStream.prototype.Read=function( buffer,offset,count ){
	return 0;
}

BBStream.prototype.Write=function( buffer,offset,count ){
	return 0;
}

function c_App(){
	Object.call(this);
}
c_App.m_new=function(){
	if((bb_app__app)!=null){
		error("App has already been created");
	}
	bb_app__app=this;
	bb_app__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	bb_app__game.SetDelegate(bb_app__delegate);
	return this;
}
c_App.prototype.p_OnResize=function(){
	return 0;
}
c_App.prototype.p_OnCreate=function(){
	return 0;
}
c_App.prototype.p_OnSuspend=function(){
	return 0;
}
c_App.prototype.p_OnResume=function(){
	return 0;
}
c_App.prototype.p_OnUpdate=function(){
	return 0;
}
c_App.prototype.p_OnLoading=function(){
	return 0;
}
c_App.prototype.p_OnRender=function(){
	return 0;
}
c_App.prototype.p_OnClose=function(){
	bb_app_EndApp();
	return 0;
}
c_App.prototype.p_OnBack=function(){
	this.p_OnClose();
	return 0;
}
function c_LD38(){
	c_App.call(this);
	this.m_timeUntilNextAction=[];
	this.m_baseHammerPositionsX=[];
	this.m_hammerScales=null;
	this.m_hammerFrames=null;
	this.m_hammerMids=null;
	this.m_perlinGenerator=null;
	this.m_midiblaster=null;
	this.m_resolution=null;
	this.m_assetManager=null;
	this.m_controller=null;
	this.m_camera=null;
	this.m_player=null;
	this.m_currentUpdate=0;
	this.m_playerState=1;
	this.m_menu=c_UIMenu.m_new.call(new c_UIMenu);
	this.m_currentSong="";
	this.m_hammerStack=c_Stack8.m_new.call(new c_Stack8);
	this.m_playerScore=0;
	this.m_firstPrint=true;
}
c_LD38.prototype=extend_class(c_App);
c_LD38.m_new=function(){
	c_App.m_new.call(this);
	return this;
}
c_LD38.m_Data=null;
c_LD38.prototype.p_InitTitleScreen=function(){
	this.m_player.m_position.p_x(890.0);
	this.m_player.m_position.p_y(560.0);
	this.m_player.m_sprite.p_SetAnimation("idle");
	bb_ld38_2_gameMode=0;
	return 0;
}
c_LD38.prototype.p_OnCreate=function(){
	bb_ld38_2_gameMode=0;
	for(var t_idx=0;t_idx<24;t_idx=t_idx+1){
		this.m_timeUntilNextAction[t_idx]=1000000;
		this.m_baseHammerPositionsX[t_idx]=29+60*t_idx;
	}
	this.m_hammerScales=c_FloatStack.m_new2.call(new c_FloatStack);
	this.m_hammerFrames=c_IntStack.m_new2.call(new c_IntStack);
	this.m_hammerMids=c_FloatStack.m_new2.call(new c_FloatStack);
	bb_audio_SetChannelVolume(0,.8);
	bb_ld38_2_PauseFont=c_TFont.m_new.call(new c_TFont,"SupersonicRocketship.ttf",100,[0,0,0]);
	bb_ld38_2_ScoreFont=c_TFont.m_new.call(new c_TFont,"joystix monospace.ttf",40,[0,0,0]);
	bb_ld38_2_ScoreFontYellow=c_TFont.m_new.call(new c_TFont,"joystix monospace.ttf",40,[255,255,102]);
	bb_ld38_2_CreditsFont=c_TFont.m_new.call(new c_TFont,"SupersonicRocketship.ttf",40,[0,0,0]);
	bb_ld38_2_TitleFont=c_TFont.m_new.call(new c_TFont,"SupersonicRocketship.ttf",150,[255,255,102]);
	bb_ld38_2_InstructFont=c_TFont.m_new.call(new c_TFont,"SupersonicRocketship.ttf",30,[255,255,102]);
	bb_app_SetUpdateRate(60);
	this.m_perlinGenerator=c_Perlin.m_new.call(new c_Perlin);
	this.m_midiblaster=c_Midiblaster.m_new.call(new c_Midiblaster,60);
	bb_random_Seed=lazeng.systemMillisecs();
	this.m_resolution=c_Vector.m_new.call(new c_Vector,1440.0,900.0);
	bb_autofit_SetVirtualDisplay(((this.m_resolution.p_x2())|0),((this.m_resolution.p_y2())|0),1.0);
	this.m_assetManager=c_AssetManager.m_new.call(new c_AssetManager,false);
	c_LD38.m_Data=this;
	bb_ld38_2_LoadAllImages();
	this.m_controller=c_Controller.m_new.call(new c_Controller,0);
	this.m_camera=c_Camera.m_new.call(new c_Camera,c_Vector.m_new.call(new c_Vector,0.0,0.0),this.m_resolution);
	this.m_player=c_GameObject.m_new.call(new c_GameObject,bb_ld38_2_GetAssetManager().p_GetImage("sprBug2Test"),-50.0,-50.0,true,true);
	this.m_player.m_sprite.p_AddAnimation(c_Animation.m_new.call(new c_Animation,"idle",0,1,1));
	this.m_player.m_sprite.p_AddAnimation(c_Animation.m_new.call(new c_Animation,"blink",1,3,10));
	this.m_player.m_sprite.p_GetAnimation("blink").m_loop=false;
	this.m_player.m_sprite.p_AddAnimation(c_Animation.m_new.call(new c_Animation,"jump",5,3,30));
	this.m_player.m_sprite.p_GetAnimation("jump").m_loop=false;
	this.m_player.m_sprite.p_AddAnimation(c_Animation.m_new.call(new c_Animation,"inair",7,1,1));
	this.m_player.m_sprite.p_AddAnimation(c_Animation.m_new.call(new c_Animation,"dead",8,2,1));
	this.m_player.m_sprite.p_GetAnimation("dead").m_loop=false;
	this.m_player.m_sprite.p_SetAnimation("idle");
	this.p_InitTitleScreen();
	return 0;
}
c_LD38.prototype.p_ChangeState=function(t_state){
	if(t_state==1){
		this.m_playerState=1;
		this.m_player.m_sprite.p_SetAnimation("idle");
		this.m_player.m_velocity.p_x(0.0);
		this.m_player.m_velocity.p_y(0.0);
		this.m_player.m_acceleration.p_y(0.0);
	}else{
		if(t_state==4){
			this.m_playerState=4;
			this.m_player.m_sprite.p_SetAnimation("blink");
		}else{
			if(t_state==2){
				this.m_playerState=2;
				this.m_player.m_sprite.p_SetAnimation("jump");
				bb_audio_SetChannelVolume(1,.4);
				bb_audio_PlaySound(bb_ld38_2_GetAssetManager().p_GetSound("jump"),1,0);
				this.m_player.m_acceleration.p_y(1.0);
			}else{
				if(t_state==3){
					this.m_playerState=3;
					this.m_player.m_sprite.p_SetAnimation("inair");
				}else{
					if(t_state==5){
						this.m_playerState=5;
						this.m_player.m_sprite.p_SetAnimation("dead");
						this.m_player.m_velocity.p_x(0.0);
						this.m_player.m_velocity.p_y(0.0);
						this.m_player.m_acceleration.p_y(0.0);
					}
				}
			}
		}
	}
	return 0;
}
c_LD38.prototype.p_InitMainMenu=function(){
	var t_playButton=c_UIButton.m_new.call(new c_UIButton,200.0,200.0,false);
	t_playButton.m_text="Play!";
	t_playButton.p_SetSprite(c_Sprite.m_new.call(new c_Sprite,this.m_assetManager.p_GetImage("sprMenuButton"),true));
	var t_playCallback=c_PlayButtonCallBack.m_new.call(new c_PlayButtonCallBack);
	t_playButton.m_callBack=(t_playCallback);
	this.m_menu.p_AddButton(t_playButton);
	var t_bonusButton=c_UIButton.m_new.call(new c_UIButton,200.0,400.0,false);
	t_bonusButton.m_text="Bonus Songs!";
	t_bonusButton.p_SetSprite(c_Sprite.m_new.call(new c_Sprite,this.m_assetManager.p_GetImage("sprMenuButton"),true));
	var t_bonusCallback=c_BonusButtonCallBack.m_new.call(new c_BonusButtonCallBack);
	t_bonusButton.m_callBack=(t_bonusCallback);
	this.m_menu.p_AddButton(t_bonusButton);
	var t_creditsButton=c_UIButton.m_new.call(new c_UIButton,200.0,600.0,false);
	t_creditsButton.m_text="Credits!";
	t_creditsButton.p_SetSprite(c_Sprite.m_new.call(new c_Sprite,this.m_assetManager.p_GetImage("sprMenuButton"),true));
	var t_creditsCallback=c_CreditsButtonCallBack.m_new.call(new c_CreditsButtonCallBack);
	t_creditsButton.m_callBack=(t_creditsCallback);
	this.m_menu.p_AddButton(t_creditsButton);
	bb_ld38_2_gameMode=1;
	return 0;
}
c_LD38.prototype.p_PlayerNote=function(){
	return this.m_midiblaster.m_startNote+((this.m_player.m_position.p_x2()/60.0)|0);
}
c_LD38.prototype.p_InitPauseMenu=function(){
	var t_pauseButton=c_UIButton.m_new.call(new c_UIButton,600.0,300.0,false);
	t_pauseButton.m_text="Quit to menu";
	t_pauseButton.p_SetSprite(c_Sprite.m_new.call(new c_Sprite,this.m_assetManager.p_GetImage("sprMenuButton"),true));
	var t_pauseCallback=c_QuitToMenuButtonCallBack.m_new.call(new c_QuitToMenuButtonCallBack);
	t_pauseButton.m_callBack=(t_pauseCallback);
	this.m_menu.p_AddButton(t_pauseButton);
	return 0;
}
c_LD38.prototype.p_InitHammers=function(){
	this.m_hammerStack.p_Clear();
	for(var t_idx=0;t_idx<24;t_idx=t_idx+1){
		this.m_hammerStack.p_Push10(c_GameObject.m_new.call(new c_GameObject,bb_ld38_2_GetAssetManager().p_GetImage("sprHammer"),(this.m_baseHammerPositionsX[t_idx]),200.0,true,true));
		this.m_hammerStack.p_Get(t_idx).m_sprite.p_AddAnimation(c_Animation.m_new.call(new c_Animation,"1",0,1,1));
		this.m_hammerStack.p_Get(t_idx).m_sprite.p_AddAnimation(c_Animation.m_new.call(new c_Animation,"2",0,1,1));
		this.m_hammerStack.p_Get(t_idx).m_sprite.p_AddAnimation(c_Animation.m_new.call(new c_Animation,"3",0,1,1));
		this.m_hammerStack.p_Get(t_idx).m_sprite.p_AddAnimation(c_Animation.m_new.call(new c_Animation,"4",0,1,1));
		this.m_timeUntilNextAction[t_idx]=1000000;
	}
	return 0;
}
c_LD38.prototype.p_OnUpdate=function(){
	if(bb_ld38_2_gameMode==0){
		this.m_controller.p_Update();
		this.m_player.p_Update();
		this.m_currentUpdate=this.m_currentUpdate+1;
		if(this.m_playerState==1 && this.m_currentUpdate % 360==0){
			this.p_ChangeState(2);
		}else{
			if(this.m_playerState==1 && this.m_currentUpdate % 120==0){
				this.p_ChangeState(4);
			}
		}
		if(this.m_playerState==4 && this.m_player.m_sprite.m_currentAnimation.p_FirstCycleCompleted()){
			this.p_ChangeState(1);
		}
		if(this.m_playerState==2 && this.m_player.m_sprite.m_currentAnimation.p_FirstCycleCompleted()){
			this.p_ChangeState(1);
		}
		this.m_player.m_acceleration.p_y(0.0);
		if(this.m_controller.p_JustPressed("Start") || ((bb_input_TouchHit(0))!=0)){
			bb_audio_StopMusic();
			bb_ld38_2_gameMode=1;
			this.p_InitMainMenu();
		}
	}else{
		if(bb_ld38_2_gameMode==7){
			this.m_controller.p_Update();
			if(this.m_controller.p_JustPressed("Start") || ((bb_input_TouchHit(0))!=0)){
				bb_ld38_2_gameMode=1;
				this.p_InitMainMenu();
			}
		}else{
			if(bb_ld38_2_gameMode==1){
				this.m_menu.p_Update();
				this.m_camera.p_Update();
			}else{
				if(bb_ld38_2_gameMode==2){
					this.m_controller.p_Update();
					this.m_currentUpdate=this.m_currentUpdate+1;
					if(this.m_currentUpdate==1){
						if(bb_audio_MusicState()==0){
							bb_audio_PlayMusic(this.m_currentSong+".mp3",1);
						}
					}
					var t_pressedLeft=this.m_controller.p_JustPressed("LEFT") || ((bb_input_TouchHit(0))!=0) && bb_autofit_VTouchX(0,true)<720.0;
					var t_pressedRight=this.m_controller.p_JustPressed("RIGHT") || ((bb_input_TouchHit(0))!=0) && bb_autofit_VTouchX(0,true)>720.0;
					if(this.m_playerState==1 || this.m_playerState==4){
						if(t_pressedLeft){
							if(!(this.p_PlayerNote()==this.m_midiblaster.m_startNote)){
								if(!(this.m_hammerStack.p_Get(this.p_PlayerNote()-1-this.m_midiblaster.m_startNote).m_position.p_y2()>700.0-this.m_player.p_Height())){
									this.p_ChangeState(2);
									this.m_player.m_acceleration.p_y(1.0);
									this.m_player.m_velocity.p_x(-6.0);
									this.m_player.m_velocity.p_y(-5.0);
								}else{
									bb_audio_PlaySound(bb_ld38_2_GetAssetManager().p_GetSound("bump"),0,0);
								}
							}else{
								bb_audio_PlaySound(bb_ld38_2_GetAssetManager().p_GetSound("bump"),0,0);
							}
							this.m_player.m_sprite.p_XScale(1.0);
						}else{
							if(t_pressedRight){
								if(!(this.p_PlayerNote()==this.m_midiblaster.m_startNote+23)){
									if(!(this.m_hammerStack.p_Get(this.p_PlayerNote()+1-this.m_midiblaster.m_startNote).m_position.p_y2()>700.0-this.m_player.p_Height())){
										this.p_ChangeState(2);
										this.m_player.m_acceleration.p_y(1.0);
										this.m_player.m_velocity.p_x(6.0);
										this.m_player.m_velocity.p_y(-5.0);
									}else{
										bb_audio_PlaySound(bb_ld38_2_GetAssetManager().p_GetSound("bump"),0,0);
									}
								}else{
									bb_audio_PlaySound(bb_ld38_2_GetAssetManager().p_GetSound("bump"),0,0);
								}
								this.m_player.m_sprite.p_XScale(-1.0);
							}
						}
					}
					this.m_player.p_Update();
					if((this.m_playerState==2 || this.m_playerState==3) && this.m_player.m_position.p_y2()+this.m_player.p_Height()/2.0>700.0){
						this.m_player.m_position.p_y(700.0-this.m_player.p_Height()/2.0);
						this.p_ChangeState(1);
					}
					if(this.m_playerState==4 && this.m_player.m_sprite.m_currentAnimation.p_FirstCycleCompleted()){
						this.p_ChangeState(1);
					}
					if(this.m_playerState==2 && this.m_player.m_sprite.m_currentAnimation.p_FirstCycleCompleted()){
						this.p_ChangeState(3);
					}
					if(this.m_playerState==1 && this.m_currentUpdate % 240==0){
						this.p_ChangeState(4);
					}
					if(this.m_playerState!=5){
						var t_winCounter=0;
						var t_=this.m_midiblaster.m_noteOnTimes.p_Keys().p_ObjectEnumerator();
						while(t_.p_HasNext()){
							var t_key=t_.p_NextObject();
							var t_idx=t_key-this.m_midiblaster.m_startNote;
							var t_noteOnStack=this.m_midiblaster.m_noteOnTimes.p_Get(t_key);
							var t_noteOffStack=this.m_midiblaster.m_noteOffTimes.p_Get(t_key);
							var t_thisHammer=this.m_hammerStack.p_Get(t_idx);
							if(!t_noteOnStack.p_IsEmpty()){
								this.m_timeUntilNextAction[t_idx]=t_noteOnStack.p_Top()-this.m_currentUpdate;
								if((this.m_timeUntilNextAction[t_idx])<=(700.0-t_thisHammer.m_position.p_y2())/40.0){
									t_thisHammer.m_velocity.p_y(40.0);
								}
								if(this.m_timeUntilNextAction[t_idx]<=0){
									t_noteOnStack.p_Pop();
								}
							}
							t_thisHammer.p_Update();
							if(!t_noteOffStack.p_IsEmpty()){
								if(t_noteOffStack.p_Top()==this.m_currentUpdate){
									t_thisHammer.m_velocity.p_y(-40.0);
									t_noteOffStack.p_Pop();
									this.m_playerScore=this.m_playerScore+1;
								}
							}else{
								t_winCounter=t_winCounter+1;
								if(t_winCounter==24){
									bb_ld38_2_gameMode=8;
								}
							}
							if(t_thisHammer.m_velocity.p_y2()>0.0){
								if(t_thisHammer.m_position.p_y2()>700.0){
									t_thisHammer.m_velocity.p_y(0.0);
									t_thisHammer.m_position.p_y(700.0-t_thisHammer.p_Height()/2.0);
								}
							}
							if(t_thisHammer.m_velocity.p_y2()<0.0){
								if(t_thisHammer.m_position.p_y2()<200.0){
									t_thisHammer.m_velocity.p_y(0.0);
									t_thisHammer.m_position.p_y(200.0);
								}
							}
							this.m_hammerFrames.p_Set3(t_idx,(((t_thisHammer.m_position.p_y2()-200.0)/500.0/.25)|0));
							this.m_hammerScales.p_Set2(t_idx,bb_math_Abs2(t_thisHammer.m_position.p_y2()-500.0)/100.0);
							this.m_hammerMids.p_Set2(t_idx,(t_thisHammer.m_position.p_y2()+500.0)/2.0);
						}
						var t_hammersToCheck=[];
						if(this.p_PlayerNote()==this.m_midiblaster.m_startNote){
							if(this.m_player.m_velocity.p_x2()>0.0){
								t_hammersToCheck=[1];
							}else{
								if(this.m_player.m_velocity.p_x2()==0.0){
									t_hammersToCheck=[0,1];
								}else{
									t_hammersToCheck=[0];
								}
							}
						}else{
							if(this.p_PlayerNote()==this.m_midiblaster.m_startNote+23){
								if(this.m_player.m_velocity.p_x2()>0.0){
									t_hammersToCheck=[23];
								}else{
									if(this.m_player.m_velocity.p_x2()==0.0){
										t_hammersToCheck=[22,23];
									}else{
										t_hammersToCheck=[22];
									}
								}
							}else{
								var t_midNote=this.p_PlayerNote()-this.m_midiblaster.m_startNote;
								if(this.m_player.m_velocity.p_x2()>0.0){
									t_hammersToCheck=[t_midNote,t_midNote+1];
								}else{
									if(this.m_player.m_velocity.p_x2()==0.0){
										t_hammersToCheck=[t_midNote-1,t_midNote,t_midNote+1];
									}else{
										t_hammersToCheck=[t_midNote-1,t_midNote];
									}
								}
							}
						}
						var t_2=t_hammersToCheck;
						var t_3=0;
						while(t_3<t_2.length){
							var t_hammerIdx=t_2[t_3];
							t_3=t_3+1;
							var t_thisHammer2=this.m_hammerStack.p_Get(t_hammerIdx);
							if(t_thisHammer2.m_velocity.p_y2()>0.0){
								if(t_thisHammer2.p_CollidesWith(this.m_player)){
									this.p_ChangeState(5);
									bb_audio_PauseMusic();
									bb_audio_StopMusic();
									this.m_player.m_position.p_x(t_thisHammer2.m_position.p_x2());
									this.m_player.m_position.p_y(665.0);
									t_thisHammer2.m_position.p_y(650.0);
									this.m_hammerScales.p_Set2(t_hammerIdx,bb_math_Abs2(t_thisHammer2.m_position.p_y2()-500.0)/100.0);
									this.m_hammerMids.p_Set2(t_hammerIdx,(t_thisHammer2.m_position.p_y2()+500.0)/2.0);
									t_thisHammer2.m_velocity.p_y(0.0);
									bb_audio_PlaySound(bb_ld38_2_GetAssetManager().p_GetSound("squish"),0,0);
								}
							}
						}
					}
					if(this.m_controller.p_JustPressed("START")){
						bb_audio_PauseMusic();
						bb_ld38_2_gameMode=4;
						this.p_InitPauseMenu();
					}
					if(this.m_playerState==5 && this.m_player.m_sprite.m_currentAnimation.p_FirstCycleCompleted()){
						bb_ld38_2_gameMode=6;
						bb_audio_PlaySound(bb_ld38_2_GetAssetManager().p_GetSound("gameover"),0,0);
					}
				}else{
					if(bb_ld38_2_gameMode==4){
						this.m_controller.p_Update();
						this.m_menu.p_Update();
						if(this.m_controller.p_JustPressed("START")){
							bb_ld38_2_gameMode=2;
							bb_audio_ResumeMusic();
						}
					}else{
						if(bb_ld38_2_gameMode==3){
							this.m_currentUpdate=this.m_currentUpdate+1;
							if(this.m_currentUpdate==1){
								this.m_midiblaster.p_Clear();
								this.m_midiblaster.p_ReadFile(this.m_currentSong+"sorted.csv");
								this.p_InitHammers();
							}
							if(this.m_currentUpdate>5){
								this.m_currentUpdate=0;
								bb_ld38_2_gameMode=2;
							}
						}else{
							if(bb_ld38_2_gameMode==6){
								if(this.m_controller.p_JustPressed("Start") || ((bb_input_TouchHit(0))!=0)){
									bb_ld38_2_gameMode=1;
									this.m_playerScore=0;
									this.p_InitMainMenu();
								}
							}else{
								if(bb_ld38_2_gameMode==8){
									bb_audio_StopMusic();
									if(this.m_controller.p_JustPressed("Start") || ((bb_input_TouchHit(0))!=0)){
										bb_ld38_2_gameMode=1;
										this.m_playerScore=0;
										this.p_InitMainMenu();
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return 0;
}
c_LD38.prototype.p_OnRender=function(){
	if(this.m_firstPrint){
		bb_ld38_2_PauseFont.p_DrawText("Test String",10,0,0,0,0,0);
		bb_ld38_2_ScoreFont.p_DrawText("Test String",10,0,0,0,0,0);
		this.m_firstPrint=false;
	}
	if(bb_ld38_2_gameMode==0){
		bb_autofit_UpdateVirtualDisplay(true,true);
		bb_graphics_Cls(123.0,123.0,255.0);
		this.m_camera.p_DrawStart();
		bb_graphics_DrawImage(bb_ld38_2_GetAssetManager().p_GetImage("titleScreen"),this.m_camera.p_Center().p_x2(),this.m_camera.p_Center().p_y2(),0);
		this.m_player.p_Render();
		bb_ld38_2_TitleFont.p_DrawText("EINE KLEINE",30,10,0,0,0,0);
		bb_ld38_2_TitleFont.p_DrawText("INSEKTMUSIK",30,160,0,0,0,0);
		bb_ld38_2_InstructFont.p_DrawText("TAP, CLICK, OR PRESS ENTER TO CONTINUE",30,850,0,0,0,0);
		this.m_camera.p_DrawEnd();
	}else{
		if(bb_ld38_2_gameMode==7){
			bb_autofit_UpdateVirtualDisplay(true,true);
			bb_graphics_Cls(123.0,123.0,255.0);
			this.m_camera.p_DrawStart();
			bb_graphics_DrawImage(bb_ld38_2_GetAssetManager().p_GetImage("titleScreenGS"),this.m_camera.p_Center().p_x2(),this.m_camera.p_Center().p_y2(),0);
			bb_ld38_2_CreditsFont.p_DrawText("David Lazar wrote some code ",30,30,0,0,0,0);
			bb_ld38_2_CreditsFont.p_DrawText("Brylee Treadway made some art",30,70,0,0,0,0);
			bb_ld38_2_CreditsFont.p_DrawText("Lucas Bishop made some sounds",30,110,0,0,0,0);
			bb_ld38_2_CreditsFont.p_DrawText("Danielle Lazar made some helps",30,150,0,0,0,0);
			bb_ld38_2_InstructFont.p_DrawText("TAP, CLICK, OR PRESS ENTER TO CONTINUE",30,850,0,0,0,0);
			this.m_camera.p_DrawEnd();
		}else{
			if(bb_ld38_2_gameMode==1){
				bb_autofit_UpdateVirtualDisplay(true,true);
				bb_graphics_Cls(123.0,123.0,255.0);
				this.m_camera.p_DrawStart();
				bb_graphics_DrawImage(bb_ld38_2_GetAssetManager().p_GetImage("titleScreenGS"),this.m_camera.p_Center().p_x2(),this.m_camera.p_Center().p_y2(),0);
				this.m_menu.p_Render();
				this.m_camera.p_DrawEnd();
			}else{
				if(bb_ld38_2_gameMode==2 || bb_ld38_2_gameMode==5){
					bb_autofit_UpdateVirtualDisplay(true,true);
					bb_graphics_Cls(123.0,123.0,255.0);
					bb_graphics_SetColor(255.0,255.0,255.0);
					this.m_camera.p_DrawStart();
					for(var t_idx=0;t_idx<24;t_idx=t_idx+1){
						bb_graphics_DrawImage(bb_ld38_2_GetAssetManager().p_GetImage("sprStringsBetter3"),(29+t_idx*60),350.0,0);
					}
					bb_graphics_DrawImage(bb_ld38_2_GetAssetManager().p_GetImage("sprHammerBar"),720.0,500.0,0);
					var t_hammerImage=bb_ld38_2_GetAssetManager().p_GetImage("sprHammer");
					var t_stickImage=bb_ld38_2_GetAssetManager().p_GetImage("sprHammerStick");
					for(var t_idx2=0;t_idx2<this.m_hammerStack.p_Length2();t_idx2=t_idx2+1){
						var t_thisHammer=this.m_hammerStack.p_Get(t_idx2);
						var t_xTemp=t_thisHammer.m_position.p_x2();
						var t_yTemp=t_thisHammer.m_position.p_y2();
						bb_graphics_DrawImage2(t_stickImage,t_thisHammer.m_position.p_x2(),this.m_hammerMids.p_Get(t_idx2),0.0,1.0,this.m_hammerScales.p_Get(t_idx2),0);
						if(this.m_timeUntilNextAction[t_idx2]<120 && this.m_timeUntilNextAction[t_idx2]>12){
							var t_magnitude=0.0;
							t_magnitude=60.0*Math.sin((1.6744186046511629*(this.m_timeUntilNextAction[t_idx2]))*D2R);
							t_xTemp=t_thisHammer.m_position.p_x2()+(this.m_perlinGenerator.p_OctaveNoise((bb_app_Millisecs())/20.0,1.0,1.0,4,3.0)-.5)*t_magnitude;
							t_yTemp=t_thisHammer.m_position.p_y2()+(this.m_perlinGenerator.p_OctaveNoise((bb_app_Millisecs())/10.0,1.0,1.0,4,3.0)-.5)*t_magnitude;
						}
						bb_graphics_DrawImage(t_hammerImage,t_xTemp,t_yTemp,this.m_hammerFrames.p_Get(t_idx2));
					}
					bb_graphics_SetColor(255.0,255.0,255.0);
					this.m_player.p_Render();
					this.m_camera.p_DrawEnd();
					bb_ld38_2_ScoreFont.p_DrawText(String(this.m_playerScore),1200,800,0,0,0,0);
				}else{
					if(bb_ld38_2_gameMode==4){
						bb_autofit_UpdateVirtualDisplay(true,true);
						bb_graphics_Cls(123.0,123.0,255.0);
						this.m_camera.p_DrawStart();
						bb_graphics_DrawImage(bb_ld38_2_GetAssetManager().p_GetImage("titleScreenGS"),this.m_camera.p_Center().p_x2(),this.m_camera.p_Center().p_y2(),0);
						this.m_menu.p_Render();
						bb_ld38_2_PauseFont.p_DrawText("PAUSED!",700,300,0,0,0,0);
						this.m_camera.p_DrawEnd();
					}else{
						if(bb_ld38_2_gameMode==3){
							bb_autofit_UpdateVirtualDisplay(true,true);
							bb_graphics_Cls(123.0,123.0,255.0);
							this.m_camera.p_DrawStart();
							bb_graphics_DrawImage(bb_ld38_2_GetAssetManager().p_GetImage("titleScreenGS"),this.m_camera.p_Center().p_x2(),this.m_camera.p_Center().p_y2(),0);
							bb_ld38_2_PauseFont.p_DrawText("LOADING",300,300,0,0,0,0);
							this.m_camera.p_DrawEnd();
						}else{
							if(bb_ld38_2_gameMode==6){
								bb_autofit_UpdateVirtualDisplay(true,true);
								bb_graphics_Cls(123.0,123.0,255.0);
								this.m_camera.p_DrawStart();
								bb_ld38_2_ScoreFont.p_DrawText("GAME OVER.",600,300,0,0,0,0);
								bb_ld38_2_ScoreFont.p_DrawText("LOOKS LIKE YOU... FACED THE MUSIC",200,400,0,0,0,0);
								bb_ld38_2_ScoreFont.p_DrawText("YOUR SCORE: "+String(this.m_playerScore),250,500,0,0,0,0);
								bb_ld38_2_InstructFont.p_DrawText("TAP, CLICK, OR PRESS ENTER TO CONTINUE",30,850,0,0,0,0);
								this.m_camera.p_DrawEnd();
							}else{
								if(bb_ld38_2_gameMode==8){
									bb_autofit_UpdateVirtualDisplay(true,true);
									bb_graphics_Cls(123.0,123.0,255.0);
									this.m_camera.p_DrawStart();
									bb_graphics_DrawImage(bb_ld38_2_GetAssetManager().p_GetImage("titleScreenGS"),this.m_camera.p_Center().p_x2(),this.m_camera.p_Center().p_y2(),0);
									bb_ld38_2_ScoreFontYellow.p_DrawText("YOU WIN!",100,100,0,0,0,0);
									bb_ld38_2_ScoreFontYellow.p_DrawText("A LITTLE INSECT MUSIC",100,200,0,0,0,0);
									bb_ld38_2_ScoreFontYellow.p_DrawText("ISN'T GOING TO, UH, BUG YOU",100,300,0,0,0,0);
									bb_ld38_2_ScoreFontYellow.p_DrawText("YOUR SCORE: "+String(this.m_playerScore),100,400,0,0,0,0);
									bb_ld38_2_InstructFont.p_DrawText("TAP, CLICK, OR PRESS ENTER TO CONTINUE",30,850,0,0,0,0);
									this.m_camera.p_DrawEnd();
								}
							}
						}
					}
				}
			}
		}
	}
	return 0;
}
c_LD38.prototype.p_NamedStartGame=function(t__songStr){
	bb_ld38_2_gameMode=3;
	this.m_currentUpdate=0;
	this.m_currentSong=t__songStr;
	this.p_ChangeState(1);
	this.m_player.m_position.p_x(689.0);
	this.m_player.m_position.p_y((700.0-this.m_player.p_Height()/2.0)|0);
	return 0;
}
c_LD38.prototype.p_InitBonusMenu=function(){
	var t_gnrButton=c_UIButton.m_new.call(new c_UIButton,200.0,600.0,false);
	t_gnrButton.m_text="Play GNR!";
	t_gnrButton.p_SetSprite(c_Sprite.m_new.call(new c_Sprite,this.m_assetManager.p_GetImage("sprMenuButton"),true));
	var t_gnrCallback=c_NamedPlayButtonCallBack.m_new.call(new c_NamedPlayButtonCallBack,"gnr");
	t_gnrButton.m_callBack=(t_gnrCallback);
	this.m_menu.p_AddButton(t_gnrButton);
	var t_riverButton=c_UIButton.m_new.call(new c_UIButton,200.0,400.0,false);
	t_riverButton.m_text="Play For River!";
	t_riverButton.p_SetSprite(c_Sprite.m_new.call(new c_Sprite,this.m_assetManager.p_GetImage("sprMenuButton"),true));
	var t_riverCallback=c_NamedPlayButtonCallBack.m_new.call(new c_NamedPlayButtonCallBack,"forriver");
	t_riverButton.m_callBack=(t_riverCallback);
	this.m_menu.p_AddButton(t_riverButton);
	var t_mozartButton=c_UIButton.m_new.call(new c_UIButton,200.0,200.0,false);
	t_mozartButton.m_text="Play EKN!";
	t_mozartButton.p_SetSprite(c_Sprite.m_new.call(new c_Sprite,this.m_assetManager.p_GetImage("sprMenuButton"),true));
	var t_mozartCallback=c_NamedPlayButtonCallBack.m_new.call(new c_NamedPlayButtonCallBack,"mozart");
	t_mozartButton.m_callBack=(t_mozartCallback);
	this.m_menu.p_AddButton(t_mozartButton);
	var t_backButton=c_UIButton.m_new.call(new c_UIButton,200.0,800.0,false);
	t_backButton.m_text="Back to Main Menu";
	t_backButton.p_SetSprite(c_Sprite.m_new.call(new c_Sprite,this.m_assetManager.p_GetImage("sprMenuButton"),true));
	var t_backCallback=c_BackButtonCallBack.m_new.call(new c_BackButtonCallBack);
	t_backButton.m_callBack=(t_backCallback);
	this.m_menu.p_AddButton(t_backButton);
	bb_ld38_2_gameMode=1;
	return 0;
}
c_LD38.prototype.p_InitCreditsScreen=function(){
	bb_ld38_2_gameMode=7;
	return 0;
}
var bb_app__app=null;
function c_GameDelegate(){
	BBGameDelegate.call(this);
	this.m__graphics=null;
	this.m__audio=null;
	this.m__input=null;
}
c_GameDelegate.prototype=extend_class(BBGameDelegate);
c_GameDelegate.m_new=function(){
	return this;
}
c_GameDelegate.prototype.StartGame=function(){
	this.m__graphics=(new gxtkGraphics);
	bb_graphics_SetGraphicsDevice(this.m__graphics);
	bb_graphics_SetFont(null,32);
	this.m__audio=(new gxtkAudio);
	bb_audio_SetAudioDevice(this.m__audio);
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	bb_input_SetInputDevice(this.m__input);
	bb_app_ValidateDeviceWindow(false);
	bb_app_EnumDisplayModes();
	bb_app__app.p_OnCreate();
}
c_GameDelegate.prototype.SuspendGame=function(){
	bb_app__app.p_OnSuspend();
	this.m__audio.Suspend();
}
c_GameDelegate.prototype.ResumeGame=function(){
	this.m__audio.Resume();
	bb_app__app.p_OnResume();
}
c_GameDelegate.prototype.UpdateGame=function(){
	bb_app_ValidateDeviceWindow(true);
	this.m__input.p_BeginUpdate();
	bb_app__app.p_OnUpdate();
	this.m__input.p_EndUpdate();
}
c_GameDelegate.prototype.RenderGame=function(){
	bb_app_ValidateDeviceWindow(true);
	var t_mode=this.m__graphics.BeginRender();
	if((t_mode)!=0){
		bb_graphics_BeginRender();
	}
	if(t_mode==2){
		bb_app__app.p_OnLoading();
	}else{
		bb_app__app.p_OnRender();
	}
	if((t_mode)!=0){
		bb_graphics_EndRender();
	}
	this.m__graphics.EndRender();
}
c_GameDelegate.prototype.KeyEvent=function(t_event,t_data){
	this.m__input.p_KeyEvent(t_event,t_data);
	if(t_event!=1){
		return;
	}
	var t_1=t_data;
	if(t_1==432){
		bb_app__app.p_OnClose();
	}else{
		if(t_1==416){
			bb_app__app.p_OnBack();
		}
	}
}
c_GameDelegate.prototype.MouseEvent=function(t_event,t_data,t_x,t_y){
	this.m__input.p_MouseEvent(t_event,t_data,t_x,t_y);
}
c_GameDelegate.prototype.TouchEvent=function(t_event,t_data,t_x,t_y){
	this.m__input.p_TouchEvent(t_event,t_data,t_x,t_y);
}
c_GameDelegate.prototype.MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	this.m__input.p_MotionEvent(t_event,t_data,t_x,t_y,t_z);
}
c_GameDelegate.prototype.DiscardGraphics=function(){
	this.m__graphics.DiscardGraphics();
}
var bb_app__delegate=null;
var bb_app__game=null;
function bbMain(){
	c_LD38.m_new.call(new c_LD38);
	return 0;
}
var bb_graphics_device=null;
function bb_graphics_SetGraphicsDevice(t_dev){
	bb_graphics_device=t_dev;
	return 0;
}
function c_Image(){
	Object.call(this);
	this.m_surface=null;
	this.m_width=0;
	this.m_height=0;
	this.m_frames=[];
	this.m_flags=0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_source=null;
}
c_Image.m_DefaultFlags=0;
c_Image.m_new=function(){
	return this;
}
c_Image.prototype.p_SetHandle=function(t_tx,t_ty){
	this.m_tx=t_tx;
	this.m_ty=t_ty;
	this.m_flags=this.m_flags&-2;
	return 0;
}
c_Image.prototype.p_ApplyFlags=function(t_iflags){
	this.m_flags=t_iflags;
	if((this.m_flags&2)!=0){
		var t_=this.m_frames;
		var t_2=0;
		while(t_2<t_.length){
			var t_f=t_[t_2];
			t_2=t_2+1;
			t_f.m_x+=1;
		}
		this.m_width-=2;
	}
	if((this.m_flags&4)!=0){
		var t_3=this.m_frames;
		var t_4=0;
		while(t_4<t_3.length){
			var t_f2=t_3[t_4];
			t_4=t_4+1;
			t_f2.m_y+=1;
		}
		this.m_height-=2;
	}
	if((this.m_flags&1)!=0){
		this.p_SetHandle((this.m_width)/2.0,(this.m_height)/2.0);
	}
	if(this.m_frames.length==1 && this.m_frames[0].m_x==0 && this.m_frames[0].m_y==0 && this.m_width==this.m_surface.Width() && this.m_height==this.m_surface.Height()){
		this.m_flags|=65536;
	}
	return 0;
}
c_Image.prototype.p_Init=function(t_surf,t_nframes,t_iflags){
	if((this.m_surface)!=null){
		error("Image already initialized");
	}
	this.m_surface=t_surf;
	this.m_width=((this.m_surface.Width()/t_nframes)|0);
	this.m_height=this.m_surface.Height();
	this.m_frames=new_object_array(t_nframes);
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_i*this.m_width,0);
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
c_Image.prototype.p_Init2=function(t_surf,t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_src,t_srcx,t_srcy,t_srcw,t_srch){
	if((this.m_surface)!=null){
		error("Image already initialized");
	}
	this.m_surface=t_surf;
	this.m_source=t_src;
	this.m_width=t_iwidth;
	this.m_height=t_iheight;
	this.m_frames=new_object_array(t_nframes);
	var t_ix=t_x;
	var t_iy=t_y;
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		if(t_ix+this.m_width>t_srcw){
			t_ix=0;
			t_iy+=this.m_height;
		}
		if(t_ix+this.m_width>t_srcw || t_iy+this.m_height>t_srch){
			error("Image frame outside surface");
		}
		this.m_frames[t_i]=c_Frame.m_new.call(new c_Frame,t_ix+t_srcx,t_iy+t_srcy);
		t_ix+=this.m_width;
	}
	this.p_ApplyFlags(t_iflags);
	return this;
}
c_Image.prototype.p_Frames=function(){
	return this.m_frames.length;
}
c_Image.prototype.p_Width=function(){
	return this.m_width;
}
c_Image.prototype.p_Height=function(){
	return this.m_height;
}
c_Image.prototype.p_WritePixels=function(t_pixels,t_x,t_y,t_width,t_height,t_offset,t_pitch){
	if(!((t_pitch)!=0)){
		t_pitch=t_width;
	}
	bb_graphics_device.WritePixels2(this.m_surface,t_pixels,t_x,t_y,t_width,t_height,t_offset,t_pitch);
	return 0;
}
function c_GraphicsContext(){
	Object.call(this);
	this.m_defaultFont=null;
	this.m_font=null;
	this.m_firstChar=0;
	this.m_matrixSp=0;
	this.m_ix=1.0;
	this.m_iy=.0;
	this.m_jx=.0;
	this.m_jy=1.0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_tformed=0;
	this.m_matDirty=0;
	this.m_color_r=.0;
	this.m_color_g=.0;
	this.m_color_b=.0;
	this.m_alpha=.0;
	this.m_blend=0;
	this.m_scissor_x=.0;
	this.m_scissor_y=.0;
	this.m_scissor_width=.0;
	this.m_scissor_height=.0;
	this.m_matrixStack=new_number_array(192);
}
c_GraphicsContext.m_new=function(){
	return this;
}
c_GraphicsContext.prototype.p_Validate=function(){
	if((this.m_matDirty)!=0){
		bb_graphics_renderDevice.SetMatrix(bb_graphics_context.m_ix,bb_graphics_context.m_iy,bb_graphics_context.m_jx,bb_graphics_context.m_jy,bb_graphics_context.m_tx,bb_graphics_context.m_ty);
		this.m_matDirty=0;
	}
	return 0;
}
var bb_graphics_context=null;
function bb_data_FixDataPath(t_path){
	var t_i=t_path.indexOf(":/",0);
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		return t_path;
	}
	if(string_startswith(t_path,"./") || string_startswith(t_path,"/")){
		return t_path;
	}
	return "monkey://data/"+t_path;
}
function c_Frame(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
}
c_Frame.m_new=function(t_x,t_y){
	this.m_x=t_x;
	this.m_y=t_y;
	return this;
}
c_Frame.m_new2=function(){
	return this;
}
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
	}
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init2(t_surf,0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags,null,0,0,t_surf.Width(),t_surf.Height());
	}
	return null;
}
function bb_graphics_SetFont(t_font,t_firstChar){
	if(!((t_font)!=null)){
		if(!((bb_graphics_context.m_defaultFont)!=null)){
			bb_graphics_context.m_defaultFont=bb_graphics_LoadImage("mojo_font.png",96,2);
		}
		t_font=bb_graphics_context.m_defaultFont;
		t_firstChar=32;
	}
	bb_graphics_context.m_font=t_font;
	bb_graphics_context.m_firstChar=t_firstChar;
	return 0;
}
var bb_audio_device=null;
function bb_audio_SetAudioDevice(t_dev){
	bb_audio_device=t_dev;
	return 0;
}
function c_InputDevice(){
	Object.call(this);
	this.m__joyStates=new_object_array(4);
	this.m__keyDown=new_bool_array(512);
	this.m__keyHitPut=0;
	this.m__keyHitQueue=new_number_array(33);
	this.m__keyHit=new_number_array(512);
	this.m__charGet=0;
	this.m__charPut=0;
	this.m__charQueue=new_number_array(32);
	this.m__mouseX=.0;
	this.m__mouseY=.0;
	this.m__touchX=new_number_array(32);
	this.m__touchY=new_number_array(32);
	this.m__accelX=.0;
	this.m__accelY=.0;
	this.m__accelZ=.0;
}
c_InputDevice.m_new=function(){
	for(var t_i=0;t_i<4;t_i=t_i+1){
		this.m__joyStates[t_i]=c_JoyState.m_new.call(new c_JoyState);
	}
	return this;
}
c_InputDevice.prototype.p_PutKeyHit=function(t_key){
	if(this.m__keyHitPut==this.m__keyHitQueue.length){
		return;
	}
	this.m__keyHit[t_key]+=1;
	this.m__keyHitQueue[this.m__keyHitPut]=t_key;
	this.m__keyHitPut+=1;
}
c_InputDevice.prototype.p_BeginUpdate=function(){
	for(var t_i=0;t_i<4;t_i=t_i+1){
		var t_state=this.m__joyStates[t_i];
		if(!BBGame.Game().PollJoystick(t_i,t_state.m_joyx,t_state.m_joyy,t_state.m_joyz,t_state.m_buttons)){
			break;
		}
		for(var t_j=0;t_j<32;t_j=t_j+1){
			var t_key=256+t_i*32+t_j;
			if(t_state.m_buttons[t_j]){
				if(!this.m__keyDown[t_key]){
					this.m__keyDown[t_key]=true;
					this.p_PutKeyHit(t_key);
				}
			}else{
				this.m__keyDown[t_key]=false;
			}
		}
	}
}
c_InputDevice.prototype.p_EndUpdate=function(){
	for(var t_i=0;t_i<this.m__keyHitPut;t_i=t_i+1){
		this.m__keyHit[this.m__keyHitQueue[t_i]]=0;
	}
	this.m__keyHitPut=0;
	this.m__charGet=0;
	this.m__charPut=0;
}
c_InputDevice.prototype.p_KeyEvent=function(t_event,t_data){
	var t_1=t_event;
	if(t_1==1){
		if(!this.m__keyDown[t_data]){
			this.m__keyDown[t_data]=true;
			this.p_PutKeyHit(t_data);
			if(t_data==1){
				this.m__keyDown[384]=true;
				this.p_PutKeyHit(384);
			}else{
				if(t_data==384){
					this.m__keyDown[1]=true;
					this.p_PutKeyHit(1);
				}
			}
		}
	}else{
		if(t_1==2){
			if(this.m__keyDown[t_data]){
				this.m__keyDown[t_data]=false;
				if(t_data==1){
					this.m__keyDown[384]=false;
				}else{
					if(t_data==384){
						this.m__keyDown[1]=false;
					}
				}
			}
		}else{
			if(t_1==3){
				if(this.m__charPut<this.m__charQueue.length){
					this.m__charQueue[this.m__charPut]=t_data;
					this.m__charPut+=1;
				}
			}
		}
	}
}
c_InputDevice.prototype.p_MouseEvent=function(t_event,t_data,t_x,t_y){
	var t_2=t_event;
	if(t_2==4){
		this.p_KeyEvent(1,1+t_data);
	}else{
		if(t_2==5){
			this.p_KeyEvent(2,1+t_data);
			return;
		}else{
			if(t_2==6){
			}else{
				return;
			}
		}
	}
	this.m__mouseX=t_x;
	this.m__mouseY=t_y;
	this.m__touchX[0]=t_x;
	this.m__touchY[0]=t_y;
}
c_InputDevice.prototype.p_TouchEvent=function(t_event,t_data,t_x,t_y){
	var t_3=t_event;
	if(t_3==7){
		this.p_KeyEvent(1,384+t_data);
	}else{
		if(t_3==8){
			this.p_KeyEvent(2,384+t_data);
			return;
		}else{
			if(t_3==9){
			}else{
				return;
			}
		}
	}
	this.m__touchX[t_data]=t_x;
	this.m__touchY[t_data]=t_y;
	if(t_data==0){
		this.m__mouseX=t_x;
		this.m__mouseY=t_y;
	}
}
c_InputDevice.prototype.p_MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	var t_4=t_event;
	if(t_4==10){
	}else{
		return;
	}
	this.m__accelX=t_x;
	this.m__accelY=t_y;
	this.m__accelZ=t_z;
}
c_InputDevice.prototype.p_KeyDown=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyDown[t_key];
	}
	return false;
}
c_InputDevice.prototype.p_KeyHit=function(t_key){
	if(t_key>0 && t_key<512){
		return this.m__keyHit[t_key];
	}
	return 0;
}
c_InputDevice.prototype.p_MouseX=function(){
	return this.m__mouseX;
}
c_InputDevice.prototype.p_MouseY=function(){
	return this.m__mouseY;
}
c_InputDevice.prototype.p_TouchX=function(t_index){
	if(t_index>=0 && t_index<32){
		return this.m__touchX[t_index];
	}
	return 0.0;
}
function c_JoyState(){
	Object.call(this);
	this.m_joyx=new_number_array(2);
	this.m_joyy=new_number_array(2);
	this.m_joyz=new_number_array(2);
	this.m_buttons=new_bool_array(32);
}
c_JoyState.m_new=function(){
	return this;
}
var bb_input_device=null;
function bb_input_SetInputDevice(t_dev){
	bb_input_device=t_dev;
	return 0;
}
var bb_app__devWidth=0;
var bb_app__devHeight=0;
function bb_app_ValidateDeviceWindow(t_notifyApp){
	var t_w=bb_app__game.GetDeviceWidth();
	var t_h=bb_app__game.GetDeviceHeight();
	if(t_w==bb_app__devWidth && t_h==bb_app__devHeight){
		return;
	}
	bb_app__devWidth=t_w;
	bb_app__devHeight=t_h;
	if(t_notifyApp){
		bb_app__app.p_OnResize();
	}
}
function c_DisplayMode(){
	Object.call(this);
	this.m__width=0;
	this.m__height=0;
}
c_DisplayMode.m_new=function(t_width,t_height){
	this.m__width=t_width;
	this.m__height=t_height;
	return this;
}
c_DisplayMode.m_new2=function(){
	return this;
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	return this;
}
c_Map.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map.prototype.p_Contains=function(t_key){
	return this.p_FindNode(t_key)!=null;
}
c_Map.prototype.p_RotateLeft=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_RotateRight=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_InsertFixup=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map.prototype.p_Set=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node.m_new.call(new c_Node,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map.prototype.p_Insert=function(t_key,t_value){
	return this.p_Set(t_key,t_value);
}
function c_IntMap(){
	c_Map.call(this);
}
c_IntMap.prototype=extend_class(c_Map);
c_IntMap.m_new=function(){
	c_Map.m_new.call(this);
	return this;
}
c_IntMap.prototype.p_Compare=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_Stack(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack.m_new=function(){
	return this;
}
c_Stack.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack.prototype.p_Push=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack.prototype.p_Push2=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push(t_values[t_offset+t_i]);
	}
}
c_Stack.prototype.p_Push3=function(t_values,t_offset){
	this.p_Push2(t_values,t_offset,t_values.length-t_offset);
}
c_Stack.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_Node(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node.m_new2=function(){
	return this;
}
var bb_app__displayModes=[];
var bb_app__desktopMode=null;
function bb_app_DeviceWidth(){
	return bb_app__devWidth;
}
function bb_app_DeviceHeight(){
	return bb_app__devHeight;
}
function bb_app_EnumDisplayModes(){
	var t_modes=bb_app__game.GetDisplayModes();
	var t_mmap=c_IntMap.m_new.call(new c_IntMap);
	var t_mstack=c_Stack.m_new.call(new c_Stack);
	for(var t_i=0;t_i<t_modes.length;t_i=t_i+1){
		var t_w=t_modes[t_i].width;
		var t_h=t_modes[t_i].height;
		var t_size=t_w<<16|t_h;
		if(t_mmap.p_Contains(t_size)){
		}else{
			var t_mode=c_DisplayMode.m_new.call(new c_DisplayMode,t_modes[t_i].width,t_modes[t_i].height);
			t_mmap.p_Insert(t_size,t_mode);
			t_mstack.p_Push(t_mode);
		}
	}
	bb_app__displayModes=t_mstack.p_ToArray();
	var t_mode2=bb_app__game.GetDesktopMode();
	if((t_mode2)!=null){
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,t_mode2.width,t_mode2.height);
	}else{
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,bb_app_DeviceWidth(),bb_app_DeviceHeight());
	}
}
var bb_graphics_renderDevice=null;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	bb_graphics_context.m_ix=t_ix;
	bb_graphics_context.m_iy=t_iy;
	bb_graphics_context.m_jx=t_jx;
	bb_graphics_context.m_jy=t_jy;
	bb_graphics_context.m_tx=t_tx;
	bb_graphics_context.m_ty=t_ty;
	bb_graphics_context.m_tformed=((t_ix!=1.0 || t_iy!=0.0 || t_jx!=0.0 || t_jy!=1.0 || t_tx!=0.0 || t_ty!=0.0)?1:0);
	bb_graphics_context.m_matDirty=1;
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	bb_graphics_SetMatrix(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	bb_graphics_context.m_color_r=t_r;
	bb_graphics_context.m_color_g=t_g;
	bb_graphics_context.m_color_b=t_b;
	bb_graphics_renderDevice.SetColor(t_r,t_g,t_b);
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	bb_graphics_context.m_alpha=t_alpha;
	bb_graphics_renderDevice.SetAlpha(t_alpha);
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	bb_graphics_context.m_blend=t_blend;
	bb_graphics_renderDevice.SetBlend(t_blend);
	return 0;
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	bb_graphics_context.m_scissor_x=t_x;
	bb_graphics_context.m_scissor_y=t_y;
	bb_graphics_context.m_scissor_width=t_width;
	bb_graphics_context.m_scissor_height=t_height;
	bb_graphics_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	return 0;
}
function bb_graphics_BeginRender(){
	bb_graphics_renderDevice=bb_graphics_device;
	bb_graphics_context.m_matrixSp=0;
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	bb_graphics_SetColor(255.0,255.0,255.0);
	bb_graphics_SetAlpha(1.0);
	bb_graphics_SetBlend(0);
	bb_graphics_SetScissor(0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	return 0;
}
function bb_graphics_EndRender(){
	bb_graphics_renderDevice=null;
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
function bb_app_EndApp(){
	error("");
}
var bb_ld38_2_gameMode=0;
function c_Stack2(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack2.m_new=function(){
	return this;
}
c_Stack2.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack2.prototype.p_Push4=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_number_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack2.prototype.p_Push5=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push4(t_values[t_offset+t_i]);
	}
}
c_Stack2.prototype.p_Push6=function(t_values,t_offset){
	this.p_Push5(t_values,t_offset,t_values.length-t_offset);
}
c_Stack2.prototype.p_ToArray=function(){
	var t_t=new_number_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
c_Stack2.prototype.p_Set2=function(t_index,t_value){
	this.m_data[t_index]=t_value;
}
c_Stack2.prototype.p_Get=function(t_index){
	return this.m_data[t_index];
}
function c_FloatStack(){
	c_Stack2.call(this);
}
c_FloatStack.prototype=extend_class(c_Stack2);
c_FloatStack.m_new=function(t_data){
	c_Stack2.m_new2.call(this,t_data);
	return this;
}
c_FloatStack.m_new2=function(){
	c_Stack2.m_new.call(this);
	return this;
}
function c_Stack3(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack3.m_new=function(){
	return this;
}
c_Stack3.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack3.prototype.p_IsEmpty=function(){
	return this.m_length==0;
}
c_Stack3.prototype.p_Top=function(){
	return this.m_data[this.m_length-1];
}
c_Stack3.m_NIL=0;
c_Stack3.prototype.p_Pop=function(){
	this.m_length-=1;
	var t_v=this.m_data[this.m_length];
	this.m_data[this.m_length]=c_Stack3.m_NIL;
	return t_v;
}
c_Stack3.prototype.p_Set3=function(t_index,t_value){
	this.m_data[t_index]=t_value;
}
c_Stack3.prototype.p_Insert2=function(t_index,t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_number_array(this.m_data,this.m_length*2+10);
	}
	for(var t_i=this.m_length;t_i>t_index;t_i=t_i+-1){
		this.m_data[t_i]=this.m_data[t_i-1];
	}
	this.m_data[t_index]=t_value;
	this.m_length+=1;
}
c_Stack3.prototype.p_Get=function(t_index){
	return this.m_data[t_index];
}
function c_IntStack(){
	c_Stack3.call(this);
}
c_IntStack.prototype=extend_class(c_Stack3);
c_IntStack.m_new=function(t_data){
	c_Stack3.m_new2.call(this,t_data);
	return this;
}
c_IntStack.m_new2=function(){
	c_Stack3.m_new.call(this);
	return this;
}
function bb_audio_SetChannelVolume(t_channel,t_volume){
	bb_audio_device.SetVolume(t_channel,t_volume);
	return 0;
}
function c_TFont(){
	Object.call(this);
	this.m_Stream=null;
	this.m_Size=0;
	this.m_Color=[];
	this.m_Path="";
	this.m_OutlineType="";
	this.m_GlyphNumber=0;
	this.m_FontLimits=new_number_array(4);
	this.m_FontScale=.0;
	this.m_LineHeight=0;
	this.m_GlyphId=[];
	this.m_Glyph=[];
	this.m_ClockwiseFound=false;
	this.m_FontClockwise=false;
	this.m_ImagesLoaded=false;
}
c_TFont.prototype.p_LoadMetrics=function(t_Offset,t_HMetricsCount){
	this.m_Stream.p_SetPointer(t_Offset);
	var t_Count=0;
	var t_LastAdv=0;
	for(var t_i=0;t_i<=this.m_GlyphNumber-1;t_i=t_i+1){
		if(t_Count<t_HMetricsCount-1){
			this.m_Glyph[t_i].m_Adv=this.m_Stream.p_ReadUInt(2);
			this.m_Glyph[t_i].m_Lsb=this.m_Stream.p_ReadInt(2);
			t_LastAdv=this.m_Glyph[t_i].m_Adv;
		}else{
			this.m_Glyph[t_i].m_Adv=t_LastAdv;
			this.m_Glyph[t_i].m_Lsb=this.m_Stream.p_ReadInt(2);
		}
		t_Count=t_Count+1;
	}
	return 0;
}
c_TFont.prototype.p_LoadCmapTable0=function(t_Offset){
	this.m_Stream.p_SetPointer(t_Offset);
	this.m_Stream.p_ReadUInt(2);
	this.m_Stream.p_ReadUInt(2);
	for(var t_g=0;t_g<=254;t_g=t_g+1){
		var t_GId=this.m_Stream.p_ReadUInt(1);
		if(this.m_GlyphId[t_g]==0){
			this.m_GlyphId[t_g]=t_GId;
		}
	}
	return 0;
}
c_TFont.prototype.p_LoadCmapTable4=function(t_Offset){
	var t_OffCount=t_Offset;
	this.m_Stream.p_SetPointer(t_Offset);
	this.m_Stream.p_ReadUInt(2);
	this.m_Stream.p_ReadUInt(2);
	var t_SegCount=((this.m_Stream.p_ReadUInt(2)/2)|0);
	var t_SearchRange=this.m_Stream.p_ReadUInt(2);
	var t_EntrySelector=this.m_Stream.p_ReadUInt(2);
	var t_RangeShift=this.m_Stream.p_ReadUInt(2);
	t_OffCount=t_OffCount+12;
	var t_EndCount=new_number_array(t_SegCount);
	for(var t_s=0;t_s<=t_SegCount-1;t_s=t_s+1){
		t_EndCount[t_s]=this.m_Stream.p_ReadUInt(2);
		t_OffCount=t_OffCount+2;
	}
	var t_Reserved=this.m_Stream.p_ReadUInt(2);
	t_OffCount=t_OffCount+2;
	var t_StartCount=new_number_array(t_SegCount);
	for(var t_s2=0;t_s2<=t_SegCount-1;t_s2=t_s2+1){
		t_StartCount[t_s2]=this.m_Stream.p_ReadUInt(2);
		t_OffCount=t_OffCount+2;
	}
	var t_IdDelta=new_number_array(t_SegCount);
	for(var t_s3=0;t_s3<=t_SegCount-1;t_s3=t_s3+1){
		t_IdDelta[t_s3]=this.m_Stream.p_ReadInt(2);
		t_OffCount=t_OffCount+2;
	}
	var t_IdRangeOffset=new_number_array(t_SegCount);
	var t_IdRangeOffsetOffset=new_number_array(t_SegCount);
	for(var t_s4=0;t_s4<=t_SegCount-1;t_s4=t_s4+1){
		t_IdRangeOffset[t_s4]=this.m_Stream.p_ReadUInt(2);
		t_IdRangeOffsetOffset[t_s4]=t_OffCount;
		t_OffCount=t_OffCount+2;
	}
	for(var t_Char=0;t_Char<=this.m_GlyphNumber-1;t_Char=t_Char+1){
		var t_NullFlag=1;
		var t_CharSeg=0;
		for(var t_s5=0;t_s5<=t_SegCount-1;t_s5=t_s5+1){
			if(t_EndCount[t_s5]>=t_Char){
				t_CharSeg=t_s5;
				if(t_Char>=t_StartCount[t_s5]){
					t_NullFlag=0;
				}
				break;
			}
		}
		if(t_NullFlag==1){
			this.m_GlyphId[t_Char]=0;
			continue;
		}
		if(t_IdRangeOffset[t_CharSeg]==0){
			if(this.m_GlyphId[t_Char]==0){
				this.m_GlyphId[t_Char]=t_IdDelta[t_CharSeg]+t_Char;
			}
		}else{
			var t_Location=2*(t_Char-t_StartCount[t_CharSeg])+(t_IdRangeOffset[t_CharSeg]-t_IdRangeOffset[0])+t_OffCount+t_CharSeg*2;
			if(this.m_GlyphId[t_Char]==0){
				this.m_GlyphId[t_Char]=this.m_Stream.p_PeekUInt(2,t_Location);
			}
		}
	}
	return 0;
}
c_TFont.prototype.p_LoadCmapTable6=function(t_Offset){
	this.m_Stream.p_SetPointer(t_Offset);
	this.m_Stream.p_ReadUInt(2);
	this.m_Stream.p_ReadUInt(2);
	var t_FirstCode=this.m_Stream.p_ReadUInt(2);
	var t_EntryCount=this.m_Stream.p_ReadUInt(2);
	for(var t_g=t_FirstCode;t_g<=t_EntryCount-1;t_g=t_g+1){
		var t_GId=this.m_Stream.p_ReadUInt(2);
		if(this.m_GlyphId[t_g]==0){
			this.m_GlyphId[t_g]=t_GId;
		}
	}
	return 0;
}
c_TFont.prototype.p_LoadCmapData=function(t_Offset){
	this.m_Stream.p_SetPointer(t_Offset);
	this.m_Stream.p_ReadUInt(2);
	var t_numTables=this.m_Stream.p_ReadUInt(2);
	var t_PlatformId=new_number_array(t_numTables);
	var t_EncodingId=new_number_array(t_numTables);
	var t_TableOffset=new_number_array(t_numTables);
	for(var t_t=0;t_t<=t_numTables-1;t_t=t_t+1){
		t_PlatformId[t_t]=this.m_Stream.p_ReadUInt(2);
		t_EncodingId[t_t]=this.m_Stream.p_ReadUInt(2);
		t_TableOffset[t_t]=this.m_Stream.p_ReadUInt(4)+t_Offset;
	}
	var t_WindowsFontFound=false;
	for(var t_t2=0;t_t2<=t_numTables-1;t_t2=t_t2+1){
		if(t_PlatformId[t_t2]==3 && t_EncodingId[t_t2]==1){
			t_WindowsFontFound=true;
			var t_Format=this.m_Stream.p_PeekUInt(2,t_TableOffset[t_t2]);
			if(t_Format==0){
				this.p_LoadCmapTable0(t_TableOffset[t_t2]+2);
			}
			if(t_Format==4){
				this.p_LoadCmapTable4(t_TableOffset[t_t2]+2);
			}
			if(t_Format==6){
				this.p_LoadCmapTable6(t_TableOffset[t_t2]+2);
			}
		}
	}
	for(var t_t3=0;t_t3<=t_numTables-1;t_t3=t_t3+1){
		if(t_PlatformId[t_t3]==3 && t_EncodingId[t_t3]!=1){
			var t_Format2=this.m_Stream.p_PeekUInt(2,t_TableOffset[t_t3]);
			if(t_Format2==0){
				this.p_LoadCmapTable0(t_TableOffset[t_t3]+2);
			}
			if(t_Format2==4){
				this.p_LoadCmapTable4(t_TableOffset[t_t3]+2);
			}
			if(t_Format2==6){
				this.p_LoadCmapTable6(t_TableOffset[t_t3]+2);
			}
		}
	}
	for(var t_t4=0;t_t4<=t_numTables-1;t_t4=t_t4+1){
		if(t_PlatformId[t_t4]!=3){
			var t_Format3=this.m_Stream.p_PeekUInt(2,t_TableOffset[t_t4]);
			if(t_Format3==0){
				this.p_LoadCmapTable0(t_TableOffset[t_t4]+2);
			}
			if(t_Format3==4){
				this.p_LoadCmapTable4(t_TableOffset[t_t4]+2);
			}
			if(t_Format3==6){
				this.p_LoadCmapTable6(t_TableOffset[t_t4]+2);
			}
		}
	}
	for(var t_i=0;t_i<=this.m_GlyphId.length-1;t_i=t_i+1){
		if(this.m_GlyphId[t_i]>this.m_GlyphNumber-1){
			this.m_GlyphId[t_i]=0;
		}
	}
	return 0;
}
c_TFont.prototype.p_LoadLoca=function(t_Offset,t_Format,t_GlyfOffset){
	this.m_Stream.p_SetPointer(t_Offset);
	for(var t_i=0;t_i<=this.m_GlyphNumber-1;t_i=t_i+1){
		if(t_Format==0){
			this.m_Glyph[t_i].m_FileAddress=this.m_Stream.p_ReadUInt(2)*2+t_GlyfOffset;
		}else{
			this.m_Glyph[t_i].m_FileAddress=this.m_Stream.p_ReadUInt(4)+t_GlyfOffset;
		}
	}
	return 0;
}
c_TFont.prototype.p_LoadGlyfData=function(t_Id,t_Offset){
	this.m_Stream.p_SetPointer(t_Offset);
	var t_ContourNumber=this.m_Stream.p_ReadInt(2);
	if(t_ContourNumber<1){
		return 0;
	}
	this.m_Glyph[t_Id].m_ContourNumber=t_ContourNumber;
	this.m_Glyph[t_Id].m_xMin=this.m_Stream.p_ReadInt(2);
	this.m_Glyph[t_Id].m_yMin=this.m_Stream.p_ReadInt(2);
	this.m_Glyph[t_Id].m_xMax=this.m_Stream.p_ReadInt(2);
	this.m_Glyph[t_Id].m_yMax=this.m_Stream.p_ReadInt(2);
	this.m_Glyph[t_Id].m_W=this.m_Glyph[t_Id].m_xMax-this.m_Glyph[t_Id].m_xMin;
	this.m_Glyph[t_Id].m_H=this.m_Glyph[t_Id].m_yMax-this.m_Glyph[t_Id].m_yMin;
	var t_EndPoints=new_number_array(t_ContourNumber);
	for(var t_i=0;t_i<=t_ContourNumber-1;t_i=t_i+1){
		t_EndPoints[t_i]=this.m_Stream.p_ReadUInt(2);
	}
	var t_PointNumber=t_EndPoints[t_ContourNumber-1]+1;
	var t_insLen=this.m_Stream.p_ReadUInt(2);
	this.m_Stream.p_ReadString(t_insLen);
	var t_Flags=new_array_array(t_PointNumber);
	var t_ContinueNumber=0;
	for(var t_i2=0;t_i2<=t_PointNumber-1;t_i2=t_i2+1){
		if(t_ContinueNumber>0){
			t_Flags[t_i2]=t_Flags[t_i2-1];
			t_ContinueNumber=t_ContinueNumber-1;
			continue;
		}
		t_Flags[t_i2]=this.m_Stream.p_ReadBits(1);
		if(t_Flags[t_i2][3]==1){
			t_ContinueNumber=this.m_Stream.p_ReadUInt(1);
		}
	}
	var t_XCoords=new_number_array(t_PointNumber);
	for(var t_i3=0;t_i3<=t_PointNumber-1;t_i3=t_i3+1){
		if(t_Flags[t_i3][1]==0 && t_Flags[t_i3][4]==1){
			if(t_i3>0){
				t_XCoords[t_i3]=t_XCoords[t_i3-1];
			}else{
				t_XCoords[t_i3]=-this.m_Glyph[t_Id].m_xMin;
			}
			continue;
		}
		if(t_Flags[t_i3][1]==1){
			var t_tmp=this.m_Stream.p_ReadUInt(1);
			if(t_Flags[t_i3][4]==0){
				t_tmp=t_tmp*-1;
			}
			if(t_i3>0){
				t_XCoords[t_i3]=t_XCoords[t_i3-1]+t_tmp;
			}else{
				t_XCoords[t_i3]=t_tmp-this.m_Glyph[t_Id].m_xMin;
			}
			continue;
		}
		if(t_Flags[t_i3][1]==0 && t_Flags[t_i3][4]==0){
			if(t_i3>0){
				t_XCoords[t_i3]=t_XCoords[t_i3-1]+this.m_Stream.p_ReadInt(2);
			}else{
				t_XCoords[t_i3]=this.m_Stream.p_ReadInt(2)-this.m_Glyph[t_Id].m_xMin;
			}
			continue;
		}
	}
	var t_YCoords=new_number_array(t_PointNumber);
	for(var t_i4=0;t_i4<=t_PointNumber-1;t_i4=t_i4+1){
		if(t_Flags[t_i4][2]==0 && t_Flags[t_i4][5]==1){
			if(t_i4>0){
				t_YCoords[t_i4]=t_YCoords[t_i4-1];
			}else{
				t_YCoords[t_i4]=this.m_Glyph[t_Id].m_yMax;
			}
			continue;
		}
		if(t_Flags[t_i4][2]==1){
			var t_tmp2=this.m_Stream.p_ReadUInt(1);
			if(t_Flags[t_i4][5]==0){
				t_tmp2=t_tmp2*-1;
			}
			if(t_i4>0){
				t_YCoords[t_i4]=t_YCoords[t_i4-1]-t_tmp2;
			}else{
				t_YCoords[t_i4]=this.m_Glyph[t_Id].m_yMax-t_tmp2;
			}
			continue;
		}
		if(t_Flags[t_i4][2]==0 && t_Flags[t_i4][5]==0){
			if(t_i4>0){
				t_YCoords[t_i4]=t_YCoords[t_i4-1]-this.m_Stream.p_ReadInt(2);
			}else{
				t_YCoords[t_i4]=this.m_Glyph[t_Id].m_yMax-this.m_Stream.p_ReadInt(2);
			}
			continue;
		}
	}
	this.m_Glyph[t_Id].m_xyList=new_array_array(t_ContourNumber);
	var t_p1=0;
	var t_Pend=0;
	for(var t_i5=0;t_i5<=t_ContourNumber-1;t_i5=t_i5+1){
		if(t_i5>0){
			t_p1=t_EndPoints[t_i5-1]+1;
		}
		t_Pend=t_EndPoints[t_i5];
		this.m_Glyph[t_Id].m_xyList[t_i5]=new_number_array((t_Pend-t_p1+1)*3);
		var t_Count=0;
		for(var t_j=t_p1;t_j<=t_Pend;t_j=t_j+1){
			this.m_Glyph[t_Id].m_xyList[t_i5][t_Count]=(t_XCoords[t_j]);
			this.m_Glyph[t_Id].m_xyList[t_i5][t_Count+1]=(t_YCoords[t_j]);
			this.m_Glyph[t_Id].m_xyList[t_i5][t_Count+2]=(t_Flags[t_j][0]);
			t_Count=t_Count+3;
		}
	}
	return 0;
}
c_TFont.prototype.p_QuadGlyph=function(t_Id){
	for(var t_c=0;t_c<=this.m_Glyph[t_Id].m_ContourNumber-1;t_c=t_c+1){
		var t_xyStack=c_Stack2.m_new.call(new c_Stack2);
		for(var t_p0=0;t_p0<=this.m_Glyph[t_Id].m_xyList[t_c].length-1;t_p0=t_p0+3){
			var t_p1=t_p0+3;
			if(t_p1>this.m_Glyph[t_Id].m_xyList[t_c].length-1){
				t_p1=0;
			}
			t_xyStack.p_Push4(this.m_Glyph[t_Id].m_xyList[t_c][t_p0]);
			t_xyStack.p_Push4(this.m_Glyph[t_Id].m_xyList[t_c][t_p0+1]);
			t_xyStack.p_Push4(this.m_Glyph[t_Id].m_xyList[t_c][t_p0+2]);
			if(this.m_Glyph[t_Id].m_xyList[t_c][t_p0+2]==0.0 && this.m_Glyph[t_Id].m_xyList[t_c][t_p1+2]==0.0){
				var t_tx=(this.m_Glyph[t_Id].m_xyList[t_c][t_p0]+this.m_Glyph[t_Id].m_xyList[t_c][t_p1])/2.0;
				var t_ty=(this.m_Glyph[t_Id].m_xyList[t_c][t_p0+1]+this.m_Glyph[t_Id].m_xyList[t_c][t_p1+1])/2.0;
				t_xyStack.p_Push4(t_tx);
				t_xyStack.p_Push4(t_ty);
				t_xyStack.p_Push4(1.0);
			}
		}
		this.m_Glyph[t_Id].m_xyList[t_c]=t_xyStack.p_ToArray();
	}
	return 0;
}
c_TFont.prototype.p_CalculateCurve=function(t_x1,t_y1,t_x2,t_y2,t_x3,t_y3){
	var t_Lst=new_number_array(10);
	var t_Counter=0;
	for(var t_t=0.0;t_t<=0.8;t_t=t_t+0.2){
		var t_tx=Math.pow(1.0-t_t,2.0)*(t_x1)+2.0*((1.0-t_t)*t_t*(t_x2))+Math.pow(t_t,2.0)*(t_x3);
		var t_ty=Math.pow(1.0-t_t,2.0)*(t_y1)+2.0*((1.0-t_t)*t_t*(t_y2))+Math.pow(t_t,2.0)*(t_y3);
		t_Lst[t_Counter]=t_tx;
		t_Lst[t_Counter+1]=t_ty;
		t_Counter=t_Counter+2;
	}
	return t_Lst;
}
c_TFont.prototype.p_SmoothGlyph=function(t_Id){
	for(var t_c=0;t_c<=this.m_Glyph[t_Id].m_ContourNumber-1;t_c=t_c+1){
		var t_xyStack=c_Stack2.m_new.call(new c_Stack2);
		for(var t_p0=0;t_p0<=this.m_Glyph[t_Id].m_xyList[t_c].length-1;t_p0=t_p0+3){
			var t_p1=t_p0+3;
			if(t_p1>this.m_Glyph[t_Id].m_xyList[t_c].length-1){
				t_p1=0;
			}
			var t_p2=t_p1+3;
			if(t_p2>this.m_Glyph[t_Id].m_xyList[t_c].length-1){
				t_p2=0;
			}
			if(this.m_Glyph[t_Id].m_xyList[t_c][t_p0+2]==0.0){
				continue;
			}
			if(this.m_Glyph[t_Id].m_xyList[t_c][t_p0+2]==1.0 && this.m_Glyph[t_Id].m_xyList[t_c][t_p1+2]==1.0){
				t_xyStack.p_Push4(this.m_Glyph[t_Id].m_xyList[t_c][t_p0]);
				t_xyStack.p_Push4(this.m_Glyph[t_Id].m_xyList[t_c][t_p0+1]);
			}else{
				var t_T=this.p_CalculateCurve(((this.m_Glyph[t_Id].m_xyList[t_c][t_p0])|0),((this.m_Glyph[t_Id].m_xyList[t_c][t_p0+1])|0),((this.m_Glyph[t_Id].m_xyList[t_c][t_p1])|0),((this.m_Glyph[t_Id].m_xyList[t_c][t_p1+1])|0),((this.m_Glyph[t_Id].m_xyList[t_c][t_p2])|0),((this.m_Glyph[t_Id].m_xyList[t_c][t_p2+1])|0));
				var t_=t_T;
				var t_2=0;
				while(t_2<t_.length){
					var t_tt=t_[t_2];
					t_2=t_2+1;
					t_xyStack.p_Push4(t_tt);
				}
			}
		}
		this.m_Glyph[t_Id].m_xyList[t_c]=t_xyStack.p_ToArray();
	}
	return 0;
}
c_TFont.m_new=function(t_Path,t_Size,t_Color){
	this.m_Stream=c_DataStream.m_new.call(new c_DataStream,"monkey://data/"+t_Path,true);
	this.m_Size=t_Size;
	this.m_Color=t_Color;
	this.m_Path=t_Path;
	if(this.m_Stream.m_Buffer==null){
		error(t_Path+" : Font file not found");
	}
	var t_sfntVersion=((this.m_Stream.p_ReadFixed32())|0);
	var t_numTables=this.m_Stream.p_ReadUInt(2);
	var t_searchRange=this.m_Stream.p_ReadUInt(2);
	var t_entrySelector=this.m_Stream.p_ReadUInt(2);
	var t_rangeShift=this.m_Stream.p_ReadUInt(2);
	if(t_sfntVersion==1){
		this.m_OutlineType="TT";
	}else{
		this.m_OutlineType="OT";
	}
	var t_cmapOffset=0;
	var t_headOffset=0;
	var t_hheaOffset=0;
	var t_hmtxOffset=0;
	var t_maxpOffset=0;
	var t_nameOffset=0;
	var t_glyfOffset=0;
	var t_locaOffset=0;
	var t_CFFOffset=0;
	var t_VORGOffset=0;
	for(var t_i=0;t_i<=t_numTables-1;t_i=t_i+1){
		var t_tag=this.m_Stream.p_ReadString(4);
		var t_checksum=this.m_Stream.p_ReadUInt(4);
		var t_offset=this.m_Stream.p_ReadUInt(4);
		var t_length=this.m_Stream.p_ReadUInt(4);
		var t_1=t_tag;
		if(t_1=="cmap"){
			t_cmapOffset=t_offset;
		}else{
			if(t_1=="head"){
				t_headOffset=t_offset;
			}else{
				if(t_1=="hhea"){
					t_hheaOffset=t_offset;
				}else{
					if(t_1=="hmtx"){
						t_hmtxOffset=t_offset;
					}else{
						if(t_1=="maxp"){
							t_maxpOffset=t_offset;
						}else{
							if(t_1=="name"){
								t_nameOffset=t_offset;
							}else{
								if(t_1=="glyf"){
									t_glyfOffset=t_offset;
								}else{
									if(t_1=="loca"){
										t_locaOffset=t_offset;
									}else{
										if(t_1=="CFF "){
											t_CFFOffset=t_offset;
										}else{
											if(t_1=="VORG"){
												t_VORGOffset=t_offset;
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	this.m_GlyphNumber=this.m_Stream.p_PeekUInt(2,t_maxpOffset+4);
	this.m_FontLimits[0]=this.m_Stream.p_PeekInt(2,t_headOffset+36);
	this.m_FontLimits[1]=this.m_Stream.p_PeekInt(2,t_headOffset+38);
	this.m_FontLimits[2]=this.m_Stream.p_PeekInt(2,t_headOffset+40);
	this.m_FontLimits[3]=this.m_Stream.p_PeekInt(2,t_headOffset+42);
	this.m_FontScale=(t_Size)*1.0/(this.m_FontLimits[3]);
	this.m_LineHeight=t_Size;
	var t_LocaFormat=this.m_Stream.p_PeekInt(2,t_headOffset+50);
	var t_HMetricsNumber=this.m_Stream.p_PeekUInt(2,t_hheaOffset+34);
	this.m_GlyphId=new_number_array(1000);
	this.m_Glyph=new_object_array(this.m_GlyphNumber);
	for(var t_i2=0;t_i2<=this.m_GlyphNumber-1;t_i2=t_i2+1){
		this.m_Glyph[t_i2]=c_TFont_Glyph.m_new.call(new c_TFont_Glyph);
	}
	this.p_LoadMetrics(t_hmtxOffset,t_HMetricsNumber);
	this.p_LoadCmapData(t_cmapOffset);
	this.p_LoadLoca(t_locaOffset,t_LocaFormat,t_glyfOffset);
	for(var t_g=0;t_g<=this.m_GlyphNumber-1;t_g=t_g+1){
		this.p_LoadGlyfData(t_g,this.m_Glyph[t_g].m_FileAddress);
		this.p_QuadGlyph(t_g);
		this.p_SmoothGlyph(t_g);
	}
	for(var t_g2=0;t_g2<=this.m_GlyphNumber-1;t_g2=t_g2+1){
		this.m_Glyph[t_g2].m_Poly=new_object_array(this.m_Glyph[t_g2].m_ContourNumber);
		for(var t_c=0;t_c<=this.m_Glyph[t_g2].m_ContourNumber-1;t_c=t_c+1){
			this.m_Glyph[t_g2].m_Poly[t_c]=c_TFont_Poly.m_new.call(new c_TFont_Poly,this.m_Glyph[t_g2].m_xyList[t_c],this.m_FontScale);
			if(this.m_Glyph[t_g2].m_ContourNumber==1 && !this.m_ClockwiseFound){
				this.m_FontClockwise=this.m_Glyph[t_g2].m_Poly[0].m_Clockwise;
				this.m_ClockwiseFound=true;
			}
		}
	}
	return this;
}
c_TFont.m_new2=function(){
	return this;
}
c_TFont.prototype.p_LoadGlyphImages=function(){
	var t_OrigColor=bb_graphics_GetColor();
	var t_BW=(((this.m_FontLimits[2]-this.m_FontLimits[0])*this.m_FontScale+2.0)|0);
	var t_BH=(((this.m_FontLimits[3]-this.m_FontLimits[1])*this.m_FontScale+2.0)|0);
	var t_BG=bb_graphics_CreateImage(t_BW,t_BH,1,c_Image.m_DefaultFlags);
	var t_BGPixels=new_number_array(t_BW*t_BH);
	bb_graphics_ReadPixels(t_BGPixels,0,0,t_BW,t_BH,0,0);
	t_BG.p_WritePixels(t_BGPixels,0,0,t_BW,t_BH,0,0);
	bb_graphics_PushMatrix();
	bb_graphics_Scale(this.m_FontScale,this.m_FontScale);
	for(var t_g=0;t_g<=this.m_GlyphNumber-1;t_g=t_g+1){
		if(this.m_Glyph[t_g].m_ContourNumber<1){
			continue;
		}
		var t_W=(((this.m_Glyph[t_g].m_W)*this.m_FontScale+4.0)|0);
		var t_H=(((this.m_Glyph[t_g].m_H)*this.m_FontScale+4.0)|0);
		if(t_W<1 || t_H<1){
			continue;
		}
		bb_graphics_SetColor(255.0,255.0,255.0);
		bb_graphics_DrawRect(0.0,0.0,(t_W)/this.m_FontScale,(t_H)/this.m_FontScale);
		bb_graphics_SetColor(0.0,0.0,0.0);
		for(var t_i=0;t_i<=this.m_Glyph[t_g].m_ContourNumber-1;t_i=t_i+1){
			if(this.m_Glyph[t_g].m_Poly[t_i].m_Clockwise==this.m_FontClockwise){
				this.m_Glyph[t_g].m_Poly[t_i].p_Draw();
			}
		}
		bb_graphics_SetColor(255.0,255.0,255.0);
		for(var t_i2=0;t_i2<=this.m_Glyph[t_g].m_ContourNumber-1;t_i2=t_i2+1){
			if(this.m_Glyph[t_g].m_Poly[t_i2].m_Clockwise!=this.m_FontClockwise){
				this.m_Glyph[t_g].m_Poly[t_i2].p_Draw();
			}
		}
		var t_pixels=new_number_array(t_W*t_H);
		bb_graphics_ReadPixels(t_pixels,0,0,t_W,t_H,0,0);
		for(var t_i3=0;t_i3<t_pixels.length;t_i3=t_i3+1){
			var t_argb=t_pixels[t_i3];
			var t_a=t_argb>>24&255;
			var t_r=t_argb>>16&255;
			var t_g2=t_argb>>8&255;
			var t_b=t_argb&255;
			t_a=255-t_r;
			t_r=this.m_Color[0];
			t_g2=this.m_Color[1];
			t_b=this.m_Color[2];
			t_argb=t_a<<24|t_r<<16|t_g2<<8|t_b;
			t_pixels[t_i3]=t_argb;
		}
		this.m_Glyph[t_g].m_Img=bb_graphics_CreateImage(t_W,t_H,1,c_Image.m_DefaultFlags);
		this.m_Glyph[t_g].m_Img.p_WritePixels(t_pixels,0,0,t_W,t_H,0,0);
	}
	bb_graphics_PopMatrix();
	bb_graphics_SetColor(255.0,255.0,255.0);
	bb_graphics_DrawImage(t_BG,0.0,0.0,0);
	this.m_ImagesLoaded=true;
	bb_graphics_SetColor(t_OrigColor[0],t_OrigColor[1],t_OrigColor[2]);
	return 0;
}
c_TFont.prototype.p_TextHeight=function(t_Text,t_AdditionalLineSpace){
	var t_Height=0;
	var t_Lines=t_Text.split("\n").length;
	return t_Lines*this.m_LineHeight+t_Lines*t_AdditionalLineSpace;
}
c_TFont.prototype.p_TextWidth=function(t_Text,t_AdditionalLetterSpace){
	var t_Width=0;
	var t_=t_Text.split("\n");
	var t_2=0;
	while(t_2<t_.length){
		var t_L=t_[t_2];
		t_2=t_2+1;
		var t_TempWidth=0;
		var t_3=t_L;
		var t_4=0;
		while(t_4<t_3.length){
			var t_c=t_3.charCodeAt(t_4);
			t_4=t_4+1;
			var t_Id=this.m_GlyphId[t_c];
			t_TempWidth=(((t_TempWidth)+(this.m_Glyph[t_Id].m_Adv)*this.m_FontScale+(t_AdditionalLetterSpace))|0);
		}
		if(t_TempWidth>t_Width){
			t_Width=t_TempWidth;
		}
	}
	return t_Width;
}
c_TFont.prototype.p_DrawText=function(t_Text,t_x,t_y,t_CenterX,t_CenterY,t_AdditionalLetterSpace,t_AdditionalLineSpace){
	if(this.m_ImagesLoaded==false){
		this.p_LoadGlyphImages();
		this.m_ImagesLoaded=true;
	}
	var t_X2=t_x;
	var t_Y2=t_y;
	if(t_CenterY==1){
		t_Y2=t_Y2-((this.p_TextHeight(t_Text,t_AdditionalLineSpace)/2)|0);
	}
	var t_=t_Text.split("\n");
	var t_2=0;
	while(t_2<t_.length){
		var t_L=t_[t_2];
		t_2=t_2+1;
		var t_3=t_L;
		var t_4=0;
		while(t_4<t_3.length){
			var t_c=t_3.charCodeAt(t_4);
			t_4=t_4+1;
			var t_Id=this.m_GlyphId[t_c];
			var t_tx=(((t_X2)+(this.m_Glyph[t_Id].m_xMin)*this.m_FontScale)|0);
			var t_ty=(((t_Y2)-(this.m_Glyph[t_Id].m_yMax)*this.m_FontScale+(this.m_LineHeight))|0);
			if(t_CenterX==1){
				t_tx=t_tx-((this.p_TextWidth(t_L,t_AdditionalLetterSpace)/2)|0);
			}
			if(t_c>32){
				if(this.m_Glyph[t_Id].m_Img!=null){
					bb_graphics_DrawImage(this.m_Glyph[t_Id].m_Img,(t_tx),(t_ty),0);
				}
			}
			t_X2=(((t_X2)+(this.m_Glyph[t_Id].m_Adv)*this.m_FontScale+(t_AdditionalLetterSpace))|0);
		}
		t_X2=t_x;
		t_Y2=t_Y2+this.m_LineHeight+t_AdditionalLineSpace;
	}
	return 0;
}
function c_DataStream(){
	Object.call(this);
	this.m_Buffer=null;
	this.m_Pointer=0;
	this.m_BigEndian=false;
}
c_DataStream.m_new=function(t_Path,t_BigEndianFormat){
	this.m_Buffer=c_DataBuffer.m_Load(t_Path);
	this.m_Pointer=0;
	this.m_BigEndian=t_BigEndianFormat;
	return this;
}
c_DataStream.m_new2=function(){
	return this;
}
c_DataStream.prototype.p_ByteToArr=function(t_Address){
	var t_I=this.m_Buffer.PeekByte(t_Address);
	var t_Str=new_number_array(8);
	if(t_I>-1){
		var t_D=128;
		var t_Counter=0;
		while(t_I>0){
			if(t_I>=t_D){
				t_Str[t_Counter]=1;
				t_I=t_I-t_D;
			}else{
				t_Str[t_Counter]=0;
			}
			t_D=((t_D/2)|0);
			t_Counter=t_Counter+1;
		}
		while(t_Counter<8){
			t_Str[t_Counter]=0;
			t_Counter=t_Counter+1;
		}
		return t_Str;
	}
	t_I=t_I*-1;
	var t_D2=128;
	var t_Counter2=0;
	while(t_I>0){
		if(t_I>=t_D2){
			t_Str[t_Counter2]=1;
			t_I=t_I-t_D2;
		}else{
			t_Str[t_Counter2]=0;
		}
		t_D2=((t_D2/2)|0);
		t_Counter2=t_Counter2+1;
	}
	while(t_Str.length<8){
		t_Str[t_Counter2]=0;
		t_Counter2=t_Counter2+1;
	}
	for(var t_i2=7;t_i2>=0;t_i2=t_i2+-1){
		if(t_Str[t_i2]==0){
			t_Str[t_i2]=1;
		}else{
			t_Str[t_i2]=0;
		}
	}
	for(var t_i3=7;t_i3>=0;t_i3=t_i3+-1){
		if(t_Str[t_i3]==0){
			t_Str[t_i3]=1;
			break;
		}else{
			t_Str[t_i3]=0;
		}
	}
	return t_Str;
}
c_DataStream.prototype.p_BytesToArr=function(t_Address,t_Count){
	var t_Str=new_number_array(t_Count*8);
	var t_Counter=0;
	for(var t_i=0;t_i<=t_Count-1;t_i=t_i+1){
		var t_Byt=this.p_ByteToArr(t_Address+t_i);
		for(var t_c=0;t_c<=7;t_c=t_c+1){
			t_Str[t_Counter]=t_Byt[t_c];
			t_Counter=t_Counter+1;
		}
	}
	return t_Str;
}
c_DataStream.m_ChangeEndian=function(t_BitString){
	if(t_BitString.length<16){
		return t_BitString;
	}
	var t_t=0;
	for(var t_b=0;t_b<=(((t_BitString.length-1)/2)|0);t_b=t_b+8){
		for(var t_i=0;t_i<=7;t_i=t_i+1){
			t_t=t_BitString[t_b+t_i];
			t_BitString[t_b+t_i]=t_BitString[t_BitString.length-8-t_b+t_i];
			t_BitString[t_BitString.length-8-t_b+t_i]=t_t;
		}
	}
	return t_BitString;
}
c_DataStream.m_CalculateBits=function(t_BitString){
	if(t_BitString[0]==0){
		var t_Rtn=0;
		var t_D=1;
		for(var t_i=t_BitString.length-1;t_i>=0;t_i=t_i+-1){
			if(t_BitString[t_i]==1){
				t_Rtn=t_Rtn+t_D;
			}
			t_D=t_D*2;
		}
		return t_Rtn;
	}
	for(var t_i2=0;t_i2<=t_BitString.length-1;t_i2=t_i2+1){
		if(t_BitString[t_i2]==0){
			t_BitString[t_i2]=1;
		}else{
			t_BitString[t_i2]=0;
		}
	}
	for(var t_i3=t_BitString.length-1;t_i3>=0;t_i3=t_i3+-1){
		if(t_BitString[t_i3]==0){
			t_BitString[t_i3]=1;
			break;
		}else{
			t_BitString[t_i3]=0;
		}
	}
	var t_Rtn2=0;
	var t_D2=1;
	for(var t_i4=t_BitString.length-1;t_i4>=0;t_i4=t_i4+-1){
		if(t_BitString[t_i4]==1){
			t_Rtn2=t_Rtn2+t_D2;
		}
		t_D2=t_D2*2;
	}
	return t_Rtn2*-1;
}
c_DataStream.prototype.p_ReadInt=function(t_ByteCount){
	this.m_Pointer=this.m_Pointer+t_ByteCount;
	if(!this.m_BigEndian){
		return c_DataStream.m_CalculateBits(c_DataStream.m_ChangeEndian(this.p_BytesToArr(this.m_Pointer-t_ByteCount,t_ByteCount)));
	}
	return c_DataStream.m_CalculateBits(this.p_BytesToArr(this.m_Pointer-t_ByteCount,t_ByteCount));
}
c_DataStream.prototype.p_ReadFixed32=function(){
	return parseFloat(String(this.p_ReadInt(2))+"."+String(this.p_ReadInt(2)));
}
c_DataStream.m_CalculateUBits=function(t_BitString){
	var t_Rtn=0;
	var t_D=1;
	for(var t_i=t_BitString.length-1;t_i>=0;t_i=t_i+-1){
		if(t_BitString[t_i]==1){
			t_Rtn=t_Rtn+t_D;
		}
		t_D=t_D*2;
	}
	return t_Rtn;
}
c_DataStream.prototype.p_ReadUInt=function(t_ByteCount){
	this.m_Pointer=this.m_Pointer+t_ByteCount;
	if(!this.m_BigEndian){
		return c_DataStream.m_CalculateUBits(c_DataStream.m_ChangeEndian(this.p_BytesToArr(this.m_Pointer-t_ByteCount,t_ByteCount)));
	}
	return c_DataStream.m_CalculateUBits(this.p_BytesToArr(this.m_Pointer-t_ByteCount,t_ByteCount));
}
c_DataStream.prototype.p_ReadString=function(t_ByteCount){
	this.m_Pointer=this.m_Pointer+t_ByteCount;
	return this.m_Buffer.p_PeekString(this.m_Pointer-t_ByteCount,t_ByteCount,"utf8");
}
c_DataStream.prototype.p_PeekUInt=function(t_ByteCount,t_Address){
	if(!this.m_BigEndian){
		c_DataStream.m_CalculateUBits(c_DataStream.m_ChangeEndian(this.p_BytesToArr(t_Address,t_ByteCount)));
	}
	return c_DataStream.m_CalculateUBits(this.p_BytesToArr(t_Address,t_ByteCount));
}
c_DataStream.prototype.p_PeekInt=function(t_ByteCount,t_Address){
	if(!this.m_BigEndian){
		return c_DataStream.m_CalculateBits(c_DataStream.m_ChangeEndian(this.p_BytesToArr(t_Address,t_ByteCount)));
	}
	return c_DataStream.m_CalculateBits(this.p_BytesToArr(t_Address,t_ByteCount));
}
c_DataStream.prototype.p_SetPointer=function(t_Offset){
	this.m_Pointer=t_Offset;
	return 0;
}
c_DataStream.prototype.p_ReadBits=function(t_ByteCount){
	var t_Str=this.p_BytesToArr(this.m_Pointer,t_ByteCount);
	this.m_Pointer=this.m_Pointer+t_ByteCount;
	if(!this.m_BigEndian){
		t_Str=c_DataStream.m_ChangeEndian(t_Str);
	}
	var t_temp=0;
	for(var t_i=0;t_i<((t_Str.length/2)|0);t_i=t_i+1){
		t_temp=t_Str[t_i];
		t_Str[t_i]=t_Str[t_Str.length-t_i-1];
		t_Str[t_Str.length-t_i-1]=t_temp;
	}
	return t_Str;
}
function c_DataBuffer(){
	BBDataBuffer.call(this);
}
c_DataBuffer.prototype=extend_class(BBDataBuffer);
c_DataBuffer.m_new=function(t_length,t_direct){
	if(!this._New(t_length)){
		error("Allocate DataBuffer failed");
	}
	return this;
}
c_DataBuffer.m_new2=function(){
	return this;
}
c_DataBuffer.m_Load=function(t_path){
	var t_buf=c_DataBuffer.m_new2.call(new c_DataBuffer);
	if(t_buf._Load(t_path)){
		return t_buf;
	}
	return null;
}
c_DataBuffer.prototype.p_PeekBytes=function(t_address,t_bytes,t_offset,t_count){
	if(t_address+t_count>this.Length()){
		t_count=this.Length()-t_address;
	}
	if(t_offset+t_count>t_bytes.length){
		t_count=t_bytes.length-t_offset;
	}
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		t_bytes[t_offset+t_i]=this.PeekByte(t_address+t_i);
	}
}
c_DataBuffer.prototype.p_PeekBytes2=function(t_address,t_count){
	if(t_address+t_count>this.Length()){
		t_count=this.Length()-t_address;
	}
	var t_bytes=new_number_array(t_count);
	this.p_PeekBytes(t_address,t_bytes,0,t_count);
	return t_bytes;
}
c_DataBuffer.prototype.p_PeekString=function(t_address,t_count,t_encoding){
	var t_1=t_encoding;
	if(t_1=="utf8"){
		var t_p=this.p_PeekBytes2(t_address,t_count);
		var t_i=0;
		var t_e=t_p.length;
		var t_err=false;
		var t_q=new_number_array(t_e);
		var t_j=0;
		while(t_i<t_e){
			var t_c=t_p[t_i]&255;
			t_i+=1;
			if((t_c&128)!=0){
				if((t_c&224)==192){
					if(t_i>=t_e || (t_p[t_i]&192)!=128){
						t_err=true;
						break;
					}
					t_c=(t_c&31)<<6|t_p[t_i]&63;
					t_i+=1;
				}else{
					if((t_c&240)==224){
						if(t_i+1>=t_e || (t_p[t_i]&192)!=128 || (t_p[t_i+1]&192)!=128){
							t_err=true;
							break;
						}
						t_c=(t_c&15)<<12|(t_p[t_i]&63)<<6|t_p[t_i+1]&63;
						t_i+=2;
					}else{
						t_err=true;
						break;
					}
				}
			}
			t_q[t_j]=t_c;
			t_j+=1;
		}
		if(t_err){
			return string_fromchars(t_p);
		}
		if(t_j<t_e){
			t_q=t_q.slice(0,t_j);
		}
		return string_fromchars(t_q);
	}else{
		if(t_1=="ascii"){
			var t_p2=this.p_PeekBytes2(t_address,t_count);
			for(var t_i2=0;t_i2<t_p2.length;t_i2=t_i2+1){
				t_p2[t_i2]&=255;
			}
			return string_fromchars(t_p2);
		}
	}
	error("Invalid string encoding:"+t_encoding);
	return "";
}
c_DataBuffer.prototype.p_PeekString2=function(t_address,t_encoding){
	return this.p_PeekString(t_address,this.Length()-t_address,t_encoding);
}
function c_TFont_Glyph(){
	Object.call(this);
	this.m_Adv=0;
	this.m_Lsb=0;
	this.m_FileAddress=0;
	this.m_ContourNumber=0;
	this.m_xMin=0;
	this.m_yMin=0;
	this.m_xMax=0;
	this.m_yMax=0;
	this.m_W=0;
	this.m_H=0;
	this.m_xyList=[];
	this.m_Poly=[];
	this.m_Img=null;
}
c_TFont_Glyph.m_new=function(){
	return this;
}
function c_TFont_Poly(){
	Object.call(this);
	this.m_Scaler=.0;
	this.m_OrigArray=[];
	this.m_xyList=[];
	this.m_Clockwise=false;
}
c_TFont_Poly.prototype.p_GetClockWise=function(){
	var t_Total=0;
	for(var t_p1=0;t_p1<((this.m_xyList.length/2)|0);t_p1=t_p1+1){
		var t_p2=t_p1+1;
		if(t_p2==((this.m_xyList.length/2)|0)){
			t_p2=0;
		}
		t_Total=(((t_Total)+(this.m_xyList[t_p2*2]-this.m_xyList[t_p1*2])*(this.m_xyList[t_p2*2+1]+this.m_xyList[t_p1*2+1]))|0);
	}
	if(t_Total<0){
		return true;
	}
	return false;
}
c_TFont_Poly.m_new=function(t_xyList,t_Scaler){
	this.m_Scaler=t_Scaler;
	this.m_OrigArray=t_xyList;
	this.m_xyList=t_xyList;
	this.m_Clockwise=this.p_GetClockWise();
	return this;
}
c_TFont_Poly.m_new2=function(){
	return this;
}
c_TFont_Poly.prototype.p_Draw=function(){
	bb_graphics_DrawPoly(this.m_OrigArray);
	return 0;
}
var bb_ld38_2_PauseFont=null;
var bb_ld38_2_ScoreFont=null;
var bb_ld38_2_ScoreFontYellow=null;
var bb_ld38_2_CreditsFont=null;
var bb_ld38_2_TitleFont=null;
var bb_ld38_2_InstructFont=null;
var bb_app__updateRate=0;
function bb_app_SetUpdateRate(t_hertz){
	bb_app__updateRate=t_hertz;
	bb_app__game.SetUpdateRate(t_hertz);
}
function c_Perlin(){
	Object.call(this);
	this.m_p=new_number_array(512);
}
c_Perlin.m_new=function(){
	var t_permutation=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
	for(var t_idx=0;t_idx<512;t_idx=t_idx+1){
		this.m_p[t_idx]=t_permutation[t_idx % 256];
	}
	return this;
}
c_Perlin.m_Fade=function(t_t){
	return t_t*t_t*t_t*(t_t*(t_t*6.0-15.0)+10.0);
}
c_Perlin.m_Grad=function(t_hash,t_x,t_y,t_z){
	var t_h=t_hash&15;
	var t_u=0.0;
	var t_v=0.0;
	if(t_h<8){
		t_u=t_x;
	}else{
		t_u=t_y;
	}
	if(t_h<4){
		t_v=t_y;
	}else{
		if(t_h==12 || t_h==14){
			t_v=t_x;
		}else{
			t_v=t_z;
		}
	}
	if((t_h&1)==0){
		t_u=-t_u;
	}
	if((t_h&2)==0){
		t_v=-t_v;
	}
	return t_u+t_v;
}
c_Perlin.m_Lerp=function(t_a,t_b,t_x){
	return t_a+t_x*(t_b-t_a);
}
c_Perlin.prototype.p_Noise=function(t_x,t_y,t_z){
	var t_xi=((t_x)|0)&255;
	var t_yi=((t_y)|0)&255;
	var t_zi=((t_x)|0)&255;
	var t_xf=t_x-((t_x)|0);
	var t_yf=t_y-((t_y)|0);
	var t_zf=t_z-((t_z)|0);
	var t_u=c_Perlin.m_Fade(t_xf);
	var t_v=c_Perlin.m_Fade(t_yf);
	var t_w=c_Perlin.m_Fade(t_zf);
	var t_aaa=this.m_p[this.m_p[this.m_p[t_xi]+t_yi]+t_zi];
	var t_aba=this.m_p[this.m_p[this.m_p[t_xi]+(t_yi+1)]+t_zi];
	var t_aab=this.m_p[this.m_p[this.m_p[t_xi]+t_yi]+(t_zi+1)];
	var t_abb=this.m_p[this.m_p[this.m_p[t_xi]+(t_yi+1)]+(t_zi+1)];
	var t_baa=this.m_p[this.m_p[this.m_p[t_xi+1]+t_yi]+t_zi];
	var t_bba=this.m_p[this.m_p[this.m_p[t_xi+1]+(t_yi+1)]+t_zi];
	var t_bab=this.m_p[this.m_p[this.m_p[t_xi+1]+t_yi]+(t_zi+1)];
	var t_bbb=this.m_p[this.m_p[this.m_p[t_xi+1]+(t_yi+1)]+(t_zi+1)];
	var t_temp1=c_Perlin.m_Lerp(c_Perlin.m_Grad(t_aaa,t_xf,t_yf,t_zf),c_Perlin.m_Grad(t_baa,t_xf-1.0,t_yf,t_zf),t_u);
	var t_temp2=((c_Perlin.m_Lerp(c_Perlin.m_Grad(t_aba,t_xf,t_yf-1.0,t_zf),c_Perlin.m_Grad(t_bba,t_xf-1.0,t_yf-1.0,t_zf),t_u))|0);
	var t_y1=c_Perlin.m_Lerp(t_temp1,(t_temp2),t_v);
	t_temp1=c_Perlin.m_Lerp(c_Perlin.m_Grad(t_aab,t_xf,t_yf,t_zf-1.0),c_Perlin.m_Grad(t_bab,t_xf-1.0,t_yf,t_zf-1.0),t_u);
	t_temp2=((c_Perlin.m_Lerp(c_Perlin.m_Grad(t_abb,t_xf,t_yf-1.0,t_zf-1.0),c_Perlin.m_Grad(t_bbb,t_xf-1.0,t_yf-1.0,t_zf-1.0),t_u))|0);
	var t_y2=c_Perlin.m_Lerp(t_temp1,(t_temp2),t_v);
	return (c_Perlin.m_Lerp(t_y1,t_y2,t_w)+1.0)/2.0;
}
c_Perlin.prototype.p_OctaveNoise=function(t_x,t_y,t_z,t_octaves,t_persistence){
	var t_total=0.0;
	var t_frequency=1.0;
	var t_amplitude=1.0;
	var t_maxValue=0.0;
	for(var t_idx=0;t_idx<t_octaves;t_idx=t_idx+1){
		t_total=t_total+t_amplitude*this.p_Noise(t_x*t_frequency,t_y*t_frequency,t_z*t_frequency);
		t_maxValue=t_maxValue+t_amplitude;
		t_amplitude=t_amplitude*t_persistence;
		t_frequency=2.0*t_frequency;
	}
	return t_total/t_maxValue;
}
function c_Midiblaster(){
	Object.call(this);
	this.m_commandStack=null;
	this.m_csvData=[];
	this.m_appUpdateRate=0;
	this.m_startNote=0;
	this.m_noteOnTimes=c_IntMap3.m_new.call(new c_IntMap3);
	this.m_noteOffTimes=c_IntMap3.m_new.call(new c_IntMap3);
	this.m_currentTempo=0;
	this.m_isFirstNote=true;
	this.m_firstNoteTime=0;
	this.m_beatSpeed=0;
	this.m_gameTracks="";
	this.m_endNote=0;
	this.m_headerDone=false;
}
c_Midiblaster.m_new=function(t__updateRate){
	this.m_commandStack=c_Stack4.m_new.call(new c_Stack4);
	this.m_csvData=[];
	this.m_appUpdateRate=t__updateRate;
	return this;
}
c_Midiblaster.prototype.p_Clear=function(){
	this.m_csvData=[];
	this.m_commandStack.p_Clear();
	this.m_currentTempo=0;
	this.m_isFirstNote=true;
	this.m_firstNoteTime=0;
	this.m_beatSpeed=0;
	this.m_gameTracks="";
	this.m_startNote=0;
	this.m_endNote=0;
	this.m_headerDone=false;
	this.m_noteOnTimes.p_Clear();
	this.m_noteOffTimes.p_Clear();
	return 0;
}
c_Midiblaster.prototype.p_ConvertTime=function(t_timein){
	return (((t_timein)*(1.0/(this.m_beatSpeed))*(this.m_currentTempo)*(1.0/Math.pow(10.0,6.0))*(this.m_appUpdateRate))|0);
}
c_Midiblaster.prototype.p_ReadFile=function(t_filepath){
	this.m_csvData=bb_app_LoadString(t_filepath).split("\n");
	for(var t_idx=0;t_idx<this.m_csvData.length;t_idx=t_idx+1){
		var t_currStr=this.m_csvData[t_idx];
		if(!this.m_headerDone){
			if(t_currStr.toLowerCase().indexOf("header")!=-1){
				this.m_beatSpeed=parseInt((string_trim(t_currStr.split(",")[5])),10);
				this.m_headerDone=true;
			}
		}
		if(t_currStr.toLowerCase().indexOf("ingame")!=-1){
			this.m_gameTracks=this.m_gameTracks+string_trim(t_currStr.split(",")[0]);
			this.m_startNote=parseInt((string_trim(t_currStr.split("\"")[1].split(",")[1])),10);
			this.m_endNote=parseInt((string_trim(t_currStr.split("\"")[1].split(",")[2])),10);
			for(var t_idx2=0;t_idx2<24;t_idx2=t_idx2+1){
				this.m_noteOnTimes.p_Set11(t_idx2+this.m_startNote,c_IntStack.m_new2.call(new c_IntStack));
				this.m_noteOffTimes.p_Set11(t_idx2+this.m_startNote,c_IntStack.m_new2.call(new c_IntStack));
			}
		}
		if(t_currStr.toLowerCase().indexOf("tempo")!=-1){
			this.m_currentTempo=parseInt((string_trim(t_currStr.split(",")[3])),10);
		}
		if(this.m_gameTracks.indexOf(t_currStr.split(",")[0])!=-1){
			if((t_currStr.toLowerCase().indexOf("note_on_c")!=-1) || (t_currStr.toLowerCase().indexOf("note_off_c")!=-1)){
				var t_info=t_currStr.split(",");
				var t_midiTime=parseInt((string_trim(t_info[1])),10);
				if(this.m_isFirstNote){
					this.m_isFirstNote=false;
					this.m_firstNoteTime=t_midiTime;
				}
				var t_channel=parseInt((string_trim(t_info[3])),10);
				var t_note=parseInt((string_trim(t_info[4])),10);
				var t_time=this.p_ConvertTime(t_midiTime);
				var t_volume=parseInt((string_trim(t_info[5])),10);
				var t_state=false;
				if((t_info[2].toLowerCase().indexOf("off")!=-1) || t_volume==0){
					t_state=false;
				}else{
					t_state=true;
				}
				if(t_note>=this.m_startNote && t_note<this.m_startNote+24){
					if(t_state){
						this.m_noteOnTimes.p_Get(t_note).p_Insert2(0,t_time);
					}else{
						this.m_noteOffTimes.p_Get(t_note).p_Insert2(0,t_time);
					}
				}
			}
		}
	}
	return 0;
}
function c_MidiCommand(){
	Object.call(this);
}
function c_Stack4(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack4.m_new=function(){
	return this;
}
c_Stack4.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack4.m_NIL=null;
c_Stack4.prototype.p_Clear=function(){
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		this.m_data[t_i]=c_Stack4.m_NIL;
	}
	this.m_length=0;
}
var bb_random_Seed=0;
function c_Vector(){
	Object.call(this);
	this.m__x=.0;
	this.m__y=.0;
}
c_Vector.prototype.p_x=function(t_xIn){
	this.m__x=t_xIn;
	return 0;
}
c_Vector.prototype.p_x2=function(){
	return this.m__x;
}
c_Vector.prototype.p_y=function(t_yIn){
	this.m__y=t_yIn;
	return 0;
}
c_Vector.prototype.p_y2=function(){
	return this.m__y;
}
c_Vector.m_new=function(t_x,t_y){
	this.p_x(t_x);
	this.p_y(t_y);
	return this;
}
c_Vector.prototype.p_Magnitude=function(){
	return Math.sqrt(Math.pow(this.p_x2(),2.0)+Math.pow(this.p_y2(),2.0));
}
c_Vector.prototype.p_Angle=function(){
	return (Math.atan2(this.p_y2(),this.p_x2())*R2D);
}
c_Vector.prototype.p_Set4=function(t_vector){
	this.p_x(t_vector.p_x2());
	this.p_y(t_vector.p_y2());
	return this;
}
c_Vector.prototype.p_Set5=function(t_x,t_y){
	this.p_x(t_x);
	this.p_y(t_y);
	return this;
}
c_Vector.prototype.p_Angle2=function(t_theta){
	var t_mag=this.p_Magnitude();
	this.p_Set5(t_mag*Math.cos((t_theta)*D2R),t_mag*Math.sin((t_theta)*D2R));
	return 0;
}
c_Vector.prototype.p_Magnitude2=function(t_mag){
	var t_ang=this.p_Angle();
	this.p_x(Math.cos((t_ang)*D2R)*t_mag);
	this.p_y(Math.sin((t_ang)*D2R)*t_mag);
	return 0;
}
c_Vector.prototype.p_Plus=function(t_other){
	var t_resultVect=c_Vector.m_new.call(new c_Vector,0.0,0.0);
	t_resultVect.p_x(this.p_x2()+t_other.p_x2());
	t_resultVect.p_y(this.p_y2()+t_other.p_y2());
	return t_resultVect;
}
c_Vector.prototype.p_Minus=function(t_other){
	var t_resultVect=c_Vector.m_new.call(new c_Vector,0.0,0.0);
	t_resultVect.p_x(this.p_x2()-t_other.p_x2());
	t_resultVect.p_y(this.p_y2()-t_other.p_y2());
	return t_resultVect;
}
function c_VirtualDisplay(){
	Object.call(this);
	this.m_vwidth=.0;
	this.m_vheight=.0;
	this.m_vzoom=.0;
	this.m_lastvzoom=.0;
	this.m_vratio=.0;
	this.m_multi=.0;
	this.m_lastdevicewidth=0;
	this.m_lastdeviceheight=0;
	this.m_device_changed=0;
	this.m_fdw=.0;
	this.m_fdh=.0;
	this.m_dratio=.0;
	this.m_heightborder=.0;
	this.m_widthborder=.0;
	this.m_zoom_changed=0;
	this.m_realx=.0;
	this.m_realy=.0;
	this.m_offx=.0;
	this.m_offy=.0;
	this.m_sx=.0;
	this.m_sw=.0;
	this.m_sy=.0;
	this.m_sh=.0;
	this.m_scaledw=.0;
	this.m_scaledh=.0;
	this.m_vxoff=.0;
	this.m_vyoff=.0;
}
c_VirtualDisplay.m_Display=null;
c_VirtualDisplay.m_new=function(t_width,t_height,t_zoom){
	this.m_vwidth=(t_width);
	this.m_vheight=(t_height);
	this.m_vzoom=t_zoom;
	this.m_lastvzoom=this.m_vzoom+1.0;
	this.m_vratio=this.m_vheight/this.m_vwidth;
	c_VirtualDisplay.m_Display=this;
	return this;
}
c_VirtualDisplay.m_new2=function(){
	return this;
}
c_VirtualDisplay.prototype.p_VMouseX=function(t_limit){
	var t_mouseoffset=bb_input_MouseX()-(bb_app_DeviceWidth())*0.5;
	var t_x=t_mouseoffset/this.m_multi/this.m_vzoom+bb_autofit_VDeviceWidth()*0.5;
	if(t_limit){
		var t_widthlimit=this.m_vwidth-1.0;
		if(t_x>0.0){
			if(t_x<t_widthlimit){
				return t_x;
			}else{
				return t_widthlimit;
			}
		}else{
			return 0.0;
		}
	}else{
		return t_x;
	}
}
c_VirtualDisplay.prototype.p_VMouseY=function(t_limit){
	var t_mouseoffset=bb_input_MouseY()-(bb_app_DeviceHeight())*0.5;
	var t_y=t_mouseoffset/this.m_multi/this.m_vzoom+bb_autofit_VDeviceHeight()*0.5;
	if(t_limit){
		var t_heightlimit=this.m_vheight-1.0;
		if(t_y>0.0){
			if(t_y<t_heightlimit){
				return t_y;
			}else{
				return t_heightlimit;
			}
		}else{
			return 0.0;
		}
	}else{
		return t_y;
	}
}
c_VirtualDisplay.prototype.p_VTouchX=function(t_index,t_limit){
	var t_touchoffset=bb_input_TouchX(t_index)-(bb_app_DeviceWidth())*0.5;
	var t_x=t_touchoffset/this.m_multi/this.m_vzoom+bb_autofit_VDeviceWidth()*0.5;
	if(t_limit){
		var t_widthlimit=this.m_vwidth-1.0;
		if(t_x>0.0){
			if(t_x<t_widthlimit){
				return t_x;
			}else{
				return t_widthlimit;
			}
		}else{
			return 0.0;
		}
	}else{
		return t_x;
	}
}
c_VirtualDisplay.prototype.p_UpdateVirtualDisplay=function(t_zoomborders,t_keepborders){
	if(bb_app_DeviceWidth()!=this.m_lastdevicewidth || bb_app_DeviceHeight()!=this.m_lastdeviceheight){
		this.m_lastdevicewidth=bb_app_DeviceWidth();
		this.m_lastdeviceheight=bb_app_DeviceHeight();
		this.m_device_changed=1;
	}
	if((this.m_device_changed)!=0){
		this.m_fdw=(bb_app_DeviceWidth());
		this.m_fdh=(bb_app_DeviceHeight());
		this.m_dratio=this.m_fdh/this.m_fdw;
		if(this.m_dratio>this.m_vratio){
			this.m_multi=this.m_fdw/this.m_vwidth;
			this.m_heightborder=(this.m_fdh-this.m_vheight*this.m_multi)*0.5;
			this.m_widthborder=0.0;
		}else{
			this.m_multi=this.m_fdh/this.m_vheight;
			this.m_widthborder=(this.m_fdw-this.m_vwidth*this.m_multi)*0.5;
			this.m_heightborder=0.0;
		}
	}
	if(this.m_vzoom!=this.m_lastvzoom){
		this.m_lastvzoom=this.m_vzoom;
		this.m_zoom_changed=1;
	}
	if(((this.m_zoom_changed)!=0) || ((this.m_device_changed)!=0)){
		if(t_zoomborders){
			this.m_realx=this.m_vwidth*this.m_vzoom*this.m_multi;
			this.m_realy=this.m_vheight*this.m_vzoom*this.m_multi;
			this.m_offx=(this.m_fdw-this.m_realx)*0.5;
			this.m_offy=(this.m_fdh-this.m_realy)*0.5;
			if(t_keepborders){
				if(this.m_offx<this.m_widthborder){
					this.m_sx=this.m_widthborder;
					this.m_sw=this.m_fdw-this.m_widthborder*2.0;
				}else{
					this.m_sx=this.m_offx;
					this.m_sw=this.m_fdw-this.m_offx*2.0;
				}
				if(this.m_offy<this.m_heightborder){
					this.m_sy=this.m_heightborder;
					this.m_sh=this.m_fdh-this.m_heightborder*2.0;
				}else{
					this.m_sy=this.m_offy;
					this.m_sh=this.m_fdh-this.m_offy*2.0;
				}
			}else{
				this.m_sx=this.m_offx;
				this.m_sw=this.m_fdw-this.m_offx*2.0;
				this.m_sy=this.m_offy;
				this.m_sh=this.m_fdh-this.m_offy*2.0;
			}
			this.m_sx=bb_math_Max2(0.0,this.m_sx);
			this.m_sy=bb_math_Max2(0.0,this.m_sy);
			this.m_sw=bb_math_Min2(this.m_sw,this.m_fdw);
			this.m_sh=bb_math_Min2(this.m_sh,this.m_fdh);
		}else{
			this.m_sx=bb_math_Max2(0.0,this.m_widthborder);
			this.m_sy=bb_math_Max2(0.0,this.m_heightborder);
			this.m_sw=bb_math_Min2(this.m_fdw-this.m_widthborder*2.0,this.m_fdw);
			this.m_sh=bb_math_Min2(this.m_fdh-this.m_heightborder*2.0,this.m_fdh);
		}
		this.m_scaledw=this.m_vwidth*this.m_multi*this.m_vzoom;
		this.m_scaledh=this.m_vheight*this.m_multi*this.m_vzoom;
		this.m_vxoff=(this.m_fdw-this.m_scaledw)*0.5;
		this.m_vyoff=(this.m_fdh-this.m_scaledh)*0.5;
		this.m_vxoff=this.m_vxoff/this.m_multi/this.m_vzoom;
		this.m_vyoff=this.m_vyoff/this.m_multi/this.m_vzoom;
		this.m_device_changed=0;
		this.m_zoom_changed=0;
	}
	bb_graphics_SetScissor(0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	bb_graphics_Cls(0.0,0.0,0.0);
	bb_graphics_SetScissor(this.m_sx,this.m_sy,this.m_sw,this.m_sh);
	bb_graphics_Scale(this.m_multi*this.m_vzoom,this.m_multi*this.m_vzoom);
	if((this.m_vzoom)!=0.0){
		bb_graphics_Translate(this.m_vxoff,this.m_vyoff);
	}
	return 0;
}
function bb_autofit_SetVirtualDisplay(t_width,t_height,t_zoom){
	c_VirtualDisplay.m_new.call(new c_VirtualDisplay,t_width,t_height,t_zoom);
	return 0;
}
function c_AssetManager(){
	Object.call(this);
	this.m_images=null;
	this.m_cMasks=null;
	this.m_sounds=null;
}
c_AssetManager.m_new=function(t_cmFlag){
	this.m_images=c_StringMap.m_new.call(new c_StringMap);
	this.m_cMasks=c_StringMap2.m_new.call(new c_StringMap2);
	this.m_sounds=c_StringMap3.m_new.call(new c_StringMap3);
	return this;
}
c_AssetManager.prototype.p_AddImage=function(t_img,t_name){
	this.m_images.p_Set6(t_name,t_img);
	return 0;
}
c_AssetManager.prototype.p_LoadImage=function(t_path,t_numFrames){
	var t_img=bb_graphics_LoadImage(t_path+".png",t_numFrames,1);
	if(t_img!=null){
		this.p_AddImage(t_img,t_path);
	}else{
		print("Failure loading "+t_path+".png");
	}
	return 0;
}
c_AssetManager.prototype.p_AddSound=function(t_snd,t_name){
	this.m_sounds.p_Set8(t_name,t_snd);
	return 0;
}
c_AssetManager.prototype.p_LoadSound=function(t_path,t_fileType){
	var t_snd=bb_audio_LoadSound(t_path+"."+t_fileType);
	if(t_snd!=null){
		this.p_AddSound(t_snd,t_path);
	}else{
		print("Failure loading "+t_path+"."+t_fileType);
	}
	return 0;
}
c_AssetManager.prototype.p_GetImage=function(t_path){
	return this.m_images.p_Get2(t_path);
}
c_AssetManager.prototype.p_GetSound=function(t_path){
	return this.m_sounds.p_Get2(t_path);
}
function c_Map2(){
	Object.call(this);
	this.m_root=null;
}
c_Map2.m_new=function(){
	return this;
}
c_Map2.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map2.prototype.p_RotateLeft2=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map2.prototype.p_RotateRight2=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map2.prototype.p_InsertFixup2=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight2(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft2(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map2.prototype.p_Set6=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node2.m_new.call(new c_Node2,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup2(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map2.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map2.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_StringMap(){
	c_Map2.call(this);
}
c_StringMap.prototype=extend_class(c_Map2);
c_StringMap.m_new=function(){
	c_Map2.m_new.call(this);
	return this;
}
c_StringMap.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Map3(){
	Object.call(this);
	this.m_root=null;
}
c_Map3.m_new=function(){
	return this;
}
c_Map3.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map3.prototype.p_RotateLeft3=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map3.prototype.p_RotateRight3=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map3.prototype.p_InsertFixup3=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight3(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft3(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map3.prototype.p_Set7=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node4.m_new.call(new c_Node4,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup3(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map3.prototype.p_Keys=function(){
	return c_MapKeys.m_new.call(new c_MapKeys,this);
}
c_Map3.prototype.p_FirstNode=function(){
	if(!((this.m_root)!=null)){
		return null;
	}
	var t_node=this.m_root;
	while((t_node.m_left)!=null){
		t_node=t_node.m_left;
	}
	return t_node;
}
c_Map3.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map3.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return [];
}
function c_StringMap2(){
	c_Map3.call(this);
}
c_StringMap2.prototype=extend_class(c_Map3);
c_StringMap2.m_new=function(){
	c_Map3.m_new.call(this);
	return this;
}
c_StringMap2.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Sound(){
	Object.call(this);
	this.m_sample=null;
}
c_Sound.m_new=function(t_sample){
	this.m_sample=t_sample;
	return this;
}
c_Sound.m_new2=function(){
	return this;
}
function c_Map4(){
	Object.call(this);
	this.m_root=null;
}
c_Map4.m_new=function(){
	return this;
}
c_Map4.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map4.prototype.p_RotateLeft4=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map4.prototype.p_RotateRight4=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map4.prototype.p_InsertFixup4=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft4(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight4(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight4(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft4(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map4.prototype.p_Set8=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node3.m_new.call(new c_Node3,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup4(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map4.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map4.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_StringMap3(){
	c_Map4.call(this);
}
c_StringMap3.prototype=extend_class(c_Map4);
c_StringMap3.m_new=function(){
	c_Map4.m_new.call(this);
	return this;
}
c_StringMap3.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function bb_ld38_2_GetAssetManager(){
	return c_LD38.m_Data.m_assetManager;
}
function c_Node2(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node2.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node2.m_new2=function(){
	return this;
}
function bb_audio_LoadSound(t_path){
	var t_sample=bb_audio_device.LoadSample(bb_data_FixDataPath(t_path));
	if((t_sample)!=null){
		return c_Sound.m_new.call(new c_Sound,t_sample);
	}
	return null;
}
function c_Node3(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node3.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node3.m_new2=function(){
	return this;
}
function bb_ld38_2_LoadAllImages(){
	var t__am=bb_ld38_2_GetAssetManager();
	t__am.p_LoadImage("sprMissing",2);
	t__am.p_LoadImage("sprMenuButton",4);
	t__am.p_LoadImage("sprBug2Test",10);
	t__am.p_LoadImage("sprStringsBetter",1);
	t__am.p_LoadImage("sprStringsBetter3",1);
	t__am.p_LoadImage("sprHammer",4);
	t__am.p_LoadImage("sprHammerBar",1);
	t__am.p_LoadImage("titleScreen",1);
	t__am.p_LoadImage("titleScreenGS",1);
	t__am.p_LoadImage("sprHammerStick",1);
	t__am.p_LoadSound("jump","wav");
	t__am.p_LoadSound("bump","wav");
	t__am.p_LoadSound("squish","wav");
	t__am.p_LoadSound("gameover","wav");
	return 0;
}
function c_Controller(){
	Object.call(this);
	this.m__playerNo=0;
	this.m__direction=-1;
	this.m__mapping=null;
	this.m__input=null;
	this.m__justPressed=null;
	this.m__justReleased=null;
	this.m__isDirectionPressed=false;
}
c_Controller.prototype.p_InitDefaultMapping=function(t_pNo){
	this.m__mapping=c_StringMap2.m_new.call(new c_StringMap2);
	if(t_pNo==0){
		this.m__mapping.p_Set7("LEFT",[264,65,37]);
		this.m__mapping.p_Set7("UP",[265,87,38]);
		this.m__mapping.p_Set7("RIGHT",[266,68,39]);
		this.m__mapping.p_Set7("DOWN",[267,40]);
		this.m__mapping.p_Set7("A",[256,32]);
		this.m__mapping.p_Set7("B",[257,90]);
		this.m__mapping.p_Set7("X",[258,88]);
		this.m__mapping.p_Set7("Y",[259,67]);
		this.m__mapping.p_Set7("START",[263,13]);
		this.m__mapping.p_Set7("SELECT",[262,222]);
		this.m__mapping.p_Set7("LTRIG",[260,81]);
		this.m__mapping.p_Set7("RTRIG",[261,69]);
		this.m__mapping.p_Set7("1",[49]);
		this.m__mapping.p_Set7("2",[50]);
		this.m__mapping.p_Set7("3",[51]);
		this.m__mapping.p_Set7("4",[52]);
		this.m__mapping.p_Set7("5",[53]);
		this.m__mapping.p_Set7("6",[54]);
		this.m__mapping.p_Set7("7",[55]);
		this.m__mapping.p_Set7("8",[56]);
		this.m__mapping.p_Set7("9",[57]);
		this.m__mapping.p_Set7("0",[48]);
	}
	return 0;
}
c_Controller.prototype.p_InitInitialInput=function(t_pNo){
	this.m__input=c_StringMap4.m_new.call(new c_StringMap4);
	this.m__justPressed=c_StringMap4.m_new.call(new c_StringMap4);
	this.m__justReleased=c_StringMap4.m_new.call(new c_StringMap4);
	var t_=this.m__mapping.p_Keys().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_key=t_.p_NextObject();
		this.m__input.p_Set9(t_key,false);
		this.m__justPressed.p_Set9(t_key,false);
		this.m__justReleased.p_Set9(t_key,false);
	}
	return 0;
}
c_Controller.m_new=function(t_p){
	this.m__playerNo=t_p;
	this.m__direction=-1;
	this.p_InitDefaultMapping(this.m__playerNo);
	this.p_InitInitialInput(this.m__playerNo);
	return this;
}
c_Controller.m_new2=function(){
	return this;
}
c_Controller.prototype.p_CheckControl=function(t_str){
	var t_allValidInputs=this.m__mapping.p_Get2(t_str);
	var t_=t_allValidInputs;
	var t_2=0;
	while(t_2<t_.length){
		var t_validInput=t_[t_2];
		t_2=t_2+1;
		if((bb_input_KeyDown(t_validInput))!=0){
			return true;
		}
	}
	return false;
}
c_Controller.prototype.p_ProcessDirection=function(t_R,t_L,t_U,t_D){
	var t_numDirs=((t_R)?1:0)+((t_L)?1:0)+((t_U)?1:0)+((t_D)?1:0);
	if(t_numDirs<3 && t_numDirs>0){
		var t_dir=((t_R)?1:0)*1+((t_U)?1:0)*10+((t_L)?1:0)*100+((t_D)?1:0)*1000;
		var t_1=t_dir;
		if(t_1==1){
			this.m__direction=0;
		}else{
			if(t_1==11){
				this.m__direction=45;
			}else{
				if(t_1==10){
					this.m__direction=90;
				}else{
					if(t_1==110){
						this.m__direction=135;
					}else{
						if(t_1==100){
							this.m__direction=180;
						}else{
							if(t_1==1100){
								this.m__direction=225;
							}else{
								if(t_1==1000){
									this.m__direction=270;
								}else{
									if(t_1==1001){
										this.m__direction=315;
									}else{
										this.m__direction=-1;
									}
								}
							}
						}
					}
				}
			}
		}
		this.m__isDirectionPressed=true;
	}else{
		if(t_numDirs>=3){
			this.m__isDirectionPressed=true;
		}else{
			this.m__direction=-1;
			this.m__isDirectionPressed=false;
		}
	}
	return 0;
}
c_Controller.prototype.p_Update=function(){
	var t_p=this.m__playerNo;
	var t_pressedNow=false;
	var t_pressedThen=false;
	var t_=this.m__mapping.p_Keys().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_key=t_.p_NextObject();
		t_pressedNow=this.p_CheckControl(t_key);
		t_pressedThen=this.m__input.p_Get2(t_key);
		if(t_pressedThen){
			if(t_pressedNow){
				this.m__justReleased.p_Set9(t_key,false);
				this.m__justPressed.p_Set9(t_key,false);
			}else{
				this.m__justReleased.p_Set9(t_key,true);
				this.m__justPressed.p_Set9(t_key,false);
			}
		}else{
			if(t_pressedNow){
				this.m__justReleased.p_Set9(t_key,false);
				this.m__justPressed.p_Set9(t_key,true);
			}else{
				this.m__justReleased.p_Set9(t_key,false);
				this.m__justPressed.p_Set9(t_key,false);
			}
		}
		this.m__input.p_Set9(t_key,t_pressedNow);
	}
	var t_R=this.m__input.p_Get2("RIGHT");
	var t_L=this.m__input.p_Get2("LEFT");
	var t_U=this.m__input.p_Get2("UP");
	var t_D=this.m__input.p_Get2("DOWN");
	this.p_ProcessDirection(t_R,t_L,t_U,t_D);
	return 0;
}
c_Controller.prototype.p_JustPressed=function(t_str){
	return this.m__justPressed.p_Get2(t_str);
}
function c_Node4(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=[];
	this.m_color=0;
	this.m_parent=null;
}
c_Node4.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node4.m_new2=function(){
	return this;
}
c_Node4.prototype.p_NextNode=function(){
	var t_node=null;
	if((this.m_right)!=null){
		t_node=this.m_right;
		while((t_node.m_left)!=null){
			t_node=t_node.m_left;
		}
		return t_node;
	}
	t_node=this;
	var t_parent=this.m_parent;
	while(((t_parent)!=null) && t_node==t_parent.m_right){
		t_node=t_parent;
		t_parent=t_parent.m_parent;
	}
	return t_parent;
}
function c_Map5(){
	Object.call(this);
	this.m_root=null;
}
c_Map5.m_new=function(){
	return this;
}
c_Map5.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map5.prototype.p_RotateLeft5=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map5.prototype.p_RotateRight5=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map5.prototype.p_InsertFixup5=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft5(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight5(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight5(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft5(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map5.prototype.p_Set9=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node5.m_new.call(new c_Node5,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup5(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map5.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map5.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return false;
}
function c_StringMap4(){
	c_Map5.call(this);
}
c_StringMap4.prototype=extend_class(c_Map5);
c_StringMap4.m_new=function(){
	c_Map5.m_new.call(this);
	return this;
}
c_StringMap4.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_MapKeys(){
	Object.call(this);
	this.m_map=null;
}
c_MapKeys.m_new=function(t_map){
	this.m_map=t_map;
	return this;
}
c_MapKeys.m_new2=function(){
	return this;
}
c_MapKeys.prototype.p_ObjectEnumerator=function(){
	return c_KeyEnumerator.m_new.call(new c_KeyEnumerator,this.m_map.p_FirstNode());
}
function c_KeyEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_KeyEnumerator.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_KeyEnumerator.m_new2=function(){
	return this;
}
c_KeyEnumerator.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_KeyEnumerator.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t.m_key;
}
function c_Node5(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=false;
	this.m_color=0;
	this.m_parent=null;
}
c_Node5.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node5.m_new2=function(){
	return this;
}
function c_Rect(){
	Object.call(this);
	this.m__TL=null;
	this.m__BR=null;
}
c_Rect.m_new=function(t_Vector1,t_Vector2){
	this.m__TL=c_Vector.m_new.call(new c_Vector,0.0,0.0);
	this.m__BR=c_Vector.m_new.call(new c_Vector,0.0,0.0);
	if(t_Vector1.p_x2()<t_Vector2.p_x2()){
		this.m__TL.p_x(t_Vector1.p_x2());
		this.m__BR.p_x(t_Vector2.p_x2());
	}else{
		this.m__TL.p_x(t_Vector2.p_x2());
		this.m__BR.p_x(t_Vector1.p_x2());
	}
	if(t_Vector1.p_y2()<t_Vector2.p_y2()){
		this.m__TL.p_y(t_Vector1.p_y2());
		this.m__BR.p_y(t_Vector2.p_y2());
	}else{
		this.m__TL.p_y(t_Vector2.p_y2());
		this.m__BR.p_y(t_Vector1.p_y2());
	}
	return this;
}
c_Rect.m_new2=function(){
	return this;
}
c_Rect.prototype.p_TL=function(t_x,t_y){
	this.m__TL.p_x(t_x);
	this.m__TL.p_y(t_y);
	return 0;
}
c_Rect.prototype.p_TL2=function(t_vect){
	this.m__TL.p_x(t_vect.p_x2());
	this.m__TL.p_y(t_vect.p_y2());
	return 0;
}
c_Rect.prototype.p_TL3=function(){
	return this.m__TL;
}
c_Rect.prototype.p_Left=function(){
	return this.p_TL3().p_x2();
}
c_Rect.prototype.p_Left2=function(t__in){
	this.m__TL.p_x(t__in);
	return this;
}
c_Rect.prototype.p_BR=function(t_x,t_y){
	this.m__BR.p_x(t_x);
	this.m__BR.p_y(t_y);
	return 0;
}
c_Rect.prototype.p_BR2=function(t_vect){
	this.m__BR.p_x(t_vect.p_x2());
	this.m__BR.p_y(t_vect.p_y2());
	return 0;
}
c_Rect.prototype.p_BR3=function(){
	return this.m__BR;
}
c_Rect.prototype.p_Right=function(){
	return this.p_BR3().p_x2();
}
c_Rect.prototype.p_Right2=function(t__in){
	this.m__BR.p_x(t__in);
	return this;
}
c_Rect.prototype.p_IsRightOf=function(t_other){
	if(this.p_Left()>t_other.p_Right()){
		return true;
	}else{
		return false;
	}
}
c_Rect.prototype.p_Top=function(){
	return this.p_TL3().p_y2();
}
c_Rect.prototype.p_Top2=function(t__in){
	this.m__TL.p_y(t__in);
	return this;
}
c_Rect.prototype.p_Bottom=function(){
	return this.p_BR3().p_y2();
}
c_Rect.prototype.p_Bottom2=function(t__in){
	this.m__BR.p_y(t__in);
	return this;
}
c_Rect.prototype.p_IsBelow=function(t_other){
	if(this.p_Top()>t_other.p_Bottom()){
		return true;
	}else{
		return false;
	}
}
c_Rect.prototype.p_IsLeftOf=function(t_other){
	if(this.p_Right()<t_other.p_Left()){
		return true;
	}else{
		return false;
	}
}
c_Rect.prototype.p_IsAbove=function(t_other){
	if(this.p_Bottom()<t_other.p_Top()){
		return true;
	}else{
		return false;
	}
}
c_Rect.prototype.p_ContainsPoint=function(t_point){
	if(this.p_TL3().p_x2()<t_point.p_x2()){
		if(this.p_TL3().p_y2()<t_point.p_y2()){
			if(this.p_BR3().p_x2()>t_point.p_x2()){
				if(this.p_BR3().p_y2()>t_point.p_y2()){
					return true;
				}
			}
		}
	}
	return false;
}
c_Rect.prototype.p_TranslateX=function(t_xDiff){
	this.m__TL.p_x(this.m__TL.p_x2()+t_xDiff);
	this.m__BR.p_x(this.m__BR.p_x2()+t_xDiff);
	return this;
}
c_Rect.prototype.p_TranslateY=function(t_yDiff){
	this.m__TL.p_y(this.m__TL.p_y2()+t_yDiff);
	this.m__BR.p_y(this.m__BR.p_y2()+t_yDiff);
	return this;
}
c_Rect.prototype.p_Intersects=function(t_other){
	if(this.p_IsRightOf(t_other)){
		return false;
	}
	if(this.p_IsLeftOf(t_other)){
		return false;
	}
	if(this.p_IsAbove(t_other)){
		return false;
	}
	if(this.p_IsBelow(t_other)){
		return false;
	}
	return true;
}
c_Rect.prototype.p_Center=function(){
	var t_center=c_Vector.m_new.call(new c_Vector,0.0,0.0);
	t_center.p_x((this.p_BR3().p_x2()+this.p_TL3().p_x2())/2.0);
	t_center.p_y((this.p_BR3().p_y2()+this.p_TL3().p_y2())/2.0);
	return t_center;
}
c_Rect.prototype.p_Width=function(){
	return bb_math_Abs2(this.m__TL.p_x2()-this.m__BR.p_x2());
}
c_Rect.prototype.p_Height=function(){
	return bb_math_Abs2(this.m__TL.p_y2()-this.m__BR.p_y2());
}
c_Rect.prototype.p_Center2=function(t_cent){
	var t_w=this.p_Width();
	var t_h=this.p_Height();
	this.m__TL.p_x(t_cent.p_x2()-t_w/2.0);
	this.m__TL.p_y(t_cent.p_y2()-t_h/2.0);
	this.m__BR.p_x(t_cent.p_x2()+t_w/2.0);
	this.m__BR.p_y(t_cent.p_y2()+t_h/2.0);
	return this;
}
function c_Camera(){
	c_Rect.call(this);
	this.m_velocity=null;
}
c_Camera.prototype=extend_class(c_Rect);
c_Camera.m_new=function(t_v1,t_v2){
	c_Rect.m_new.call(this,t_v1,t_v2);
	this.m_velocity=c_Velocity.m_new.call(new c_Velocity,0.0,0.0);
	return this;
}
c_Camera.m_new2=function(){
	c_Rect.m_new2.call(this);
	return this;
}
c_Camera.prototype.p_Update=function(){
	this.p_TranslateX((this.m_velocity.p_x2())|0);
	this.p_TranslateY((this.m_velocity.p_y2())|0);
	return 0;
}
c_Camera.prototype.p_DrawStart=function(){
	bb_graphics_PushMatrix();
	bb_graphics_Translate(-this.p_TL3().p_x2(),-this.p_TL3().p_y2());
	return 0;
}
c_Camera.prototype.p_DrawEnd=function(){
	bb_graphics_PopMatrix();
	return 0;
}
function c_Velocity(){
	c_Vector.call(this);
	this.m__speed=.0;
	this.m__direction=.0;
}
c_Velocity.prototype=extend_class(c_Vector);
c_Velocity.prototype.p_x=function(t_xIn){
	c_Vector.prototype.p_x.call(this,t_xIn);
	this.m__speed=this.p_Magnitude();
	this.m__direction=this.p_Angle();
	return 0;
}
c_Velocity.prototype.p_x2=function(){
	return c_Vector.prototype.p_x2.call(this);
}
c_Velocity.prototype.p_y=function(t_yIn){
	c_Vector.prototype.p_y.call(this,t_yIn);
	this.m__speed=this.p_Magnitude();
	this.m__direction=this.p_Angle();
	return 0;
}
c_Velocity.prototype.p_y2=function(){
	return c_Vector.prototype.p_y2.call(this);
}
c_Velocity.m_new=function(t_x,t_y){
	c_Vector.m_new.call(this,0.0,0.0);
	this.p_x(t_x);
	this.p_y(t_y);
	return this;
}
function c_GameObject(){
	Object.call(this);
	this.m_sprite=null;
	this.m_previousPosition=null;
	this.m_position=null;
	this.m_velocity=null;
	this.m_acceleration=null;
	this.m_isCollideable=true;
	this.m_timers=null;
	this.m_maxHP=2.0;
	this.m__HP=2.0;
	this.m_offScreenBehavior=null;
	this.m__isDead=false;
	this.m_camera=null;
	this.m__isOnScreen=true;
}
c_GameObject.prototype.p_HP=function(t_hp){
	if(t_hp<=this.m_maxHP){
		this.m__HP=t_hp;
	}else{
		this.m__HP=this.m_maxHP;
	}
	return 0;
}
c_GameObject.prototype.p_HP2=function(){
	return this.m__HP;
}
c_GameObject.prototype.p_setDefaults=function(t_img,t_willBeVisible,t_willBeCollideable){
	var t_tempImage=null;
	if(t_img==null){
		t_tempImage=bb_graphics_LoadImage("sprMissing.png",2,1);
	}else{
		t_tempImage=t_img;
	}
	this.m_sprite=c_Sprite.m_new.call(new c_Sprite,t_tempImage,t_willBeVisible);
	this.m_previousPosition=c_Vector.m_new.call(new c_Vector,0.0,0.0);
	this.m_position=c_Vector.m_new.call(new c_Vector,0.0,0.0);
	this.m_velocity=c_Velocity.m_new.call(new c_Velocity,0.0,0.0);
	this.m_acceleration=c_Vector.m_new.call(new c_Vector,0.0,0.0);
	this.m_isCollideable=t_willBeCollideable;
	this.m_timers=c_IntMap2.m_new.call(new c_IntMap2);
	this.m_maxHP=100.0;
	this.p_HP(this.m_maxHP);
	this.m_offScreenBehavior=c_OffScreenBehavior.m_new.call(new c_OffScreenBehavior);
	this.m_offScreenBehavior.p_SetAll("update");
	return this;
}
c_GameObject.m_new=function(t__img,t_x,t_y,t_willBeVisible,t_willBeCollideable){
	this.p_setDefaults(t__img,t_willBeVisible,t_willBeCollideable);
	this.m_position=c_Vector.m_new.call(new c_Vector,t_x,t_y);
	return this;
}
c_GameObject.prototype.p_IsDead=function(){
	return this.m__isDead;
}
c_GameObject.prototype.p_Width=function(){
	return this.m_sprite.p_Width();
}
c_GameObject.prototype.p_Height=function(){
	return this.m_sprite.p_Height();
}
c_GameObject.prototype.p_HitBox=function(){
	var t_cornerVect=c_Vector.m_new.call(new c_Vector,this.p_Width()/2.0,this.p_Height()/2.0);
	var t_point1=this.m_position.p_Plus(t_cornerVect);
	var t_point2=this.m_position.p_Minus(t_cornerVect);
	return c_Rect.m_new.call(new c_Rect,t_point1,t_point2);
}
c_GameObject.prototype.p_IsOnScreen=function(){
	return this.m__isOnScreen;
}
c_GameObject.prototype.p_IsOnScreen2=function(t_yeahButIsIt){
	this.m__isOnScreen=t_yeahButIsIt;
	return 0;
}
c_GameObject.prototype.p_checkOffScreenBehavior=function(){
	var t_whatToDo="Idunno";
	if(!this.p_IsDead()){
		if(this.m_camera!=null){
			if(this.p_HitBox().p_IsRightOf(this.m_camera)){
				this.p_IsOnScreen2(false);
				t_whatToDo=this.m_offScreenBehavior.p_Right();
			}else{
				if(this.p_HitBox().p_IsBelow(this.m_camera)){
					this.p_IsOnScreen2(false);
					t_whatToDo=this.m_offScreenBehavior.p_Below2();
				}else{
					if(this.p_HitBox().p_IsLeftOf(this.m_camera)){
						this.p_IsOnScreen2(false);
						t_whatToDo=this.m_offScreenBehavior.p_Left();
					}else{
						if(this.p_HitBox().p_IsAbove(this.m_camera)){
							this.p_IsOnScreen2(false);
							t_whatToDo=this.m_offScreenBehavior.p_Above2();
						}else{
							this.p_IsOnScreen2(true);
							t_whatToDo=this.m_offScreenBehavior.p_OnScreen2();
						}
					}
				}
			}
		}else{
			this.p_IsOnScreen2(true);
			t_whatToDo=this.m_offScreenBehavior.p_OnScreen2();
		}
	}
	return t_whatToDo;
}
c_GameObject.prototype.p_Kill=function(){
	this.m__isDead=true;
	return 0;
}
c_GameObject.prototype.p_TimerAction=function(t_whichTimer){
	var t_1=t_whichTimer;
	if(t_1==0){
	}
	return 0;
}
c_GameObject.prototype.p_IncrementTimers=function(){
	var t_=this.m_timers.p_Keys().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_key=t_.p_NextObject();
		this.m_timers.p_Get(t_key).p_Update();
		if(this.m_timers.p_Get(t_key).m_alarm){
			this.p_TimerAction(t_key);
		}
	}
	return 0;
}
c_GameObject.prototype.p_Update=function(){
	if(!this.p_IsDead()){
		var t_whatToDo=this.p_checkOffScreenBehavior();
		if(t_whatToDo=="kill"){
			this.p_Kill();
		}else{
			if(t_whatToDo=="freeze"){
			}else{
				this.p_IncrementTimers();
				this.m_previousPosition.p_x(this.m_position.p_x2());
				this.m_previousPosition.p_y(this.m_position.p_y2());
				var t_previousVelocity=this.m_velocity;
				this.m_velocity.p_x(this.m_velocity.p_x2()+this.m_acceleration.p_x2());
				this.m_velocity.p_y(this.m_velocity.p_y2()+this.m_acceleration.p_y2());
				this.m_position.p_x(this.m_position.p_x2()+.5*(t_previousVelocity.p_x2()+this.m_velocity.p_x2()));
				this.m_position.p_y(this.m_position.p_y2()+.5*(t_previousVelocity.p_y2()+this.m_velocity.p_y2()));
				if(this.p_HP2()<=0.0){
					this.p_Kill();
				}
			}
		}
	}
	return 0;
}
c_GameObject.prototype.p_CollidesWith=function(t_other){
	if(this.m_isCollideable && t_other.m_isCollideable){
		var t_hb1=this.p_HitBox();
		var t_hb2=t_other.p_HitBox();
		if(t_hb1.p_Intersects(t_hb2)){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}
c_GameObject.prototype.p_Render=function(){
	if(this.m_sprite!=null){
		this.m_sprite.p_DrawAt(this.m_position.p_x2(),this.m_position.p_y2(),0.0);
	}
	return 0;
}
function c_Sprite(){
	Object.call(this);
	this.m_animations=null;
	this.m__spriteSheet=null;
	this.m_numFrames=0;
	this.m_currentAnimation=null;
	this.m_isVisible=true;
	this.m_xScale=1.0;
	this.m_yScale=1.0;
}
c_Sprite.prototype.p_AddAnimation=function(t_anim){
	this.m_animations.p_Set10(t_anim.m_name,t_anim);
	return 0;
}
c_Sprite.prototype.p_NewAnimation=function(t_name,t_startFrame,t_numFrames,t_fps){
	var t_anim=c_Animation.m_new.call(new c_Animation,t_name,t_startFrame,t_numFrames,t_fps);
	this.p_AddAnimation(t_anim);
	return t_anim;
}
c_Sprite.prototype.p_GetAnimation=function(t_name){
	return this.m_animations.p_Get2(t_name);
}
c_Sprite.prototype.p_SetAnimation=function(t_name){
	this.m_currentAnimation=this.p_GetAnimation(t_name);
	this.m_currentAnimation.p_Reset();
	return 0;
}
c_Sprite.prototype.p_SetSpriteSheet=function(t_img){
	this.m__spriteSheet=t_img;
	this.m_numFrames=this.m__spriteSheet.p_Frames();
	this.p_NewAnimation("allFrames",0,this.m_numFrames,10);
	this.p_SetAnimation("allFrames");
	return 0;
}
c_Sprite.prototype.p_SpriteSheet=function(t_img){
	this.p_SetSpriteSheet(t_img);
	return 0;
}
c_Sprite.prototype.p_SpriteSheet2=function(){
	return this.m__spriteSheet;
}
c_Sprite.m_new=function(t__img,t_willBeVisible){
	this.m_animations=c_StringMap5.m_new.call(new c_StringMap5);
	this.p_SpriteSheet(t__img);
	this.m_isVisible=t_willBeVisible;
	return this;
}
c_Sprite.m_new2=function(){
	return this;
}
c_Sprite.prototype.p_Width=function(){
	return (this.p_SpriteSheet2().p_Width())*this.m_xScale;
}
c_Sprite.prototype.p_Height=function(){
	return (this.p_SpriteSheet2().p_Height())*this.m_yScale;
}
c_Sprite.prototype.p_XScale=function(t_sc){
	this.m_xScale=t_sc;
	return 0;
}
c_Sprite.prototype.p_XScale2=function(){
	return this.m_xScale;
}
c_Sprite.prototype.p_YScale=function(t_sc){
	this.m_yScale=t_sc;
	return 0;
}
c_Sprite.prototype.p_YScale2=function(){
	return this.m_yScale;
}
c_Sprite.prototype.p_DrawAt=function(t_x,t_y,t_angle){
	if(this.m_isVisible && this.p_SpriteSheet2()!=null){
		bb_graphics_DrawImage2(this.p_SpriteSheet2(),((t_x)|0),((t_y)|0),t_angle,this.p_XScale2(),this.p_YScale2(),this.m_currentAnimation.p_CurrentFrame());
	}
	return 0;
}
function c_Animation(){
	Object.call(this);
	this.m_name="";
	this.m_startFrame=0;
	this.m_numFrames=0;
	this.m__fps=0;
	this.m_frameTime=0;
	this.m_startTime=0;
	this.m_loop=true;
	this.m_pingPong=false;
}
c_Animation.prototype.p_Fps=function(){
	return this.m__fps;
}
c_Animation.prototype.p_Fps2=function(t_f){
	this.m__fps=t_f;
	this.m_frameTime=((1000/this.m__fps)|0);
	return 0;
}
c_Animation.m_new=function(t_name,t_startFrame,t_numFrames,t_fps){
	this.m_name=t_name;
	this.m_startFrame=t_startFrame;
	this.m_numFrames=t_numFrames;
	this.p_Fps2(t_fps);
	this.m_frameTime=((1000/t_fps)|0);
	return this;
}
c_Animation.m_new2=function(){
	return this;
}
c_Animation.prototype.p_Reset=function(){
	this.m_startTime=bb_app_Millisecs();
	return 0;
}
c_Animation.prototype.p_FirstCycleCompleted=function(){
	if(!this.m_pingPong){
		if(bb_app_Millisecs()>this.m_startTime+this.m_numFrames*this.m_frameTime){
			return true;
		}else{
			return false;
		}
	}else{
		if(bb_app_Millisecs()>this.m_startTime+(this.m_numFrames*2-1)*this.m_frameTime){
			return true;
		}else{
			return false;
		}
	}
}
c_Animation.prototype.p_CurrentFrame=function(){
	if(!this.m_pingPong){
		if(this.m_loop){
			return this.m_startFrame+(((bb_app_Millisecs()-this.m_startTime)/this.m_frameTime)|0) % this.m_numFrames;
		}else{
			if(this.p_FirstCycleCompleted()){
				return this.m_numFrames-1;
			}else{
				return this.m_startFrame+(((bb_app_Millisecs()-this.m_startTime)/this.m_frameTime)|0) % this.m_numFrames;
			}
		}
	}else{
		var t_tempFrame=this.m_startFrame+(((bb_app_Millisecs()-this.m_startTime)/this.m_frameTime)|0) % (this.m_numFrames*2-2);
		if(this.m_loop){
			if(t_tempFrame<this.m_numFrames){
				return t_tempFrame;
			}else{
				return this.m_numFrames*2-2-t_tempFrame;
			}
		}else{
			if(this.p_FirstCycleCompleted()){
				return 0;
			}else{
				if(t_tempFrame<this.m_numFrames){
					return t_tempFrame;
				}else{
					return this.m_numFrames*2-2-t_tempFrame;
				}
			}
		}
	}
}
function c_Map6(){
	Object.call(this);
	this.m_root=null;
}
c_Map6.m_new=function(){
	return this;
}
c_Map6.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map6.prototype.p_RotateLeft6=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map6.prototype.p_RotateRight6=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map6.prototype.p_InsertFixup6=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft6(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight6(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight6(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft6(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map6.prototype.p_Set10=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node6.m_new.call(new c_Node6,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup6(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map6.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map6.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_StringMap5(){
	c_Map6.call(this);
}
c_StringMap5.prototype=extend_class(c_Map6);
c_StringMap5.m_new=function(){
	c_Map6.m_new.call(this);
	return this;
}
c_StringMap5.prototype.p_Compare2=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Node6(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node6.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node6.m_new2=function(){
	return this;
}
function bb_app_Millisecs(){
	return bb_app__game.Millisecs();
}
function c_Timer(){
	Object.call(this);
	this.m_alarm=false;
	this.m_ticks=0;
	this.m_callback=null;
}
c_Timer.prototype.p_Update=function(){
	if(this.m_alarm){
		this.m_alarm=false;
	}
	if(this.m_ticks>-1){
		if(this.m_ticks==0){
			this.m_alarm=true;
			if(this.m_callback!=null){
				this.m_callback.p_call();
			}
		}
		this.m_ticks=this.m_ticks-1;
	}
	return 0;
}
function c_Map7(){
	Object.call(this);
	this.m_root=null;
}
c_Map7.m_new=function(){
	return this;
}
c_Map7.prototype.p_Keys=function(){
	return c_MapKeys2.m_new.call(new c_MapKeys2,this);
}
c_Map7.prototype.p_FirstNode=function(){
	if(!((this.m_root)!=null)){
		return null;
	}
	var t_node=this.m_root;
	while((t_node.m_left)!=null){
		t_node=t_node.m_left;
	}
	return t_node;
}
c_Map7.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map7.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map7.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
function c_IntMap2(){
	c_Map7.call(this);
}
c_IntMap2.prototype=extend_class(c_Map7);
c_IntMap2.m_new=function(){
	c_Map7.m_new.call(this);
	return this;
}
c_IntMap2.prototype.p_Compare=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_OffScreenBehavior(){
	Object.call(this);
	this.m__below="";
	this.m__above="";
	this.m__left="";
	this.m__right="";
	this.m__onScreen="update";
}
c_OffScreenBehavior.m_new=function(){
	return this;
}
c_OffScreenBehavior.prototype.p_SetAll=function(t_behavior){
	this.m__below=t_behavior;
	this.m__above=t_behavior;
	this.m__left=t_behavior;
	this.m__right=t_behavior;
	return 0;
}
c_OffScreenBehavior.prototype.p_Right3=function(t_behavior){
	this.m__right=t_behavior;
	return 0;
}
c_OffScreenBehavior.prototype.p_Right=function(){
	return this.m__right;
}
c_OffScreenBehavior.prototype.p_Below=function(t_behavior){
	this.m__below=t_behavior;
	return 0;
}
c_OffScreenBehavior.prototype.p_Below2=function(){
	return this.m__below;
}
c_OffScreenBehavior.prototype.p_Left3=function(t_behavior){
	this.m__left=t_behavior;
	return 0;
}
c_OffScreenBehavior.prototype.p_Left=function(){
	return this.m__left;
}
c_OffScreenBehavior.prototype.p_Above=function(t_behavior){
	this.m__above=t_behavior;
	return 0;
}
c_OffScreenBehavior.prototype.p_Above2=function(){
	return this.m__above;
}
c_OffScreenBehavior.prototype.p_OnScreen=function(t_behavior){
	this.m__onScreen=t_behavior;
	return 0;
}
c_OffScreenBehavior.prototype.p_OnScreen2=function(){
	return this.m__onScreen;
}
function bb_input_KeyDown(t_key){
	return ((bb_input_device.p_KeyDown(t_key))?1:0);
}
function c_MapKeys2(){
	Object.call(this);
	this.m_map=null;
}
c_MapKeys2.m_new=function(t_map){
	this.m_map=t_map;
	return this;
}
c_MapKeys2.m_new2=function(){
	return this;
}
c_MapKeys2.prototype.p_ObjectEnumerator=function(){
	return c_KeyEnumerator2.m_new.call(new c_KeyEnumerator2,this.m_map.p_FirstNode());
}
function c_KeyEnumerator2(){
	Object.call(this);
	this.m_node=null;
}
c_KeyEnumerator2.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_KeyEnumerator2.m_new2=function(){
	return this;
}
c_KeyEnumerator2.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_KeyEnumerator2.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t.m_key;
}
function c_Node7(){
	Object.call(this);
	this.m_left=null;
	this.m_right=null;
	this.m_parent=null;
	this.m_key=0;
	this.m_value=null;
}
c_Node7.prototype.p_NextNode=function(){
	var t_node=null;
	if((this.m_right)!=null){
		t_node=this.m_right;
		while((t_node.m_left)!=null){
			t_node=t_node.m_left;
		}
		return t_node;
	}
	t_node=this;
	var t_parent=this.m_parent;
	while(((t_parent)!=null) && t_node==t_parent.m_right){
		t_node=t_parent;
		t_parent=t_parent.m_parent;
	}
	return t_parent;
}
function c_ICallBack(){
	Object.call(this);
}
c_ICallBack.prototype.p_call=function(){
}
c_ICallBack.m_new=function(){
	return this;
}
function bb_audio_PlaySound(t_sound,t_channel,t_flags){
	if(((t_sound)!=null) && ((t_sound.m_sample)!=null)){
		bb_audio_device.PlaySample(t_sound.m_sample,t_channel,t_flags);
	}
	return 0;
}
function bb_input_TouchHit(t_index){
	return bb_input_device.p_KeyHit(384+t_index);
}
function bb_audio_StopMusic(){
	bb_audio_device.StopMusic();
	return 0;
}
function c_UIElement(){
	c_GameObject.call(this);
}
c_UIElement.prototype=extend_class(c_GameObject);
c_UIElement.m_new=function(t_x,t_y){
	c_GameObject.m_new.call(this,null,t_x,t_y,true,true);
	return this;
}
c_UIElement.m_new2=function(t_posIn){
	c_GameObject.m_new.call(this,null,t_posIn.p_x2(),t_posIn.p_y2(),true,true);
	return this;
}
c_UIElement.m_new3=function(){
	c_GameObject.m_new.call(this,null,0.0,0.0,true,true);
	return this;
}
c_UIElement.prototype.p_CustomRenderAction=function(){
	bb_graphics_DrawText("Implement the CustomRenderAction method",this.m_position.p_x2(),this.m_position.p_y2(),.5,.5);
	return 0;
}
c_UIElement.prototype.p_Render=function(){
	bb_graphics_PopMatrix();
	this.p_CustomRenderAction();
	bb_graphics_PushMatrix();
	return 0;
}
function c_UIButton(){
	c_UIElement.call(this);
	this.m_text="";
	this.m_isToggleable=false;
	this.m__isHighlighted=false;
	this.m__isToggled=false;
	this.m_callBack=null;
}
c_UIButton.prototype=extend_class(c_UIElement);
c_UIButton.prototype.p_SetSprite=function(t_spriteIn){
	this.m_sprite=t_spriteIn;
	if(this.m_sprite.m_numFrames % 4==0){
		var t_fpa=((this.m_sprite.m_numFrames/4)|0);
		this.m_sprite.p_NewAnimation("notHighlightedNotToggled",0,t_fpa,2);
		this.m_sprite.p_NewAnimation("isHighlightedNotToggled",1*t_fpa,t_fpa,2);
		this.m_sprite.p_NewAnimation("isHighlightedIsToggled",2*t_fpa,t_fpa,2);
		this.m_sprite.p_NewAnimation("notHighlightedIsToggled",3*t_fpa,t_fpa,2);
	}else{
		this.m_sprite.p_NewAnimation("notHighlightedNotToggled",0,1,2);
		this.m_sprite.p_NewAnimation("isHighlightedNotToggled",0,1,2);
		this.m_sprite.p_NewAnimation("isHighlightedIsToggled",0,1,2);
		this.m_sprite.p_NewAnimation("notHighlightedIsToggled",0,1,2);
	}
	this.m_sprite.p_SetAnimation("notHighlightedNotToggled");
	return 0;
}
c_UIButton.prototype.p_IsHighlighted=function(){
	return this.m__isHighlighted;
}
c_UIButton.prototype.p_IsToggled=function(){
	return this.m__isToggled;
}
c_UIButton.prototype.p_IsToggled2=function(t_stateIn){
	this.m__isToggled=t_stateIn;
	this.p_UpdateButtonStatus();
	return 0;
}
c_UIButton.prototype.p_UpdateButtonStatus=function(){
	if(this.m_sprite!=null){
		if(this.p_IsHighlighted()){
			if(this.p_IsToggled()){
				this.m_sprite.p_SetAnimation("isHighlightedIsToggled");
			}else{
				this.m_sprite.p_SetAnimation("isHighlightedNotToggled");
			}
		}else{
			if(this.p_IsToggled()){
				this.m_sprite.p_SetAnimation("notHighlightedIsToggled");
			}else{
				this.m_sprite.p_SetAnimation("notHighlightedNotToggled");
			}
		}
	}
	return 0;
}
c_UIButton.prototype.p_IsHighlighted2=function(t_newState){
	this.m__isHighlighted=t_newState;
	this.p_UpdateButtonStatus();
	return 0;
}
c_UIButton.m_new=function(t_x,t_y,t_shouldBeToggleable){
	c_UIElement.m_new.call(this,t_x,t_y);
	this.p_SetSprite(this.m_sprite);
	this.m_text="PlaceholderText";
	if(t_shouldBeToggleable){
		this.m_isToggleable=true;
	}else{
		this.m_isToggleable=false;
	}
	this.p_IsHighlighted2(false);
	this.p_IsToggled2(false);
	return this;
}
c_UIButton.m_new2=function(){
	c_UIElement.m_new3.call(this);
	return this;
}
c_UIButton.prototype.p_OnHighlight=function(){
	this.p_IsHighlighted2(true);
	return 0;
}
c_UIButton.prototype.p_Toggle=function(){
	this.p_IsToggled2(!this.p_IsToggled());
	return 0;
}
c_UIButton.prototype.p_Toggle2=function(t_forcedState){
	this.p_IsToggled2(t_forcedState);
	return 0;
}
c_UIButton.prototype.p_CustomClickAction=function(){
	return 0;
}
c_UIButton.prototype.p_OnClick=function(){
	if(this.m_isToggleable){
		this.p_Toggle();
	}
	if(this.m_callBack!=null){
		this.m_callBack.p_call();
	}
	this.p_CustomClickAction();
	return 0;
}
c_UIButton.prototype.p_OnUnHighlight=function(){
	this.p_IsHighlighted2(false);
	return 0;
}
c_UIButton.prototype.p_Render=function(){
	c_UIElement.prototype.p_Render.call(this);
	return 0;
}
c_UIButton.prototype.p_CustomRenderAction=function(){
	if(this.m_sprite!=null){
		this.m_sprite.p_DrawAt(this.m_position.p_x2(),this.m_position.p_y2(),0.0);
	}else{
		bb_graphics_DrawRect(this.m_position.p_x2(),this.m_position.p_y2(),200.0,200.0);
	}
	bb_graphics_DrawText(this.m_text,this.m_position.p_x2(),this.m_position.p_y2(),.5,.5);
	return 0;
}
function c_PlayButtonCallBack(){
	c_ICallBack.call(this);
}
c_PlayButtonCallBack.prototype=extend_class(c_ICallBack);
c_PlayButtonCallBack.m_new=function(){
	c_ICallBack.m_new.call(this);
	return this;
}
c_PlayButtonCallBack.prototype.p_call=function(){
	bb_ld38_2_GetRoot().m_menu.p_Destroy();
	bb_ld38_2_GetRoot().p_NamedStartGame("insektmusik");
}
function c_UIMenu(){
	Object.call(this);
	this.m_buttonStack=c_Stack5.m_new.call(new c_Stack5);
	this.m_textStack=c_Stack6.m_new.call(new c_Stack6);
	this.m_graphicStack=c_Stack7.m_new.call(new c_Stack7);
}
c_UIMenu.m_new=function(){
	this.m_buttonStack=c_Stack5.m_new.call(new c_Stack5);
	this.m_textStack=c_Stack6.m_new.call(new c_Stack6);
	this.m_graphicStack=c_Stack7.m_new.call(new c_Stack7);
	return this;
}
c_UIMenu.prototype.p_AddButton=function(t_butt){
	this.m_buttonStack.p_Push7(t_butt);
	return 0;
}
c_UIMenu.prototype.p_Update=function(){
	var t_vecTemp=c_Vector.m_new.call(new c_Vector,bb_autofit_VMouseX(true),bb_autofit_VMouseY(true));
	var t_=this.m_buttonStack.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_butt=t_.p_NextObject();
		if(t_butt.p_HitBox().p_ContainsPoint(t_vecTemp)){
			t_butt.p_OnHighlight();
			if((bb_input_MouseHit(0))!=0){
				t_butt.p_OnClick();
				return 0;
			}
		}else{
			t_butt.p_OnUnHighlight();
		}
	}
	return 0;
}
c_UIMenu.prototype.p_Render=function(){
	if(!this.m_buttonStack.p_IsEmpty()){
		var t_=this.m_buttonStack.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_butt=t_.p_NextObject();
			t_butt.p_Render();
		}
	}
	if(!this.m_textStack.p_IsEmpty()){
		var t_2=this.m_textStack.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_text=t_2.p_NextObject();
			t_text.p_Render();
		}
	}
	if(!this.m_graphicStack.p_IsEmpty()){
		var t_3=this.m_graphicStack.p_ObjectEnumerator();
		while(t_3.p_HasNext()){
			var t_graphic=t_3.p_NextObject();
			t_graphic.p_Render();
		}
	}
	return 0;
}
c_UIMenu.prototype.p_Destroy=function(){
	this.m_buttonStack.p_Clear();
	this.m_textStack.p_Clear();
	this.m_graphicStack.p_Clear();
	return 0;
}
function c_Stack5(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack5.m_new=function(){
	return this;
}
c_Stack5.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack5.prototype.p_Push7=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack5.prototype.p_Push8=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push7(t_values[t_offset+t_i]);
	}
}
c_Stack5.prototype.p_Push9=function(t_values,t_offset){
	this.p_Push8(t_values,t_offset,t_values.length-t_offset);
}
c_Stack5.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator.m_new.call(new c_Enumerator,this);
}
c_Stack5.m_NIL=null;
c_Stack5.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack5.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack5.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack5.prototype.p_IsEmpty=function(){
	return this.m_length==0;
}
c_Stack5.prototype.p_Clear=function(){
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		this.m_data[t_i]=c_Stack5.m_NIL;
	}
	this.m_length=0;
}
function c_UIText(){
	c_UIElement.call(this);
	this.m_text="";
}
c_UIText.prototype=extend_class(c_UIElement);
c_UIText.prototype.p_CustomRenderAction=function(){
	bb_graphics_DrawText(this.m_text,this.m_position.p_x2(),this.m_position.p_y2(),.5,.5);
	return 0;
}
function c_Stack6(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack6.m_new=function(){
	return this;
}
c_Stack6.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack6.prototype.p_IsEmpty=function(){
	return this.m_length==0;
}
c_Stack6.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator2.m_new.call(new c_Enumerator2,this);
}
c_Stack6.m_NIL=null;
c_Stack6.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack6.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack6.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack6.prototype.p_Clear=function(){
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		this.m_data[t_i]=c_Stack6.m_NIL;
	}
	this.m_length=0;
}
function c_UIGraphic(){
	c_UIElement.call(this);
}
c_UIGraphic.prototype=extend_class(c_UIElement);
function c_Stack7(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack7.m_new=function(){
	return this;
}
c_Stack7.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack7.prototype.p_IsEmpty=function(){
	return this.m_length==0;
}
c_Stack7.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator3.m_new.call(new c_Enumerator3,this);
}
c_Stack7.m_NIL=null;
c_Stack7.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack7.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack7.prototype.p_Length2=function(){
	return this.m_length;
}
c_Stack7.prototype.p_Clear=function(){
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		this.m_data[t_i]=c_Stack7.m_NIL;
	}
	this.m_length=0;
}
function c_BonusButtonCallBack(){
	c_ICallBack.call(this);
}
c_BonusButtonCallBack.prototype=extend_class(c_ICallBack);
c_BonusButtonCallBack.m_new=function(){
	c_ICallBack.m_new.call(this);
	return this;
}
c_BonusButtonCallBack.prototype.p_call=function(){
	bb_ld38_2_GetRoot().m_menu.p_Destroy();
	bb_ld38_2_GetRoot().p_InitBonusMenu();
}
function c_CreditsButtonCallBack(){
	c_ICallBack.call(this);
}
c_CreditsButtonCallBack.prototype=extend_class(c_ICallBack);
c_CreditsButtonCallBack.m_new=function(){
	c_ICallBack.m_new.call(this);
	return this;
}
c_CreditsButtonCallBack.prototype.p_call=function(){
	bb_ld38_2_GetRoot().m_menu.p_Destroy();
	bb_ld38_2_GetRoot().p_InitCreditsScreen();
}
function bb_input_MouseX(){
	return bb_input_device.p_MouseX();
}
function bb_autofit_VDeviceWidth(){
	return c_VirtualDisplay.m_Display.m_vwidth;
}
function bb_autofit_VMouseX(t_limit){
	return c_VirtualDisplay.m_Display.p_VMouseX(t_limit);
}
function bb_input_MouseY(){
	return bb_input_device.p_MouseY();
}
function bb_autofit_VDeviceHeight(){
	return c_VirtualDisplay.m_Display.m_vheight;
}
function bb_autofit_VMouseY(t_limit){
	return c_VirtualDisplay.m_Display.p_VMouseY(t_limit);
}
function c_Enumerator(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator.m_new=function(t_stack){
	this.m_stack=t_stack;
	return this;
}
c_Enumerator.m_new2=function(){
	return this;
}
c_Enumerator.prototype.p_HasNext=function(){
	return this.m_index<this.m_stack.p_Length2();
}
c_Enumerator.prototype.p_NextObject=function(){
	this.m_index+=1;
	return this.m_stack.m_data[this.m_index-1];
}
function bb_math_Max(t_x,t_y){
	if(t_x>t_y){
		return t_x;
	}
	return t_y;
}
function bb_math_Max2(t_x,t_y){
	if(t_x>t_y){
		return t_x;
	}
	return t_y;
}
function bb_input_MouseHit(t_button){
	return bb_input_device.p_KeyHit(1+t_button);
}
function bb_audio_MusicState(){
	return bb_audio_device.MusicState();
}
function bb_audio_PlayMusic(t_path,t_flags){
	return bb_audio_device.PlayMusic(bb_data_FixDataPath(t_path),t_flags);
}
function bb_input_TouchX(t_index){
	return bb_input_device.p_TouchX(t_index);
}
function bb_autofit_VTouchX(t_index,t_limit){
	return c_VirtualDisplay.m_Display.p_VTouchX(t_index,t_limit);
}
function c_Stack8(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack8.m_new=function(){
	return this;
}
c_Stack8.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack8.prototype.p_Get=function(t_index){
	return this.m_data[t_index];
}
c_Stack8.m_NIL=null;
c_Stack8.prototype.p_Clear=function(){
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		this.m_data[t_i]=c_Stack8.m_NIL;
	}
	this.m_length=0;
}
c_Stack8.prototype.p_Push10=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack8.prototype.p_Push11=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push10(t_values[t_offset+t_i]);
	}
}
c_Stack8.prototype.p_Push12=function(t_values,t_offset){
	this.p_Push11(t_values,t_offset,t_values.length-t_offset);
}
c_Stack8.prototype.p_Length=function(t_newlength){
	if(t_newlength<this.m_length){
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			this.m_data[t_i]=c_Stack8.m_NIL;
		}
	}else{
		if(t_newlength>this.m_data.length){
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	this.m_length=t_newlength;
}
c_Stack8.prototype.p_Length2=function(){
	return this.m_length;
}
function c_Map8(){
	Object.call(this);
	this.m_root=null;
}
c_Map8.m_new=function(){
	return this;
}
c_Map8.prototype.p_Keys=function(){
	return c_MapKeys3.m_new.call(new c_MapKeys3,this);
}
c_Map8.prototype.p_FirstNode=function(){
	if(!((this.m_root)!=null)){
		return null;
	}
	var t_node=this.m_root;
	while((t_node.m_left)!=null){
		t_node=t_node.m_left;
	}
	return t_node;
}
c_Map8.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map8.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map8.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
c_Map8.prototype.p_Clear=function(){
	this.m_root=null;
	return 0;
}
c_Map8.prototype.p_RotateLeft7=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map8.prototype.p_RotateRight7=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map8.prototype.p_InsertFixup7=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft7(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight7(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight7(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft7(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map8.prototype.p_Set11=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node8.m_new.call(new c_Node8,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup7(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
function c_IntMap3(){
	c_Map8.call(this);
}
c_IntMap3.prototype=extend_class(c_Map8);
c_IntMap3.m_new=function(){
	c_Map8.m_new.call(this);
	return this;
}
c_IntMap3.prototype.p_Compare=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_MapKeys3(){
	Object.call(this);
	this.m_map=null;
}
c_MapKeys3.m_new=function(t_map){
	this.m_map=t_map;
	return this;
}
c_MapKeys3.m_new2=function(){
	return this;
}
c_MapKeys3.prototype.p_ObjectEnumerator=function(){
	return c_KeyEnumerator3.m_new.call(new c_KeyEnumerator3,this.m_map.p_FirstNode());
}
function c_KeyEnumerator3(){
	Object.call(this);
	this.m_node=null;
}
c_KeyEnumerator3.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_KeyEnumerator3.m_new2=function(){
	return this;
}
c_KeyEnumerator3.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_KeyEnumerator3.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t.m_key;
}
function c_Node8(){
	Object.call(this);
	this.m_left=null;
	this.m_right=null;
	this.m_parent=null;
	this.m_key=0;
	this.m_value=null;
	this.m_color=0;
}
c_Node8.prototype.p_NextNode=function(){
	var t_node=null;
	if((this.m_right)!=null){
		t_node=this.m_right;
		while((t_node.m_left)!=null){
			t_node=t_node.m_left;
		}
		return t_node;
	}
	t_node=this;
	var t_parent=this.m_parent;
	while(((t_parent)!=null) && t_node==t_parent.m_right){
		t_node=t_parent;
		t_parent=t_parent.m_parent;
	}
	return t_parent;
}
c_Node8.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node8.m_new2=function(){
	return this;
}
function bb_math_Abs(t_x){
	if(t_x>=0){
		return t_x;
	}
	return -t_x;
}
function bb_math_Abs2(t_x){
	if(t_x>=0.0){
		return t_x;
	}
	return -t_x;
}
function bb_audio_PauseMusic(){
	bb_audio_device.PauseMusic();
	return 0;
}
function c_QuitToMenuButtonCallBack(){
	c_ICallBack.call(this);
}
c_QuitToMenuButtonCallBack.prototype=extend_class(c_ICallBack);
c_QuitToMenuButtonCallBack.m_new=function(){
	c_ICallBack.m_new.call(this);
	return this;
}
c_QuitToMenuButtonCallBack.prototype.p_call=function(){
	bb_audio_StopMusic();
	bb_ld38_2_GetRoot().m_menu.p_Destroy();
	bb_ld38_2_GetRoot().p_InitMainMenu();
}
function bb_audio_ResumeMusic(){
	bb_audio_device.ResumeMusic();
	return 0;
}
function bb_app_LoadString(t_path){
	return bb_app__game.LoadString(bb_data_FixDataPath(t_path));
}
function bb_graphics_GetColor(){
	return [bb_graphics_context.m_color_r,bb_graphics_context.m_color_g,bb_graphics_context.m_color_b];
}
function bb_graphics_GetColor2(t_color){
	t_color[0]=bb_graphics_context.m_color_r;
	t_color[1]=bb_graphics_context.m_color_g;
	t_color[2]=bb_graphics_context.m_color_b;
	return 0;
}
function bb_graphics_CreateImage(t_width,t_height,t_frameCount,t_flags){
	var t_surf=bb_graphics_device.CreateSurface(t_width*t_frameCount,t_height);
	if((t_surf)!=null){
		return (c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
	}
	return null;
}
function bb_graphics_ReadPixels(t_pixels,t_x,t_y,t_width,t_height,t_offset,t_pitch){
	if(!((t_pitch)!=0)){
		t_pitch=t_width;
	}
	bb_graphics_renderDevice.ReadPixels(t_pixels,t_x,t_y,t_width,t_height,t_offset,t_pitch);
	return 0;
}
function bb_graphics_PushMatrix(){
	var t_sp=bb_graphics_context.m_matrixSp;
	if(t_sp==bb_graphics_context.m_matrixStack.length){
		bb_graphics_context.m_matrixStack=resize_number_array(bb_graphics_context.m_matrixStack,t_sp*2);
	}
	bb_graphics_context.m_matrixStack[t_sp+0]=bb_graphics_context.m_ix;
	bb_graphics_context.m_matrixStack[t_sp+1]=bb_graphics_context.m_iy;
	bb_graphics_context.m_matrixStack[t_sp+2]=bb_graphics_context.m_jx;
	bb_graphics_context.m_matrixStack[t_sp+3]=bb_graphics_context.m_jy;
	bb_graphics_context.m_matrixStack[t_sp+4]=bb_graphics_context.m_tx;
	bb_graphics_context.m_matrixStack[t_sp+5]=bb_graphics_context.m_ty;
	bb_graphics_context.m_matrixSp=t_sp+6;
	return 0;
}
function bb_graphics_Transform(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	var t_ix2=t_ix*bb_graphics_context.m_ix+t_iy*bb_graphics_context.m_jx;
	var t_iy2=t_ix*bb_graphics_context.m_iy+t_iy*bb_graphics_context.m_jy;
	var t_jx2=t_jx*bb_graphics_context.m_ix+t_jy*bb_graphics_context.m_jx;
	var t_jy2=t_jx*bb_graphics_context.m_iy+t_jy*bb_graphics_context.m_jy;
	var t_tx2=t_tx*bb_graphics_context.m_ix+t_ty*bb_graphics_context.m_jx+bb_graphics_context.m_tx;
	var t_ty2=t_tx*bb_graphics_context.m_iy+t_ty*bb_graphics_context.m_jy+bb_graphics_context.m_ty;
	bb_graphics_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
	return 0;
}
function bb_graphics_Transform2(t_m){
	bb_graphics_Transform(t_m[0],t_m[1],t_m[2],t_m[3],t_m[4],t_m[5]);
	return 0;
}
function bb_graphics_Scale(t_x,t_y){
	bb_graphics_Transform(t_x,0.0,0.0,t_y,0.0,0.0);
	return 0;
}
function bb_graphics_DrawRect(t_x,t_y,t_w,t_h){
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawRect(t_x,t_y,t_w,t_h);
	return 0;
}
function bb_graphics_DrawPoly(t_verts){
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawPoly(t_verts);
	return 0;
}
function bb_graphics_DrawPoly2(t_verts,t_image,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_context.p_Validate();
	bb_graphics_renderDevice.DrawPoly2(t_verts,t_image.m_surface,t_f.m_x,t_f.m_y);
	return 0;
}
function bb_graphics_PopMatrix(){
	var t_sp=bb_graphics_context.m_matrixSp-6;
	bb_graphics_SetMatrix(bb_graphics_context.m_matrixStack[t_sp+0],bb_graphics_context.m_matrixStack[t_sp+1],bb_graphics_context.m_matrixStack[t_sp+2],bb_graphics_context.m_matrixStack[t_sp+3],bb_graphics_context.m_matrixStack[t_sp+4],bb_graphics_context.m_matrixStack[t_sp+5]);
	bb_graphics_context.m_matrixSp=t_sp;
	return 0;
}
function bb_graphics_DrawImage(t_image,t_x,t_y,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics_renderDevice.DrawSurface(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty);
	}else{
		bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,t_x-t_image.m_tx,t_y-t_image.m_ty,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	return 0;
}
function bb_graphics_Translate(t_x,t_y){
	bb_graphics_Transform(1.0,0.0,0.0,1.0,t_x,t_y);
	return 0;
}
function bb_graphics_Rotate(t_angle){
	bb_graphics_Transform(Math.cos((t_angle)*D2R),-Math.sin((t_angle)*D2R),Math.sin((t_angle)*D2R),Math.cos((t_angle)*D2R),0.0,0.0);
	return 0;
}
function bb_graphics_DrawImage2(t_image,t_x,t_y,t_rotation,t_scaleX,t_scaleY,t_frame){
	var t_f=t_image.m_frames[t_frame];
	bb_graphics_PushMatrix();
	bb_graphics_Translate(t_x,t_y);
	bb_graphics_Rotate(t_rotation);
	bb_graphics_Scale(t_scaleX,t_scaleY);
	bb_graphics_Translate(-t_image.m_tx,-t_image.m_ty);
	bb_graphics_context.p_Validate();
	if((t_image.m_flags&65536)!=0){
		bb_graphics_renderDevice.DrawSurface(t_image.m_surface,0.0,0.0);
	}else{
		bb_graphics_renderDevice.DrawSurface2(t_image.m_surface,0.0,0.0,t_f.m_x,t_f.m_y,t_image.m_width,t_image.m_height);
	}
	bb_graphics_PopMatrix();
	return 0;
}
function bb_math_Min(t_x,t_y){
	if(t_x<t_y){
		return t_x;
	}
	return t_y;
}
function bb_math_Min2(t_x,t_y){
	if(t_x<t_y){
		return t_x;
	}
	return t_y;
}
function bb_graphics_Cls(t_r,t_g,t_b){
	bb_graphics_renderDevice.Cls(t_r,t_g,t_b);
	return 0;
}
function bb_autofit_UpdateVirtualDisplay(t_zoomborders,t_keepborders){
	c_VirtualDisplay.m_Display.p_UpdateVirtualDisplay(t_zoomborders,t_keepborders);
	return 0;
}
function bb_graphics_DrawText(t_text,t_x,t_y,t_xalign,t_yalign){
	if(!((bb_graphics_context.m_font)!=null)){
		return 0;
	}
	var t_w=bb_graphics_context.m_font.p_Width();
	var t_h=bb_graphics_context.m_font.p_Height();
	t_x-=Math.floor((t_w*t_text.length)*t_xalign);
	t_y-=Math.floor((t_h)*t_yalign);
	for(var t_i=0;t_i<t_text.length;t_i=t_i+1){
		var t_ch=t_text.charCodeAt(t_i)-bb_graphics_context.m_firstChar;
		if(t_ch>=0 && t_ch<bb_graphics_context.m_font.p_Frames()){
			bb_graphics_DrawImage(bb_graphics_context.m_font,t_x+(t_i*t_w),t_y,t_ch);
		}
	}
	return 0;
}
function c_Enumerator2(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator2.m_new=function(t_stack){
	this.m_stack=t_stack;
	return this;
}
c_Enumerator2.m_new2=function(){
	return this;
}
c_Enumerator2.prototype.p_HasNext=function(){
	return this.m_index<this.m_stack.p_Length2();
}
c_Enumerator2.prototype.p_NextObject=function(){
	this.m_index+=1;
	return this.m_stack.m_data[this.m_index-1];
}
function c_Enumerator3(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator3.m_new=function(t_stack){
	this.m_stack=t_stack;
	return this;
}
c_Enumerator3.m_new2=function(){
	return this;
}
c_Enumerator3.prototype.p_HasNext=function(){
	return this.m_index<this.m_stack.p_Length2();
}
c_Enumerator3.prototype.p_NextObject=function(){
	this.m_index+=1;
	return this.m_stack.m_data[this.m_index-1];
}
function bb_ld38_2_GetRoot(){
	return c_LD38.m_Data;
}
function c_NamedPlayButtonCallBack(){
	c_ICallBack.call(this);
	this.m_songStr="";
}
c_NamedPlayButtonCallBack.prototype=extend_class(c_ICallBack);
c_NamedPlayButtonCallBack.m_new=function(t__str){
	c_ICallBack.m_new.call(this);
	this.m_songStr=t__str;
	return this;
}
c_NamedPlayButtonCallBack.m_new2=function(){
	c_ICallBack.m_new.call(this);
	return this;
}
c_NamedPlayButtonCallBack.prototype.p_call=function(){
	bb_ld38_2_GetRoot().m_menu.p_Destroy();
	bb_ld38_2_GetRoot().p_NamedStartGame(this.m_songStr);
}
function c_BackButtonCallBack(){
	c_ICallBack.call(this);
}
c_BackButtonCallBack.prototype=extend_class(c_ICallBack);
c_BackButtonCallBack.m_new=function(){
	c_ICallBack.m_new.call(this);
	return this;
}
c_BackButtonCallBack.prototype.p_call=function(){
	bb_ld38_2_GetRoot().m_menu.p_Destroy();
	bb_ld38_2_GetRoot().p_InitMainMenu();
}
function bbInit(){
	bb_app__app=null;
	bb_app__delegate=null;
	bb_app__game=BBGame.Game();
	bb_graphics_device=null;
	bb_graphics_context=c_GraphicsContext.m_new.call(new c_GraphicsContext);
	c_Image.m_DefaultFlags=0;
	bb_audio_device=null;
	bb_input_device=null;
	bb_app__devWidth=0;
	bb_app__devHeight=0;
	bb_app__displayModes=[];
	bb_app__desktopMode=null;
	bb_graphics_renderDevice=null;
	bb_ld38_2_gameMode=0;
	bb_ld38_2_PauseFont=null;
	bb_ld38_2_ScoreFont=null;
	bb_ld38_2_ScoreFontYellow=null;
	bb_ld38_2_CreditsFont=null;
	bb_ld38_2_TitleFont=null;
	bb_ld38_2_InstructFont=null;
	bb_app__updateRate=0;
	bb_random_Seed=1234;
	c_VirtualDisplay.m_Display=null;
	c_LD38.m_Data=null;
	c_Stack5.m_NIL=null;
	c_Stack3.m_NIL=0;
	c_Stack4.m_NIL=null;
	c_Stack8.m_NIL=null;
	c_Stack6.m_NIL=null;
	c_Stack7.m_NIL=null;
}
//${TRANSCODE_END}
