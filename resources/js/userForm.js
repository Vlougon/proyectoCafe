const user = [];
const teachersName = document.querySelector('#teachersName');
const logoutForm = document.querySelector('#logoutForm');
const profileBox = document.querySelector('#profileBox');
const backToScheduleButton = document.querySelector('#backToScheduleButton');
const submitButton = document.querySelector('#submitButton');

// Get loged user data and token
const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;
let userData = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).data : null;

profileBox.addEventListener('click', displayLogout);
logoutForm.addEventListener('submit', logoutUser);

window.addEventListener('load', loadMainData);


async function loadMainData() {

    if (Number.isInteger(parseInt(location.href.split('/').pop()))) {
        submitButton.textContent = 'Actualizar Profesor';
        getUserData();
        submitButton.addEventListener('click', updateUser);
    } else {
        submitButton.textContent = 'Crear Profesor';
        submitButton.addEventListener('click', createUser);
    }

    // Give an URL to the back button
    backToScheduleButton.setAttribute('href', location.origin + '/dashboard');

    // Show User Name
    teachersName.textContent = userData.name.charAt(0).toUpperCase() + userData.name.slice(1);
}


function showUserData() {
    const userGot = user.flat();

    document.querySelector('#name').value = userGot[0].name;
    document.querySelector('#email').value = userGot[0].email;
    document.querySelector('#rol').value = userGot[0].rol;
    document.querySelector('#especialidad_id').value = userGot[0].especialidad_id.id;
    document.querySelector('#departamento_id').value = userGot[0].departamento_id.id;
}



/* ################################################################################################################################ */
/* ################################################### FETCH/REDIRECT FUNCTIONS ################################################### */
/* ################################################################################################################################ */
async function getUserData() {
    await fetch(location.origin + '/api/V1/users/' + parseInt(location.href.split('/').pop()), {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
    })
        .then(respuesta => respuesta.json())
        .then(datos => user.push(datos.data));
    showUserData();
}


async function updateUser(target) {
    target.preventDefault();

    if (document.querySelector('#name').value && document.querySelector('#email').value &&
        document.querySelector('#rol').value && document.querySelector('#especialidad_id').value &&
        document.querySelector('#departamento_id').value && document.querySelector('#password').value &&
        !document.querySelector('#password').value.match(/^[\s]*$/)) {

        let data = {
            'name': document.querySelector('#name').value,
            'email': document.querySelector('#email').value,
            'password': document.querySelector('#password').value,
            'rol': document.querySelector('#rol').value,
            'especialidad_id': document.querySelector('#especialidad_id').value,
            'departamento_id': document.querySelector('#departamento_id').value,
        };

        let formBody = [];
        for (const property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        };
        formBody = formBody.join("&");

        await fetch(location.origin + '/api/V1/users/' + parseInt(location.href.split('/').pop()), {
            method: "PUT",
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: formBody,
        })
            .then(respuesta => respuesta.json())
            .then((datos) => {

                if (datos.status === 'success') {
                    generateFeedBack(datos.status, datos.message);
                } else {
                    generateFeedBack('danger', '¡No se pudo crear el Profesor!');
                }
            });

    } else {
        generateFeedBack('danger', '¡Se deben rellenar todos los campos!');
    }
}


async function createUser(target) {
    target.preventDefault();

    await fetch(location.origin + '/api/V1/users', {
        method: "POST",
        headers: {
            'Authorization': "Bearer " + token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value,
            rol: document.querySelector('#rol').value,
            especialidad_id: document.querySelector('#especialidad_id').value,
            departamento_id: document.querySelector('#departamento_id').value,
        }),
    })
        .then(respuesta => respuesta.json())
        .then((datos) => {

            if (datos.status === 'success') {
                generateFeedBack(datos.status, datos.message);
            } else {
                generateFeedBack('danger', '¡No se pudo crear el Profesor!');
            }
        });
}



/* ###################################################################################################################### */
/* ################################################### FLASH MESSAGES ################################################### */
/* ###################################################################################################################### */
function generateFeedBack(status, message) {
    const messageContainer = document.createElement('div');
    const messageText = document.createElement('strong');
    const closeButton = document.createElement('button');

    messageContainer.className = `alert alert-${status} alert-dismissible fade show position-absolute`;
    messageContainer.setAttribute('role', 'alert');

    messageText.textContent = message;

    closeButton.className = 'btn-close';
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('data-bs-dismiss', 'alert');
    closeButton.setAttribute('aria-label', 'Close');

    messageContainer.insertAdjacentElement('beforeend', messageText);
    messageContainer.insertAdjacentElement('beforeend', closeButton);

    document.querySelector('main').insertAdjacentElement('beforeend', messageContainer);
}



/* ######################################################################################################################## */
/* ################################################### LOGOUT FUNCTIONS ################################################### */
/* ######################################################################################################################## */
function logoutUser(event) {
    event.preventDefault();

    fetch(location.origin + '/api/logout', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    })
        .then((respuesta) => respuesta.status === 200 ? respuesta.json() : '')
        .then((datos) => {

            // Check if the user was able to login
            if (datos.status === "success") {

                // Remove the User Data and Token from the sessionStorage
                sessionStorage.removeItem('user');

                // Submit to logout the user
                logoutForm.submit();
            }
        });
}


function displayLogout() {
    if (document.querySelector('#logoutForm').className === 'blindfolded') {
        document.querySelector('#logoutForm').className = 'showed';
    } else {
        document.querySelector('#logoutForm').className = 'blindfolded';
    }
}