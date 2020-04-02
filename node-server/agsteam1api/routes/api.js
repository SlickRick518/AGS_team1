var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var passport = require('passport');
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
 * Purpose
 *  Adds a language to the Languages Table to the Database
 * 
 * Endpoint 
 *  /languages
 *  
 * Expected body params
 *  lang_id: int
 *  lang_name: string(20)
 *  emp_id: int
*/
router.post('/languages', function({body}, res, next) {
  const {
    lang_id,
    lang_name,
    emp_id
  } = body;
  let sql = "CALL addLanguage(?,?,?)";
  con.query(sql, [lang_id, lang_name, emp_id], function(err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  })
});

/**
 *  --PUT--
 * Purpose
 *  Modifies a Language in the Languages Table in the Database
 * 
 * Endpoint
 * /languages
 * 
 * * Expected body params
 * lang_id: int
 * lang_name: string(20)
 * emp_id: int
 *  
 */
router.put('/languages', function({body},res, next) {
  const {
    lang_id,
    lang_name,
    emp_id
  } = body;
  let sql = "CALL modifyLanguage(?,?,?)";
  con.query(sql, [lang_id, lang_name, emp_id], function(err, result, ields) {
    if(err) console.log(err);
    res.send(result);
  })
});

module.exports = router;
