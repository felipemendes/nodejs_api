var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('https://github.com/felipemendes/purai_nodejs')
});

module.exports = router;
