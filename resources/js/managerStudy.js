let departamentos = [];
const userNavbar = document.querySelector('#teachersNavbar ul');
const logoutForm = document.querySelector('#logoutForm');
const profileBox = document.querySelector('#profileBox');

// Get loged user data and token
const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;
let userData = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).data : null;

window.addEventListener('load', loadDepartments);
window.addEventListener('keyup', readSelectedElement);

profileBox.addEventListener('click', displayLogout);
logoutForm.addEventListener('submit', logoutUser);

async function loadDepartments() {

    loadUserNavBarButtons();

    // Fetch to retrieve all the departments
    await fetch(location.origin + '/api/V1/departamentos', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
        .then(respuesta => respuesta.json())
        .then(datos => departamentos = datos.data)

    showDepartmentCards();
}

function showDepartmentCards() {
    // For each department stores, we create and show the data of each of them
    for (const department of departamentos) {
        const departmentCard = document.createElement('div');
        const responsiveBox = document.createElement('div');
        const nameBox = document.createElement('div');
        const departmentName = document.createElement('h2');
        const linkToDepartment = document.createElement('a');

        departmentCard.className = 'departmentCard';
        responsiveBox.className = 'd-block d-sm-flex justify-content-between';
        departmentName.textContent = department.name;
        linkToDepartment.setAttribute('href', location.origin + '/departament/' + department.id);
        linkToDepartment.className = 'btn btn-primary';
        linkToDepartment.textContent = 'Ver';

        nameBox.insertAdjacentElement('beforeend', departmentName);

        responsiveBox.insertAdjacentElement('beforeend', nameBox);
        responsiveBox.insertAdjacentElement('beforeend', linkToDepartment);

        departmentCard.insertAdjacentElement('beforeend', responsiveBox);

        document.querySelector('#container h1').insertAdjacentElement('afterend', departmentCard);
    }
}

function loadUserNavBarButtons() {
    // We create and give attributes and content to the Navbar buttons
    const liSchedule = document.createElement('li');
    const liClassrooms = document.createElement('li');
    const aSchedule = document.createElement('a');
    const aClassrooms = document.createElement('a');

    liSchedule.className = 'nav-item';
    liClassrooms.className = 'nav-item';
    aSchedule.className = 'nav-link';
    aClassrooms.className = 'nav-link';

    aSchedule.setAttribute('href', location.origin + '/teacherSheets');
    aClassrooms.setAttribute('href', location.origin + '/classrooms');
    aSchedule.textContent = 'Mi Horario';
    aClassrooms.textContent = 'Ver Aulas';

    liSchedule.insertAdjacentElement('beforeend', aSchedule);
    liClassrooms.insertAdjacentElement('beforeend', aClassrooms);

    userNavbar.insertAdjacentElement('beforeend', liSchedule);
    userNavbar.insertAdjacentElement('beforeend', liClassrooms);

    document.querySelector('#teachersName').textContent = userData.name.charAt(0).toUpperCase() + userData.name.slice(1);
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
                message.text += document.activeElement.value;
                break;

            default:

                if (document.activeElement.classList.contains('btn')) {
                    message.text += 'Ver departamento de ' + document.activeElement.previousElementSibling.querySelector('h2').textContent;
                } else {
                    message.text += document.activeElement.textContent;
                }

                break;
        }

        window.speechSynthesis.speak(message);
    }
}