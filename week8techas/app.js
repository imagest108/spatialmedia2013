
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , Spacebrew = require('./sb-1.0.3.js')
  , twitter = require('ntwitter')
  , request = require('request')
  , urlParser = require('url');

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

var kewards = "#sanfrancisco, #nyc";

var name = "twitter counter";
var server = "sandbox.spacebrew.cc";
var description = "twitter feed analysis for " + kewards;
var sb = new Spacebrew.Spacebrew.Client(server, name, description);


sb.addPublish("NYCtotal", "range", "A number of tweet from NYC");
sb.addPublish("NYCtweet", "string", "A text of tweet from NYC");
sb.addPublish("NYCphoto", "string", "A photo posted from NYC")

sb.addPublish("SFtotal", "range", "A number of tweet from SF");
sb.addPublish("SFtweet", "string", "A text of tweet from SF");
sb.addPublish("SFphoto", "string", "A photo posted from SF");


sb.connect();

var twit = new twitter({
	consumer_key : "NThdDh4NZzUR7X7LsvrQnQ",
	consumer_secret	: "rOOWdkBpXLEYcB3Ri3UlzoOvQhpdPQACDsgWoIKfgo",
	access_token_key : "100139241-xsCuYxYe83T0ldQtmwwZhmxfxMvA6CLfbiq7sobV",
	access_token_secret : "0pkVvDXL7f6QcuX21csoEIqQ8lzR8wljdGcm1Mw4mBE"
});


var filters = {'track': kewards}; //???hashtags?
//var filters =  {'locations':"-74,40,-73,41"};

var nyCounter = 0;
var sfCounter = 0;

twit.stream('statuses/filter', filters, function(stream){

	stream.on('data', function(data){

		var myTagArray = data.entities.hashtags;
		for (var i = 0; i< myTagArray.length; i++){
			if(myTagArray[i].text == "nyc"){
				nyCounter++;
				if(sb._isConnected){
				sb.send("NYCtweet","string",data.text);
				sb.send("NYCtotal","range",nyCounter);
				var myUrl = urlParser.parse(data.text);
				console.log(myUrl.href);
				//sb.send("NYCphoto","string", data)
				console.log(nyCounter+ " Twits from NYC : "+ data.text);
				}
			}
			if(myTagArray[i].text == "sanfrancisco"){
				sfCounter++;
				if(sb._isConnected){
				sb.send("SFtweet","string",data.text);
				sb.send("SFtotal","range",sfCounter);
				console.log(sfCounter+ " Twits from San Francisco : "+ data.text);
				}
			}
		}

	});

});



