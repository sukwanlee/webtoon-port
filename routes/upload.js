var FormData = require('form-data'),
		fs = require('fs'),
		multipart = require('connect-multiparty'),
		express = require('express'),
		series = require('../lib/models');

var multipart_middleware = multipart();

var router = express.Router();
// var form = new FormData();

// form.append('my_field', 'my value');
// form.append('my_buffer', new Buffer(10));
// form.append('my_file', fs.createReadStream('/foo/bar.jpg'));

router.get('/', function(req, res) {
	series.find({}, function (err, series){
		console.log(series.length);
		var webtoon_list = [];
		var i;
		for(i = 0; i < series.length; i++) {
			webtoon_list[i] = series[i].name;
		}
		res.render('upload', {title: 'Upload New Chapter', webtoon_list: webtoon_list});
	});
});

router.post('/chapterUploaded', multipart_middleware, function(req, res) {
	fs.readFile(req.files.image.path, function (err, data) {
		var newPath = __dirname + "/../uploads/images/" + req.files.image.originalFilename;
		fs.writeFile(newPath, data, function (err) {
			if(err) console.log(err);
			res.redirect("back");
		});
	});
});

router.post('/seriesCreated', multipart_middleware, function(req, res) {
	var newSeries = new series ({
		name: req.body.seriesName,
		author: req.body.seriesAuthor,
		day: req.body.seriesDay,
		thumbnail: req.files.seriesImage.originalFilename
	});

	fs.readFile(req.files.image.path, function (err, data) {
		var newPath = __dirname + "/../uploads/images/" + req.files.seriesImage.originalFilename;
		fs.writeFile(newPath, data, function (err) {
			if(err) console.log(err);
		});
	});

	newSeries.save(function (err) {
		if (err) console.log('Error on save!');
		res.redirect("back");
	});
});

module.exports = router;