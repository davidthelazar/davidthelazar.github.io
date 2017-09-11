
//Change this to true for a stretchy canvas!
//
var RESIZEABLE_CANVAS=false;

//Start us up!
//
window.onload=function( e ){

	if( RESIZEABLE_CANVAS ){
		window.onresize=function( e ){
			var canvas=document.getElementById( "GameCanvas" );

			//This vs window.innerWidth, which apparently doesn't account for scrollbar?
			var width=document.body.clientWidth;
			
			//This vs document.body.clientHeight, which does weird things - document seems to 'grow'...perhaps canvas resize pushing page down?
			var height=window.innerHeight;			

			canvas.width=width;
			canvas.height=height;
		}
		window.onresize( null );
	}

	BBMonkeyGame.Main( document.getElementById( "GameCanvas" ) );
}

//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_BRL_THREAD_IMPLEMENTED="1";
CFG_CONFIG="debug";
CFG_HOST="macos";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_LANG="js";
CFG_MOJO_AUTO_SUSPEND_ENABLED="1";
CFG_MOJO_DRIVER_IMPLEMENTED="1";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_GLES20_ENABLED="0";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.txt|*.xml|*.json";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[sprEnemy1L1.png];type=image/png;width=32;height=32;\n[sprEnemyCircleL1.png];type=image/png;width=64;height=64;\n[sprEnemySpawnL1.png];type=image/png;width=96;height=96;\n[sprEnemyTurretL1.png];type=image/png;width=96;height=96;\n[sprFinishLine.png];type=image/png;width=50;height=1280;\n[sprMenuButton.png];type=image/png;width=800;height=150;\n[sprPlayer.png];type=image/png;width=192;height=32;\n[sprPowerupBomb.png];type=image/png;width=16;height=16;\n[sprPowerupBoomerang.png];type=image/png;width=16;height=16;\n[sprPowerupGeneric.png];type=image/png;width=32;height=16;\n[sprPowerupHomingMissile.png];type=image/png;width=16;height=16;\n[sprPowerupRing.png];type=image/png;width=16;height=16;\n[sprPowerupSpeedDown.png];type=image/png;width=16;height=16;\n[sprPowerupSpeedUp.png];type=image/png;width=16;height=16;\n[sprPowerupSpiral.png];type=image/png;width=16;height=16;\n[sprPowerupTailShot.png];type=image/png;width=16;height=16;\n[sprProjBomb.png];type=image/png;width=16;height=16;\n[sprProjBombExplode.png];type=image/png;width=128;height=64;\n[sprProjHomingMissile.png];type=image/png;width=20;height=12;\n[sprProjRing.png];type=image/png;width=192;height=32;\n[sprProjSpiral.png];type=image/png;width=32;height=8;\n[sprProjStock.png];type=image/png;width=80;height=8;\n[sprProjTailShot.png];type=image/png;width=80;height=8;\n[sprWall0.png];type=image/png;width=32;height=32;\n[test.jpg];type=image/jpg;width=98;height=98;\n[mojo_font.png];type=image/png;width=864;height=13;\n";
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


function BBHtml5Game( canvas ){
	BBGame.call( this );
	BBHtml5Game._game=this;
	this._canvas=canvas;
	this._loading=0;
	this._timerSeq=0;
	this._gl=null;
	if( CFG_OPENGL_GLES20_ENABLED=="1" ){
		this._gl=this._canvas.getContext( "webgl" );
		if( !this._gl ) this._gl=this._canvas.getContext( "experimental-webgl" );
		if( !this._gl ) this.Die( "Can't create WebGL" );
		gl=this._gl;
	}
}

BBHtml5Game.prototype=extend_class( BBGame );

BBHtml5Game.Html5Game=function(){
	return BBHtml5Game._game;
}

BBHtml5Game.prototype.ValidateUpdateTimer=function(){

	++this._timerSeq;

	if( !this._updateRate || this._suspended ) return;
	
	var game=this;
	var updatePeriod=1000.0/this._updateRate;
	var nextUpdate=Date.now()+updatePeriod;
	var seq=game._timerSeq;
	
	function timeElapsed(){
		if( seq!=game._timerSeq ) return;

		var time;		
		var updates;
		
		for( updates=0;updates<4;++updates ){
		
			nextUpdate+=updatePeriod;
			
			game.UpdateGame();
			if( seq!=game._timerSeq ) return;
			
			if( nextUpdate-Date.now()>0 ) break;
		}
		
		game.RenderGame();
		if( seq!=game._timerSeq ) return;
		
		if( updates==4 ){
			nextUpdate=Date.now();
			setTimeout( timeElapsed,0 );
		}else{
			var delay=nextUpdate-Date.now();
			setTimeout( timeElapsed,delay>0 ? delay : 0 );
		}
	}

	setTimeout( timeElapsed,updatePeriod );
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
		return x;
	}
	
	function mouseY( e ){
		var y=e.clientY+document.body.scrollTop;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y;
	}

	function touchX( touch ){
		var x=touch.pageX;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x;
	}			
	
	function touchY( touch ){
		var y=touch.pageY;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y;
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
		}
	}
	
	canvas.onblur=function( e ){
		for( var i=0;i<256;++i ) game.KeyEvent( BBGameEvent.KeyUp,i );
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.SuspendGame();
		}
	}
	
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

//***** gxtkGraphics class *****

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
	
	function onloadfun(){
		game.DecLoading();
	}
	
	game.IncLoading();

	var image=new Image();
	image.onload=onloadfun;
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

//***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

//***** GXTK API *****

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
	return true;
}

//***** gxtkChannel class *****
function gxtkChannel(){
	this.sample=null;
	this.audio=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.flags=0;
	this.state=0;
}

//***** gxtkAudio class *****
function gxtkAudio(){
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

//***** gxtkSample class *****

function gxtkSample( audio ){
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
			print( "AUDIO ERROR1!" );
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
				print( "AUDIO ERROR2!" );
			}
		}
	},false );

	this.insts.push( audio );
	return audio;
}

gxtkSample.prototype.Discard=function(){
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
	var image=new Image();

	image.onload=function( e ){
		image.meta_width=image.width;
		image.meta_height=image.height;
		thread._surface=new gxtkSurface( image,thread._device )
		thread._running=false;
	}
	
	image.onerror=function( e ){
		thread._surface=null;
		thread._running=false;
	}
	
	thread._running=true;
	
	image.src=BBGame.Game().PathToUrl( thread._path );
}

BBAsyncImageLoaderThread.prototype.IsRunning=function(){
	return this._running;
}



function BBAsyncSoundLoaderThread(){
}

BBAsyncSoundLoaderThread.prototype.Start=function(){
	this._sample=this._device.LoadSample( this._path );
}

BBAsyncSoundLoaderThread.prototype.IsRunning=function(){
	return false;
}

/*
Copyright (c) 2011 Steve Revill and Shane Woolcock
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var diddy = new Object();

var diddy_mouseWheelDelta = 0.0;

diddy.mouseZ = function() {
	var t = diddy_mouseWheelDelta;
	diddy_mouseWheelDelta = 0.0;
	return t;
}

diddy.mouseZInit = function() {
	var canvas=document.getElementById( "GameCanvas" );
	
	canvas.onmousewheel = function(e) {
		diddy_mouseWheelDelta += e.wheelDelta/120.0;
	}
}

diddy.systemMillisecs=function(){
	return new Date().getTime();
};

diddy.setGraphics=function(w, h)
{
	var canvas=document.getElementById( "GameCanvas" );
	canvas.width  = w;
	canvas.height = h;
	//return window.innerHeight;
}
diddy.setMouse=function(x, y)
{
}
diddy.showKeyboard=function()
{
}
diddy.launchBrowser=function(address, windowName)
{
	window.open(address, windowName);
}
diddy.launchEmail=function(email, subject, text)
{
	location.href="mailto:"+email+"&subject="+subject+"&body="+text+"";
}

diddy.startVibrate=function(millisecs)
{
}
diddy.stopVibrate=function()
{
}

diddy.startGps=function(){
}

diddy.getLatitiude=function(){
	return ""
}
diddy.getLongitude=function(){
	return ""
}
diddy.showAlertDialog=function(title, message)
{
}
diddy.getInputString=function()
{
	return "";
}
// Browser detect from http://www.quirksmode.org/js/detect.html
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

diddy.getBrowserName=function(){
	return BrowserDetect.browser;
};

diddy.getBrowserVersion=function(){
	return BrowserDetect.version;
};

diddy.getBrowserOS=function(){
	return BrowserDetect.OS;
};

diddy.seekMusic=function(timeMillis)
{
	if(bb_audio_device &&
		bb_audio_device.channels &&
		bb_audio_device.channels[32] &&
		bb_audio_device.channels[32].audio)
	{
		var audio = bb_audio_device.channels[32].audio;
		try {
			audio.currentTime = timeMillis/1000.0;
			return 1;
		} catch(e) {}
	}
	return 0;
};

function c_App(){
	Object.call(this);
}
c_App.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<104>";
	if((bb_app__app)!=null){
		err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<104>";
		error("App has already been created");
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<105>";
	bb_app__app=this;
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<106>";
	bb_app__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<107>";
	bb_app__game.SetDelegate(bb_app__delegate);
	pop_err();
	return this;
}
c_App.prototype.p_OnCreate=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnSuspend=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnResume=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnUpdate=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnLoading=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnRender=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnClose=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<129>";
	bb_app_EndApp();
	pop_err();
	return 0;
}
c_App.prototype.p_OnBack=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<133>";
	this.p_OnClose();
	pop_err();
	return 0;
}
function c_RogueType(){
	c_App.call(this);
	this.m_saveData=null;
	this.m_assetManager=null;
	this.m_powerupInfo=null;
	this.m_upgradePoints=0;
	this.m_difficultyModifier=0;
	this.m_controller=null;
	this.m_shipManager=null;
	this.m_camera=null;
	this.m_enemyProjectileManager=null;
	this.m_friendlyProjectileManager=null;
	this.m_ambiguousProjectileManager=null;
	this.m_popupManager=null;
	this.m_powerupManager=null;
	this.m_sceneryManager=null;
	this.m_player=null;
	this.m_collisionManager=null;
	this.m_currentLevel=null;
	this.m_lastCompletedLevel=0;
	this.m_score=0;
	this.m_levelScore=0;
}
c_RogueType.prototype=extend_class(c_App);
c_RogueType.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<19>";
	c_App.m_new.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<19>";
	pop_err();
	return this;
}
c_RogueType.m_Data=null;
c_RogueType.prototype.p_loadPlayerState=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<169>";
	var t_playerIni=c_Ini.m_LoadFromState(true);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<170>";
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<170>";
	var t_=dbg_object(this).m_powerupInfo.p_ObjectEnumerator();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<170>";
	while(t_.p_HasNext()){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<170>";
		var t_item=t_.p_NextObject();
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<171>";
		var t_currSect=t_item.p_Key();
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<172>";
		var t_pu=t_item.p_Value();
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<174>";
		dbg_object(t_pu).m_remembered=t_playerIni.p_GetBool("remembered",t_currSect,false);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<175>";
		dbg_object(t_pu).m_permanentValue=t_playerIni.p_GetInt("permanentValue",t_currSect,0);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<177>";
		dbg_object(t_pu).m_currentValue=dbg_object(t_pu).m_permanentValue;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<178>";
		dbg_object(t_pu).m_encounteredThisRun=false;
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<180>";
	dbg_object(this).m_upgradePoints=t_playerIni.p_GetInt("upgradePoints","gameData",0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<181>";
	dbg_object(this).m_difficultyModifier=t_playerIni.p_GetInt("difficultyModifier","gameData",0);
	pop_err();
	return 0;
}
c_RogueType.prototype.p_OnCreate=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<55>";
	dbg_object(this).m_saveData=c_Ini.m_LoadFromState(true);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<57>";
	if(dbg_object(this).m_saveData.p_Get("lastLoad","inihandler","")=="failed"){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<58>";
		dbg_object(this).m_saveData=c_Ini.m_LoadFromFile("monkey://data/roguetypePowerups.txt",true);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<59>";
		dbg_object(this).m_saveData.p_SaveToState(true);
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<65>";
	bb_app_SetUpdateRate(60);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<66>";
	bb_random_Seed=diddy.systemMillisecs();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<68>";
	bb_autofit_SetVirtualDisplay(1280,720,1.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<69>";
	dbg_object(this).m_assetManager=c_AssetManager.m_new.call(new c_AssetManager);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<70>";
	c_RogueType.m_Data=this;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<71>";
	bb_roguetype_LoadAllImages();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<72>";
	dbg_object(this).m_powerupInfo=bb_powerup_initPowerupData();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<73>";
	this.p_loadPlayerState();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<74>";
	dbg_object(this).m_controller=c_Controller.m_new.call(new c_Controller,0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<75>";
	dbg_object(this).m_shipManager=c_KillableManager.m_new.call(new c_KillableManager);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<76>";
	dbg_object(this).m_camera=c_Camera.m_new.call(new c_Camera,c_Vector.m_new.call(new c_Vector,0.0,0.0),c_Vector.m_new.call(new c_Vector,1280.0,720.0));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<77>";
	dbg_object(dbg_object(this).m_camera).m_vel=c_Velocity.m_new.call(new c_Velocity,1.0,0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<78>";
	dbg_object(this).m_enemyProjectileManager=c_ProjectileManager.m_new.call(new c_ProjectileManager);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<79>";
	dbg_object(this).m_friendlyProjectileManager=c_ProjectileManager.m_new.call(new c_ProjectileManager);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<80>";
	dbg_object(this).m_ambiguousProjectileManager=c_ProjectileManager.m_new.call(new c_ProjectileManager);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<81>";
	dbg_object(this).m_popupManager=c_KillableManager3.m_new.call(new c_KillableManager3);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<82>";
	dbg_object(this).m_powerupManager=c_PowerupManager.m_new.call(new c_PowerupManager);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<83>";
	dbg_object(this).m_sceneryManager=c_KillableManager5.m_new.call(new c_KillableManager5);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<85>";
	dbg_object(this).m_player=c_Player.m_new.call(new c_Player,100.0,200.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<89>";
	dbg_object(this).m_collisionManager=c_CollisionManager.m_new.call(new c_CollisionManager);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<98>";
	dbg_object(this).m_currentLevel=c_Level.m_new.call(new c_Level,c_Vector.m_new.call(new c_Vector,0.0,0.0),c_Vector.m_new.call(new c_Vector,1280.0,720.0),0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<100>";
	dbg_object(this).m_powerupManager.p_createNewWithKey(500.0,500.0,"HomingMissile");
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<101>";
	print(String(dbg_object(this).m_upgradePoints));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<102>";
	pop_err();
	return 0;
}
c_RogueType.prototype.p_savePlayerState=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<186>";
	var t_playerIni=c_Ini.m_new.call(new c_Ini,true);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<188>";
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<188>";
	var t_=dbg_object(this).m_powerupInfo.p_ObjectEnumerator();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<188>";
	while(t_.p_HasNext()){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<188>";
		var t_item=t_.p_NextObject();
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<189>";
		var t_currSect=t_item.p_Key();
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<190>";
		var t_pu=t_item.p_Value();
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<192>";
		t_playerIni.p_Set("remembered",String((dbg_object(t_pu).m_remembered)?1:0),t_currSect);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<193>";
		t_playerIni.p_Set("permanentValue",String(dbg_object(t_pu).m_permanentValue),t_currSect);
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<196>";
	t_playerIni.p_Set("upgradePoints",String(dbg_object(c_RogueType.m_Data).m_upgradePoints),"gameData");
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<197>";
	t_playerIni.p_Set("difficultyModifier",String(dbg_object(c_RogueType.m_Data).m_difficultyModifier),"gameData");
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<198>";
	t_playerIni.p_SaveToState(true);
	pop_err();
	return 0;
}
c_RogueType.prototype.p_levelComplete=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<156>";
	if(!dbg_object(dbg_object(this).m_currentLevel).m_isMenu){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<157>";
		dbg_object(this).m_lastCompletedLevel=dbg_object(dbg_object(this).m_currentLevel).m_number;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<158>";
		print(String(dbg_object(this).m_lastCompletedLevel));
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<159>";
		dbg_object(dbg_object(this).m_shipManager).m_items.p_Clear();
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<160>";
		dbg_object(dbg_object(this).m_powerupManager).m_items.p_Clear();
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<161>";
		dbg_object(dbg_object(this).m_sceneryManager).m_items.p_Clear();
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<162>";
		dbg_object(this).m_currentLevel=c_Level.m_new.call(new c_Level,c_Vector.m_new.call(new c_Vector,dbg_object(this).m_currentLevel.p_right(),0.0),c_Vector.m_new.call(new c_Vector,dbg_object(this).m_currentLevel.p_right()+3240.0,720.0),dbg_object(this).m_lastCompletedLevel+1);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<163>";
		dbg_object(this).m_score=dbg_object(this).m_score+dbg_object(this).m_levelScore;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<164>";
		dbg_object(this).m_levelScore=0;
	}
	pop_err();
	return 0;
}
c_RogueType.prototype.p_OnUpdate=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<107>";
	dbg_object(this).m_controller.p_update();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<108>";
	dbg_object(this).m_camera.p_update();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<109>";
	dbg_object(this).m_shipManager.p_update();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<110>";
	dbg_object(this).m_friendlyProjectileManager.p_update();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<111>";
	dbg_object(this).m_enemyProjectileManager.p_update();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<112>";
	dbg_object(this).m_ambiguousProjectileManager.p_update();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<113>";
	dbg_object(this).m_popupManager.p_update();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<114>";
	dbg_object(this).m_powerupManager.p_update();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<115>";
	dbg_object(this).m_sceneryManager.p_update();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<116>";
	if(dbg_object(dbg_object(this).m_currentLevel).m_isMenu){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<117>";
		dbg_object(dbg_object(this).m_currentLevel).m_menu.p_update();
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<119>";
	if(dbg_object(this).m_player!=null){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<120>";
		dbg_object(this).m_player.p_update();
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<121>";
		if(dbg_object(dbg_object(this).m_player).m_isDead){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<122>";
			dbg_object(this).m_player=null;
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<123>";
			this.p_savePlayerState();
		}
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<126>";
	dbg_object(this).m_collisionManager.p_update();
	pop_err();
	return 0;
}
c_RogueType.prototype.p_OnRender=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<130>";
	bb_autofit_UpdateVirtualDisplay(true,true);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<131>";
	bb_graphics_Cls(123.0,123.0,255.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<132>";
	dbg_object(this).m_camera.p_drawStart();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<133>";
	if(dbg_object(this).m_player!=null){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<134>";
		dbg_object(this).m_player.p_draw();
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<136>";
	dbg_object(this).m_shipManager.p_draw();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<137>";
	dbg_object(this).m_friendlyProjectileManager.p_draw();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<138>";
	dbg_object(this).m_enemyProjectileManager.p_draw();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<139>";
	dbg_object(this).m_ambiguousProjectileManager.p_draw();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<140>";
	dbg_object(this).m_popupManager.p_draw();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<141>";
	dbg_object(this).m_powerupManager.p_draw();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<142>";
	dbg_object(this).m_sceneryManager.p_draw();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<143>";
	if(dbg_object(dbg_object(this).m_currentLevel).m_isMenu){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<144>";
		dbg_object(dbg_object(this).m_currentLevel).m_menu.p_draw();
	}else{
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<147>";
		dbg_object(dbg_object(this).m_currentLevel).m_finishLine.p_draw();
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<149>";
	bb_graphics_SetColor(255.0,0.0,0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<151>";
	dbg_object(this).m_camera.p_drawEnd();
	pop_err();
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
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<24>";
	pop_err();
	return this;
}
c_GameDelegate.prototype.StartGame=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<33>";
	this.m__graphics=(new gxtkGraphics);
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<34>";
	bb_graphics_SetGraphicsDevice(this.m__graphics);
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<35>";
	bb_graphics_SetFont(null,32);
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<37>";
	this.m__audio=(new gxtkAudio);
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<38>";
	bb_audio_SetAudioDevice(this.m__audio);
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<40>";
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<41>";
	bb_input_SetInputDevice(this.m__input);
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<43>";
	bb_app__app.p_OnCreate();
	pop_err();
}
c_GameDelegate.prototype.SuspendGame=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<47>";
	bb_app__app.p_OnSuspend();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<48>";
	this.m__audio.Suspend();
	pop_err();
}
c_GameDelegate.prototype.ResumeGame=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<52>";
	this.m__audio.Resume();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<53>";
	bb_app__app.p_OnResume();
	pop_err();
}
c_GameDelegate.prototype.UpdateGame=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<57>";
	this.m__input.p_BeginUpdate();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<58>";
	bb_app__app.p_OnUpdate();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<59>";
	this.m__input.p_EndUpdate();
	pop_err();
}
c_GameDelegate.prototype.RenderGame=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<63>";
	var t_mode=this.m__graphics.BeginRender();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<64>";
	if((t_mode)!=0){
		err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<64>";
		bb_graphics_BeginRender();
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<65>";
	if(t_mode==2){
		err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<65>";
		bb_app__app.p_OnLoading();
	}else{
		err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<65>";
		bb_app__app.p_OnRender();
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<66>";
	if((t_mode)!=0){
		err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<66>";
		bb_graphics_EndRender();
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<67>";
	this.m__graphics.EndRender();
	pop_err();
}
c_GameDelegate.prototype.KeyEvent=function(t_event,t_data){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<71>";
	this.m__input.p_KeyEvent(t_event,t_data);
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<72>";
	if(t_event!=1){
		pop_err();
		return;
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<73>";
	var t_1=t_data;
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<74>";
	if(t_1==432){
		err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<75>";
		bb_app__app.p_OnClose();
	}else{
		err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<76>";
		if(t_1==416){
			err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<77>";
			bb_app__app.p_OnBack();
		}
	}
	pop_err();
}
c_GameDelegate.prototype.MouseEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<82>";
	this.m__input.p_MouseEvent(t_event,t_data,t_x,t_y);
	pop_err();
}
c_GameDelegate.prototype.TouchEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<86>";
	this.m__input.p_TouchEvent(t_event,t_data,t_x,t_y);
	pop_err();
}
c_GameDelegate.prototype.MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<90>";
	this.m__input.p_MotionEvent(t_event,t_data,t_x,t_y,t_z);
	pop_err();
}
c_GameDelegate.prototype.DiscardGraphics=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<94>";
	this.m__graphics.DiscardGraphics();
	pop_err();
}
var bb_app__delegate=null;
var bb_app__game=null;
function bbMain(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<203>";
	c_RogueType.m_new.call(new c_RogueType);
	pop_err();
	return 0;
}
var bb_graphics_device=null;
function bb_graphics_SetGraphicsDevice(t_dev){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<59>";
	bb_graphics_device=t_dev;
	pop_err();
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
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<66>";
	pop_err();
	return this;
}
c_Image.prototype.p_SetHandle=function(t_tx,t_ty){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<110>";
	dbg_object(this).m_tx=t_tx;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<111>";
	dbg_object(this).m_ty=t_ty;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<112>";
	dbg_object(this).m_flags=dbg_object(this).m_flags&-2;
	pop_err();
	return 0;
}
c_Image.prototype.p_ApplyFlags=function(t_iflags){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<188>";
	this.m_flags=t_iflags;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<190>";
	if((this.m_flags&2)!=0){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<191>";
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<191>";
		var t_=this.m_frames;
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<191>";
		var t_2=0;
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<191>";
		while(t_2<t_.length){
			err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<191>";
			var t_f=dbg_array(t_,t_2)[dbg_index];
			err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<191>";
			t_2=t_2+1;
			err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<192>";
			dbg_object(t_f).m_x+=1;
		}
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<194>";
		this.m_width-=2;
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<197>";
	if((this.m_flags&4)!=0){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<198>";
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<198>";
		var t_3=this.m_frames;
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<198>";
		var t_4=0;
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<198>";
		while(t_4<t_3.length){
			err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<198>";
			var t_f2=dbg_array(t_3,t_4)[dbg_index];
			err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<198>";
			t_4=t_4+1;
			err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<199>";
			dbg_object(t_f2).m_y+=1;
		}
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<201>";
		this.m_height-=2;
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<204>";
	if((this.m_flags&1)!=0){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<205>";
		this.p_SetHandle((this.m_width)/2.0,(this.m_height)/2.0);
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<208>";
	if(this.m_frames.length==1 && dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_x==0 && dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_y==0 && this.m_width==this.m_surface.Width() && this.m_height==this.m_surface.Height()){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<209>";
		this.m_flags|=65536;
	}
	pop_err();
	return 0;
}
c_Image.prototype.p_Init=function(t_surf,t_nframes,t_iflags){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<146>";
	this.m_surface=t_surf;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<148>";
	this.m_width=((this.m_surface.Width()/t_nframes)|0);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<149>";
	this.m_height=this.m_surface.Height();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<151>";
	this.m_frames=new_object_array(t_nframes);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<152>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<153>";
		dbg_array(this.m_frames,t_i)[dbg_index]=c_Frame.m_new.call(new c_Frame,t_i*this.m_width,0)
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<156>";
	this.p_ApplyFlags(t_iflags);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<157>";
	pop_err();
	return this;
}
c_Image.prototype.p_Init2=function(t_surf,t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_src,t_srcx,t_srcy,t_srcw,t_srch){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<161>";
	this.m_surface=t_surf;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<162>";
	this.m_source=t_src;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<164>";
	this.m_width=t_iwidth;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<165>";
	this.m_height=t_iheight;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<167>";
	this.m_frames=new_object_array(t_nframes);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<169>";
	var t_ix=t_x;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<169>";
	var t_iy=t_y;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<171>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<172>";
		if(t_ix+this.m_width>t_srcw){
			err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<173>";
			t_ix=0;
			err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<174>";
			t_iy+=this.m_height;
		}
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<176>";
		if(t_ix+this.m_width>t_srcw || t_iy+this.m_height>t_srch){
			err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<177>";
			error("Image frame outside surface");
		}
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<179>";
		dbg_array(this.m_frames,t_i)[dbg_index]=c_Frame.m_new.call(new c_Frame,t_ix+t_srcx,t_iy+t_srcy)
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<180>";
		t_ix+=this.m_width;
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<183>";
	this.p_ApplyFlags(t_iflags);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<184>";
	pop_err();
	return this;
}
c_Image.prototype.p_Frames=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<89>";
	var t_=this.m_frames.length;
	pop_err();
	return t_;
}
c_Image.prototype.p_Width=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<77>";
	pop_err();
	return this.m_width;
}
c_Image.prototype.p_Height=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<81>";
	pop_err();
	return this.m_height;
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
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<25>";
	pop_err();
	return this;
}
c_GraphicsContext.prototype.p_Validate=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<36>";
	if((this.m_matDirty)!=0){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<37>";
		bb_graphics_renderDevice.SetMatrix(dbg_object(bb_graphics_context).m_ix,dbg_object(bb_graphics_context).m_iy,dbg_object(bb_graphics_context).m_jx,dbg_object(bb_graphics_context).m_jy,dbg_object(bb_graphics_context).m_tx,dbg_object(bb_graphics_context).m_ty);
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<38>";
		this.m_matDirty=0;
	}
	pop_err();
	return 0;
}
var bb_graphics_context=null;
function bb_data_FixDataPath(t_path){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/data.monkey<3>";
	var t_i=t_path.indexOf(":/",0);
	err_info="/Applications/MonkeyX77a/modules/mojo/data.monkey<4>";
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		err_info="/Applications/MonkeyX77a/modules/mojo/data.monkey<4>";
		pop_err();
		return t_path;
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/data.monkey<5>";
	if(string_startswith(t_path,"./") || string_startswith(t_path,"/")){
		err_info="/Applications/MonkeyX77a/modules/mojo/data.monkey<5>";
		pop_err();
		return t_path;
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/data.monkey<6>";
	var t_="monkey://data/"+t_path;
	pop_err();
	return t_;
}
function c_Frame(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
}
c_Frame.m_new=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<19>";
	dbg_object(this).m_x=t_x;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<20>";
	dbg_object(this).m_y=t_y;
	pop_err();
	return this;
}
c_Frame.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<14>";
	pop_err();
	return this;
}
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<238>";
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<239>";
	if((t_surf)!=null){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<239>";
		var t_=(c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
		pop_err();
		return t_;
	}
	pop_err();
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<243>";
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<244>";
	if((t_surf)!=null){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<244>";
		var t_=(c_Image.m_new.call(new c_Image)).p_Init2(t_surf,0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags,null,0,0,t_surf.Width(),t_surf.Height());
		pop_err();
		return t_;
	}
	pop_err();
	return null;
}
function bb_graphics_SetFont(t_font,t_firstChar){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<545>";
	if(!((t_font)!=null)){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<546>";
		if(!((dbg_object(bb_graphics_context).m_defaultFont)!=null)){
			err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<547>";
			dbg_object(bb_graphics_context).m_defaultFont=bb_graphics_LoadImage("mojo_font.png",96,2);
		}
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<549>";
		t_font=dbg_object(bb_graphics_context).m_defaultFont;
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<550>";
		t_firstChar=32;
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<552>";
	dbg_object(bb_graphics_context).m_font=t_font;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<553>";
	dbg_object(bb_graphics_context).m_firstChar=t_firstChar;
	pop_err();
	return 0;
}
var bb_audio_device=null;
function bb_audio_SetAudioDevice(t_dev){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/audio.monkey<18>";
	bb_audio_device=t_dev;
	pop_err();
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
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<22>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<23>";
		dbg_array(this.m__joyStates,t_i)[dbg_index]=c_JoyState.m_new.call(new c_JoyState)
	}
	pop_err();
	return this;
}
c_InputDevice.prototype.p_PutKeyHit=function(t_key){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<233>";
	if(this.m__keyHitPut==this.m__keyHitQueue.length){
		pop_err();
		return;
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<234>";
	dbg_array(this.m__keyHit,t_key)[dbg_index]+=1
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<235>";
	dbg_array(this.m__keyHitQueue,this.m__keyHitPut)[dbg_index]=t_key
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<236>";
	this.m__keyHitPut+=1;
	pop_err();
}
c_InputDevice.prototype.p_BeginUpdate=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<185>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<186>";
		var t_state=dbg_array(this.m__joyStates,t_i)[dbg_index];
		err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<187>";
		if(!BBGame.Game().PollJoystick(t_i,dbg_object(t_state).m_joyx,dbg_object(t_state).m_joyy,dbg_object(t_state).m_joyz,dbg_object(t_state).m_buttons)){
			err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<187>";
			break;
		}
		err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<188>";
		for(var t_j=0;t_j<32;t_j=t_j+1){
			err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<189>";
			var t_key=256+t_i*32+t_j;
			err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<190>";
			if(dbg_array(dbg_object(t_state).m_buttons,t_j)[dbg_index]){
				err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<191>";
				if(!dbg_array(this.m__keyDown,t_key)[dbg_index]){
					err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<192>";
					dbg_array(this.m__keyDown,t_key)[dbg_index]=true
					err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<193>";
					this.p_PutKeyHit(t_key);
				}
			}else{
				err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<196>";
				dbg_array(this.m__keyDown,t_key)[dbg_index]=false
			}
		}
	}
	pop_err();
}
c_InputDevice.prototype.p_EndUpdate=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<203>";
	for(var t_i=0;t_i<this.m__keyHitPut;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<204>";
		dbg_array(this.m__keyHit,dbg_array(this.m__keyHitQueue,t_i)[dbg_index])[dbg_index]=0
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<206>";
	this.m__keyHitPut=0;
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<207>";
	this.m__charGet=0;
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<208>";
	this.m__charPut=0;
	pop_err();
}
c_InputDevice.prototype.p_KeyEvent=function(t_event,t_data){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<107>";
	var t_1=t_event;
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<108>";
	if(t_1==1){
		err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<109>";
		if(!dbg_array(this.m__keyDown,t_data)[dbg_index]){
			err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<110>";
			dbg_array(this.m__keyDown,t_data)[dbg_index]=true
			err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<111>";
			this.p_PutKeyHit(t_data);
			err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<112>";
			if(t_data==1){
				err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<113>";
				dbg_array(this.m__keyDown,384)[dbg_index]=true
				err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<114>";
				this.p_PutKeyHit(384);
			}else{
				err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<115>";
				if(t_data==384){
					err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<116>";
					dbg_array(this.m__keyDown,1)[dbg_index]=true
					err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<117>";
					this.p_PutKeyHit(1);
				}
			}
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<120>";
		if(t_1==2){
			err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<121>";
			if(dbg_array(this.m__keyDown,t_data)[dbg_index]){
				err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<122>";
				dbg_array(this.m__keyDown,t_data)[dbg_index]=false
				err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<123>";
				if(t_data==1){
					err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<124>";
					dbg_array(this.m__keyDown,384)[dbg_index]=false
				}else{
					err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<125>";
					if(t_data==384){
						err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<126>";
						dbg_array(this.m__keyDown,1)[dbg_index]=false
					}
				}
			}
		}else{
			err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<129>";
			if(t_1==3){
				err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<130>";
				if(this.m__charPut<this.m__charQueue.length){
					err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<131>";
					dbg_array(this.m__charQueue,this.m__charPut)[dbg_index]=t_data
					err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<132>";
					this.m__charPut+=1;
				}
			}
		}
	}
	pop_err();
}
c_InputDevice.prototype.p_MouseEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<138>";
	var t_2=t_event;
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<139>";
	if(t_2==4){
		err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<140>";
		this.p_KeyEvent(1,1+t_data);
	}else{
		err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<141>";
		if(t_2==5){
			err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<142>";
			this.p_KeyEvent(2,1+t_data);
			pop_err();
			return;
		}else{
			err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<144>";
			if(t_2==6){
			}else{
				pop_err();
				return;
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<148>";
	this.m__mouseX=t_x;
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<149>";
	this.m__mouseY=t_y;
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<150>";
	dbg_array(this.m__touchX,0)[dbg_index]=t_x
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<151>";
	dbg_array(this.m__touchY,0)[dbg_index]=t_y
	pop_err();
}
c_InputDevice.prototype.p_TouchEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<155>";
	var t_3=t_event;
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<156>";
	if(t_3==7){
		err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<157>";
		this.p_KeyEvent(1,384+t_data);
	}else{
		err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<158>";
		if(t_3==8){
			err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<159>";
			this.p_KeyEvent(2,384+t_data);
			pop_err();
			return;
		}else{
			err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<161>";
			if(t_3==9){
			}else{
				pop_err();
				return;
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<165>";
	dbg_array(this.m__touchX,t_data)[dbg_index]=t_x
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<166>";
	dbg_array(this.m__touchY,t_data)[dbg_index]=t_y
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<167>";
	if(t_data==0){
		err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<168>";
		this.m__mouseX=t_x;
		err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<169>";
		this.m__mouseY=t_y;
	}
	pop_err();
}
c_InputDevice.prototype.p_MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<174>";
	var t_4=t_event;
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<175>";
	if(t_4==10){
	}else{
		pop_err();
		return;
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<179>";
	this.m__accelX=t_x;
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<180>";
	this.m__accelY=t_y;
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<181>";
	this.m__accelZ=t_z;
	pop_err();
}
c_InputDevice.prototype.p_KeyDown=function(t_key){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<43>";
	if(t_key>0 && t_key<512){
		err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<43>";
		pop_err();
		return dbg_array(this.m__keyDown,t_key)[dbg_index];
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<44>";
	pop_err();
	return false;
}
c_InputDevice.prototype.p_KeyHit=function(t_key){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<48>";
	if(t_key>0 && t_key<512){
		err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<48>";
		pop_err();
		return dbg_array(this.m__keyHit,t_key)[dbg_index];
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<49>";
	pop_err();
	return 0;
}
c_InputDevice.prototype.p_MouseX=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<65>";
	pop_err();
	return this.m__mouseX;
}
c_InputDevice.prototype.p_MouseY=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<69>";
	pop_err();
	return this.m__mouseY;
}
function c_JoyState(){
	Object.call(this);
	this.m_joyx=new_number_array(2);
	this.m_joyy=new_number_array(2);
	this.m_joyz=new_number_array(2);
	this.m_buttons=new_bool_array(32);
}
c_JoyState.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<10>";
	pop_err();
	return this;
}
var bb_input_device=null;
function bb_input_SetInputDevice(t_dev){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/input.monkey<18>";
	bb_input_device=t_dev;
	pop_err();
	return 0;
}
var bb_graphics_renderDevice=null;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<311>";
	dbg_object(bb_graphics_context).m_ix=t_ix;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<312>";
	dbg_object(bb_graphics_context).m_iy=t_iy;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<313>";
	dbg_object(bb_graphics_context).m_jx=t_jx;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<314>";
	dbg_object(bb_graphics_context).m_jy=t_jy;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<315>";
	dbg_object(bb_graphics_context).m_tx=t_tx;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<316>";
	dbg_object(bb_graphics_context).m_ty=t_ty;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<317>";
	dbg_object(bb_graphics_context).m_tformed=((t_ix!=1.0 || t_iy!=0.0 || t_jx!=0.0 || t_jy!=1.0 || t_tx!=0.0 || t_ty!=0.0)?1:0);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<318>";
	dbg_object(bb_graphics_context).m_matDirty=1;
	pop_err();
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<307>";
	bb_graphics_SetMatrix(dbg_array(t_m,0)[dbg_index],dbg_array(t_m,1)[dbg_index],dbg_array(t_m,2)[dbg_index],dbg_array(t_m,3)[dbg_index],dbg_array(t_m,4)[dbg_index],dbg_array(t_m,5)[dbg_index]);
	pop_err();
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<253>";
	dbg_object(bb_graphics_context).m_color_r=t_r;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<254>";
	dbg_object(bb_graphics_context).m_color_g=t_g;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<255>";
	dbg_object(bb_graphics_context).m_color_b=t_b;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<256>";
	bb_graphics_renderDevice.SetColor(t_r,t_g,t_b);
	pop_err();
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<270>";
	dbg_object(bb_graphics_context).m_alpha=t_alpha;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<271>";
	bb_graphics_renderDevice.SetAlpha(t_alpha);
	pop_err();
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<279>";
	dbg_object(bb_graphics_context).m_blend=t_blend;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<280>";
	bb_graphics_renderDevice.SetBlend(t_blend);
	pop_err();
	return 0;
}
function bb_graphics_DeviceWidth(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<230>";
	var t_=bb_graphics_device.Width();
	pop_err();
	return t_;
}
function bb_graphics_DeviceHeight(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<234>";
	var t_=bb_graphics_device.Height();
	pop_err();
	return t_;
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<288>";
	dbg_object(bb_graphics_context).m_scissor_x=t_x;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<289>";
	dbg_object(bb_graphics_context).m_scissor_y=t_y;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<290>";
	dbg_object(bb_graphics_context).m_scissor_width=t_width;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<291>";
	dbg_object(bb_graphics_context).m_scissor_height=t_height;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<292>";
	bb_graphics_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	pop_err();
	return 0;
}
function bb_graphics_BeginRender(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<216>";
	bb_graphics_renderDevice=bb_graphics_device;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<217>";
	dbg_object(bb_graphics_context).m_matrixSp=0;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<218>";
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<219>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<220>";
	bb_graphics_SetAlpha(1.0);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<221>";
	bb_graphics_SetBlend(0);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<222>";
	bb_graphics_SetScissor(0.0,0.0,(bb_graphics_DeviceWidth()),(bb_graphics_DeviceHeight()));
	pop_err();
	return 0;
}
function bb_graphics_EndRender(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<226>";
	bb_graphics_renderDevice=null;
	pop_err();
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
function bb_app_EndApp(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<186>";
	error("");
	pop_err();
	return 0;
}
function c_Ini(){
	Object.call(this);
	this.m__UsingQuotes=false;
	this.m__Map=c_StringMap2.m_new.call(new c_StringMap2);
}
c_Ini.m_new=function(t_useQuotes){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<20>";
	this.m__UsingQuotes=t_useQuotes;
	pop_err();
	return this;
}
c_Ini.prototype.p_Set=function(t_key,t_value,t_section){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<46>";
	var t_subMap=null;
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<48>";
	if(!this.m__Map.p_Contains(t_section)){
		err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<48>";
		this.m__Map.p_Set3(t_section,c_StringMap.m_new.call(new c_StringMap));
	}
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<50>";
	t_subMap=this.m__Map.p_Get2(t_section);
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<51>";
	t_subMap.p_Set2(t_key,t_value);
	pop_err();
}
c_Ini.m_Load=function(t_data,t_quoteUsage){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<157>";
	var t_ini=c_Ini.m_new.call(new c_Ini,t_quoteUsage);
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<158>";
	var t_enclosure=0;
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<159>";
	var t_lines=[];
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<160>";
	var t_section="";
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<161>";
	var t_key="";
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<162>";
	var t_value="";
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<163>";
	var t_delimiterIndex=-1;
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<170>";
	t_lines=t_data.split("\n");
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<172>";
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<172>";
	var t_=t_lines;
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<172>";
	var t_2=0;
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<172>";
	while(t_2<t_.length){
		err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<172>";
		var t_line=dbg_array(t_,t_2)[dbg_index];
		err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<172>";
		t_2=t_2+1;
		err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<173>";
		t_line=string_trim(t_line);
		err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<175>";
		if(t_line.length>0){
			err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<176>";
			if(dbg_charCodeAt(t_line,0)==59){
				err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<176>";
				continue;
			}
			err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<178>";
			if(dbg_charCodeAt(t_line,0)==91 && dbg_charCodeAt(t_line,t_line.length-1)==93){
				err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<179>";
				t_section=t_line.slice(1,-1);
			}else{
				err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<181>";
				t_delimiterIndex=t_line.indexOf("=",0);
				err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<183>";
				if(t_delimiterIndex>0){
					err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<184>";
					t_key=string_trim(t_line.slice(0,t_delimiterIndex));
					err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<185>";
					t_value=string_trim(t_line.slice(t_delimiterIndex+1));
					err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<187>";
					if(t_value.length>0 && t_key.length>0){
						err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<188>";
						if(t_quoteUsage){
							err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<189>";
							var t_leftEnclosure=dbg_charCodeAt(t_value,0);
							err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<190>";
							var t_rightEnclosure=dbg_charCodeAt(t_value,t_value.length-1);
							err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<192>";
							if(t_leftEnclosure==t_rightEnclosure && (t_leftEnclosure==39 || t_leftEnclosure==34)){
								err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<193>";
								t_value=t_value.slice(1,-1);
							}
						}
						err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<197>";
						t_ini.p_Set(t_key,t_value,t_section);
					}
				}
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<204>";
	pop_err();
	return t_ini;
}
c_Ini.m_LoadFromState=function(t_quoteUsage){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<151>";
	var t_=c_Ini.m_Load(bb_app_LoadState(),t_quoteUsage);
	pop_err();
	return t_;
}
c_Ini.prototype.p_Get=function(t_key,t_section,t_defaultValue){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<55>";
	var t_subMap=null;
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<57>";
	if(this.m__Map.p_Contains(t_section)){
		err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<58>";
		t_subMap=this.m__Map.p_Get2(t_section);
		err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<59>";
		if(!t_subMap.p_Contains(t_key)){
			err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<59>";
			pop_err();
			return t_defaultValue;
		}
		err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<60>";
		var t_=t_subMap.p_Get2(t_key);
		pop_err();
		return t_;
	}
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<63>";
	pop_err();
	return t_defaultValue;
}
c_Ini.m_LoadFromFile=function(t_fileName,t_quoteUsage){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<148>";
	var t_=c_Ini.m_Load(bb_app_LoadString(t_fileName),t_quoteUsage);
	pop_err();
	return t_;
}
c_Ini.prototype.p_GetAsFile=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<124>";
	var t_section="";
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<125>";
	var t_subMap=null;
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<126>";
	var t_key="";
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<127>";
	var t_data="";
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<129>";
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<129>";
	var t_=this.m__Map.p_Keys().p_ObjectEnumerator();
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<129>";
	while(t_.p_HasNext()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<129>";
		t_section=t_.p_NextObject();
		err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<130>";
		t_subMap=this.m__Map.p_Get2(t_section);
		err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<132>";
		if(!t_subMap.p_IsEmpty()){
			err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<133>";
			t_data=t_data+("["+t_section+"]\n");
			err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<135>";
			err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<135>";
			var t_2=t_subMap.p_Keys().p_ObjectEnumerator();
			err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<135>";
			while(t_2.p_HasNext()){
				err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<135>";
				t_key=t_2.p_NextObject();
				err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<136>";
				if(this.m__UsingQuotes){
					err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<137>";
					t_data=t_data+(t_key+"=\""+t_subMap.p_Get2(t_key)+"\"\n");
				}else{
					err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<139>";
					t_data=t_data+(t_key+"="+t_subMap.p_Get2(t_key)+"\n");
				}
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<145>";
	pop_err();
	return t_data;
}
c_Ini.prototype.p_SaveToState=function(t_quoteUsage){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<154>";
	bb_app_SaveState(this.p_GetAsFile());
	pop_err();
	return 0;
}
c_Ini.prototype.p_GetSections=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<214>";
	var t_index=0;
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<215>";
	var t_sections=new_string_array(this.m__Map.p_Count());
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<217>";
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<217>";
	var t_=this.m__Map.p_Keys().p_ObjectEnumerator();
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<217>";
	while(t_.p_HasNext()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<217>";
		var t_section=t_.p_NextObject();
		err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<218>";
		dbg_array(t_sections,t_index)[dbg_index]=t_section
		err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<219>";
		t_index+=1;
	}
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<222>";
	pop_err();
	return t_sections;
}
c_Ini.prototype.p_GetBool=function(t_key,t_section,t_defaultValue){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<79>";
	var t_value=this.p_Get(t_key,t_section,"");
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<80>";
	if(t_value.toLowerCase()=="true"){
		err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<81>";
		pop_err();
		return true;
	}else{
		err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<82>";
		if(t_value.toLowerCase()=="false"){
			err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<83>";
			pop_err();
			return false;
		}else{
			err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<84>";
			if(t_value!=""){
				err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<85>";
				var t_=((parseInt((t_value),10))!=0);
				pop_err();
				return t_;
			}else{
				err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<87>";
				pop_err();
				return t_defaultValue;
			}
		}
	}
}
c_Ini.prototype.p_GetInt=function(t_key,t_section,t_defaultValue){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<67>";
	var t_value=this.p_Get(t_key,t_section,"");
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<68>";
	if(t_value!=""){
		err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<68>";
		var t_=parseInt((t_value),10);
		pop_err();
		return t_;
	}
	err_info="/Applications/MonkeyX77a/modules/lazeng/inihandler.monkey<69>";
	pop_err();
	return t_defaultValue;
}
function bb_app_LoadState(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<139>";
	var t_=bb_app__game.LoadState();
	pop_err();
	return t_;
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map.prototype.p_RotateLeft=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map.prototype.p_RotateRight=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map.prototype.p_InsertFixup=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<223>";
					this.p_RotateLeft(t_node);
				}
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<227>";
				this.p_RotateRight(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<239>";
					this.p_RotateRight(t_node);
				}
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<243>";
				this.p_RotateLeft(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map.prototype.p_Set2=function(t_key,t_value){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<45>";
	t_node=c_Node2.m_new.call(new c_Node2,t_key,t_value,-1,t_parent);
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<53>";
		this.p_InsertFixup(t_node);
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map.prototype.p_FindNode=function(t_key){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map.prototype.p_Contains=function(t_key){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<25>";
	var t_=this.p_FindNode(t_key)!=null;
	pop_err();
	return t_;
}
c_Map.prototype.p_Get2=function(t_key){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode(t_key);
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return "";
}
c_Map.prototype.p_IsEmpty=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<21>";
	var t_=this.m_root==null;
	pop_err();
	return t_;
}
c_Map.prototype.p_Keys=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<113>";
	var t_=c_MapKeys2.m_new.call(new c_MapKeys2,this);
	pop_err();
	return t_;
}
c_Map.prototype.p_FirstNode=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<137>";
	if(!((this.m_root)!=null)){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<137>";
		pop_err();
		return null;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<139>";
	var t_node=this.m_root;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<140>";
	while((dbg_object(t_node).m_left)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<141>";
		t_node=dbg_object(t_node).m_left;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<143>";
	pop_err();
	return t_node;
}
function c_StringMap(){
	c_Map.call(this);
}
c_StringMap.prototype=extend_class(c_Map);
c_StringMap.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<551>";
	c_Map.m_new.call(this);
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
c_StringMap.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Map2(){
	Object.call(this);
	this.m_root=null;
}
c_Map2.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map2.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map2.prototype.p_FindNode=function(t_key){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map2.prototype.p_Contains=function(t_key){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<25>";
	var t_=this.p_FindNode(t_key)!=null;
	pop_err();
	return t_;
}
c_Map2.prototype.p_RotateLeft2=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map2.prototype.p_RotateRight2=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map2.prototype.p_InsertFixup2=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<223>";
					this.p_RotateLeft2(t_node);
				}
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<227>";
				this.p_RotateRight2(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<239>";
					this.p_RotateRight2(t_node);
				}
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<243>";
				this.p_RotateLeft2(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map2.prototype.p_Set3=function(t_key,t_value){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<45>";
	t_node=c_Node.m_new.call(new c_Node,t_key,t_value,-1,t_parent);
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<53>";
		this.p_InsertFixup2(t_node);
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map2.prototype.p_Get2=function(t_key){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode(t_key);
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
c_Map2.prototype.p_Keys=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<113>";
	var t_=c_MapKeys.m_new.call(new c_MapKeys,this);
	pop_err();
	return t_;
}
c_Map2.prototype.p_FirstNode=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<137>";
	if(!((this.m_root)!=null)){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<137>";
		pop_err();
		return null;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<139>";
	var t_node=this.m_root;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<140>";
	while((dbg_object(t_node).m_left)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<141>";
		t_node=dbg_object(t_node).m_left;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<143>";
	pop_err();
	return t_node;
}
c_Map2.prototype.p_Count=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<17>";
	if((this.m_root)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<17>";
		var t_=this.m_root.p_Count2(0);
		pop_err();
		return t_;
	}
	pop_err();
	return 0;
}
function c_StringMap2(){
	c_Map2.call(this);
}
c_StringMap2.prototype=extend_class(c_Map2);
c_StringMap2.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<551>";
	c_Map2.m_new.call(this);
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
c_StringMap2.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Node(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
c_Node.prototype.p_NextNode=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<385>";
	var t_node=null;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<386>";
	if((this.m_right)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<387>";
		t_node=this.m_right;
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<388>";
		while((dbg_object(t_node).m_left)!=null){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<389>";
			t_node=dbg_object(t_node).m_left;
		}
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<391>";
		pop_err();
		return t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<393>";
	t_node=this;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<394>";
	var t_parent=dbg_object(this).m_parent;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<395>";
	while(((t_parent)!=null) && t_node==dbg_object(t_parent).m_right){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<396>";
		t_node=t_parent;
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<397>";
		t_parent=dbg_object(t_parent).m_parent;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<399>";
	pop_err();
	return t_parent;
}
c_Node.prototype.p_Count2=function(t_n){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<371>";
	if((this.m_left)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<371>";
		t_n=this.m_left.p_Count2(t_n);
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<372>";
	if((this.m_right)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<372>";
		t_n=this.m_right.p_Count2(t_n);
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<373>";
	var t_=t_n+1;
	pop_err();
	return t_;
}
function c_Node2(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value="";
	this.m_color=0;
	this.m_parent=null;
}
c_Node2.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node2.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
c_Node2.prototype.p_NextNode=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<385>";
	var t_node=null;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<386>";
	if((this.m_right)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<387>";
		t_node=this.m_right;
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<388>";
		while((dbg_object(t_node).m_left)!=null){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<389>";
			t_node=dbg_object(t_node).m_left;
		}
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<391>";
		pop_err();
		return t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<393>";
	t_node=this;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<394>";
	var t_parent=dbg_object(this).m_parent;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<395>";
	while(((t_parent)!=null) && t_node==dbg_object(t_parent).m_right){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<396>";
		t_node=t_parent;
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<397>";
		t_parent=dbg_object(t_parent).m_parent;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<399>";
	pop_err();
	return t_parent;
}
function bb_app_LoadString(t_path){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<147>";
	var t_=bb_app__game.LoadString(bb_data_FixDataPath(t_path));
	pop_err();
	return t_;
}
function c_MapKeys(){
	Object.call(this);
	this.m_map=null;
}
c_MapKeys.m_new=function(t_map){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<503>";
	dbg_object(this).m_map=t_map;
	pop_err();
	return this;
}
c_MapKeys.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<500>";
	pop_err();
	return this;
}
c_MapKeys.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<507>";
	var t_=c_KeyEnumerator.m_new.call(new c_KeyEnumerator,this.m_map.p_FirstNode());
	pop_err();
	return t_;
}
function c_KeyEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_KeyEnumerator.m_new=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<459>";
	dbg_object(this).m_node=t_node;
	pop_err();
	return this;
}
c_KeyEnumerator.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<456>";
	pop_err();
	return this;
}
c_KeyEnumerator.prototype.p_HasNext=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<463>";
	var t_=this.m_node!=null;
	pop_err();
	return t_;
}
c_KeyEnumerator.prototype.p_NextObject=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<467>";
	var t_t=this.m_node;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<468>";
	this.m_node=this.m_node.p_NextNode();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<469>";
	pop_err();
	return dbg_object(t_t).m_key;
}
function c_MapKeys2(){
	Object.call(this);
	this.m_map=null;
}
c_MapKeys2.m_new=function(t_map){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<503>";
	dbg_object(this).m_map=t_map;
	pop_err();
	return this;
}
c_MapKeys2.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<500>";
	pop_err();
	return this;
}
c_MapKeys2.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<507>";
	var t_=c_KeyEnumerator2.m_new.call(new c_KeyEnumerator2,this.m_map.p_FirstNode());
	pop_err();
	return t_;
}
function c_KeyEnumerator2(){
	Object.call(this);
	this.m_node=null;
}
c_KeyEnumerator2.m_new=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<459>";
	dbg_object(this).m_node=t_node;
	pop_err();
	return this;
}
c_KeyEnumerator2.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<456>";
	pop_err();
	return this;
}
c_KeyEnumerator2.prototype.p_HasNext=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<463>";
	var t_=this.m_node!=null;
	pop_err();
	return t_;
}
c_KeyEnumerator2.prototype.p_NextObject=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<467>";
	var t_t=this.m_node;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<468>";
	this.m_node=this.m_node.p_NextNode();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<469>";
	pop_err();
	return dbg_object(t_t).m_key;
}
function bb_app_SaveState(t_state){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<143>";
	var t_=bb_app__game.SaveState(t_state);
	pop_err();
	return t_;
}
var bb_app__updateRate=0;
function bb_app_SetUpdateRate(t_hertz){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<151>";
	bb_app__updateRate=t_hertz;
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<152>";
	bb_app__game.SetUpdateRate(t_hertz);
	pop_err();
	return 0;
}
var bb_random_Seed=0;
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
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<266>";
	this.m_vwidth=(t_width);
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<267>";
	this.m_vheight=(t_height);
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<269>";
	this.m_vzoom=t_zoom;
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<270>";
	this.m_lastvzoom=this.m_vzoom+1.0;
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<274>";
	this.m_vratio=this.m_vheight/this.m_vwidth;
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<278>";
	c_VirtualDisplay.m_Display=this;
	pop_err();
	return this;
}
c_VirtualDisplay.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<216>";
	pop_err();
	return this;
}
c_VirtualDisplay.prototype.p_VMouseX=function(t_limit){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<302>";
	var t_mouseoffset=bb_input_MouseX()-(bb_graphics_DeviceWidth())*0.5;
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<306>";
	var t_x=t_mouseoffset/this.m_multi/this.m_vzoom+bb_autofit_VDeviceWidth()*0.5;
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<310>";
	if(t_limit){
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<312>";
		var t_widthlimit=this.m_vwidth-1.0;
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<314>";
		if(t_x>0.0){
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<315>";
			if(t_x<t_widthlimit){
				err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<316>";
				pop_err();
				return t_x;
			}else{
				err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<318>";
				pop_err();
				return t_widthlimit;
			}
		}else{
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<321>";
			pop_err();
			return 0.0;
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<325>";
		pop_err();
		return t_x;
	}
}
c_VirtualDisplay.prototype.p_VMouseY=function(t_limit){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<336>";
	var t_mouseoffset=bb_input_MouseY()-(bb_graphics_DeviceHeight())*0.5;
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<340>";
	var t_y=t_mouseoffset/this.m_multi/this.m_vzoom+bb_autofit_VDeviceHeight()*0.5;
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<344>";
	if(t_limit){
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<346>";
		var t_heightlimit=this.m_vheight-1.0;
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<348>";
		if(t_y>0.0){
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<349>";
			if(t_y<t_heightlimit){
				err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<350>";
				pop_err();
				return t_y;
			}else{
				err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<352>";
				pop_err();
				return t_heightlimit;
			}
		}else{
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<355>";
			pop_err();
			return 0.0;
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<359>";
		pop_err();
		return t_y;
	}
}
c_VirtualDisplay.prototype.p_UpdateVirtualDisplay=function(t_zoomborders,t_keepborders){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<444>";
	if(bb_graphics_DeviceWidth()!=this.m_lastdevicewidth || bb_graphics_DeviceHeight()!=this.m_lastdeviceheight){
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<445>";
		this.m_lastdevicewidth=bb_graphics_DeviceWidth();
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<446>";
		this.m_lastdeviceheight=bb_graphics_DeviceHeight();
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<447>";
		this.m_device_changed=1;
	}
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<454>";
	if((this.m_device_changed)!=0){
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<459>";
		this.m_fdw=(bb_graphics_DeviceWidth());
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<460>";
		this.m_fdh=(bb_graphics_DeviceHeight());
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<465>";
		this.m_dratio=this.m_fdh/this.m_fdw;
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<469>";
		if(this.m_dratio>this.m_vratio){
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<478>";
			this.m_multi=this.m_fdw/this.m_vwidth;
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<482>";
			this.m_heightborder=(this.m_fdh-this.m_vheight*this.m_multi)*0.5;
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<483>";
			this.m_widthborder=0.0;
		}else{
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<494>";
			this.m_multi=this.m_fdh/this.m_vheight;
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<498>";
			this.m_widthborder=(this.m_fdw-this.m_vwidth*this.m_multi)*0.5;
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<499>";
			this.m_heightborder=0.0;
		}
	}
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<509>";
	if(this.m_vzoom!=this.m_lastvzoom){
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<510>";
		this.m_lastvzoom=this.m_vzoom;
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<511>";
		this.m_zoom_changed=1;
	}
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<518>";
	if(((this.m_zoom_changed)!=0) || ((this.m_device_changed)!=0)){
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<520>";
		if(t_zoomborders){
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<524>";
			this.m_realx=this.m_vwidth*this.m_vzoom*this.m_multi;
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<525>";
			this.m_realy=this.m_vheight*this.m_vzoom*this.m_multi;
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<529>";
			this.m_offx=(this.m_fdw-this.m_realx)*0.5;
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<530>";
			this.m_offy=(this.m_fdh-this.m_realy)*0.5;
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<532>";
			if(t_keepborders){
				err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<538>";
				if(this.m_offx<this.m_widthborder){
					err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<539>";
					this.m_sx=this.m_widthborder;
					err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<540>";
					this.m_sw=this.m_fdw-this.m_widthborder*2.0;
				}else{
					err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<542>";
					this.m_sx=this.m_offx;
					err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<543>";
					this.m_sw=this.m_fdw-this.m_offx*2.0;
				}
				err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<546>";
				if(this.m_offy<this.m_heightborder){
					err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<547>";
					this.m_sy=this.m_heightborder;
					err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<548>";
					this.m_sh=this.m_fdh-this.m_heightborder*2.0;
				}else{
					err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<550>";
					this.m_sy=this.m_offy;
					err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<551>";
					this.m_sh=this.m_fdh-this.m_offy*2.0;
				}
			}else{
				err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<556>";
				this.m_sx=this.m_offx;
				err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<557>";
				this.m_sw=this.m_fdw-this.m_offx*2.0;
				err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<559>";
				this.m_sy=this.m_offy;
				err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<560>";
				this.m_sh=this.m_fdh-this.m_offy*2.0;
			}
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<566>";
			this.m_sx=bb_math_Max2(0.0,this.m_sx);
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<567>";
			this.m_sy=bb_math_Max2(0.0,this.m_sy);
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<568>";
			this.m_sw=bb_math_Min2(this.m_sw,this.m_fdw);
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<569>";
			this.m_sh=bb_math_Min2(this.m_sh,this.m_fdh);
		}else{
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<575>";
			this.m_sx=bb_math_Max2(0.0,this.m_widthborder);
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<576>";
			this.m_sy=bb_math_Max2(0.0,this.m_heightborder);
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<577>";
			this.m_sw=bb_math_Min2(this.m_fdw-this.m_widthborder*2.0,this.m_fdw);
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<578>";
			this.m_sh=bb_math_Min2(this.m_fdh-this.m_heightborder*2.0,this.m_fdh);
		}
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<584>";
		this.m_scaledw=this.m_vwidth*this.m_multi*this.m_vzoom;
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<585>";
		this.m_scaledh=this.m_vheight*this.m_multi*this.m_vzoom;
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<589>";
		this.m_vxoff=(this.m_fdw-this.m_scaledw)*0.5;
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<590>";
		this.m_vyoff=(this.m_fdh-this.m_scaledh)*0.5;
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<594>";
		this.m_vxoff=this.m_vxoff/this.m_multi/this.m_vzoom;
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<595>";
		this.m_vyoff=this.m_vyoff/this.m_multi/this.m_vzoom;
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<599>";
		this.m_device_changed=0;
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<600>";
		this.m_zoom_changed=0;
	}
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<608>";
	bb_graphics_SetScissor(0.0,0.0,(bb_graphics_DeviceWidth()),(bb_graphics_DeviceHeight()));
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<609>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<615>";
	bb_graphics_SetScissor(this.m_sx,this.m_sy,this.m_sw,this.m_sh);
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<621>";
	bb_graphics_Scale(this.m_multi*this.m_vzoom,this.m_multi*this.m_vzoom);
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<627>";
	if((this.m_vzoom)!=0.0){
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<627>";
		bb_graphics_Translate(this.m_vxoff,this.m_vyoff);
	}
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<629>";
	pop_err();
	return 0;
}
function bb_autofit_SetVirtualDisplay(t_width,t_height,t_zoom){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<110>";
	c_VirtualDisplay.m_new.call(new c_VirtualDisplay,t_width,t_height,t_zoom);
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<111>";
	pop_err();
	return 0;
}
function c_AssetManager(){
	Object.call(this);
	this.m_images=null;
}
c_AssetManager.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/assetmanager.monkey<8>";
	dbg_object(this).m_images=c_StringMap3.m_new.call(new c_StringMap3);
	pop_err();
	return this;
}
c_AssetManager.prototype.p_loadImage=function(t__path,t__numFrames){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/assetmanager.monkey<15>";
	var t__img=bb_graphics_LoadImage(t__path,t__numFrames,1);
	err_info="/Applications/MonkeyX77a/modules/lazeng/assetmanager.monkey<16>";
	dbg_object(this).m_images.p_Set4(t__path,t__img);
	pop_err();
	return 0;
}
c_AssetManager.prototype.p_getImage=function(t__path){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/assetmanager.monkey<20>";
	var t_=dbg_object(this).m_images.p_Get2(t__path);
	pop_err();
	return t_;
}
function c_Map3(){
	Object.call(this);
	this.m_root=null;
}
c_Map3.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map3.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map3.prototype.p_RotateLeft3=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map3.prototype.p_RotateRight3=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map3.prototype.p_InsertFixup3=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<223>";
					this.p_RotateLeft3(t_node);
				}
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<227>";
				this.p_RotateRight3(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<239>";
					this.p_RotateRight3(t_node);
				}
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<243>";
				this.p_RotateLeft3(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map3.prototype.p_Set4=function(t_key,t_value){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<45>";
	t_node=c_Node3.m_new.call(new c_Node3,t_key,t_value,-1,t_parent);
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<53>";
		this.p_InsertFixup3(t_node);
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map3.prototype.p_FindNode=function(t_key){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map3.prototype.p_Get2=function(t_key){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode(t_key);
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
function c_StringMap3(){
	c_Map3.call(this);
}
c_StringMap3.prototype=extend_class(c_Map3);
c_StringMap3.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<551>";
	c_Map3.m_new.call(this);
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
c_StringMap3.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
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
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node3.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
function bb_roguetype_LoadAllImages(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<207>";
	var t__am=dbg_object(c_RogueType.m_Data).m_assetManager;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<208>";
	t__am.p_loadImage("sprPlayer.png",3);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<209>";
	t__am.p_loadImage("sprEnemy1L1.png",1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<210>";
	t__am.p_loadImage("sprEnemySpawnL1.png",1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<211>";
	t__am.p_loadImage("sprEnemyCircleL1.png",1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<212>";
	t__am.p_loadImage("sprEnemyTurretL1.png",1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<213>";
	t__am.p_loadImage("sprPowerupBomb.png",1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<214>";
	t__am.p_loadImage("sprPowerupBoomerang.png",1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<215>";
	t__am.p_loadImage("sprPowerupGeneric.png",2);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<216>";
	t__am.p_loadImage("sprPowerupHomingMissile.png",1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<217>";
	t__am.p_loadImage("sprPowerupRing.png",1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<218>";
	t__am.p_loadImage("sprPowerupSpeedUp.png",1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<219>";
	t__am.p_loadImage("sprPowerupSpeedDown.png",1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<220>";
	t__am.p_loadImage("sprPowerupTailShot.png",1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<221>";
	t__am.p_loadImage("sprPowerupSpiral.png",1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<222>";
	t__am.p_loadImage("sprProjBomb.png",1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<223>";
	t__am.p_loadImage("sprProjBombExplode.png",2);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<224>";
	t__am.p_loadImage("sprProjRing.png",6);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<225>";
	t__am.p_loadImage("sprProjStock.png",10);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<226>";
	t__am.p_loadImage("sprProjHomingMissile.png",1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<227>";
	t__am.p_loadImage("sprProjTailShot.png",10);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<228>";
	t__am.p_loadImage("sprProjSpiral.png",4);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<229>";
	t__am.p_loadImage("sprWall0.png",1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<230>";
	t__am.p_loadImage("sprFinishLine.png",1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/roguetype.monkey<231>";
	t__am.p_loadImage("sprMenuButton.png",4);
	pop_err();
	return 0;
}
function c_PowerupEntry(){
	Object.call(this);
	this.m_name="";
	this.m_descriptionLong="";
	this.m_popupText="";
	this.m_spritePath="";
	this.m_currentValue=0;
	this.m_remembered=false;
	this.m_encounteredThisRun=false;
	this.m_permanentValue=0;
}
c_PowerupEntry.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<47>";
	dbg_object(this).m_name="haha butts I dunno";
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<48>";
	dbg_object(this).m_descriptionLong="This powerup does something. I'll be damned if I know what that something is. Ask me later. Or don't.";
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<49>";
	dbg_object(this).m_popupText="Something witty David should have entered.";
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<50>";
	dbg_object(this).m_spritePath="sprPowerupGeneric.png";
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<51>";
	dbg_object(this).m_currentValue=0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<52>";
	dbg_object(this).m_remembered=true;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<53>";
	dbg_object(this).m_encounteredThisRun=false;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<54>";
	dbg_object(this).m_permanentValue=0;
	pop_err();
	return this;
}
function c_Map4(){
	Object.call(this);
	this.m_root=null;
}
c_Map4.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map4.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map4.prototype.p_RotateLeft4=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map4.prototype.p_RotateRight4=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map4.prototype.p_InsertFixup4=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<223>";
					this.p_RotateLeft4(t_node);
				}
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<227>";
				this.p_RotateRight4(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<239>";
					this.p_RotateRight4(t_node);
				}
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<243>";
				this.p_RotateLeft4(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map4.prototype.p_Set5=function(t_key,t_value){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<45>";
	t_node=c_Node4.m_new.call(new c_Node4,t_key,t_value,-1,t_parent);
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<53>";
		this.p_InsertFixup4(t_node);
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map4.prototype.p_FirstNode=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<137>";
	if(!((this.m_root)!=null)){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<137>";
		pop_err();
		return null;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<139>";
	var t_node=this.m_root;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<140>";
	while((dbg_object(t_node).m_left)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<141>";
		t_node=dbg_object(t_node).m_left;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<143>";
	pop_err();
	return t_node;
}
c_Map4.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<121>";
	var t_=c_NodeEnumerator.m_new.call(new c_NodeEnumerator,this.p_FirstNode());
	pop_err();
	return t_;
}
c_Map4.prototype.p_Count=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<17>";
	if((this.m_root)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<17>";
		var t_=this.m_root.p_Count2(0);
		pop_err();
		return t_;
	}
	pop_err();
	return 0;
}
c_Map4.prototype.p_Keys=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<113>";
	var t_=c_MapKeys3.m_new.call(new c_MapKeys3,this);
	pop_err();
	return t_;
}
c_Map4.prototype.p_FindNode=function(t_key){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map4.prototype.p_Get2=function(t_key){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode(t_key);
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
function c_StringMap4(){
	c_Map4.call(this);
}
c_StringMap4.prototype=extend_class(c_Map4);
c_StringMap4.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<551>";
	c_Map4.m_new.call(this);
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
c_StringMap4.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Node4(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node4.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node4.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
c_Node4.prototype.p_NextNode=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<385>";
	var t_node=null;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<386>";
	if((this.m_right)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<387>";
		t_node=this.m_right;
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<388>";
		while((dbg_object(t_node).m_left)!=null){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<389>";
			t_node=dbg_object(t_node).m_left;
		}
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<391>";
		pop_err();
		return t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<393>";
	t_node=this;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<394>";
	var t_parent=dbg_object(this).m_parent;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<395>";
	while(((t_parent)!=null) && t_node==dbg_object(t_parent).m_right){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<396>";
		t_node=t_parent;
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<397>";
		t_parent=dbg_object(t_parent).m_parent;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<399>";
	pop_err();
	return t_parent;
}
c_Node4.prototype.p_Key=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<377>";
	pop_err();
	return this.m_key;
}
c_Node4.prototype.p_Value=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<381>";
	pop_err();
	return this.m_value;
}
c_Node4.prototype.p_Count2=function(t_n){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<371>";
	if((this.m_left)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<371>";
		t_n=this.m_left.p_Count2(t_n);
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<372>";
	if((this.m_right)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<372>";
		t_n=this.m_right.p_Count2(t_n);
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<373>";
	var t_=t_n+1;
	pop_err();
	return t_;
}
function bb_powerup_initPowerupData(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<95>";
	var t__dataMap=c_StringMap4.m_new.call(new c_StringMap4);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<96>";
	var t_powerupIni=c_Ini.m_LoadFromFile("monkey://data/roguetypePowerups.txt",true);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<97>";
	var t_sects=t_powerupIni.p_GetSections();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<99>";
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<99>";
	var t_=t_sects;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<99>";
	var t_2=0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<99>";
	while(t_2<t_.length){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<99>";
		var t_sect=dbg_array(t_,t_2)[dbg_index];
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<99>";
		t_2=t_2+1;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<100>";
		var t_temp=c_PowerupEntry.m_new.call(new c_PowerupEntry);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<101>";
		dbg_object(t_temp).m_name=t_sect;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<102>";
		dbg_object(t_temp).m_descriptionLong=t_powerupIni.p_Get("descriptionLong",t_sect,"");
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<103>";
		dbg_object(t_temp).m_popupText=t_powerupIni.p_Get("popupText",t_sect,"");
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<104>";
		dbg_object(t_temp).m_spritePath=t_powerupIni.p_Get("spritePath",t_sect,"");
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<109>";
		t__dataMap.p_Set5(t_sect,t_temp);
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<113>";
	pop_err();
	return t__dataMap;
}
function c_NodeEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_NodeEnumerator.m_new=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<437>";
	dbg_object(this).m_node=t_node;
	pop_err();
	return this;
}
c_NodeEnumerator.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<434>";
	pop_err();
	return this;
}
c_NodeEnumerator.prototype.p_HasNext=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<441>";
	var t_=this.m_node!=null;
	pop_err();
	return t_;
}
c_NodeEnumerator.prototype.p_NextObject=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<445>";
	var t_t=this.m_node;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<446>";
	this.m_node=this.m_node.p_NextNode();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<447>";
	pop_err();
	return t_t;
}
function c_Lazo(){
	Object.call(this);
	this.m_timer=new_number_array(10);
}
c_Lazo.prototype.p_initTimers=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/lazo.monkey<12>";
	for(var t_idx=0;t_idx<dbg_object(this).m_timer.length;t_idx=t_idx+1){
		err_info="/Applications/MonkeyX77a/modules/lazeng/lazo.monkey<13>";
		dbg_array(dbg_object(this).m_timer,t_idx)[dbg_index]=-1
	}
	pop_err();
	return 0;
}
c_Lazo.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/lazo.monkey<8>";
	this.p_initTimers();
	pop_err();
	return this;
}
c_Lazo.prototype.p_setTimer=function(t_whichTimer,t_howManyUpdates){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/lazo.monkey<17>";
	dbg_array(dbg_object(this).m_timer,t_whichTimer)[dbg_index]=t_howManyUpdates
	pop_err();
	return 0;
}
c_Lazo.prototype.p_timerAction=function(t_whichTimer){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/lazo.monkey<36>";
	var t_1=t_whichTimer;
	err_info="/Applications/MonkeyX77a/modules/lazeng/lazo.monkey<37>";
	if(t_1==0){
	}
	pop_err();
	return 0;
}
c_Lazo.prototype.p_incrementTimers=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/lazo.monkey<20>";
	for(var t_idx=0;t_idx<dbg_object(this).m_timer.length;t_idx=t_idx+1){
		err_info="/Applications/MonkeyX77a/modules/lazeng/lazo.monkey<21>";
		if(dbg_array(dbg_object(this).m_timer,t_idx)[dbg_index]>-1){
			err_info="/Applications/MonkeyX77a/modules/lazeng/lazo.monkey<22>";
			if(dbg_array(dbg_object(this).m_timer,t_idx)[dbg_index]==0){
				err_info="/Applications/MonkeyX77a/modules/lazeng/lazo.monkey<23>";
				this.p_timerAction(t_idx);
			}
			err_info="/Applications/MonkeyX77a/modules/lazeng/lazo.monkey<25>";
			dbg_array(dbg_object(this).m_timer,t_idx)[dbg_index]=dbg_array(dbg_object(this).m_timer,t_idx)[dbg_index]-1
		}
	}
	pop_err();
	return 0;
}
c_Lazo.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/lazo.monkey<31>";
	this.p_incrementTimers();
	pop_err();
	return 0;
}
function c_Controller(){
	c_Lazo.call(this);
	this.m_playerNo=0;
	this.m_direction=-1;
	this.m_input=new_number_array(10);
	this.m_justPressed=new_number_array(10);
	this.m_justReleased=new_number_array(10);
	this.m_directionIsPressed=false;
}
c_Controller.prototype=extend_class(c_Lazo);
c_Controller.m_new=function(t_p){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<27>";
	c_Lazo.m_new.call(this);
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<29>";
	dbg_object(this).m_playerNo=t_p;
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<30>";
	dbg_object(this).m_direction=-1;
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<32>";
	for(var t_idx=0;t_idx<dbg_object(this).m_input.length;t_idx=t_idx+1){
		err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<33>";
		dbg_array(dbg_object(this).m_input,t_idx)[dbg_index]=0
	}
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<35>";
	for(var t_idx2=0;t_idx2<dbg_object(this).m_justPressed.length;t_idx2=t_idx2+1){
		err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<36>";
		dbg_array(dbg_object(this).m_justPressed,t_idx2)[dbg_index]=0
	}
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<38>";
	for(var t_idx3=0;t_idx3<dbg_object(this).m_justReleased.length;t_idx3=t_idx3+1){
		err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<39>";
		dbg_array(dbg_object(this).m_justReleased,t_idx3)[dbg_index]=0
	}
	pop_err();
	return this;
}
c_Controller.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<3>";
	c_Lazo.m_new.call(this);
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<3>";
	pop_err();
	return this;
}
c_Controller.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<45>";
	var t_current=new_bool_array(10);
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<46>";
	for(var t_idx=0;t_idx<10;t_idx=t_idx+1){
		err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<47>";
		dbg_array(t_current,t_idx)[dbg_index]=false
	}
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<49>";
	var t_p=dbg_object(this).m_playerNo;
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<50>";
	dbg_array(t_current,0)[dbg_index]=((bb_input_JoyDown(8,t_p))!=0) || ((bb_input_KeyDown(37))!=0) || ((bb_input_KeyDown(65))!=0)
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<51>";
	dbg_array(t_current,1)[dbg_index]=((bb_input_JoyDown(9,t_p))!=0) || ((bb_input_KeyDown(38))!=0) || ((bb_input_KeyDown(87))!=0)
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<52>";
	dbg_array(t_current,2)[dbg_index]=((bb_input_JoyDown(10,t_p))!=0) || ((bb_input_KeyDown(39))!=0) || ((bb_input_KeyDown(68))!=0)
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<53>";
	dbg_array(t_current,3)[dbg_index]=((bb_input_JoyDown(11,t_p))!=0) || ((bb_input_KeyDown(40))!=0) || ((bb_input_KeyDown(83))!=0)
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<55>";
	dbg_array(t_current,4)[dbg_index]=((bb_input_JoyDown(0,t_p))!=0) || ((bb_input_KeyDown(32))!=0)
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<56>";
	dbg_array(t_current,5)[dbg_index]=((bb_input_JoyDown(2,t_p))!=0) || ((bb_input_KeyDown(90))!=0) || ((bb_input_KeyDown(75))!=0)
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<57>";
	dbg_array(t_current,6)[dbg_index]=((bb_input_JoyDown(3,t_p))!=0) || ((bb_input_KeyDown(88))!=0) || ((bb_input_KeyDown(76))!=0)
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<58>";
	dbg_array(t_current,7)[dbg_index]=((bb_input_JoyDown(1,t_p))!=0) || ((bb_input_KeyDown(67))!=0) || ((bb_input_KeyDown(186))!=0)
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<60>";
	dbg_array(t_current,8)[dbg_index]=((bb_input_JoyDown(7,0))!=0) || ((bb_input_KeyDown(13))!=0)
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<62>";
	for(var t_idx2=0;t_idx2<10;t_idx2=t_idx2+1){
		err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<63>";
		if(((dbg_array(dbg_object(this).m_input,t_idx2)[dbg_index])!=0) && !dbg_array(t_current,t_idx2)[dbg_index]){
			err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<64>";
			dbg_array(dbg_object(this).m_justReleased,t_idx2)[dbg_index]=1
		}
		err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<66>";
		if(dbg_array(t_current,t_idx2)[dbg_index] && !((dbg_array(dbg_object(this).m_input,t_idx2)[dbg_index])!=0)){
			err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<67>";
			dbg_array(dbg_object(this).m_justPressed,t_idx2)[dbg_index]=1
		}
		err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<69>";
		dbg_array(dbg_object(this).m_input,t_idx2)[dbg_index]=((dbg_array(t_current,t_idx2)[dbg_index])?1:0)
	}
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<72>";
	var t_R=dbg_array(dbg_object(this).m_input,2)[dbg_index];
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<73>";
	var t_L=dbg_array(dbg_object(this).m_input,0)[dbg_index];
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<74>";
	var t_U=dbg_array(dbg_object(this).m_input,1)[dbg_index];
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<75>";
	var t_D=dbg_array(dbg_object(this).m_input,3)[dbg_index];
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<77>";
	var t_numDirs=t_R+t_L+t_U+t_D;
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<79>";
	if(t_numDirs<3 && t_numDirs>0){
		err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<80>";
		var t_dir=t_R*1+t_U*10+t_L*100+t_D*1000;
		err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<81>";
		var t_1=t_dir;
		err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<82>";
		if(t_1==1){
			err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<83>";
			dbg_object(this).m_direction=0;
		}else{
			err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<84>";
			if(t_1==11){
				err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<85>";
				dbg_object(this).m_direction=45;
			}else{
				err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<86>";
				if(t_1==10){
					err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<87>";
					dbg_object(this).m_direction=90;
				}else{
					err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<88>";
					if(t_1==110){
						err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<89>";
						dbg_object(this).m_direction=135;
					}else{
						err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<90>";
						if(t_1==100){
							err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<91>";
							dbg_object(this).m_direction=180;
						}else{
							err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<92>";
							if(t_1==1100){
								err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<93>";
								dbg_object(this).m_direction=225;
							}else{
								err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<94>";
								if(t_1==1000){
									err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<95>";
									dbg_object(this).m_direction=270;
								}else{
									err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<96>";
									if(t_1==1001){
										err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<97>";
										dbg_object(this).m_direction=315;
									}else{
										err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<99>";
										dbg_object(this).m_direction=-1;
									}
								}
							}
						}
					}
				}
			}
		}
		err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<101>";
		dbg_object(this).m_directionIsPressed=true;
	}else{
		err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<103>";
		if(t_numDirs>=3){
			err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<104>";
			dbg_object(this).m_directionIsPressed=true;
		}else{
			err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<106>";
			dbg_object(this).m_direction=-1;
			err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<107>";
			dbg_object(this).m_directionIsPressed=false;
		}
	}
	pop_err();
	return 0;
}
function c_Tangible(){
	c_Lazo.call(this);
	this.m_pos=null;
	this.m_vel=null;
	this.m_sprite=null;
}
c_Tangible.prototype=extend_class(c_Lazo);
c_Tangible.m_new=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/tangible.monkey<19>";
	c_Lazo.m_new.call(this);
	err_info="/Applications/MonkeyX77a/modules/lazeng/tangible.monkey<20>";
	dbg_object(this).m_pos=c_Vector.m_new.call(new c_Vector,t_x,t_y);
	err_info="/Applications/MonkeyX77a/modules/lazeng/tangible.monkey<21>";
	dbg_object(this).m_vel=c_Velocity.m_new.call(new c_Velocity,0.0,0.0);
	pop_err();
	return this;
}
c_Tangible.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/tangible.monkey<9>";
	c_Lazo.m_new.call(this);
	err_info="/Applications/MonkeyX77a/modules/lazeng/tangible.monkey<9>";
	pop_err();
	return this;
}
c_Tangible.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/tangible.monkey<44>";
	dbg_object(this).m_pos.p_x(dbg_object(this).m_pos.p_x2()+dbg_object(this).m_vel.p_x2());
	err_info="/Applications/MonkeyX77a/modules/lazeng/tangible.monkey<45>";
	dbg_object(this).m_pos.p_y(dbg_object(this).m_pos.p_y2()+dbg_object(this).m_vel.p_y2());
	err_info="/Applications/MonkeyX77a/modules/lazeng/tangible.monkey<47>";
	c_Lazo.prototype.p_update.call(this);
	pop_err();
	return 0;
}
c_Tangible.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/tangible.monkey<38>";
	dbg_object(this).m_sprite.p_drawAt(dbg_object(this).m_pos.p_x2(),dbg_object(this).m_pos.p_y2());
	pop_err();
	return 0;
}
function c_Collideable(){
	c_Tangible.call(this);
}
c_Collideable.prototype=extend_class(c_Tangible);
c_Collideable.m_new=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/collideable.monkey<11>";
	c_Tangible.m_new.call(this,t_x,t_y);
	pop_err();
	return this;
}
c_Collideable.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/collideable.monkey<7>";
	c_Tangible.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/modules/lazeng/collideable.monkey<7>";
	pop_err();
	return this;
}
c_Collideable.prototype.p_cMask=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/collideable.monkey<28>";
	var t_=dbg_object(dbg_object(this).m_sprite).m_bounds.p_center2(dbg_object(this).m_pos);
	pop_err();
	return t_;
}
c_Collideable.prototype.p_collidesWith=function(t_other){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/collideable.monkey<32>";
	var t_=this.p_cMask().p_intersects(t_other.p_cMask());
	pop_err();
	return t_;
}
c_Collideable.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/collideable.monkey<41>";
	c_Tangible.prototype.p_draw.call(this);
	pop_err();
	return 0;
}
function c_Killable(){
	c_Collideable.call(this);
	this.m_maxHP=1000000.0;
	this.m__HP=2.0;
	this.m_isDead=false;
}
c_Killable.prototype=extend_class(c_Collideable);
c_Killable.m_new=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killable.monkey<9>";
	c_Collideable.m_new.call(this,t_x,t_y);
	pop_err();
	return this;
}
c_Killable.prototype.p_HP=function(t_hp){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killable.monkey<36>";
	if(t_hp<=dbg_object(this).m_maxHP){
		err_info="/Applications/MonkeyX77a/modules/lazeng/killable.monkey<37>";
		this.m__HP=t_hp;
	}else{
		err_info="/Applications/MonkeyX77a/modules/lazeng/killable.monkey<39>";
		this.m__HP=dbg_object(this).m_maxHP;
	}
	pop_err();
	return 0;
}
c_Killable.prototype.p_HP2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killable.monkey<43>";
	pop_err();
	return this.m__HP;
}
c_Killable.m_new2=function(t_x,t_y,t_hp){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killable.monkey<12>";
	c_Collideable.m_new.call(this,t_x,t_y);
	err_info="/Applications/MonkeyX77a/modules/lazeng/killable.monkey<13>";
	dbg_object(this).m_maxHP=t_hp;
	err_info="/Applications/MonkeyX77a/modules/lazeng/killable.monkey<14>";
	this.p_HP(t_hp);
	pop_err();
	return this;
}
c_Killable.m_new3=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killable.monkey<3>";
	c_Collideable.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/modules/lazeng/killable.monkey<3>";
	pop_err();
	return this;
}
c_Killable.prototype.p_kill=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killable.monkey<26>";
	dbg_object(this).m_isDead=true;
	pop_err();
	return 0;
}
c_Killable.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killable.monkey<17>";
	if(!dbg_object(this).m_isDead){
		err_info="/Applications/MonkeyX77a/modules/lazeng/killable.monkey<18>";
		c_Tangible.prototype.p_update.call(this);
		err_info="/Applications/MonkeyX77a/modules/lazeng/killable.monkey<19>";
		if(this.p_HP2()<=0.0){
			err_info="/Applications/MonkeyX77a/modules/lazeng/killable.monkey<20>";
			this.p_kill();
		}
	}
	pop_err();
	return 0;
}
c_Killable.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killable.monkey<30>";
	if(!dbg_object(this).m_isDead){
		err_info="/Applications/MonkeyX77a/modules/lazeng/killable.monkey<31>";
		c_Collideable.prototype.p_draw.call(this);
	}
	pop_err();
	return 0;
}
function c_Ship(){
	c_Killable.call(this);
}
c_Ship.prototype=extend_class(c_Killable);
c_Ship.m_new=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<10>";
	c_Killable.m_new.call(this,t_x,t_y);
	pop_err();
	return this;
}
c_Ship.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<7>";
	c_Killable.m_new3.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<7>";
	pop_err();
	return this;
}
c_Ship.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<13>";
	c_Killable.prototype.p_update.call(this);
	pop_err();
	return 0;
}
c_Ship.prototype.p_collidedWithAmbiguousProjectile=function(t_other){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<30>";
	this.p_HP(this.p_HP2()-(dbg_object(t_other).m_strength));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<31>";
	t_other.p_HP(t_other.p_HP2()-1.0);
	pop_err();
	return 0;
}
c_Ship.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<24>";
	c_Killable.prototype.p_draw.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<25>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<26>";
	bb_graphics_DrawText(String(this.p_HP2()),dbg_object(this).m_pos.p_x2(),dbg_object(this).m_pos.p_y2(),0.0,0.0);
	pop_err();
	return 0;
}
c_Ship.prototype.p_kill=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<17>";
	c_Killable.prototype.p_kill.call(this);
	pop_err();
	return 0;
}
function c_EnemyShip(){
	c_Ship.call(this);
	this.m_points=1;
}
c_EnemyShip.prototype=extend_class(c_Ship);
c_EnemyShip.m_new=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<43>";
	c_Ship.m_new.call(this,t_x,t_y);
	pop_err();
	return this;
}
c_EnemyShip.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<38>";
	c_Ship.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<38>";
	pop_err();
	return this;
}
c_EnemyShip.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<64>";
	c_Ship.prototype.p_update.call(this);
	pop_err();
	return 0;
}
c_EnemyShip.prototype.p_collidedWithFriendlyProjectile=function(t_other){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<47>";
	this.p_HP(this.p_HP2()-(dbg_object(t_other).m_strength));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<48>";
	t_other.p_HP(t_other.p_HP2()-1.0);
	pop_err();
	return 0;
}
c_EnemyShip.prototype.p_collidedWithScenery=function(t_other){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<51>";
	this.p_HP(-1.1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<52>";
	t_other.p_HP(t_other.p_HP2()/2.0);
	pop_err();
	return 0;
}
c_EnemyShip.prototype.p_kill=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<55>";
	if(this.p_HP2() % 1.0==0.0){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<56>";
		dbg_object(c_RogueType.m_Data).m_levelScore=dbg_object(c_RogueType.m_Data).m_levelScore+dbg_object(this).m_points;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<58>";
		dbg_object(c_RogueType.m_Data).m_popupManager.p_add3(c_PopupText.m_new.call(new c_PopupText,dbg_object(this).m_pos.p_x2(),dbg_object(this).m_pos.p_y2(),String(dbg_object(c_RogueType.m_Data).m_levelScore),60));
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<61>";
	c_Ship.prototype.p_kill.call(this);
	pop_err();
	return 0;
}
function c_KillableManager(){
	Object.call(this);
	this.m_items=null;
}
c_KillableManager.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<7>";
	dbg_object(this).m_items=c_Stack.m_new.call(new c_Stack);
	pop_err();
	return this;
}
c_KillableManager.prototype.p_add=function(t_item){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<35>";
	dbg_object(this).m_items.p_Push(t_item);
	pop_err();
	return 0;
}
c_KillableManager.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<11>";
	if(!dbg_object(this).m_items.p_IsEmpty()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<12>";
		for(var t_idx=0;t_idx<dbg_object(this).m_items.p_Length2();t_idx=t_idx+1){
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<13>";
			dbg_object(this).m_items.p_Get3(t_idx).p_update();
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<14>";
			if(dbg_object(dbg_object(this).m_items.p_Get3(t_idx)).m_isDead){
				err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<15>";
				dbg_object(this).m_items.p_Remove(t_idx);
			}
		}
	}
	pop_err();
	return 0;
}
c_KillableManager.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<23>";
	if(!dbg_object(this).m_items.p_IsEmpty()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		var t_=dbg_object(this).m_items.p_ObjectEnumerator();
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		while(t_.p_HasNext()){
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
			var t_item=t_.p_NextObject();
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<26>";
			t_item.p_draw();
		}
	}
	pop_err();
	return 0;
}
function c_Stack(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack.m_new2=function(t_data){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack.prototype.p_Push=function(t_value){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack.prototype.p_Push2=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<80>";
		this.p_Push(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack.prototype.p_Push3=function(t_values,t_offset){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<75>";
	this.p_Push2(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack.prototype.p_IsEmpty=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<56>";
	var t_=this.m_length==0;
	pop_err();
	return t_;
}
c_Stack.m_NIL=null;
c_Stack.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack.m_NIL
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack.prototype.p_Length2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
c_Stack.prototype.p_Get3=function(t_index){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<100>";
	pop_err();
	return dbg_array(this.m_data,t_index)[dbg_index];
}
c_Stack.prototype.p_Remove=function(t_index){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<133>";
	for(var t_i=t_index;t_i<this.m_length-1;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<134>";
		dbg_array(this.m_data,t_i)[dbg_index]=dbg_array(this.m_data,t_i+1)[dbg_index]
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<136>";
	this.m_length-=1;
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<137>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=c_Stack.m_NIL
	pop_err();
}
c_Stack.prototype.p_Clear=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<34>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<35>";
		dbg_array(this.m_data,t_i)[dbg_index]=c_Stack.m_NIL
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<37>";
	this.m_length=0;
	pop_err();
}
c_Stack.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<184>";
	var t_=c_Enumerator3.m_new.call(new c_Enumerator3,this);
	pop_err();
	return t_;
}
function c_Rect(){
	Object.call(this);
	this.m__TL=null;
	this.m__BR=null;
}
c_Rect.m_new=function(t_Vector1,t_Vector2){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<12>";
	this.m__TL=c_Vector.m_new.call(new c_Vector,0.0,0.0);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<13>";
	this.m__BR=c_Vector.m_new.call(new c_Vector,0.0,0.0);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<14>";
	if(t_Vector1.p_x2()<t_Vector2.p_x2()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<15>";
		this.m__TL.p_x(t_Vector1.p_x2());
		err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<16>";
		this.m__BR.p_x(t_Vector2.p_x2());
	}else{
		err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<18>";
		this.m__TL.p_x(t_Vector2.p_x2());
		err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<19>";
		this.m__BR.p_x(t_Vector1.p_x2());
	}
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<21>";
	if(t_Vector1.p_y2()<t_Vector2.p_y2()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<22>";
		this.m__TL.p_y(t_Vector1.p_y2());
		err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<23>";
		this.m__BR.p_y(t_Vector2.p_y2());
	}else{
		err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<25>";
		this.m__TL.p_y(t_Vector2.p_y2());
		err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<26>";
		this.m__BR.p_y(t_Vector1.p_y2());
	}
	pop_err();
	return this;
}
c_Rect.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<4>";
	pop_err();
	return this;
}
c_Rect.prototype.p_TL=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<30>";
	this.m__TL.p_x(t_x);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<31>";
	this.m__TL.p_y(t_y);
	pop_err();
	return 0;
}
c_Rect.prototype.p_TL2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<34>";
	pop_err();
	return this.m__TL;
}
c_Rect.prototype.p_left=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<143>";
	var t_=this.p_TL2().p_x2();
	pop_err();
	return t_;
}
c_Rect.prototype.p_left2=function(t__in){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<146>";
	this.m__TL.p_x(t__in);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<147>";
	pop_err();
	return this;
}
c_Rect.prototype.p_top=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<157>";
	var t_=this.p_TL2().p_y2();
	pop_err();
	return t_;
}
c_Rect.prototype.p_top2=function(t__in){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<160>";
	this.m__TL.p_y(t__in);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<161>";
	pop_err();
	return this;
}
c_Rect.prototype.p_width=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<57>";
	var t_=bb_math_Abs2(this.m__TL.p_x2()-this.m__BR.p_x2());
	pop_err();
	return t_;
}
c_Rect.prototype.p_BR=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<37>";
	this.m__BR.p_x(t_x);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<38>";
	this.m__BR.p_y(t_y);
	pop_err();
	return 0;
}
c_Rect.prototype.p_BR2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<41>";
	pop_err();
	return this.m__BR;
}
c_Rect.prototype.p_center=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<61>";
	var t_center=c_Vector.m_new.call(new c_Vector,0.0,0.0);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<62>";
	t_center.p_x((this.p_BR2().p_x2()+this.p_TL2().p_x2())/2.0);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<63>";
	t_center.p_y((this.p_BR2().p_y2()+this.p_TL2().p_y2())/2.0);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<64>";
	pop_err();
	return t_center;
}
c_Rect.prototype.p_height=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<53>";
	var t_=bb_math_Abs2(this.m__TL.p_y2()-this.m__BR.p_y2());
	pop_err();
	return t_;
}
c_Rect.prototype.p_center2=function(t_cent){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<68>";
	var t_w=this.p_width();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<69>";
	var t_h=this.p_height();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<71>";
	this.m__TL.p_x(t_cent.p_x2()-t_w/2.0);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<72>";
	this.m__TL.p_y(t_cent.p_y2()-t_h/2.0);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<73>";
	this.m__BR.p_x(t_cent.p_x2()+t_w/2.0);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<74>";
	this.m__BR.p_y(t_cent.p_y2()+t_h/2.0);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<76>";
	pop_err();
	return this;
}
c_Rect.prototype.p_right=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<150>";
	var t_=this.p_BR2().p_x2();
	pop_err();
	return t_;
}
c_Rect.prototype.p_right2=function(t__in){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<153>";
	this.m__BR.p_x(t__in);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<154>";
	pop_err();
	return this;
}
c_Rect.prototype.p_translateX=function(t_xDiff){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<80>";
	this.m__TL.p_x(this.m__TL.p_x2()+t_xDiff);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<81>";
	this.m__BR.p_x(this.m__BR.p_x2()+t_xDiff);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<82>";
	pop_err();
	return this;
}
c_Rect.prototype.p_translateY=function(t_yDiff){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<85>";
	this.m__TL.p_y(this.m__TL.p_y2()+t_yDiff);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<86>";
	this.m__BR.p_y(this.m__BR.p_y2()+t_yDiff);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<87>";
	pop_err();
	return this;
}
c_Rect.prototype.p_containsPoint=function(t_point){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<111>";
	var t__answer=false;
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<112>";
	if(this.p_TL2().p_x2()<t_point.p_x2()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<113>";
		if(this.p_TL2().p_y2()<t_point.p_y2()){
			err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<114>";
			if(this.p_BR2().p_x2()>t_point.p_x2()){
				err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<115>";
				if(this.p_BR2().p_y2()>t_point.p_y2()){
					err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<116>";
					t__answer=true;
				}
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<121>";
	pop_err();
	return t__answer;
}
c_Rect.prototype.p_bottom=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<164>";
	var t_=this.p_BR2().p_y2();
	pop_err();
	return t_;
}
c_Rect.prototype.p_bottom2=function(t__in){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<167>";
	this.m__BR.p_y(t__in);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<168>";
	pop_err();
	return this;
}
c_Rect.prototype.p_TR=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<44>";
	var t_tr=c_Vector.m_new.call(new c_Vector,this.p_BR2().p_x2(),this.p_TL2().p_y2());
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<45>";
	pop_err();
	return t_tr;
}
c_Rect.prototype.p_BL=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<48>";
	var t_bl=c_Vector.m_new.call(new c_Vector,this.p_TL2().p_x2(),this.p_BR2().p_y2());
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<49>";
	pop_err();
	return t_bl;
}
c_Rect.prototype.p_intersects=function(t_other){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<124>";
	var t_does=false;
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<126>";
	if(this.p_TR().p_x2()>=t_other.p_TL2().p_x2()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<128>";
		if(this.p_TL2().p_x2()<=t_other.p_TR().p_x2()){
			err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<130>";
			if(this.p_TL2().p_y2()<=t_other.p_BL().p_y2()){
				err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<132>";
				if(this.p_BL().p_y2()>=t_other.p_TL2().p_y2()){
					err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<134>";
					t_does=true;
				}
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<139>";
	pop_err();
	return t_does;
}
function c_Camera(){
	c_Rect.call(this);
	this.m_vel=null;
}
c_Camera.prototype=extend_class(c_Rect);
c_Camera.m_new=function(t__v1,t__v2){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/camera.monkey<11>";
	c_Rect.m_new.call(this,t__v1,t__v2);
	err_info="/Applications/MonkeyX77a/modules/lazeng/camera.monkey<13>";
	dbg_object(this).m_vel=c_Velocity.m_new.call(new c_Velocity,0.0,0.0);
	pop_err();
	return this;
}
c_Camera.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/camera.monkey<7>";
	c_Rect.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/modules/lazeng/camera.monkey<7>";
	pop_err();
	return this;
}
c_Camera.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/camera.monkey<17>";
	this.p_translateX(dbg_object(this).m_vel.p_x2());
	err_info="/Applications/MonkeyX77a/modules/lazeng/camera.monkey<18>";
	this.p_translateY(dbg_object(this).m_vel.p_y2());
	pop_err();
	return 0;
}
c_Camera.prototype.p_contains=function(t_t){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/camera.monkey<32>";
	var t_=((this.p_containsPoint(dbg_object(t_t).m_pos))?1:0);
	pop_err();
	return t_;
}
c_Camera.prototype.p_drawStart=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/camera.monkey<22>";
	bb_graphics_PushMatrix();
	err_info="/Applications/MonkeyX77a/modules/lazeng/camera.monkey<24>";
	bb_graphics_Translate(-this.p_TL2().p_x2(),-this.p_TL2().p_y2());
	pop_err();
	return 0;
}
c_Camera.prototype.p_drawEnd=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/camera.monkey<28>";
	bb_graphics_PopMatrix();
	pop_err();
	return 0;
}
function c_Vector(){
	Object.call(this);
	this.m__x=.0;
	this.m__y=.0;
}
c_Vector.prototype.p_x=function(t_xIn){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<120>";
	this.m__x=t_xIn;
	pop_err();
	return 0;
}
c_Vector.prototype.p_x2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<124>";
	pop_err();
	return this.m__x;
}
c_Vector.prototype.p_y=function(t_yIn){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<128>";
	this.m__y=t_yIn;
	pop_err();
	return 0;
}
c_Vector.prototype.p_y2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<132>";
	pop_err();
	return this.m__y;
}
c_Vector.m_new=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<6>";
	this.p_x(t_x);
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<7>";
	this.p_y(t_y);
	pop_err();
	return this;
}
c_Vector.prototype.p_magnitude=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<57>";
	var t_=Math.sqrt(Math.pow(this.p_x2(),2.0)+Math.pow(this.p_y2(),2.0));
	pop_err();
	return t_;
}
c_Vector.prototype.p_angle=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<48>";
	var t_=(Math.atan2(this.p_y2(),this.p_x2())*R2D);
	pop_err();
	return t_;
}
c_Vector.prototype.p_set=function(t_Vector){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<10>";
	this.p_x(t_Vector.p_x2());
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<11>";
	this.p_y(t_Vector.p_y2());
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<12>";
	pop_err();
	return this;
}
c_Vector.prototype.p_set2=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<16>";
	this.p_x(t_x);
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<17>";
	this.p_y(t_y);
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<18>";
	pop_err();
	return this;
}
c_Vector.prototype.p_angle2=function(t_theta){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<52>";
	var t_mag=this.p_magnitude();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<53>";
	this.p_set2(t_mag*Math.cos((t_theta)*D2R),t_mag*Math.sin((t_theta)*D2R));
	pop_err();
	return 0;
}
c_Vector.prototype.p_magnitude2=function(t_mag){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<61>";
	var t_ang=this.p_angle();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<62>";
	this.p_x(Math.cos((t_ang)*D2R)*t_mag);
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<63>";
	this.p_y(Math.sin((t_ang)*D2R)*t_mag);
	pop_err();
	return 0;
}
c_Vector.prototype.p_distanceFromSq=function(t_other){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<44>";
	var t_=Math.pow(this.p_x2()-t_other.p_x2(),2.0)+Math.pow(this.p_y2()-t_other.p_y2(),2.0);
	pop_err();
	return t_;
}
function c_Velocity(){
	c_Vector.call(this);
	this.m__speed=.0;
	this.m__direction=.0;
}
c_Velocity.prototype=extend_class(c_Vector);
c_Velocity.prototype.p_x=function(t_xIn){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<13>";
	c_Vector.prototype.p_x.call(this,t_xIn);
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<14>";
	this.m__speed=this.p_magnitude();
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<15>";
	this.m__direction=this.p_angle();
	pop_err();
	return 0;
}
c_Velocity.prototype.p_x2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<18>";
	var t_=c_Vector.prototype.p_x2.call(this);
	pop_err();
	return t_;
}
c_Velocity.prototype.p_y=function(t_yIn){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<21>";
	c_Vector.prototype.p_y.call(this,t_yIn);
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<22>";
	this.m__speed=this.p_magnitude();
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<23>";
	this.m__direction=this.p_angle();
	pop_err();
	return 0;
}
c_Velocity.prototype.p_y2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<26>";
	var t_=c_Vector.prototype.p_y2.call(this);
	pop_err();
	return t_;
}
c_Velocity.m_new=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<7>";
	c_Vector.m_new.call(this,0.0,0.0);
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<9>";
	this.p_x(t_x);
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<10>";
	this.p_y(t_y);
	pop_err();
	return this;
}
c_Velocity.prototype.p_direction=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<46>";
	pop_err();
	return this.m__direction;
}
c_Velocity.prototype.p_speed=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<35>";
	pop_err();
	return this.m__speed;
}
c_Velocity.prototype.p_direction2=function(t_directionIn){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<40>";
	this.m__direction=t_directionIn % 360.0;
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<41>";
	this.m__x=Math.cos((this.p_direction())*D2R)*this.p_speed();
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<42>";
	this.m__y=-Math.sin((this.p_direction())*D2R)*this.p_speed();
	pop_err();
	return 0;
}
c_Velocity.prototype.p_speed2=function(t_speedIn){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<29>";
	this.m__speed=t_speedIn;
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<30>";
	this.m__x=Math.cos((this.p_direction())*D2R)*this.p_speed();
	err_info="/Applications/MonkeyX77a/modules/lazeng/velocity.monkey<31>";
	this.m__y=-Math.sin((this.p_direction())*D2R)*this.p_speed();
	pop_err();
	return 0;
}
function c_Projectile(){
	c_Killable.call(this);
	this.m_strength=0;
	this.m_modifier=.0;
}
c_Projectile.prototype=extend_class(c_Killable);
c_Projectile.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<16>";
	c_Killable.prototype.p_update.call(this);
	pop_err();
	return 0;
}
c_Projectile.m_new=function(t_x,t_y,t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<10>";
	c_Killable.m_new.call(this,t_x,t_y);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<11>";
	dbg_object(this).m_strength=1;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<12>";
	dbg_object(this).m_modifier=t__modifier;
	pop_err();
	return this;
}
c_Projectile.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<4>";
	c_Killable.m_new3.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<4>";
	pop_err();
	return this;
}
function c_KillableManager2(){
	Object.call(this);
	this.m_items=null;
}
c_KillableManager2.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<7>";
	dbg_object(this).m_items=c_Stack2.m_new.call(new c_Stack2);
	pop_err();
	return this;
}
c_KillableManager2.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<11>";
	if(!dbg_object(this).m_items.p_IsEmpty()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<12>";
		for(var t_idx=0;t_idx<dbg_object(this).m_items.p_Length2();t_idx=t_idx+1){
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<13>";
			dbg_object(this).m_items.p_Get3(t_idx).p_update();
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<14>";
			if(dbg_object(dbg_object(this).m_items.p_Get3(t_idx)).m_isDead){
				err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<15>";
				dbg_object(this).m_items.p_Remove(t_idx);
			}
		}
	}
	pop_err();
	return 0;
}
c_KillableManager2.prototype.p_add2=function(t_item){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<35>";
	dbg_object(this).m_items.p_Push4(t_item);
	pop_err();
	return 0;
}
c_KillableManager2.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<23>";
	if(!dbg_object(this).m_items.p_IsEmpty()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		var t_=dbg_object(this).m_items.p_ObjectEnumerator();
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		while(t_.p_HasNext()){
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
			var t_item=t_.p_NextObject();
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<26>";
			t_item.p_draw();
		}
	}
	pop_err();
	return 0;
}
function c_ProjectileManager(){
	c_KillableManager2.call(this);
}
c_ProjectileManager.prototype=extend_class(c_KillableManager2);
c_ProjectileManager.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<42>";
	c_KillableManager2.m_new.call(this);
	pop_err();
	return this;
}
c_ProjectileManager.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<46>";
	if(!dbg_object(this).m_items.p_IsEmpty()){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<47>";
		for(var t_idx=0;t_idx<dbg_object(this).m_items.p_Length2();t_idx=t_idx+1){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<48>";
			var t__currItem=dbg_object(this).m_items.p_Get3(t_idx);
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<49>";
			if(!((dbg_object(c_RogueType.m_Data).m_camera.p_contains(t__currItem))!=0)){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<50>";
				t__currItem.p_HP(-1.0);
			}
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<52>";
			t__currItem.p_update();
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<53>";
			if(dbg_object(t__currItem).m_isDead){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<54>";
				dbg_object(this).m_items.p_Remove(t_idx);
			}
		}
	}
	pop_err();
	return 0;
}
function c_Stack2(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack2.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack2.m_new2=function(t_data){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack2.prototype.p_IsEmpty=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<56>";
	var t_=this.m_length==0;
	pop_err();
	return t_;
}
c_Stack2.m_NIL=null;
c_Stack2.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack2.m_NIL
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack2.prototype.p_Length2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
c_Stack2.prototype.p_Get3=function(t_index){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<100>";
	pop_err();
	return dbg_array(this.m_data,t_index)[dbg_index];
}
c_Stack2.prototype.p_Remove=function(t_index){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<133>";
	for(var t_i=t_index;t_i<this.m_length-1;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<134>";
		dbg_array(this.m_data,t_i)[dbg_index]=dbg_array(this.m_data,t_i+1)[dbg_index]
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<136>";
	this.m_length-=1;
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<137>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=c_Stack2.m_NIL
	pop_err();
}
c_Stack2.prototype.p_Push4=function(t_value){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack2.prototype.p_Push5=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<80>";
		this.p_Push4(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack2.prototype.p_Push6=function(t_values,t_offset){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<75>";
	this.p_Push5(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack2.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<184>";
	var t_=c_Enumerator4.m_new.call(new c_Enumerator4,this);
	pop_err();
	return t_;
}
function c_PopupText(){
	c_Killable.call(this);
	this.m_text="";
}
c_PopupText.prototype=extend_class(c_Killable);
c_PopupText.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/popuptext.monkey<24>";
	bb_graphics_DrawText(dbg_object(this).m_text,dbg_object(this).m_pos.p_x2(),dbg_object(this).m_pos.p_y2(),.5,.5);
	pop_err();
	return 0;
}
c_PopupText.m_new=function(t_x,t_y,t_text,t_duration){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/popuptext.monkey<8>";
	c_Killable.m_new.call(this,t_x,t_y);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/popuptext.monkey<9>";
	dbg_object(this).m_text=t_text;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/popuptext.monkey<10>";
	this.p_setTimer(0,60);
	pop_err();
	return this;
}
c_PopupText.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/popuptext.monkey<3>";
	c_Killable.m_new3.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/popuptext.monkey<3>";
	pop_err();
	return this;
}
c_PopupText.prototype.p_kill=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/popuptext.monkey<21>";
	c_Killable.prototype.p_kill.call(this);
	pop_err();
	return 0;
}
c_PopupText.prototype.p_timerAction=function(t_whichTimer){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/popuptext.monkey<15>";
	var t_1=t_whichTimer;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/popuptext.monkey<16>";
	if(t_1==0){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/popuptext.monkey<17>";
		this.p_kill();
	}
	pop_err();
	return 0;
}
function c_KillableManager3(){
	Object.call(this);
	this.m_items=null;
}
c_KillableManager3.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<7>";
	dbg_object(this).m_items=c_Stack3.m_new.call(new c_Stack3);
	pop_err();
	return this;
}
c_KillableManager3.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<11>";
	if(!dbg_object(this).m_items.p_IsEmpty()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<12>";
		for(var t_idx=0;t_idx<dbg_object(this).m_items.p_Length2();t_idx=t_idx+1){
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<13>";
			dbg_object(this).m_items.p_Get3(t_idx).p_update();
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<14>";
			if(dbg_object(dbg_object(this).m_items.p_Get3(t_idx)).m_isDead){
				err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<15>";
				dbg_object(this).m_items.p_Remove(t_idx);
			}
		}
	}
	pop_err();
	return 0;
}
c_KillableManager3.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<23>";
	if(!dbg_object(this).m_items.p_IsEmpty()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		var t_=dbg_object(this).m_items.p_ObjectEnumerator();
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		while(t_.p_HasNext()){
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
			var t_item=t_.p_NextObject();
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<26>";
			t_item.p_draw();
		}
	}
	pop_err();
	return 0;
}
c_KillableManager3.prototype.p_add3=function(t_item){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<35>";
	dbg_object(this).m_items.p_Push7(t_item);
	pop_err();
	return 0;
}
function c_Stack3(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack3.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack3.m_new2=function(t_data){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack3.prototype.p_IsEmpty=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<56>";
	var t_=this.m_length==0;
	pop_err();
	return t_;
}
c_Stack3.m_NIL=null;
c_Stack3.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack3.m_NIL
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack3.prototype.p_Length2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
c_Stack3.prototype.p_Get3=function(t_index){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<100>";
	pop_err();
	return dbg_array(this.m_data,t_index)[dbg_index];
}
c_Stack3.prototype.p_Remove=function(t_index){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<133>";
	for(var t_i=t_index;t_i<this.m_length-1;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<134>";
		dbg_array(this.m_data,t_i)[dbg_index]=dbg_array(this.m_data,t_i+1)[dbg_index]
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<136>";
	this.m_length-=1;
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<137>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=c_Stack3.m_NIL
	pop_err();
}
c_Stack3.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<184>";
	var t_=c_Enumerator5.m_new.call(new c_Enumerator5,this);
	pop_err();
	return t_;
}
c_Stack3.prototype.p_Push7=function(t_value){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack3.prototype.p_Push8=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<80>";
		this.p_Push7(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack3.prototype.p_Push9=function(t_values,t_offset){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<75>";
	this.p_Push8(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
function c_Powerup(){
	c_Killable.call(this);
	this.m_name="";
	this.m_popupText="";
}
c_Powerup.prototype=extend_class(c_Killable);
c_Powerup.m_new=function(t_x,t_y,t__key){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<15>";
	c_Killable.m_new.call(this,t_x,t_y);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<16>";
	var t__puData=dbg_object(c_RogueType.m_Data).m_powerupInfo.p_Get2(t__key);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<17>";
	dbg_object(this).m_name=t__key;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<18>";
	dbg_object(this).m_popupText=dbg_object(t__puData).m_popupText;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<20>";
	if(dbg_object(t__puData).m_remembered){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<21>";
		dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage(dbg_object(t__puData).m_spritePath));
	}else{
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<23>";
		dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprPowerupGeneric.png"));
	}
	pop_err();
	return this;
}
c_Powerup.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<9>";
	c_Killable.m_new3.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<9>";
	pop_err();
	return this;
}
c_Powerup.prototype.p_kill=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<28>";
	dbg_object(c_RogueType.m_Data).m_popupManager.p_add3(c_PopupText.m_new.call(new c_PopupText,dbg_object(this).m_pos.p_x2(),dbg_object(this).m_pos.p_y2(),dbg_object(this).m_popupText,60));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<29>";
	c_Killable.prototype.p_kill.call(this);
	pop_err();
	return 0;
}
function c_KillableManager4(){
	Object.call(this);
	this.m_items=null;
}
c_KillableManager4.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<7>";
	dbg_object(this).m_items=c_Stack4.m_new.call(new c_Stack4);
	pop_err();
	return this;
}
c_KillableManager4.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<11>";
	if(!dbg_object(this).m_items.p_IsEmpty()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<12>";
		for(var t_idx=0;t_idx<dbg_object(this).m_items.p_Length2();t_idx=t_idx+1){
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<13>";
			dbg_object(this).m_items.p_Get3(t_idx).p_update();
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<14>";
			if(dbg_object(dbg_object(this).m_items.p_Get3(t_idx)).m_isDead){
				err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<15>";
				dbg_object(this).m_items.p_Remove(t_idx);
			}
		}
	}
	pop_err();
	return 0;
}
c_KillableManager4.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<23>";
	if(!dbg_object(this).m_items.p_IsEmpty()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		var t_=dbg_object(this).m_items.p_ObjectEnumerator();
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		while(t_.p_HasNext()){
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
			var t_item=t_.p_NextObject();
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<26>";
			t_item.p_draw();
		}
	}
	pop_err();
	return 0;
}
function c_PowerupManager(){
	c_KillableManager4.call(this);
}
c_PowerupManager.prototype=extend_class(c_KillableManager4);
c_PowerupManager.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<62>";
	c_KillableManager4.m_new.call(this);
	pop_err();
	return this;
}
c_PowerupManager.prototype.p_createNewWithKey=function(t_x,t_y,t__key){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<66>";
	var t_pu=c_Powerup.m_new.call(new c_Powerup,t_x,t_y,t__key);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<67>";
	dbg_object(this).m_items.p_Push10(t_pu);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<68>";
	pop_err();
	return t_pu;
}
c_PowerupManager.prototype.p_createNewRandom=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<72>";
	var t_idTemp=((Math.floor(bb_random_Rnd3(dbg_object(c_RogueType.m_Data).m_powerupInfo.p_Count())))|0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<73>";
	var t_key="butts";
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<74>";
	var t_allKeys=dbg_object(c_RogueType.m_Data).m_powerupInfo.p_Keys();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<75>";
	var t_counter=0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<77>";
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<77>";
	var t_=t_allKeys.p_ObjectEnumerator();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<77>";
	while(t_.p_HasNext()){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<77>";
		var t_thisKey=t_.p_NextObject();
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<79>";
		if(t_counter==t_idTemp){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<80>";
			t_key=t_thisKey;
		}
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<82>";
		t_counter=t_counter+1;
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<85>";
	this.p_createNewWithKey(t_x,t_y,t_key);
	pop_err();
	return null;
}
function c_Stack4(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack4.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack4.m_new2=function(t_data){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack4.prototype.p_Push10=function(t_value){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack4.prototype.p_Push11=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<80>";
		this.p_Push10(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack4.prototype.p_Push12=function(t_values,t_offset){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<75>";
	this.p_Push11(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack4.prototype.p_IsEmpty=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<56>";
	var t_=this.m_length==0;
	pop_err();
	return t_;
}
c_Stack4.m_NIL=null;
c_Stack4.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack4.m_NIL
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack4.prototype.p_Length2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
c_Stack4.prototype.p_Get3=function(t_index){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<100>";
	pop_err();
	return dbg_array(this.m_data,t_index)[dbg_index];
}
c_Stack4.prototype.p_Remove=function(t_index){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<133>";
	for(var t_i=t_index;t_i<this.m_length-1;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<134>";
		dbg_array(this.m_data,t_i)[dbg_index]=dbg_array(this.m_data,t_i+1)[dbg_index]
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<136>";
	this.m_length-=1;
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<137>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=c_Stack4.m_NIL
	pop_err();
}
c_Stack4.prototype.p_Clear=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<34>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<35>";
		dbg_array(this.m_data,t_i)[dbg_index]=c_Stack4.m_NIL
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<37>";
	this.m_length=0;
	pop_err();
}
c_Stack4.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<184>";
	var t_=c_Enumerator6.m_new.call(new c_Enumerator6,this);
	pop_err();
	return t_;
}
function c_Scenery(){
	c_Killable.call(this);
}
c_Scenery.prototype=extend_class(c_Killable);
c_Scenery.m_new=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/scenery.monkey<7>";
	c_Killable.m_new.call(this,t_x,t_y);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/scenery.monkey<8>";
	dbg_object(this).m_maxHP=20.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/scenery.monkey<9>";
	this.p_HP(20.0);
	pop_err();
	return this;
}
c_Scenery.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/scenery.monkey<4>";
	c_Killable.m_new3.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/scenery.monkey<4>";
	pop_err();
	return this;
}
c_Scenery.prototype.p_collidedWithFriendlyProjectile=function(t_other){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/scenery.monkey<12>";
	this.p_HP(this.p_HP2()-(dbg_object(t_other).m_strength));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/scenery.monkey<13>";
	t_other.p_HP(t_other.p_HP2()-1.0);
	pop_err();
	return 0;
}
c_Scenery.prototype.p_collidedWithAmbiguousProjectile=function(t_other){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/scenery.monkey<20>";
	this.p_HP(this.p_HP2()-(dbg_object(t_other).m_strength));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/scenery.monkey<21>";
	t_other.p_HP(t_other.p_HP2()-1.0);
	pop_err();
	return 0;
}
c_Scenery.prototype.p_collidedWithEnemyProjectile=function(t_other){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/scenery.monkey<16>";
	this.p_HP(this.p_HP2()-(dbg_object(t_other).m_strength));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/scenery.monkey<17>";
	t_other.p_HP(t_other.p_HP2()-1.0);
	pop_err();
	return 0;
}
function c_KillableManager5(){
	Object.call(this);
	this.m_items=null;
}
c_KillableManager5.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<7>";
	dbg_object(this).m_items=c_Stack5.m_new.call(new c_Stack5);
	pop_err();
	return this;
}
c_KillableManager5.prototype.p_add4=function(t_item){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<35>";
	dbg_object(this).m_items.p_Push13(t_item);
	pop_err();
	return 0;
}
c_KillableManager5.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<11>";
	if(!dbg_object(this).m_items.p_IsEmpty()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<12>";
		for(var t_idx=0;t_idx<dbg_object(this).m_items.p_Length2();t_idx=t_idx+1){
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<13>";
			dbg_object(this).m_items.p_Get3(t_idx).p_update();
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<14>";
			if(dbg_object(dbg_object(this).m_items.p_Get3(t_idx)).m_isDead){
				err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<15>";
				dbg_object(this).m_items.p_Remove(t_idx);
			}
		}
	}
	pop_err();
	return 0;
}
c_KillableManager5.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<23>";
	if(!dbg_object(this).m_items.p_IsEmpty()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		var t_=dbg_object(this).m_items.p_ObjectEnumerator();
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		while(t_.p_HasNext()){
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
			var t_item=t_.p_NextObject();
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<26>";
			t_item.p_draw();
		}
	}
	pop_err();
	return 0;
}
function c_Stack5(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack5.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack5.m_new2=function(t_data){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack5.prototype.p_Push13=function(t_value){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack5.prototype.p_Push14=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<80>";
		this.p_Push13(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack5.prototype.p_Push15=function(t_values,t_offset){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<75>";
	this.p_Push14(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack5.prototype.p_IsEmpty=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<56>";
	var t_=this.m_length==0;
	pop_err();
	return t_;
}
c_Stack5.m_NIL=null;
c_Stack5.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack5.m_NIL
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack5.prototype.p_Length2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
c_Stack5.prototype.p_Get3=function(t_index){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<100>";
	pop_err();
	return dbg_array(this.m_data,t_index)[dbg_index];
}
c_Stack5.prototype.p_Remove=function(t_index){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<133>";
	for(var t_i=t_index;t_i<this.m_length-1;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<134>";
		dbg_array(this.m_data,t_i)[dbg_index]=dbg_array(this.m_data,t_i+1)[dbg_index]
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<136>";
	this.m_length-=1;
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<137>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=c_Stack5.m_NIL
	pop_err();
}
c_Stack5.prototype.p_Clear=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<34>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<35>";
		dbg_array(this.m_data,t_i)[dbg_index]=c_Stack5.m_NIL
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<37>";
	this.m_length=0;
	pop_err();
}
c_Stack5.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<184>";
	var t_=c_Enumerator7.m_new.call(new c_Enumerator7,this);
	pop_err();
	return t_;
}
function c_FriendlyShip(){
	c_Ship.call(this);
}
c_FriendlyShip.prototype=extend_class(c_Ship);
c_FriendlyShip.m_new=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<72>";
	c_Ship.m_new.call(this,t_x,t_y);
	pop_err();
	return this;
}
c_FriendlyShip.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<69>";
	c_Ship.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<69>";
	pop_err();
	return this;
}
c_FriendlyShip.prototype.p_collidedWithEnemyShip=function(t_other){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<75>";
	this.p_HP(0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<76>";
	t_other.p_HP(0.0);
	pop_err();
	return 0;
}
c_FriendlyShip.prototype.p_collidedWithEnemyProjectile=function(t_other){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<79>";
	this.p_HP(this.p_HP2()-(dbg_object(t_other).m_strength));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<80>";
	t_other.p_HP(t_other.p_HP2()-1.0);
	pop_err();
	return 0;
}
c_FriendlyShip.prototype.p_collidedWithScenery=function(t_other){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<83>";
	this.p_HP(0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/ships.monkey<84>";
	t_other.p_HP(t_other.p_HP2()/2.0);
	pop_err();
	return 0;
}
function c_Player(){
	c_FriendlyShip.call(this);
	this.m_weapons=c_IntMap.m_new.call(new c_IntMap);
	this.m_moveSpeed=1.5;
	this.m_baseSpeed=1.5;
}
c_Player.prototype=extend_class(c_FriendlyShip);
c_Player.m_new=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<17>";
	c_FriendlyShip.m_new.call(this,t_x,t_y);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<18>";
	dbg_object(this).m_maxHP=2.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<19>";
	this.p_HP(2.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<21>";
	dbg_object(this).m_weapons.p_Set6(0,(c_WeapStock.m_new.call(new c_WeapStock,0)));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<22>";
	dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprPlayer.png"));
	pop_err();
	return this;
}
c_Player.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<10>";
	c_FriendlyShip.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<10>";
	pop_err();
	return this;
}
c_Player.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<39>";
	if(dbg_object(dbg_object(c_RogueType.m_Data).m_controller).m_direction==-1){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<40>";
		dbg_object(this).m_vel.p_x(dbg_object(dbg_object(c_RogueType.m_Data).m_camera).m_vel.p_x2());
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<41>";
		dbg_object(this).m_vel.p_y(dbg_object(dbg_object(c_RogueType.m_Data).m_camera).m_vel.p_y2());
	}else{
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<43>";
		dbg_object(this).m_vel.p_x(dbg_object(dbg_object(c_RogueType.m_Data).m_camera).m_vel.p_x2()+bb_math_Sgn2(bb_lazeng_Round(Math.cos((dbg_object(dbg_object(c_RogueType.m_Data).m_controller).m_direction)*D2R)))*dbg_object(this).m_moveSpeed);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<44>";
		dbg_object(this).m_vel.p_y(dbg_object(dbg_object(c_RogueType.m_Data).m_camera).m_vel.p_y2()+bb_math_Sgn2(-bb_lazeng_Round(Math.sin((dbg_object(dbg_object(c_RogueType.m_Data).m_controller).m_direction)*D2R)))*dbg_object(this).m_moveSpeed);
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<47>";
	if(dbg_object(this).m_pos.p_x2()-dbg_object(this).m_sprite.p_width()/2.0<=dbg_object(c_RogueType.m_Data).m_camera.p_left()+dbg_object(this).m_moveSpeed && (dbg_object(dbg_object(c_RogueType.m_Data).m_controller).m_direction<269 && dbg_object(dbg_object(c_RogueType.m_Data).m_controller).m_direction>91)){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<49>";
		dbg_object(this).m_vel.p_x(dbg_object(dbg_object(c_RogueType.m_Data).m_camera).m_vel.p_x2());
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<52>";
	if(dbg_object(this).m_pos.p_y2()-dbg_object(this).m_sprite.p_height()/2.0<=dbg_object(c_RogueType.m_Data).m_camera.p_top()+dbg_object(this).m_moveSpeed && (1<dbg_object(dbg_object(c_RogueType.m_Data).m_controller).m_direction && dbg_object(dbg_object(c_RogueType.m_Data).m_controller).m_direction<179)){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<54>";
		dbg_object(this).m_vel.p_y(dbg_object(dbg_object(c_RogueType.m_Data).m_camera).m_vel.p_y2());
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<57>";
	if(dbg_object(this).m_pos.p_x2()+dbg_object(this).m_sprite.p_width()/2.0>=dbg_object(c_RogueType.m_Data).m_camera.p_right()-dbg_object(this).m_moveSpeed && (0<=dbg_object(dbg_object(c_RogueType.m_Data).m_controller).m_direction && dbg_object(dbg_object(c_RogueType.m_Data).m_controller).m_direction<89 || 271<dbg_object(dbg_object(c_RogueType.m_Data).m_controller).m_direction && dbg_object(dbg_object(c_RogueType.m_Data).m_controller).m_direction<=360)){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<59>";
		dbg_object(this).m_vel.p_x(dbg_object(dbg_object(c_RogueType.m_Data).m_camera).m_vel.p_x2());
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<62>";
	if(dbg_object(this).m_pos.p_y2()+dbg_object(this).m_sprite.p_height()/2.0>=dbg_object(c_RogueType.m_Data).m_camera.p_bottom()-dbg_object(this).m_moveSpeed && (181<dbg_object(dbg_object(c_RogueType.m_Data).m_controller).m_direction && dbg_object(dbg_object(c_RogueType.m_Data).m_controller).m_direction<359)){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<64>";
		dbg_object(this).m_vel.p_y(dbg_object(dbg_object(c_RogueType.m_Data).m_camera).m_vel.p_y2());
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<67>";
	c_Ship.prototype.p_update.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<68>";
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<68>";
	var t_=dbg_object(this).m_weapons.p_ObjectEnumerator();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<68>";
	while(t_.p_HasNext()){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<68>";
		var t_w=t_.p_NextObject();
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<69>";
		t_w.p_Value().p_update();
	}
	pop_err();
	return 0;
}
c_Player.prototype.p_collidedWithPowerup=function(t__other){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<26>";
	var t__key=dbg_object(t__other).m_name;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<27>";
	var t__temp=dbg_object(c_RogueType.m_Data).m_powerupInfo.p_Get2(t__key);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<28>";
	dbg_object(t__temp).m_currentValue=dbg_object(t__temp).m_currentValue+1;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<29>";
	dbg_object(t__temp).m_encounteredThisRun=true;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<30>";
	dbg_object(c_RogueType.m_Data).m_powerupInfo.p_Set5(t__key,t__temp);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<32>";
	t__other.p_HP(0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<34>";
	bb_powerup_updatePowerup(t__key);
	pop_err();
	return 0;
}
c_Player.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<80>";
	c_Ship.prototype.p_draw.call(this);
	pop_err();
	return 0;
}
c_Player.prototype.p_kill=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<75>";
	dbg_object(c_RogueType.m_Data).m_upgradePoints=((Math.pow((dbg_object(c_RogueType.m_Data).m_lastCompletedLevel),2.0)+Math.floor((dbg_object(c_RogueType.m_Data).m_score/100)|0)*(dbg_object(c_RogueType.m_Data).m_lastCompletedLevel))|0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/player.monkey<76>";
	c_Ship.prototype.p_kill.call(this);
	pop_err();
	return 0;
}
function c_Weapon(){
	c_Lazo.call(this);
	this.m_modifier=0;
	this.m_fireDelay=0;
	this.m_isActive=false;
	this.m_locX=.0;
	this.m_locY=.0;
	this.m_fireKey=0;
	this.m_myProjectileManager=null;
	this.m_coolingDown=false;
}
c_Weapon.prototype=extend_class(c_Lazo);
c_Weapon.m_new=function(t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<21>";
	c_Lazo.m_new.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<22>";
	dbg_object(this).m_modifier=t__modifier;
	pop_err();
	return this;
}
c_Weapon.prototype.p_createProjectile=function(t_shotX,t_shotY){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<62>";
	var t_proj=c_Projectile.m_new.call(new c_Projectile,(t_shotX),(t_shotY),(dbg_object(this).m_modifier));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<63>";
	pop_err();
	return t_proj;
}
c_Weapon.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<32>";
	c_Lazo.prototype.p_update.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<33>";
	if(dbg_object(this).m_isActive){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<34>";
		if(!dbg_object(this).m_coolingDown){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<35>";
			if((dbg_array(dbg_object(dbg_object(c_RogueType.m_Data).m_controller).m_input,dbg_object(this).m_fireKey)[dbg_index])!=0){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<37>";
				var t_shotX=dbg_object(dbg_object(c_RogueType.m_Data).m_player).m_pos.p_x2()+dbg_object(this).m_locX;
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<38>";
				var t_shotY=dbg_object(dbg_object(c_RogueType.m_Data).m_player).m_pos.p_y2()+dbg_object(this).m_locY;
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<39>";
				var t_proj=this.p_createProjectile(((t_shotX)|0),((t_shotY)|0));
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<40>";
				dbg_object(t_proj).m_modifier=(dbg_object(this).m_modifier);
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<41>";
				this.m_myProjectileManager.p_add2(t_proj);
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<42>";
				dbg_object(this).m_coolingDown=true;
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<43>";
				this.p_setTimer(0,dbg_object(this).m_fireDelay);
			}
		}
	}
	pop_err();
	return 0;
}
c_Weapon.prototype.p_timerAction=function(t_whichTimer){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<26>";
	var t_1=t_whichTimer;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<27>";
	if(t_1==0){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapon.monkey<28>";
		dbg_object(this).m_coolingDown=false;
	}
	pop_err();
	return 0;
}
function c_WeapStock(){
	c_Weapon.call(this);
}
c_WeapStock.prototype=extend_class(c_Weapon);
c_WeapStock.m_new=function(t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<11>";
	c_Weapon.m_new.call(this,t__modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<12>";
	dbg_object(this).m_fireDelay=14;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<13>";
	dbg_object(this).m_isActive=true;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<14>";
	dbg_object(this).m_locX=32.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<15>";
	dbg_object(this).m_locY=0.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<16>";
	dbg_object(this).m_fireKey=4;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<17>";
	dbg_object(this).m_myProjectileManager=dbg_object(c_RogueType.m_Data).m_friendlyProjectileManager;
	pop_err();
	return this;
}
c_WeapStock.prototype.p_createProjectile=function(t_shotX,t_shotY){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<21>";
	var t_proj=c_ProjStock.m_new.call(new c_ProjStock,(t_shotX),(t_shotY),dbg_object(this).m_modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<22>";
	var t_=(t_proj);
	pop_err();
	return t_;
}
function c_Map5(){
	Object.call(this);
	this.m_root=null;
}
c_Map5.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map5.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map5.prototype.p_RotateLeft5=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map5.prototype.p_RotateRight5=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map5.prototype.p_InsertFixup5=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<223>";
					this.p_RotateLeft5(t_node);
				}
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<227>";
				this.p_RotateRight5(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<239>";
					this.p_RotateRight5(t_node);
				}
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<243>";
				this.p_RotateLeft5(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map5.prototype.p_Set6=function(t_key,t_value){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<45>";
	t_node=c_Node5.m_new.call(new c_Node5,t_key,t_value,-1,t_parent);
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<53>";
		this.p_InsertFixup5(t_node);
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map5.prototype.p_FirstNode=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<137>";
	if(!((this.m_root)!=null)){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<137>";
		pop_err();
		return null;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<139>";
	var t_node=this.m_root;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<140>";
	while((dbg_object(t_node).m_left)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<141>";
		t_node=dbg_object(t_node).m_left;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<143>";
	pop_err();
	return t_node;
}
c_Map5.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<121>";
	var t_=c_NodeEnumerator2.m_new.call(new c_NodeEnumerator2,this.p_FirstNode());
	pop_err();
	return t_;
}
function c_IntMap(){
	c_Map5.call(this);
}
c_IntMap.prototype=extend_class(c_Map5);
c_IntMap.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<534>";
	c_Map5.m_new.call(this);
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<534>";
	pop_err();
	return this;
}
c_IntMap.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<537>";
	var t_=t_lhs-t_rhs;
	pop_err();
	return t_;
}
function c_Node5(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node5.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node5.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
c_Node5.prototype.p_NextNode=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<385>";
	var t_node=null;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<386>";
	if((this.m_right)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<387>";
		t_node=this.m_right;
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<388>";
		while((dbg_object(t_node).m_left)!=null){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<389>";
			t_node=dbg_object(t_node).m_left;
		}
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<391>";
		pop_err();
		return t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<393>";
	t_node=this;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<394>";
	var t_parent=dbg_object(this).m_parent;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<395>";
	while(((t_parent)!=null) && t_node==dbg_object(t_parent).m_right){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<396>";
		t_node=t_parent;
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<397>";
		t_parent=dbg_object(t_parent).m_parent;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<399>";
	pop_err();
	return t_parent;
}
c_Node5.prototype.p_Value=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<381>";
	pop_err();
	return this.m_value;
}
function c_Sprite(){
	Object.call(this);
	this.m_image=null;
	this.m_numFrames=0;
	this.m__xScale=.0;
	this.m__yScale=.0;
	this.m_bounds=null;
	this.m_animations=null;
	this.m_currentAnimation=null;
	this.m_isVisible=true;
}
c_Sprite.prototype.p_xScale=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<50>";
	pop_err();
	return this.m__xScale;
}
c_Sprite.prototype.p_width=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<32>";
	var t_=(dbg_object(this).m_image.p_Width())*this.p_xScale();
	pop_err();
	return t_;
}
c_Sprite.prototype.p_yScale=function(t__sc){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<53>";
	this.m__yScale=t__sc;
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<54>";
	this.p_setBounds();
	pop_err();
	return 0;
}
c_Sprite.prototype.p_yScale2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<57>";
	pop_err();
	return this.m__yScale;
}
c_Sprite.prototype.p_height=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<35>";
	var t_=(dbg_object(this).m_image.p_Height())*this.p_yScale2();
	pop_err();
	return t_;
}
c_Sprite.prototype.p_setBounds=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<38>";
	var t_w=this.p_width();
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<39>";
	var t_h=this.p_height();
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<40>";
	var t_point1=c_Vector.m_new.call(new c_Vector,t_w/2.0,t_h/2.0);
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<41>";
	var t_point2=c_Vector.m_new.call(new c_Vector,-t_w/2.0,-t_h/2.0);
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<42>";
	dbg_object(this).m_bounds=c_Rect.m_new.call(new c_Rect,t_point1,t_point2);
	pop_err();
	return 0;
}
c_Sprite.prototype.p_xScale2=function(t__sc){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<46>";
	this.m__xScale=t__sc;
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<47>";
	this.p_setBounds();
	pop_err();
	return 0;
}
c_Sprite.prototype.p_addAnimation=function(t__anim){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<112>";
	dbg_object(this).m_animations.p_Set7(dbg_object(t__anim).m_name,t__anim);
	pop_err();
	return 0;
}
c_Sprite.prototype.p_newAnimation=function(t__name,t__startFrame,t__numFrames,t__fps){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<107>";
	var t__anim=c_Animation.m_new.call(new c_Animation,t__name,t__startFrame,t__numFrames,t__fps);
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<108>";
	this.p_addAnimation(t__anim);
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<109>";
	pop_err();
	return this;
}
c_Sprite.prototype.p_getAnimation=function(t__name){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<104>";
	var t_=dbg_object(this).m_animations.p_Get2(t__name);
	pop_err();
	return t_;
}
c_Sprite.prototype.p_setAnimation=function(t__name){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<96>";
	if(dbg_object(this).m_currentAnimation==null || t__name!=dbg_object(dbg_object(this).m_currentAnimation).m_name){
		err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<97>";
		dbg_object(this).m_currentAnimation=this.p_getAnimation(t__name);
		err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<99>";
		dbg_object(this).m_currentAnimation.p_reset();
	}
	pop_err();
	return 0;
}
c_Sprite.m_new=function(t__img){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<20>";
	dbg_object(this).m_image=t__img;
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<21>";
	dbg_object(this).m_numFrames=dbg_object(this).m_image.p_Frames();
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<22>";
	this.p_xScale2(1.0);
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<23>";
	this.p_yScale(1.0);
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<25>";
	dbg_object(this).m_animations=c_StringMap5.m_new.call(new c_StringMap5);
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<26>";
	this.p_newAnimation("allFrames",0,dbg_object(this).m_numFrames,2);
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<27>";
	this.p_setAnimation("allFrames");
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<28>";
	this.p_setBounds();
	pop_err();
	return this;
}
c_Sprite.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<6>";
	pop_err();
	return this;
}
c_Sprite.prototype.p_drawAt=function(t__x,t__y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<118>";
	if(dbg_object(this).m_isVisible){
		err_info="/Applications/MonkeyX77a/modules/lazeng/sprite.monkey<119>";
		bb_graphics_DrawImage2(dbg_object(this).m_image,t__x,t__y,0.0,this.p_xScale(),this.p_yScale2(),dbg_object(this).m_currentAnimation.p_currentFrame());
	}
	pop_err();
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
}
c_Animation.prototype.p_fps=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<25>";
	pop_err();
	return this.m__fps;
}
c_Animation.prototype.p_fps2=function(t_f){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<28>";
	this.m__fps=t_f;
	err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<29>";
	dbg_object(this).m_frameTime=((1000/this.p_fps())|0);
	pop_err();
	return 0;
}
c_Animation.m_new=function(t_name,t_startFrame,t_numFrames,t_fps){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<17>";
	dbg_object(this).m_name=t_name;
	err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<18>";
	dbg_object(this).m_startFrame=t_startFrame;
	err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<19>";
	dbg_object(this).m_numFrames=t_numFrames;
	err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<20>";
	this.p_fps2(t_fps);
	err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<21>";
	dbg_object(this).m_frameTime=((1000/t_fps)|0);
	pop_err();
	return this;
}
c_Animation.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<2>";
	pop_err();
	return this;
}
c_Animation.prototype.p_reset=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<40>";
	dbg_object(this).m_startTime=bb_app_Millisecs();
	pop_err();
	return 0;
}
c_Animation.prototype.p_currentFrame=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<32>";
	var t_=dbg_object(this).m_startFrame+(((bb_app_Millisecs()-dbg_object(this).m_startTime)/dbg_object(this).m_frameTime)|0) % dbg_object(this).m_numFrames;
	pop_err();
	return t_;
}
function c_Map6(){
	Object.call(this);
	this.m_root=null;
}
c_Map6.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map6.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map6.prototype.p_RotateLeft6=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map6.prototype.p_RotateRight6=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map6.prototype.p_InsertFixup6=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<223>";
					this.p_RotateLeft6(t_node);
				}
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<227>";
				this.p_RotateRight6(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<239>";
					this.p_RotateRight6(t_node);
				}
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<243>";
				this.p_RotateLeft6(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map6.prototype.p_Set7=function(t_key,t_value){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<45>";
	t_node=c_Node6.m_new.call(new c_Node6,t_key,t_value,-1,t_parent);
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<53>";
		this.p_InsertFixup6(t_node);
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map6.prototype.p_FindNode=function(t_key){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map6.prototype.p_Get2=function(t_key){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode(t_key);
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
function c_StringMap5(){
	c_Map6.call(this);
}
c_StringMap5.prototype=extend_class(c_Map6);
c_StringMap5.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<551>";
	c_Map6.m_new.call(this);
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
c_StringMap5.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
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
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node6.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
function bb_app_Millisecs(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<160>";
	var t_=bb_app__game.Millisecs();
	pop_err();
	return t_;
}
function c_CollisionManager(){
	Object.call(this);
}
c_CollisionManager.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_CollisionManager.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<21>";
	if(dbg_object(c_RogueType.m_Data).m_player!=null){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<22>";
		if(!dbg_object(dbg_object(c_RogueType.m_Data).m_currentLevel).m_isMenu){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<23>";
			if(dbg_object(c_RogueType.m_Data).m_player.p_collidesWith(dbg_object(dbg_object(c_RogueType.m_Data).m_currentLevel).m_finishLine)){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<24>";
				print("Collide,nugs");
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<25>";
				c_RogueType.m_Data.p_levelComplete();
			}
		}
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<28>";
		if(dbg_object(dbg_object(c_RogueType.m_Data).m_currentLevel).m_isMenu){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<29>";
			if(!dbg_object(dbg_object(dbg_object(c_RogueType.m_Data).m_currentLevel).m_menu).m_items.p_IsEmpty()){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<31>";
				for(var t_idx=0;t_idx<dbg_object(dbg_object(dbg_object(c_RogueType.m_Data).m_currentLevel).m_menu).m_items.p_Length2();t_idx=t_idx+1){
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<32>";
					var t_currItem=dbg_object(dbg_object(dbg_object(c_RogueType.m_Data).m_currentLevel).m_menu).m_items.p_Get3(t_idx);
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<41>";
					if(!dbg_object(dbg_object(c_RogueType.m_Data).m_friendlyProjectileManager).m_items.p_IsEmpty()){
						err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<42>";
						for(var t_kdx=0;t_kdx<dbg_object(dbg_object(c_RogueType.m_Data).m_friendlyProjectileManager).m_items.p_Length2();t_kdx=t_kdx+1){
							err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<43>";
							var t_nextItem=object_downcast((dbg_object(dbg_object(c_RogueType.m_Data).m_friendlyProjectileManager).m_items.p_Get3(t_kdx)),c_FriendlyProjectile);
							err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<45>";
							if(t_currItem.p_collidesWith(t_nextItem)){
								err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<47>";
								t_currItem.p_collidedWithFriendlyProjectile(t_nextItem);
							}
						}
					}
				}
			}
		}
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<55>";
		if(!dbg_object(dbg_object(c_RogueType.m_Data).m_shipManager).m_items.p_IsEmpty()){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<56>";
			for(var t_idx2=0;t_idx2<dbg_object(dbg_object(c_RogueType.m_Data).m_shipManager).m_items.p_Length2();t_idx2=t_idx2+1){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<57>";
				var t_currItem2=dbg_object(dbg_object(c_RogueType.m_Data).m_shipManager).m_items.p_Get3(t_idx2);
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<58>";
				if(dbg_object(c_RogueType.m_Data).m_player.p_collidesWith(t_currItem2)){
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<59>";
					dbg_object(c_RogueType.m_Data).m_player.p_collidedWithEnemyShip(t_currItem2);
				}
			}
		}
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<63>";
		if(!dbg_object(dbg_object(c_RogueType.m_Data).m_enemyProjectileManager).m_items.p_IsEmpty()){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<64>";
			for(var t_idx3=0;t_idx3<dbg_object(dbg_object(c_RogueType.m_Data).m_enemyProjectileManager).m_items.p_Length2();t_idx3=t_idx3+1){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<65>";
				var t_currItem3=object_downcast((dbg_object(dbg_object(c_RogueType.m_Data).m_enemyProjectileManager).m_items.p_Get3(t_idx3)),c_EnemyProjectile);
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<66>";
				if(dbg_object(c_RogueType.m_Data).m_player.p_collidesWith(t_currItem3)){
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<67>";
					dbg_object(c_RogueType.m_Data).m_player.p_collidedWithEnemyProjectile(t_currItem3);
				}
			}
		}
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<71>";
		if(!dbg_object(dbg_object(c_RogueType.m_Data).m_ambiguousProjectileManager).m_items.p_IsEmpty()){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<72>";
			for(var t_idx4=0;t_idx4<dbg_object(dbg_object(c_RogueType.m_Data).m_ambiguousProjectileManager).m_items.p_Length2();t_idx4=t_idx4+1){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<73>";
				var t_currItem4=object_downcast((dbg_object(dbg_object(c_RogueType.m_Data).m_ambiguousProjectileManager).m_items.p_Get3(t_idx4)),c_AmbiguousProjectile);
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<74>";
				if(dbg_object(c_RogueType.m_Data).m_player.p_collidesWith(t_currItem4)){
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<75>";
					dbg_object(c_RogueType.m_Data).m_player.p_collidedWithAmbiguousProjectile(t_currItem4);
				}
			}
		}
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<79>";
		if(!dbg_object(dbg_object(c_RogueType.m_Data).m_powerupManager).m_items.p_IsEmpty()){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<80>";
			for(var t_idx5=0;t_idx5<dbg_object(dbg_object(c_RogueType.m_Data).m_powerupManager).m_items.p_Length2();t_idx5=t_idx5+1){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<81>";
				var t_currItem5=dbg_object(dbg_object(c_RogueType.m_Data).m_powerupManager).m_items.p_Get3(t_idx5);
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<82>";
				if(dbg_object(c_RogueType.m_Data).m_player.p_collidesWith(t_currItem5)){
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<83>";
					dbg_object(c_RogueType.m_Data).m_player.p_collidedWithPowerup(t_currItem5);
				}
			}
		}
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<87>";
		if(!dbg_object(dbg_object(c_RogueType.m_Data).m_sceneryManager).m_items.p_IsEmpty()){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<88>";
			for(var t_idx6=0;t_idx6<dbg_object(dbg_object(c_RogueType.m_Data).m_sceneryManager).m_items.p_Length2();t_idx6=t_idx6+1){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<89>";
				var t_currItem6=dbg_object(dbg_object(c_RogueType.m_Data).m_sceneryManager).m_items.p_Get3(t_idx6);
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<90>";
				if(dbg_object(c_RogueType.m_Data).m_player.p_collidesWith(t_currItem6)){
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<91>";
					dbg_object(c_RogueType.m_Data).m_player.p_collidedWithScenery(t_currItem6);
				}
			}
		}
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<97>";
	if(!dbg_object(dbg_object(c_RogueType.m_Data).m_shipManager).m_items.p_IsEmpty()){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<99>";
		for(var t_idx7=0;t_idx7<dbg_object(dbg_object(c_RogueType.m_Data).m_shipManager).m_items.p_Length2();t_idx7=t_idx7+1){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<100>";
			var t_currItem7=dbg_object(dbg_object(c_RogueType.m_Data).m_shipManager).m_items.p_Get3(t_idx7);
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<109>";
			if(!dbg_object(dbg_object(c_RogueType.m_Data).m_friendlyProjectileManager).m_items.p_IsEmpty()){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<110>";
				for(var t_kdx2=0;t_kdx2<dbg_object(dbg_object(c_RogueType.m_Data).m_friendlyProjectileManager).m_items.p_Length2();t_kdx2=t_kdx2+1){
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<111>";
					var t_nextItem2=object_downcast((dbg_object(dbg_object(c_RogueType.m_Data).m_friendlyProjectileManager).m_items.p_Get3(t_kdx2)),c_FriendlyProjectile);
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<113>";
					if(t_currItem7.p_collidesWith(t_nextItem2)){
						err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<115>";
						t_currItem7.p_collidedWithFriendlyProjectile(t_nextItem2);
					}
				}
			}
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<119>";
			if(!dbg_object(dbg_object(c_RogueType.m_Data).m_ambiguousProjectileManager).m_items.p_IsEmpty()){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<120>";
				for(var t_kdx3=0;t_kdx3<dbg_object(dbg_object(c_RogueType.m_Data).m_ambiguousProjectileManager).m_items.p_Length2();t_kdx3=t_kdx3+1){
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<121>";
					var t_nextItem3=object_downcast((dbg_object(dbg_object(c_RogueType.m_Data).m_ambiguousProjectileManager).m_items.p_Get3(t_kdx3)),c_AmbiguousProjectile);
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<123>";
					if(t_currItem7.p_collidesWith(t_nextItem3)){
						err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<125>";
						t_currItem7.p_collidedWithAmbiguousProjectile(t_nextItem3);
					}
				}
			}
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<129>";
			if(!dbg_object(dbg_object(c_RogueType.m_Data).m_sceneryManager).m_items.p_IsEmpty()){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<130>";
				for(var t_kdx4=0;t_kdx4<dbg_object(dbg_object(c_RogueType.m_Data).m_sceneryManager).m_items.p_Length2();t_kdx4=t_kdx4+1){
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<131>";
					var t_nextItem4=dbg_object(dbg_object(c_RogueType.m_Data).m_sceneryManager).m_items.p_Get3(t_kdx4);
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<133>";
					if(t_currItem7.p_collidesWith(t_nextItem4)){
						err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<135>";
						t_currItem7.p_collidedWithScenery(t_nextItem4);
					}
				}
			}
		}
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<142>";
	if(!dbg_object(dbg_object(c_RogueType.m_Data).m_sceneryManager).m_items.p_IsEmpty()){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<144>";
		for(var t_idx8=0;t_idx8<dbg_object(dbg_object(c_RogueType.m_Data).m_sceneryManager).m_items.p_Length2();t_idx8=t_idx8+1){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<145>";
			var t_currItem8=dbg_object(dbg_object(c_RogueType.m_Data).m_sceneryManager).m_items.p_Get3(t_idx8);
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<154>";
			if(!dbg_object(dbg_object(c_RogueType.m_Data).m_friendlyProjectileManager).m_items.p_IsEmpty()){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<155>";
				for(var t_kdx5=0;t_kdx5<dbg_object(dbg_object(c_RogueType.m_Data).m_friendlyProjectileManager).m_items.p_Length2();t_kdx5=t_kdx5+1){
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<156>";
					var t_nextItem5=object_downcast((dbg_object(dbg_object(c_RogueType.m_Data).m_friendlyProjectileManager).m_items.p_Get3(t_kdx5)),c_FriendlyProjectile);
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<158>";
					if(t_currItem8.p_collidesWith(t_nextItem5)){
						err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<160>";
						t_currItem8.p_collidedWithFriendlyProjectile(t_nextItem5);
					}
				}
			}
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<164>";
			if(!dbg_object(dbg_object(c_RogueType.m_Data).m_ambiguousProjectileManager).m_items.p_IsEmpty()){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<165>";
				for(var t_kdx6=0;t_kdx6<dbg_object(dbg_object(c_RogueType.m_Data).m_ambiguousProjectileManager).m_items.p_Length2();t_kdx6=t_kdx6+1){
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<166>";
					var t_nextItem6=object_downcast((dbg_object(dbg_object(c_RogueType.m_Data).m_ambiguousProjectileManager).m_items.p_Get3(t_kdx6)),c_AmbiguousProjectile);
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<168>";
					if(t_currItem8.p_collidesWith(t_nextItem6)){
						err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<170>";
						t_currItem8.p_collidedWithAmbiguousProjectile(t_nextItem6);
					}
				}
			}
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<174>";
			if(!dbg_object(dbg_object(c_RogueType.m_Data).m_enemyProjectileManager).m_items.p_IsEmpty()){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<175>";
				for(var t_kdx7=0;t_kdx7<dbg_object(dbg_object(c_RogueType.m_Data).m_enemyProjectileManager).m_items.p_Length2();t_kdx7=t_kdx7+1){
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<176>";
					var t_nextItem7=object_downcast((dbg_object(dbg_object(c_RogueType.m_Data).m_enemyProjectileManager).m_items.p_Get3(t_kdx7)),c_EnemyProjectile);
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<178>";
					if(t_currItem8.p_collidesWith(t_nextItem7)){
						err_info="/Applications/MonkeyX77a/LazarDev/RogueType/collisionmanager.monkey<180>";
						t_currItem8.p_collidedWithEnemyProjectile(t_nextItem7);
					}
				}
			}
		}
	}
	pop_err();
	return 0;
}
function c_Level(){
	c_Rect.call(this);
	this.m_number=0;
	this.m_chunkStack=null;
	this.m_isMenu=false;
	this.m_menu=null;
	this.m_finishLine=null;
}
c_Level.prototype=extend_class(c_Rect);
c_Level.prototype.p_generate=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<26>";
	if(dbg_object(this).m_number==0){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<27>";
		dbg_object(dbg_object(c_RogueType.m_Data).m_camera).m_vel.p_speed2(0.0);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<28>";
		dbg_object(this).m_isMenu=true;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<29>";
		var t_butt1=(c_PlayButton.m_new.call(new c_PlayButton,this.p_left()+800.0,this.p_top()+100.0));
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<30>";
		var t_butt2=c_Button.m_new.call(new c_Button,this.p_left()+800.0,this.p_top()+300.0,false);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<31>";
		var t_butt3=c_Button.m_new.call(new c_Button,this.p_left()+800.0,this.p_top()+600.0,false);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<32>";
		dbg_object(this).m_menu=c_Menu.m_new.call(new c_Menu);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<33>";
		dbg_object(this).m_menu.p_addButton(t_butt1);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<34>";
		dbg_object(this).m_menu.p_addButton(t_butt2);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<35>";
		dbg_object(this).m_menu.p_addButton(t_butt3);
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<38>";
	if(dbg_object(this).m_number==-1){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<39>";
		dbg_object(dbg_object(c_RogueType.m_Data).m_camera).m_vel.p_speed2(0.0);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<40>";
		dbg_object(this).m_isMenu=true;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<41>";
		var t_butt12=(c_PlayButton.m_new.call(new c_PlayButton,this.p_left()+800.0,this.p_top()+100.0));
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<42>";
		var t_butt22=c_Button.m_new.call(new c_Button,this.p_left()+800.0,this.p_top()+300.0,false);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<43>";
		var t_butt32=c_Button.m_new.call(new c_Button,this.p_left()+800.0,this.p_top()+600.0,false);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<44>";
		dbg_object(this).m_menu=c_Menu.m_new.call(new c_Menu);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<45>";
		dbg_object(this).m_menu.p_addButton(t_butt12);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<46>";
		dbg_object(this).m_menu.p_addButton(t_butt22);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<47>";
		dbg_object(this).m_menu.p_addButton(t_butt32);
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<51>";
	if(dbg_object(this).m_number>0){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<52>";
		dbg_object(dbg_object(c_RogueType.m_Data).m_camera).m_vel.p_speed2(1.0);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<53>";
		dbg_object(this).m_isMenu=false;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<60>";
		var t_chunkWidth=720.0;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<61>";
		var t_chunkHeight=720.0;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<62>";
		var t_buffer=dbg_object(c_RogueType.m_Data).m_camera.p_width()/3.0;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<63>";
		var t_numChunks=(((this.p_width()-t_buffer)/t_chunkWidth)|0);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<65>";
		for(var t_idx=0;t_idx<t_numChunks;t_idx=t_idx+1){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<66>";
			var t_chunkLeft=this.p_left()+t_buffer+t_chunkWidth*(t_idx);
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<67>";
			var t_chunkTop=this.p_top();
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<68>";
			var t_chunkRight=t_chunkLeft+t_chunkWidth;
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<69>";
			var t_chunkBottom=t_chunkTop+t_chunkHeight;
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<70>";
			dbg_object(this).m_chunkStack.p_Push16(c_Chunk.m_new.call(new c_Chunk,this,"Standard",c_Vector.m_new.call(new c_Vector,t_chunkLeft,t_chunkTop),c_Vector.m_new.call(new c_Vector,t_chunkRight,t_chunkBottom)));
		}
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<73>";
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<73>";
		var t_=dbg_object(this).m_chunkStack.p_ObjectEnumerator();
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<73>";
		while(t_.p_HasNext()){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<73>";
			var t__chunk=t_.p_NextObject();
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<74>";
			t__chunk.p_populate();
		}
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<77>";
		dbg_object(this).m_finishLine=c_FinishLine.m_new.call(new c_FinishLine,this.p_right()-25.0,this.p_height()/2.0);
	}
	pop_err();
}
c_Level.m_new=function(t_v1,t_v2,t_n){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<19>";
	c_Rect.m_new.call(this,t_v1,t_v2);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<20>";
	dbg_object(this).m_number=t_n;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<21>";
	dbg_object(this).m_chunkStack=c_Stack6.m_new.call(new c_Stack6);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<22>";
	this.p_generate();
	pop_err();
	return this;
}
c_Level.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<10>";
	c_Rect.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<10>";
	pop_err();
	return this;
}
function c_Chunk(){
	c_Rect.call(this);
	this.m_level=null;
	this.m_type="";
}
c_Chunk.prototype=extend_class(c_Rect);
c_Chunk.m_new=function(t__level,t__type,t_v1,t_v2){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<97>";
	c_Rect.m_new.call(this,t_v1,t_v2);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<98>";
	dbg_object(this).m_level=t__level;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<99>";
	dbg_object(this).m_type=t__type;
	pop_err();
	return this;
}
c_Chunk.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<91>";
	c_Rect.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<91>";
	pop_err();
	return this;
}
c_Chunk.prototype.p_populate=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<102>";
	if(dbg_object(dbg_object(this).m_level).m_number>0){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<103>";
		if(dbg_object(this).m_type.toLowerCase()=="standard"){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<105>";
			var t_wallsAllowed=true;
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<106>";
			var t_testSquadCircle=bb_random_Rnd3(1.0);
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<107>";
			var t_xVect=new_number_array(20);
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<108>";
			var t_yVect=new_number_array(20);
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<109>";
			for(var t_idx=0;t_idx<20;t_idx=t_idx+1){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<110>";
				dbg_array(t_xVect,t_idx)[dbg_index]=this.p_center().p_x2()+36.0*(-9.5+(t_idx))
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<111>";
				dbg_array(t_yVect,t_idx)[dbg_index]=this.p_center().p_y2()-36.0*(-9.5+(t_idx))
			}
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<113>";
			if(t_testSquadCircle<.5){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<114>";
				var t_sc=c_SquadCircle.m_new.call(new c_SquadCircle,this.p_center().p_x2(),this.p_center().p_y2(),300.0,10);
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<115>";
				t_wallsAllowed=false;
			}
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<117>";
			for(var t_idx2=0;t_idx2<20;t_idx2=t_idx2+1){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<118>";
				for(var t_jdx=0;t_jdx<20;t_jdx=t_jdx+1){
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<120>";
					var t_test1=bb_random_Rnd3(1.0);
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<121>";
					if(t_test1<.001){
						err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<123>";
						dbg_object(c_RogueType.m_Data).m_shipManager.p_add(c_EnemyL1Turret.m_new.call(new c_EnemyL1Turret,dbg_array(t_xVect,t_idx2)[dbg_index],dbg_array(t_yVect,t_jdx)[dbg_index]));
					}else{
						err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<125>";
						if(t_test1>=.001 && t_test1<.01){
							err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<127>";
							if(t_wallsAllowed){
								err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<128>";
								dbg_object(c_RogueType.m_Data).m_sceneryManager.p_add4(c_Wall0.m_new.call(new c_Wall0,dbg_array(t_xVect,t_idx2)[dbg_index],dbg_array(t_yVect,t_jdx)[dbg_index]));
							}
						}else{
							err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<131>";
							if(t_test1>=.01 && t_test1<.011){
								err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<133>";
								dbg_object(c_RogueType.m_Data).m_powerupManager.p_createNewRandom(dbg_array(t_xVect,t_idx2)[dbg_index],dbg_array(t_yVect,t_jdx)[dbg_index]);
							}else{
								err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<135>";
								if(t_test1>=.011 && t_test1<.012){
									err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<137>";
									dbg_object(c_RogueType.m_Data).m_shipManager.p_add(c_EnemySpawn.m_new.call(new c_EnemySpawn,dbg_array(t_xVect,t_idx2)[dbg_index],dbg_array(t_yVect,t_jdx)[dbg_index]));
								}else{
									err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<139>";
									if(t_test1>=.012 && t_test1<.0125){
									}
								}
							}
						}
					}
				}
			}
		}
	}
	pop_err();
	return 0;
}
function c_Stack6(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack6.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack6.m_new2=function(t_data){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack6.prototype.p_Push16=function(t_value){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack6.prototype.p_Push17=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<80>";
		this.p_Push16(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack6.prototype.p_Push18=function(t_values,t_offset){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<75>";
	this.p_Push17(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack6.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<184>";
	var t_=c_Enumerator.m_new.call(new c_Enumerator,this);
	pop_err();
	return t_;
}
c_Stack6.m_NIL=null;
c_Stack6.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack6.m_NIL
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack6.prototype.p_Length2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
function c_Button(){
	c_Killable.call(this);
	this.m_text="";
	this.m_isToggleable=false;
	this.m__isSelected=false;
	this.m__toggleState=false;
}
c_Button.prototype=extend_class(c_Killable);
c_Button.prototype.p_isSelected=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<94>";
	pop_err();
	return this.m__isSelected;
}
c_Button.prototype.p_toggleState=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<126>";
	pop_err();
	return this.m__toggleState;
}
c_Button.prototype.p_toggleState2=function(t_stateIn){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<129>";
	this.m__toggleState=t_stateIn;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<130>";
	this.p_updateButtonStatus();
	pop_err();
	return 0;
}
c_Button.prototype.p_updateButtonStatus=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<111>";
	if(this.p_isSelected()){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<112>";
		if(this.p_toggleState()){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<113>";
			dbg_object(this).m_sprite.p_setAnimation("isSelectedIsToggled");
		}else{
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<115>";
			dbg_object(this).m_sprite.p_setAnimation("isSelectedNotToggled");
		}
	}else{
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<118>";
		if(this.p_toggleState()){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<119>";
			dbg_object(this).m_sprite.p_setAnimation("notSelectedIsToggled");
		}else{
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<121>";
			dbg_object(this).m_sprite.p_setAnimation("notSelectedNotToggled");
		}
	}
	pop_err();
	return 0;
}
c_Button.prototype.p_isSelected2=function(t_newState){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<97>";
	this.m__isSelected=t_newState;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<98>";
	this.p_updateButtonStatus();
	pop_err();
	return 0;
}
c_Button.m_new=function(t__x,t__y,t_shouldBeToggleable){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<54>";
	c_Killable.m_new.call(this,t__x,t__y);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<55>";
	this.p_HP(1.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<56>";
	dbg_object(this).m_text="PlaceholderText";
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<58>";
	dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprMenuButton.png"));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<59>";
	dbg_object(this).m_sprite.p_newAnimation("notSelectedNotToggled",0,1,2);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<60>";
	dbg_object(this).m_sprite.p_newAnimation("isSelectedNotToggled",1,1,2);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<61>";
	dbg_object(this).m_sprite.p_newAnimation("isSelectedIsToggled",2,1,2);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<62>";
	dbg_object(this).m_sprite.p_newAnimation("notSelectedIsToggled",3,1,2);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<64>";
	if(t_shouldBeToggleable){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<65>";
		dbg_object(this).m_isToggleable=true;
	}else{
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<67>";
		dbg_object(this).m_isToggleable=false;
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<70>";
	this.p_isSelected2(false);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<71>";
	this.p_toggleState2(false);
	pop_err();
	return this;
}
c_Button.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<43>";
	c_Killable.m_new3.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<43>";
	pop_err();
	return this;
}
c_Button.prototype.p_toggle=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<102>";
	this.p_toggleState2(!this.p_toggleState());
	pop_err();
	return 0;
}
c_Button.prototype.p_toggle2=function(t_forcedState){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<107>";
	this.p_toggleState2(t_forcedState);
	pop_err();
	return 0;
}
c_Button.prototype.p_customClickAction=function(){
	push_err();
	pop_err();
	return 0;
}
c_Button.prototype.p_onClick=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<75>";
	if(dbg_object(this).m_isToggleable){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<76>";
		this.p_toggle();
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<78>";
	this.p_customClickAction();
	pop_err();
	return 0;
}
c_Button.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<135>";
	if((bb_input_MouseHit(0))!=0){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<136>";
		var t_vecTemp=c_Vector.m_new.call(new c_Vector,bb_autofit_VMouseX(true),bb_autofit_VMouseY(true));
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<137>";
		if(this.p_cMask().p_containsPoint(t_vecTemp)){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<138>";
			this.p_onClick();
		}
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<141>";
	c_Killable.prototype.p_update.call(this);
	pop_err();
	return 0;
}
c_Button.prototype.p_collidedWithFriendlyProjectile=function(t_other){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<154>";
	this.p_HP(this.p_HP2()-(dbg_object(t_other).m_strength));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<155>";
	t_other.p_HP(t_other.p_HP2()-1.0);
	pop_err();
	return 0;
}
c_Button.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<144>";
	c_Killable.prototype.p_draw.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<145>";
	bb_graphics_DrawText(dbg_object(this).m_text,dbg_object(this).m_pos.p_x2(),dbg_object(this).m_pos.p_y2(),.5,.5);
	pop_err();
	return 0;
}
c_Button.prototype.p_kill=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<149>";
	c_Killable.prototype.p_kill.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<150>";
	this.p_onClick();
	pop_err();
	return 0;
}
function c_PlayButton(){
	c_Button.call(this);
}
c_PlayButton.prototype=extend_class(c_Button);
c_PlayButton.m_new=function(t__x,t__y){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/mainmenu.monkey<46>";
	c_Button.m_new.call(this,t__x,t__y,false);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/mainmenu.monkey<47>";
	dbg_object(this).m_text="Play!";
	pop_err();
	return this;
}
c_PlayButton.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/mainmenu.monkey<43>";
	c_Button.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/mainmenu.monkey<43>";
	pop_err();
	return this;
}
c_PlayButton.prototype.p_customClickAction=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/mainmenu.monkey<52>";
	dbg_object(c_RogueType.m_Data).m_currentLevel=c_Level.m_new.call(new c_Level,c_Vector.m_new.call(new c_Vector,0.0,0.0),c_Vector.m_new.call(new c_Vector,3690.0,720.0),1);
	pop_err();
	return 0;
}
function c_KillableManager6(){
	Object.call(this);
	this.m_items=null;
}
c_KillableManager6.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<7>";
	dbg_object(this).m_items=c_Stack7.m_new.call(new c_Stack7);
	pop_err();
	return this;
}
c_KillableManager6.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<11>";
	if(!dbg_object(this).m_items.p_IsEmpty()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<12>";
		for(var t_idx=0;t_idx<dbg_object(this).m_items.p_Length2();t_idx=t_idx+1){
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<13>";
			dbg_object(this).m_items.p_Get3(t_idx).p_update();
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<14>";
			if(dbg_object(dbg_object(this).m_items.p_Get3(t_idx)).m_isDead){
				err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<15>";
				dbg_object(this).m_items.p_Remove(t_idx);
			}
		}
	}
	pop_err();
	return 0;
}
c_KillableManager6.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<23>";
	if(!dbg_object(this).m_items.p_IsEmpty()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		var t_=dbg_object(this).m_items.p_ObjectEnumerator();
		err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
		while(t_.p_HasNext()){
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<24>";
			var t_item=t_.p_NextObject();
			err_info="/Applications/MonkeyX77a/modules/lazeng/killablemanager.monkey<26>";
			t_item.p_draw();
		}
	}
	pop_err();
	return 0;
}
function c_Menu(){
	c_KillableManager6.call(this);
	this.m_selectedButton=null;
}
c_Menu.prototype=extend_class(c_KillableManager6);
c_Menu.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<9>";
	c_KillableManager6.m_new.call(this);
	pop_err();
	return this;
}
c_Menu.prototype.p_addButton=function(t_butt){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<31>";
	dbg_object(this).m_items.p_Push19(t_butt);
	pop_err();
	return 0;
}
c_Menu.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<12>";
	var t_yDiffPrev=100000.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<13>";
	var t_yDiffCurr=.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<14>";
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<14>";
	var t_=dbg_object(this).m_items.p_ObjectEnumerator();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<14>";
	while(t_.p_HasNext()){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<14>";
		var t__butt=t_.p_NextObject();
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<15>";
		t__butt.p_isSelected2(false);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<16>";
		t_yDiffCurr=bb_math_Abs2(dbg_object(dbg_object(c_RogueType.m_Data).m_player).m_pos.p_y2()-dbg_object(t__butt).m_pos.p_y2());
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<17>";
		if(t_yDiffCurr<t_yDiffPrev){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<18>";
			t_yDiffPrev=t_yDiffCurr;
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<19>";
			dbg_object(this).m_selectedButton=t__butt;
		}
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<24>";
	dbg_object(this).m_selectedButton.p_isSelected2(true);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<25>";
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<25>";
	var t_2=dbg_object(this).m_items.p_ObjectEnumerator();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<25>";
	while(t_2.p_HasNext()){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<25>";
		var t__butt2=t_2.p_NextObject();
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<26>";
		t__butt2.p_update();
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<28>";
	c_KillableManager6.prototype.p_update.call(this);
	pop_err();
	return 0;
}
c_Menu.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<36>";
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<36>";
	var t_=dbg_object(this).m_items.p_ObjectEnumerator();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<36>";
	while(t_.p_HasNext()){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<36>";
		var t__butt=t_.p_NextObject();
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/button.monkey<37>";
		t__butt.p_draw();
	}
	pop_err();
	return 0;
}
function c_Stack7(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack7.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack7.m_new2=function(t_data){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack7.prototype.p_Push19=function(t_value){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack7.prototype.p_Push20=function(t_values,t_offset,t_count){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<80>";
		this.p_Push19(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack7.prototype.p_Push21=function(t_values,t_offset){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<75>";
	this.p_Push20(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack7.prototype.p_IsEmpty=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<56>";
	var t_=this.m_length==0;
	pop_err();
	return t_;
}
c_Stack7.m_NIL=null;
c_Stack7.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<41>";
	if(t_newlength<this.m_length){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<42>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<43>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack7.m_NIL
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<45>";
		if(t_newlength>this.m_data.length){
			err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<46>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<48>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack7.prototype.p_Length2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<52>";
	pop_err();
	return this.m_length;
}
c_Stack7.prototype.p_Get3=function(t_index){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<100>";
	pop_err();
	return dbg_array(this.m_data,t_index)[dbg_index];
}
c_Stack7.prototype.p_Remove=function(t_index){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<133>";
	for(var t_i=t_index;t_i<this.m_length-1;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<134>";
		dbg_array(this.m_data,t_i)[dbg_index]=dbg_array(this.m_data,t_i+1)[dbg_index]
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<136>";
	this.m_length-=1;
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<137>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=c_Stack7.m_NIL
	pop_err();
}
c_Stack7.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<184>";
	var t_=c_Enumerator2.m_new.call(new c_Enumerator2,this);
	pop_err();
	return t_;
}
function bb_math_Abs(t_x){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<46>";
	if(t_x>=0){
		err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<46>";
		pop_err();
		return t_x;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<47>";
	var t_=-t_x;
	pop_err();
	return t_;
}
function bb_math_Abs2(t_x){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<73>";
	if(t_x>=0.0){
		err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<73>";
		pop_err();
		return t_x;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<74>";
	var t_=-t_x;
	pop_err();
	return t_;
}
function c_Enumerator(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator.m_new=function(t_stack){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<255>";
	dbg_object(this).m_stack=t_stack;
	pop_err();
	return this;
}
c_Enumerator.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<252>";
	pop_err();
	return this;
}
c_Enumerator.prototype.p_HasNext=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<259>";
	var t_=this.m_index<this.m_stack.p_Length2();
	pop_err();
	return t_;
}
c_Enumerator.prototype.p_NextObject=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<263>";
	this.m_index+=1;
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<264>";
	var t_=dbg_array(dbg_object(this.m_stack).m_data,this.m_index-1)[dbg_index];
	pop_err();
	return t_;
}
function bb_math_Max(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<56>";
	if(t_x>t_y){
		err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<56>";
		pop_err();
		return t_x;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<57>";
	pop_err();
	return t_y;
}
function bb_math_Max2(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<83>";
	if(t_x>t_y){
		err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<83>";
		pop_err();
		return t_x;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<84>";
	pop_err();
	return t_y;
}
function bb_random_Rnd(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/random.monkey<21>";
	bb_random_Seed=bb_random_Seed*1664525+1013904223|0;
	err_info="/Applications/MonkeyX77a/modules/monkey/random.monkey<22>";
	var t_=(bb_random_Seed>>8&16777215)/16777216.0;
	pop_err();
	return t_;
}
function bb_random_Rnd2(t_low,t_high){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/random.monkey<30>";
	var t_=bb_random_Rnd3(t_high-t_low)+t_low;
	pop_err();
	return t_;
}
function bb_random_Rnd3(t_range){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/random.monkey<26>";
	var t_=bb_random_Rnd()*t_range;
	pop_err();
	return t_;
}
function c_SquadCircle(){
	Object.call(this);
	this.m_radius=.0;
	this.m_center=null;
	this.m_speedBase=.0;
}
c_SquadCircle.m_new=function(t__x,t__y,t__radius,t__numberOfShips){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/squadcircle.monkey<13>";
	dbg_object(this).m_radius=t__radius;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/squadcircle.monkey<14>";
	dbg_object(this).m_center=c_Vector.m_new.call(new c_Vector,t__x,t__y);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/squadcircle.monkey<15>";
	dbg_object(this).m_speedBase=2.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/squadcircle.monkey<17>";
	var t_theta=0.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/squadcircle.monkey<18>";
	var t_x=0.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/squadcircle.monkey<19>";
	var t_y=0.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/squadcircle.monkey<20>";
	for(var t_idx=0;t_idx<t__numberOfShips;t_idx=t_idx+1){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/squadcircle.monkey<22>";
		t_theta=((t_idx*360/t__numberOfShips)|0);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/squadcircle.monkey<23>";
		t_x=dbg_object(this).m_center.p_x2()+dbg_object(this).m_radius*Math.cos((t_theta)*D2R);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/squadcircle.monkey<24>";
		t_y=dbg_object(this).m_center.p_y2()-dbg_object(this).m_radius*Math.sin((t_theta)*D2R);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/squadcircle.monkey<25>";
		dbg_object(c_RogueType.m_Data).m_shipManager.p_add(c_EnemyCircleL1.m_new.call(new c_EnemyCircleL1,t_x,t_y,this));
	}
	pop_err();
	return this;
}
c_SquadCircle.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/squadcircle.monkey<5>";
	pop_err();
	return this;
}
function c_EnemyCircleL1(){
	c_EnemyShip.call(this);
	this.m_squadCircle=null;
}
c_EnemyCircleL1.prototype=extend_class(c_EnemyShip);
c_EnemyCircleL1.m_new=function(t_x,t_y,t__squadCircle){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<11>";
	c_EnemyShip.m_new.call(this,t_x,t_y);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<12>";
	dbg_object(this).m_squadCircle=t__squadCircle;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<13>";
	dbg_object(this).m_points=1;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<14>";
	dbg_object(this).m_maxHP=3.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<15>";
	this.p_HP(3.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<16>";
	dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprEnemyCircleL1.png"));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<19>";
	dbg_object(this).m_vel.p_speed2(2.0);
	pop_err();
	return this;
}
c_EnemyCircleL1.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<7>";
	c_EnemyShip.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<7>";
	pop_err();
	return this;
}
c_EnemyCircleL1.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<28>";
	var t_theta=(Math.atan2(dbg_object(dbg_object(this).m_squadCircle).m_center.p_y2()-dbg_object(this).m_pos.p_y2(),dbg_object(this).m_pos.p_x2()-dbg_object(dbg_object(this).m_squadCircle).m_center.p_x2())*R2D);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<29>";
	dbg_object(this).m_vel.p_direction2(t_theta+90.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<30>";
	var t_choose=((Math.floor(bb_random_Rnd3(180.0)))|0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<31>";
	if(t_choose==1){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<32>";
		var t_proj=(c_ProjEnemyStock.m_new.call(new c_ProjEnemyStock,dbg_object(this).m_pos.p_x2(),dbg_object(this).m_pos.p_y2()));
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<33>";
		dbg_object(t_proj).m_vel.p_direction2(t_theta-180.0);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<34>";
		dbg_object(t_proj).m_vel.p_speed2(3.5);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<35>";
		dbg_object(t_proj).m_strength=1;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<36>";
		dbg_object(c_RogueType.m_Data).m_enemyProjectileManager.p_add2(t_proj);
	}
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<39>";
	c_EnemyShip.prototype.p_update.call(this);
	pop_err();
	return 0;
}
c_EnemyCircleL1.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemycirclel1.monkey<54>";
	c_Ship.prototype.p_draw.call(this);
	pop_err();
	return 0;
}
function c_EnemyL1Turret(){
	c_EnemyShip.call(this);
}
c_EnemyL1Turret.prototype=extend_class(c_EnemyShip);
c_EnemyL1Turret.m_new=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<10>";
	c_EnemyShip.m_new.call(this,t_x,t_y);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<11>";
	dbg_object(this).m_points=1;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<12>";
	dbg_object(this).m_maxHP=5.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<13>";
	this.p_HP(5.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<14>";
	dbg_object(this).m_vel.p_speed2(0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<15>";
	dbg_object(this).m_vel.p_direction2(0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<16>";
	dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprEnemyTurretL1.png"));
	pop_err();
	return this;
}
c_EnemyL1Turret.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<7>";
	c_EnemyShip.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<7>";
	pop_err();
	return this;
}
c_EnemyL1Turret.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<23>";
	if(!dbg_object(c_RogueType.m_Data).m_camera.p_intersects(dbg_object(dbg_object(this).m_sprite).m_bounds)){
	}else{
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<26>";
		c_EnemyShip.prototype.p_update.call(this);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<27>";
		var t_choose=((Math.floor(bb_random_Rnd3(30.0)))|0);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<28>";
		if(t_choose==1){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<29>";
			var t_proj=(c_ProjEnemyStock.m_new.call(new c_ProjEnemyStock,dbg_object(this).m_pos.p_x2(),dbg_object(this).m_pos.p_y2()));
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<30>";
			dbg_object(t_proj).m_vel.p_direction2(bb_random_Rnd3(360.0));
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<31>";
			dbg_object(t_proj).m_vel.p_speed2(3.5);
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<32>";
			dbg_object(t_proj).m_strength=1;
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<33>";
			dbg_object(c_RogueType.m_Data).m_enemyProjectileManager.p_add2(t_proj);
		}
	}
	pop_err();
	return 0;
}
c_EnemyL1Turret.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyl1turret.monkey<41>";
	c_Ship.prototype.p_draw.call(this);
	pop_err();
	return 0;
}
function c_Wall0(){
	c_Scenery.call(this);
}
c_Wall0.prototype=extend_class(c_Scenery);
c_Wall0.m_new=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/wall0.monkey<6>";
	c_Scenery.m_new.call(this,t_x,t_y);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/wall0.monkey<7>";
	dbg_object(this).m_vel.p_speed2(0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/wall0.monkey<8>";
	dbg_object(this).m_vel.p_direction2(0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/wall0.monkey<9>";
	dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprWall0.png"));
	pop_err();
	return this;
}
c_Wall0.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/wall0.monkey<3>";
	c_Scenery.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/wall0.monkey<3>";
	pop_err();
	return this;
}
function c_MapKeys3(){
	Object.call(this);
	this.m_map=null;
}
c_MapKeys3.m_new=function(t_map){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<503>";
	dbg_object(this).m_map=t_map;
	pop_err();
	return this;
}
c_MapKeys3.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<500>";
	pop_err();
	return this;
}
c_MapKeys3.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<507>";
	var t_=c_KeyEnumerator3.m_new.call(new c_KeyEnumerator3,this.m_map.p_FirstNode());
	pop_err();
	return t_;
}
function c_KeyEnumerator3(){
	Object.call(this);
	this.m_node=null;
}
c_KeyEnumerator3.m_new=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<459>";
	dbg_object(this).m_node=t_node;
	pop_err();
	return this;
}
c_KeyEnumerator3.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<456>";
	pop_err();
	return this;
}
c_KeyEnumerator3.prototype.p_HasNext=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<463>";
	var t_=this.m_node!=null;
	pop_err();
	return t_;
}
c_KeyEnumerator3.prototype.p_NextObject=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<467>";
	var t_t=this.m_node;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<468>";
	this.m_node=this.m_node.p_NextNode();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<469>";
	pop_err();
	return dbg_object(t_t).m_key;
}
function c_EnemySpawn(){
	c_EnemyShip.call(this);
}
c_EnemySpawn.prototype=extend_class(c_EnemyShip);
c_EnemySpawn.m_new=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<8>";
	c_EnemyShip.m_new.call(this,t_x,t_y);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<9>";
	dbg_object(this).m_points=1;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<10>";
	dbg_object(this).m_maxHP=6.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<11>";
	this.p_HP(6.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<12>";
	dbg_object(this).m_vel.p_speed2(0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<13>";
	dbg_object(this).m_vel.p_direction2(0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<14>";
	dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprEnemySpawnL1.png"));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<17>";
	this.p_setTimer(0,60);
	pop_err();
	return this;
}
c_EnemySpawn.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<5>";
	c_EnemyShip.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<5>";
	pop_err();
	return this;
}
c_EnemySpawn.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<21>";
	if(!((dbg_object(c_RogueType.m_Data).m_camera.p_contains(this))!=0)){
	}else{
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<24>";
		c_EnemyShip.prototype.p_update.call(this);
	}
	pop_err();
	return 0;
}
c_EnemySpawn.prototype.p_timerAction=function(t_whichTimer){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<30>";
	c_Lazo.prototype.p_timerAction.call(this,t_whichTimer);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<31>";
	var t_1=t_whichTimer;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<32>";
	if(t_1==0){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<33>";
		dbg_object(c_RogueType.m_Data).m_shipManager.p_add(c_EnemyFromSpawn.m_new.call(new c_EnemyFromSpawn,dbg_object(this).m_pos.p_x2(),dbg_object(this).m_pos.p_y2()));
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<34>";
		this.p_setTimer(0,60);
	}
	pop_err();
	return 0;
}
c_EnemySpawn.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyspawn.monkey<38>";
	c_Ship.prototype.p_draw.call(this);
	pop_err();
	return 0;
}
function c_FinishLine(){
	c_Collideable.call(this);
}
c_FinishLine.prototype=extend_class(c_Collideable);
c_FinishLine.m_new=function(t__x,t__y){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<85>";
	c_Collideable.m_new.call(this,t__x,t__y);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<87>";
	dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprFinishLine.png"));
	pop_err();
	return this;
}
c_FinishLine.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<83>";
	c_Collideable.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/level.monkey<83>";
	pop_err();
	return this;
}
function bb_input_JoyDown(t_button,t_unit){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/input.monkey<102>";
	var t_=((bb_input_device.p_KeyDown(256|t_unit<<5|t_button))?1:0);
	pop_err();
	return t_;
}
function bb_input_KeyDown(t_key){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/input.monkey<36>";
	var t_=((bb_input_device.p_KeyDown(t_key))?1:0);
	pop_err();
	return t_;
}
function bb_input_MouseHit(t_button){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/input.monkey<66>";
	var t_=bb_input_device.p_KeyHit(1+t_button);
	pop_err();
	return t_;
}
function bb_input_MouseX(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/input.monkey<54>";
	var t_=bb_input_device.p_MouseX();
	pop_err();
	return t_;
}
function bb_autofit_VDeviceWidth(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<206>";
	pop_err();
	return dbg_object(c_VirtualDisplay.m_Display).m_vwidth;
}
function bb_autofit_VMouseX(t_limit){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<188>";
	var t_=c_VirtualDisplay.m_Display.p_VMouseX(t_limit);
	pop_err();
	return t_;
}
function bb_input_MouseY(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/input.monkey<58>";
	var t_=bb_input_device.p_MouseY();
	pop_err();
	return t_;
}
function bb_autofit_VDeviceHeight(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<210>";
	pop_err();
	return dbg_object(c_VirtualDisplay.m_Display).m_vheight;
}
function bb_autofit_VMouseY(t_limit){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<192>";
	var t_=c_VirtualDisplay.m_Display.p_VMouseY(t_limit);
	pop_err();
	return t_;
}
function c_Enumerator2(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator2.m_new=function(t_stack){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<255>";
	dbg_object(this).m_stack=t_stack;
	pop_err();
	return this;
}
c_Enumerator2.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<252>";
	pop_err();
	return this;
}
c_Enumerator2.prototype.p_HasNext=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<259>";
	var t_=this.m_index<this.m_stack.p_Length2();
	pop_err();
	return t_;
}
c_Enumerator2.prototype.p_NextObject=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<263>";
	this.m_index+=1;
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<264>";
	var t_=dbg_array(dbg_object(this.m_stack).m_data,this.m_index-1)[dbg_index];
	pop_err();
	return t_;
}
function bb_lazeng_Round(t_flot){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/lazeng.monkey<39>";
	var t_=Math.floor(t_flot+0.5);
	pop_err();
	return t_;
}
function bb_math_Sgn(t_x){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<41>";
	if(t_x<0){
		err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<41>";
		pop_err();
		return -1;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<42>";
	var t_=((t_x>0)?1:0);
	pop_err();
	return t_;
}
function bb_math_Sgn2(t_x){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<67>";
	if(t_x<0.0){
		err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<67>";
		pop_err();
		return -1.0;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<68>";
	if(t_x>0.0){
		err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<68>";
		pop_err();
		return 1.0;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<69>";
	pop_err();
	return 0.0;
}
function c_NodeEnumerator2(){
	Object.call(this);
	this.m_node=null;
}
c_NodeEnumerator2.m_new=function(t_node){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<437>";
	dbg_object(this).m_node=t_node;
	pop_err();
	return this;
}
c_NodeEnumerator2.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<434>";
	pop_err();
	return this;
}
c_NodeEnumerator2.prototype.p_HasNext=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<441>";
	var t_=this.m_node!=null;
	pop_err();
	return t_;
}
c_NodeEnumerator2.prototype.p_NextObject=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<445>";
	var t_t=this.m_node;
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<446>";
	this.m_node=this.m_node.p_NextNode();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<447>";
	pop_err();
	return t_t;
}
function c_FriendlyProjectile(){
	c_Projectile.call(this);
}
c_FriendlyProjectile.prototype=extend_class(c_Projectile);
c_FriendlyProjectile.m_new=function(t_x,t_y,t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<23>";
	c_Projectile.m_new.call(this,t_x,t_y,t__modifier);
	pop_err();
	return this;
}
c_FriendlyProjectile.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<21>";
	c_Projectile.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<21>";
	pop_err();
	return this;
}
function c_EnemyProjectile(){
	c_Projectile.call(this);
}
c_EnemyProjectile.prototype=extend_class(c_Projectile);
c_EnemyProjectile.m_new=function(t_x,t_y,t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<29>";
	c_Projectile.m_new.call(this,t_x,t_y,t__modifier);
	pop_err();
	return this;
}
c_EnemyProjectile.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<27>";
	c_Projectile.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<27>";
	pop_err();
	return this;
}
function c_AmbiguousProjectile(){
	c_Projectile.call(this);
}
c_AmbiguousProjectile.prototype=extend_class(c_Projectile);
c_AmbiguousProjectile.m_new=function(t_x,t_y,t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<35>";
	c_Projectile.m_new.call(this,t_x,t_y,t__modifier);
	pop_err();
	return this;
}
c_AmbiguousProjectile.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<33>";
	c_Projectile.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projectiles.monkey<33>";
	pop_err();
	return this;
}
function bb_lazeng_Logb(t_b,t_x){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/lazeng.monkey<43>";
	var t_=Math.log(t_x)/Math.log(t_b);
	pop_err();
	return t_;
}
function c_WeapBoomerang(){
	c_Weapon.call(this);
}
c_WeapBoomerang.prototype=extend_class(c_Weapon);
c_WeapBoomerang.m_slot=0;
c_WeapBoomerang.m_new=function(t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<31>";
	c_Weapon.m_new.call(this,t__modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<32>";
	dbg_object(this).m_fireDelay=14;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<33>";
	dbg_object(this).m_isActive=true;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<34>";
	dbg_object(this).m_locX=37.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<35>";
	dbg_object(this).m_locY=0.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<36>";
	dbg_object(this).m_fireKey=4;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<37>";
	dbg_object(this).m_myProjectileManager=dbg_object(c_RogueType.m_Data).m_ambiguousProjectileManager;
	pop_err();
	return this;
}
c_WeapBoomerang.prototype.p_createProjectile=function(t_shotX,t_shotY){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<40>";
	var t_proj=c_ProjBoomerang.m_new.call(new c_ProjBoomerang,(t_shotX),(t_shotY),dbg_object(this).m_modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<41>";
	var t_=(t_proj);
	pop_err();
	return t_;
}
function c_WeapBomb(){
	c_Weapon.call(this);
}
c_WeapBomb.prototype=extend_class(c_Weapon);
c_WeapBomb.m_slot=0;
c_WeapBomb.m_new=function(t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<49>";
	c_Weapon.m_new.call(this,t__modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<51>";
	dbg_object(this).m_fireDelay=120;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<52>";
	dbg_object(this).m_isActive=true;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<53>";
	dbg_object(this).m_locX=50.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<54>";
	dbg_object(this).m_locY=0.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<55>";
	dbg_object(this).m_fireKey=4;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<56>";
	dbg_object(this).m_myProjectileManager=dbg_object(c_RogueType.m_Data).m_ambiguousProjectileManager;
	pop_err();
	return this;
}
c_WeapBomb.prototype.p_createProjectile=function(t_shotX,t_shotY){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<59>";
	var t_proj=c_ProjBomb.m_new.call(new c_ProjBomb,(t_shotX),(t_shotY),dbg_object(this).m_modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<60>";
	var t_=(t_proj);
	pop_err();
	return t_;
}
function c_WeapRing(){
	c_Weapon.call(this);
}
c_WeapRing.prototype=extend_class(c_Weapon);
c_WeapRing.m_slot=0;
c_WeapRing.m_new=function(t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<68>";
	c_Weapon.m_new.call(this,t__modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<70>";
	dbg_object(this).m_fireDelay=50;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<71>";
	dbg_object(this).m_isActive=true;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<72>";
	dbg_object(this).m_locX=32.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<73>";
	dbg_object(this).m_locY=0.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<74>";
	dbg_object(this).m_fireKey=4;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<75>";
	dbg_object(this).m_myProjectileManager=dbg_object(c_RogueType.m_Data).m_friendlyProjectileManager;
	pop_err();
	return this;
}
c_WeapRing.prototype.p_createProjectile=function(t_shotX,t_shotY){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<78>";
	var t_proj=c_ProjRing.m_new.call(new c_ProjRing,(t_shotX),(t_shotY),dbg_object(this).m_modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<79>";
	var t_=(t_proj);
	pop_err();
	return t_;
}
function c_WeapHomingMissile(){
	c_Weapon.call(this);
	this.m_lastShot=null;
}
c_WeapHomingMissile.prototype=extend_class(c_Weapon);
c_WeapHomingMissile.m_slot=0;
c_WeapHomingMissile.m_new=function(t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<88>";
	c_Weapon.m_new.call(this,t__modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<90>";
	dbg_object(this).m_fireDelay=220;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<91>";
	dbg_object(this).m_isActive=true;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<92>";
	dbg_object(this).m_locX=0.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<93>";
	dbg_object(this).m_locY=22.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<94>";
	dbg_object(this).m_fireKey=4;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<95>";
	dbg_object(this).m_myProjectileManager=dbg_object(c_RogueType.m_Data).m_friendlyProjectileManager;
	pop_err();
	return this;
}
c_WeapHomingMissile.prototype.p_createProjectile=function(t_shotX,t_shotY){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<98>";
	var t_proj=c_ProjHomingMissile.m_new.call(new c_ProjHomingMissile,(t_shotX),(t_shotY),dbg_object(this).m_modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<99>";
	this.m_lastShot=t_proj;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<100>";
	var t_=(t_proj);
	pop_err();
	return t_;
}
c_WeapHomingMissile.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<103>";
	c_Weapon.prototype.p_update.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<105>";
	if(this.m_lastShot!=null){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<106>";
		if(dbg_object(this.m_lastShot).m_isDead){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<107>";
			this.m_lastShot=null;
		}
	}
	pop_err();
	return 0;
}
c_WeapHomingMissile.prototype.p_timerAction=function(t_whichTimer){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<112>";
	var t_1=t_whichTimer;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<113>";
	if(t_1==0){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<114>";
		if(this.m_lastShot==null){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<115>";
			c_Weapon.prototype.p_timerAction.call(this,0);
		}else{
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<117>";
			this.p_setTimer(0,2);
		}
	}
	pop_err();
	return 0;
}
function c_WeapTailShot(){
	c_Weapon.call(this);
}
c_WeapTailShot.prototype=extend_class(c_Weapon);
c_WeapTailShot.m_slot=0;
c_WeapTailShot.m_new=function(t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<127>";
	c_Weapon.m_new.call(this,t__modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<128>";
	dbg_object(this).m_fireDelay=134-dbg_object(this).m_modifier*20;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<129>";
	dbg_object(this).m_isActive=true;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<130>";
	dbg_object(this).m_locX=-32.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<131>";
	dbg_object(this).m_locY=0.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<132>";
	dbg_object(this).m_fireKey=4;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<133>";
	dbg_object(this).m_myProjectileManager=dbg_object(c_RogueType.m_Data).m_friendlyProjectileManager;
	pop_err();
	return this;
}
c_WeapTailShot.prototype.p_createProjectile=function(t_shotX,t_shotY){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<136>";
	var t_proj=c_ProjTailShot.m_new.call(new c_ProjTailShot,(t_shotX),(t_shotY),dbg_object(this).m_modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<137>";
	var t_=(t_proj);
	pop_err();
	return t_;
}
function c_WeapSpiral(){
	c_Weapon.call(this);
}
c_WeapSpiral.prototype=extend_class(c_Weapon);
c_WeapSpiral.m_slot=0;
c_WeapSpiral.m_new=function(t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<146>";
	c_Weapon.m_new.call(this,t__modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<147>";
	dbg_object(this).m_fireDelay=60;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<148>";
	dbg_object(this).m_isActive=true;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<149>";
	dbg_object(this).m_locX=37.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<150>";
	dbg_object(this).m_locY=0.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<151>";
	dbg_object(this).m_fireKey=4;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<152>";
	dbg_object(this).m_myProjectileManager=dbg_object(c_RogueType.m_Data).m_ambiguousProjectileManager;
	pop_err();
	return this;
}
c_WeapSpiral.prototype.p_createProjectile=function(t_shotX,t_shotY){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<156>";
	var t_proj=c_ProjSpiral.m_new.call(new c_ProjSpiral,(t_shotX),(t_shotY),dbg_object(this).m_modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<157>";
	var t_=(t_proj);
	pop_err();
	return t_;
}
c_WeapSpiral.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/weapdefs.monkey<161>";
	c_Weapon.prototype.p_update.call(this);
	pop_err();
	return 0;
}
function bb_powerup_updatePowerup(t__key){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<123>";
	var t_1=t__key;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<124>";
	if(t_1=="SpeedUp" || t_1=="SpeedDown"){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<125>";
		var t__totalSpeedModifier=(dbg_object(dbg_object(c_RogueType.m_Data).m_powerupInfo.p_Get2("SpeedUp")).m_currentValue-dbg_object(dbg_object(c_RogueType.m_Data).m_powerupInfo.p_Get2("SpeedDown")).m_currentValue);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<126>";
		dbg_object(dbg_object(c_RogueType.m_Data).m_player).m_moveSpeed=dbg_object(dbg_object(c_RogueType.m_Data).m_player).m_baseSpeed+bb_math_Sgn2(t__totalSpeedModifier)*bb_lazeng_Logb(2,1.0+bb_math_Abs2(t__totalSpeedModifier))/2.0;
	}else{
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<128>";
		if(t_1=="Boomerang"){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<129>";
			dbg_object(dbg_object(c_RogueType.m_Data).m_player).m_weapons.p_Set6(c_WeapBoomerang.m_slot,(c_WeapBoomerang.m_new.call(new c_WeapBoomerang,dbg_object(dbg_object(c_RogueType.m_Data).m_powerupInfo.p_Get2("Boomerang")).m_currentValue)));
		}else{
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<131>";
			if(t_1=="Bomb"){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<133>";
				dbg_object(dbg_object(c_RogueType.m_Data).m_player).m_weapons.p_Set6(c_WeapBomb.m_slot,(c_WeapBomb.m_new.call(new c_WeapBomb,dbg_object(dbg_object(c_RogueType.m_Data).m_powerupInfo.p_Get2("Bomb")).m_currentValue)));
			}else{
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<134>";
				if(t_1=="Ring"){
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<135>";
					dbg_object(dbg_object(c_RogueType.m_Data).m_player).m_weapons.p_Set6(c_WeapRing.m_slot,(c_WeapRing.m_new.call(new c_WeapRing,dbg_object(dbg_object(c_RogueType.m_Data).m_powerupInfo.p_Get2("Ring")).m_currentValue)));
				}else{
					err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<136>";
					if(t_1=="HomingMissile"){
						err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<137>";
						dbg_object(dbg_object(c_RogueType.m_Data).m_player).m_weapons.p_Set6(c_WeapHomingMissile.m_slot,(c_WeapHomingMissile.m_new.call(new c_WeapHomingMissile,dbg_object(dbg_object(c_RogueType.m_Data).m_powerupInfo.p_Get2("HomingMissile")).m_currentValue)));
					}else{
						err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<138>";
						if(t_1=="TailShot"){
							err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<139>";
							dbg_object(dbg_object(c_RogueType.m_Data).m_player).m_weapons.p_Set6(c_WeapTailShot.m_slot,(c_WeapTailShot.m_new.call(new c_WeapTailShot,dbg_object(dbg_object(c_RogueType.m_Data).m_powerupInfo.p_Get2("TailShot")).m_currentValue)));
						}else{
							err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<140>";
							if(t_1=="Spiral"){
								err_info="/Applications/MonkeyX77a/LazarDev/RogueType/powerup.monkey<141>";
								dbg_object(dbg_object(c_RogueType.m_Data).m_player).m_weapons.p_Set6(c_WeapSpiral.m_slot,(c_WeapSpiral.m_new.call(new c_WeapSpiral,dbg_object(dbg_object(c_RogueType.m_Data).m_powerupInfo.p_Get2("Spiral")).m_currentValue)));
							}
						}
					}
				}
			}
		}
	}
	pop_err();
	return 0;
}
function bb_math_Min(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<51>";
	if(t_x<t_y){
		err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<51>";
		pop_err();
		return t_x;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<52>";
	pop_err();
	return t_y;
}
function bb_math_Min2(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<78>";
	if(t_x<t_y){
		err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<78>";
		pop_err();
		return t_x;
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/math.monkey<79>";
	pop_err();
	return t_y;
}
function bb_graphics_DebugRenderDevice(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<49>";
	if(!((bb_graphics_renderDevice)!=null)){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<49>";
		error("Rendering operations can only be performed inside OnRender");
	}
	pop_err();
	return 0;
}
function bb_graphics_Cls(t_r,t_g,t_b){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<376>";
	bb_graphics_DebugRenderDevice();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<378>";
	bb_graphics_renderDevice.Cls(t_r,t_g,t_b);
	pop_err();
	return 0;
}
function bb_graphics_Transform(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<353>";
	var t_ix2=t_ix*dbg_object(bb_graphics_context).m_ix+t_iy*dbg_object(bb_graphics_context).m_jx;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<354>";
	var t_iy2=t_ix*dbg_object(bb_graphics_context).m_iy+t_iy*dbg_object(bb_graphics_context).m_jy;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<355>";
	var t_jx2=t_jx*dbg_object(bb_graphics_context).m_ix+t_jy*dbg_object(bb_graphics_context).m_jx;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<356>";
	var t_jy2=t_jx*dbg_object(bb_graphics_context).m_iy+t_jy*dbg_object(bb_graphics_context).m_jy;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<357>";
	var t_tx2=t_tx*dbg_object(bb_graphics_context).m_ix+t_ty*dbg_object(bb_graphics_context).m_jx+dbg_object(bb_graphics_context).m_tx;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<358>";
	var t_ty2=t_tx*dbg_object(bb_graphics_context).m_iy+t_ty*dbg_object(bb_graphics_context).m_jy+dbg_object(bb_graphics_context).m_ty;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<359>";
	bb_graphics_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
	pop_err();
	return 0;
}
function bb_graphics_Transform2(t_m){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<349>";
	bb_graphics_Transform(dbg_array(t_m,0)[dbg_index],dbg_array(t_m,1)[dbg_index],dbg_array(t_m,2)[dbg_index],dbg_array(t_m,3)[dbg_index],dbg_array(t_m,4)[dbg_index],dbg_array(t_m,5)[dbg_index]);
	pop_err();
	return 0;
}
function bb_graphics_Scale(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<367>";
	bb_graphics_Transform(t_x,0.0,0.0,t_y,0.0,0.0);
	pop_err();
	return 0;
}
function bb_graphics_Translate(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<363>";
	bb_graphics_Transform(1.0,0.0,0.0,1.0,t_x,t_y);
	pop_err();
	return 0;
}
function bb_autofit_UpdateVirtualDisplay(t_zoomborders,t_keepborders){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<171>";
	c_VirtualDisplay.m_Display.p_UpdateVirtualDisplay(t_zoomborders,t_keepborders);
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<172>";
	pop_err();
	return 0;
}
function bb_graphics_PushMatrix(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<332>";
	var t_sp=dbg_object(bb_graphics_context).m_matrixSp;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<333>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+0)[dbg_index]=dbg_object(bb_graphics_context).m_ix
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<334>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+1)[dbg_index]=dbg_object(bb_graphics_context).m_iy
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<335>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+2)[dbg_index]=dbg_object(bb_graphics_context).m_jx
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<336>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+3)[dbg_index]=dbg_object(bb_graphics_context).m_jy
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<337>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+4)[dbg_index]=dbg_object(bb_graphics_context).m_tx
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<338>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+5)[dbg_index]=dbg_object(bb_graphics_context).m_ty
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<339>";
	dbg_object(bb_graphics_context).m_matrixSp=t_sp+6;
	pop_err();
	return 0;
}
function bb_graphics_DrawImage(t_image,t_x,t_y,t_frame){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<449>";
	bb_graphics_DebugRenderDevice();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<450>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<450>";
		error("Invalid image frame");
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<453>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<455>";
	bb_graphics_context.p_Validate();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<457>";
	if((dbg_object(t_image).m_flags&65536)!=0){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<458>";
		bb_graphics_renderDevice.DrawSurface(dbg_object(t_image).m_surface,t_x-dbg_object(t_image).m_tx,t_y-dbg_object(t_image).m_ty);
	}else{
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<460>";
		bb_graphics_renderDevice.DrawSurface2(dbg_object(t_image).m_surface,t_x-dbg_object(t_image).m_tx,t_y-dbg_object(t_image).m_ty,dbg_object(t_f).m_x,dbg_object(t_f).m_y,dbg_object(t_image).m_width,dbg_object(t_image).m_height);
	}
	pop_err();
	return 0;
}
function bb_graphics_Rotate(t_angle){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<371>";
	bb_graphics_Transform(Math.cos((t_angle)*D2R),-Math.sin((t_angle)*D2R),Math.sin((t_angle)*D2R),Math.cos((t_angle)*D2R),0.0,0.0);
	pop_err();
	return 0;
}
function bb_graphics_PopMatrix(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<343>";
	var t_sp=dbg_object(bb_graphics_context).m_matrixSp-6;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<344>";
	bb_graphics_SetMatrix(dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+0)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+1)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+2)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+3)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+4)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+5)[dbg_index]);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<345>";
	dbg_object(bb_graphics_context).m_matrixSp=t_sp;
	pop_err();
	return 0;
}
function bb_graphics_DrawImage2(t_image,t_x,t_y,t_rotation,t_scaleX,t_scaleY,t_frame){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<467>";
	bb_graphics_DebugRenderDevice();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<468>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<468>";
		error("Invalid image frame");
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<471>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<473>";
	bb_graphics_PushMatrix();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<475>";
	bb_graphics_Translate(t_x,t_y);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<476>";
	bb_graphics_Rotate(t_rotation);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<477>";
	bb_graphics_Scale(t_scaleX,t_scaleY);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<479>";
	bb_graphics_Translate(-dbg_object(t_image).m_tx,-dbg_object(t_image).m_ty);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<481>";
	bb_graphics_context.p_Validate();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<483>";
	if((dbg_object(t_image).m_flags&65536)!=0){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<484>";
		bb_graphics_renderDevice.DrawSurface(dbg_object(t_image).m_surface,0.0,0.0);
	}else{
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<486>";
		bb_graphics_renderDevice.DrawSurface2(dbg_object(t_image).m_surface,0.0,0.0,dbg_object(t_f).m_x,dbg_object(t_f).m_y,dbg_object(t_image).m_width,dbg_object(t_image).m_height);
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<489>";
	bb_graphics_PopMatrix();
	pop_err();
	return 0;
}
function bb_graphics_DrawText(t_text,t_x,t_y,t_xalign,t_yalign){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<574>";
	bb_graphics_DebugRenderDevice();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<576>";
	if(!((dbg_object(bb_graphics_context).m_font)!=null)){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<576>";
		pop_err();
		return 0;
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<578>";
	var t_w=dbg_object(bb_graphics_context).m_font.p_Width();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<579>";
	var t_h=dbg_object(bb_graphics_context).m_font.p_Height();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<581>";
	t_x-=Math.floor((t_w*t_text.length)*t_xalign);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<582>";
	t_y-=Math.floor((t_h)*t_yalign);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<584>";
	for(var t_i=0;t_i<t_text.length;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<585>";
		var t_ch=dbg_charCodeAt(t_text,t_i)-dbg_object(bb_graphics_context).m_firstChar;
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<586>";
		if(t_ch>=0 && t_ch<dbg_object(bb_graphics_context).m_font.p_Frames()){
			err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<587>";
			bb_graphics_DrawImage(dbg_object(bb_graphics_context).m_font,t_x+(t_i*t_w),t_y,t_ch);
		}
	}
	pop_err();
	return 0;
}
function c_Enumerator3(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator3.m_new=function(t_stack){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<255>";
	dbg_object(this).m_stack=t_stack;
	pop_err();
	return this;
}
c_Enumerator3.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<252>";
	pop_err();
	return this;
}
c_Enumerator3.prototype.p_HasNext=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<259>";
	var t_=this.m_index<this.m_stack.p_Length2();
	pop_err();
	return t_;
}
c_Enumerator3.prototype.p_NextObject=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<263>";
	this.m_index+=1;
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<264>";
	var t_=dbg_array(dbg_object(this.m_stack).m_data,this.m_index-1)[dbg_index];
	pop_err();
	return t_;
}
function c_Enumerator4(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator4.m_new=function(t_stack){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<255>";
	dbg_object(this).m_stack=t_stack;
	pop_err();
	return this;
}
c_Enumerator4.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<252>";
	pop_err();
	return this;
}
c_Enumerator4.prototype.p_HasNext=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<259>";
	var t_=this.m_index<this.m_stack.p_Length2();
	pop_err();
	return t_;
}
c_Enumerator4.prototype.p_NextObject=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<263>";
	this.m_index+=1;
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<264>";
	var t_=dbg_array(dbg_object(this.m_stack).m_data,this.m_index-1)[dbg_index];
	pop_err();
	return t_;
}
function c_Enumerator5(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator5.m_new=function(t_stack){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<255>";
	dbg_object(this).m_stack=t_stack;
	pop_err();
	return this;
}
c_Enumerator5.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<252>";
	pop_err();
	return this;
}
c_Enumerator5.prototype.p_HasNext=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<259>";
	var t_=this.m_index<this.m_stack.p_Length2();
	pop_err();
	return t_;
}
c_Enumerator5.prototype.p_NextObject=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<263>";
	this.m_index+=1;
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<264>";
	var t_=dbg_array(dbg_object(this.m_stack).m_data,this.m_index-1)[dbg_index];
	pop_err();
	return t_;
}
function c_Enumerator6(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator6.m_new=function(t_stack){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<255>";
	dbg_object(this).m_stack=t_stack;
	pop_err();
	return this;
}
c_Enumerator6.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<252>";
	pop_err();
	return this;
}
c_Enumerator6.prototype.p_HasNext=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<259>";
	var t_=this.m_index<this.m_stack.p_Length2();
	pop_err();
	return t_;
}
c_Enumerator6.prototype.p_NextObject=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<263>";
	this.m_index+=1;
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<264>";
	var t_=dbg_array(dbg_object(this.m_stack).m_data,this.m_index-1)[dbg_index];
	pop_err();
	return t_;
}
function c_Enumerator7(){
	Object.call(this);
	this.m_stack=null;
	this.m_index=0;
}
c_Enumerator7.m_new=function(t_stack){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<255>";
	dbg_object(this).m_stack=t_stack;
	pop_err();
	return this;
}
c_Enumerator7.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<252>";
	pop_err();
	return this;
}
c_Enumerator7.prototype.p_HasNext=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<259>";
	var t_=this.m_index<this.m_stack.p_Length2();
	pop_err();
	return t_;
}
c_Enumerator7.prototype.p_NextObject=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<263>";
	this.m_index+=1;
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<264>";
	var t_=dbg_array(dbg_object(this.m_stack).m_data,this.m_index-1)[dbg_index];
	pop_err();
	return t_;
}
function c_ProjStock(){
	c_FriendlyProjectile.call(this);
}
c_ProjStock.prototype=extend_class(c_FriendlyProjectile);
c_ProjStock.m_new=function(t_x,t_y,t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<8>";
	c_FriendlyProjectile.m_new.call(this,t_x,t_y,0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<9>";
	dbg_object(this).m_modifier=(t__modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<10>";
	dbg_object(this).m_strength=1;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<11>";
	dbg_object(this).m_vel.p_speed2(15.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<12>";
	dbg_object(this).m_vel.p_direction2(0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<13>";
	this.p_HP(1.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<14>";
	dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprProjStock.png"));
	pop_err();
	return this;
}
c_ProjStock.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<5>";
	c_FriendlyProjectile.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<5>";
	pop_err();
	return this;
}
function c_ProjEnemyStock(){
	c_EnemyProjectile.call(this);
}
c_ProjEnemyStock.prototype=extend_class(c_EnemyProjectile);
c_ProjEnemyStock.m_new=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projenemydefs.monkey<7>";
	c_EnemyProjectile.m_new.call(this,t_x,t_y,0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projenemydefs.monkey<8>";
	dbg_object(this).m_strength=1;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projenemydefs.monkey<9>";
	dbg_object(this).m_vel.p_speed2(15.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projenemydefs.monkey<10>";
	this.p_HP(1.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projenemydefs.monkey<11>";
	dbg_object(this).m_vel.p_direction2(0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projenemydefs.monkey<12>";
	dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprProjStock.png"));
	pop_err();
	return this;
}
c_ProjEnemyStock.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projenemydefs.monkey<4>";
	c_EnemyProjectile.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projenemydefs.monkey<4>";
	pop_err();
	return this;
}
function c_EnemyFromSpawn(){
	c_EnemyShip.call(this);
}
c_EnemyFromSpawn.prototype=extend_class(c_EnemyShip);
c_EnemyFromSpawn.m_new=function(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<9>";
	c_EnemyShip.m_new.call(this,t_x,t_y);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<10>";
	dbg_object(this).m_points=1;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<11>";
	dbg_object(this).m_maxHP=1.0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<12>";
	this.p_HP(1.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<13>";
	dbg_object(this).m_vel.p_speed2(4.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<14>";
	dbg_object(this).m_vel.p_direction2(270.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<15>";
	dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprEnemy1L1.png"));
	pop_err();
	return this;
}
c_EnemyFromSpawn.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<6>";
	c_EnemyShip.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<6>";
	pop_err();
	return this;
}
c_EnemyFromSpawn.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<22>";
	if(!dbg_object(c_RogueType.m_Data).m_camera.p_intersects(this.p_cMask())){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<23>";
		this.p_HP(-1.1);
	}else{
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<26>";
		c_EnemyShip.prototype.p_update.call(this);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<28>";
		var t_choose=((Math.floor(bb_random_Rnd3(400.0)))|0);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<29>";
		if(t_choose==1){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<30>";
			var t_proj=(c_ProjEnemyStock.m_new.call(new c_ProjEnemyStock,dbg_object(this).m_pos.p_x2(),dbg_object(this).m_pos.p_y2()));
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<31>";
			dbg_object(t_proj).m_vel.p_direction2(bb_random_Rnd3(360.0));
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<32>";
			dbg_object(t_proj).m_vel.p_speed2(3.5);
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<33>";
			dbg_object(t_proj).m_strength=1;
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<34>";
			dbg_object(c_RogueType.m_Data).m_enemyProjectileManager.p_add2(t_proj);
		}
	}
	pop_err();
	return 0;
}
c_EnemyFromSpawn.prototype.p_draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/enemyfromspawn.monkey<42>";
	c_Ship.prototype.p_draw.call(this);
	pop_err();
	return 0;
}
function c_ProjBoomerang(){
	c_AmbiguousProjectile.call(this);
}
c_ProjBoomerang.prototype=extend_class(c_AmbiguousProjectile);
c_ProjBoomerang.m_new=function(t_x,t_y,t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<24>";
	c_AmbiguousProjectile.m_new.call(this,t_x,t_y,0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<25>";
	dbg_object(this).m_modifier=(t__modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<26>";
	dbg_object(this).m_strength=((dbg_object(this).m_modifier+1.0)|0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<27>";
	dbg_object(this).m_vel.p_x(15.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<28>";
	dbg_object(this).m_vel.p_y(dbg_object(dbg_object(c_RogueType.m_Data).m_player).m_vel.p_y2());
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<29>";
	this.p_HP(1.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<30>";
	dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprProjStock.png"));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<33>";
	this.p_setTimer(0,5);
	pop_err();
	return this;
}
c_ProjBoomerang.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<21>";
	c_AmbiguousProjectile.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<21>";
	pop_err();
	return this;
}
c_ProjBoomerang.prototype.p_timerAction=function(t_whichTimer){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<36>";
	var t_1=t_whichTimer;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<37>";
	if(t_1==0){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<38>";
		dbg_object(this).m_vel.p_x(dbg_object(this).m_vel.p_x2()-1.0-dbg_object(this).m_modifier*.2);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<39>";
		this.p_setTimer(0,5);
	}
	pop_err();
	return 0;
}
function c_ProjBomb(){
	c_AmbiguousProjectile.call(this);
	this.m_hasCollided=false;
}
c_ProjBomb.prototype=extend_class(c_AmbiguousProjectile);
c_ProjBomb.m_new=function(t_x,t_y,t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<51>";
	c_AmbiguousProjectile.m_new.call(this,t_x,t_y,0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<52>";
	dbg_object(this).m_modifier=(t__modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<53>";
	dbg_object(this).m_strength=0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<54>";
	dbg_object(this).m_vel.p_x(12.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<55>";
	dbg_object(this).m_vel.p_y(0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<56>";
	this.p_HP(1.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<57>";
	dbg_object(this).m_hasCollided=false;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<58>";
	dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprProjBomb.png"));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<61>";
	this.p_setTimer(0,40);
	pop_err();
	return this;
}
c_ProjBomb.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<48>";
	c_AmbiguousProjectile.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<48>";
	pop_err();
	return this;
}
c_ProjBomb.prototype.p_kill=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<72>";
	if(!dbg_object(this).m_hasCollided){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<73>";
		dbg_object(this).m_strength=4;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<74>";
		dbg_object(this).m_vel.p_speed2(0.0);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<75>";
		dbg_object(this).m_hasCollided=true;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<76>";
		this.p_setTimer(0,-1);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<77>";
		this.p_setTimer(1,30);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<78>";
		this.p_HP(10000.0);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<79>";
		dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprProjBombExplode.png"));
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<80>";
		dbg_object(this).m_sprite.p_xScale2(1.0+(dbg_object(this).m_modifier-1.0)/3.0);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<81>";
		dbg_object(this).m_sprite.p_yScale(1.0+(dbg_object(this).m_modifier-1.0)/3.0);
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<83>";
		dbg_object(dbg_object(this).m_sprite).m_animations.p_Get2("allFrames").p_fps2(30);
	}else{
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<86>";
		dbg_object(this).m_isDead=true;
	}
	pop_err();
	return 0;
}
c_ProjBomb.prototype.p_timerAction=function(t_whichTimer){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<64>";
	var t_2=t_whichTimer;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<65>";
	if(t_2==0){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<66>";
		this.p_kill();
	}else{
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<67>";
		if(t_2==1){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<68>";
			this.p_kill();
		}
	}
	pop_err();
	return 0;
}
function c_ProjRing(){
	c_FriendlyProjectile.call(this);
}
c_ProjRing.prototype=extend_class(c_FriendlyProjectile);
c_ProjRing.m_new=function(t_x,t_y,t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<94>";
	c_FriendlyProjectile.m_new.call(this,t_x,t_y,0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<95>";
	dbg_object(this).m_modifier=(t__modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<96>";
	dbg_object(this).m_strength=1;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<97>";
	dbg_object(this).m_vel.p_x(15.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<98>";
	dbg_object(this).m_vel.p_y(0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<99>";
	this.p_HP(1.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<100>";
	dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprProjRing.png"));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<101>";
	dbg_object(dbg_object(this).m_sprite).m_animations.p_Get2("allFrames").p_fps2(30);
	pop_err();
	return this;
}
c_ProjRing.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<91>";
	c_FriendlyProjectile.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<91>";
	pop_err();
	return this;
}
c_ProjRing.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<106>";
	var t_xMod=.0125;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<107>";
	var t_yMod=.05;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<108>";
	t_xMod=t_xMod*Math.sqrt(dbg_object(this).m_modifier+2.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<109>";
	t_yMod=t_yMod*Math.sqrt(dbg_object(this).m_modifier+2.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<111>";
	dbg_object(this).m_sprite.p_xScale2(dbg_object(this).m_sprite.p_xScale()+t_xMod);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<112>";
	dbg_object(this).m_sprite.p_yScale(dbg_object(this).m_sprite.p_yScale2()+t_yMod);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<113>";
	c_Projectile.prototype.p_update.call(this);
	pop_err();
	return 0;
}
function c_ProjHomingMissile(){
	c_FriendlyProjectile.call(this);
}
c_ProjHomingMissile.prototype=extend_class(c_FriendlyProjectile);
c_ProjHomingMissile.m_new=function(t_x,t_y,t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<122>";
	c_FriendlyProjectile.m_new.call(this,t_x,t_y,0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<123>";
	dbg_object(this).m_modifier=(t__modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<124>";
	dbg_object(this).m_strength=0;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<125>";
	dbg_object(this).m_vel.p_x(0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<126>";
	dbg_object(this).m_vel.p_y(5.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<127>";
	this.p_HP(1.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<128>";
	dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprProjHomingMissile.png"));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<129>";
	dbg_object(dbg_object(this).m_sprite).m_animations.p_Get2("allFrames").p_fps2(30);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<130>";
	this.p_setTimer(2,10);
	pop_err();
	return this;
}
c_ProjHomingMissile.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<119>";
	c_FriendlyProjectile.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<119>";
	pop_err();
	return this;
}
c_ProjHomingMissile.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<135>";
	c_Projectile.prototype.p_update.call(this);
	pop_err();
	return 0;
}
c_ProjHomingMissile.prototype.p_timerAction=function(t_whichTimer){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<138>";
	var t_3=t_whichTimer;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<139>";
	if(t_3==0){
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<141>";
		var t_distSqPrev=.0;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<142>";
		var t__enemyNearest=null;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<143>";
		var t__count=0;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<144>";
		var t_firstTime=true;
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<145>";
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<145>";
		var t_=dbg_object(dbg_object(c_RogueType.m_Data).m_shipManager).m_items.p_ObjectEnumerator();
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<145>";
		while(t_.p_HasNext()){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<145>";
			var t__enemy=t_.p_NextObject();
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<147>";
			var t_distSqCurr=dbg_object(this).m_pos.p_distanceFromSq(dbg_object(t__enemy).m_pos);
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<150>";
			if(t_firstTime){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<151>";
				t_distSqPrev=t_distSqCurr+1.0;
			}
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<153>";
			if(t_distSqCurr<t_distSqPrev){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<154>";
				t__enemyNearest=(t__enemy);
			}
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<157>";
			var t_distSqPrev2=t_distSqCurr;
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<158>";
			if(t_firstTime){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<159>";
				t_firstTime=false;
			}
		}
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<163>";
		if(t__enemyNearest!=null){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<164>";
			if((dbg_object(c_RogueType.m_Data).m_camera.p_contains(t__enemyNearest))!=0){
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<165>";
				var t_tVect=c_Vector.m_new.call(new c_Vector,dbg_object(t__enemyNearest).m_pos.p_x2()-dbg_object(this).m_pos.p_x2(),dbg_object(this).m_pos.p_y2()-dbg_object(t__enemyNearest).m_pos.p_y2());
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<166>";
				dbg_object(this).m_vel.p_direction2(t_tVect.p_angle());
			}else{
				err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<168>";
				dbg_object(this).m_vel.p_direction2(0.0);
			}
		}else{
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<171>";
			dbg_object(this).m_vel.p_direction2(0.0);
		}
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<173>";
		this.p_setTimer(0,200);
	}else{
		err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<174>";
		if(t_3==2){
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<175>";
			dbg_object(this).m_vel.p_direction2(0.0);
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<176>";
			dbg_object(this).m_vel.p_speed2(12.0);
			err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<177>";
			this.p_setTimer(0,30);
		}
	}
	pop_err();
	return 0;
}
function c_ProjTailShot(){
	c_FriendlyProjectile.call(this);
}
c_ProjTailShot.prototype=extend_class(c_FriendlyProjectile);
c_ProjTailShot.m_new=function(t_x,t_y,t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<188>";
	c_FriendlyProjectile.m_new.call(this,t_x,t_y,0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<189>";
	dbg_object(this).m_modifier=(t__modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<190>";
	dbg_object(this).m_strength=1;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<191>";
	dbg_object(this).m_vel.p_x(-15.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<192>";
	dbg_object(this).m_vel.p_y(0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<193>";
	this.p_HP(1.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<194>";
	dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprProjTailShot.png"));
	pop_err();
	return this;
}
c_ProjTailShot.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<185>";
	c_FriendlyProjectile.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<185>";
	pop_err();
	return this;
}
function c_ProjSpiral(){
	c_AmbiguousProjectile.call(this);
	this.m_xStart=.0;
	this.m_yStart=.0;
}
c_ProjSpiral.prototype=extend_class(c_AmbiguousProjectile);
c_ProjSpiral.m_new=function(t_x,t_y,t__modifier){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<203>";
	c_AmbiguousProjectile.m_new.call(this,t_x,t_y,0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<204>";
	dbg_object(this).m_modifier=(t__modifier);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<205>";
	dbg_object(this).m_strength=1;
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<206>";
	dbg_object(this).m_vel.p_x(15.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<207>";
	dbg_object(this).m_vel.p_y(0.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<208>";
	this.p_HP(1.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<209>";
	dbg_object(this).m_sprite=c_Sprite.m_new.call(new c_Sprite,dbg_object(c_RogueType.m_Data).m_assetManager.p_getImage("sprProjSpiral.png"));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<210>";
	dbg_object(this).m_sprite.p_addAnimation(c_Animation.m_new.call(new c_Animation,"debug",0,1,2));
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<211>";
	dbg_object(this).m_sprite.p_setAnimation("debug");
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<212>";
	dbg_object(this).m_xStart=dbg_object(this).m_pos.p_x2();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<213>";
	dbg_object(this).m_yStart=dbg_object(this).m_pos.p_y2();
	pop_err();
	return this;
}
c_ProjSpiral.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<198>";
	c_AmbiguousProjectile.m_new2.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<198>";
	pop_err();
	return this;
}
c_ProjSpiral.prototype.p_update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<217>";
	var t_theta=(Math.atan2(dbg_object(this).m_yStart-dbg_object(this).m_pos.p_y2(),dbg_object(this).m_pos.p_x2()-dbg_object(this).m_xStart)*R2D);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<218>";
	dbg_object(this).m_vel.p_direction2(t_theta+90.0);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<219>";
	dbg_object(this).m_vel.p_speed2(dbg_object(this).m_vel.p_speed()+.1);
	err_info="/Applications/MonkeyX77a/LazarDev/RogueType/projdefs.monkey<221>";
	c_Projectile.prototype.p_update.call(this);
	pop_err();
	return 0;
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
	bb_graphics_renderDevice=null;
	bb_app__updateRate=0;
	bb_random_Seed=1234;
	c_VirtualDisplay.m_Display=null;
	c_RogueType.m_Data=null;
	c_Stack6.m_NIL=null;
	c_Stack.m_NIL=null;
	c_Stack2.m_NIL=null;
	c_Stack3.m_NIL=null;
	c_Stack4.m_NIL=null;
	c_Stack5.m_NIL=null;
	c_Stack7.m_NIL=null;
	c_WeapBoomerang.m_slot=0;
	c_WeapBomb.m_slot=100;
	c_WeapRing.m_slot=101;
	c_WeapHomingMissile.m_slot=102;
	c_WeapTailShot.m_slot=103;
	c_WeapSpiral.m_slot=0;
}
//${TRANSCODE_END}
