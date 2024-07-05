// Logic for Electric Form

// Initate Array
let eResultsQuick = [];
let uuid;
function getFormData() {
// Extract user input
    const company = formValue('form', 'company');
    const contractDuration = formValue("form", 'contractDuration');
    const distCode = formValue("form", 'distCode');
    const usageVT = parseFloat(formValue("form", 'usageVT'));
    const usageNT = parseFloat(formValue("form", 'usageNT'));
    const numberOfMonths = parseFloat(formValue('form', 'numberOfMonths'));
    const priceVT = parseFloat(formValue('form', 'priceVT'));
    const priceNT = parseFloat(formValue('form', 'priceNT'));
    const constPay = parseFloat(formValue('form', 'constPay'));
    
// Calculation of Results
    // Creat uuid for result
    uuid = crypto.randomUUID();
    // Usage Cost
    let calCostVT = usageVT * priceVT;
    let calCostNT = usageNT * priceNT;
    let costVT = calCostVT.toFixed(2);
    let costNT = calCostNT.toFixed(2);
    // Monthly payments
    let calMonth = constPay * numberOfMonths;
    let costMonth = calMonth.toFixed(2);

    // Total Cost
    totalCost = (calCostVT + calCostNT + calMonth).toFixed(2);

// Store values in local storage as Array
    // get existing array form storage
    eResultsQuick = getFromLocalStorage();
    // create new object
    const result = {
        uuid: uuid,
        company: company,
        contractDuration: contractDuration,
        distCode: distCode,
        usageVT: usageVT,
        usageNT: usageNT,
        numberOfMonths: numberOfMonths,
        costVT: costVT,
        costNT: costNT,
        costMonth: costMonth,
        totalCost: totalCost,
    };
    // check if result object should be added to array
    addToArray(result);
    // add updated results array to local storage
    addToLocalStorage(eResultsQuick);

// Creat result HTML
    getId('submit').style.display = "none"
    const resultDiv = Result(result);
    getId('result').outerHTML = resultDiv;
    scrollTo('result');
    eResultsQuick = getFromLocalStorage();
    renderERows(eResultsQuick);
};

// Get array from local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('eResultsQuick');
    if (reference) {
        eResultsQuick = JSON.parse(reference);
    } else {
        eResultsQuick = [];
    }
    return eResultsQuick
};

// Add result to array only if uuid doesn't exist
function addToArray(result) {
    // if uuid already exists return
    if (checkUuid(result.uuid)) {
        return false;
    }
    // Otherwise add result object to array
    eResultsQuick.push(result);
    return true;
};

// Checks if uuid allready present in array and returns true/false
function checkUuid(uuid) {
    return eResultsQuick.some(function (gfg) {
        return gfg.uuid === uuid;
    });
};

// Add updated array to local storage
function addToLocalStorage(eResultsQuick) {
    localStorage.setItem('eResultsQuick', JSON.stringify(eResultsQuick));
};

// Render table with the data from local storage
function renderERows(eResultsQuick) {
    let table = document.getElementById('savedComp');

    // delet existing rows, exclude table head
    let rowCount = table.rows.length;
    for (let i = rowCount - 1; i >0; i--) {
        table.deleteRow(i);
    }
    
    // create new table rows with updated objects from array
    for (let row of eResultsQuick) {
        let tr = document.createElement('tr');

        let td1 = document.createElement('td');
        td1.textContent = row.company;
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.textContent = row.contractDuration;
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.textContent = row.distCode;
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        td4.textContent = row.usageVT;
        tr.appendChild(td4);

        let td5 = document.createElement('td');
        td5.textContent = row.usageNT;
        tr.appendChild(td5);

        let td6 = document.createElement('td');
        td6.textContent = row.numberOfMonths;
        tr.appendChild(td6);

        let td7 = document.createElement('td');
        td7.textContent = row.totalCost;
        tr.appendChild(td7);

        table.appendChild(tr);
    }
};

// Section for HTML
function Result(result) {
    const html ='<div id="result" style="display:block;" class="container mt-3 mb-3">'+
                    '<div class="row footer-background">'+
                        '<h4 class="text-primary text-center text-center mt-3 mb-3"><u>Obchodní Cena za ' + result.numberOfMonths + ' měsícu</u></h4>'+
                        '<div class="form-label text-center mb-3 col-6">'+
                            '<label for="totalUsage">Vysoký Tarif</label>'+
                            '<input type="number" class="form-control text-center" id="advance" name="totalMonth" value="' + result.costVT + '" disabled>'+
                        '</div>'+
                        '<div class="form-label text-center mb-3 col-6">'+
                            '<label for="totalUsage">Nízký Tarif</label>'+
                            '<input type="number" class="form-control text-center" id="advance" name="totalMonth" value="' + result.costNT + '" disabled>'+
                        '</div>'+
                        '<div class="form-label text-center mb-3 col-6">'+
                            '<label for="totalDist">Stálá Platba</label>'+
                            '<input type="number" class="form-control text-center" id="advance" name="totalMonth" value="' + result.costMonth + '" disabled>'+
                        '</div>'+
                        '<div class="form-label text-center mb-3 col-6">'+
                            '<label for="total"><strong>Celková</strong></label>'+
                            '<input type="number" class="form-control text-center fw-bold" id="total" name="total" value="' + result.totalCost + '" disabled>'+
                        '</div>'+
                    '</div>'+
                    '<div id="buttonsQuickResult" class="row mt-4 mb-3">'+
                        '<div class="d-grid col-4 mt-3 col-md">'+
                            '<button id="btnNewCalc1" type="button" onclick="newCalc()" class="btn btn-primary btn-block" style="display: block;"><i class="fa-solid fa-arrows-rotate"></i> Změnit Parametry</button>'+
                        '</div>'+
                        '<div class="d-grid col-4 mt-3 col-md">'+
                            '<button id="btnComp" type="button" onclick="showTableQuick()" class="btn btn-primary btn-block" style="display: block;">Srovnat</button>'+
                        '</div>'+
                        '<div class="d-grid col-4 mt-3 col-md">'+
                            '<button id="btnDownloadDetail" type="button" onclick="downloadDetailCalculation()" class="btn btn-primary btn-block"><i class="fa-solid fa-download"></i> Stáhnout Výpočet</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div id="detail">'+
                '</div>'+
                '<div id="table" style="display: none;" class="mt-3 mb-3">'+
                    '<h4 class="text-danger text-center">Srovnání Výpočtu</h4>'+
                        '<table id="savedComp" class="responsive-table text-center col-12">'+
                            '<tr>'+
                                '<th>Dodavatel</th>'+
                                '<th>Smlouva</th>'+
                                '<th>Dist. Sazba</th>'+
                                '<th>Spotřeba VT MWh</th>'+
                                '<th>Spotřeba NT MWh</th>'+
                                '<th>Měsícu</th>'+
                                '<th>Cena</th>'+
                            '</tr>'+
                        '</table>'+
                    '<div id="buttonsTable" class="row mt-4 mb-3">'+
                        '<div class="d-grid col">'+
                            '<button id="btnNewCalc" type="button" onclick="newCalc()" class="btn btn-primary btn-block"><i class="fa-solid fa-arrows-rotate"></i> Změnit Parametry</button>'+
                        '</div>'+
                        
                        '<div class="d-grid col">'+
                            '<button id="btnClearTable" type="button" onclick="clearStorage()" class="btn btn-primary btn-block"><i class="fa-regular fa-trash-can"></i> Smazat a Začít Znova</button>'+
                        '</div>'+
                        
                        '<div class="d-grid col">'+
                            '<button id="btnDownload" type="button" onclick="downloadComparision()" class="btn btn-primary btn-block"><i class="fa-solid fa-download"></i> Stáhnout Srovnání</button>'+
                        '</div>'+
                    '</div>'+
                '</div>';
    return html;
};

// Iinput field onclick delete default value
document.addEventListener('DOMContentLoaded', (event) => {
    const eIds = ['usageVT', 'usageNT', 'priceVT', 'priceNT', 'constPay'];
    changeInputDefaultValue(eIds);
});

function clearStorage() {
    clearTable("eResultsQuick");
}
