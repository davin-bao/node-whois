var express = require('express');
var router = express.Router();
var Whois = require('./../libs/whois');


/* GET home page. */
router.get('/lookup/:domain', function(req, res, next) {
  res.append('Content-type', 'text/json');
  var domain = req.params.domain;
  var refresh = req.query.refresh;
  var whois = new Whois();

  whois.lookup(domain, refresh);
  whois.onFinish(function(data){
    res.end(JSON.stringify(data));
  });
});

module.exports = router;
