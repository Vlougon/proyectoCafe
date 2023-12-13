let usuariospordepartamento = []; //Tendremos que tener un lugar donde ir añadiendo los departamentos
const header = document.querySelector('#header');
const userNavbar = document.querySelector('#teachersNavbar ul');
const logoutForm = document.querySelector('#logoutForm');
const profileBox = document.querySelector('#profileBox');

/*
Con el sessionStorage necesito obtener el id del usuario

Necesito filtar los usuarios con el departamento igual al del jefe de departamento y que su 
schedule_status = send


Ahora tengo que implemetar la funcionalidad de los botones de finalizar y descartar 
denntro de la vista de teacherSheets

*/

// Con esto opotenemos datos del usuario que se logea, en concreto, necesitoamos obtener su id
const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;
let userData = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).data : null;

//Para que al cargar meta los usuarios
window.addEventListener('load', CargarUsuarios);

profileBox.addEventListener('click', displayLogout);
logoutForm.addEventListener('submit', logoutUser);

//Ahora procedemos ha hacer el FECHT  a nuestra base de datos
async function CargarUsuarios() {

    loadUserNavBarButtons();

    await fetch(location.origin + '/api/V1/users', {
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
        .then(datos => usuariospordepartamento = datos.data)


    CambiarTitulo();
    ComprobarDepartamentoID(usuariospordepartamento);

}

function CambiarTitulo() {
    header.textContent = `Departamento de ${userData.departamento_id.name}`;
}


//Queremos filtar por Departamento_id y si su schedule_status=send
function ComprobarDepartamentoID(usuariospordepartamento) {
    // console.log(userData.departamento_id); //&& user.schedule_status == 'send'
    for (let user of usuariospordepartamento) {
        if (user.departamento_id.id === userData.departamento_id.id && user.schedule_status === 'sent') {
            CrearCardUser(user);
        }
    }
}

function CrearCardUser(usuario) {

    // ---------------------------------------------
    // --------------- CARD PROFESOR ---------------
    // ---------------------------------------------

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
    especialidad.textContent = `Especialidad: ${usuario.especialidad_id.name}`;
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

    // ---------------------------------------------
    // --------------- CARD PROFESOR ---------------
    // ---------------------------------------------

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
    const liElement = document.createElement('li');
    const aElement = document.createElement('a');

    liElement.className = 'nav-item';
    aElement.className = 'nav-link';

    aElement.setAttribute('href', location.origin + '/teacherSheets');
    aElement.textContent = 'Mi Horario';

    liElement.insertAdjacentElement('beforeend', aElement);

    userNavbar.insertAdjacentElement('beforeend', liElement);

    document.querySelector('#teachersName').textContent = userData.name.charAt(0).toUpperCase() + userData.name.slice(1);
    document.querySelector('title').textContent += ' ' + userData.departamento_id.name;
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