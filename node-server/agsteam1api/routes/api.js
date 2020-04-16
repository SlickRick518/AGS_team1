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
//----- LANGAUGES RESOURCE -----------//
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
router.put('/languages', function({body}, res, next) {
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
//----- END LANGAUGES RESOURCE -------//

//----- SHIFTS RESOURCE --------------//
/**
 *  --POST--
 * Purpose
 *  Creates a shift entry in the databse
 * 
 * Endpoint
 * /shifts
 * 
 * * Expected body params
 * emp_id
 * prim_location
 * prim_job
 *  
 */
router.post('/shifts', function(req, res, next) {
  let json = JSON.parse(req.body.data);
  let outputData = [];
  json.forEach(function (item) {
    let decomp = [];
    decomp[0] = item['Name'];
    decomp[1] = item['Primary Location Name - Single Location'];
    decomp[2] = item['Primary Job'];
    decomp[3] = item['Seniority Date|For Shift'];
    decomp[4] = item['Scheduled Hours'];
    decomp[5] = item['Type'];
    decomp[6] = 1;
    outputData.push(decomp);
  })
  console.log(outputData);
  res.send("OK");
});
//----- END SHIFTS RESOURCE ----------//

module.exports = router;
