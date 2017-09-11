
//Change this to true for a stretchy canvas!
//
var RESIZEABLE_CANVAS=true;

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
CFG_BRL_DATABUFFER_IMPLEMENTED="1";
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
CFG_TEXT_FILES="*.txt|*.ini;*.ttf";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[endScene.png];type=image/png;width=2560;height=720;\n[family1Large.png];type=image/png;width=216;height=432;\n[family2Large.png];type=image/png;width=216;height=432;\n[family3Large.png];type=image/png;width=216;height=432;\n[family4Large.png];type=image/png;width=216;height=432;\n[sprCar4_DavidLarge.png];type=image/png;width=480;height=120;\n[sprCar5_David.png];type=image/png;width=480;height=120;\n[sprCar6_David.png];type=image/png;width=480;height=120;\n[sprCar7_David.png];type=image/png;width=480;height=120;\n[sprCar8_David.png];type=image/png;width=480;height=120;\n[sprCar9_David.png];type=image/png;width=480;height=120;\n[sprExplosionLarge.png];type=image/png;width=960;height=480;\n[sprSalesmanLarge.png];type=image/png;width=1440;height=576;\n[sprSootLarge.png];type=image/png;width=240;height=120;\n[mojo_font.png];type=image/png;width=864;height=13;\n";
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
function c_LDJAM33(){
	c_App.call(this);
	this.m_assetManager=null;
	this.m_controller=null;
	this.m_yesNoButtons=new_object_array(4);
	this.m_state=0;
	this.m_dealerImage=null;
	this.m_dealerAnimations=new_object_array(4);
	this.m_endSceneAnimations=new_object_array(2);
	this.m_endSceneImage=null;
	this.m_explosionImage=null;
	this.m_explosionAnimation=null;
	this.m_explosionSound=null;
	this.m_sootImage=null;
	this.m_tapLoc=null;
	this.m_currentTimer=null;
	this.m_profit=0;
	this.m_casualties=0;
	this.m_sales=0;
	this.m_day=0;
	this.m_currentDealerAnimation=null;
	this.m_currentEndSceneAnimation=null;
	this.m_family=null;
	this.m_car=new_object_array(3);
	this.m_currentCar=null;
	this.m_madeTheSale=false;
	this.m_theyAreNowDead=false;
	this.m_doTheyDie=false;
	this.m_firstPrint=true;
}
c_LDJAM33.prototype=extend_class(c_App);
c_LDJAM33.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<42>";
	c_App.m_new.call(this);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<42>";
	pop_err();
	return this;
}
c_LDJAM33.prototype.p_OnCreate=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<77>";
	bb_app_SetUpdateRate(60);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<78>";
	bb_random_Seed=diddy.systemMillisecs();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<80>";
	bb_SalesOfADeathman_TitleFont=c_TFont.m_new.call(new c_TFont,"joystix monospace.ttf",50,[255,0,0]);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<81>";
	bb_SalesOfADeathman_MenuFont=c_TFont.m_new.call(new c_TFont,"joystix monospace.ttf",25,[162,255,243]);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<82>";
	bb_SalesOfADeathman_FamilyFont=c_TFont.m_new.call(new c_TFont,"joystix monospace.ttf",25,[0,0,255]);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<83>";
	bb_SalesOfADeathman_DealerFont=c_TFont.m_new.call(new c_TFont,"joystix monospace.ttf",25,[73,89,0]);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<84>";
	bb_SalesOfADeathman_TapFont=c_TFont.m_new.call(new c_TFont,"joystix monospace.ttf",25,[255,255,0]);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<87>";
	dbg_object(this).m_assetManager=c_AssetManager.m_new.call(new c_AssetManager,false);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<89>";
	dbg_object(this).m_controller=c_Controller.m_new.call(new c_Controller,0);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<91>";
	bb_random_Seed=diddy.systemMillisecs();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<94>";
	dbg_array(dbg_object(this).m_yesNoButtons,0)[dbg_index]=c_Rect.m_new.call(new c_Rect,c_Vector.m_new.call(new c_Vector,700.0,275.0),c_Vector.m_new.call(new c_Vector,800.0,375.0))
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<95>";
	dbg_array(dbg_object(this).m_yesNoButtons,1)[dbg_index]=c_Rect.m_new.call(new c_Rect,c_Vector.m_new.call(new c_Vector,850.0,275.0),c_Vector.m_new.call(new c_Vector,950.0,375.0))
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<96>";
	dbg_array(dbg_object(this).m_yesNoButtons,2)[dbg_index]=c_Rect.m_new.call(new c_Rect,c_Vector.m_new.call(new c_Vector,740.0,200.0),c_Vector.m_new.call(new c_Vector,840.0,300.0))
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<97>";
	dbg_array(dbg_object(this).m_yesNoButtons,3)[dbg_index]=c_Rect.m_new.call(new c_Rect,c_Vector.m_new.call(new c_Vector,890.0,200.0),c_Vector.m_new.call(new c_Vector,990.0,300.0))
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<99>";
	dbg_object(this).m_state=-1;
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<101>";
	dbg_object(this).m_dealerImage=bb_graphics_LoadImage("sprSalesmanLarge.png",5,1);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<102>";
	dbg_array(dbg_object(this).m_dealerAnimations,0)[dbg_index]=c_Animation.m_new.call(new c_Animation,"still",0,1,1)
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<103>";
	dbg_array(dbg_object(this).m_dealerAnimations,1)[dbg_index]=c_Animation.m_new.call(new c_Animation,"wagglin",0,2,2)
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<104>";
	dbg_array(dbg_object(this).m_dealerAnimations,2)[dbg_index]=c_Animation.m_new.call(new c_Animation,"doublewag",2,2,2)
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<105>";
	dbg_array(dbg_object(this).m_dealerAnimations,3)[dbg_index]=c_Animation.m_new.call(new c_Animation,"sweatin",4,1,1)
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<107>";
	dbg_array(dbg_object(this).m_endSceneAnimations,0)[dbg_index]=c_Animation.m_new.call(new c_Animation,"drivin",0,2,2)
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<108>";
	dbg_array(dbg_object(this).m_endSceneAnimations,1)[dbg_index]=c_Animation.m_new.call(new c_Animation,"splodin",0,1,1)
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<112>";
	dbg_object(this).m_endSceneImage=bb_graphics_LoadImage("endScene.png",2,1);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<114>";
	dbg_object(this).m_explosionImage=bb_graphics_LoadImage("sprExplosionLarge.png",4,1);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<115>";
	dbg_object(this).m_explosionAnimation=c_Animation.m_new.call(new c_Animation,"splodin",0,4,8);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<116>";
	dbg_object(this).m_explosionSound=bb_audio_LoadSound("explosion1.wav");
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<117>";
	dbg_object(this).m_sootImage=bb_graphics_LoadImage("sprSootLarge.png",1,1);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<118>";
	dbg_object(this).m_tapLoc=c_Vector.m_new.call(new c_Vector,20.0,680.0);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<119>";
	dbg_object(this).m_currentTimer=c_Timer.m_new2.call(new c_Timer,-1);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<121>";
	pop_err();
	return 0;
}
c_LDJAM33.prototype.p_OnUpdate=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<126>";
	dbg_object(this).m_currentTimer.p_Update();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<127>";
	if(dbg_object(this).m_state==-1){
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<128>";
		dbg_object(this).m_profit=0;
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<129>";
		dbg_object(this).m_casualties=0;
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<130>";
		dbg_object(this).m_sales=0;
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<131>";
		dbg_object(this).m_day=1;
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<133>";
		dbg_object(this).m_currentDealerAnimation=dbg_array(dbg_object(this).m_dealerAnimations,0)[dbg_index];
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<134>";
		dbg_object(this).m_currentDealerAnimation.p_Reset();
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<135>";
		dbg_object(this).m_currentEndSceneAnimation=dbg_array(dbg_object(this).m_endSceneAnimations,0)[dbg_index];
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<136>";
		dbg_object(this).m_currentTimer.p_Set(200);
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<137>";
		dbg_object(this).m_state=0;
	}else{
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<138>";
		if(dbg_object(this).m_state==0){
			err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<140>";
			if(dbg_object(dbg_object(this).m_currentTimer).m_alarm){
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<141>";
				dbg_object(this).m_currentDealerAnimation=dbg_array(dbg_object(this).m_dealerAnimations,1)[dbg_index];
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<142>";
				dbg_object(this).m_currentDealerAnimation.p_Reset();
			}
			err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<145>";
			if(((bb_input_KeyDown(13))!=0) || ((bb_input_TouchHit(0))!=0)){
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<146>";
				dbg_object(this).m_state=1;
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<147>";
				dbg_object(this).m_family=c_Family.m_new.call(new c_Family);
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<148>";
				dbg_object(this).m_currentDealerAnimation=dbg_array(dbg_object(this).m_dealerAnimations,0)[dbg_index];
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<149>";
				dbg_object(this).m_currentDealerAnimation.p_Reset();
			}
		}else{
			err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<152>";
			if(dbg_object(this).m_state==1){
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<156>";
				if(((bb_input_KeyHit(32))!=0) || ((bb_input_TouchHit(0))!=0)){
					err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<157>";
					dbg_object(this).m_state=101;
					err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<158>";
					dbg_object(this).m_currentTimer.p_Set(60);
				}
			}else{
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<162>";
				if(dbg_object(this).m_state==101){
					err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<164>";
					if(((bb_input_KeyHit(32))!=0) || ((bb_input_TouchHit(0))!=0)){
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<166>";
						dbg_object(this).m_state=3;
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<167>";
						dbg_object(this).m_currentTimer.p_Set(50);
					}
				}else{
					err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<172>";
					if(dbg_object(this).m_state==3){
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<174>";
						dbg_array(dbg_object(this).m_car,0)[dbg_index]=c_Car.m_new.call(new c_Car,0,dbg_object(dbg_object(this).m_family).m_requestedPrice)
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<175>";
						dbg_array(dbg_object(this).m_car,1)[dbg_index]=c_Car.m_new.call(new c_Car,1,dbg_object(dbg_object(this).m_family).m_requestedPrice)
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<176>";
						dbg_array(dbg_object(this).m_car,2)[dbg_index]=c_Car.m_new.call(new c_Car,2,dbg_object(dbg_object(this).m_family).m_requestedPrice)
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<177>";
						dbg_object(this).m_state=4;
					}else{
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<179>";
						if(dbg_object(this).m_state==4){
							err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<180>";
							if((bb_input_TouchHit(0))!=0){
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<183>";
								var t_mX=((bb_autofit_VTouchX(0,true))|0);
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<184>";
								var t_mY=((bb_autofit_VTouchY(0,true))|0);
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<185>";
								var t_touchVect=c_Vector.m_new.call(new c_Vector,(t_mX),(t_mY));
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<187>";
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<187>";
								var t_=dbg_object(this).m_car;
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<187>";
								var t_2=0;
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<187>";
								while(t_2<t_.length){
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<187>";
									var t_pick=dbg_array(t_,t_2)[dbg_index];
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<187>";
									t_2=t_2+1;
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<188>";
									if(dbg_object(t_pick).m_button.p_ContainsPoint(t_touchVect)){
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<189>";
										dbg_object(this).m_currentCar=t_pick;
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<190>";
										dbg_object(this).m_state=104;
									}
								}
							}
						}else{
							err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<195>";
							if(dbg_object(this).m_state==104){
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<197>";
								if((bb_input_TouchHit(0))!=0){
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<200>";
									var t_mX2=((bb_autofit_VTouchX(0,true))|0);
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<201>";
									var t_mY2=((bb_autofit_VTouchY(0,true))|0);
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<202>";
									var t_touchVect2=c_Vector.m_new.call(new c_Vector,(t_mX2),(t_mY2));
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<204>";
									if(dbg_array(dbg_object(this).m_yesNoButtons,0)[dbg_index].p_ContainsPoint(t_touchVect2)){
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<205>";
										dbg_object(this).m_currentTimer.p_Set(150);
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<206>";
										dbg_object(this).m_state=5;
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<207>";
										dbg_object(dbg_object(this).m_currentCar).m_button=dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_button;
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<208>";
										dbg_object(this).m_currentDealerAnimation=dbg_array(dbg_object(this).m_dealerAnimations,1)[dbg_index];
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<209>";
										dbg_object(this).m_currentDealerAnimation.p_Reset();
									}else{
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<210>";
										if(dbg_array(dbg_object(this).m_yesNoButtons,1)[dbg_index].p_ContainsPoint(t_touchVect2)){
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<211>";
											dbg_object(this).m_state=4;
										}
									}
								}
							}else{
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<214>";
								if(dbg_object(this).m_state==5){
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<216>";
									if((bb_input_TouchHit(0))!=0){
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<218>";
										var t_featMatch=false;
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<219>";
										var t_theyllTakeIt=false;
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<221>";
										if(dbg_object(dbg_object(this).m_currentCar).m_feature==dbg_object(dbg_object(this).m_family).m_desire){
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<222>";
											t_featMatch=true;
										}
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<224>";
										if((dbg_object(dbg_object(this).m_currentCar).m_MSRP)<(dbg_object(dbg_object(this).m_family).m_requestedPrice)*.95 || t_featMatch){
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<225>";
											t_theyllTakeIt=true;
										}
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<228>";
										if(t_theyllTakeIt){
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<229>";
											dbg_object(this).m_state=7;
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<230>";
											dbg_object(this).m_currentDealerAnimation=dbg_array(dbg_object(this).m_dealerAnimations,2)[dbg_index];
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<231>";
											dbg_object(this).m_currentDealerAnimation.p_Reset();
										}else{
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<233>";
											dbg_object(this).m_state=6;
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<234>";
											dbg_object(dbg_object(this).m_family).m_requestedPrice=(((dbg_object(dbg_object(this).m_currentCar).m_MSRP)*bb_random_Rnd2(.8,.99))|0);
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<235>";
											dbg_object(this).m_currentDealerAnimation=dbg_array(dbg_object(this).m_dealerAnimations,3)[dbg_index];
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<236>";
											dbg_object(this).m_currentDealerAnimation.p_Reset();
										}
									}
								}else{
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<241>";
									if(dbg_object(this).m_state==6){
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<243>";
										if((bb_input_TouchHit(0))!=0){
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<246>";
											var t_mX3=((bb_autofit_VTouchX(0,true))|0);
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<247>";
											var t_mY3=((bb_autofit_VTouchY(0,true))|0);
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<248>";
											var t_touchVect3=c_Vector.m_new.call(new c_Vector,(t_mX3),(t_mY3));
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<250>";
											if(dbg_array(dbg_object(this).m_yesNoButtons,2)[dbg_index].p_ContainsPoint(t_touchVect3)){
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<251>";
												dbg_object(this).m_state=7;
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<252>";
												dbg_object(this).m_currentDealerAnimation=dbg_array(dbg_object(this).m_dealerAnimations,2)[dbg_index];
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<253>";
												dbg_object(this).m_currentDealerAnimation.p_Reset();
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<254>";
												dbg_object(dbg_object(this).m_currentCar).m_MSRP=dbg_object(dbg_object(this).m_family).m_requestedPrice;
											}else{
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<255>";
												if(dbg_array(dbg_object(this).m_yesNoButtons,3)[dbg_index].p_ContainsPoint(t_touchVect3)){
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<256>";
													dbg_object(this).m_state=106;
												}
											}
										}
									}else{
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<259>";
										if(dbg_object(this).m_state==106){
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<260>";
											if((bb_input_TouchHit(0))!=0){
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<261>";
												dbg_object(this).m_state=209;
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<262>";
												dbg_object(this).m_currentEndSceneAnimation=dbg_array(dbg_object(this).m_endSceneAnimations,1)[dbg_index];
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<263>";
												dbg_object(this).m_madeTheSale=false;
											}
										}else{
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<265>";
											if(dbg_object(this).m_state==7){
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<266>";
												if((bb_input_TouchHit(0))!=0){
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<267>";
													dbg_object(this).m_madeTheSale=true;
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<268>";
													dbg_object(this).m_state=9;
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<269>";
													dbg_object(this).m_theyAreNowDead=false;
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<270>";
													dbg_object(this).m_currentEndSceneAnimation=dbg_array(dbg_object(this).m_endSceneAnimations,0)[dbg_index];
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<271>";
													dbg_object(this).m_currentEndSceneAnimation.p_Reset();
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<272>";
													dbg_object(this).m_profit=dbg_object(this).m_currentCar.p_Profit(0)+dbg_object(this).m_profit;
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<273>";
													dbg_object(this).m_doTheyDie=bb_random_Rnd()>dbg_object(dbg_object(this).m_currentCar).m_safety;
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<274>";
													if(dbg_object(this).m_doTheyDie){
														err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<275>";
														dbg_object(this).m_casualties=dbg_object(this).m_casualties+dbg_object(dbg_object(this).m_family).m_members.length;
														err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<276>";
														dbg_object(this).m_currentTimer=(c_Timer.m_new2.call(new c_Timer,((bb_random_Rnd2(120.0,300.0))|0)));
													}else{
														err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<279>";
														dbg_object(this).m_currentTimer=(c_Timer.m_new2.call(new c_Timer,120));
													}
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<281>";
													dbg_object(this).m_sales=dbg_object(this).m_sales+1;
												}
											}else{
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<284>";
												if(dbg_object(this).m_state==9){
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<285>";
													var t_chillOutPal=false;
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<287>";
													if(dbg_object(dbg_object(this).m_currentTimer).m_alarm){
														err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<288>";
														if(dbg_object(this).m_doTheyDie){
															err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<289>";
															dbg_object(this).m_currentEndSceneAnimation=dbg_array(dbg_object(this).m_endSceneAnimations,1)[dbg_index];
															err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<290>";
															bb_audio_PlaySound(dbg_object(this).m_explosionSound,0,0);
															err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<291>";
															dbg_object(this).m_theyAreNowDead=true;
															err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<292>";
															t_chillOutPal=true;
															err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<293>";
															dbg_object(this).m_explosionAnimation.p_Reset();
														}else{
															err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<295>";
															t_chillOutPal=true;
														}
													}
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<299>";
													if(t_chillOutPal){
														err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<300>";
														dbg_object(this).m_state=109;
														err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<301>";
														dbg_object(this).m_currentTimer.p_Set(60);
													}
												}else{
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<303>";
													if(dbg_object(this).m_state==109){
														err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<304>";
														if(dbg_object(this).m_theyAreNowDead){
															err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<305>";
															if(dbg_object(dbg_object(this).m_currentTimer).m_ticks==-1 && ((bb_input_TouchHit(0))!=0)){
																err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<306>";
																dbg_object(this).m_state=209;
															}
														}else{
															err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<309>";
															dbg_object(this).m_state=209;
														}
													}else{
														err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<311>";
														if(dbg_object(this).m_state==209){
															err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<313>";
															if((bb_input_TouchHit(0))!=0){
																err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<314>";
																dbg_object(this).m_currentDealerAnimation=dbg_array(dbg_object(this).m_dealerAnimations,0)[dbg_index];
																err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<315>";
																dbg_object(this).m_currentDealerAnimation.p_Reset();
																err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<316>";
																dbg_object(this).m_day=dbg_object(this).m_day+1;
																err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<317>";
																if(dbg_object(this).m_day>5){
																	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<318>";
																	dbg_object(this).m_state=11;
																}else{
																	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<320>";
																	dbg_object(this).m_state=1;
																	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<321>";
																	if(dbg_object(this).m_day>1){
																		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<322>";
																		dbg_object(this).m_family=c_Family.m_new.call(new c_Family);
																	}
																}
															}
														}else{
															err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<326>";
															if(dbg_object(this).m_state==11){
																err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<327>";
																if((bb_input_TouchHit(0))!=0){
																	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<330>";
																	var t_mX4=((bb_autofit_VTouchX(0,true))|0);
																	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<331>";
																	var t_mY4=((bb_autofit_VTouchY(0,true))|0);
																	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<332>";
																	var t_touchVect4=c_Vector.m_new.call(new c_Vector,(t_mX4),(t_mY4));
																	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<333>";
																	var t_playAgainRect=c_Rect.m_new.call(new c_Rect,c_Vector.m_new.call(new c_Vector,600.0,355.0),c_Vector.m_new.call(new c_Vector,840.0,395.0));
																	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<334>";
																	if(t_playAgainRect.p_ContainsPoint(t_touchVect4)){
																		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<335>";
																		dbg_object(this).m_state=-1;
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
						}
					}
				}
			}
		}
	}
	pop_err();
	return 0;
}
c_LDJAM33.prototype.p_DrawTapText=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<610>";
	bb_SalesOfADeathman_TapFont.p_DrawText("Click/Tap to Continue".toUpperCase(),((dbg_object(this).m_tapLoc.p_x2())|0),((dbg_object(this).m_tapLoc.p_y2())|0),0,0,0,0);
	pop_err();
	return 0;
}
c_LDJAM33.prototype.p_OnRender=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<343>";
	if(dbg_object(this).m_firstPrint){
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<344>";
		bb_SalesOfADeathman_MenuFont.p_DrawText("Test String",10,0,0,0,0,0);
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<345>";
		bb_SalesOfADeathman_FamilyFont.p_DrawText("Test String",10,0,0,0,0,0);
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<346>";
		bb_SalesOfADeathman_DealerFont.p_DrawText("Test String",10,0,0,0,0,0);
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<347>";
		bb_SalesOfADeathman_TitleFont.p_DrawText("Test String",10,0,0,0,0,0);
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<348>";
		bb_SalesOfADeathman_TapFont.p_DrawText("Test String",10,0,0,0,0,0);
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<349>";
		bb_autofit_SetVirtualDisplay(1280,720,1.0);
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<351>";
		bb_graphics_Cls(200.0,200.0,200.0);
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<352>";
		bb_graphics_SetColor(255.0,255.0,255.0);
	}
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<354>";
	bb_autofit_UpdateVirtualDisplay(true,true);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<355>";
	bb_graphics_Cls(200.0,200.0,200.0);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<357>";
	if(dbg_object(this).m_state==0){
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<358>";
		bb_SalesOfADeathman_TitleFont.p_DrawText("Sales of a Deathman".toUpperCase(),250,50,0,0,0,0);
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<359>";
		bb_SalesOfADeathman_MenuFont.p_DrawText(" David Lazar".toUpperCase(),250,200,0,0,0,0);
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<360>";
		bb_SalesOfADeathman_MenuFont.p_DrawText("      &".toUpperCase(),250,225,0,0,0,0);
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<361>";
		bb_SalesOfADeathman_MenuFont.p_DrawText("Danielle Lazar".toUpperCase(),250,250,0,0,0,0);
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<362>";
		bb_SalesOfADeathman_TapFont.p_DrawText("Click/Tap to Begin".toUpperCase(),250,500,0,0,0,0);
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<364>";
		bb_graphics_DrawImage(dbg_object(this).m_dealerImage,1000.0,432.0,dbg_object(this).m_currentDealerAnimation.p_CurrentFrame());
	}else{
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<365>";
		if(dbg_object(this).m_state % 100==1){
			err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<366>";
			if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=1){
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<367>";
				bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,0)[dbg_index],100.0,460.0,0);
			}
			err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<369>";
			if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=2){
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<370>";
				bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,1)[dbg_index],200.0,460.0,0);
			}
			err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<372>";
			if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=3){
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<373>";
				bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,2)[dbg_index],300.0,480.0,0);
			}
			err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<375>";
			if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=4){
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<376>";
				bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,3)[dbg_index],400.0,480.0,0);
			}
			err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<378>";
			bb_SalesOfADeathman_FamilyFont.p_DrawText(("Hi, I'm "+dbg_object(dbg_array(dbg_object(dbg_object(this).m_family).m_members,0)[dbg_index]).m_firstName+" "+dbg_object(dbg_object(this).m_family).m_lastName+" and \nthis is my family. \nOur budget is around $"+String(dbg_object(dbg_object(this).m_family).m_requestedPrice)+". \nWe're looking for the car \nwith the best "+dbg_object(dbg_object(this).m_family).m_desire+".").toUpperCase(),75,50,0,0,0,0);
			err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<379>";
			this.p_DrawTapText();
			err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<380>";
			if(dbg_object(this).m_state==101){
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<381>";
				bb_SalesOfADeathman_DealerFont.p_DrawText("I've got just what you need!".toUpperCase(),600,250,0,0,0,0);
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<384>";
				bb_graphics_DrawImage(dbg_object(this).m_dealerImage,(1000+dbg_object(dbg_object(this).m_currentTimer).m_ticks*8),625.0,dbg_object(this).m_currentDealerAnimation.p_CurrentFrame());
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<385>";
				this.p_DrawTapText();
			}
		}else{
			err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<387>";
			if(dbg_object(this).m_state==2){
			}else{
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<390>";
				if(dbg_object(this).m_state==4){
					err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<391>";
					if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=1){
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<392>";
						bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,0)[dbg_index],(-400+(1+dbg_object(dbg_object(this).m_currentTimer).m_ticks)*10),460.0,0);
					}
					err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<394>";
					if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=2){
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<395>";
						bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,1)[dbg_index],(-300+(1+dbg_object(dbg_object(this).m_currentTimer).m_ticks)*10),460.0,0);
					}
					err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<397>";
					if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=3){
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<398>";
						bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,2)[dbg_index],(-200+(1+dbg_object(dbg_object(this).m_currentTimer).m_ticks)*10),480.0,0);
					}
					err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<400>";
					if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=4){
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<401>";
						bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,3)[dbg_index],(-100+(1+dbg_object(dbg_object(this).m_currentTimer).m_ticks)*10),480.0,0);
					}
					err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<403>";
					bb_graphics_DrawImage(dbg_object(this).m_dealerImage,(1210-(1+dbg_object(dbg_object(this).m_currentTimer).m_ticks)*4),625.0,dbg_object(this).m_currentDealerAnimation.p_CurrentFrame());
					err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<404>";
					if(dbg_object(dbg_object(this).m_currentTimer).m_ticks==-1){
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<405>";
						bb_SalesOfADeathman_DealerFont.p_DrawText("(Hmmm, which one should I show them first?)".toUpperCase(),215,20,0,0,0,0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<407>";
						bb_graphics_SetColor(85.0,85.0,85.0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<409>";
						bb_graphics_DrawRect(dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_button.p_TL2().p_x2(),dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_button.p_TL2().p_y2(),dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_button.p_Width(),dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_button.p_Height());
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<410>";
						bb_graphics_DrawRect(dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_button.p_TL2().p_x2(),dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_button.p_TL2().p_y2(),dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_button.p_Width(),dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_button.p_Height());
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<411>";
						bb_graphics_DrawRect(dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_button.p_TL2().p_x2(),dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_button.p_TL2().p_y2(),dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_button.p_Width(),dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_button.p_Height());
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<413>";
						bb_graphics_SetColor(255.0,255.0,255.0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<414>";
						bb_graphics_DrawImage2(dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_picture,dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_button.p_Left()+80.0,dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_button.p_Center().p_y2(),0.0,0.66666666666666663,0.66666666666666663,dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_animation.p_CurrentFrame());
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<415>";
						bb_graphics_DrawImage2(dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_picture,dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_button.p_Left()+80.0,dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_button.p_Center().p_y2(),0.0,0.66666666666666663,0.66666666666666663,dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_animation.p_CurrentFrame());
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<416>";
						bb_graphics_DrawImage2(dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_picture,dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_button.p_Left()+80.0,dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_button.p_Center().p_y2(),0.0,0.66666666666666663,0.66666666666666663,dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_animation.p_CurrentFrame());
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<418>";
						bb_SalesOfADeathman_MenuFont.p_DrawText(dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_name.toUpperCase(),((dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_button.p_TL2().p_x2()+160.0)|0),((dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_button.p_TL2().p_y2()+16.0)|0),0,0,0,0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<420>";
						bb_SalesOfADeathman_MenuFont.p_DrawText("MSRP: $"+String(dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_MSRP),((dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_button.p_TL2().p_x2()+160.0)|0),((dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_button.p_TL2().p_y2()+64.0)|0),0,0,0,0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<421>";
						bb_SalesOfADeathman_MenuFont.p_DrawText("profit: $".toUpperCase()+String(dbg_array(dbg_object(this).m_car,0)[dbg_index].p_Profit(0)),((dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_button.p_TL2().p_x2()+160.0)|0),((dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_button.p_TL2().p_y2()+112.0)|0),0,0,0,0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<423>";
						bb_SalesOfADeathman_MenuFont.p_DrawText("Feature: ".toUpperCase()+dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_feature.toUpperCase(),((dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_button.p_TL2().p_x2()+480.0)|0),((dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_button.p_TL2().p_y2()+64.0)|0),0,0,0,0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<424>";
						bb_SalesOfADeathman_MenuFont.p_DrawText("Safety: ".toUpperCase()+dbg_array(dbg_object(this).m_car,0)[dbg_index].p_SafetyString(),((dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_button.p_TL2().p_x2()+480.0)|0),((dbg_object(dbg_array(dbg_object(this).m_car,0)[dbg_index]).m_button.p_TL2().p_y2()+112.0)|0),0,0,0,0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<426>";
						bb_SalesOfADeathman_MenuFont.p_DrawText(dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_name.toUpperCase(),((dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_button.p_TL2().p_x2()+160.0)|0),((dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_button.p_TL2().p_y2()+16.0)|0),0,0,0,0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<428>";
						bb_SalesOfADeathman_MenuFont.p_DrawText("MSRP: $"+String(dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_MSRP),((dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_button.p_TL2().p_x2()+160.0)|0),((dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_button.p_TL2().p_y2()+64.0)|0),0,0,0,0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<429>";
						bb_SalesOfADeathman_MenuFont.p_DrawText("profit: $".toUpperCase()+String(dbg_array(dbg_object(this).m_car,1)[dbg_index].p_Profit(0)),((dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_button.p_TL2().p_x2()+160.0)|0),((dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_button.p_TL2().p_y2()+112.0)|0),0,0,0,0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<431>";
						bb_SalesOfADeathman_MenuFont.p_DrawText("Feature: ".toUpperCase()+dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_feature.toUpperCase(),((dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_button.p_TL2().p_x2()+480.0)|0),((dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_button.p_TL2().p_y2()+64.0)|0),0,0,0,0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<432>";
						bb_SalesOfADeathman_MenuFont.p_DrawText("Safety: ".toUpperCase()+dbg_array(dbg_object(this).m_car,1)[dbg_index].p_SafetyString(),((dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_button.p_TL2().p_x2()+480.0)|0),((dbg_object(dbg_array(dbg_object(this).m_car,1)[dbg_index]).m_button.p_TL2().p_y2()+112.0)|0),0,0,0,0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<434>";
						bb_SalesOfADeathman_MenuFont.p_DrawText(dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_name.toUpperCase(),((dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_button.p_TL2().p_x2()+160.0)|0),((dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_button.p_TL2().p_y2()+16.0)|0),0,0,0,0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<436>";
						bb_SalesOfADeathman_MenuFont.p_DrawText("MSRP: $"+String(dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_MSRP),((dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_button.p_TL2().p_x2()+160.0)|0),((dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_button.p_TL2().p_y2()+64.0)|0),0,0,0,0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<437>";
						bb_SalesOfADeathman_MenuFont.p_DrawText("profit: $".toUpperCase()+String(dbg_array(dbg_object(this).m_car,2)[dbg_index].p_Profit(0)),((dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_button.p_TL2().p_x2()+160.0)|0),((dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_button.p_TL2().p_y2()+112.0)|0),0,0,0,0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<439>";
						bb_SalesOfADeathman_MenuFont.p_DrawText("Feature: ".toUpperCase()+dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_feature.toUpperCase(),((dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_button.p_TL2().p_x2()+480.0)|0),((dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_button.p_TL2().p_y2()+64.0)|0),0,0,0,0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<440>";
						bb_SalesOfADeathman_MenuFont.p_DrawText("Safety: ".toUpperCase()+dbg_array(dbg_object(this).m_car,2)[dbg_index].p_SafetyString(),((dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_button.p_TL2().p_x2()+480.0)|0),((dbg_object(dbg_array(dbg_object(this).m_car,2)[dbg_index]).m_button.p_TL2().p_y2()+112.0)|0),0,0,0,0);
					}
				}else{
					err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<443>";
					if(dbg_object(this).m_state==104){
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<445>";
						bb_graphics_DrawImage(dbg_object(this).m_dealerImage,1210.0,625.0,dbg_object(this).m_currentDealerAnimation.p_CurrentFrame());
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<446>";
						bb_SalesOfADeathman_DealerFont.p_DrawText(("(The "+dbg_object(dbg_object(this).m_currentCar).m_name+" has\n"+dbg_object(dbg_object(this).m_currentCar).m_danger.p_ModifierString(dbg_object(dbg_object(this).m_currentCar).m_safety)+"\n"+dbg_object(dbg_object(dbg_object(this).m_currentCar).m_danger).m_item+".\nShow it anyway?)").toUpperCase(),600,120,0,0,0,0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<447>";
						bb_graphics_SetColor(85.0,85.0,85.0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<448>";
						bb_graphics_DrawRect(dbg_array(dbg_object(this).m_yesNoButtons,0)[dbg_index].p_TL2().p_x2(),dbg_array(dbg_object(this).m_yesNoButtons,0)[dbg_index].p_TL2().p_y2(),dbg_array(dbg_object(this).m_yesNoButtons,0)[dbg_index].p_Width(),dbg_array(dbg_object(this).m_yesNoButtons,0)[dbg_index].p_Height());
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<449>";
						bb_graphics_DrawRect(dbg_array(dbg_object(this).m_yesNoButtons,1)[dbg_index].p_TL2().p_x2(),dbg_array(dbg_object(this).m_yesNoButtons,1)[dbg_index].p_TL2().p_y2(),dbg_array(dbg_object(this).m_yesNoButtons,1)[dbg_index].p_Width(),dbg_array(dbg_object(this).m_yesNoButtons,1)[dbg_index].p_Height());
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<450>";
						bb_graphics_SetColor(255.0,255.0,255.0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<451>";
						bb_SalesOfADeathman_MenuFont.p_DrawText("YES".toUpperCase(),((dbg_array(dbg_object(this).m_yesNoButtons,0)[dbg_index].p_TL2().p_x2()+21.0)|0),((dbg_array(dbg_object(this).m_yesNoButtons,0)[dbg_index].p_TL2().p_y2()+30.0)|0),0,0,0,0);
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<452>";
						bb_SalesOfADeathman_MenuFont.p_DrawText("NO".toUpperCase(),((dbg_array(dbg_object(this).m_yesNoButtons,1)[dbg_index].p_TL2().p_x2()+30.0)|0),((dbg_array(dbg_object(this).m_yesNoButtons,1)[dbg_index].p_TL2().p_y2()+30.0)|0),0,0,0,0);
					}else{
						err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<453>";
						if(dbg_object(this).m_state==5){
							err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<454>";
							if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=1){
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<455>";
								bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,0)[dbg_index],100.0,460.0,0);
							}
							err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<457>";
							if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=2){
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<458>";
								bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,1)[dbg_index],200.0,460.0,0);
							}
							err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<460>";
							if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=3){
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<461>";
								bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,2)[dbg_index],300.0,480.0,0);
							}
							err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<463>";
							if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=4){
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<464>";
								bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,3)[dbg_index],400.0,480.0,0);
							}
							err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<466>";
							bb_graphics_SetColor(85.0,85.0,85.0);
							err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<467>";
							bb_graphics_DrawRect(dbg_object(dbg_object(this).m_currentCar).m_button.p_TL2().p_x2(),dbg_object(dbg_object(this).m_currentCar).m_button.p_TL2().p_y2(),dbg_object(dbg_object(this).m_currentCar).m_button.p_Width(),dbg_object(dbg_object(this).m_currentCar).m_button.p_Height());
							err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<468>";
							bb_graphics_SetColor(255.0,255.0,255.0);
							err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<469>";
							bb_graphics_DrawImage2(dbg_object(dbg_object(this).m_currentCar).m_picture,dbg_object(dbg_object(this).m_currentCar).m_button.p_Left()+80.0,dbg_object(dbg_object(this).m_currentCar).m_button.p_Center().p_y2(),0.0,0.66666666666666663,0.66666666666666663,dbg_object(dbg_object(this).m_currentCar).m_animation.p_CurrentFrame());
							err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<471>";
							bb_SalesOfADeathman_MenuFont.p_DrawText(dbg_object(dbg_object(this).m_currentCar).m_name.toUpperCase(),((dbg_object(dbg_object(this).m_currentCar).m_button.p_TL2().p_x2()+160.0)|0),((dbg_object(dbg_object(this).m_currentCar).m_button.p_TL2().p_y2()+16.0)|0),0,0,0,0);
							err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<473>";
							bb_SalesOfADeathman_MenuFont.p_DrawText("MSRP: $"+String(dbg_object(dbg_object(this).m_currentCar).m_MSRP),((dbg_object(dbg_object(this).m_currentCar).m_button.p_TL2().p_x2()+160.0)|0),((dbg_object(dbg_object(this).m_currentCar).m_button.p_TL2().p_y2()+64.0)|0),0,0,0,0);
							err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<475>";
							bb_SalesOfADeathman_MenuFont.p_DrawText("Feature: ".toUpperCase()+dbg_object(dbg_object(this).m_currentCar).m_feature.toUpperCase(),((dbg_object(dbg_object(this).m_currentCar).m_button.p_TL2().p_x2()+480.0)|0),((dbg_object(dbg_object(this).m_currentCar).m_button.p_TL2().p_y2()+64.0)|0),0,0,0,0);
							err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<476>";
							bb_SalesOfADeathman_DealerFont.p_DrawText("How about this?".toUpperCase(),((dbg_object(dbg_object(this).m_currentCar).m_button.p_TL2().p_x2()+500.0)|0),((dbg_object(dbg_object(this).m_currentCar).m_button.p_TL2().p_y2()+dbg_object(dbg_object(this).m_currentCar).m_button.p_Height()+20.0)|0),0,0,0,0);
							err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<477>";
							bb_graphics_DrawImage(dbg_object(this).m_dealerImage,(880+(((1+dbg_object(dbg_object(this).m_currentTimer).m_ticks)*2.2147651006711411)|0)),625.0,dbg_object(this).m_currentDealerAnimation.p_CurrentFrame());
							err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<478>";
							this.p_DrawTapText();
						}else{
							err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<479>";
							if(dbg_object(this).m_state % 100==6){
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<480>";
								if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=1){
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<481>";
									bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,0)[dbg_index],100.0,460.0,0);
								}
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<483>";
								if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=2){
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<484>";
									bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,1)[dbg_index],200.0,460.0,0);
								}
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<486>";
								if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=3){
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<487>";
									bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,2)[dbg_index],300.0,480.0,0);
								}
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<489>";
								if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=4){
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<490>";
									bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,3)[dbg_index],400.0,480.0,0);
								}
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<492>";
								bb_graphics_DrawImage(dbg_object(this).m_dealerImage,880.0,625.0,dbg_object(this).m_currentDealerAnimation.p_CurrentFrame());
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<494>";
								bb_SalesOfADeathman_FamilyFont.p_DrawText(("Hmm, that price is a little steep. \nWould you take "+String(dbg_object(dbg_object(this).m_family).m_requestedPrice)+" for it?").toUpperCase(),100,20,0,0,0,0);
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<495>";
								if(dbg_object(this).m_state!=106){
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<496>";
									bb_graphics_SetColor(85.0,85.0,85.0);
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<497>";
									bb_graphics_DrawRect(dbg_array(dbg_object(this).m_yesNoButtons,2)[dbg_index].p_TL2().p_x2(),dbg_array(dbg_object(this).m_yesNoButtons,2)[dbg_index].p_TL2().p_y2(),dbg_array(dbg_object(this).m_yesNoButtons,2)[dbg_index].p_Width(),dbg_array(dbg_object(this).m_yesNoButtons,2)[dbg_index].p_Height());
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<498>";
									bb_graphics_DrawRect(dbg_array(dbg_object(this).m_yesNoButtons,3)[dbg_index].p_TL2().p_x2(),dbg_array(dbg_object(this).m_yesNoButtons,3)[dbg_index].p_TL2().p_y2(),dbg_array(dbg_object(this).m_yesNoButtons,3)[dbg_index].p_Width(),dbg_array(dbg_object(this).m_yesNoButtons,3)[dbg_index].p_Height());
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<499>";
									bb_graphics_SetColor(255.0,255.0,255.0);
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<500>";
									bb_SalesOfADeathman_MenuFont.p_DrawText("YES".toUpperCase(),((dbg_array(dbg_object(this).m_yesNoButtons,2)[dbg_index].p_TL2().p_x2()+21.0)|0),((dbg_array(dbg_object(this).m_yesNoButtons,2)[dbg_index].p_TL2().p_y2()+30.0)|0),0,0,0,0);
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<501>";
									bb_SalesOfADeathman_MenuFont.p_DrawText("NO".toUpperCase(),((dbg_array(dbg_object(this).m_yesNoButtons,3)[dbg_index].p_TL2().p_x2()+30.0)|0),((dbg_array(dbg_object(this).m_yesNoButtons,3)[dbg_index].p_TL2().p_y2()+30.0)|0),0,0,0,0);
								}else{
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<502>";
									if(dbg_object(this).m_state==106){
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<503>";
										bb_graphics_DrawImage(dbg_object(this).m_dealerImage,880.0,625.0,dbg_object(this).m_currentDealerAnimation.p_CurrentFrame());
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<504>";
										bb_SalesOfADeathman_FamilyFont.p_DrawText("I'm sorry we couldn't make this \ndeal work out. We're going to try \nanother dealership. Thanks for your time.".toUpperCase(),100,150,0,0,0,0);
									}
								}
							}else{
								err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<506>";
								if(dbg_object(this).m_state==7){
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<507>";
									if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=1){
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<508>";
										bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,0)[dbg_index],100.0,460.0,0);
									}
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<510>";
									if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=2){
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<511>";
										bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,1)[dbg_index],200.0,460.0,0);
									}
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<513>";
									if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=3){
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<514>";
										bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,2)[dbg_index],300.0,480.0,0);
									}
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<516>";
									if(dbg_object(dbg_object(this).m_family).m_familyImages.length>=4){
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<517>";
										bb_graphics_DrawImage(dbg_array(dbg_object(dbg_object(this).m_family).m_familyImages,3)[dbg_index],400.0,480.0,0);
									}
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<519>";
									bb_SalesOfADeathman_FamilyFont.p_DrawText(("That "+dbg_object(dbg_object(this).m_currentCar).m_name+" is just \nwhat we've been looking for!").toUpperCase(),100,20,0,0,0,0);
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<520>";
									bb_SalesOfADeathman_DealerFont.p_DrawText(("Great! That will be $"+String(dbg_object(dbg_object(this).m_currentCar).m_MSRP)+".  \nThanks for shopping with us. \nEnjoy your "+dbg_object(dbg_object(this).m_currentCar).m_name+".").toUpperCase(),600,200,0,0,0,0);
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<521>";
									bb_graphics_DrawImage(dbg_object(this).m_dealerImage,880.0,625.0,dbg_object(this).m_currentDealerAnimation.p_CurrentFrame());
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<522>";
									this.p_DrawTapText();
								}else{
									err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<523>";
									if(dbg_object(this).m_state % 100==9){
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<525>";
										bb_graphics_DrawImage2(dbg_object(this).m_endSceneImage,640.0,360.0,0.0,1.0,1.0,dbg_object(this).m_currentEndSceneAnimation.p_CurrentFrame());
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<526>";
										if(dbg_object(this).m_madeTheSale){
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<527>";
											if(!dbg_object(this).m_theyAreNowDead){
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<528>";
												bb_graphics_DrawImage2(dbg_object(dbg_object(this).m_currentCar).m_picture,640.0,580.0,0.0,-1.0,1.0,dbg_object(dbg_object(this).m_currentCar).m_animation.p_CurrentFrame());
											}else{
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<530>";
												if(!((dbg_object(this).m_explosionAnimation.p_FirstCycleCompleted())!=0)){
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<531>";
													bb_graphics_DrawImage2(dbg_object(this).m_explosionImage,640.0,410.0,0.0,1.0,1.0,dbg_object(this).m_explosionAnimation.p_CurrentFrame());
												}else{
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<533>";
													bb_graphics_DrawImage2(dbg_object(this).m_sootImage,640.0,600.0,0.0,1.0,1.0,0);
												}
											}
										}
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<537>";
										if(dbg_object(this).m_state==109 || true){
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<538>";
											if(dbg_object(dbg_object(this).m_currentTimer).m_ticks==-1){
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<539>";
												bb_graphics_SetColor(0.0,0.0,0.0);
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<540>";
												bb_graphics_DrawRect(150.0,50.0,980.0,150.0);
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<541>";
												bb_graphics_SetColor(255.0,255.0,255.0);
											}
										}
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<544>";
										if(dbg_object(this).m_state==109){
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<545>";
											if(dbg_object(dbg_object(this).m_currentTimer).m_ticks==-1){
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<546>";
												bb_SalesOfADeathman_MenuFont.p_DrawText(("The "+dbg_object(dbg_object(this).m_currentCar).m_danger.p_FullString()+",").toUpperCase(),175,75,0,0,0,0);
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<547>";
												bb_SalesOfADeathman_MenuFont.p_DrawText(("killing the "+dbg_object(dbg_object(this).m_family).m_lastName+"s instantly.").toUpperCase(),175,125,0,0,0,0);
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<548>";
												this.p_DrawTapText();
											}
										}
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<551>";
										if(dbg_object(this).m_state==209){
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<552>";
											if(dbg_object(dbg_object(this).m_currentTimer).m_ticks==-1){
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<553>";
												if(dbg_object(this).m_madeTheSale){
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<554>";
													if(dbg_object(this).m_currentCar.p_Profit(0)>0){
														err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<555>";
														bb_SalesOfADeathman_MenuFont.p_DrawText(("Great! You made $"+String(dbg_object(this).m_currentCar.p_Profit(0))+" in profit today!").toUpperCase(),250,75,0,0,0,0);
													}else{
														err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<557>";
														bb_SalesOfADeathman_MenuFont.p_DrawText(("Pull yourself together! You lost $"+String(bb_math_Abs(dbg_object(this).m_currentCar.p_Profit(0)))+" today!").toUpperCase(),175,75,0,0,0,0);
													}
												}else{
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<560>";
													bb_SalesOfADeathman_MenuFont.p_DrawText("What good is a salesman who can't make a sale?".toUpperCase(),175,75,0,0,0,0);
												}
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<562>";
												if(5-dbg_object(this).m_day!=0){
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<563>";
													if(5-dbg_object(this).m_day==1){
														err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<564>";
														bb_SalesOfADeathman_MenuFont.p_DrawText(("  Only "+String(5-dbg_object(this).m_day)+" more day until your review").toUpperCase(),240,125,0,0,0,0);
													}else{
														err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<566>";
														bb_SalesOfADeathman_MenuFont.p_DrawText(("  Only "+String(5-dbg_object(this).m_day)+" more days until your review").toUpperCase(),240,125,0,0,0,0);
													}
												}else{
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<569>";
													bb_SalesOfADeathman_MenuFont.p_DrawText("         Today's your review!".toUpperCase(),240,125,0,0,0,0);
												}
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<571>";
												this.p_DrawTapText();
											}
										}
									}else{
										err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<577>";
										if(dbg_object(this).m_state==11){
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<578>";
											bb_graphics_SetColor(0.0,0.0,0.0);
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<579>";
											bb_graphics_DrawRect(0.0,50.0,1280.0,270.0);
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<580>";
											bb_graphics_SetColor(255.0,255.0,255.0);
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<582>";
											if(dbg_object(this).m_profit<0){
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<583>";
												bb_SalesOfADeathman_MenuFont.p_DrawText(("In the past 5 days, you lost $"+String(bb_math_Abs(dbg_object(this).m_profit))+"!").toUpperCase(),140,125,0,0,0,0);
											}else{
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<585>";
												bb_SalesOfADeathman_MenuFont.p_DrawText(("In the past 5 days, you made $"+String(dbg_object(this).m_profit)+" in profit!").toUpperCase(),140,125,0,0,0,0);
											}
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<587>";
											if(dbg_object(this).m_profit<=0){
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<588>";
												bb_SalesOfADeathman_MenuFont.p_DrawText("If you don't shape up, you'll be looking for a new job!".toUpperCase(),140,175,0,0,0,0);
											}else{
												err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<589>";
												if(dbg_object(this).m_profit>0 && dbg_object(this).m_profit<=1000){
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<590>";
													bb_SalesOfADeathman_MenuFont.p_DrawText("Not bad. Not good, but not bad.".toUpperCase(),140,175,0,0,0,0);
												}else{
													err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<591>";
													if(dbg_object(this).m_profit>1000 && dbg_object(this).m_profit<=3000){
														err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<592>";
														bb_SalesOfADeathman_MenuFont.p_DrawText("Solid week of sales. Keep growing those numbers.".toUpperCase(),140,175,0,0,0,0);
													}else{
														err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<593>";
														if(dbg_object(this).m_profit>3000 && dbg_object(this).m_profit<10000){
															err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<594>";
															bb_SalesOfADeathman_MenuFont.p_DrawText("Looks like we've found our salesman of the month.".toUpperCase(),140,175,0,0,0,0);
														}else{
															err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<595>";
															if(dbg_object(this).m_profit>10000 && dbg_object(this).m_profit<20000){
																err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<596>";
																bb_SalesOfADeathman_MenuFont.p_DrawText("Amazing. With that much commission, you might be \nthe next one buying a new car.".toUpperCase(),140,175,0,0,0,0);
															}else{
																err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<597>";
																if(dbg_object(this).m_profit>20000){
																	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<598>";
																	bb_SalesOfADeathman_MenuFont.p_DrawText("WOW! You'll be promoted to Sales Manager for sure!".toUpperCase(),140,175,0,0,0,0);
																}
															}
														}
													}
												}
											}
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<600>";
											bb_SalesOfADeathman_MenuFont.p_DrawText(("Casualties: "+String(dbg_object(this).m_casualties)).toUpperCase(),960,680,0,0,0,0);
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<601>";
											bb_graphics_SetColor(85.0,85.0,85.0);
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<602>";
											bb_graphics_DrawRect(600.0,355.0,240.0,40.0);
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<603>";
											bb_graphics_SetColor(255.0,255.0,255.0);
											err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<604>";
											bb_SalesOfADeathman_TapFont.p_DrawText("Play Again?".toUpperCase(),610,360,0,0,0,0);
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
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/SalesOfADeathman.monkey<614>";
	c_LDJAM33.m_new.call(new c_LDJAM33);
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
c_Image.prototype.p_WritePixels=function(t_pixels,t_x,t_y,t_width,t_height,t_offset,t_pitch){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<123>";
	if(!((t_pitch)!=0)){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<123>";
		t_pitch=t_width;
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<126>";
	var t_w=dbg_object(this).m_width;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<127>";
	if((this.m_flags&2)!=0){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<127>";
		t_w+=2;
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<128>";
	var t_h=dbg_object(this).m_height;
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<129>";
	if((this.m_flags&4)!=0){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<129>";
		t_h+=2;
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<130>";
	if(t_x<0 || t_y<0 || t_x+t_width>t_w || t_y+t_height>t_h){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<130>";
		error("Invalid pixel rectangle");
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<131>";
	if(t_offset<0 || t_pitch<0 || t_offset+(t_height-1)*t_pitch+t_width>t_pixels.length){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<131>";
		error("Invalid array rectangle");
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<133>";
	bb_graphics_device.WritePixels2(this.m_surface,t_pixels,t_x,t_y,t_width,t_height,t_offset,t_pitch);
	pop_err();
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
c_InputDevice.prototype.p_TouchX=function(t_index){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<73>";
	if(t_index>=0 && t_index<32){
		err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<73>";
		pop_err();
		return dbg_array(this.m__touchX,t_index)[dbg_index];
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<74>";
	pop_err();
	return 0.0;
}
c_InputDevice.prototype.p_TouchY=function(t_index){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<78>";
	if(t_index>=0 && t_index<32){
		err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<78>";
		pop_err();
		return dbg_array(this.m__touchY,t_index)[dbg_index];
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/inputdevice.monkey<79>";
	pop_err();
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
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<190>";
	this.m_Stream.p_SetPointer(t_Offset);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<191>";
	var t_Count=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<191>";
	var t_LastAdv=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<192>";
	for(var t_i=0;t_i<=this.m_GlyphNumber-1;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<193>";
		if(t_Count<t_HMetricsCount-1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<194>";
			dbg_object(dbg_array(this.m_Glyph,t_i)[dbg_index]).m_Adv=this.m_Stream.p_ReadUInt(2);
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<195>";
			dbg_object(dbg_array(this.m_Glyph,t_i)[dbg_index]).m_Lsb=this.m_Stream.p_ReadInt(2);
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<196>";
			t_LastAdv=dbg_object(dbg_array(this.m_Glyph,t_i)[dbg_index]).m_Adv;
		}else{
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<198>";
			dbg_object(dbg_array(this.m_Glyph,t_i)[dbg_index]).m_Adv=t_LastAdv;
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<199>";
			dbg_object(dbg_array(this.m_Glyph,t_i)[dbg_index]).m_Lsb=this.m_Stream.p_ReadInt(2);
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<201>";
		t_Count=t_Count+1;
	}
	pop_err();
	return 0;
}
c_TFont.prototype.p_LoadCmapTable0=function(t_Offset){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<257>";
	this.m_Stream.p_SetPointer(t_Offset);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<258>";
	this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<258>";
	this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<259>";
	for(var t_g=0;t_g<=254;t_g=t_g+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<260>";
		var t_GId=this.m_Stream.p_ReadUInt(1);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<261>";
		if(dbg_array(this.m_GlyphId,t_g)[dbg_index]==0){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<261>";
			dbg_array(this.m_GlyphId,t_g)[dbg_index]=t_GId
		}
	}
	pop_err();
	return 0;
}
c_TFont.prototype.p_LoadCmapTable4=function(t_Offset){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<265>";
	var t_OffCount=t_Offset;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<266>";
	this.m_Stream.p_SetPointer(t_Offset);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<267>";
	this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<267>";
	this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<268>";
	var t_SegCount=((this.m_Stream.p_ReadUInt(2)/2)|0);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<269>";
	var t_SearchRange=this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<270>";
	var t_EntrySelector=this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<271>";
	var t_RangeShift=this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<272>";
	t_OffCount=t_OffCount+12;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<273>";
	var t_EndCount=new_number_array(t_SegCount);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<274>";
	for(var t_s=0;t_s<=t_SegCount-1;t_s=t_s+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<275>";
		dbg_array(t_EndCount,t_s)[dbg_index]=this.m_Stream.p_ReadUInt(2)
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<276>";
		t_OffCount=t_OffCount+2;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<278>";
	var t_Reserved=this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<278>";
	t_OffCount=t_OffCount+2;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<279>";
	var t_StartCount=new_number_array(t_SegCount);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<280>";
	for(var t_s2=0;t_s2<=t_SegCount-1;t_s2=t_s2+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<281>";
		dbg_array(t_StartCount,t_s2)[dbg_index]=this.m_Stream.p_ReadUInt(2)
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<282>";
		t_OffCount=t_OffCount+2;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<284>";
	var t_IdDelta=new_number_array(t_SegCount);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<285>";
	for(var t_s3=0;t_s3<=t_SegCount-1;t_s3=t_s3+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<286>";
		dbg_array(t_IdDelta,t_s3)[dbg_index]=this.m_Stream.p_ReadInt(2)
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<287>";
		t_OffCount=t_OffCount+2;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<289>";
	var t_IdRangeOffset=new_number_array(t_SegCount);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<290>";
	var t_IdRangeOffsetOffset=new_number_array(t_SegCount);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<291>";
	for(var t_s4=0;t_s4<=t_SegCount-1;t_s4=t_s4+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<292>";
		dbg_array(t_IdRangeOffset,t_s4)[dbg_index]=this.m_Stream.p_ReadUInt(2)
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<293>";
		dbg_array(t_IdRangeOffsetOffset,t_s4)[dbg_index]=t_OffCount
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<294>";
		t_OffCount=t_OffCount+2;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<297>";
	for(var t_Char=0;t_Char<=this.m_GlyphNumber-1;t_Char=t_Char+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<298>";
		var t_NullFlag=1;
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<300>";
		var t_CharSeg=0;
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<301>";
		for(var t_s5=0;t_s5<=t_SegCount-1;t_s5=t_s5+1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<302>";
			if(dbg_array(t_EndCount,t_s5)[dbg_index]>=t_Char){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<303>";
				t_CharSeg=t_s5;
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<304>";
				if(t_Char>=dbg_array(t_StartCount,t_s5)[dbg_index]){
					err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<304>";
					t_NullFlag=0;
				}
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<305>";
				break;
			}
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<308>";
		if(t_NullFlag==1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<309>";
			dbg_array(this.m_GlyphId,t_Char)[dbg_index]=0
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<310>";
			continue;
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<313>";
		if(dbg_array(t_IdRangeOffset,t_CharSeg)[dbg_index]==0){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<314>";
			if(dbg_array(this.m_GlyphId,t_Char)[dbg_index]==0){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<314>";
				dbg_array(this.m_GlyphId,t_Char)[dbg_index]=dbg_array(t_IdDelta,t_CharSeg)[dbg_index]+t_Char
			}
		}else{
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<316>";
			var t_Location=2*(t_Char-dbg_array(t_StartCount,t_CharSeg)[dbg_index])+(dbg_array(t_IdRangeOffset,t_CharSeg)[dbg_index]-dbg_array(t_IdRangeOffset,0)[dbg_index])+t_OffCount+t_CharSeg*2;
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<317>";
			if(dbg_array(this.m_GlyphId,t_Char)[dbg_index]==0){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<317>";
				dbg_array(this.m_GlyphId,t_Char)[dbg_index]=this.m_Stream.p_PeekUInt(2,t_Location)
			}
		}
	}
	pop_err();
	return 0;
}
c_TFont.prototype.p_LoadCmapTable6=function(t_Offset){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<322>";
	this.m_Stream.p_SetPointer(t_Offset);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<323>";
	this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<323>";
	this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<324>";
	var t_FirstCode=this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<325>";
	var t_EntryCount=this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<326>";
	for(var t_g=t_FirstCode;t_g<=t_EntryCount-1;t_g=t_g+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<327>";
		var t_GId=this.m_Stream.p_ReadUInt(2);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<328>";
		if(dbg_array(this.m_GlyphId,t_g)[dbg_index]==0){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<328>";
			dbg_array(this.m_GlyphId,t_g)[dbg_index]=t_GId
		}
	}
	pop_err();
	return 0;
}
c_TFont.prototype.p_LoadCmapData=function(t_Offset){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<205>";
	this.m_Stream.p_SetPointer(t_Offset);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<206>";
	this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<207>";
	var t_numTables=this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<208>";
	var t_PlatformId=new_number_array(t_numTables);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<209>";
	var t_EncodingId=new_number_array(t_numTables);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<210>";
	var t_TableOffset=new_number_array(t_numTables);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<213>";
	for(var t_t=0;t_t<=t_numTables-1;t_t=t_t+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<214>";
		dbg_array(t_PlatformId,t_t)[dbg_index]=this.m_Stream.p_ReadUInt(2)
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<215>";
		dbg_array(t_EncodingId,t_t)[dbg_index]=this.m_Stream.p_ReadUInt(2)
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<216>";
		dbg_array(t_TableOffset,t_t)[dbg_index]=this.m_Stream.p_ReadUInt(4)+t_Offset
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<220>";
	var t_WindowsFontFound=false;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<221>";
	for(var t_t2=0;t_t2<=t_numTables-1;t_t2=t_t2+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<222>";
		if(dbg_array(t_PlatformId,t_t2)[dbg_index]==3 && dbg_array(t_EncodingId,t_t2)[dbg_index]==1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<223>";
			t_WindowsFontFound=true;
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<224>";
			var t_Format=this.m_Stream.p_PeekUInt(2,dbg_array(t_TableOffset,t_t2)[dbg_index]);
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<225>";
			if(t_Format==0){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<225>";
				this.p_LoadCmapTable0(dbg_array(t_TableOffset,t_t2)[dbg_index]+2);
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<226>";
			if(t_Format==4){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<226>";
				this.p_LoadCmapTable4(dbg_array(t_TableOffset,t_t2)[dbg_index]+2);
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<227>";
			if(t_Format==6){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<227>";
				this.p_LoadCmapTable6(dbg_array(t_TableOffset,t_t2)[dbg_index]+2);
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<232>";
	for(var t_t3=0;t_t3<=t_numTables-1;t_t3=t_t3+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<233>";
		if(dbg_array(t_PlatformId,t_t3)[dbg_index]==3 && dbg_array(t_EncodingId,t_t3)[dbg_index]!=1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<234>";
			var t_Format2=this.m_Stream.p_PeekUInt(2,dbg_array(t_TableOffset,t_t3)[dbg_index]);
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<235>";
			if(t_Format2==0){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<235>";
				this.p_LoadCmapTable0(dbg_array(t_TableOffset,t_t3)[dbg_index]+2);
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<236>";
			if(t_Format2==4){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<236>";
				this.p_LoadCmapTable4(dbg_array(t_TableOffset,t_t3)[dbg_index]+2);
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<237>";
			if(t_Format2==6){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<237>";
				this.p_LoadCmapTable6(dbg_array(t_TableOffset,t_t3)[dbg_index]+2);
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<242>";
	for(var t_t4=0;t_t4<=t_numTables-1;t_t4=t_t4+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<243>";
		if(dbg_array(t_PlatformId,t_t4)[dbg_index]!=3){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<244>";
			var t_Format3=this.m_Stream.p_PeekUInt(2,dbg_array(t_TableOffset,t_t4)[dbg_index]);
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<245>";
			if(t_Format3==0){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<245>";
				this.p_LoadCmapTable0(dbg_array(t_TableOffset,t_t4)[dbg_index]+2);
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<246>";
			if(t_Format3==4){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<246>";
				this.p_LoadCmapTable4(dbg_array(t_TableOffset,t_t4)[dbg_index]+2);
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<247>";
			if(t_Format3==6){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<247>";
				this.p_LoadCmapTable6(dbg_array(t_TableOffset,t_t4)[dbg_index]+2);
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<252>";
	for(var t_i=0;t_i<=this.m_GlyphId.length-1;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<253>";
		if(dbg_array(this.m_GlyphId,t_i)[dbg_index]>this.m_GlyphNumber-1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<253>";
			dbg_array(this.m_GlyphId,t_i)[dbg_index]=0
		}
	}
	pop_err();
	return 0;
}
c_TFont.prototype.p_LoadLoca=function(t_Offset,t_Format,t_GlyfOffset){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<332>";
	this.m_Stream.p_SetPointer(t_Offset);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<333>";
	for(var t_i=0;t_i<=this.m_GlyphNumber-1;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<334>";
		if(t_Format==0){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<335>";
			dbg_object(dbg_array(this.m_Glyph,t_i)[dbg_index]).m_FileAddress=this.m_Stream.p_ReadUInt(2)*2+t_GlyfOffset;
		}else{
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<337>";
			dbg_object(dbg_array(this.m_Glyph,t_i)[dbg_index]).m_FileAddress=this.m_Stream.p_ReadUInt(4)+t_GlyfOffset;
		}
	}
	pop_err();
	return 0;
}
c_TFont.prototype.p_LoadGlyfData=function(t_Id,t_Offset){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<342>";
	this.m_Stream.p_SetPointer(t_Offset);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<344>";
	var t_ContourNumber=this.m_Stream.p_ReadInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<345>";
	if(t_ContourNumber<1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<345>";
		pop_err();
		return 0;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<346>";
	dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_ContourNumber=t_ContourNumber;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<347>";
	dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xMin=this.m_Stream.p_ReadInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<348>";
	dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_yMin=this.m_Stream.p_ReadInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<349>";
	dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xMax=this.m_Stream.p_ReadInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<350>";
	dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_yMax=this.m_Stream.p_ReadInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<351>";
	dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_W=dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xMax-dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xMin;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<352>";
	dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_H=dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_yMax-dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_yMin;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<358>";
	var t_EndPoints=new_number_array(t_ContourNumber);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<359>";
	for(var t_i=0;t_i<=t_ContourNumber-1;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<360>";
		dbg_array(t_EndPoints,t_i)[dbg_index]=this.m_Stream.p_ReadUInt(2)
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<362>";
	var t_PointNumber=dbg_array(t_EndPoints,t_ContourNumber-1)[dbg_index]+1;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<365>";
	var t_insLen=this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<366>";
	this.m_Stream.p_ReadString(t_insLen);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<369>";
	var t_Flags=new_array_array(t_PointNumber);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<370>";
	var t_ContinueNumber=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<371>";
	for(var t_i2=0;t_i2<=t_PointNumber-1;t_i2=t_i2+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<373>";
		if(t_ContinueNumber>0){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<374>";
			dbg_array(t_Flags,t_i2)[dbg_index]=dbg_array(t_Flags,t_i2-1)[dbg_index]
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<375>";
			t_ContinueNumber=t_ContinueNumber-1;
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<376>";
			continue;
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<379>";
		dbg_array(t_Flags,t_i2)[dbg_index]=this.m_Stream.p_ReadBits(1)
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<380>";
		if(dbg_array(dbg_array(t_Flags,t_i2)[dbg_index],3)[dbg_index]==1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<380>";
			t_ContinueNumber=this.m_Stream.p_ReadUInt(1);
		}
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<385>";
	var t_XCoords=new_number_array(t_PointNumber);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<386>";
	for(var t_i3=0;t_i3<=t_PointNumber-1;t_i3=t_i3+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<388>";
		if(dbg_array(dbg_array(t_Flags,t_i3)[dbg_index],1)[dbg_index]==0 && dbg_array(dbg_array(t_Flags,t_i3)[dbg_index],4)[dbg_index]==1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<389>";
			if(t_i3>0){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<389>";
				dbg_array(t_XCoords,t_i3)[dbg_index]=dbg_array(t_XCoords,t_i3-1)[dbg_index]
			}else{
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<389>";
				dbg_array(t_XCoords,t_i3)[dbg_index]=-dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xMin
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<390>";
			continue;
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<393>";
		if(dbg_array(dbg_array(t_Flags,t_i3)[dbg_index],1)[dbg_index]==1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<394>";
			var t_tmp=this.m_Stream.p_ReadUInt(1);
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<395>";
			if(dbg_array(dbg_array(t_Flags,t_i3)[dbg_index],4)[dbg_index]==0){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<395>";
				t_tmp=t_tmp*-1;
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<396>";
			if(t_i3>0){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<396>";
				dbg_array(t_XCoords,t_i3)[dbg_index]=dbg_array(t_XCoords,t_i3-1)[dbg_index]+t_tmp
			}else{
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<396>";
				dbg_array(t_XCoords,t_i3)[dbg_index]=t_tmp-dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xMin
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<397>";
			continue;
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<399>";
		if(dbg_array(dbg_array(t_Flags,t_i3)[dbg_index],1)[dbg_index]==0 && dbg_array(dbg_array(t_Flags,t_i3)[dbg_index],4)[dbg_index]==0){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<400>";
			if(t_i3>0){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<400>";
				dbg_array(t_XCoords,t_i3)[dbg_index]=dbg_array(t_XCoords,t_i3-1)[dbg_index]+this.m_Stream.p_ReadInt(2)
			}else{
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<400>";
				dbg_array(t_XCoords,t_i3)[dbg_index]=this.m_Stream.p_ReadInt(2)-dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xMin
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<401>";
			continue;
		}
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<409>";
	var t_YCoords=new_number_array(t_PointNumber);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<410>";
	for(var t_i4=0;t_i4<=t_PointNumber-1;t_i4=t_i4+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<412>";
		if(dbg_array(dbg_array(t_Flags,t_i4)[dbg_index],2)[dbg_index]==0 && dbg_array(dbg_array(t_Flags,t_i4)[dbg_index],5)[dbg_index]==1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<413>";
			if(t_i4>0){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<413>";
				dbg_array(t_YCoords,t_i4)[dbg_index]=dbg_array(t_YCoords,t_i4-1)[dbg_index]
			}else{
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<413>";
				dbg_array(t_YCoords,t_i4)[dbg_index]=dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_yMax
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<414>";
			continue;
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<417>";
		if(dbg_array(dbg_array(t_Flags,t_i4)[dbg_index],2)[dbg_index]==1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<418>";
			var t_tmp2=this.m_Stream.p_ReadUInt(1);
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<419>";
			if(dbg_array(dbg_array(t_Flags,t_i4)[dbg_index],5)[dbg_index]==0){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<419>";
				t_tmp2=t_tmp2*-1;
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<420>";
			if(t_i4>0){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<420>";
				dbg_array(t_YCoords,t_i4)[dbg_index]=dbg_array(t_YCoords,t_i4-1)[dbg_index]-t_tmp2
			}else{
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<420>";
				dbg_array(t_YCoords,t_i4)[dbg_index]=dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_yMax-t_tmp2
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<421>";
			continue;
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<423>";
		if(dbg_array(dbg_array(t_Flags,t_i4)[dbg_index],2)[dbg_index]==0 && dbg_array(dbg_array(t_Flags,t_i4)[dbg_index],5)[dbg_index]==0){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<424>";
			if(t_i4>0){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<424>";
				dbg_array(t_YCoords,t_i4)[dbg_index]=dbg_array(t_YCoords,t_i4-1)[dbg_index]-this.m_Stream.p_ReadInt(2)
			}else{
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<424>";
				dbg_array(t_YCoords,t_i4)[dbg_index]=dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_yMax-this.m_Stream.p_ReadInt(2)
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<425>";
			continue;
		}
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<430>";
	dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList=new_array_array(t_ContourNumber);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<431>";
	var t_p1=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<431>";
	var t_Pend=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<432>";
	for(var t_i5=0;t_i5<=t_ContourNumber-1;t_i5=t_i5+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<433>";
		if(t_i5>0){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<434>";
			t_p1=dbg_array(t_EndPoints,t_i5-1)[dbg_index]+1;
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<436>";
		t_Pend=dbg_array(t_EndPoints,t_i5)[dbg_index];
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<437>";
		dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_i5)[dbg_index]=new_number_array((t_Pend-t_p1+1)*3)
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<438>";
		var t_Count=0;
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<439>";
		for(var t_j=t_p1;t_j<=t_Pend;t_j=t_j+1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<440>";
			dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_i5)[dbg_index],t_Count)[dbg_index]=(dbg_array(t_XCoords,t_j)[dbg_index])
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<441>";
			dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_i5)[dbg_index],t_Count+1)[dbg_index]=(dbg_array(t_YCoords,t_j)[dbg_index])
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<442>";
			dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_i5)[dbg_index],t_Count+2)[dbg_index]=(dbg_array(dbg_array(t_Flags,t_j)[dbg_index],0)[dbg_index])
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<443>";
			t_Count=t_Count+3;
		}
	}
	pop_err();
	return 0;
}
c_TFont.prototype.p_QuadGlyph=function(t_Id){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<449>";
	for(var t_c=0;t_c<=dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_ContourNumber-1;t_c=t_c+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<450>";
		var t_xyStack=c_Stack.m_new.call(new c_Stack);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<451>";
		for(var t_p0=0;t_p0<=dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index].length-1;t_p0=t_p0+3){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<452>";
			var t_p1=t_p0+3;
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<452>";
			if(t_p1>dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index].length-1){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<452>";
				t_p1=0;
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<454>";
			t_xyStack.p_Push(dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p0)[dbg_index]);
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<455>";
			t_xyStack.p_Push(dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p0+1)[dbg_index]);
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<456>";
			t_xyStack.p_Push(dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p0+2)[dbg_index]);
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<458>";
			if(dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p0+2)[dbg_index]==0.0 && dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p1+2)[dbg_index]==0.0){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<459>";
				var t_tx=(dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p0)[dbg_index]+dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p1)[dbg_index])/2.0;
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<460>";
				var t_ty=(dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p0+1)[dbg_index]+dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p1+1)[dbg_index])/2.0;
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<461>";
				t_xyStack.p_Push(t_tx);
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<462>";
				t_xyStack.p_Push(t_ty);
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<463>";
				t_xyStack.p_Push(1.0);
			}
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<466>";
		dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index]=t_xyStack.p_ToArray()
	}
	pop_err();
	return 0;
}
c_TFont.prototype.p_CalculateCurve=function(t_x1,t_y1,t_x2,t_y2,t_x3,t_y3){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<495>";
	var t_Lst=new_number_array(10);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<496>";
	var t_Counter=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<497>";
	for(var t_t=0.0;t_t<=0.8;t_t=t_t+0.2){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<498>";
		var t_tx=Math.pow(1.0-t_t,2.0)*(t_x1)+2.0*((1.0-t_t)*t_t*(t_x2))+Math.pow(t_t,2.0)*(t_x3);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<499>";
		var t_ty=Math.pow(1.0-t_t,2.0)*(t_y1)+2.0*((1.0-t_t)*t_t*(t_y2))+Math.pow(t_t,2.0)*(t_y3);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<500>";
		dbg_array(t_Lst,t_Counter)[dbg_index]=t_tx
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<501>";
		dbg_array(t_Lst,t_Counter+1)[dbg_index]=t_ty
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<502>";
		t_Counter=t_Counter+2;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<504>";
	pop_err();
	return t_Lst;
}
c_TFont.prototype.p_SmoothGlyph=function(t_Id){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<470>";
	for(var t_c=0;t_c<=dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_ContourNumber-1;t_c=t_c+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<471>";
		var t_xyStack=c_Stack.m_new.call(new c_Stack);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<472>";
		for(var t_p0=0;t_p0<=dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index].length-1;t_p0=t_p0+3){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<473>";
			var t_p1=t_p0+3;
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<473>";
			if(t_p1>dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index].length-1){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<473>";
				t_p1=0;
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<474>";
			var t_p2=t_p1+3;
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<474>";
			if(t_p2>dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index].length-1){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<474>";
				t_p2=0;
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<476>";
			if(dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p0+2)[dbg_index]==0.0){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<476>";
				continue;
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<479>";
			if(dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p0+2)[dbg_index]==1.0 && dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p1+2)[dbg_index]==1.0){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<480>";
				t_xyStack.p_Push(dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p0)[dbg_index]);
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<481>";
				t_xyStack.p_Push(dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p0+1)[dbg_index]);
			}else{
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<484>";
				var t_T=this.p_CalculateCurve(((dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p0)[dbg_index])|0),((dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p0+1)[dbg_index])|0),((dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p1)[dbg_index])|0),((dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p1+1)[dbg_index])|0),((dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p2)[dbg_index])|0),((dbg_array(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index],t_p2+1)[dbg_index])|0));
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<485>";
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<485>";
				var t_=t_T;
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<485>";
				var t_2=0;
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<485>";
				while(t_2<t_.length){
					err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<485>";
					var t_tt=dbg_array(t_,t_2)[dbg_index];
					err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<485>";
					t_2=t_2+1;
					err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<486>";
					t_xyStack.p_Push(t_tt);
				}
			}
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<490>";
		dbg_array(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xyList,t_c)[dbg_index]=t_xyStack.p_ToArray()
	}
	pop_err();
	return 0;
}
c_TFont.m_new=function(t_Path,t_Size,t_Color){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<29>";
	this.m_Stream=c_DataStream.m_new.call(new c_DataStream,"monkey://data/"+t_Path,true);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<30>";
	dbg_object(this).m_Size=t_Size;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<31>";
	dbg_object(this).m_Color=t_Color;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<32>";
	dbg_object(this).m_Path=t_Path;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<33>";
	if(dbg_object(this.m_Stream).m_Buffer==null){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<33>";
		error(t_Path+" : Font file not found");
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<36>";
	var t_sfntVersion=((this.m_Stream.p_ReadFixed32())|0);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<37>";
	var t_numTables=this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<38>";
	var t_searchRange=this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<39>";
	var t_entrySelector=this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<40>";
	var t_rangeShift=this.m_Stream.p_ReadUInt(2);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<41>";
	if(t_sfntVersion==1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<42>";
		this.m_OutlineType="TT";
	}else{
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<44>";
		this.m_OutlineType="OT";
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<48>";
	var t_cmapOffset=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<48>";
	var t_headOffset=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<48>";
	var t_hheaOffset=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<48>";
	var t_hmtxOffset=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<48>";
	var t_maxpOffset=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<48>";
	var t_nameOffset=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<48>";
	var t_glyfOffset=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<48>";
	var t_locaOffset=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<48>";
	var t_CFFOffset=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<48>";
	var t_VORGOffset=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<49>";
	for(var t_i=0;t_i<=t_numTables-1;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<50>";
		var t_tag=this.m_Stream.p_ReadString(4);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<51>";
		var t_checksum=this.m_Stream.p_ReadUInt(4);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<52>";
		var t_offset=this.m_Stream.p_ReadUInt(4);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<53>";
		var t_length=this.m_Stream.p_ReadUInt(4);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<54>";
		var t_1=t_tag;
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<55>";
		if(t_1=="cmap"){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<56>";
			t_cmapOffset=t_offset;
		}else{
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<57>";
			if(t_1=="head"){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<58>";
				t_headOffset=t_offset;
			}else{
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<59>";
				if(t_1=="hhea"){
					err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<60>";
					t_hheaOffset=t_offset;
				}else{
					err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<61>";
					if(t_1=="hmtx"){
						err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<62>";
						t_hmtxOffset=t_offset;
					}else{
						err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<63>";
						if(t_1=="maxp"){
							err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<64>";
							t_maxpOffset=t_offset;
						}else{
							err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<65>";
							if(t_1=="name"){
								err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<66>";
								t_nameOffset=t_offset;
							}else{
								err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<67>";
								if(t_1=="glyf"){
									err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<68>";
									t_glyfOffset=t_offset;
								}else{
									err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<69>";
									if(t_1=="loca"){
										err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<70>";
										t_locaOffset=t_offset;
									}else{
										err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<71>";
										if(t_1=="CFF "){
											err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<72>";
											t_CFFOffset=t_offset;
										}else{
											err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<73>";
											if(t_1=="VORG"){
												err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<74>";
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
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<80>";
	this.m_GlyphNumber=this.m_Stream.p_PeekUInt(2,t_maxpOffset+4);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<81>";
	dbg_array(this.m_FontLimits,0)[dbg_index]=this.m_Stream.p_PeekInt(2,t_headOffset+36)
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<82>";
	dbg_array(this.m_FontLimits,1)[dbg_index]=this.m_Stream.p_PeekInt(2,t_headOffset+38)
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<83>";
	dbg_array(this.m_FontLimits,2)[dbg_index]=this.m_Stream.p_PeekInt(2,t_headOffset+40)
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<84>";
	dbg_array(this.m_FontLimits,3)[dbg_index]=this.m_Stream.p_PeekInt(2,t_headOffset+42)
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<85>";
	this.m_FontScale=(t_Size)*1.0/(dbg_array(this.m_FontLimits,3)[dbg_index]);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<86>";
	this.m_LineHeight=t_Size;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<87>";
	var t_LocaFormat=this.m_Stream.p_PeekInt(2,t_headOffset+50);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<88>";
	var t_HMetricsNumber=this.m_Stream.p_PeekUInt(2,t_hheaOffset+34);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<91>";
	this.m_GlyphId=new_number_array(1000);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<92>";
	this.m_Glyph=new_object_array(this.m_GlyphNumber);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<93>";
	for(var t_i2=0;t_i2<=this.m_GlyphNumber-1;t_i2=t_i2+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<94>";
		dbg_array(this.m_Glyph,t_i2)[dbg_index]=c_TFont_Glyph.m_new.call(new c_TFont_Glyph)
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<98>";
	this.p_LoadMetrics(t_hmtxOffset,t_HMetricsNumber);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<99>";
	this.p_LoadCmapData(t_cmapOffset);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<100>";
	this.p_LoadLoca(t_locaOffset,t_LocaFormat,t_glyfOffset);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<103>";
	for(var t_g=0;t_g<=this.m_GlyphNumber-1;t_g=t_g+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<105>";
		this.p_LoadGlyfData(t_g,dbg_object(dbg_array(this.m_Glyph,t_g)[dbg_index]).m_FileAddress);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<106>";
		this.p_QuadGlyph(t_g);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<107>";
		this.p_SmoothGlyph(t_g);
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<111>";
	for(var t_g2=0;t_g2<=this.m_GlyphNumber-1;t_g2=t_g2+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<112>";
		dbg_object(dbg_array(this.m_Glyph,t_g2)[dbg_index]).m_Poly=new_object_array(dbg_object(dbg_array(this.m_Glyph,t_g2)[dbg_index]).m_ContourNumber);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<113>";
		for(var t_c=0;t_c<=dbg_object(dbg_array(this.m_Glyph,t_g2)[dbg_index]).m_ContourNumber-1;t_c=t_c+1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<114>";
			dbg_array(dbg_object(dbg_array(this.m_Glyph,t_g2)[dbg_index]).m_Poly,t_c)[dbg_index]=c_TFont_Poly.m_new.call(new c_TFont_Poly,dbg_array(dbg_object(dbg_array(this.m_Glyph,t_g2)[dbg_index]).m_xyList,t_c)[dbg_index],this.m_FontScale)
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<115>";
			if(dbg_object(dbg_array(this.m_Glyph,t_g2)[dbg_index]).m_ContourNumber==1 && !this.m_ClockwiseFound){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<116>";
				this.m_FontClockwise=dbg_object(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_g2)[dbg_index]).m_Poly,0)[dbg_index]).m_Clockwise;
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<117>";
				this.m_ClockwiseFound=true;
			}
		}
	}
	pop_err();
	return this;
}
c_TFont.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<8>";
	pop_err();
	return this;
}
c_TFont.prototype.p_LoadGlyphImages=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<508>";
	var t_OrigColor=bb_graphics_GetColor();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<510>";
	var t_BW=(((dbg_array(this.m_FontLimits,2)[dbg_index]-dbg_array(this.m_FontLimits,0)[dbg_index])*this.m_FontScale+2.0)|0);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<511>";
	var t_BH=(((dbg_array(this.m_FontLimits,3)[dbg_index]-dbg_array(this.m_FontLimits,1)[dbg_index])*this.m_FontScale+2.0)|0);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<512>";
	var t_BG=bb_graphics_CreateImage(t_BW,t_BH,1,c_Image.m_DefaultFlags);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<513>";
	var t_BGPixels=new_number_array(t_BW*t_BH);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<514>";
	bb_graphics_ReadPixels(t_BGPixels,0,0,t_BW,t_BH,0,0);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<515>";
	t_BG.p_WritePixels(t_BGPixels,0,0,t_BW,t_BH,0,0);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<517>";
	bb_graphics_PushMatrix();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<518>";
	bb_graphics_Scale(this.m_FontScale,this.m_FontScale);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<519>";
	for(var t_g=0;t_g<=this.m_GlyphNumber-1;t_g=t_g+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<520>";
		if(dbg_object(dbg_array(this.m_Glyph,t_g)[dbg_index]).m_ContourNumber<1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<520>";
			continue;
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<521>";
		var t_W=(((dbg_object(dbg_array(this.m_Glyph,t_g)[dbg_index]).m_W)*this.m_FontScale+4.0)|0);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<522>";
		var t_H=(((dbg_object(dbg_array(this.m_Glyph,t_g)[dbg_index]).m_H)*this.m_FontScale+4.0)|0);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<523>";
		if(t_W<1 || t_H<1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<523>";
			continue;
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<526>";
		bb_graphics_SetColor(255.0,255.0,255.0);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<527>";
		bb_graphics_DrawRect(0.0,0.0,(t_W)/this.m_FontScale,(t_H)/this.m_FontScale);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<529>";
		bb_graphics_SetColor(0.0,0.0,0.0);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<530>";
		for(var t_i=0;t_i<=dbg_object(dbg_array(this.m_Glyph,t_g)[dbg_index]).m_ContourNumber-1;t_i=t_i+1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<531>";
			if(dbg_object(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_g)[dbg_index]).m_Poly,t_i)[dbg_index]).m_Clockwise==this.m_FontClockwise){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<532>";
				dbg_array(dbg_object(dbg_array(this.m_Glyph,t_g)[dbg_index]).m_Poly,t_i)[dbg_index].p_Draw();
			}
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<536>";
		bb_graphics_SetColor(255.0,255.0,255.0);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<537>";
		for(var t_i2=0;t_i2<=dbg_object(dbg_array(this.m_Glyph,t_g)[dbg_index]).m_ContourNumber-1;t_i2=t_i2+1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<538>";
			if(dbg_object(dbg_array(dbg_object(dbg_array(this.m_Glyph,t_g)[dbg_index]).m_Poly,t_i2)[dbg_index]).m_Clockwise!=this.m_FontClockwise){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<539>";
				dbg_array(dbg_object(dbg_array(this.m_Glyph,t_g)[dbg_index]).m_Poly,t_i2)[dbg_index].p_Draw();
			}
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<544>";
		var t_pixels=new_number_array(t_W*t_H);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<545>";
		bb_graphics_ReadPixels(t_pixels,0,0,t_W,t_H,0,0);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<548>";
		for(var t_i3=0;t_i3<t_pixels.length;t_i3=t_i3+1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<549>";
			var t_argb=dbg_array(t_pixels,t_i3)[dbg_index];
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<550>";
			var t_a=t_argb>>24&255;
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<551>";
			var t_r=t_argb>>16&255;
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<552>";
			var t_g2=t_argb>>8&255;
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<553>";
			var t_b=t_argb&255;
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<554>";
			t_a=255-t_r;
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<555>";
			t_r=dbg_array(this.m_Color,0)[dbg_index];
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<556>";
			t_g2=dbg_array(this.m_Color,1)[dbg_index];
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<557>";
			t_b=dbg_array(this.m_Color,2)[dbg_index];
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<558>";
			t_argb=t_a<<24|t_r<<16|t_g2<<8|t_b;
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<559>";
			dbg_array(t_pixels,t_i3)[dbg_index]=t_argb
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<561>";
		dbg_object(dbg_array(this.m_Glyph,t_g)[dbg_index]).m_Img=bb_graphics_CreateImage(t_W,t_H,1,c_Image.m_DefaultFlags);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<562>";
		dbg_object(dbg_array(this.m_Glyph,t_g)[dbg_index]).m_Img.p_WritePixels(t_pixels,0,0,t_W,t_H,0,0);
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<564>";
	bb_graphics_PopMatrix();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<565>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<566>";
	bb_graphics_DrawImage(t_BG,0.0,0.0,0);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<567>";
	this.m_ImagesLoaded=true;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<568>";
	bb_graphics_SetColor(dbg_array(t_OrigColor,0)[dbg_index],dbg_array(t_OrigColor,1)[dbg_index],dbg_array(t_OrigColor,2)[dbg_index]);
	pop_err();
	return 0;
}
c_TFont.prototype.p_TextHeight=function(t_Text,t_AdditionalLineSpace){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<180>";
	var t_Height=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<181>";
	var t_Lines=t_Text.split("\n").length;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<182>";
	var t_=t_Lines*this.m_LineHeight+t_Lines*t_AdditionalLineSpace;
	pop_err();
	return t_;
}
c_TFont.prototype.p_TextWidth=function(t_Text,t_AdditionalLetterSpace){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<166>";
	var t_Width=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<167>";
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<167>";
	var t_=t_Text.split("\n");
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<167>";
	var t_2=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<167>";
	while(t_2<t_.length){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<167>";
		var t_L=dbg_array(t_,t_2)[dbg_index];
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<167>";
		t_2=t_2+1;
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<168>";
		var t_TempWidth=0;
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<169>";
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<169>";
		var t_3=t_L;
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<169>";
		var t_4=0;
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<169>";
		while(t_4<t_3.length){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<169>";
			var t_c=dbg_charCodeAt(t_3,t_4);
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<169>";
			t_4=t_4+1;
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<170>";
			var t_Id=dbg_array(this.m_GlyphId,t_c)[dbg_index];
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<171>";
			t_TempWidth=(((t_TempWidth)+(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_Adv)*this.m_FontScale+(t_AdditionalLetterSpace))|0);
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<173>";
		if(t_TempWidth>t_Width){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<173>";
			t_Width=t_TempWidth;
		}
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<176>";
	pop_err();
	return t_Width;
}
c_TFont.prototype.p_DrawText=function(t_Text,t_x,t_y,t_CenterX,t_CenterY,t_AdditionalLetterSpace,t_AdditionalLineSpace){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<128>";
	if(this.m_ImagesLoaded==false){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<129>";
		this.p_LoadGlyphImages();
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<130>";
		this.m_ImagesLoaded=true;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<134>";
	var t_X2=t_x;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<135>";
	var t_Y2=t_y;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<137>";
	if(t_CenterY==1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<138>";
		t_Y2=t_Y2-((this.p_TextHeight(t_Text,t_AdditionalLineSpace)/2)|0);
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<141>";
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<141>";
	var t_=t_Text.split("\n");
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<141>";
	var t_2=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<141>";
	while(t_2<t_.length){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<141>";
		var t_L=dbg_array(t_,t_2)[dbg_index];
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<141>";
		t_2=t_2+1;
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<142>";
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<142>";
		var t_3=t_L;
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<142>";
		var t_4=0;
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<142>";
		while(t_4<t_3.length){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<142>";
			var t_c=dbg_charCodeAt(t_3,t_4);
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<142>";
			t_4=t_4+1;
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<143>";
			var t_Id=dbg_array(this.m_GlyphId,t_c)[dbg_index];
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<144>";
			var t_tx=(((t_X2)+(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_xMin)*this.m_FontScale)|0);
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<145>";
			var t_ty=(((t_Y2)-(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_yMax)*this.m_FontScale+(this.m_LineHeight))|0);
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<147>";
			if(t_CenterX==1){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<148>";
				t_tx=t_tx-((this.p_TextWidth(t_L,t_AdditionalLetterSpace)/2)|0);
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<151>";
			if(t_c>32){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<152>";
				if(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_Img!=null){
					err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<152>";
					bb_graphics_DrawImage(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_Img,(t_tx),(t_ty),0);
				}
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<154>";
			t_X2=(((t_X2)+(dbg_object(dbg_array(this.m_Glyph,t_Id)[dbg_index]).m_Adv)*this.m_FontScale+(t_AdditionalLetterSpace))|0);
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<157>";
		t_X2=t_x;
		err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<158>";
		t_Y2=t_Y2+this.m_LineHeight+t_AdditionalLineSpace;
	}
	pop_err();
	return 0;
}
function c_DataStream(){
	Object.call(this);
	this.m_Buffer=null;
	this.m_Pointer=0;
	this.m_BigEndian=false;
}
c_DataStream.m_new=function(t_Path,t_BigEndianFormat){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<14>";
	this.m_Buffer=c_DataBuffer.m_Load(t_Path);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<15>";
	this.m_Pointer=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<16>";
	this.m_BigEndian=t_BigEndianFormat;
	pop_err();
	return this;
}
c_DataStream.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<4>";
	pop_err();
	return this;
}
c_DataStream.prototype.p_ByteToArr=function(t_Address){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<121>";
	var t_I=this.m_Buffer.PeekByte(t_Address);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<122>";
	var t_Str=new_number_array(8);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<124>";
	if(t_I>-1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<126>";
		var t_D=128;
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<126>";
		var t_Counter=0;
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<127>";
		while(t_I>0){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<128>";
			if(t_I>=t_D){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<129>";
				dbg_array(t_Str,t_Counter)[dbg_index]=1
				err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<130>";
				t_I=t_I-t_D;
			}else{
				err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<132>";
				dbg_array(t_Str,t_Counter)[dbg_index]=0
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<134>";
			t_D=((t_D/2)|0);
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<135>";
			t_Counter=t_Counter+1;
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<138>";
		while(t_Counter<8){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<139>";
			dbg_array(t_Str,t_Counter)[dbg_index]=0
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<140>";
			t_Counter=t_Counter+1;
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<142>";
		pop_err();
		return t_Str;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<147>";
	t_I=t_I*-1;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<149>";
	var t_D2=128;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<149>";
	var t_Counter2=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<150>";
	while(t_I>0){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<151>";
		if(t_I>=t_D2){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<152>";
			dbg_array(t_Str,t_Counter2)[dbg_index]=1
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<153>";
			t_I=t_I-t_D2;
		}else{
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<155>";
			dbg_array(t_Str,t_Counter2)[dbg_index]=0
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<157>";
		t_D2=((t_D2/2)|0);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<158>";
		t_Counter2=t_Counter2+1;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<161>";
	while(t_Str.length<8){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<162>";
		dbg_array(t_Str,t_Counter2)[dbg_index]=0
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<163>";
		t_Counter2=t_Counter2+1;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<166>";
	for(var t_i2=7;t_i2>=0;t_i2=t_i2+-1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<167>";
		if(dbg_array(t_Str,t_i2)[dbg_index]==0){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<168>";
			dbg_array(t_Str,t_i2)[dbg_index]=1
		}else{
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<170>";
			dbg_array(t_Str,t_i2)[dbg_index]=0
		}
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<174>";
	for(var t_i3=7;t_i3>=0;t_i3=t_i3+-1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<175>";
		if(dbg_array(t_Str,t_i3)[dbg_index]==0){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<176>";
			dbg_array(t_Str,t_i3)[dbg_index]=1
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<177>";
			break;
		}else{
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<179>";
			dbg_array(t_Str,t_i3)[dbg_index]=0
		}
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<182>";
	pop_err();
	return t_Str;
}
c_DataStream.prototype.p_BytesToArr=function(t_Address,t_Count){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<110>";
	var t_Str=new_number_array(t_Count*8);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<110>";
	var t_Counter=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<111>";
	for(var t_i=0;t_i<=t_Count-1;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<112>";
		var t_Byt=this.p_ByteToArr(t_Address+t_i);
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<113>";
		for(var t_c=0;t_c<=7;t_c=t_c+1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<114>";
			dbg_array(t_Str,t_Counter)[dbg_index]=dbg_array(t_Byt,t_c)[dbg_index]
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<115>";
			t_Counter=t_Counter+1;
		}
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<118>";
	pop_err();
	return t_Str;
}
c_DataStream.m_ChangeEndian=function(t_BitString){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<98>";
	if(t_BitString.length<16){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<98>";
		pop_err();
		return t_BitString;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<99>";
	var t_t=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<100>";
	for(var t_b=0;t_b<=(((t_BitString.length-1)/2)|0);t_b=t_b+8){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<101>";
		for(var t_i=0;t_i<=7;t_i=t_i+1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<102>";
			t_t=dbg_array(t_BitString,t_b+t_i)[dbg_index];
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<103>";
			dbg_array(t_BitString,t_b+t_i)[dbg_index]=dbg_array(t_BitString,t_BitString.length-8-t_b+t_i)[dbg_index]
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<104>";
			dbg_array(t_BitString,t_BitString.length-8-t_b+t_i)[dbg_index]=t_t
		}
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<107>";
	pop_err();
	return t_BitString;
}
c_DataStream.m_CalculateBits=function(t_BitString){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<197>";
	if(dbg_array(t_BitString,0)[dbg_index]==0){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<198>";
		var t_Rtn=0;
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<198>";
		var t_D=1;
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<199>";
		for(var t_i=t_BitString.length-1;t_i>=0;t_i=t_i+-1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<200>";
			if(dbg_array(t_BitString,t_i)[dbg_index]==1){
				err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<201>";
				t_Rtn=t_Rtn+t_D;
			}
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<203>";
			t_D=t_D*2;
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<205>";
		pop_err();
		return t_Rtn;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<210>";
	for(var t_i2=0;t_i2<=t_BitString.length-1;t_i2=t_i2+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<211>";
		if(dbg_array(t_BitString,t_i2)[dbg_index]==0){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<212>";
			dbg_array(t_BitString,t_i2)[dbg_index]=1
		}else{
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<214>";
			dbg_array(t_BitString,t_i2)[dbg_index]=0
		}
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<218>";
	for(var t_i3=t_BitString.length-1;t_i3>=0;t_i3=t_i3+-1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<219>";
		if(dbg_array(t_BitString,t_i3)[dbg_index]==0){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<220>";
			dbg_array(t_BitString,t_i3)[dbg_index]=1
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<221>";
			break;
		}else{
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<223>";
			dbg_array(t_BitString,t_i3)[dbg_index]=0
		}
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<227>";
	var t_Rtn2=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<227>";
	var t_D2=1;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<228>";
	for(var t_i4=t_BitString.length-1;t_i4>=0;t_i4=t_i4+-1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<229>";
		if(dbg_array(t_BitString,t_i4)[dbg_index]==1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<230>";
			t_Rtn2=t_Rtn2+t_D2;
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<232>";
		t_D2=t_D2*2;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<234>";
	var t_=t_Rtn2*-1;
	pop_err();
	return t_;
}
c_DataStream.prototype.p_ReadInt=function(t_ByteCount){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<31>";
	this.m_Pointer=this.m_Pointer+t_ByteCount;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<32>";
	if(!this.m_BigEndian){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<32>";
		var t_=c_DataStream.m_CalculateBits(c_DataStream.m_ChangeEndian(this.p_BytesToArr(this.m_Pointer-t_ByteCount,t_ByteCount)));
		pop_err();
		return t_;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<33>";
	var t_2=c_DataStream.m_CalculateBits(this.p_BytesToArr(this.m_Pointer-t_ByteCount,t_ByteCount));
	pop_err();
	return t_2;
}
c_DataStream.prototype.p_ReadFixed32=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<41>";
	var t_=parseFloat(String(this.p_ReadInt(2))+"."+String(this.p_ReadInt(2)));
	pop_err();
	return t_;
}
c_DataStream.m_CalculateUBits=function(t_BitString){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<186>";
	var t_Rtn=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<186>";
	var t_D=1;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<187>";
	for(var t_i=t_BitString.length-1;t_i>=0;t_i=t_i+-1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<188>";
		if(dbg_array(t_BitString,t_i)[dbg_index]==1){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<189>";
			t_Rtn=t_Rtn+t_D;
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<191>";
		t_D=t_D*2;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<193>";
	pop_err();
	return t_Rtn;
}
c_DataStream.prototype.p_ReadUInt=function(t_ByteCount){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<36>";
	this.m_Pointer=this.m_Pointer+t_ByteCount;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<37>";
	if(!this.m_BigEndian){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<37>";
		var t_=c_DataStream.m_CalculateUBits(c_DataStream.m_ChangeEndian(this.p_BytesToArr(this.m_Pointer-t_ByteCount,t_ByteCount)));
		pop_err();
		return t_;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<38>";
	var t_2=c_DataStream.m_CalculateUBits(this.p_BytesToArr(this.m_Pointer-t_ByteCount,t_ByteCount));
	pop_err();
	return t_2;
}
c_DataStream.prototype.p_ReadString=function(t_ByteCount){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<44>";
	this.m_Pointer=this.m_Pointer+t_ByteCount;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<45>";
	var t_=this.m_Buffer.p_PeekString(this.m_Pointer-t_ByteCount,t_ByteCount,"utf8");
	pop_err();
	return t_;
}
c_DataStream.prototype.p_PeekUInt=function(t_ByteCount,t_Address){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<66>";
	if(!this.m_BigEndian){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<66>";
		c_DataStream.m_CalculateUBits(c_DataStream.m_ChangeEndian(this.p_BytesToArr(t_Address,t_ByteCount)));
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<67>";
	var t_=c_DataStream.m_CalculateUBits(this.p_BytesToArr(t_Address,t_ByteCount));
	pop_err();
	return t_;
}
c_DataStream.prototype.p_PeekInt=function(t_ByteCount,t_Address){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<62>";
	if(!this.m_BigEndian){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<62>";
		var t_=c_DataStream.m_CalculateBits(c_DataStream.m_ChangeEndian(this.p_BytesToArr(t_Address,t_ByteCount)));
		pop_err();
		return t_;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<63>";
	var t_2=c_DataStream.m_CalculateBits(this.p_BytesToArr(t_Address,t_ByteCount));
	pop_err();
	return t_2;
}
c_DataStream.prototype.p_SetPointer=function(t_Offset){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<21>";
	this.m_Pointer=t_Offset;
	pop_err();
	return 0;
}
c_DataStream.prototype.p_ReadBits=function(t_ByteCount){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<48>";
	var t_Str=this.p_BytesToArr(this.m_Pointer,t_ByteCount);
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<49>";
	this.m_Pointer=this.m_Pointer+t_ByteCount;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<50>";
	if(!this.m_BigEndian){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<50>";
		t_Str=c_DataStream.m_ChangeEndian(t_Str);
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<51>";
	var t_temp=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<52>";
	for(var t_i=0;t_i<((t_Str.length/2)|0);t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<53>";
		t_temp=dbg_array(t_Str,t_i)[dbg_index];
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<54>";
		dbg_array(t_Str,t_i)[dbg_index]=dbg_array(t_Str,t_Str.length-t_i-1)[dbg_index]
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<55>";
		dbg_array(t_Str,t_Str.length-t_i-1)[dbg_index]=t_temp
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontdatastream.monkey<57>";
	pop_err();
	return t_Str;
}
function c_DataBuffer(){
	BBDataBuffer.call(this);
}
c_DataBuffer.prototype=extend_class(BBDataBuffer);
c_DataBuffer.m_new=function(t_length){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<94>";
	if(!this._New(t_length)){
		err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<94>";
		error("Allocate DataBuffer failed");
	}
	pop_err();
	return this;
}
c_DataBuffer.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<91>";
	pop_err();
	return this;
}
c_DataBuffer.m_Load=function(t_path){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<289>";
	var t_buf=c_DataBuffer.m_new2.call(new c_DataBuffer);
	err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<290>";
	if(t_buf._Load(t_path)){
		err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<290>";
		pop_err();
		return t_buf;
	}
	err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<291>";
	pop_err();
	return null;
}
c_DataBuffer.prototype.p_PeekBytes=function(t_address,t_bytes,t_offset,t_count){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<137>";
	if(t_address+t_count>this.Length()){
		err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<137>";
		t_count=this.Length()-t_address;
	}
	err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<138>";
	if(t_offset+t_count>t_bytes.length){
		err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<138>";
		t_count=t_bytes.length-t_offset;
	}
	err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<139>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<140>";
		dbg_array(t_bytes,t_offset+t_i)[dbg_index]=this.PeekByte(t_address+t_i)
	}
	pop_err();
}
c_DataBuffer.prototype.p_PeekBytes2=function(t_address,t_count){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<130>";
	if(t_address+t_count>this.Length()){
		err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<130>";
		t_count=this.Length()-t_address;
	}
	err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<131>";
	var t_bytes=new_number_array(t_count);
	err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<132>";
	this.p_PeekBytes(t_address,t_bytes,0,t_count);
	err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<133>";
	pop_err();
	return t_bytes;
}
c_DataBuffer.prototype.p_PeekString=function(t_address,t_count,t_encoding){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<206>";
	var t_1=t_encoding;
	err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<207>";
	if(t_1=="utf8"){
		err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<208>";
		var t_p=this.p_PeekBytes2(t_address,t_count);
		err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<209>";
		var t_i=0;
		err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<209>";
		var t_e=t_p.length;
		err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<209>";
		var t_err=false;
		err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<210>";
		var t_q=new_number_array(t_e);
		err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<210>";
		var t_j=0;
		err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<211>";
		while(t_i<t_e){
			err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<212>";
			var t_c=dbg_array(t_p,t_i)[dbg_index]&255;
			err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<213>";
			t_i+=1;
			err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<214>";
			if((t_c&128)!=0){
				err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<215>";
				if((t_c&224)==192){
					err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<216>";
					if(t_i>=t_e || (dbg_array(t_p,t_i)[dbg_index]&192)!=128){
						err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<217>";
						t_err=true;
						err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<218>";
						break;
					}
					err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<220>";
					t_c=(t_c&31)<<6|dbg_array(t_p,t_i)[dbg_index]&63;
					err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<221>";
					t_i+=1;
				}else{
					err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<222>";
					if((t_c&240)==224){
						err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<223>";
						if(t_i+1>=t_e || (dbg_array(t_p,t_i)[dbg_index]&192)!=128 || (dbg_array(t_p,t_i+1)[dbg_index]&192)!=128){
							err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<224>";
							t_err=true;
							err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<225>";
							break;
						}
						err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<227>";
						t_c=(t_c&15)<<12|(dbg_array(t_p,t_i)[dbg_index]&63)<<6|dbg_array(t_p,t_i+1)[dbg_index]&63;
						err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<228>";
						t_i+=2;
					}else{
						err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<230>";
						t_err=true;
						err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<231>";
						break;
					}
				}
			}
			err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<234>";
			dbg_array(t_q,t_j)[dbg_index]=t_c
			err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<235>";
			t_j+=1;
		}
		err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<237>";
		if(t_err){
			err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<239>";
			var t_=string_fromchars(t_p);
			pop_err();
			return t_;
		}
		err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<241>";
		if(t_j<t_e){
			err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<241>";
			t_q=t_q.slice(0,t_j);
		}
		err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<242>";
		var t_2=string_fromchars(t_q);
		pop_err();
		return t_2;
	}else{
		err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<243>";
		if(t_1=="ascii"){
			err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<244>";
			var t_p2=this.p_PeekBytes2(t_address,t_count);
			err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<245>";
			for(var t_i2=0;t_i2<t_p2.length;t_i2=t_i2+1){
				err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<246>";
				dbg_array(t_p2,t_i2)[dbg_index]&=255
			}
			err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<248>";
			var t_3=string_fromchars(t_p2);
			pop_err();
			return t_3;
		}
	}
	err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<251>";
	error("Invalid string encoding:"+t_encoding);
	pop_err();
	return "";
}
c_DataBuffer.prototype.p_PeekString2=function(t_address,t_encoding){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/brl/databuffer.monkey<201>";
	var t_=this.p_PeekString(t_address,this.Length()-t_address,t_encoding);
	pop_err();
	return t_;
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
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfont.monkey<576>";
	pop_err();
	return this;
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
		this.m_data=resize_number_array(this.m_data,this.m_length*2+10);
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
c_Stack.prototype.p_ToArray=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<18>";
	var t_t=new_number_array(this.m_length);
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<19>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<20>";
		dbg_array(t_t,t_i)[dbg_index]=dbg_array(this.m_data,t_i)[dbg_index]
	}
	err_info="/Applications/MonkeyX77a/modules/monkey/stack.monkey<22>";
	pop_err();
	return t_t;
}
function c_TFont_Poly(){
	Object.call(this);
	this.m_Scaler=.0;
	this.m_OrigArray=[];
	this.m_xyList=[];
	this.m_Clockwise=false;
}
c_TFont_Poly.prototype.p_GetClockWise=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontpoly.monkey<61>";
	var t_Total=0;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontpoly.monkey<62>";
	for(var t_p1=0;t_p1<((this.m_xyList.length/2)|0);t_p1=t_p1+1){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontpoly.monkey<63>";
		var t_p2=t_p1+1;
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontpoly.monkey<63>";
		if(t_p2==((this.m_xyList.length/2)|0)){
			err_info="/Applications/MonkeyX77a/modules/tfont/tfontpoly.monkey<63>";
			t_p2=0;
		}
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontpoly.monkey<64>";
		t_Total=(((t_Total)+(dbg_array(this.m_xyList,t_p2*2)[dbg_index]-dbg_array(this.m_xyList,t_p1*2)[dbg_index])*(dbg_array(this.m_xyList,t_p2*2+1)[dbg_index]+dbg_array(this.m_xyList,t_p1*2+1)[dbg_index]))|0);
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontpoly.monkey<66>";
	if(t_Total<0){
		err_info="/Applications/MonkeyX77a/modules/tfont/tfontpoly.monkey<66>";
		pop_err();
		return true;
	}
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontpoly.monkey<67>";
	pop_err();
	return false;
}
c_TFont_Poly.m_new=function(t_xyList,t_Scaler){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontpoly.monkey<28>";
	dbg_object(this).m_Scaler=t_Scaler;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontpoly.monkey<29>";
	dbg_object(this).m_OrigArray=t_xyList;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontpoly.monkey<30>";
	dbg_object(this).m_xyList=t_xyList;
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontpoly.monkey<33>";
	dbg_object(this).m_Clockwise=this.p_GetClockWise();
	pop_err();
	return this;
}
c_TFont_Poly.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontpoly.monkey<3>";
	pop_err();
	return this;
}
c_TFont_Poly.prototype.p_Draw=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/tfont/tfontpoly.monkey<22>";
	bb_graphics_DrawPoly(this.m_OrigArray);
	pop_err();
	return 0;
}
var bb_SalesOfADeathman_TitleFont=null;
var bb_SalesOfADeathman_MenuFont=null;
var bb_SalesOfADeathman_FamilyFont=null;
var bb_SalesOfADeathman_DealerFont=null;
var bb_SalesOfADeathman_TapFont=null;
function c_AssetManager(){
	Object.call(this);
	this.m_images=null;
	this.m_cMasks=null;
	this.m_processCollisionMasks=false;
}
c_AssetManager.m_new=function(t_cmFlag){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/assetmanager.monkey<12>";
	dbg_object(this).m_images=c_StringMap.m_new.call(new c_StringMap);
	err_info="/Applications/MonkeyX77a/modules/lazeng/assetmanager.monkey<13>";
	dbg_object(this).m_cMasks=c_StringMap2.m_new.call(new c_StringMap2);
	err_info="/Applications/MonkeyX77a/modules/lazeng/assetmanager.monkey<14>";
	dbg_object(this).m_processCollisionMasks=t_cmFlag;
	pop_err();
	return this;
}
function c_Map(){
	Object.call(this);
}
c_Map.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
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
function c_Map2(){
	Object.call(this);
}
c_Map2.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
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
function c_Controller(){
	Object.call(this);
	this.m_playerNo=0;
	this.m_direction=-1;
	this.m_input=new_number_array(12);
	this.m_justPressed=new_number_array(12);
	this.m_justReleased=new_number_array(12);
}
c_Controller.m_new=function(t_p){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<32>";
	dbg_object(this).m_playerNo=t_p;
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<33>";
	dbg_object(this).m_direction=-1;
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<35>";
	for(var t_idx=0;t_idx<dbg_object(this).m_input.length;t_idx=t_idx+1){
		err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<36>";
		dbg_array(dbg_object(this).m_input,t_idx)[dbg_index]=0
	}
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<38>";
	for(var t_idx2=0;t_idx2<dbg_object(this).m_justPressed.length;t_idx2=t_idx2+1){
		err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<39>";
		dbg_array(dbg_object(this).m_justPressed,t_idx2)[dbg_index]=0
	}
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<41>";
	for(var t_idx3=0;t_idx3<dbg_object(this).m_justReleased.length;t_idx3=t_idx3+1){
		err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<42>";
		dbg_array(dbg_object(this).m_justReleased,t_idx3)[dbg_index]=0
	}
	pop_err();
	return this;
}
c_Controller.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/controller.monkey<3>";
	pop_err();
	return this;
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
c_Rect.prototype.p_ContainsPoint=function(t_point){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<109>";
	var t_answer=false;
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<110>";
	if(this.p_TL2().p_x2()<t_point.p_x2()){
		err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<111>";
		if(this.p_TL2().p_y2()<t_point.p_y2()){
			err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<112>";
			if(this.p_BR2().p_x2()>t_point.p_x2()){
				err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<113>";
				if(this.p_BR2().p_y2()>t_point.p_y2()){
					err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<114>";
					t_answer=true;
				}
			}
		}
	}
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<119>";
	pop_err();
	return t_answer;
}
c_Rect.prototype.p_Width=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<57>";
	var t_=bb_math_Abs2(this.m__TL.p_x2()-this.m__BR.p_x2());
	pop_err();
	return t_;
}
c_Rect.prototype.p_Height=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<53>";
	var t_=bb_math_Abs2(this.m__TL.p_y2()-this.m__BR.p_y2());
	pop_err();
	return t_;
}
c_Rect.prototype.p_Left=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<164>";
	var t_=this.p_TL2().p_x2();
	pop_err();
	return t_;
}
c_Rect.prototype.p_Left2=function(t__in){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<167>";
	this.m__TL.p_x(t__in);
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<168>";
	pop_err();
	return this;
}
c_Rect.prototype.p_Center=function(){
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
c_Rect.prototype.p_Center2=function(t_cent){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<68>";
	var t_w=this.p_Width();
	err_info="/Applications/MonkeyX77a/modules/lazeng/rect.monkey<69>";
	var t_h=this.p_Height();
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
function c_Vector(){
	Object.call(this);
	this.m__x=.0;
	this.m__y=.0;
}
c_Vector.prototype.p_x=function(t_xIn){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<129>";
	this.m__x=t_xIn;
	pop_err();
	return 0;
}
c_Vector.prototype.p_x2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<133>";
	pop_err();
	return this.m__x;
}
c_Vector.prototype.p_y=function(t_yIn){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<137>";
	this.m__y=t_yIn;
	pop_err();
	return 0;
}
c_Vector.prototype.p_y2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/vector.monkey<141>";
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
function c_Animation(){
	Object.call(this);
	this.m_name="";
	this.m_startFrame=0;
	this.m_numFrames=0;
	this.m__fps=0;
	this.m_frameTime=0;
	this.m_startTime=0;
}
c_Animation.prototype.p_Fps=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<25>";
	pop_err();
	return this.m__fps;
}
c_Animation.prototype.p_Fps2=function(t_f){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<28>";
	this.m__fps=t_f;
	err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<29>";
	dbg_object(this).m_frameTime=((1000/this.m__fps)|0);
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
	this.p_Fps2(t_fps);
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
c_Animation.prototype.p_Reset=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<41>";
	dbg_object(this).m_startTime=bb_app_Millisecs();
	pop_err();
	return 0;
}
c_Animation.prototype.p_CurrentFrame=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<33>";
	var t_=dbg_object(this).m_startFrame+(((bb_app_Millisecs()-dbg_object(this).m_startTime)/dbg_object(this).m_frameTime)|0) % dbg_object(this).m_numFrames;
	pop_err();
	return t_;
}
c_Animation.prototype.p_FirstCycleCompleted=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<44>";
	if(bb_app_Millisecs()>dbg_object(this).m_startTime+dbg_object(this).m_numFrames*dbg_object(this).m_frameTime){
		err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<45>";
		pop_err();
		return 1;
	}else{
		err_info="/Applications/MonkeyX77a/modules/lazeng/animation.monkey<47>";
		pop_err();
		return 0;
	}
}
function c_Sound(){
	Object.call(this);
	this.m_sample=null;
}
c_Sound.m_new=function(t_sample){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/audio.monkey<28>";
	dbg_object(this).m_sample=t_sample;
	pop_err();
	return this;
}
c_Sound.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/audio.monkey<25>";
	pop_err();
	return this;
}
function bb_audio_LoadSound(t_path){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/audio.monkey<43>";
	var t_sample=bb_audio_device.LoadSample(bb_data_FixDataPath(t_path));
	err_info="/Applications/MonkeyX77a/modules/mojo/audio.monkey<44>";
	if((t_sample)!=null){
		err_info="/Applications/MonkeyX77a/modules/mojo/audio.monkey<44>";
		var t_=c_Sound.m_new.call(new c_Sound,t_sample);
		pop_err();
		return t_;
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/audio.monkey<45>";
	pop_err();
	return null;
}
function c_Timer(){
	Object.call(this);
	this.m_ticks=0;
	this.m_alarm=false;
}
c_Timer.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/timer.monkey<14>";
	dbg_object(this).m_ticks=-1;
	pop_err();
	return this;
}
c_Timer.m_new2=function(t_howManyTicks){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/timer.monkey<17>";
	dbg_object(this).m_ticks=t_howManyTicks;
	pop_err();
	return this;
}
c_Timer.prototype.p_Update=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/timer.monkey<22>";
	if(dbg_object(this).m_alarm){
		err_info="/Applications/MonkeyX77a/modules/lazeng/timer.monkey<23>";
		dbg_object(this).m_alarm=false;
	}
	err_info="/Applications/MonkeyX77a/modules/lazeng/timer.monkey<26>";
	if(dbg_object(this).m_ticks>-1){
		err_info="/Applications/MonkeyX77a/modules/lazeng/timer.monkey<27>";
		if(dbg_object(this).m_ticks==0){
			err_info="/Applications/MonkeyX77a/modules/lazeng/timer.monkey<28>";
			dbg_object(this).m_alarm=true;
		}
		err_info="/Applications/MonkeyX77a/modules/lazeng/timer.monkey<30>";
		dbg_object(this).m_ticks=dbg_object(this).m_ticks-1;
	}
	pop_err();
	return 0;
}
c_Timer.prototype.p_Set=function(t_howManyTicks){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/timer.monkey<35>";
	dbg_object(this).m_ticks=t_howManyTicks;
	pop_err();
	return 0;
}
function bb_app_Millisecs(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/app.monkey<160>";
	var t_=bb_app__game.Millisecs();
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
function bb_input_TouchHit(t_index){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/input.monkey<84>";
	var t_=bb_input_device.p_KeyHit(384+t_index);
	pop_err();
	return t_;
}
function c_Family(){
	Object.call(this);
	this.m_lastName="";
	this.m_members=[];
	this.m_familyImages=[];
	this.m_requestedPrice=0;
	this.m_desire="";
}
c_Family.prototype.p_GetRandomLastName=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<37>";
	var t_names=["Goldthwait","Lazar","Richardson","Belvedere","Smith","Chang","Berenstein","Johnson","Winslet","Bon Jovi","Blart"];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<38>";
	var t_nameChoice=((Math.floor(bb_random_Rnd3(t_names.length)))|0);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<39>";
	var t_nameString=dbg_array(t_names,t_nameChoice)[dbg_index];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<40>";
	dbg_object(this).m_lastName=t_nameString;
	pop_err();
	return "";
}
c_Family.prototype.p_GetRandomDesire=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<43>";
	var t_desires=["speed","leather","stereo","cargo space","legroom","glovebox","A/C","power locks","muffler","gas mileage"];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<44>";
	var t_desireChoice=((Math.floor(bb_random_Rnd3(t_desires.length)))|0);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<45>";
	var t_desireString=dbg_array(t_desires,t_desireChoice)[dbg_index];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<46>";
	dbg_object(this).m_desire=t_desireString;
	pop_err();
	return "";
}
c_Family.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<13>";
	var t_numFam=((Math.floor(bb_random_Rnd2(2.0,4.99)))|0);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<14>";
	this.p_GetRandomLastName();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<15>";
	dbg_object(this).m_members=new_object_array(t_numFam);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<16>";
	dbg_object(this).m_familyImages=new_object_array(t_numFam);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<17>";
	for(var t_idx=0;t_idx<t_numFam;t_idx=t_idx+1){
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<18>";
		dbg_array(dbg_object(this).m_members,t_idx)[dbg_index]=c_Person.m_new.call(new c_Person)
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<19>";
		if(t_idx==0){
			err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<20>";
			dbg_array(dbg_object(this).m_familyImages,t_idx)[dbg_index]=bb_graphics_LoadImage("family1Large.png",1,1)
		}else{
			err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<21>";
			if(t_idx==1){
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<22>";
				dbg_array(dbg_object(this).m_familyImages,t_idx)[dbg_index]=bb_graphics_LoadImage("family2Large.png",1,1)
			}else{
				err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<23>";
				if(t_idx==2){
					err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<24>";
					dbg_array(dbg_object(this).m_familyImages,t_idx)[dbg_index]=bb_graphics_LoadImage("family3Large.png",1,1)
				}else{
					err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<26>";
					dbg_array(dbg_object(this).m_familyImages,t_idx)[dbg_index]=bb_graphics_LoadImage("family4Large.png",1,1)
				}
			}
		}
	}
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<29>";
	var t_requestedPrice=((bb_random_Rnd2(6500.0,60000.0))|0);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<31>";
	dbg_object(this).m_requestedPrice=t_requestedPrice;
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<33>";
	this.p_GetRandomDesire();
	pop_err();
	return this;
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
function c_Person(){
	Object.call(this);
	this.m_firstName="";
}
c_Person.prototype.p_GetRandomFirstName=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<59>";
	var t_names=["Bobcat","Dave","Chelsea","Thomas","Danielle","Bill","John","Beth","Steve","Jepp","Stinky","Arnold","Gerald","Paul","Sasha"];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<60>";
	var t_nameChoice=((Math.floor(bb_random_Rnd3(t_names.length)))|0);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<61>";
	var t_nameString=dbg_array(t_names,t_nameChoice)[dbg_index];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<62>";
	dbg_object(this).m_firstName=t_nameString;
	pop_err();
	return "";
}
c_Person.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/family.monkey<56>";
	this.p_GetRandomFirstName();
	pop_err();
	return this;
}
function bb_input_KeyHit(t_key){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/input.monkey<40>";
	var t_=bb_input_device.p_KeyHit(t_key);
	pop_err();
	return t_;
}
function c_Car(){
	Object.call(this);
	this.m_button=null;
	this.m_name="";
	this.m_MSRP=0;
	this.m_safety=.0;
	this.m_invoice=0;
	this.m_picture=null;
	this.m_danger=null;
	this.m_animation=null;
	this.m_feature="";
}
c_Car.prototype.p_GetRandomCarName=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<53>";
	var t_makes=["Hando","Honda","Jeep","Creep","AtoyotA","Toyota","Mini","Smart","Ford","Goldthwait","Fermi","Chevy","Hummer","Bummer"];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<54>";
	var t_models=["Ghost","POS","Yogurt","Glorp","Blarf","Focus","Crayola","Granola","Prius","Blart","Grand Cherokee","Bobcat","Car","Exploder","Expulsion","Grape CherryKiwi","Biscuit","Model J","Chase","Harrison","Max","Cooper"];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<55>";
	var t_makeChoice=((Math.floor(bb_random_Rnd3(t_makes.length)))|0);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<56>";
	var t_modelChoice=((Math.floor(bb_random_Rnd3(t_models.length)))|0);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<57>";
	var t_carString=dbg_array(t_makes,t_makeChoice)[dbg_index]+" "+dbg_array(t_models,t_modelChoice)[dbg_index];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<58>";
	pop_err();
	return t_carString;
}
c_Car.prototype.p_GetRandomCarPicture=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<61>";
	var t_fileNames=["sprCar4_DavidLarge","sprCar5_David","sprCar6_David","sprCar7_David","sprCar8_David","sprCar9_David"];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<62>";
	var t_fileChoice=((Math.floor(bb_random_Rnd3(t_fileNames.length)))|0);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<63>";
	var t_fileString=dbg_array(t_fileNames,t_fileChoice)[dbg_index]+".png";
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<64>";
	var t_=bb_graphics_LoadImage(t_fileString,2,1);
	pop_err();
	return t_;
}
c_Car.prototype.p_GetRandomFeatures=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<67>";
	var t_featureNames=["speed","leather","stereo","cargo space","legroom","glovebox","A/C","power locks","muffler","gas mileage"];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<70>";
	var t_featureChoice1=((Math.floor(bb_random_Rnd3(t_featureNames.length)))|0);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<75>";
	var t_featureString=dbg_array(t_featureNames,t_featureChoice1)[dbg_index];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<76>";
	pop_err();
	return t_featureString;
}
c_Car.m_new=function(t_idx,t_requestedPrice){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<23>";
	var t_yButton=150+t_idx*225;
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<24>";
	var t_vect1=c_Vector.m_new.call(new c_Vector,1090.0,(t_yButton-87));
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<25>";
	var t_vect2=c_Vector.m_new.call(new c_Vector,190.0,(t_yButton+87));
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<26>";
	dbg_object(this).m_button=c_Rect.m_new.call(new c_Rect,t_vect1,t_vect2);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<27>";
	dbg_object(this).m_name=this.p_GetRandomCarName();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<28>";
	dbg_object(this).m_MSRP=((bb_random_Rnd2((t_requestedPrice)*.7,(t_requestedPrice)*1.3))|0);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<29>";
	if(bb_random_Rnd()>.98){
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<30>";
		dbg_object(this).m_MSRP=t_requestedPrice*3;
	}
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<32>";
	dbg_object(this).m_safety=bb_random_Rnd();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<34>";
	dbg_object(this).m_invoice=dbg_object(this).m_MSRP-(((dbg_object(this).m_MSRP)*.25*(1.0-dbg_object(this).m_safety)+bb_random_Rnd2(-500.0,500.0))|0);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<35>";
	dbg_object(this).m_picture=this.p_GetRandomCarPicture();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<36>";
	dbg_object(this).m_danger=c_Danger.m_new.call(new c_Danger);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<37>";
	dbg_object(this).m_animation=c_Animation.m_new.call(new c_Animation,"default",0,dbg_object(this).m_picture.p_Frames(),2);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<39>";
	dbg_object(this).m_feature=this.p_GetRandomFeatures();
	pop_err();
	return this;
}
c_Car.m_new2=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<3>";
	pop_err();
	return this;
}
c_Car.prototype.p_Profit=function(t_discount){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<93>";
	var t_=dbg_object(this).m_MSRP-dbg_object(this).m_invoice-t_discount;
	pop_err();
	return t_;
}
c_Car.prototype.p_SafetyString=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<84>";
	var t_tempString="";
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<85>";
	var t_numStars=((bb_lazeng_Round(dbg_object(this).m_safety*5.0))|0);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<86>";
	for(var t_idx=0;t_idx<t_numStars;t_idx=t_idx+1){
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<87>";
		t_tempString=t_tempString+"*";
	}
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<89>";
	pop_err();
	return t_tempString;
}
function c_Danger(){
	Object.call(this);
	this.m_isPlural=false;
	this.m_item="";
	this.m_action="";
}
c_Danger.prototype.p_GetRandomDangerItem=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<110>";
	var t_dangerItemsPlurals=["wheels","seats","windshield wipers","premium all weather \nfloor mats, a $187 value"];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<111>";
	var t_dangerItemsSingulars=["wheel","engine","seat","whole friggin' thing","transmission","steering wheel","trunk","sunroof","gas tank","14.7% APR"];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<113>";
	var t_test=bb_random_Rnd();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<115>";
	if(t_test<.5){
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<116>";
		dbg_object(this).m_isPlural=true;
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<117>";
		var t_dangerChoice=((Math.floor(bb_random_Rnd3(t_dangerItemsPlurals.length)))|0);
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<118>";
		var t_dangerString=dbg_array(t_dangerItemsPlurals,t_dangerChoice)[dbg_index];
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<120>";
		dbg_object(this).m_item=t_dangerString;
	}else{
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<123>";
		dbg_object(this).m_isPlural=false;
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<124>";
		var t_dangerChoice2=((Math.floor(bb_random_Rnd3(t_dangerItemsSingulars.length)))|0);
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<125>";
		var t_dangerString2=dbg_array(t_dangerItemsSingulars,t_dangerChoice2)[dbg_index];
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<127>";
		dbg_object(this).m_item=t_dangerString2;
	}
	pop_err();
	return 0;
}
c_Danger.prototype.p_GetRandomDangerAction=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<133>";
	var t_dangerActionsPlurals=["explode","fly off","melt","screech to a halt","flip","burst","erode away","weren't waxed well","lock up"];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<134>";
	var t_dangerActionsSingulars=["explodes","flies off","melts","screeches to a halt","flips","bursts","erodes away","wasn't waxed well","locks up"];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<136>";
	if(dbg_object(this).m_isPlural){
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<137>";
		var t_dangerChoice=((Math.floor(bb_random_Rnd3(t_dangerActionsPlurals.length)))|0);
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<138>";
		var t_dangerString=dbg_array(t_dangerActionsPlurals,t_dangerChoice)[dbg_index];
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<139>";
		dbg_object(this).m_action=t_dangerString;
	}else{
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<141>";
		var t_dangerChoice2=((Math.floor(bb_random_Rnd3(t_dangerActionsSingulars.length)))|0);
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<142>";
		var t_dangerString2=dbg_array(t_dangerActionsSingulars,t_dangerChoice2)[dbg_index];
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<143>";
		dbg_object(this).m_action=t_dangerString2;
	}
	pop_err();
	return 0;
}
c_Danger.m_new=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<104>";
	this.p_GetRandomDangerItem();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<105>";
	this.p_GetRandomDangerAction();
	pop_err();
	return this;
}
c_Danger.prototype.p_ModifierString=function(t_safety){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<151>";
	var t_numStars=((bb_lazeng_Round(t_safety*5.0))|0);
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<152>";
	var t_modifiersSingular=["an extremely wonky","a pretty dang screwy","a quite unpredictable","a somewhat questionable","a slightly flawed","not the most perfect"];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<153>";
	var t_modifiersPlural=["some extremely wonky","pretty dang screwy","quite unpredictable","somewhat questionable","slightly flawed","not the most perfect"];
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<155>";
	if(dbg_object(this).m_isPlural){
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<156>";
		pop_err();
		return dbg_array(t_modifiersPlural,t_numStars)[dbg_index];
	}else{
		err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<158>";
		pop_err();
		return dbg_array(t_modifiersSingular,t_numStars)[dbg_index];
	}
}
c_Danger.prototype.p_FullString=function(){
	push_err();
	err_info="/Applications/MonkeyX77a/LazarDev/SalesOfADeathman/car.monkey<147>";
	var t_=[dbg_object(this).m_item," ",dbg_object(this).m_action].join("");
	pop_err();
	return t_;
}
function c_VirtualDisplay(){
	Object.call(this);
	this.m_multi=.0;
	this.m_vzoom=.0;
	this.m_vwidth=.0;
	this.m_vheight=.0;
	this.m_lastvzoom=.0;
	this.m_vratio=.0;
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
c_VirtualDisplay.prototype.p_VTouchX=function(t_index,t_limit){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<370>";
	var t_touchoffset=bb_input_TouchX(t_index)-(bb_graphics_DeviceWidth())*0.5;
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<374>";
	var t_x=t_touchoffset/this.m_multi/this.m_vzoom+bb_autofit_VDeviceWidth()*0.5;
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<378>";
	if(t_limit){
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<380>";
		var t_widthlimit=this.m_vwidth-1.0;
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<382>";
		if(t_x>0.0){
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<383>";
			if(t_x<t_widthlimit){
				err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<384>";
				pop_err();
				return t_x;
			}else{
				err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<386>";
				pop_err();
				return t_widthlimit;
			}
		}else{
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<389>";
			pop_err();
			return 0.0;
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<393>";
		pop_err();
		return t_x;
	}
}
c_VirtualDisplay.prototype.p_VTouchY=function(t_index,t_limit){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<404>";
	var t_touchoffset=bb_input_TouchY(t_index)-(bb_graphics_DeviceHeight())*0.5;
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<408>";
	var t_y=t_touchoffset/this.m_multi/this.m_vzoom+bb_autofit_VDeviceHeight()*0.5;
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<412>";
	if(t_limit){
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<414>";
		var t_heightlimit=this.m_vheight-1.0;
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<416>";
		if(t_y>0.0){
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<417>";
			if(t_y<t_heightlimit){
				err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<418>";
				pop_err();
				return t_y;
			}else{
				err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<420>";
				pop_err();
				return t_heightlimit;
			}
		}else{
			err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<423>";
			pop_err();
			return 0.0;
		}
	}else{
		err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<427>";
		pop_err();
		return t_y;
	}
}
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
function bb_input_TouchX(t_index){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/input.monkey<72>";
	var t_=bb_input_device.p_TouchX(t_index);
	pop_err();
	return t_;
}
function bb_autofit_VDeviceWidth(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<206>";
	pop_err();
	return dbg_object(c_VirtualDisplay.m_Display).m_vwidth;
}
function bb_autofit_VTouchX(t_index,t_limit){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<196>";
	var t_=c_VirtualDisplay.m_Display.p_VTouchX(t_index,t_limit);
	pop_err();
	return t_;
}
function bb_input_TouchY(t_index){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/input.monkey<76>";
	var t_=bb_input_device.p_TouchY(t_index);
	pop_err();
	return t_;
}
function bb_autofit_VDeviceHeight(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<210>";
	pop_err();
	return dbg_object(c_VirtualDisplay.m_Display).m_vheight;
}
function bb_autofit_VTouchY(t_index,t_limit){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<200>";
	var t_=c_VirtualDisplay.m_Display.p_VTouchY(t_index,t_limit);
	pop_err();
	return t_;
}
function bb_audio_PlaySound(t_sound,t_channel,t_flags){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/audio.monkey<49>";
	if(((t_sound)!=null) && ((dbg_object(t_sound).m_sample)!=null)){
		err_info="/Applications/MonkeyX77a/modules/mojo/audio.monkey<49>";
		bb_audio_device.PlaySample(dbg_object(t_sound).m_sample,t_channel,t_flags);
	}
	pop_err();
	return 0;
}
function bb_graphics_GetColor(){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<260>";
	var t_=[dbg_object(bb_graphics_context).m_color_r,dbg_object(bb_graphics_context).m_color_g,dbg_object(bb_graphics_context).m_color_b];
	pop_err();
	return t_;
}
function bb_graphics_GetColor2(t_color){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<264>";
	dbg_array(t_color,0)[dbg_index]=dbg_object(bb_graphics_context).m_color_r
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<265>";
	dbg_array(t_color,1)[dbg_index]=dbg_object(bb_graphics_context).m_color_g
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<266>";
	dbg_array(t_color,2)[dbg_index]=dbg_object(bb_graphics_context).m_color_b
	pop_err();
	return 0;
}
function bb_graphics_CreateImage(t_width,t_height,t_frameCount,t_flags){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<248>";
	var t_surf=bb_graphics_device.CreateSurface(t_width*t_frameCount,t_height);
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<249>";
	if((t_surf)!=null){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<249>";
		var t_=(c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
		pop_err();
		return t_;
	}
	pop_err();
	return null;
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
function bb_graphics_ReadPixels(t_pixels,t_x,t_y,t_width,t_height,t_offset,t_pitch){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<533>";
	if(!((t_pitch)!=0)){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<533>";
		t_pitch=t_width;
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<536>";
	bb_graphics_DebugRenderDevice();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<537>";
	if(t_x<0 || t_y<0 || t_x+t_width>bb_graphics_DeviceWidth() || t_y+t_height>bb_graphics_DeviceHeight()){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<537>";
		error("Invalid pixel rectangle");
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<538>";
	if(t_offset<0 || t_pitch<0 || t_offset+(t_height-1)*t_pitch+t_width>t_pixels.length){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<538>";
		error("Invalid array rectangle");
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<541>";
	bb_graphics_renderDevice.ReadPixels(t_pixels,t_x,t_y,t_width,t_height,t_offset,t_pitch);
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
function bb_graphics_DrawRect(t_x,t_y,t_w,t_h){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<391>";
	bb_graphics_DebugRenderDevice();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<393>";
	bb_graphics_context.p_Validate();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<394>";
	bb_graphics_renderDevice.DrawRect(t_x,t_y,t_w,t_h);
	pop_err();
	return 0;
}
function bb_graphics_DrawPoly(t_verts){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<431>";
	bb_graphics_DebugRenderDevice();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<433>";
	bb_graphics_context.p_Validate();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<434>";
	bb_graphics_renderDevice.DrawPoly(t_verts);
	pop_err();
	return 0;
}
function bb_graphics_DrawPoly2(t_verts,t_image,t_frame){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<439>";
	bb_graphics_DebugRenderDevice();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<440>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<440>";
		error("Invalid image frame");
	}
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<442>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<443>";
	bb_graphics_renderDevice.DrawPoly2(t_verts,dbg_object(t_image).m_surface,dbg_object(t_f).m_x,dbg_object(t_f).m_y);
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
function bb_graphics_Translate(t_x,t_y){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/mojo/graphics.monkey<363>";
	bb_graphics_Transform(1.0,0.0,0.0,1.0,t_x,t_y);
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
function bb_autofit_SetVirtualDisplay(t_width,t_height,t_zoom){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<110>";
	c_VirtualDisplay.m_new.call(new c_VirtualDisplay,t_width,t_height,t_zoom);
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<111>";
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
function bb_autofit_UpdateVirtualDisplay(t_zoomborders,t_keepborders){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<171>";
	c_VirtualDisplay.m_Display.p_UpdateVirtualDisplay(t_zoomborders,t_keepborders);
	err_info="/Applications/MonkeyX77a/modules/autofit/autofit.monkey<172>";
	pop_err();
	return 0;
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
function bb_lazeng_Round(t_flot){
	push_err();
	err_info="/Applications/MonkeyX77a/modules/lazeng/lazeng.monkey<43>";
	var t_=Math.floor(t_flot+0.5);
	pop_err();
	return t_;
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
	bb_SalesOfADeathman_TitleFont=null;
	bb_SalesOfADeathman_MenuFont=null;
	bb_SalesOfADeathman_FamilyFont=null;
	bb_SalesOfADeathman_DealerFont=null;
	bb_SalesOfADeathman_TapFont=null;
	c_VirtualDisplay.m_Display=null;
}
//${TRANSCODE_END}
