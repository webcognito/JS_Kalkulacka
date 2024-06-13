// Logic for Electric Form

// Initate Array
let eResults = [];
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
    const priceInputBreaker = parseFloat(formValue('form', 'priceInputBreaker'));
    const OTE = parseFloat(formValue('form', 'OTE'));
    const byConsumption = parseFloat(formValue('form', 'byConsumption'));
    const byBreaker = parseFloat(formValue('form', 'byBreaker'));
    const mainBreaker = parseFloat(formValue('form', 'mainBreaker'));
    const phases = parseFloat(formValue('form', 'phases'));

// Calculation of Results
    // Creat uuid for result
    uuid = crypto.randomUUID();
    // Usage Cost
    let calCostVT = usageVT * priceVT;
    let calCostNT = usageNT * priceNT;
    let costVT = calCostVT.toFixed(2);
    let costNT = calCostNT.toFixed(2);
    // Monthly payments
    let costMonth = constPay + priceInputBreaker + OTE;
    // POZE
    let aPoze = byConsumption * (usageNT + usageVT);
    let bPoze = byBreaker * mainBreaker * phases * 12;
    let poze = calPoze(aPoze, bPoze);

    // Total Cost
    totalCost = (calCostVT + calCostNT + (numberOfMonths * costMonth) + poze).toFixed(2);
    // Monthly advance
    advancePay = (totalCost / numberOfMonths).toFixed(2);


// Store values in local storage as Array
    // get existing array form storage
    eResults = getFromLocalStorage();
    // create new object
    const result = {
        uuid: uuid,
        company: company,
        contractDuration: contractDuration,
        distCode: distCode,
        usageVT: usageVT,
        usageNT: usageNT,
        numberOfMonths: numberOfMonths,
        mainBreaker: mainBreaker,
        phases: phases,
        costVT: costVT,
        costNT: costNT,
        costMonth: costMonth,
        poze: poze,
        totalCost: totalCost,
        advancePay: advancePay
    };
    // check if result object should be added to array
    addToArray(result);
    // add updated results array to local storage
    addToLocalStorage(eResults);

// Creat result HTML
    getId('submit').style.display = "none"
    const resultDiv = Result(result);
    getId('result').outerHTML = resultDiv;
    scrollTo('result');
    gResults = getFromLocalStorage();
    renderERows(eResults);
};

// Calculate which POZE will be adden
function calPoze (aPoze, bPoze) {
    let calpoze
    if (aPoze >= bPoze) {
        calpoze = bPoze;
    } else {
        calpoze = aPoze;
    }
    return calpoze;
};

// Get array from local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('eResults');
    if (reference) {
        eResults = JSON.parse(reference);
    } else {
        eResults = [];
    }
    return eResults
};

// Add result to array only if uuid doesn't exist
function addToArray(result) {
    // if uuid already exists return
    if (checkUuid(result.uuid)) {
        return false;
    }
    // Otherwise add result object to array
    eResults.push(result);
    return true;
};

// Checks if uuid allready present in array and returns true/false
function checkUuid(uuid) {
    return eResults.some(function (gfg) {
        return gfg.uuid === uuid;
    });
};

// Add updated array to local storage
function addToLocalStorage(eResults) {
    localStorage.setItem('eResults', JSON.stringify(eResults));
};

// Render table with the data from local storage
function renderERows(eResults) {
    let table = document.getElementById('savedComp');

    // delet existing rows, exclude table head
    let rowCount = table.rows.length;
    for (let i = rowCount - 1; i >0; i--) {
        table.deleteRow(i);
    }
    
    // create new table rows with updated objects fro array
    for (let row of eResults) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.textContent = row.company;
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.textContent = row.contractDuration;
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.textContent = row.usageVT;
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        td4.textContent = row.usageNT;
        tr.appendChild(td4);

        let td5 = document.createElement('td');
        td5.textContent = row.numberOfMonths;
        tr.appendChild(td5);

        let td6 = document.createElement('td');
        td6.textContent = row.totalCost;
        tr.appendChild(td6);

        let td7 = document.createElement('td');
        td7.textContent = row.advancePay;
        tr.appendChild(td7);

        table.appendChild(tr);
    }
};

// Section for HTML
function Result(result) {
    const html ='<div id="result" style="display:block;" class="container mt-3 mb-3">'+
                    '<div class="row footer-background">'+
                        '<h4 class="text-primary text-center text-center mt-3 mb-3"><u>Celková Cena</u></h4>'+
                        '<div class="form-label text-center mb-3 col">'+
                            '<label for="total">Za ' + result.numberOfMonths + ' měsícu (Kč)</label>'+
                            '<input type="number" class="form-control text-center" id="total" name="total" value="' + result.totalCost + '" disabled>'+
                        '</div>'+
                        '<div class="form-label text-center mb-3 col">'+
                            '<label for="totalMonth">Měsíčna Záloha (Kč)</label>'+
                            '<input type="number" class="form-control text-center" id="advance" name="totalMonth" value="' + result.advancePay + '" disabled>'+
                        '</div>'+
                    '</div>'+
                    '<div id="buttonsQuickResult" class="row mt-4 mb-3">'+
                        '<div class="d-grid col-6 mt-3 col-md">'+
                            '<button id="btnNewCalc1" type="button" onclick="newCalc()" class="btn btn-primary btn-block" style="display: block;"><i class="fa-solid fa-arrows-rotate"></i> Změnit Parametry</button>'+
                        '</div>'+
                        '<div class="d-grid col-6 mt-3 col-md">'+
                            '<button id="btnComp" type="button" onclick="showTable()" class="btn btn-primary btn-block">Srovnat</button>'+
                        '</div>'+
                        '<div class="d-grid col-6 mt-3 col-md">'+
                            '<button id="btnDetail" type="button" onclick="showDetail()" class="btn btn-primary btn-block">Podrobnosti</button>'+
                        '</div>'+
                        '<div class="d-grid col-6 mt-3 col-md">'+
                            '<button id="btnDownloadDetail" type="button" onclick="downloadDetailCalculation()" class="btn btn-primary btn-block"><i class="fa-solid fa-download"></i> Stáhnout Výpočet</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div id="detail" class="container mt-4" style="display: none">'+
                    '<div class="row footer-background">'+
                        '<h4 class="text-primary text-center mt-3 mb-3"><u>Podrobnosti</u></h4>'+
                        '<div class="form-label text-center mb-3 col-sm-6 col-lg">'+
                            '<label for="CostUsageVT">Cena za Vysoký Tarif (Kč)</label>'+
                            '<input type="number" class="form-control text-center" id="CostUsageVT" name="CostUsageVT" value="'+result.costVT+'" disabled>'+ 
                        '</div>'+
                        '<div class="form-label text-center mb-3 col-sm-6 col-lg">'+
                            '<label for="CostUsageNT">Cena za Nizky Tarif (Kč)</label>'+
                            '<input type="number" class="form-control text-center" id="CostUsageNT" name="CostUsageNT" value="'+result.costNT+'" disabled>'+ 
                        '</div>'+
                        
                        '<div class="form-label text-center mb-3 col-sm-6 col-lg">'+
                            '<label for="monthlyPay">Měsíční platba (Kč)</label>'+
                            '<input type="number" class="form-control text-center" id="monthlyPay" name="monthlyPay" value="'+result.costMonth+'" disabled>'+ 
                        '</div>'+
                        '<div class="form-label text-center mb-3 col-sm-6 col-lg">'+
                            '<label for="POZE">Poze (Kč)</label>'+
                            '<input type="number" class="form-control text-center" id="POZE" name="POZE" value="'+result.poze+'" disabled>'+ 
                        '</div>'+
                    '</div>'+
                    '<div id="buttonsDetail" class="row mt-4 mb-3">'+
                        '<div class="d-grid col">'+
                            '<button id="btnNewCalc2" type="button" onclick="newCalc()" class="btn btn-primary btn-block" style="display: block;"><i class="fa-solid fa-arrows-rotate"></i> Změnit Parametry</button>'+
                        '</div>'+
                        
                        '<div class="d-grid col">'+
                            '<button id="btnCompDetail" type="button" onclick="showTable()" class="btn btn-primary btn-block" style="display: block;">Srovnat</button>'+
                        '</div>'+
                        
                        '<div class="d-grid col">'+
                            '<button id="btnDownloadDetail" type="button" onclick="downloadDetailCalculation()" class="btn btn-primary btn-block"><i class="fa-solid fa-download"></i> Stáhnout Podrobnosti</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div id="table" style="display: none;" class="mt-3 mb-3">'+
                    '<h4 class="text-danger text-center">Srovnání Výpočtu</h4>'+
                        '<table id="savedComp" class="responsive-table text-center col-12">'+
                            '<tr>'+
                                '<th>Dodavatel</th>'+
                                '<th>Smlouva</th>'+
                                '<th>Spotřeba VT</th>'+
                                '<th>Spotřeba NT</th>'+
                                '<th>Měsícu</th>'+
                                '<th>Cena</th>'+
                                '<th>Záloha</th>'+
                            '</tr>'+
                        '</table>'+
                    '<div id="buttonsTable" class="row mt-4 mb-3">'+
                        '<div class="d-grid col">'+
                            '<button id="btnNewCalc" type="button" onclick="newCalc()" class="btn btn-primary btn-block"><i class="fa-solid fa-arrows-rotate"></i> Změnit Parametry</button>'+
                        '</div>'+
                        
                        '<div class="d-grid col">'+
                            '<button id="btnClearTable" type="button" onclick="clearGTable()" class="btn btn-primary btn-block"><i class="fa-regular fa-trash-can"></i> Smazat a Začít Znova</button>'+
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
    const eIds = ['usageVT', 'usageNT', 'priceVT', 'priceNT', 'constPay', 'priceInputBreaker', 'OTE', 'byConsumption', 'byBreaker'];
    changeInputDefaultValue(eIds);
});



function newCalcHTML() {
    const html ='<div id="submit" class="row">'+
                    '<div class="col-sm-2"></div>'+
                    '<div class="form-check col-sm-8">'+
                        '<input class="form-check-input" type="checkbox" id="consent" required>'+
                        '<label class="form-check-label" for="consent">'+
                            'Rozumím, že vypočtené výsledky jsou pouze orientační a každý poskytovatel provádí vlastní výpočty.'+
                        '</label>'+
                    '</div>'+
                    '<div class="col-sm-2"></div>'+
                    '<div class="col-sm-2"></div>'+
                    '<div class="mt-2 mb-5 d-grid col-sm-8">'+
                        '<button id="btnSubmit" type="button" onclick="getFormData()" class="btn btn-primary btn-block">Vypočítat</button>'+
                    '</div>'+
                    '<div class="col-sm-2"></div>'+
                '</div>';
    return html;
};

function newButtonAfterDetail() {
    const html ='<div id="buttonsDetail" class="row">'+
                    '<div class="col-sm-4"></div>'+
                    '<div class="mt-5 mb-1 d-grid col-sm-4">'+
                        '<button id="btnNewCalc" type="button" onclick="newCalc()" class="btn btn-primary btn-block">Změnit Parametry</button>'+
                    '</div>'+
                    '<div class="col-sm-4"></div>'+
                '</div>';
return html;
};

function newButtonsAfterQuickResult() {
    const html ='<div id="buttonsQuickResult" class="row">'+
                    '<div class="col-sm-2"></div>'+
                    '<div class="mt-5 mb-3 d-grid col-sm-3">'+
                        '<button id="btnNewCalc" type="button" onclick="newCalc()" class="btn btn-primary btn-block">Změnit Parametry</button>'+
                    '</div>'+
                    '<div class="col-sm-2"></div>'+
                    '<div class="mt-5 mb-3 d-grid col-sm-3">'+
                        '<button id="btnDetail2" type="button" class="btn btn-primary btn-block">Podrobnosti</button>'+
                    '</div>'+
                    '<div class="col-sm-2"></div>'+
                '</div>';
return html;
};
