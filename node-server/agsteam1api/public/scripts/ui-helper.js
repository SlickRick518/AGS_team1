/**
 * FILE ABSTRACT
 * @author Daniel Dusharm
 * @description Look and Feel helper methods with functionality to set type from UI
 */
var type;

/**
 * When DOM is ready, add event listener to the fileinput element
 */
$(document).ready(function () {
    document.getElementById('fileinput').addEventListener("change", updatefile, null);
});

/**
 * Updates file variable and shows name on page
 */
function updatefile() {
    var pelem = document.getElementById('filename');
    var file = document.getElementById('fileinput').files[0];
    pelem.innerHTML = file.name;
}

/**
 * Sets the filetype after selection from the dropdown
 * @param {type} x 
 */
function setType(x) {
    document.getElementById('dropdown-button').innerHTML = x + ' <span class="caret"></span></button>';
    type = x;
    document.getElementById("fileinput").removeAttribute("disabled");
    document.getElementById("submitButton").removeAttribute("disabled");
}
