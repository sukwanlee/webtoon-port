var FormData = require('form-data'),
	fs = require('fs'),
	express = require('express');

var router = express.Router();
// var form = new FormData();

// form.append('my_field', 'my value');
// form.append('my_buffer', new Buffer(10));
// form.append('my_file', fs.createReadStream('/foo/bar.jpg'));

router.get('/', function(req, res) {
	res.render('upload', {title: 'Upload New Chapter'});
});

router.post('/success', function(req, res) {
	fs.readFile(req.files.image.path, function (err, data) {
		var newPath = __dirname + "/uploads/images";
		fs.writeFile(newPath, data, function (err) {
			if(err) console.log(err);
			res.redirect("back");
		});
	});
});

module.exports = router;