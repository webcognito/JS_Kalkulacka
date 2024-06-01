// Logic for Gas Form

// Initate Array
let gResults = [];

function getFormData() {
// Extract user input
    const company = formValue('gForm', 'company');
    const contractDuration = formValue("gForm", 'contractDuration');
    const usageRange = formValue("gForm", 'usageRange');
    const mwhUsage = parseFloat(formValue("gForm", 'mwhUsage'));
    const numberOfMonths = parseFloat(formValue('gForm', 'numberOfMonths'));
    const priceGas = parseFloat(formValue('gForm', 'priceGas'));
    const monthlyGas = parseFloat(formValue('gForm', 'monthlyGas'));
    const priceDist = parseFloat(formValue('gForm', 'priceDist'));
    const monthlyDist = parseFloat(formValue('gForm', 'monthlyDist'));

// Calculation of Results
    // Usage Cost
    let usageCost = mwhUsage * (priceGas + priceDist);
    // Distribution Cost
    let distCostXmonths = numberOfMonths * (monthlyGas + monthlyDist);
    // Regulatory Cost
    let regulatoryCost = ((priceDist * mwhUsage) + (monthlyDist * numberOfMonths)).toFixed(2);
    // Company Cost
    let companyCost = ((priceGas * mwhUsage) + (monthlyGas * numberOfMonths)).toFixed(2);
    // Total Cost
    totalCost = (usageCost + distCostXmonths).toFixed(2);
    // Monthly advance
    advancePay = (totalCost / numberOfMonths).toFixed(2);
    // Creat uuid for result
    let uuid = crypto.randomUUID();

// Store values in local storage as Array
    // get existing array form storage
    gResults = getFromLocalStorage();
    // create new object
    const result = {
        uuid: uuid,
        company: company,
        contractDuration: contractDuration,
        usageRange: usageRange,
        mwhUsage: mwhUsage,
        numberOfMonths: numberOfMonths,
        regulatoryCost: regulatoryCost,
        companyCost: companyCost,
        usageCost: usageCost,
        distCostXmonths: distCostXmonths,
        totalCost: totalCost,
        advancePay: advancePay
    };
    // check if result object should be added to array
    addToArray(result);
    // add updated results array to local storage
    addToLocalStorage(gResults);

// Creat result HTML
    getId('submit').style.display = "none"
    const resultDiv = Result(result);
    getId('result').outerHTML = resultDiv;
    scrollTo('result');
    gResults = getFromLocalStorage();
    renderGRows(gResults);
};

// Get array from local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('gResults');
    if (reference) {
        gResults = JSON.parse(reference);
    } else {
        gResults = [];
    }
    return gResults
};

// Add result to array only if uuid doesn't exist
function addToArray(result) {
    // if uuid already exists return
    if (checkUuid(result.uuid)) {
        return false;
    }
    // Otherwise add result object to array
    gResults.push(result);
    return true;
};

// Checks if uuid allready present in array and returns true/false
function checkUuid(uuid) {
    return gResults.some(function (gfg) {
        return gfg.uuid === uuid;
    });
};

// Add updated array to local storage
function addToLocalStorage(gResults) {
    localStorage.setItem('gResults', JSON.stringify(gResults));
};

// Render table with the data from local storage
function renderGRows(gResults) {
    let table = document.getElementById('savedComp');

    // delet existing rows, exclude table head
    let rowCount = table.rows.length;
    for (let i = rowCount - 1; i >0; i--) {
        table.deleteRow(i);
    }
    
    // create new table rows with updated objects fro array
    for (let row of gResults) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.textContent = row.company;
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.textContent = row.contractDuration;
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.textContent = row.mwhUsage;
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        td4.textContent = row.numberOfMonths;
        tr.appendChild(td4);

        let td5 = document.createElement('td');
        td5.textContent = row.totalCost;
        tr.appendChild(td5);

        let td6 = document.createElement('td');
        td6.textContent = row.advancePay;
        tr.appendChild(td6);

        table.appendChild(tr);
    }
};

// Section for HTML
function Result(result) {
    const html ='<div id="result" style="display:block;" class="container mt-5 mb-3">'+
                    '<div class="row footer-background">'+
                        '<h4 class="text-primary text-center text-center mt-3"><u>Celková Cena</u></h4>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="form-label text-center col-sm-5">'+
                            '<label for="total">Za ' + result.numberOfMonths + ' měsícu (Kč)</label>'+
                            '<input type="number" class="form-control text-center" id="total" name="total" value="' + result.totalCost + '" disabled>'+
                        '</div>'+
                        '<div class="form-label text-center col-sm-5 mb-5">'+
                            '<label for="totalMonth">Měsíčna Záloha (Kč)</label>'+
                            '<input type="number" class="form-control text-center" id="advance" name="totalMonth" value="' + result.advancePay + '" disabled>'+
                        '</div>'+
                        '<div class="col-sm-1"></div>'+
                    '</div>'+
                    '<div id="buttonsQuickResult" class="row">'+
                        '<div class="mt-5 mb-3 d-grid col-sm-3">'+
                            '<button id="btnNewCalc1" type="button" onclick="newCalc()" class="btn btn-primary btn-block" style="display: block;">Změnit Parametry</button>'+
                        '</div>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="mt-5 mb-3 d-grid col-sm-2">'+
                            '<button id="btnDetail" type="button" onclick="showDetail()" class="btn btn-primary btn-block">Podrobnosti</button>'+
                        '</div>'+
                        '<div class="mt-5 mb-3 d-grid col-sm-2">'+
                            '<button id="btnComp" type="button" onclick="showTable()" class="btn btn-primary btn-block">Srovnat</button>'+
                        '</div>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="mt-5 mb-3 d-grid col-sm-3">'+
                            '<button id="btnDownloadResult" type="button" onclick="" class="btn btn-primary btn-block">Stáhnout Výpočet</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div id="detail" class="container mb-5 mt-3" style="display: none">'+
                    '<div class="row footer-background">'+
                        '<h4 class="text-primary text-center mt-3"><u>Podrobnosti</u></h4>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="form-label text-center mt-3 mb-4 col-sm-5">'+
                            '<label for="CostUsage">Obchodní Cena (Kč)</label>'+
                            '<input type="number" class="form-control text-center" id="CostUsage" name="CostUsage" value="'+result.companyCost+'" disabled>'+ 
                        '</div>'+
                        '<div class="form-label text-center mt-3 mb-4 col-sm-5">'+
                            '<label for="CostDist">Regulovaná Cena (Kč)</label>'+
                            '<input type="number" class="form-control text-center" id="CostDist" name="CostDist" value="'+result.regulatoryCost+'" disabled>'+ 
                        '</div>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="form-label text-center mt-3 mb-4 col-sm-5">'+
                            '<label for="CostUsage">Uživatelská Cena (Kč)</label>'+
                            '<input type="number" class="form-control text-center" id="CostUsage" name="CostUsage" value="'+result.usageCost+'" disabled>'+ 
                        '</div>'+
                        '<div class="form-label text-center mt-3 mb-4 col-sm-5">'+
                            '<label for="CostDist">Distribucní Cena (Kč)</label>'+
                            '<input type="number" class="form-control text-center" id="CostDist" name="CostDist" value="'+result.distCostXmonths+'" disabled>'+ 
                        '</div>'+
                        '<div class="col-sm-1"></div>'+
                    '</div>'+
                    '<div id="buttonsDetail" class="row">'+
                        '<div class="mt-5 mb-1 d-grid col-sm-3">'+
                            '<button id="btnNewCalc2" type="button" onclick="newCalc()" class="btn btn-primary btn-block" style="display: block;">Změnit Parametry</button>'+
                        '</div>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="mt-5 mb-1 d-grid col-sm-4">'+
                            '<button id="btnCompDetail" type="button" onclick="showTable()" class="btn btn-primary btn-block" style="display: block;">Srovnat</button>'+
                        '</div>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="mt-5 mb-1 d-grid col-sm-3">'+
                            '<button id="btnDownloadDetail" type="button" onclick="" class="btn btn-primary btn-block">Stáhnout Podrobnosti</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div id="gTable" style="overflow-x: auto; display: none;" class="container">'+
                    '<h4 class="text-danger text-center">Srovnání Výpočtu</h4>'+
                        '<table id="savedComp" class="text-center footer-background col-12">'+
                            '<tr>'+
                                '<th>Dodavatel</th>'+
                                '<th>Smlouva</th>'+
                                '<th>Spotřeba MWh</th>'+
                                '<th>Měsícu</th>'+
                                '<th>Cena</th>'+
                                '<th>Záloha</th>'+
                            '</tr>'+
                        '</table>'+
                    '<div class="row">'+
                        '<div class="mt-5 mb-5 d-grid col-sm-3">'+
                            '<button id="btnNewCalc" type="button" onclick="newCalc()" class="btn btn-primary btn-block">Změnit Parametry</button>'+
                        '</div>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="mt-5 mb-5 d-grid col-sm-4">'+
                            '<button id="btnClearTable" type="button" onclick="clearGTable()" class="btn btn-primary btn-block">Vše Smazat a Začít Znova</button>'+
                        '</div>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="mt-5 mb-5 d-grid col-sm-3">'+
                            '<button id="btnDownload" type="button" onclick="" class="btn btn-primary btn-block">Stáhnout Srovnání</button>'+
                        '</div>'+
                    '</div>'+
                '</div>';
    return html;
};




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