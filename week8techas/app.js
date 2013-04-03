
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , Spacebrew = require('./sb-1.0.3.js')
  , twitter = require('ntwitter');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var kewards = "";

var name = "twitter counter";
var server = "sandbox.spacebrew.cc";
var description = "twitter feed analysis for " + kewards;
var sb = new Spacebrew.Spacebrew.Client(server, name, description);


sb.addPublish("NYCtotal", "range", "A number of tweet from NYC");
sb.addPublish("NYCtweet", "string", "A text of tweet from NYC");

sb.addPublish("SFtotal", "range", "A number of tweet from SF");
sb.addPublish("SFtweet", "string", "A text of tweet from SF");


sb.connect();

var twit = new twitter({
	consumer_key : "NThdDh4NZzUR7X7LsvrQnQ",
	consumer_secret	: "rOOWdkBpXLEYcB3Ri3UlzoOvQhpdPQACDsgWoIKfgo",
	access_token_key : "100139241-xsCuYxYe83T0ldQtmwwZhmxfxMvA6CLfbiq7sobV",
	access_token_secret : "0pkVvDXL7f6QcuX21csoEIqQ8lzR8wljdGcm1Mw4mBE"
});

/*

var filterNY = {'locations':"-74,40,-73,41"};

var i = 0;


twit.stream('statuses/filter', filterNY, function(stream){

stream.on('data', function(data){
		//console.log(data.text;
		//i++;

		
		if(sb._isConnected){
			sb.send("NYCtweet","string",data.text);
			i++;
		}
	});
});

setInterval(function(){
	console.log(i+"twits from NYC detected in last 30 seconds");
	sb.send("NYCtotal","range",i);
	i = 0;

},30000);



var filterSF = {'locations':"-180,-90,180,90"};
//var filterSF = {'track':"I"};


var j=0;


twit.stream('statuses/filter', filterSF, function(stream){

stream.on('data', function(data){
		//console.log(data.text;
		//j++;

		
		if(sb._isConnected){
			sb.send("SFtweet","string",data.text);
			j++;
		}
	});
});

setInterval(function(){
	console.log(j+ "twits from San Francisco detected in last 30 seconds");
	sb.send("SFtotal","range",j);
	j = 0;

},30000);
*/	

var filters = {'track':"#NYC", "#seoul"}; //???hashtags?
var i = 0;
var j = 0;

twit.stream('statues/filter', filters, function(stream){

	stream.on('data', function(data){
		if(data.hashtags == "#NYC"){
			i++;
			if(sb._isConnected){
			sb.send("NYCtweet","string",data.text);
			}
		}
		if(data.hashtags == "#seoul"){
			j++;
			if(sb._isConnected){
			sb.send("SFtweet","string",data.text);
			}
		}

	});

});

setInterval(function(){

console.log(i+ "twits from New York City detected in last 30 seconds");
console.log(j+ "twits from San Francisco detected in last 30 seconds");
i = 0;
j = 0;

},3000);


