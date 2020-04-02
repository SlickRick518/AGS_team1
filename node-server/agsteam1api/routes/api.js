var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var path = require('path');

var con = mysql.createPool({
  password: 'Secure_123',
  user: 'dushar88',
  host: 'ec2-54-89-210-177.compute-1.amazonaws.com',
  port: 3306,
  database: 'HotelManagement'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'importUtil' });
});


/**
 * --POST--
 * purpose
 *  Adds a language to the Languages Table to the Database
 * 
 * Endpoint 
 *  /languages
 *  
 * params
 *  lang_id: int
 *  lang_name: string(20)
 *  emp_id: int
*/
router.post('/langaguges', function(req, res, next) {
  let sql = "CALL addLanguage("+req.body.lang_id+","+req.body.lang_name+","+req.body.emp_id+")";
  con.query(sql, function(req, res, next) {
    if (err) console.log(err);
    res.send(result);
  })
});

module.exports = router;
