import { jsPDF } from "jspdf";

let modules = [];
let classRoomsByModules = [];
let rowsNumber = 1;
const currentAcademicYear = `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`;

// Upper Schedule DOM Elements
const department = document.querySelector('#department span');
const specialization = document.querySelector('#specialization span');
const teacher = document.querySelector('#teacher span');
const teachersName = document.querySelector('#teachersName');

// Local DOM Elements
const schoolYear = document.querySelector('#schoolYear span');
const totalHoursCell = document.querySelector('#totalCell');
const finalRow = document.querySelector('#totalRow');
const logoutForm = document.querySelector('#logoutForm');
const pdfButton = document.querySelector('#downloadPDF');
const profileBox = document.querySelector('#profileBox');

const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
let userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data : null;

window.addEventListener('load', setLocalData);
window.addEventListener('load', loadFirstContentPage);

profileBox.addEventListener('click', displayLogout);

pdfButton.addEventListener('click', htmlToPDF);

logoutForm.addEventListener('submit', logoutUser);

async function loadFirstContentPage() {
    fetch(location.origin + '/api/V1/aulamodulos', {
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
        .then(datos => classRoomsByModules = datos.data);

    if (isNaN(parseInt(location.href.split('/').pop()))) {

        await fetch(location.origin + '/api/V1/modulos', {
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
            .then(datos => modules = datos.data);

        setUserData();
        setMainSelectors();
        loadRemoveButton();
        loadAddButton();
        loadSaveButton();
        loadSendButton();

    } else {
        await fetch(location.origin + '/api/V1/users/' + parseInt(location.href.split('/').pop()), {
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
            .then(datos => userData = datos.data);
        setUserData();
        setMainSelectors();
        loadEndButton();
        loadDiscardButton();
    }
}

function setLocalData() {
    if (userData && isNaN(parseInt(location.href.split('/').pop()))) {
        const navbarLiElement = document.createElement('li');
        const navbarLinkEelement = document.createElement('a');

        navbarLiElement.className = 'nav-item';

        navbarLinkEelement.className = 'nav-link';

        if (userData.rol === 'head_of_department') {

            navbarLinkEelement.setAttribute('href', '#');
            navbarLinkEelement.textContent = 'Vista de Departamento';

            navbarLiElement.insertAdjacentElement('beforeend', navbarLinkEelement);

            document.querySelector('#teachersNavbar ul').insertAdjacentElement('beforeend', navbarLiElement);

        } else if (userData.rol === 'study_manager') {

            navbarLinkEelement.setAttribute('href', '#');
            navbarLinkEelement.textContent = 'Vista de Estudio';

            navbarLiElement.insertAdjacentElement('beforeend', navbarLinkEelement);

            document.querySelector('#teachersNavbar ul').insertAdjacentElement('beforeend', navbarLiElement);
        }
    } else {
        // Delete the Profile elements
        profileBox.remove();
        logoutForm.remove();
    }

    schoolYear.textContent = currentAcademicYear;
    totalHoursCell.textContent = 0;
}

function setUserData() {
    teacher.textContent = userData.name ? userData.name.charAt(0).toUpperCase() + userData.name.slice(1) : 'Anon';

    // If it is the original teacher view, show it's profile name
    if (isNaN(parseInt(location.href.split('/').pop()))) {
        teachersName.textContent = teacher.textContent;
    }

    document.querySelector('title').textContent += ' ' + teacher.textContent;

    if (userData.departamento_id) {
        department.textContent = userData.departamento_id.name;
    } else {
        department.textContent = 'No Especificado';
    }

    if (userData.especialidad_id) {
        specialization.textContent = userData.especialidad_id.name;
    } else {
        specialization.textContent = 'No Especificado';
    }
}

function setMainSelectors() {
    if (modules.some(modulo => modulo.especialidad_id)) {
        let modulesSelected = document.querySelectorAll('.listadoDeModulos');
        let modulesFiltered = modules;

        // Filter the modules to show, so it doesn't repeat
        for (const modulo of modules) {

            for (const moduloSelected of modulesSelected) {
                if (modulo.code === moduloSelected.selectedOptions[0].textContent) {
                    modulesFiltered = modulesFiltered.filter(modulo => modulo.code !== moduloSelected.selectedOptions[0].textContent);
                }
            }
        }

        // Insert options with the modules code
        for (const modulo of modulesFiltered) {
            const moduleOption = document.createElement('option');

            moduleOption.setAttribute('value', modulo.subject);
            moduleOption.setAttribute('title', modulo.subject);
            moduleOption.setAttribute('id', modulo.code + rowsNumber);
            moduleOption.textContent = modulo.code;

            document.querySelector('#teacherModules' + rowsNumber).insertAdjacentElement('beforeend', moduleOption);
        }

        document.querySelector('#teacherModules' + rowsNumber).addEventListener('change', loadModuleData);
    }
}



/* ################################################################################################################################ */
/* ################################################### FETCH/REDIRECT FUNCTIONS ################################################### */
/* ################################################################################################################################ */
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

                // Remove the User Data and Token from the localStorage
                localStorage.removeItem('user');

                // Submit to logout the user
                logoutForm.submit();
            }
        })
}



/* ##################################################################################################################### */
/* ################################################### DOM FUNCTIONS ################################################### */
/* ##################################################################################################################### */
function loadModuleData(target) {
    const targetID = target.srcElement.getAttribute('id');
    const selectedRow = targetID.charAt(targetID.length - 1);
    const moduleCode = target.srcElement.selectedOptions[0].textContent;

    if (moduleCode !== 'Seleccionar Modulo') {
        const selectedModule = modules.filter(modulo => modulo.code === moduleCode);

        document.querySelector('#turno' + selectedRow).textContent = selectedModule[0].curso_id['turn'];
        document.querySelector('#curso' + selectedRow).textContent = selectedModule[0].curso_id['course'];
        document.querySelector('#horas' + selectedRow).textContent = selectedModule[0].hours_per_week;

        updateWeeklyDistribution(parseInt(selectedModule[0].hours_per_week), selectedRow);
        updateModuleClassrooms(selectedModule[0].id, selectedRow);

        updateTotalHours();
    }
}


async function updateModuleClassrooms(moduloID, elementID) {
    let actualClassrooms = document.querySelector('#teacherClasses' + elementID).querySelectorAll('option');
    let classrooms = classRoomsByModules.filter(modulo => modulo.modulo_id.id == moduloID);

    // Delete all classrooms on the select element
    for (const actualClassroom of actualClassrooms) {
        actualClassroom.remove();
    }

    // Set the new classrooms on the select element
    for (const classroom of classrooms) {
        const classroomOption = document.createElement('option');

        classroomOption.setAttribute('value', classroom.aula_id.id);
        classroomOption.setAttribute('id', classroom.aula_id.name + elementID);
        classroomOption.textContent = classroom.aula_id.name;

        document.querySelector('#teacherClasses' + elementID).insertAdjacentElement('beforeend', classroomOption);
    }
}


function updateTotalHours() {
    const modulesHours = document.querySelectorAll('.horasPorModulo');
    let totalHoursValue = 0;

    for (const hora of modulesHours) {
        if (hora.textContent) {
            totalHoursValue += parseInt(hora.textContent);
        }
    }

    if (totalHoursValue === 18) {
        totalHoursCell.className = 'idealHours'
    } else if (totalHoursValue >= 16 && totalHoursValue <= 20) {
        totalHoursCell.className = 'inRangeHours'
    } else {
        totalHoursCell.className = 'undesideredHours'
    }

    totalHoursCell.textContent = totalHoursValue;
}

function loadAddButton() {
    const addButton = document.createElement('button');

    addButton.setAttribute('type', 'button');
    addButton.className = 'btn btn-success';
    addButton.textContent = 'Agregar Fila';

    addButton.addEventListener('click', addTableRow);

    document.querySelector('#principalButtonsBox').insertAdjacentElement('afterbegin', addButton);
}

function loadRemoveButton() {
    const removeButton = document.createElement('button');

    removeButton.setAttribute('type', 'button');
    removeButton.className = 'btn btn-danger';
    removeButton.textContent = 'Eliminar Última Fila';

    removeButton.addEventListener('click', removeTableRow);

    document.querySelector('#principalButtonsBox').insertAdjacentElement('afterbegin', removeButton);
}

function loadSaveButton() {
    const saveButton = document.createElement('button');

    saveButton.setAttribute('type', 'button');
    saveButton.className = 'btn btn-primary';
    saveButton.textContent = 'Guardar Cambios';

    saveButton.addEventListener('click', saveScheduleData);

    document.querySelector('#principalButtonsBox').insertAdjacentElement('beforeend', saveButton);
}

function loadSendButton() {
    const sendButton = document.createElement('button');

    sendButton.setAttribute('type', 'button');
    sendButton.className = 'btn btn-dark';
    sendButton.textContent = 'Enviar Horario';

    sendButton.addEventListener('click', sendScheduleForRevision);

    document.querySelector('#teacherSendButtonBox').insertAdjacentElement('beforeend', sendButton);
}

function loadEndButton() {
    const endButton = document.createElement('button');

    endButton.setAttribute('type', 'button');
    endButton.className = 'btn btn-success';
    endButton.textContent = 'Finalizar Horario';

    endButton.addEventListener('click', finalizeSchedule);

    document.querySelector('#departmentButtonsBox').insertAdjacentElement('beforeend', endButton);
}

function loadDiscardButton() {
    const discardButton = document.createElement('button');

    discardButton.setAttribute('type', 'button');
    discardButton.className = 'btn btn-danger';
    discardButton.textContent = 'Descartar Horario';

    discardButton.addEventListener('click', discardScheudle);

    document.querySelector('#departmentButtonsBox').insertAdjacentElement('beforeend', discardButton);
}



/* ######################################################################################################################### */
/* ################################################### BUTTONS FUNCTIONS ################################################### */
/* ######################################################################################################################### */
function addTableRow() {
    rowsNumber++;

    const newTableRow = document.createElement('tr');

    const turnTD = document.createElement('td');
    const schoolYearTD = document.createElement('td');
    const modulesListTD = document.createElement('td');
    const hoursTD = document.createElement('td');
    const weeklyDistributionTD = document.createElement('td');
    const classroomsListTD = document.createElement('td');

    const modulesListSelect = document.createElement('select');
    const weeklyDistributionSelect = document.createElement('select');
    const classroomsListSelect = document.createElement('select');

    const modulesListOption = document.createElement('option');

    newTableRow.setAttribute('id', 'tableRow' + rowsNumber);

    turnTD.setAttribute('id', 'turno' + rowsNumber);
    schoolYearTD.setAttribute('id', 'curso' + rowsNumber);
    modulesListTD.className = 'selectCell';
    hoursTD.setAttribute('id', 'horas' + rowsNumber);
    hoursTD.className = 'horasPorModulo'
    weeklyDistributionTD.className = 'selectCell';
    classroomsListTD.className = 'selectCell';

    modulesListSelect.setAttribute('id', 'teacherModules' + rowsNumber);
    modulesListSelect.setAttribute('name', 'teacherModules' + rowsNumber);
    modulesListSelect.className = 'listadoDeModulos';
    weeklyDistributionSelect.setAttribute('id', 'teacherHoursWeek' + rowsNumber);
    weeklyDistributionSelect.setAttribute('name', 'teacherHoursWeek' + rowsNumber);
    classroomsListSelect.setAttribute('id', 'teacherClasses' + rowsNumber);
    classroomsListSelect.setAttribute('name', 'teacherClasses' + rowsNumber);

    modulesListOption.setAttribute('value', 'Select Module');
    modulesListOption.textContent = 'Seleccionar Modulo';

    modulesListSelect.insertAdjacentElement('beforeend', modulesListOption);

    modulesListTD.insertAdjacentElement('beforeend', modulesListSelect);
    weeklyDistributionTD.insertAdjacentElement('beforeend', weeklyDistributionSelect);
    classroomsListTD.insertAdjacentElement('beforeend', classroomsListSelect);

    newTableRow.insertAdjacentElement('beforeend', turnTD);
    newTableRow.insertAdjacentElement('beforeend', schoolYearTD);
    newTableRow.insertAdjacentElement('beforeend', modulesListTD);
    newTableRow.insertAdjacentElement('beforeend', hoursTD);
    newTableRow.insertAdjacentElement('beforeend', weeklyDistributionTD);
    newTableRow.insertAdjacentElement('beforeend', classroomsListTD);

    finalRow.insertAdjacentElement('beforebegin', newTableRow);

    setMainSelectors();
}


function removeTableRow() {
    if (rowsNumber > 1) {
        document.querySelector('#tableRow' + rowsNumber).remove();
        updateTotalHours();
        rowsNumber--;
    }
}

function displayLogout() {
    if (document.querySelector('#logoutForm').className === 'blindfolded') {
        document.querySelector('#logoutForm').className = 'showed';
    } else {
        document.querySelector('#logoutForm').className = 'blindfolded';
    }
}


function saveScheduleData() {

}

function sendScheduleForRevision() {

}

function finalizeSchedule() {

}

function discardScheudle() {

}



/* #################################################################################################################### */
/* ################################################### PDF FUNCTION ################################################### */
/* #################################################################################################################### */
function htmlToPDF() {
    // Create the jsPDF object
    const doc = new jsPDF('portrait', 'pt', 'a4');

    // Create variables to store the schedule data
    const scheduleContainer = document.querySelector('#container');

    // Create Necesary attributes
    const fullSchedule = scheduleContainer;

    const margin = 15;
    const scale = (doc.internal.pageSize.width - margin * 2) / document.body.scrollWidth;

    doc.html(fullSchedule, {
        x: margin,
        y: margin,
        html2canvas: {
            scale: scale,
        },
        callback: function (doc) {
            doc.save('Horario de ' + userData.name + '.pdf');
        }
    });
}



/* ###################################################################################################################################### */
/* ################################################### WEEKLY DISTRIBUTIOON FUNCTIONS ################################################### */
/* ###################################################################################################################################### */
function updateWeeklyDistribution(totalHours, elementID) {
    let actualWeeklyDistributions = document.querySelector('#teacherHoursWeek' + elementID).querySelectorAll('option');
    let hoursPerWeek = getWeeklyDistribution([1, 2, 3], totalHours);

    // Delete all weekly distributions on the select element
    for (const actualWD of actualWeeklyDistributions) {
        actualWD.remove();
    }

    // If the hours are too much, filter the hours per week
    if (totalHours >= 6) {
        hoursPerWeek = hoursPerWeek.filter(distribution => distribution.reduce((sum, number) => { number === 1 ? sum++ : ''; return sum }, 0) < 2);
    }

    // Brush Up the results and show them to the user
    for (let distribution of hoursPerWeek) {
        distribution = distribution.join(' + ');

        const wdOption = document.createElement('option');

        wdOption.setAttribute('value', distribution);
        wdOption.setAttribute('id', distribution.split(' ').join('') + '/' + elementID);
        wdOption.textContent = distribution;

        document.querySelector('#teacherHoursWeek' + elementID).insertAdjacentElement('beforeend', wdOption);
    }
}


function getWeeklyDistribution(hours, totalHours) {
    // Create an array to store the possible weekly hours combinations
    let weeklyDistribution = []

    // If hours isn't set, stop the script
    if (hours === null || hours.length === 0 || totalHours === null) {
        return weeklyDistribution;
    }

    // Sort the hours array in ascending order
    hours.sort((a, b) => a - b);

    // Create an array to store the current subset of weekly hours
    let currentDistribution = []

    // Call the findDistribution function and store the result in the weeklyDistribution array
    findDistribution(hours, totalHours, 0, currentDistribution, weeklyDistribution);
    return weeklyDistribution;
};


function findDistribution(hours, totalHours, i, currentDistribution, weeklyDistribution) {
    // When the hours reach zero, create a copy of the current array and push it to the weeklyDistribution array
    if (totalHours === 0) {
        const temp = currentDistribution.slice();
        weeklyDistribution.push(temp);
        return;
    }

    // Loop through the hours array from i to its length - 1
    for (let j = i; j < hours.length; j++) {

        // If the totalHours is less than or equal to the hours[j], break out of the loop
        if (totalHours < hours[j]) {
            return;
        }

        // Push the hours[j] to the currentDistribution array and call this function recursively with updated parameters
        currentDistribution.push(hours[j]);
        findDistribution(hours, totalHours - hours[j], j, currentDistribution, weeklyDistribution);

        // Remove the last element from the current array, to avoid duplicates
        currentDistribution.pop();
    }
}