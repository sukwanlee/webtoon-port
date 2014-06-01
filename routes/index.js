var express = require('express'),
		formidable = require('formidable'),
		util = require('util'),
    series = require('../lib/models');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Webtoon Port' });
});

router.get('/about', function(req,res) {
	res.render('about', {title: 'About'});
});

router.get('/recent', function(req, res) {
	res.render('recent', {title: 'Recent Uploads'});
});

router.get('/collection', function(req, res) {
  series.find({"ongoing": true}, function(err, series) {
    var monday = [],
        tuesday = [],
        wednesday = [],
        thursday = [],
        friday = [],
        saturday = [],
        sunday = [];
    var i;
    for(i = 0; i < series.length; i++) {
      switch(series[i].day) {
        case "Monday":
          monday.push(series[i])
          break;
        case "Tuesday":
          tuesday.push(series[i]);
          break;
        case "Wednesday":
          wednesday.push(series[i]);
          break;
        case "Thursday":
          thursday.push(series[i]);
          break;
        case "Friday":
          friday.push(series[i]);
          break;
        case "Saturday":
          saturday.push(series[i]);
          break;
        case "Sunday":
          sunday.push(series[i]);
          break;
      }
    }
    res.render('collection', {title: 'Webtoon Collection',
                              monday: monday,
                              tuesday: tuesday,
                              wednesday: wednesday,
                              thursday: thursday,
                              friday: friday,
                              saturday: saturday,
                              sunday: sunday });
  });
})

module.exports = router;
