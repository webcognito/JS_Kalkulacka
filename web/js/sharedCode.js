// Get the checkbox and the button elements
const checkbox = getId('consent');
const button = getId('btnSubmit');
// Add an event listener to the checkbox to monitor its state
checkbox.addEventListener('change', function() {
  // Enable the button if the checkbox is checked, otherwise disable it
  button.disabled = !checkbox.checked;
});
