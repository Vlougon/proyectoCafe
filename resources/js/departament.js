

let usuariospordepartamento = []; //Tendremos que tener un lugar donde ir añadiendo los departamentos
const userNavbar = document.querySelector('#teachersNavbar ul');
/*
Con el sessionStorage necesito obtener el id del usuario

Necesito filtar los usuarios con el departamento igual al del jefe de departamento y que su 
schedule_status = send

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


    ComprobarDepartamentoID(usuariospordepartamento);

}

//Queremos filtar por Departamento_id y si su schedule_status=send
function ComprobarDepartamentoID(usuariospordepartamento) {
    console.log('g');
    console.log(userData.departamento_id);
    for (let user of usuariospordepartamento) {
        if (userData.departamento_id.id === user.departamento_id.id) {
            CrearCardUser(user);
            console.log(user);
        }
    }
}

function CrearCardUser(usuario) {

    const departmentContainer = document.createElement("div");
    departmentContainer.classList.add("container", "my-4");

    const titleRow = document.createElement("div");
    titleRow.classList.add("row", "text-center", "my-4");

    const title = document.createElement("h3");
    title.innerHTML = `Departamento de <span id="NombreDepartamento">${usuario.departamento_id.name}</span>`;

    titleRow.appendChild(title);

    const cardRow = document.createElement("div");
    cardRow.classList.add("row", "row-cols-1", "row-cols-sm-2", "row-cols-md-2", "row-cols-lg-2", "g-4");

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
    cardTitle.innerHTML = `Profesor: <span id="NombreProfesor">${usuario.name}</span>`;

    const especialidad = document.createElement("p");
    especialidad.classList.add("card-text");
    especialidad.innerHTML = `Especialidad: <span id="EspecialidadProfesor">${usuario.especialidad_id.name}</span>`;

    const horas = document.createElement("p");
    horas.classList.add("card-text");
    horas.innerHTML = `Horas Totales: <span id="HorasProfesor">${usuario.total_hours}</span>`;

    const enlace = document.createElement("a");
    enlace.href = "#";
    enlace.classList.add("btn", "btn-primary", "mt-2", "mt-md-0");
    enlace.textContent = "Ver";

    cardBody.appendChild(img);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(especialidad);
    cardBody.appendChild(horas);
    cardBody.appendChild(enlace);

    card.appendChild(cardBody);
    col.appendChild(card);
    cardRow.appendChild(col);

    departmentContainer.appendChild(titleRow);
    departmentContainer.appendChild(cardRow);

    // Añadir departmentContainer al lugar donde quieras mostrar estos bloques en tu página
    document.body.appendChild(departmentContainer);
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