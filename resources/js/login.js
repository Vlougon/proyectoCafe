let professorLogInForm = document.querySelector("#professorsForm");
let professorNameInput = document.querySelector("#professorName");
let professorPasswordInput = document.querySelector("#professorPassword");

window.addEventListener('keyup', readSelectedElement);

professorNameInput.addEventListener('input', checkInput);
professorPasswordInput.addEventListener('input', checkInput);

professorLogInForm.addEventListener("submit", (event) => {

    let validInputContorler = 0;
    professorNameInput = document.querySelector("#professorName");
    professorPasswordInput = document.querySelector('#professorPassword');


    if (!professorNameInput || professorNameInput.value.match(/^[\s]*$|\s$/) ||
        professorNameInput.value.match(/^[0-9]/i) && !professorNameInput.value.match(/^[0-9]{8}[A-Z]$/i)) {

        if (professorNameInput != null) {
            createErrorNameText();
        }

    } else {

        deleteErrorNameText();
        validInputContorler++;
    }

    if (!professorPasswordInput || !professorPasswordInput.value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{10,}$/)) {

        if (professorPasswordInput != null) {
            createErrorPasswordText();
        }

    } else {

        deleteErrorPasswordText();
        validInputContorler++;
    }

    if (validInputContorler != 2) {
        event.preventDefault();
    }
});



/* ################################################################################################################################ */
/* ################################################### FORM VALIDATOR FUNCTIONS ################################################### */
/* ################################################################################################################################ */
function checkInput(event) {
    switch (event.target.getAttribute('id')) {
        case "professorName":

            if (!event.target.value.match(/(^[\s]*$)|\s$/) && !professorNameInput.value.match(/^[0-9]/i) || professorNameInput.value.match(/^[0-9]{8}[A-Z]$/i)) {

                validateInput(event.target);
                deleteErrorNameText();

            } else {

                invalidateInput(event.target);
            }

            break;

        case "professorPassword":

            if (event.target.value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{10,}$/)) {

                validateInput(event.target);
                deleteErrorPasswordText();

            } else {

                invalidateInput(event.target);
            }

            break;

        default:
            window.alert("Error inesperado");
            break;
    }
}


function createErrorNameText() {
    let nameMissInputParraf = document.createElement('p');
    nameMissInputParraf.setAttribute('id', 'missInputName');
    nameMissInputParraf.classList.add("missInputText");
    nameMissInputParraf.textContent = "Asegúrese de Introducir un nombre de Usuario, un NIF/CIE o CIAL válido, sin espacios al principio o al final.";

    if (!professorLogInForm.querySelector('#missInputName')) {
        professorNameInput.insertAdjacentElement('afterend', nameMissInputParraf);
    }
}


function deleteErrorNameText() {
    if (professorLogInForm.querySelector('#missInputName') && professorNameInput.classList[0] == "validInput") {
        professorLogInForm.querySelector('#missInputName').remove();
    }
}


function createErrorPasswordText() {
    let passwordMissInputParraf = document.createElement('p');
    passwordMissInputParraf.setAttribute('id', 'missInputPassword');
    passwordMissInputParraf.classList.add("missInputText");
    passwordMissInputParraf.textContent = "La contraseña debe ser igual a la que se le asignó";

    if (!professorLogInForm.querySelector('#missInputPassword')) {
        professorPasswordInput.insertAdjacentElement('afterend', passwordMissInputParraf);
    }
}


function deleteErrorPasswordText() {
    if (professorLogInForm.querySelector('#missInputPassword') && professorPasswordInput.classList[0] == "validInput") {
        professorLogInForm.querySelector('#missInputPassword').remove();
    }
}


function validateInput(element) {
    if (element.classList.length > 0) {

        element.classList.replace(element.classList[0], "validInput");

    } else {

        element.classList.add("validInput");
    }
}


function invalidateInput(element) {
    if (element.classList.length > 0) {

        element.classList.replace(element.classList[0], "invalidInput");

    } else {

        element.classList.add("invalidInput");
    }
}



/* ################################################################################################################################ */
/* ################################################### ACCESSIBILITY FUNCTIONS ################################################### */
/* ################################################################################################################################ */
function readSelectedElement(event) {
    if (event.key === 'Tab') {
        window.speechSynthesis.cancel();

        let message = new SpeechSynthesisUtterance();

        message.lang = 'es-ES';

        switch (document.activeElement.tagName) {
            case 'INPUT':
                message.text += 'Formulario de Inicio de Sesión. Introduzca su ' + document.activeElement.getAttribute('placeholder');
                break;

            case 'BUTTON':
                message.text += document.activeElement.getAttribute('name');
                break;

            default:
                message.text += document.activeElement.textContent;
                break;
        }

        window.speechSynthesis.speak(message);
    }
}