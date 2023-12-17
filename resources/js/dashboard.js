const users = [];
const teachersName = document.querySelector('#teachersName');
const logoutForm = document.querySelector('#logoutForm');
const profileBox = document.querySelector('#profileBox');
const backToScheduleButton = document.querySelector('#backToScheduleButton');

// Get loged user data and token
const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;
let userData = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).data : null;

profileBox.addEventListener('click', displayLogout);
logoutForm.addEventListener('submit', logoutUser);

window.addEventListener('load', loadMainData);


async function loadMainData() {
    await fetch(location.origin + '/api/V1/users', {
        method: "GET",
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
        .then(respuesta => respuesta.json())
        .then(datos => users.push(datos.data));

    // Give an URL to the back button
    backToScheduleButton.setAttribute('href', location.origin + '/teacherSheets');

    // Show User Name
    teachersName.textContent = userData.name.charAt(0).toUpperCase() + userData.name.slice(1);

    loadUserTableRows();
    loadButtonsDestinations();
}

function loadUserTableRows() {
    const retrivedUsers = users.flat();

    for (const user of retrivedUsers) {
        const tableRow = document.createElement('tr');
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const rolCell = document.createElement('td');
        const specialCell = document.createElement('td');
        const departmentCell = document.createElement('td');
        const editCell = document.createElement('td');
        const deleteCell = document.createElement('td');
        const editLink = document.createElement('a');
        const deleteButton = document.createElement('button');

        nameCell.textContent = user.name.charAt(0).toUpperCase() + user.name.slice(1);
        nameCell.className = 'align-middle';

        emailCell.textContent = user.email;
        emailCell.className = 'align-middle';

        rolCell.textContent = user.rol;
        rolCell.className = 'align-middle';

        specialCell.textContent = user.especialidad_id.name;
        specialCell.className = 'align-middle';

        departmentCell.textContent = user.departamento_id.name;
        departmentCell.className = 'align-middle';

        editLink.textContent = 'Editar';
        editLink.className = 'btn btn-success';
        editLink.setAttribute('href', location.origin + '/userForm/' + user.id);

        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'btn btn-danger';
        deleteButton.setAttribute('name', user.id);
        deleteButton.setAttribute('title', 'users');
        deleteButton.setAttribute('id', 'user' + user.id);
        deleteButton.addEventListener('click', removeRow);

        editCell.insertAdjacentElement('beforeend', editLink);
        editCell.className = 'align-middle';

        deleteCell.insertAdjacentElement('beforeend', deleteButton);
        deleteCell.className = 'align-middle';

        tableRow.insertAdjacentElement('beforeend', nameCell);
        tableRow.insertAdjacentElement('beforeend', emailCell);
        tableRow.insertAdjacentElement('beforeend', rolCell);
        tableRow.insertAdjacentElement('beforeend', specialCell);
        tableRow.insertAdjacentElement('beforeend', departmentCell);
        tableRow.insertAdjacentElement('beforeend', editCell);
        tableRow.insertAdjacentElement('beforeend', deleteCell);

        document.querySelector('#usersTableBody').insertAdjacentElement('beforeend', tableRow);
    }
}

function loadButtonsDestinations() {
    document.querySelector('#createUserButton').setAttribute('href', location.origin + '/userForm')
}

function removeRow(target) {
    const fromTable = target.srcElement.getAttribute('title');
    const id = target.srcElement.getAttribute('name');

    switch (fromTable) {
        case 'users':
            removeUser(id);
            break;

        default:
            break;
    }
}



/* ################################################################################################################################ */
/* ################################################### FETCH/REDIRECT FUNCTIONS ################################################### */
/* ################################################################################################################################ */
async function removeUser(id) {
    let status = '';

    await fetch(location.origin + '/api/V1/users/' + id, {
        method: "DELETE",
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
        .then(respuesta => respuesta.json())
        .then(datos => status = datos.status);

    // Depending on the status given, we choose what tho do
    if (status === 'success') {
        document.querySelector('#user' + id).parentElement.parentElement.remove();
        generateFeedBack('success', '¡Se ha aliminado correctamente el usuairo!');
    } else {
        generateFeedBack('danger', '¡No se ha podido eliminar al usuairo!');
    }
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