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

//----- DEPARTMENT EMPLOYEES RESOURCE -----------//
/**
 *  --GET--
 * Purpose
 *  Get information about employees in department given a manager's EMmployee ID
 */
router.get('/departments/employees/:managerId', function (req, res, next) {
  con.query("CALL getDepartmentEmpSchedules("+req.params.managerId+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});
//----- END DEPARTMENT EMPLOYEES RESOURCE -----------//

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

/**
 *  --GET--
 * Purpose
 *  Get all of the langauges stored in the database
 */
router.get('/languages', function (req, res, next) {
  con.query("CALL getAllLanguages()", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});

/**
 *  --GET--
 * Purpose
 *  Get langauge information by id from the database
 */
router.get('/languages/:languageId', function (req, res, next) {
  con.query("CALL getLanguage("+req.params.languageId+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
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

/**
 *  --GET--
 * Purpose
 *  Get all shift information
 */
router.get('/shifts', function (req, res, next) {
  con.query("CALL getAllShifts()", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});

/**
 *  --GET--
 * Purpose
 *  Get shift information by employee id from the database
 */
router.get('/shifts/employee/:shiftEmployeeID', function (req, res, next) {
  con.query("CALL getShiftEmployee("+req.params.shiftEmployeeID+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});
/**
 *  --GET--
 * Purpose
 *  Get shift information by location id from the database
 */
router.get('/shifts/location/:shiftLocationID', function (req, res, next) {
  con.query("CALL getShiftLocation("+req.params.shiftLocationID+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});
/**
 *  --GET--
 * Purpose
 *  Get shift information by job code from the database
 */
router.get('/shifts/jobcode/:shiftJobCodeID', function (req, res, next) {
  con.query("CALL getShiftJobCode("+req.params.shiftJobcodeID+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});
/**
 *  --GET--
 * Purpose
 *  Get shift information by shift type from the database
 */
router.get('/shifts/type/:shiftTypeID', function (req, res, next) {
  con.query("CALL getShiftType("+req.params.shiftTypeID+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});

/**
 *  --GET--
 * Purpose
 *  Get shift status from the database
 */
router.get('/shifts/status/:status', function (req, res, next) {
  con.query("CALL getShiftStatus("+req.params.status+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});

/**
 *  --GET--
 * Purpose
 *  Get shift information by shift type from the database
 */
router.get('/shifts/type/:shiftTypeID', function (req, res, next) {
  con.query("CALL getShiftType("+req.params.shiftTypeID+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
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
  let valid = true;
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
      decomp[3] = 1; //CURRENT EMPLOYEE ID
      outputData.push(decomp);
    });

    if(!valid) {
      res.sendStatus(400);
      return;
    }

    let sql = "CALL addDivisionCode(?,?,?,?)";
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
 *  --GET--
 * Purpose
 *  Get all division information from the database
 */
router.get('/divisions', function (req, res, next) {
  con.query("CALL getAllDivisions()", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});

/**
 *  --GET--
 * Purpose
 *  Get division information by abbreviation from the database
 */
router.get('/divisions/:abbreviation', function (req, res, next) {
  con.query("CALL getDivision("+req.params.abbreviation+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});
//----- END DIVISION RESOURCE -------//

//----- EMPLOYEES RESOURCE --------------//
/**
 * --POST--
 * Purpose
 *  Adds an Employeeto the Database
 * 
 * Endpoint 
 *  /employees
*/
router.post('/employees', function (req, res, next) {
  let valid = true;
  if (!req.is('application/json')) {
    res.send(400);
  } else {
    let outputData = [];
    req.body.forEach(function (item) {
      let decomp = [];
      if (!item['employee_id']) {
        valid = false;
      }
      decomp[0] = item['employee_id'];
      decomp[1] = item['user_name'];
      decomp[2] = item['password'];
      decomp[3] = item['contact_method'];
      decomp[4] = item['preffered_email'];
      decomp[5] = item['preffered_text'];
      decomp[6] = item['phone_num'];
      decomp[7] = item['preffered_language_code'];
      decomp[8] = item['first_name'];
      decomp[9] = item['last_name'];
      decomp[10] = 1; //CURRENT EMPLOYEE ID
      outputData.push(decomp);
    });

    if(!valid) {
      res.sendStatus(400);
      return;
    }

    let sql = "CALL addEmployee(?,?,?,?,?,?,?,?,?,?,?)";
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
 *  --GET--
 * Purpose
 *  Get all employee information from the database
 */
router.get('/employees', function (req, res, next) {
  con.query("CALL getAllEmployees()", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});

/**
 *  --GET--
 * Purpose
 *  Get langauge information by id from the database
 */
router.get('/employees/:employeeId', function (req, res, next) {
  con.query("CALL getEmployee("+req.params.employeeId+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});

/**
 *  --GET--
 * Purpose
 *  Get employee by username
 */
router.get('/employees/username/:username', function (req, res, next) {
  con.query("CALL getEmployeeByUsername("+req.params.username+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});

/**
 *  --GET--
 * Purpose
 *  Get employee by phone number
 */
router.get('/employees/phone/:phone', function (req, res, next) {
  con.query("CALL getEmployeeByPhone("+req.params.phone+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});

/**
 *  --GET--
 * Purpose
 *  Get employee by language 
 */
router.get('/employees/language/:languageId', function (req, res, next) {
  con.query("CALL getEmployeeByLanguage("+req.params.languageId+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});
//----- END EMPLOYEE RESOURCE -------//
//----- POSITION RESOURCE --------------//
/**
 * --POST--
 * Purpose
 *  Adds a Position to the PositionList table
 * 
 * Endpoint 
 *  /positions
 *  
*/
router.post('/positions', function (req, res, next) {
  let valid = true;
  if (!req.is('application/json')) {
    res.send(400);
  } else {
    let outputData = [];
    req.body.forEach(function (item) {
      let decomp = [];
      if (!item['position_name']) {
        valid = false;
      }
      decomp[0] = item['position_name'];
      decomp[1] = item['job_code'];
      decomp[2] = 1; //CURRENT EMPLOYEE ID
      outputData.push(decomp);
    });

    if(!valid) {
      res.sendStatus(400);
      return;
    }

    let sql = "CALL addPosition(?,?,?)";
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
 *  --GET--
 * Purpose
 *  Get all position information
 */
router.get('/positions', function (req, res, next) {
  con.query("CALL getAllPositions()", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});

/**
 *  --GET--
 * Purpose
 *  Get position information by id from the database
 */
router.get('/positions/:positionID', function (req, res, next) {
  con.query("CALL getPosition("+req.params.positionID+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});

/**
 *  --GET--
 * Purpose
 *  Get langauge information by id from the database
 */
router.get('/positions/employee/:employeeId', function (req, res, next) {
  con.query("CALL getPositionEmployee("+req.params.employeeId+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});


//----- END POSITION RESOURCE -------//
//----- CONTACT RESOURCE --------------//
/**
 * --POST--
 * Purpose
 *  Adds a Contact Method to the PositionList table
 * 
 * Endpoint 
 *  /contacts
 *  
*/
router.post('/contacts', function (req, res, next) {
  let valid = true;
  if (!req.is('application/json')) {
    res.send(400);
  } else {
    let outputData = [];
    req.body.forEach(function (item) {
      let decomp = [];
      if (!item['method_id']) {
        valid = false;
      }
      decomp[0] = item['method_id'];
      decomp[1] = item['method'];
      decomp[2] = 1; //CURRENT EMPLOYEE ID
      outputData.push(decomp);
    });

    if(!valid) {
      res.sendStatus(400);
      return;
    }

    let sql = "CALL addContactMethod(?,?,?)";
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

//----- END CONTACT RESOURCE -------//
//----- DEPARTMENT RESOURCE --------------//
/**
 * --POST--
 * Purpose
 *  Adds a Contact Method to the PositionList table
 * 
 * Endpoint 
 *  /contacts
 *  
*/
router.post('/departments', function (req, res, next) {
  let valid = true;
  if (!req.is('application/json')) {
    res.send(400);
  } else {
    let outputData = [];
    req.body.forEach(function (item) {
      let decomp = [];
      if (!item['department_id']) {
        valid = false;
      }
      decomp[0] = item['department_id'];
      decomp[1] = item['department_name'];
      decomp[2] = item['primary_manager'];
      decomp[3] = item['secondary_manager'];
      decomp[4] = 1; //CURRENT EMPLOYEE ID
      outputData.push(decomp);
    });

    if(!valid) {
      res.sendStatus(400);
      return;
    }

    let sql = "CALL addDepartment(?,?,?,?,?)";
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
 *  --GET--
 * Purpose
 *  Get all department information from the database
 */
router.get('/departments', function (req, res, next) {
  con.query("CALL getAllDepartments()", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});

/**
 *  --GET--
 * Purpose
 *  Get department information by id from the database
 */
router.get('/departments/:departmentId', function (req, res, next) {
  con.query("CALL getDepartment("+req.params.departmentId+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});

/**
 *  --GET--
 * Purpose
 *  Get department information by name from the database
 */
router.get('/departments/name/:departmentName', function (req, res, next) {
  con.query("CALL getDepartmentByName("+req.params.departmentName+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});

/**
 *  --GET--
 * Purpose
 *  Get department information by manager from the database
 */
router.get('/departments/manager/:managerId', function (req, res, next) {
  con.query("CALL getDepartmentByManager("+req.params.managerId+")", function (err, result, fields) {
    if (err) console.log(err);
    res.send(result);
  });
});

//----- END DEPARTMENT RESOURCE -------//
module.exports = router;
