// Gas Page Button Functions

// Button new Calculation / id="btnNewCalc1" & id="btnNewCalc2" 
function newCalc(){
    // Scroll to element
    scrollTo('form');
    // Show and Hidde HTML Sections
    getId('submit').style.display = "flex";
    getId('consent').checked = false;
    getId('btnSubmit').disabled = true;
    ids = ['result', 'detail', 'table'];
    displayHTML(ids, 'none');
};

// Button display Details / id="btnDetail"
function showDetail() {
    getId('detail').style.display = "block";
    displayHTML(['buttonsQuickResult'], 'none');
    scrollTo('detail');
};

// Button display Comparison Table / id="btnComp" & id="btnCompDetail"
function showTable() {
    getId('table').style.display = "block";
    const ids = ['btnCompDetail', 'btnNewCalc1', 'btnComp', 'btnNewCalc2'];
    displayHTML(ids, 'none');
    scrollTo('table');
};
function showTableQuick() {
    getId('table').style.display = "block";
    const ids = ['btnComp', 'btnNewCalc1'];
    displayHTML(ids, 'none');
    scrollTo('table');
};

/*
// Button delete all Results and start new / id="btnClearTable"
function clearTable(array) {
    localStorage.clear(array);

     // Scroll to element
     scrollTo('form'); 
     getId('submit').style.display = "flex";
     getId('consent').checked = false;
     getId('btnSubmit').disabled = true;
     ids = ['result', 'detail', 'table'];
     displayHTML(ids, 'none');
};
*/