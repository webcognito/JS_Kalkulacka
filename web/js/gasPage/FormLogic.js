// Logic for Gas Form

// Initate Array
let gResults = [];
let uuid;
function getFormData() {
// Extract user input
    const company = formValue('form', 'company');
    const contractDuration = formValue("form", 'contractDuration');
    const usageRange = formValue("form", 'usageRange');
    const m3Usage = parseFloat(formValue("form", 'm3Usage'));
    const mwhUsage = parseFloat(formValue("form", 'usage2'));
    const numberOfMonths = parseFloat(formValue('form', 'numberOfMonths'));
    const priceGas = parseFloat(formValue('form', 'priceGas'));
    const monthlyGas = parseFloat(formValue('form', 'monthlyGas'));
    const priceDist = parseFloat(formValue('form', 'priceDist'));
    const monthlyDist = parseFloat(formValue('form', 'monthlyDist'));

// Calculation of Results
    // Creat uuid for result
    uuid = crypto.randomUUID();
    // Usage Cost
    let usageCost = (mwhUsage * (priceGas + priceDist)).toFixed(2);
    // Distribution Cost
    let distCost = (monthlyGas + monthlyDist).toFixed(2);
    let distCostXmonths = (numberOfMonths * distCost).toFixed(2);
    // Regulatory Cost
    let regulatoryCost = ((priceDist * mwhUsage) + (monthlyDist * numberOfMonths)).toFixed(2);
    // Company Cost
    let companyCost = ((priceGas * mwhUsage) + (monthlyGas * numberOfMonths)).toFixed(2);
    // Total Cost
    totalCost = ((mwhUsage * (priceGas + priceDist)) + (numberOfMonths * distCost)).toFixed(2);
    // Monthly advance
    advancePay = (totalCost / numberOfMonths).toFixed(2);
    

// Store values in local storage as Array
    // get existing array form storage
    gResults = getFromLocalStorage();
    // create new object
    const result = {
        uuid: uuid,
        company: company,
        contractDuration: contractDuration,
        usageRange: usageRange,
        m3Usage: m3Usage,
        mwhUsage: mwhUsage,
        numberOfMonths: numberOfMonths,
        regulatoryCost: regulatoryCost,
        companyCost: companyCost,
        usageCost: usageCost,
        distCost: distCost,
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
    const html ='<div id="result" style="display:block;" class="container mt-3 mb-3">'+
                    '<div class="row footer-background">'+
                        '<h4 class="text-primary text-center text-center mt-3 mb-3"><u>Celková Cena</u></h4>'+
                        '<div class="form-label text-center mb-3 col">'+
                            '<label for="total">Za ' + result.numberOfMonths + ' měsícu</label>'+
                            '<input type="number" class="form-control text-center" id="total" name="total" value="' + result.totalCost + '" disabled>'+
                        '</div>'+
                        '<div class="form-label text-center mb-3 col">'+
                            '<label for="totalMonth">Měsíčna Záloha</label>'+
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
                        '<div class="form-label text-center mb-3 col-6 col-lg">'+
                            '<label for="CostUsage">Obchodní Cena</label>'+
                            '<input type="number" class="form-control text-center" id="CostUsage" name="CostUsage" value="'+result.companyCost+'" disabled>'+ 
                        '</div>'+
                        '<div class="form-label text-center mb-3 col-6 col-lg">'+
                            '<label for="CostDist">Regulovaná Cena</label>'+
                            '<input type="number" class="form-control text-center" id="CostDist" name="CostDist" value="'+result.regulatoryCost+'" disabled>'+ 
                        '</div>'+
                        
                        '<div class="form-label text-center mb-3 col-6 col-lg">'+
                            '<label for="CostUsage">Uživatelská Cena</label>'+
                            '<input type="number" class="form-control text-center" id="CostUsage" name="CostUsage" value="'+result.usageCost+'" disabled>'+ 
                        '</div>'+
                        '<div class="form-label text-center mb-3 col-6 col-lg">'+
                            '<label for="CostDist">Distribucní Cena</label>'+
                            '<input type="number" class="form-control text-center" id="CostDist" name="CostDist" value="'+result.distCostXmonths+'" disabled>'+ 
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
                                '<th>Spotřeba MWh</th>'+
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
    const gIds = ['usage1', 'usage2', 'priceGas', 'monthlyGas', 'priceDist', 'monthlyDist'];
    changeInputDefaultValue(gIds);
});

//Conversion m3 to MWh and vice versa
function m3toMWh (){
    var m3 = getId('usage1').value;
    var mWh = Math.round(((m3 * 0.9968 * 0.0108987) + Number.EPSILON) * 1000) / 1000;
    getId('usage2').value = mWh;
};
function mWhtoM3 (){
    var mWh = getId('usage2').value;
    var m3 = Math.round(((mWh / 0.9968 / 0.0108987) + Number.EPSILON) * 10) / 10;
    getId('usage1').value = m3;
};

function clearStorage() {
    clearTable("gResults");
}