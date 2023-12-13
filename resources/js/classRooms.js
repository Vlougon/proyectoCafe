const userNavbar = document.querySelector('#teachersNavbar ul');
const logoutForm = document.querySelector('#logoutForm');
const profileBox = document.querySelector('#profileBox');

const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;
let userData = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).data : null;

window.addEventListener('load', loadUserNavBarButtons);

profileBox.addEventListener('click', displayLogout);
logoutForm.addEventListener('submit', logoutUser);

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