let usuariospordepartamento = [];
let currentDepartment = 0;
const header = document.querySelector('#header');
const userNavbar = document.querySelector('#teachersNavbar ul');
const logoutForm = document.querySelector('#logoutForm');
const profileBox = document.querySelector('#profileBox');
const finishSchedules = document.querySelector('#finishSchedules');

// Get loged user data and token
const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;
let userData = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).data : null;

window.addEventListener('load', CargarUsuarios);
window.addEventListener('keyup', readSelectedElement);

profileBox.addEventListener('click', displayLogout);
logoutForm.addEventListener('submit', logoutUser);

async function CargarUsuarios() {

    // Depending on the URL, we see which department ID we use
    if (!isNaN(parseInt(location.href.charAt(location.href.length - 1)))) {
        currentDepartment = parseInt(location.href.charAt(location.href.length - 1));
    } else {
        currentDepartment = userData.departamento_id.id;
    }

    // Fetch to get all the user by the specified department
    await fetch(location.origin + '/api/V1/departamento/' + currentDepartment, {
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
        .then((datos) => {
            usuariospordepartamento = datos.data;
            currentDepartment = datos.departamento;
        })

    loadUserNavBarButtons();
    CambiarTitulo();
    checkDepartments();
}

function CambiarTitulo() {
    header.textContent = `Departamento de ${currentDepartment[0].name}`;

    // If the user is not a study manager, if it is a head of department, we show the finalize all button
    if (isNaN(parseInt(location.href.charAt(location.href.length - 1)))) {
        const finishButton = document.createElement('button');

        finishButton.setAttribute('id', 'finishSchedules');
        finishButton.setAttribute('type', 'button');
        finishButton.className = 'btn btn-dark';
        finishButton.textContent = 'Finalizar Departamentos';

        document.querySelector('#finishBox').insertAdjacentElement('beforeend', finishButton);
    }
}


function checkDepartments() {
    // We check if there are any schedule sent for revision, to know what to show
    if (usuariospordepartamento.length < 1) {
        const noFoundText = document.createElement('h1');

        noFoundText.textContent = '¡No se ha encontrado ningún horario! \uD83D\uDCCE';

        document.querySelector('#departmentContainer').insertAdjacentElement('beforeend', noFoundText);
    } else {
        CardsForUsers();
    }
}


function CardsForUsers() {
    // For each user retrieved we create a card for him
    for (let user of usuariospordepartamento) {
        CrearCardUser(user);
    }
}


function CrearCardUser(usuario) {

    // ----------------------------------------------------
    // --------------- CREATE CARD PROFESOR ---------------
    // ----------------------------------------------------

    const col = document.createElement("div");
    col.classList.add("col-10", "col-md-5", "departmentCard");

    const cardRow = document.createElement("div");
    cardRow.classList.add("row");

    const dataBox = document.createElement("div");
    dataBox.classList.add("col-12", "col-sm-10");

    const buttonBox = document.createElement("div");
    buttonBox.classList.add("col-12", "col-sm-2", "d-sm-flex", "align-items-center", "justify-content-end");

    const img = document.createElement("img");
    img.src = `${location.origin}/images/defaultUserIcon.png`;
    img.alt = `Icono de Perfil del Profesor: ${usuario.name}`;

    const cardTitle = document.createElement("h5");
    cardTitle.textContent = `Profesor: ${usuario.name.charAt(0).toUpperCase() + usuario.name.slice(1)}`;

    const especialidad = document.createElement("p");
    especialidad.textContent = `Especialidad: ${usuario.nombre_especialidad}`;
    const horas = document.createElement("p");
    horas.textContent = `Horas Totales: ${usuario.total_hours}`;

    if (parseInt(usuario.total_hours) === 18) {
        horas.classList.add('idealHours');
        col.classList.add('idealBox');
    } else if (parseInt(usuario.total_hours) >= 16 && parseInt(usuario.total_hours) <= 20) {
        horas.classList.add('inRangeHours');
        col.classList.add('inRangeBox');
    } else {
        horas.classList.add('undesideredHours');
        col.classList.add('undesiredBox');
    }

    const enlace = document.createElement("a");
    enlace.setAttribute('href', location.origin + '/teacherSheets/' + usuario.id);
    enlace.classList.add("btn", "btn-primary", "mt-2", "mt-md-0", 'align-middle');
    enlace.textContent = "Ver";

    // --------------------------------------------------
    // --------------- SHOW CARD PROFESOR ---------------
    // --------------------------------------------------

    dataBox.insertAdjacentElement('beforeend', img);
    dataBox.insertAdjacentElement('beforeend', cardTitle);
    dataBox.insertAdjacentElement('beforeend', especialidad);
    dataBox.insertAdjacentElement('beforeend', horas);
    buttonBox.insertAdjacentElement('beforeend', enlace);

    cardRow.insertAdjacentElement('beforeend', dataBox);
    cardRow.insertAdjacentElement('beforeend', buttonBox);
    col.insertAdjacentElement('beforeend', cardRow);

    departmentContainer.insertAdjacentElement('beforeend', col);
}

function loadUserNavBarButtons() {
    // We create and show the respective navbar buttons needed for the user
    const liElement = document.createElement('li');
    const aElement = document.createElement('a');

    liElement.className = 'nav-item';
    aElement.className = 'nav-link';

    aElement.setAttribute('href', location.origin + '/teacherSheets');
    aElement.textContent = 'Mi Horario';

    liElement.insertAdjacentElement('beforeend', aElement);

    userNavbar.insertAdjacentElement('beforeend', liElement);

    document.querySelector('#teachersName').textContent = userData.name.charAt(0).toUpperCase() + userData.name.slice(1);
    document.querySelector('title').textContent += ' ' + currentDepartment[0].name;

    // If the study manager teacher is looking into the departments, we give him an extra button to go back
    if (!isNaN(location.href.charAt(location.href.length - 1))) {
        const departamentElement = document.createElement('li');
        const linkElement = document.createElement('a');

        departamentElement.className = 'nav-item';
        linkElement.className = 'nav-link';

        linkElement.setAttribute('href', location.origin + '/studyManager');
        linkElement.textContent = 'Jefatura';

        departamentElement.insertAdjacentElement('beforeend', linkElement);

        userNavbar.insertAdjacentElement('beforeend', departamentElement);

        document.querySelector('#teachersName').textContent = userData.name.charAt(0).toUpperCase() + userData.name.slice(1);
    }
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
                message.text += document.activeElement.getAttribute('value');
                break;

            case 'BUTTON':
                message.text += document.activeElement.textContent;
                break;

            default:
                message.text += document.activeElement.textContent;

                if (document.activeElement.classList.contains('btn')) {
                    const professorName = document.activeElement.parentElement.previousElementSibling.querySelector('h5').textContent.split(' ')[1];
                    const totalHoursText = document.activeElement.parentElement.previousElementSibling.querySelectorAll('p')[1].textContent;
                    const totalHours = totalHoursText.charAt(totalHoursText.length - 1);

                    message.text += ' Horario de ' + professorName + '...';
                    message.text += 'Quien tiene un total de ' + totalHours + ' horas asignadas.'
                }

                break;
        }

        window.speechSynthesis.speak(message);
    }
}