let usuariospordepartamento = []; //Tendremos que tener un lugar donde ir añadiendo los departamentos
let currentDepartment = 0;
const header = document.querySelector('#header');
const userNavbar = document.querySelector('#teachersNavbar ul');
const logoutForm = document.querySelector('#logoutForm');
const profileBox = document.querySelector('#profileBox');
const finishSchedules = document.querySelector('#finishSchedules');

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
window.addEventListener('keyup', readSelectedElement);

profileBox.addEventListener('click', displayLogout);
logoutForm.addEventListener('submit', logoutUser);

//Ahora procedemos ha hacer el FECHT  a nuestra base de datos
async function CargarUsuarios() {

    if (!isNaN(parseInt(location.href.charAt(location.href.length - 1)))) {
        await fetch(location.origin + '/api/V1/departamentos/' + parseInt(location.href.charAt(location.href.length - 1)), {
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
            .then(datos => currentDepartment = datos.data)
    } else {
        currentDepartment = userData.departamento_id;
    }

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
    checkDepartments();
}

function CambiarTitulo() {
    header.textContent = `Departamento de ${currentDepartment.name}`;

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
    const numberOfDepartments = document.querySelectorAll('#departmentContainer div').length;

    if (numberOfDepartments < 1) {
        const noFoundText = document.createElement('h1');

        noFoundText.textContent = '¡No se ha encontrado ningún horario! \uD83D\uDCCE';

        document.querySelector('#departmentContainer').insertAdjacentElement('beforeend', noFoundText);
    }
}


//Queremos filtar por Departamento_id y si su schedule_status=send
function ComprobarDepartamentoID(usuariospordepartamento) {
    const id = isNaN(parseInt(location.href.charAt(location.href.length - 1))) ? currentDepartment.id : parseInt(location.href.charAt(location.href.length - 1));

    // console.log(userData.departamento_id); //&& user.schedule_status == 'send'
    for (let user of usuariospordepartamento) {
        if (user.departamento_id.id === id && user.schedule_status === 'sent') {
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
    document.querySelector('title').textContent += ' ' + currentDepartment.name;

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