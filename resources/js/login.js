let professorLogInForm = document.querySelector("#professorsForm");

window.addEventListener('load', setFormAction);
window.addEventListener('keyup', readSelectedElement);

professorLogInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let profesorEmail = document.querySelector("#email");
    let professorPassword = document.querySelector("#password");

    if (profesorEmail && professorPassword) {
        redirectToTeachersView(profesorEmail.value, professorPassword.value);
    } else {
        window.alert('¡Falta uno o varios campos del Formulario!');
        location.reload();
    }
});



function redirectToTeachersView(profesorEmail, professorPassword) {
    fetch(location.origin + '/api/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: profesorEmail,
            password: professorPassword,
        }),
    })
        .then((respuesta) => respuesta.status === 200 ? respuesta.json() : '')
        .then((datos) => {

            // Check if the user was able to login
            if (datos.status === "success") {

                // Get both the user data and it's token
                const token = datos.data.token;
                const data = datos.data.user;
                const user = { 'token': token, 'data': data };

                // Store User Data and Token
                sessionStorage.setItem('user', JSON.stringify(user));

                // Submit to login the user and sent him to the teacher's view
                professorLogInForm.submit();
            }
        })
}

function setFormAction() {
    professorLogInForm.setAttribute('action', location.origin + '/login');
}



/* ############################################################################################################################### */
/* ################################################### ACCESSIBILITY FUNCTIONS ################################################### */
/* ############################################################################################################################### */
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