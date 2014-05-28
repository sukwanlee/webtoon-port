var express = require('express'),
		formidable = require('formidable'),
		util = require('util');

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

router.get('/upload', function(req, res) {
	res.render('upload', {title: 'Upload New Chapter'});
});

router.post('/upload', function(req, res) {
	if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
 
    return;
  }
});

module.exports = router;
