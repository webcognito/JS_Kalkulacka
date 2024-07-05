// Get the checkbox and the button elements
const checkbox = getId('consent');
const button = getId('btnSubmit');
// Add an event listener to the checkbox to monitor its state
checkbox.addEventListener('change', function() {
  // Enable the button if the checkbox is checked, otherwise disable it
  button.disabled = !checkbox.checked;
});

// Button delete all Results and start new / id="btnClearTable"
function clearTable(item) {
  
  localStorage.removeItem(item);

   // Scroll to element
   scrollTo('form'); 
   getId('submit').style.display = "flex";
   getId('consent').checked = false;
   getId('btnSubmit').disabled = true;
   ids = ['result', 'detail', 'table'];
   displayHTML(ids, 'none');
};

function clearTableEQuick() {
  localStorage.removeItem("eResultsQuick");

   // Scroll to element
   scrollTo('form'); 
   getId('submit').style.display = "flex";
   getId('consent').checked = false;
   getId('btnSubmit').disabled = true;
   ids = ['result', 'detail', 'table'];
   displayHTML(ids, 'none');
};
