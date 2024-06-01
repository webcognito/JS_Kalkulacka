// Gas Page Button Functions

// Button new Calculation
function newCalc(){
    // Scroll to element
    scrollTo('gForm');
    // Show and Hidde HTML Sections
    getId('submit').style.display = "flex";
    getId('consent').checked = false;
    getId('btnSubmit').disabled = true;
    ids = ['result', 'detail', 'gTable'];
    displayHTML(ids, 'none');
};

// Button display Details
function showDetail() {
    getId('detail').style.display = "block";
    displayHTML(['buttonsQuickResult'], 'none');
    scrollTo('detail');
};

// Button display Comparison Table
function showTable() {
    getId('gTable').style.display = "block";
    const ids = ['btnCompDetail', 'btnNewCalc1', 'btnComp', 'btnNewCalc2'];
    displayHTML(ids, 'none');
    scrollTo('gTable');
};

// Button delete all Results and start new
function clearGTable(gResults) {
    localStorage.clear(gResults);

     // Scroll to element
     scrollTo('gForm'); 
     getId('submit').style.display = "flex";
     getId('consent').checked = false;
     getId('btnSubmit').disabled = true;
     ids = ['result', 'detail', 'gTable'];
     displayHTML(ids, 'none');
};