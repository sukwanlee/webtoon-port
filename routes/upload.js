var FormData = require('form-data');
var fs = require('fs');

var form = new FormData();

// Create upload form
form.append('my_field', 'my value');
form.append('my_buffer', new Buffer(10));
form.append('my_file', fs.createReadStream('/foo/bar.jpg'));


module.exports = form;