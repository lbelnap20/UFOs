// import the data from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

let filters = {};

function updateFilters(){
    //let filteredData = tableData;
    // 4a. Save the element that was changed as a variable.
    let filteredElement = d3.select(this);
    // 4b. Save the value that was changed as a variable.
    let filteredValue = filteredElement.property("value")
    // 4c. Save the id of the filter that was changed as a variable.
    let filteredId = filteredElement.attr("id")
    
    // if (filteredElement){
    //     filters = {
    //         id: filteredId,
    //         value: filteredValue
    //     }
    // }
    
    if (filteredValue){
        filters[filteredId] = filteredValue.toLowerCase();
    }
    else{
        delete filters[filteredId];
    }
    console.log(filters);

    filterTable(filters);
};

function filterTable() {

    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(filters).forEach(([id, value]) => {
        filteredData = filteredData.filter(row => row[id] === value);
      });
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }

d3.selectAll("input").on("change", updateFilters);
buildTable(tableData);