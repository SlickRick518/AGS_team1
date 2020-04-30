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
router.get('/', function (req, res, next) {
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
 * // ARRAY OF DATA ENTRIES FOR EACH RECORD
 *  lang_id: int
 *  lang_name: string(20)
*/
router.post('/languages', function (req, res, next) {
  let valid = true;
  if (!req.is('application/json')) {
    res.send(400);
  } else {
    let outputData = [];
    req.body.forEach(function (item) {
      let decomp = [];
      if(!item['lang_id'] || !item['lang_name']) {
        valid = false;
      }
      decomp[0] = item['lang_id'];
      decomp[1] = item['lang_name'];
      decomp[2] = 1; //CURRENT USER ID
      outputData.push(decomp);
    });
    if(!valid) {
      res.sendStatus(400);
      return;
    }
    let sql = "CALL addLanguage(?,?,?)";
    for (let x = 0; x < outputData.length; ++x) {
      con.query(sql, outputData[x], function (err, result, fields) {
        if (err) {
          console.log(err);
        }
      });
    }
    res.send("OK");
  }
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
 * // ARRAY OF DATA ENTRIES FOR EACH RECORD
 * lang_id: int
 * lang_name: string(20)
 *  
 */
router.put('/languages', function (req, res, next) {
  let valid = true;
  if (!req.is('application/json')) {
    res.sendStatus(400);
  } else {
    let outputData = [];
    req.body.forEach(function (item) {
      let decomp = [];
      if(!item['lang_id'] || !item['lang_name']) {
        valid = false;
      }
      decomp[0] = item['lang_id'];
      decomp[1] = item['lang_name'];
      decomp[2] = 1; //CURRENT USER ID
      outputData.push(decomp);
    });

    if(!valid) {
      res.sendStatus(400);
      return;
    }
    let sql = "CALL modifyLanguage(?,?,?)";
    for (let x = 0; x < outputData.length; ++x) {
      con.query(sql, outputData[x], function (err, result, fields) {
        if (err) {
          console.log(err);
        }
      });
    }
    res.send("OK");
  }
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
 * // ARRAY OF DATA ENTRIES FOR EACH RECORD
 * { 
 *        Employee Id
 *        Primary Location Name - Single Location
 *        Primary Job
 *        Seniority Date
 *        Scheduled Hours
 *        Type
 *        Shift Start Time
 *        Shift Start Date
 *        Shift End Time
 *        Shift End Date
 * }
 */
router.post('/shifts', function (req, res, next) {
  let valid = true;
  if (!req.is('application/json')) {
    res.sendStatus(400);
  } else {
    let outputData = [];
    req.body.forEach(function (item) {
      let decomp = [];
      if (!item['Id']) {
        valid = false;
      }
      decomp[0] = item['Id'];
      decomp[1] = item['Primary Location Name - Single Location'];
      decomp[2] = item['Primary Job'];
      decomp[3] = item['Seniority Date'];
      decomp[4] = item['Scheduled Hours'];
      decomp[5] = item['Type'];
      decomp[6] = item['Shift Start Time'];
      decomp[7] = item['Shift Start Date'];
      decomp[8] = item['Shift End Time'];
      decomp[9] = item['Shift End Date'];
      decomp[10] = 1; //CURRENT USER ID
      outputData.push(decomp);
    });
    if (!valid) {
      res.sendStatus(400);
      return;
    }
    let sql = "CALL addEmployeeShift(?,?,?,?,?,?,?,?,?,?,?)";
    for (let x = 0; x < outputData.length; ++x) {
      con.query(sql, outputData[x], function (err, result, fields) {
        if (err) {
          console.log(err);
        }
      });
    }
    res.send("OK");
  }
});

/**
 *  --PUT--
 * Purpose
 *  Updates a shift entry in the databse
 * 
 * Endpoint
 * /shifts
 * 
 * * Expected body params
 * // ARRAY OF DATA ENTRIES FOR EACH RECORD
 * { 
 *        ShiftId
 *        Employee Id
 *        Primary Location Name - Single Location
 *        Primary Job
 *        Seniority Date
 *        Scheduled Hours
 *        Type
 *        ShiftStatus
 *        Shift Start Time
 *        Shift Start Date
 *        Shift End Time
 *        Shift End Date
 * }
 */
router.put('/shifts', function (req, res, next) {
  let valid = true;
  if (!req.is('application/json')) {
    res.send(400);
  } else {
    let outputData = [];
    req.body.forEach(function (item) {
      let decomp = [];
      if (!item['Id']) {
        valid = false;
      }
      decomp[0] = item['ShiftId'];
      decomp[1] = item['Employee Id'];
      decomp[2] = item['Primary Location Name - Single Location'];
      decomp[3] = item['Primary Job'];
      decomp[4] = item['Seniority Date'];
      decomp[5] = item['Scheduled Hours'];
      decomp[6] = item['Type'];
      decomp[7] = item['ShiftStatus'];
      decomp[8] = item['Shift Start Time'];
      decomp[9] = item['Shift Start Date'];
      decomp[10] = item['Shift End Time'];
      decomp[11] = item['Shift End Date'];
      decomp[12] = 1; //CURRENT 'MODIFIED BY' USER ID
      outputData.push(decomp);
    });
    if (!valid) {
      res.sendStatus(400);
      return;
    }
    let sql = "CALL updateEmployeeShift(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    for (let x = 0; x < outputData.length; ++x) {
      console.log("called");
      con.query(sql, outputData[x], function (err, result, fields) {
        if (err) {
          console.log(err);
        }
      });
    }
    res.send("OK");
  }
});

//----- END SHIFTS RESOURCE ----------//

//----- DIVISION RESOURCE --------------//
/**
 * --POST--
 * Purpose
 *  Adds a Division Code to the DivisionCode Table in the Database
 * 
 * Endpoint 
 *  /Divisions
 *  
 * Expected body params
  * // ARRAY OF DATA ENTRIES FOR EACH RECORD
 *  DivisionCode: int(11)
 *  DivisionName: string(20)
 *  DivisionAbbreviation: varchar(5)
*/
router.post('/divisions', function (req, res, next) {
  if (!req.is('application/json')) {
    res.send(400);
  } else {
    let outputData = [];
    req.body.forEach(function (item) {
      let decomp = [];
      if (!item['div_code'] || !item['division_name']) {
        valid = false;
      }
      decomp[0] = item['div_code'];
      decomp[1] = item['division_name'];
      decomp[2] = item['div_abbreviation'];
      decomp(3) = 1; //CURRENT EMPLOYEE ID
      outputData.push(decomp);
    });

    if(!valid) {
      res.sendStatus(400);
      return;
    }

    let sql = "CALL addDivisionCode(?,?,?,?)";
    con.query(sql, [DivCode, DivName, DivAbbreviation, 1], function (err, result, fields) {
      if (err) console.log(err);
      res.send(result);
    })
  }
});
//----- END DIVISION RESOURCE -------//
module.exports = router;
