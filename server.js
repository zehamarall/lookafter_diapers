'use strict';

var mongoose   = require('mongoose');

var connectionMongo = 'mongodb://mongodb/diapers';
console.log(connectionMongo);
mongoose.connect(connectionMongo);


var express    = require('express');       // call express
var app           = express();                      // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var Diapers     = require('./models/diapers');

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our api!' });   
});


router.route('/diapers')

	// create a diapers (accessed at POST http://localhost:8080/diapers)
	.post(function(req, res) {
		
		var diaper = new Diapers();		// create a new instance of the Bear model
		diaper.name = req.body.name;  // set the bears name (comes from the request)
		diaper.description = req.body.description;
		diaper.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Diaper created!' });
		});

		
	})

	// get all the diapers (accessed at GET http://localhost:8080/api/diapers)
	.get(function(req, res) {
		Diapers.find(function(err, diapes) {
			if (err)
				res.send(err);

			res.json(diapes);
		});
});

router.route('/diapers/:diaper_id')

	// get the diaper with that id GET http://localhost:8080/api/diapers/<id_diapers>
	.get(function(req, res) {
		Diapers.findById(req.params.diaper_id, function(err, diaper) {
			if (err)
				res.send(err);
			res.json(diaper);
		});
	})

	// update the diaper with this id PUT http://localhost:8080/api/diapers/<id_diapers>
	.put(function(req, res) {
		Diapers.findById(req.params.diaper_id, function(err, diaper) {

			if (err)
				res.send(err);

			diaper.name = req.body.name;
			diaper.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Diaper updated!' });
			});

		});
	})

	// delete the diaper with this id DEL http://localhost:8080/api/diapers/<id_diapers>
	.delete(function(req, res) {
		Diapers.remove({
			_id: req.params.diaper_id
		}, function(err, diaper) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


	router.route('/diapers/sell/:diaper_id')

	// put the diaper with that id GET http://localhost:8080/api/diapers/sell/<id_diapers>
	.put(function(req, res) {
		Diapers.findById(req.params.diaper_id, function(err, diaper) {
			if (err)
				res.send(err);
			//res.json(diaper);
			diaper.avaliable.size = req.body.avaliable.size;
		});
	});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);

