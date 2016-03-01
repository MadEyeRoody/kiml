/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), user = require('./routes/user'), http = require('http'), path = require('path'), fs = require('fs');

var app = express();

var db;

var cloudant;

var dbCredentials = {
	dbName : 'kiml_db'
};

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'camelo/www')));
app.use('/style', express.static(path.join(__dirname, '/views/style')));

// development only
if ('development' == app.get('env')) {
	app.use(errorHandler());
}

function initDBConnection() {
	
	if(process.env.VCAP_SERVICES) {
		var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
		if(vcapServices.cloudantNoSQLDB) {
			dbCredentials.host = vcapServices.cloudantNoSQLDB[0].credentials.host;
			dbCredentials.port = vcapServices.cloudantNoSQLDB[0].credentials.port;
			dbCredentials.user = vcapServices.cloudantNoSQLDB[0].credentials.username;
			dbCredentials.password = vcapServices.cloudantNoSQLDB[0].credentials.password;
			dbCredentials.url = vcapServices.cloudantNoSQLDB[0].credentials.url;

			cloudant = require('cloudant')(dbCredentials.url);
			
			// check if DB exists if not create
			cloudant.db.create(dbCredentials.dbName, function (err, res) {
				if (err) { console.log('could not create db ', err); }
		    });
			
			db = cloudant.use(dbCredentials.dbName);
			
		} else {
			console.warn('Could not find Cloudant credentials in VCAP_SERVICES environment variable - data will be unavailable to the UI');
		}
	} else{
		console.warn('VCAP_SERVICES environment variable not set - data will be unavailable to the UI');
		// For running this app locally you can get your Cloudant credentials 
		// from Bluemix (VCAP_SERVICES in "cf env" output or the Environment 
		// Variables section for an app in the Bluemix console dashboard).
		// Alternately you could point to a local database here instead of a 
		// Bluemix service.
		dbCredentials.host = "35424ceb-46f3-4a2c-82c0-4562bf5a9559-bluemix.cloudant.com";
		dbCredentials.port = 443;
		dbCredentials.user = "35424ceb-46f3-4a2c-82c0-4562bf5a9559-bluemix";
		dbCredentials.password = "371057463bd07dcdcdf3885243410e696a357d30e0456dfbfc0715bfd6d3d43b";
		dbCredentials.url = "https://35424ceb-46f3-4a2c-82c0-4562bf5a9559-bluemix:371057463bd07dcdcdf3885243410e696a357d30e0456dfbfc0715bfd6d3d43b@35424ceb-46f3-4a2c-82c0-4562bf5a9559-bluemix.cloudant.com";
	}
	
		cloudant = require('cloudant')(dbCredentials.url);
			
			// check if DB exists if not create
		//	cloudant.db.create(dbCredentials.dbName, function (err, res) {
		//		if (err) { console.log('could not create db ', err); }
		//    });
			
			db = cloudant.use(dbCredentials.dbName);
}

initDBConnection();

app.get('/', routes.index);


var saveTarget = function(id, location, destination,targetDate,latestTime, response) {
	
	db.insert({
		location : location,
		destination : destination,
		targetDate : targetDate,
		latestTime : latestTime
	}, id, function(err, doc) {
		if(err) {
			console.log(err);
			response.sendStatus(500);
		} else{
			response.send({id:id});
		}
	});
	
}



var getAssociates = function (id, response){



    db.get(id,function(err,hansdampf){
        if(!err) {
            var resultCount = 0;

            db.list({include_docs: true},function(err, body){
                if(!err){

                    body.rows.forEach(function(result){


                        if(hansdampf.location === result.doc.location && hansdampf.destination===result.doc.destination && hansdampf.targetDate===result.doc.targetDate){

                            resultCount= resultCount+1;

                        }
                    });

                }else{
                    response.sendStatus(500);
                }
                var responseData = {
                    numAssociates : resultCount ,
                    doc : hansdampf

                };
                console.log(responseData);
                response.send(responseData);
            });



        }else{
            response.sendStatus(500);
        }


    });
}

app.post('/api/getAssociates', function(request, response){

	getAssociates(request.body.id,response);
	
});

app.post('/api/saveTarget', function(request, response) {

	console.log("Create Invoked saveTarget");
	console.log("User: " + request.body.user)
	console.log("Location: " + request.body.location);
	console.log("Destination: " + request.body.destination);
	console.log("TargetDate: " + request.body.targetDate);
	console.log("LatestTime: " + request.body.latestTime);
	
	
	var user = request.body.user;
	var id = user+""+new Date().getTime();
	var location = request.body.location;
	var destination = request.body.destination;
	var targetDate = request.body.targetDate;
	var latestTime = request.body.latestTime;
	
	saveTarget (id, location, destination,targetDate,latestTime ,response);

});

app.post('/api/getAllResults', function(request, response){
	console.log("Create Invoked getAllResults");
var results =[]; 	
	db.list({include_docs: true},function(err, body){
		if(!err){		
			
			body.rows.forEach(function(result){
				
				
				console.log(result);
								
				results.push(result.doc);
				
			});
				console.log(results)
				response.send(results);
						
		}else{
			response.sendStatus(500);
		}
		
	});

});






http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});


