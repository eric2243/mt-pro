var express = require('express');
var router = express.Router();
var request = require('request');

/* Post users listing. */
router.post('/', function(req, res, next) {
	var url = decodeURIComponent(req.body.url);
	var data = req.body.params;

	var options = {
		uri: url,
		method: 'POST',
		headers: {
			'User-Agent': '',
			'Host': '',
			'Referer': '',
			'Content-Type': 
		},
		form: data
	};

	request(options, function(error, response, body) {
		try {
			res.json(JSON.parse(body));
		}catch(e) {
			res.json({});
		}
	});
});

module.exports = router;
