// Functions to shorten js code

// FormValue
function formValue(formId, inputId) {
    const value = document.getElementById(formId).elements[inputId].value;
    return value;
};
// Scroll to element
function scrollTo(element) {
    document.getElementById(element).scrollIntoView({behavior: 'smooth'});
};
// Get element by Id
function getId(element) {
    const id = document.getElementById(element);
    return id;
};
// Style = display: attribute; ids in Array with given attribute
function displayHTML(array, attribute) {
    array.forEach(function(id) {
        document.getElementById(id).style.display = attribute;
    });
};