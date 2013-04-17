
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , Instagram = require('instagram-node-lib')
  , Spacebrew = require('./sb-1.0.3');

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
app.post('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


//---------------instagram setup

Instagram.set('client_id', 'd64dc23665c84faf9de4ca87eeefc768');
Instagram.set('client_secret', 'f526d1ef7be44f7fb4acde9eb9b87908');
Instagram.set('callback_url', 'http://protected-brushlands-9089.herokuapp.com/');
Instagram.set('maxSockets', 10);



//----------------spacebrew setup

var name = "instagram Api";
var server = "sandbox.spacebrew.cc";
var description = "Jess's practice for instagram API";
var sb = new Spacebrew.Spacebrew.Client(server, name, description);

sb.addPublish("imageUrl", "string", "imageUrl from Instagram API");

sb.connect();

//---------------instagram parsing

Instagram.tags.recent({ name: 'new_museum' }).getJSON;

console.log("-------------");
//console.log(createJson);
