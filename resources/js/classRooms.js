const classrooms = [];
const userNavbar = document.querySelector('#teachersNavbar ul');
const logoutForm = document.querySelector('#logoutForm');
const profileBox = document.querySelector('#profileBox');
const morningTable = document.querySelector('#morningBody');
const eveningTable = document.querySelector('#eveningBody');

const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;
let userData = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).data : null;

window.addEventListener('load', loadClassroomsLoad);

profileBox.addEventListener('click', displayLogout);
logoutForm.addEventListener('submit', logoutUser);

async function loadClassroomsLoad() {
    loadUserNavBarButtons();

    await fetch(location.origin + '/api/V1/cargahorariaaulas', {
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
        .then(datos => datos.data.map(classroom => classrooms.push(classroom)));

    showTime();
}

function showTime() {
    if (classrooms.length >= 1) {
        for (const classr of classrooms) {

            const tableRow = document.createElement('tr');
            const classroomCell = document.createElement('td');
            const scheduleLoadCell = document.createElement('td');
            const turnCell = document.createElement('td');
            const limitCell = document.createElement('td');

            classroomCell.textContent = classr.name;
            classroomCell.setAttribute('scope', 'row');
            scheduleLoadCell.textContent = classr.scheudleLoad;
            turnCell.textContent = classr.turn;

            if (parseInt(classr.scheudleLoad) === 30) {
                limitCell.className = 'table-warning inRangeHours limitCell';
                limitCell.textContent = '\u2713';

            } else if (parseInt(classr.scheudleLoad) < 30) {
                limitCell.className = 'table-success idealHours limitCell';
                limitCell.textContent = '\u2713';

            } else {

                limitCell.className = 'table-danger undesideredHours limitCell';
                limitCell.textContent = 'X';
            }

            tableRow.insertAdjacentElement('beforeend', classroomCell);
            tableRow.insertAdjacentElement('beforeend', scheduleLoadCell);
            tableRow.insertAdjacentElement('beforeend', turnCell);
            tableRow.insertAdjacentElement('beforeend', limitCell);

            if (classr.turn === 'M') {
                morningTable.insertAdjacentElement('beforeend', tableRow);
            } else {
                eveningTable.insertAdjacentElement('beforeend', tableRow);
            }

        }
    }
}

function loadUserNavBarButtons() {
    const liSchedule = document.createElement('li');
    const liDepartments = document.createElement('li');
    const aSchedule = document.createElement('a');
    const aDepartments = document.createElement('a');

    liSchedule.className = 'nav-item';
    liDepartments.className = 'nav-item';
    aSchedule.className = 'nav-link';
    aDepartments.className = 'nav-link';

    aSchedule.setAttribute('href', location.origin + '/teacherSheets');
    aDepartments.setAttribute('href', location.origin + '/studyManager');
    aSchedule.textContent = 'Mi Horario';
    aDepartments.textContent = 'Ver Departamentos';

    liSchedule.insertAdjacentElement('beforeend', aSchedule);
    liDepartments.insertAdjacentElement('beforeend', aDepartments);

    userNavbar.insertAdjacentElement('beforeend', liSchedule);
    userNavbar.insertAdjacentElement('beforeend', liDepartments);

    document.querySelector('#teachersName').textContent = userData.name.charAt(0).toUpperCase() + userData.name.slice(1);
}

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