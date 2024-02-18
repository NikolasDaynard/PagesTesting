// Get the button element by its ID
var button = document.getElementById("myButton");

function shuffleArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        throw new Error("Arrays must have the same length");
    }

    for (let i = arr1.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i
        // Swap elements at indices i and j in arr1
        [arr1[i], arr1[j]] = [arr1[j], arr1[i]];
        // Swap elements at indices i and j in arr2
        [arr2[i], arr2[j]] = [arr2[j], arr2[i]];
    }
}

var polyatomicIonNames = ["Cyanide", "Dichromate", "Perchlorate", "Hydrogen Sulfate", "Chlorite", "Acetate", "Oxalate", "Sulfate", "Permanganate", "Carbonate", "Dihydrogen Phosphate", "Phosphate", "Ammonium", "Nitrate", "Chromate", "Hypochlorite", "Bicarbonate / Hydrogen Carbonate", "Hydroxide", "Peroxide", "Borate", "Hydrogen Phosphite", "Chlorate", "Sulfite", "Nitrite"];
var polyatomicIons = ["CN-", "Cr2O7 2-", "ClO4-", "HSO4-", "ClO2-", "CH3CO2-", "C2O4 2-", "SO4 2-", "MnO4-", "CO3 2-", "H2PO4-", "PO4 3-", "NH4+", "NO3-", "CrO4 2-", "ClO-", "HCO3-", "OH-", "O2 2-", "BO3 3-", "HPO3 2-", "ClO3-", "SO3 2-", "NO2-"];

shuffleArrays(polyatomicIonNames, polyatomicIons);

var enterName = []; // whether you need to input the Ion name (true) or Ion (false)
// Add a click event listener to the button
button.addEventListener("click", function() {
    var data = readTableData();
    var incorrect = [];
    for (var i = 1; i < 25; i++) { // first is ocllum names
        if(data[i][0] != polyatomicIonNames[i - 1] || data[i][1] != polyatomicIons[i - 1]){
            console.log("wrong: " + data[i][0] + ", " + data[i][1]);
            incorrect[i - 1] = true;
            console.log("answer: " + polyatomicIonNames[i - 1] + ", " + polyatomicIons[i - 1]);
        }else{
            incorrect[i - 1] = false;
        }
    }
    createAnswerTable(24, 4, incorrect, data);
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function readTableData() {
    var table = document.getElementById("myTable");
    var tableData = [];

    // Iterate over each row in the table
    for (var i = 0; i < table.rows.length; i++) { // V
        var rowData = [];
        var row = table.rows[i];

        // Iterate over each cell in the row
        for (var j = 0; j < row.cells.length; j++) { // ->
            // Push the cell's text content into the row data array
            rowData.push(row.cells[j].textContent);
        }

        // Push the row data array into the table data array
        tableData.push(rowData);
    }

    // Log the table data to the console
    return tableData;
}
function createAnswerTable(rows, columns, incorrect, data) {
    var table = document.createElement("table");
    table.id = "myTable"; 

    // Create table header
    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    for (var i = 0; i < columns; i++) {
        var th = document.createElement("th");
        if(i == 0){
            th.textContent = "Name of Ion";
        }else if(i == 1){
            th.textContent = "Ion";
        }else if(i == 2){
            th.textContent = "Your name";
        }else if(i == 3){
            th.textContent = "Your Ion";
        }
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body with editable cells
    var tbody = document.createElement("tbody");
    for (var i = 0; i < rows; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < columns; j++) {
            var cell = document.createElement("td");
            if(j == 0){
                cell.textContent = polyatomicIonNames[i];
            }else if(j == 1){
                cell.textContent = polyatomicIons[i];
            }else if(j == 2){
                if(incorrect[i]){
                    cell.style.backgroundColor = "red";
                }
                cell.textContent = data[i + 1][0];
            }else if(j == 3){
                if(incorrect[i]){
                    cell.style.backgroundColor = "red";
                }
                cell.textContent = data[i + 1][1];
            }
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);

    // Append table to the document
    document.body.appendChild(table);
}
// Function to create a table with specified rows and columns
function createTable(rows, columns) {
    var table = document.createElement("table");
    table.id = "myTable"; 

    // Create table header
    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    for (var i = 0; i < columns; i++) {
        var th = document.createElement("th");
        th.textContent = "Column " + (i + 1);
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body with editable cells
    var tbody = document.createElement("tbody");
    for (var i = 0; i < rows; i++) {
        var row = document.createElement("tr");
        var editingName = getRandomInt(0, 1) == 1;
        enterName[i] = editingName;
        for (var j = 0; j < columns; j++) {
            var cell = document.createElement("td");
            if(j == 0 && editingName){ // name
                cell.contentEditable = true; // make cell editable
            }else if(j == 1 && !editingName){
                cell.contentEditable = true;
            }
            if(j == 0){
                cell.textContent = polyatomicIonNames[i];
            }else{
                cell.textContent = polyatomicIons[i];
            }
            if(j == 0 && editingName){ // name
                cell.textContent = ""; // clear it
            }else if(j == 1 && !editingName){
                cell.textContent = "";
            }
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);

    // Append table to the document
    document.body.appendChild(table);
}

// Call createTable function to create a 24x2 table
createTable(24, 2);

