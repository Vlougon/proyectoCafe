const userNavbar = document.querySelector('#teachersNavbar ul');
console.log('Hola');

window.addEventListener('load', loadUserNavBarButtons);

function loadUserNavBarButtons() {
    const liSchedule = document.createElement('li');
    const liClassrooms = document.createElement('li');
    const aSchedule = document.createElement('a');
    const aClassrooms = document.createElement('a');

    liSchedule.className = 'nav-item';
    liClassrooms.className = 'nav-item';
    aSchedule.className = 'nav-link';
    aClassrooms.className = 'nav-link';

    aSchedule.setAttribute('href', location.origin + '/teacherSheets');
    aClassrooms.setAttribute('href', '#');
    aSchedule.textContent = 'Mi Horario';
    aClassrooms.textContent = 'Ver Aulas';

    liSchedule.insertAdjacentElement('beforeend', aSchedule);
    liClassrooms.insertAdjacentElement('beforeend', aClassrooms);

    userNavbar.insertAdjacentElement('beforeend', liSchedule);
    userNavbar.insertAdjacentElement('beforeend', liClassrooms);
}