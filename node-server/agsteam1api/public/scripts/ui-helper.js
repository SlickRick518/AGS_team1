var type;

$(document).ready(function () {
    document.getElementById('fileinput').addEventListener("change", updatefile, null);
});


function updatefile() {
    var pelem = document.getElementById('filename');
    var file = document.getElementById('fileinput').files[0];
    pelem.innerHTML = file.name;
}

function setType(x) {
    document.getElementById('dropdown-button').innerHTML = x + ' <span class="caret"></span></button>';
    type = x;
    document.getElementById("fileinput").removeAttribute("disabled");
    document.getElementById("submitButton").removeAttribute("disabled");
}
