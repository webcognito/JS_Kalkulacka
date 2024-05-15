// SAVE TO LOCAL STORAGE AND RENDER COMP TABLE FROM UPDATED STORAGE

// GAS TABLE
let gRows = []; //initiate Array

// on page load render comparision table form local storage
window.onload = loadTable()
function loadTable() {
    gRows = getFromLocalStorage();
    renderGRows(gRows);
}

// on button click add gas cost calculation to comparison table
function addGasComp() {
    // load previous results from local storage
    gRows = getFromLocalStorage();

    // get data from hidden table "comp" for new row
    const gCompany = document.getElementById("comp").rows[0].cells[0].innerHTML;
    const gContract = document.getElementById("comp").rows[0].cells[1].innerHTML;
    const gUsage = document.getElementById("comp").rows[0].cells[2].innerHTML;
    const gMonths = document.getElementById("comp").rows[0].cells[3].innerHTML;
    const gTotal = document.getElementById("comp").rows[0].cells[4].innerHTML;
    const gAdvance = document.getElementById("comp").rows[0].cells[5].innerHTML;
    const gUuid = document.getElementById("comp").rows[0].cells[11].innerHTML;

    // create new row object
    const gRow = {
        uuid: gUuid,
        company: gCompany,
        contract: gContract,
        usage: gUsage,
        months: gMonths,
        total: gTotal,
        advance: gAdvance
    };

    // check if row object should be add to array
    addToArray(gRow);

    // add updated array to local storage
    addToLocalStorage(gRows);
}

// Add to array only if uuid doesn't exist
function addToArray(gRow) {
    // if uuid already exists return
    if (checkUuid(gRow.uuid)) {
        return false;
    }
    // otherwise add row object to array
    gRows.push(gRow);
    return true;
}

// Checks if uuid allready present in array and returns true/false
function checkUuid(uuid) {
    return gRows.some(function (gfg) {
        return gfg.uuid === uuid;
    });
}

// add updated array to local storage
function addToLocalStorage(gRows) {
    localStorage.setItem('gRows', JSON.stringify(gRows));
    renderGRows(gRows);
}

// get array from local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('gRows');
    if (reference) {
        gRows = JSON.parse(reference);
    } else {
        gRows = [];
    }
    return gRows
}

// render table with the data from local storage
function renderGRows(gRows) {
    
    let table = document.getElementById('savedComp');

    // delet existing rows, exclude table head
    let rowCount = table.rows.length;
    for (let i = rowCount - 1; i >0; i--) {
        table.deleteRow(i);
    }
    
    // create new table rows with updated objects fro array
    for (let row of gRows) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.textContent = row.company;
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.textContent = row.contract;
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.textContent = row.usage;
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        td4.textContent = row.months;
        tr.appendChild(td4);

        let td5 = document.createElement('td');
        td5.textContent = row.total;
        tr.appendChild(td5);

        let td6 = document.createElement('td');
        td6.textContent = row.advance;
        tr.appendChild(td6);

        table.appendChild(tr);
    }
}

function clearGTable(gRows) {
    localStorage.clear(gRows);
    gRows = localStorage.getItem('gRows');
    renderGRows(gRows);
}