let professorLogInForm = document.querySelector("#professorsForm");
let professorNameInput = document.querySelector("#email");
let professorPasswordInput = document.querySelector("#password");

window.addEventListener('keyup', readSelectedElement);

professorNameInput.addEventListener('input', checkInput);
professorPasswordInput.addEventListener('input', checkInput);

professorLogInForm.addEventListener("submit", (event) => {

    let validInputContorler = 0;
    professorNameInput = document.querySelector("#email");
    professorPasswordInput = document.querySelector('#password');


    if (!professorNameInput || professorNameInput.value.match(/^[\s]*$|\s$/) ||
        professorNameInput.value.match(/^[0-9]/i) && !professorNameInput.value.match(/^[0-9]{8}[A-Z]$/i)) {

        if (professorNameInput != null) {
            createErrorNameText();
        }

    } else {

        deleteErrorNameText();
        validInputContorler++;
    }

    if (!professorPasswordInput || !professorPasswordInput.value.match(/^(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{8,}$/)) {

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


/*
// En el login.blade.php
// Añadir un evento submit al formulario
document.getElementById("professorsForm").addEventListener("submit", function(event) {
  // Prevenir el comportamiento por defecto del formulario
  event.preventDefault();
  // Obtener los valores de los inputs
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  // Enviar una petición POST usando fetch
  fetch("http://proyectocafe.test/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Comprobar si la respuesta es exitosa
      if (data.status === "success") {
        // Obtener el token de la respuesta
        let token = data.data.token;
        // Redirigir a la vista usando el token como parámetro
        window.location.href = "http://proyectocafe.test/teacherSheets?token=" + token;
      } else {
        // Mostrar un mensaje de error
        alert(data.message);
      }
    })
    .catch((error) => {
      // Manejar el error
      console.error(error);
    });
});
*/



/* ################################################################################################################################ */
/* ################################################### FORM VALIDATOR FUNCTIONS ################################################### */
/* ################################################################################################################################ */
function checkInput(event) {
    switch (event.target.getAttribute('id')) {
        case "email":

            if (!event.target.value.match(/(^[\s]*$)|\s$/) && !professorNameInput.value.match(/^[0-9]/i) || professorNameInput.value.match(/^[0-9]{8}[A-Z]$/i)) {

                validateInput(event.target);
                deleteErrorNameText();

            } else {

                invalidateInput(event.target);
            }

            break;

        case "password":

            if (event.target.value.match(/^(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{8,}$/)) {

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
    nameMissInputParraf.textContent = "Asegúrese de Introducir un name de Usuario, un NIF/CIE o CIAL válido, sin espacios al principio o al final.";

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