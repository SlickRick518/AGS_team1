function checkFileType(evt) {
    var reader = new FileReader();
    var file = evt.target.files[0];

    reader.onload = function (e) {
        var contents = e.target.result;
        var name = file.name;
        if (name.includes(".csv"))
            readCsvFile(contents);
        else if (name.includes(".json"))
            readJsonFile(contents)
        else if (name.includes(".xlsx"))
            readExcelFile(contents)
    };

    reader.onerror = function (ex) {
        console.log(ex);
    };
    var name = file.name;
    if (name.includes(".csv"))
        reader.readAsText(file);
    else if (name.includes(".json"))
        reader.readAsText(file);
    else if (name.includes(".xlsx"))
        reader.readAsBinaryString(file);

}

function readExcelFile(file) {
    var workbook = XLSX.read(file, {
        type: 'binary'
    });

    workbook.SheetNames.forEach(function (sheetName) {
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        var json_object = JSON.stringify(XL_row_object);
        console.log(json_object);

    });
};

function readJsonFile(file) {
    console.log(file);
};

function readCsvFile(file) {
    console.log(csvJSON(file));
};

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
        var currentline = lines[i].split(delimeter);

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }

    //JSON
    return JSON.stringify(result);
}
