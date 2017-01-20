var express = require('express');
var router = express.Router();
var Whois = require('./../libs/whois');

/* GET home page. */
router.get('/lookup/:format/:domain', function(req, res, next) {
  res.append('Content-type', 'text/json');
  var format = req.params.format;
  var domain = req.params.domain;
  var whois = new Whois(format);

  whois.lookup(domain, function(data){
    res.end(JSON.stringify(data));
  });
});

module.exports = router;
