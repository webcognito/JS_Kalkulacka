// SAVE TO LOCAL STORAGE AND RENDER COMP TABLE FROM UPDATED STORAGE

// Electric TABLE
let eRows = []; //initiate Array

// on page load render comparision table form local storage
window.onload = loadTable()
function loadTable() {
    eRows = getFromLocalStorage();
    renderERows(eRows);
}

// on button click add electric cost calculation to comparison table
function addElectricComp() {
    // load previous results from local storage
    eRows = getFromLocalStorage();

    // get data from hidden table "comp" for new row
    const eCompany = document.getElementById("comp").rows[0].cells[0].innerHTML;
    const eContract = document.getElementById("comp").rows[0].cells[1].innerHTML;
    const eUsageVT = document.getElementById("comp").rows[0].cells[3].innerHTML;
    const eUsageNT = document.getElementById("comp").rows[0].cells[4].innerHTML;
    const eMonths = document.getElementById("comp").rows[0].cells[11].innerHTML;
    const eTotal = document.getElementById("comp").rows[0].cells[12].innerHTML;
    const eAdvance = document.getElementById("comp").rows[0].cells[13].innerHTML;
    const eUuid = document.getElementById("comp").rows[0].cells[14].innerHTML;

    // create new row object
    const eRow = {
        uuid: eUuid,
        company: eCompany,
        contract: eContract,
        usageVT: eUsageVT,
        usageNT: eUsageNT,
        months: eMonths,
        total: eTotal,
        advance: eAdvance
    };

    // check if row object should be add to array
    addToArray(eRow);

    // add updated array to local storage
    addToLocalStorage(eRows);
}

// Add to array only if uuid doesn't exist
function addToArray(eRow) {
    // if uuid already exists return
    if (checkUuid(eRow.uuid)) {
        return false;
    }
    // otherwise add row object to array
    eRows.push(eRow);
    return true;
}

// Checks if uuid allready present in array and returns true/false
function checkUuid(uuid) {
    return eRows.some(function (gfg) {
        return gfg.uuid === uuid;
    });
}

// add updated array to LOCAL storage
function addToLocalStorage(eRows) {
    localStorage.setItem('eRows', JSON.stringify(eRows));
    renderERows(eRows);
}

// get array from LOCAL storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('eRows');
    if (reference) {
        eRows = JSON.parse(reference);
    } else {
        eRows = [];
    }
    return eRows
}

// render table with the data from local storage
function renderERows(eRows) {
    
    let table = document.getElementById('savedComp');

    // delet existing rows, exclude table head
    let rowCount = table.rows.length;
    for (let i = rowCount - 1; i >0; i--) {
        table.deleteRow(i);
    }
    
    // create new table rows with updated objects fro array
    for (let row of eRows) {
        let tr = document.createElement('tr');
        
        let td1 = document.createElement('td');
        td1.textContent = row.company;
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.textContent = row.contract;
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.textContent = row.usageVT;
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        td4.textContent = row.usageNT;
        tr.appendChild(td4);

        let td5 = document.createElement('td');
        td5.textContent = row.months;
        tr.appendChild(td5);

        let td6 = document.createElement('td');
        td6.textContent = row.total;
        tr.appendChild(td6);

        let td7 = document.createElement('td');
        td7.textContent = row.advance;
        tr.appendChild(td7);

        // Remove single row from table and local storage
        // Not working have to create code!!
        /*
        let td8 = document.createElement('INPUT');
        td8.setAttribute("type", "button");
        td8.setAttribute("value", "X");
        td8.setAttribute("id", "row.uuid")
        td8.setAttribute("onclick", "deleteRow(id)")
        tr.appendChild(td8);
        */

        table.appendChild(tr);
    }
}

function clearETable(eRows) {
    localStorage.clear(eRows);
    eRows = localStorage.getItem('eRows');
    renderERows(eRows);
}

// Not working function
function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("savedComp").deleteRow(i);
}