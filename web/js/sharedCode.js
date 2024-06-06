// Get the checkbox and the button elements
const checkbox = document.getElementById('consent');
const button = document.getElementById('btnSubmit');
// Add an event listener to the checkbox to monitor its state
checkbox.addEventListener('change', function() {
  // Enable the button if the checkbox is checked, otherwise disable it
  button.disabled = !checkbox.checked;
});

// Iinput field onclick delete default value
document.addEventListener('DOMContentLoaded', (event) => {
    const inputField1 = getId('usage1');
    const inputField2 = getId('usage2');

    inputField1.addEventListener('focus', () => {
        if (inputField1.value === '0') {
            inputField1.value = '';
        }
    });
    inputField1.addEventListener('blur', () => {
        if (inputField1.value === '') {
            inputField1.value = '0';
        }
    });
    inputField2.addEventListener('focus', () => {
        if (inputField2.value === '0') {
            inputField2.value = '';
        }
    });
    inputField2.addEventListener('blur', () => {
        if (inputField2.value === '') {
            inputField2.value = '0';
        }
    });
});