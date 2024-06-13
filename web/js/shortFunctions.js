// Functions to shorten js code

// Get element by Id
function getId(element) {
    const id = document.getElementById(element);
    return id;
};

// FormValue
function formValue(formId, inputId) {
    const value = getId(formId).elements[inputId].value;
    return value;
};

// Scroll to element
function scrollTo(element) {
    getId(element).scrollIntoView({behavior: 'smooth'});
};

// Style = display: attribute; ids in Array with given attribute
function displayHTML(array, attribute) {
    array.forEach(function(id) {
        getId(id).style.display = attribute;
    });
};

// Change input field default value='0' to blank and vic versa
function changeInputDefaultValue(array) {
    array.forEach(function(id) {
        const inputField = getId(id);
        inputField.addEventListener('focus', () => {
            if (inputField.value === '0') {
                inputField.value = '';
            }
        });
        inputField.addEventListener('blur', () => {
            if (inputField.value === '') {
                inputField.value = '0';
            }
        });
    });
};
