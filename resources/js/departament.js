

const container = document.querySelector('#container')
const header = document.querySelector('#header')



let usuariospordepartamento = []; //Tendremos que tener un lugar donde ir añadiendo los departamentos
const userNavbar = document.querySelector('#teachersNavbar ul');

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
    console.log(userData.departamento_id); //&& user.schedule_status == 'send'
    for (let user of usuariospordepartamento) {
        if (userData.departamento_id.id === user.departamento_id.id && userData.id !== user.id) {
            CrearCardUser(user);
            console.log(user);
        }
    }
}

function CrearCardUser(usuario) {

    // ---------------------------------------------
    // --------------- CARD PROFESOR ---------------
    // ---------------------------------------------

    const cardRow = document.createElement("div");
    cardRow.classList.add("row");

    const col = document.createElement("div");
    col.classList.add("col");

    const card = document.createElement("div");
    card.classList.add("card");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const img = document.createElement("img");
    img.src = "../images/defaultUserIcon.png";
    img.alt = "Icono de Perfil del Profesor";
    img.classList.add("d-inline-block");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = `Profesor: ${usuario.name}`;

    const especialidad = document.createElement("p");
    especialidad.classList.add("card-text");
    especialidad.textContent = `Especialidad: ${usuario.especialidad_id.name}`;
    const horas = document.createElement("p");
    horas.classList.add("card-text");
    horas.textContent = `Horas Totales: ${usuario.total_hours}`;

    const enlace = document.createElement("a");
    enlace.setAttribute('href', location.origin + '/teacherSheets/' + usuario.id);
    enlace.classList.add("btn", "btn-primary", "mt-2", "mt-md-0");
    enlace.textContent = "Ver";

    // ---------------------------------------------
    // --------------- CARD PROFESOR ---------------
    // ---------------------------------------------

    cardBody.insertAdjacentElement('beforeend', img);
    cardBody.insertAdjacentElement('beforeend', cardTitle);
    cardBody.insertAdjacentElement('beforeend', especialidad);
    cardBody.insertAdjacentElement('beforeend', horas);
    cardBody.insertAdjacentElement('beforeend', enlace);

    card.insertAdjacentElement('beforeend', cardBody);
    col.insertAdjacentElement('beforeend', card);
    cardRow.insertAdjacentElement('beforeend', col);

    departmentContainer.insertAdjacentElement('beforeend', cardRow);
    console.log(departmentContainer);
    // Añadir departmentContainer al lugar donde quieras mostrar estos bloques en tu página
    header.insertAdjacentElement('afterend', departmentContainer);
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
}