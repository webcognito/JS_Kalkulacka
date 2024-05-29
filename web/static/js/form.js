// Logic for Gas Form

// Initate Array
let gResults = [];

function getFormData() {
// Extract user input
    const form = document.getElementById('gForm');
    const company = form.elements['company'].value;
    const contractDuration = form.elements['contractDuration'].value;
    const usageRange = form.elements['usageRange'].value;
    const mwhUsage = parseFloat(form.elements['mwhUsage'].value);
    const numberOfMonths = parseFloat(form.elements['numberOfMonths'].value);
    const priceGas = parseFloat(form.elements['priceGas'].value);
    const monthlyGas = parseFloat(form.elements['monthlyGas'].value);
    const priceDist = parseFloat(form.elements['priceDist'].value);
    const monthlyDist = parseFloat(form.elements['monthlyDist'].value);
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

// Show quick result
    const resultDiv = quickResult(numberOfMonths, totalCost, advancePay);
    document.getElementById('submit').outerHTML = resultDiv;
  
// Show details
    const detailButton = document.getElementById('btnDetail');
    detailButton.addEventListener('click', function() {
        showDetails(uuid);
        document.getElementById('detail').scrollIntoView({behavior: 'smooth'});
      });  
};

// New Data Input scroll to top
function newCalc(){
    // Scroll to element
    document.getElementById('gForm').scrollIntoView({behavior: 'smooth'});
    // Replace HTML
    const newCalcDiv = newCalcHTML();
    document.getElementById('submit').outerHTML = newCalcDiv;
    document.getElementById('gTable').outerHTML = '<div id="gTable"></div>'
};

// Show result details
function showDetails(uuid) {
    // Retrieve Array from localStorage
    const storedArray = localStorage.getItem('gResults');
    // Parse JSON string back to Array
    const parsedArray = JSON.parse(storedArray);
    const foundResult = parsedArray.find(item => item.uuid === uuid);
    // Replace HTML
    const detailDiv = detailResult(foundResult);
    document.getElementById('detail').outerHTML = detailDiv;
};

// Show table
function showTable(){
    const table = tableHTML();
    document.getElementById('gTable').outerHTML = table;
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
    // otherwise add result object to array
    gResults.push(result);
    return true;
};
// Checks if uuid allready present in array and returns true/false
function checkUuid(uuid) {
    return gResults.some(function (gfg) {
        return gfg.uuid === uuid;
    });
};
// add updated array to local storage
function addToLocalStorage(gResults) {
    localStorage.setItem('gResults', JSON.stringify(gResults));
    //renderGRows(gRows);
};

// Section for HTML snipets
function quickResult(numberOfMonths, totalCost, advancePay) {
    const html = '<div id="submit" class="container mt-5 mb-5">'+
                    '<div class="row footer-background">'+
                        '<h4 class="text-primary text-center text-center mt-3"><u>Celková Cena</u></h4>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="form-label text-center col-sm-5">'+
                            '<label for="total">Za ' + numberOfMonths + ' měsícu (Kč)</label>'+
                            '<input type="number" class="form-control text-center" id="total" name="total" value="'+totalCost+'" disabled>'+
                        '</div>'+
                        '<div class="form-label text-center col-sm-5 mb-5">'+
                            '<label for="totalMonth">Měsíčna Záloha (Kč)</label>'+
                            '<input type="number" class="form-control text-center" id="advance" name="totalMonth" value="'+advancePay+'" disabled>'+
                        '</div>'+
                        '<div class="col-sm-1"></div>'+
                    '</div>'+
                    '<div id="detail" class="row">'+
                        '<div class="col-sm-2"></div>'+
                        '<div class="mt-5 mb-3 d-grid col-sm-2">'+
                            '<button id="btnNewCalc" type="button" onclick="newCalc()" class="btn btn-primary btn-block">Změnit Parametry</button>'+
                        '</div>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="mt-5 mb-3 d-grid col-sm-2">'+
                            '<button id="btnDetail" type="button" class="btn btn-primary btn-block">Podrobnosti</button>'+
                        '</div>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="mt-5 mb-3 d-grid col-sm-2">'+
                            '<button id="btnDetail" type="button" onclick="showTable()" class="btn btn-primary btn-block">Show Comps</button>'+
                        '</div>'+
                        '<div class="col-sm-2"></div>'+
                    '</div>'+
                '</div>';
    return html;
};

function detailResult(foundResult) {
    const html ='<div id="detail" class="mb-5 mt-5">'+
                    '<div class="row footer-background">'+
                        '<h4 class="text-primary text-center mt-3"><u>Detaily</u></h4>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="form-label text-center mt-3 mb-4 col-sm-5">'+
                            '<label for="CostUsage">Obchodní Cena</label>'+
                            '<input type="number" class="form-control text-center" id="CostUsage" name="CostUsage" value="'+foundResult.companyCost+'" disabled>'+ 
                        '</div>'+
                        '<div class="form-label text-center mt-3 mb-4 col-sm-5">'+
                            '<label for="CostDist">Regulovaná Cena</label>'+
                            '<input type="number" class="form-control text-center" id="CostDist" name="CostDist" value="'+foundResult.regulatoryCost+'" disabled>'+ 
                        '</div>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="form-label text-center mt-3 mb-4 col-sm-5">'+
                            '<label for="CostUsage">Uživatelská Cena</label>'+
                            '<input type="number" class="form-control text-center" id="CostUsage" name="CostUsage" value="'+foundResult.usageCost+'" disabled>'+ 
                        '</div>'+
                        '<div class="form-label text-center mt-3 mb-4 col-sm-5">'+
                            '<label for="CostDist">Distribucní Cena</label>'+
                            '<input type="number" class="form-control text-center" id="CostDist" name="CostDist" value="'+foundResult.distCostXmonths+'" disabled>'+ 
                        '</div>'+
                        '<div class="col-sm-1"></div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="col-sm-2"></div>'+
                        '<div class="mt-5 mb-1 d-grid col-sm-3">'+
                            '<button id="btnNewCalc" type="button" onclick="newCalc()" class="btn btn-primary btn-block">Změnit Parametry</button>'+
                        '</div>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="col-sm-1"></div>'+
                        '<div class="mt-5 mb-1 d-grid col-sm-3">'+
                            '<button id="btnDetail" type="button" onclick="showTable()" class="btn btn-primary btn-block">Show Comp</button>'+
                        '</div>'+
                        '<div class="col-sm-2"></div>'+
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

function tableHTML() {
    const html ='<div id="gTable" style="overflow-x: auto;" class="row">'+
                    '<h4 class="text-danger text-center">Srovnání Výpočtu</h4>'+
                    '<table id="savedComp" class="text-center form-bg-color">'+
                        '<tr>'+
                            '<th>Dodavatel</th>'+
                            '<th>Smlouva</th>'+
                            '<th>Spotřeba</th>'+
                            '<th>Měsícu</th>'+
                            '<th>Cena</th>'+
                            '<th>Záloha</th>'+
                        '</tr>'+
                    '</table>';
    return html;
};