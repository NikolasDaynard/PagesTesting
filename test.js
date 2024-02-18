// Get the button element by its ID
var button = document.getElementById("myButton");

var polyatomicIonNames = ["Cyanide", "Dichromate", "Perchlorate", "Hydrogen Sulfate", "Chlorite", "Acetate", "Oxalate", "Sulfate", "Permanganate", "Carbonate", "Dihydrogen Phosphate", "Phosphate", "Ammonium", "Nitrate", "Chromate", "Hypochlorite", "Bicarbonate /\n hydrogen carbonate", "Hydroxide", "Peroxide", "Borate", "Hydrogen Phosphite", "Chlorate", "Sulfite", "Nitrite"];
var polyatomicIons = ["CN-", "Cr2O7 2-", "ClO4-", "HSO4-", "ClO2-", "CH3CO2-", "C2O4 2-", "SO4 2-", "MnO4-", "CO3 2-", "H2PO4-", "PO4 3-", "NH4+", "NO3-", "CrO4 2-", "ClO-", "HCO3-", "OH-", "O2 2-", "BO3 3-", "HPO3 2-", "ClO3-", "SO3 2-", "NO2-"];

// Add a click event listener to the button
button.addEventListener("click", function() {
    // Get the value from the textbox
    readTableData()
});

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
    console.log("Table Data:", tableData);
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
        for (var j = 0; j < columns; j++) {
            var cell = document.createElement("td");
            cell.contentEditable = true; // make cell editable
            if(j == 0){
                cell.textContent = polyatomicIonNames[i];
            }else{
                cell.textContent = polyatomicIons[i];
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

