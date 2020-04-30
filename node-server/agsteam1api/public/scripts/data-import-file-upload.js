/**
 * @author Daniel Dusharm
 * @description Core functions used for API call and handling file reading
 */

function checkFileType() {
    var reader = new FileReader();
    var file = document.getElementById('fileinput').files[0];
    var name = file.name;

    reader.onload = function (e) {
        //on file load get contents of file
        var contents = e.target.result;
        if (name.includes(".csv"))
            readCsvFile(contents);
        else if (name.includes(".json"))
            readJsonFile(contents)
        else if (name.includes(".xlsx"))
            readExcelFile(contents)
    };

    reader.onerror = function (ex) {
        //Problem reading file
        console.log(ex);
    };

    //Does not support filenames with .json.csv properly
    if (name.includes(".csv"))
        reader.readAsText(file);
    else if (name.includes(".json"))
        reader.readAsText(file);
    else if (name.includes(".xlsx"))
        reader.readAsBinaryString(file);
}

/**
 * Read an Excel File
 * @param {file} file 
 */
function readExcelFile(file) {
    var workbook = XLSX.read(file, {
        type: 'binary'
    });

    workbook.SheetNames.forEach(function (sheetName) {
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        var json_object = JSON.stringify(XL_row_object);
        postRequest(json_object, type); //SEND OUT THE DOOR TO API CALL

    });
};

/**
 * Read a JSON File
 * @param {} file 
 */
function readJsonFile(file) {
    postRequest(file, type); //SEND OUT THE DOOR TO API CALL
};

/**
 * Read a CSV File
 * @param {*} file 
 */
function readCsvFile(file) {
    postRequest(csvJSON(file), type); //SEND OUT THE DOOR TO API CALL
};

/**
 * Submit File from page
 */
function submitfiles() {
    checkFileType();
}

/**
 * Converts CSV file to JSON Object
 * Expecting comma delimeter
 * @param {csv} csv 
 */
function csvJSON(csv) {
    //remove carriage return from windows created files
    csv = csv.replace(/(\r)/gm, "");
    var delimeter = ",";
    //Lines from csv need to be split by new line here
    var lines = csv.split("\n");

    var result = [];

    //csv delimeter for headers
    var headers = lines[0].split(delimeter);

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

        for (var j = 0; j < headers.length; j++) {
            try {
                if (currentline[j]) {
                    console.log(currentline[j]);
                    obj[headers[j]] = currentline[j].replace(/(\")/g, "");
                }
            } catch (e) {
                console.log("May have reached empty or incomplete line");
            }
        }
        result.push(obj);
    }

    //JSON
    return JSON.stringify(result);
}

/**
 * Send Post request to API Endpoint
 * @param {} data 
 * @param {} resource 
 * 
 * @TODO api_domain NEEDS TO BE UPDATED WHEN DEPLOYED
 */
function postRequest(data, resource) {
    let api_domain = "http://127.0.0.1/api/";
    $.ajax({
        type: "POST",
        url: api_domain + resource,
        contentType: "application/json",
        data: data,
        success: function (result, status, xhr) {
            alert("File uploaded without a problem");
            window.location.reload();
        },
        error: function (xhr, status, error) {
            console.log(data);
            alert("Result: " + status + " |  " + error + "  | " + xhr.status + " | " + xhr.statusText);
        }
    });
}
