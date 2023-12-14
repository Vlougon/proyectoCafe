import { jsPDF } from "jspdf";

let previosUserData = {};
let selectedModules = [];
let modules = [];
let classRoomsByModules = [];
let rowsNumber = 0;
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

const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;
let userData = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).data : null;

window.addEventListener('load', setLocalData);
window.addEventListener('load', loadFirstContentPage);
window.addEventListener('keyup', readSelectedElement);

profileBox.addEventListener('click', displayLogout);
pdfButton.addEventListener('click', htmlToPDF);
logoutForm.addEventListener('submit', logoutUser);

async function loadFirstContentPage() {
    await fetch(location.origin + '/api/V1/aulamodulos', {
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

    setUserData();

    if (isNaN(parseInt(location.href.split('/').pop()))) {

        setNavBArButtons();

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
            .then((datos) => {
                const modulosEspecialidad = datos.data.filter(modulo => modulo.especialidad_id.id === userData.especialidad_id.id);

                if (modulosEspecialidad.some(modulo => modulo.user_id !== null && modulo.user_id.id === userData.id)) {
                    modules = modulosEspecialidad.filter(modulo => modulo.user_id === null || modulo.user_id !== null && modulo.user_id.id === userData.id);
                } else {
                    modules = modulosEspecialidad.filter(modulo => modulo.user_id === null);
                }

                return modules;
            });

        if (modules.some(modulo => modulo.user_id !== null && modulo.user_id.id === userData.id)) {
            const userModules = modules.filter(modulo => modulo.user_id !== null && modulo.user_id.id === userData.id);

            for (const module of userModules) {
                addTableRow();
                updateWeeklyDistribution(parseInt(module.hours_per_week), rowsNumber);
                updateModuleClassrooms(module.id, rowsNumber);
                setModuleData(module.curso_id.turn, module.curso_id.course, module.code, module.hours_per_week, module.weekly_distribution, module.classroom);
                updateSelectedModuels(module, rowsNumber);
            }

            loadObservations();

        } else {
            addTableRow();
        }

        loadRemoveButton();
        loadAddButton();
        loadSaveButton();
        loadSendButton();

    } else {
        previosUserData = userData;
        document.querySelector('#leyendBox').remove();

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
        setNavBArButtons();

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
            .then((datos) => {
                const modulosEspecialidad = datos.data.filter(modulo => modulo.especialidad_id.id === userData.especialidad_id.id);

                if (modulosEspecialidad.some(modulo => modulo.user_id !== null && modulo.user_id.id === userData.id)) {
                    modules = modulosEspecialidad.filter(modulo => modulo.user_id === null || modulo.user_id !== null && modulo.user_id.id === userData.id);
                } else {
                    modules = modulosEspecialidad.filter(modulo => modulo.user_id === null);
                }

                return modules;
            });

        modules = modules.filter(modulo => modulo.user_id !== null && modulo.user_id.id === userData.id);

        for (const module of modules) {
            addTableRow();
            setModuleData(module.curso_id.turn, module.curso_id.course, module.code, module.hours_per_week, module.weekly_distribution, module.classroom);
        }

        loadObservations();

        if (previosUserData && previosUserData.rol === 'head_of_department') {
            loadEndButton();
            loadDiscardButton();
        }
    }
}


function setLocalData() {
    schoolYear.textContent = currentAcademicYear;
    totalHoursCell.textContent = 0;
}


function setNavBArButtons() {
    const navbarLiElement = document.createElement('li');
    const navbarLinkEelement = document.createElement('a');

    navbarLiElement.className = 'nav-item';
    navbarLinkEelement.className = 'nav-link';

    if (userData && isNaN(parseInt(location.href.split('/').pop()))) {
        if (userData.rol === 'head_of_department') {

            navbarLinkEelement.setAttribute('href', location.origin + '/departament');
            navbarLinkEelement.textContent = 'Vista de Departamento';

        } else if (userData.rol === 'study_manager') {

            navbarLinkEelement.setAttribute('href', location.origin + '/studyManager');
            navbarLinkEelement.textContent = 'Vista de Estudio';
        }

    } else {
        // Delete the Profile elements
        profileBox.remove();
        logoutForm.remove();

        if (previosUserData && previosUserData.rol === 'head_of_department') {

            navbarLinkEelement.setAttribute('href', location.origin + '/departament');
            navbarLinkEelement.textContent = 'Mi Departamento';

        } else if (previosUserData && previosUserData.rol === 'study_manager') {
            const managerButton = document.createElement('li');
            const managerLink = document.createElement('a');

            managerButton.className = 'nav-item';
            managerLink.className = 'nav-link';

            managerLink.setAttribute('href', location.origin + '/departament/' + userData.departamento_id.id);
            managerLink.textContent = 'Departamento de ' + userData.departamento_id.name;

            managerButton.insertAdjacentElement('beforeend', managerLink);
            document.querySelector('#teachersNavbar ul').insertAdjacentElement('beforeend', managerButton);

            navbarLinkEelement.setAttribute('href', location.origin + '/studyManager');
            navbarLinkEelement.textContent = 'Jefatura';
        }
    }

    navbarLiElement.insertAdjacentElement('beforeend', navbarLinkEelement);
    document.querySelector('#teachersNavbar ul').insertAdjacentElement('beforeend', navbarLiElement);
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
        document.querySelector('#teacherModules' + rowsNumber).addEventListener('menu', readSelectedElement);
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

                // Remove the User Data and Token from the sessionStorage
                sessionStorage.removeItem('user');

                // Submit to logout the user
                logoutForm.submit();
            }
        })
}


function updateUserTotalHours(status = 'started') {
    let data = {};

    if (status !== 'started') {
        data = {
            'schedule_status': status,
        };
    } else {
        data = {
            'total_hours': totalHoursCell.textContent,
            'observatioins': document.querySelector('#teacherObservations').value.match(/^[\s]*$/) ? 'null' : document.querySelector('#teacherObservations').value,
        };
    }

    let formBody = [];
    for (const property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    };
    formBody = formBody.join("&");

    fetch(location.origin + '/api/V1/users/' + userData.id, {
        method: "PUT",
        headers: {
            'Authorization': "Bearer " + token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
        body: formBody,
    })
        .then(respuesta => respuesta.json())
        .then((datos) => {
            if (datos.status === 'success') {

                if (status !== 'started') {
                    generateFeedBack(datos.status, datos.message);
                }

            } else {

                switch (status) {
                    case 'started':
                        generateFeedBack(datos.status, '¡Fallo al Guardar los datos del Profesor!');
                        break;
                    case 'sent':
                        generateFeedBack(datos.status, '¡Fallo al Enviar el horario del Profesor!');
                        break;
                    case 'finalized':
                        generateFeedBack(datos.status, '¡Fallo al Finalizar el horario del Profesor!');
                        break;
                    case 'discardted':
                        generateFeedBack(datos.status, '¡Fallo al Descartar el horario del Profesor!');
                        break;
                }
            }
        });
}


async function updateUserModules() {
    if (selectedModules.length >= 1) {
        let failed = false;

        for (const descarted of modules) {

            const data = {
                'weekly_distribution': '',
                'classroom': 0,
                'user_id': 0,
            };

            let formBody = [];
            for (const property in data) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(data[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            };
            formBody = formBody.join("&");

            await fetch(location.origin + '/api/V1/modulos/' + descarted.id, {
                method: "PUT",
                headers: {
                    'Authorization': "Bearer " + token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
                body: formBody,
            });
        }

        for (const modules of selectedModules) {

            const data = {
                'weekly_distribution': modules.weekly_distribution,
                'classroom': modules.classroom,
                'user_id': modules.user_id,
            };

            let formBody = [];
            for (const property in data) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(data[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            };
            formBody = formBody.join("&");

            await fetch(location.origin + '/api/V1/modulos/' + modules.id, {
                method: "PUT",
                headers: {
                    'Authorization': "Bearer " + token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
                body: formBody,
            })
                .then(respuesta => respuesta.json())
                .then((datos) => {
                    if (datos.status !== 'success') {
                        failed = true;
                    }
                });
        }

        if (!failed) {
            generateFeedBack('success', '¡Horario Actualizado Exitosamente!');
        } else {
            generateFeedBack('failed', 'Erorr al actualizar el Horario!');
        }
    }
}



/* ##################################################################################################################### */
/* ################################################### DOM FUNCTIONS ################################################### */
/* ##################################################################################################################### */
function loadModuleData(target) {
    const targetID = target.srcElement.getAttribute('id');
    const selectedRow = parseInt(targetID.charAt(targetID.length - 1));
    const moduleCode = target.srcElement.selectedOptions[0].textContent;

    if (moduleCode !== 'Seleccionar Modulo') {
        const selectedModule = modules.filter(modulo => modulo.code === moduleCode);

        document.querySelector('#turno' + selectedRow).textContent = selectedModule[0].curso_id['turn'];
        document.querySelector('#curso' + selectedRow).textContent = selectedModule[0].curso_id['course'];
        document.querySelector('#horas' + selectedRow).textContent = selectedModule[0].hours_per_week;

        updateWeeklyDistribution(parseInt(selectedModule[0].hours_per_week), selectedRow);
        updateModuleClassrooms(selectedModule[0].id, selectedRow);

        updateTotalHours();

        updateSelectedModuels(selectedModule[0], selectedRow);
    }
}


function updateSelectedModuels(modulo, id) {
    if (selectedModules.some(moduleSelected => moduleSelected.optionID === id)) {
        const index = selectedModules.findIndex(moduleSelected => moduleSelected.optionID === id);

        selectedModules[index].id = modulo.id;
        selectedModules[index].code = modulo.code;
        selectedModules[index].subject = modulo.subject;
        selectedModules[index].hours_per_week = modulo.hours_per_week;
        selectedModules[index].total_hours = modulo.total_hours;
        selectedModules[index].weekly_distribution = document.querySelector('#teacherHoursWeek' + id).selectedOptions[0].textContent;
        selectedModules[index].classroom = document.querySelector('#teacherClasses' + id).selectedOptions[0].value;
        selectedModules[index].user_id = userData.id;
        selectedModules[index].especialidad_id = modulo.especialidad_id.id;
        selectedModules[index].curso_id = modulo.curso_id.id;

    } else {
        selectedModules.push({
            'optionID': id,
            'id': modulo.id,
            'code': modulo.code,
            'subject': modulo.subject,
            'hours_per_week': modulo.hours_per_week,
            'total_hours': modulo.total_hours,
            'weekly_distribution': document.querySelector('#teacherHoursWeek' + id).selectedOptions[0].textContent,
            'classroom': document.querySelector('#teacherClasses' + id).selectedOptions[0].value,
            'user_id': userData.id,
            'especialidad_id': modulo.especialidad_id.id,
            'curso_id': modulo.curso_id.id,
        });
    }
}


function setModuleData(turn, academicYear, moduleCode, moduelHours, weeklyDistribution, classRoom) {
    const listOfModules = document.querySelectorAll('#teacherModules' + rowsNumber + ' option');
    const listOfPossibleDistributions = document.querySelectorAll('#teacherHoursWeek' + rowsNumber + ' option');
    const listOfClassrooms = document.querySelectorAll('#teacherClasses' + rowsNumber + ' option');

    document.querySelector('#turno' + rowsNumber).textContent = turn;
    document.querySelector('#curso' + rowsNumber).textContent = academicYear;
    document.querySelector('#horas' + rowsNumber).textContent = moduelHours;

    if (userData && isNaN(parseInt(location.href.split('/').pop()))) {
        for (const moduleOption of listOfModules) {

            if (moduleOption.textContent === moduleCode) {
                moduleOption.setAttribute('selected', 'selected');
            }
        }

        for (const wdOption of listOfPossibleDistributions) {

            if (wdOption.textContent === weeklyDistribution) {
                wdOption.setAttribute('selected', 'selected');
            }
        }

        for (const classroomOption of listOfClassrooms) {

            if (parseInt(classroomOption.getAttribute('value')) === classRoom) {
                classroomOption.setAttribute('selected', 'selected');
            }
        }

    } else {

        document.querySelector('#teacherModules' + rowsNumber).remove();
        document.querySelector('#listadoModulos' + rowsNumber).textContent = moduleCode;

        document.querySelector('#teacherHoursWeek' + rowsNumber).remove();
        document.querySelector('#listadoDistribucion' + rowsNumber).textContent = weeklyDistribution;

        document.querySelector('#teacherClasses' + rowsNumber).remove();
        document.querySelector('#listadoClases' + rowsNumber).textContent = classRoom;
    }

    updateTotalHours();
}


function loadObservations() {
    let observations = modules.filter(modulo => modulo.user_id !== null);

    observations = observations.length >= 1 ? observations[0].user_id.observatioins : null;

    if (observations && observations !== 'null') {
        document.querySelector('#teacherObservations').value = observations;
    }

    if (!isNaN(parseInt(location.href.split('/').pop()))) {
        document.querySelector('#teacherObservations').disabled = true;
    }
}


async function updateModuleClassrooms(moduloID, elementID) {
    let actualClassrooms = document.querySelectorAll('#teacherClasses' + elementID + ' option');
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

    document.querySelector('#teacherClasses' + elementID).addEventListener('change', updateSelectOption);
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
    addButton.setAttribute('name', 'Botón para agregar un nuevo Módulo');
    addButton.className = 'btn btn-success';
    addButton.textContent = 'Agregar Módulo';

    addButton.addEventListener('click', addTableRow);

    document.querySelector('#principalButtonsBox').insertAdjacentElement('afterbegin', addButton);
}

function loadRemoveButton() {
    const removeButton = document.createElement('button');

    removeButton.setAttribute('type', 'button');
    removeButton.setAttribute('name', 'Botón para eliminar el último módulo añadido');
    removeButton.className = 'btn btn-danger';
    removeButton.textContent = 'Eliminar Último Módulo';

    removeButton.addEventListener('click', removeTableRow);

    document.querySelector('#principalButtonsBox').insertAdjacentElement('afterbegin', removeButton);
}

function loadSaveButton() {
    const saveButton = document.createElement('button');

    saveButton.setAttribute('type', 'button');
    saveButton.setAttribute('name', 'Botón para guardar los cambios realizados');
    saveButton.className = 'btn btn-primary';
    saveButton.textContent = 'Guardar Cambios';

    saveButton.addEventListener('click', saveScheduleData);

    document.querySelector('#principalButtonsBox').insertAdjacentElement('beforeend', saveButton);
}

function loadSendButton() {
    const sendButton = document.createElement('button');

    sendButton.setAttribute('id', 'sendButton');
    sendButton.setAttribute('type', 'button');
    sendButton.setAttribute('name', 'Botón para enviar el horario a revisión');
    sendButton.className = 'btn btn-dark';
    sendButton.textContent = 'Enviar Horario';

    sendButton.addEventListener('click', sendScheduleForRevision);

    document.querySelector('#teacherSendButtonBox').insertAdjacentElement('beforeend', sendButton);
}

function loadEndButton() {
    const endButton = document.createElement('button');

    endButton.setAttribute('id', 'endButton');
    endButton.setAttribute('type', 'button');
    endButton.setAttribute('name', 'Botón para finalizar el horario');
    endButton.className = 'btn btn-success';
    endButton.textContent = 'Finalizar Horario';

    endButton.addEventListener('click', finalizeSchedule);

    document.querySelector('#departmentButtonsBox').insertAdjacentElement('beforeend', endButton);
}

function loadDiscardButton() {
    const discardButton = document.createElement('button');

    discardButton.setAttribute('type', 'button');
    discardButton.setAttribute('name', 'Botón para descartar el horario');
    discardButton.className = 'btn btn-danger';
    discardButton.textContent = 'Descartar Horario';

    discardButton.addEventListener('click', discardScheudle);

    document.querySelector('#departmentButtonsBox').insertAdjacentElement('beforeend', discardButton);
}



/* ################################################################################################################################ */
/* ################################################### BUTTONS/SELECT FUNCTIONS ################################################### */
/* ################################################################################################################################ */
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
    modulesListTD.setAttribute('id', 'listadoModulos' + rowsNumber);
    hoursTD.setAttribute('id', 'horas' + rowsNumber);
    hoursTD.className = 'horasPorModulo'
    weeklyDistributionTD.className = 'selectCell';
    weeklyDistributionTD.setAttribute('id', 'listadoDistribucion' + rowsNumber);
    classroomsListTD.className = 'selectCell';
    classroomsListTD.setAttribute('id', 'listadoClases' + rowsNumber);

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

        if (selectedModules.some(modulo => modulo.optionID === rowsNumber)) {
            selectedModules.pop();
        }

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
    updateUserTotalHours();
    updateUserModules();
}

function sendScheduleForRevision() {
    updateUserTotalHours('sent');
}

function finalizeSchedule() {
    //if para id en url y cambiar con updateUserTotalHours('finalized')
    let ruta = location.href; //devuelve la ruta completa
    let userId = parseInt(ruta.charAt(ruta.length - 1));//Esto nol devuleve el id pero como string

    if (Number.isInteger(userId)) {
        updateUserTotalHours('finalized')
    }
}

function discardScheudle() {
    //if para id en url y cambiar con updateUserTotalHours('finalized')
    let ruta = location.href; //devuelve la ruta completa
    let userId = parseInt(ruta.charAt(ruta.length - 1));//Esto nol devuleve el id pero como string

    if (Number.isInteger(userId)) {
        updateUserTotalHours('discardted')
    }
}


function updateSelectOption(target) {
    const targetID = target.srcElement.id;
    const idNumber = parseInt(targetID.charAt(targetID.length - 1));

    if (selectedModules.some(modulo => modulo.optionID === idNumber)) {
        const index = selectedModules.findIndex(modulo => modulo.optionID === idNumber);

        if (targetID.includes('Hours')) {
            selectedModules[index].weekly_distribution = target.srcElement.selectedOptions[0].textContent;
        } else {
            selectedModules[index].classroom = parseInt(target.srcElement.selectedOptions[0].value);
        }
    }
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



/* ###################################################################################################################### */
/* ################################################### FLASH MESSAGES ################################################### */
/* ###################################################################################################################### */
function generateFeedBack(status, message) {
    const messageContainer = document.createElement('div');
    const messageText = document.createElement('strong');
    const closeButton = document.createElement('button');
    const messageType = status === 'success' ? 'success' : 'danger';

    messageContainer.className = `alert alert-${messageType} alert-dismissible fade show position-absolute`;
    messageContainer.setAttribute('role', 'alert');

    messageText.textContent = message;

    closeButton.className = 'btn-close';
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('data-bs-dismiss', 'alert');
    closeButton.setAttribute('aria-label', 'Close');

    messageContainer.insertAdjacentElement('beforeend', messageText);
    messageContainer.insertAdjacentElement('beforeend', closeButton);

    document.querySelector('main').insertAdjacentElement('beforeend', messageContainer);
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
        hoursPerWeek = hoursPerWeek.filter(distribution => distribution.length <= 5 && distribution.reduce((sum, number) => { number === 1 ? sum++ : ''; return sum }, 0) < 2);
    }

    // Brush Up the results and show them to the user
    for (let distribution of hoursPerWeek) {
        distribution = distribution.join(' + ');

        const wdOption = document.createElement('option');

        wdOption.setAttribute('value', distribution);
        wdOption.setAttribute('id', distribution.split(' ').join('') + '/' + elementID);
        wdOption.textContent = distribution;

        wdOption.addEventListener('keyup', readSelectedElement);

        document.querySelector('#teacherHoursWeek' + elementID).insertAdjacentElement('beforeend', wdOption);
    }

    document.querySelector('#teacherHoursWeek' + elementID).addEventListener('change', updateSelectOption);
}


function getWeeklyDistribution(hours, totalHours) {
    // Create an array to store the possible weekly hours combinations
    let weeklyDistribution = [];

    // If hours isn't set, stop the script
    if (hours === null || hours.length === 0 || totalHours === null) {
        return weeklyDistribution;
    }

    // Sort the hours array in ascending order
    hours.sort((a, b) => a - b);

    // Create an array to store the current subset of weekly hours
    let currentDistribution = [];

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



/* ############################################################################################################################### */
/* ################################################### ACCESSIBILITY FUNCTIONS ################################################### */
/* ############################################################################################################################### */
function readSelectedElement(event) {
    if (event.key === 'Tab') {
        window.speechSynthesis.cancel();

        let message = new SpeechSynthesisUtterance();

        message.lang = 'es-ES';

        switch (document.activeElement.tagName) {
            case 'SELECT':

                if (document.activeElement.id.includes('Modules')) {
                    message.text += 'El módulo seleccionado es ' + document.activeElement.selectedOptions[0].value;
                } else if (document.activeElement.id.includes('Hours')) {
                    message.text += 'La distribución semanal seleccionada es ' + document.activeElement.selectedOptions[0].textContent;
                } else if (document.activeElement.id.includes('Classes')) {
                    message.text += 'El aula seleccionada es ' + document.activeElement.selectedOptions[0].textContent;
                }

                break;

            case 'BUTTON':
                message.text += document.activeElement.getAttribute('name');

                if (document.activeElement.id === 'sendButton') {
                    message.text += '... El Total de Horas de los Módulos Seleccionados es ' + totalHoursCell.textContent;
                }

                if (document.activeElement.id === 'endButton') {
                    message.text += '... El Total de Horas de los Módulos Seleccionados por el profesor' + userData.name + ' es ' + totalHoursCell.textContent;
                }

                break;

            case 'INPUT':
                message.text += document.activeElement.getAttribute('value');
                break;

            case 'OPTION':
                message.text += document.activeElement.getAttribute('value');
                break;

            case 'TEXTAREA':
                message.text += 'Observaciones escritas por ti: ';
                message.text += document.activeElement.value !== null ? document.activeElement.value : 'Nada aún.';
                break;

            default:
                message.text += document.activeElement.textContent;
                break;
        }

        window.speechSynthesis.speak(message);

    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        window.speechSynthesis.cancel();

        let message = new SpeechSynthesisUtterance();

        message.lang = 'es-ES';

        switch (document.activeElement.tagName) {
            case 'SELECT':

                if (document.activeElement.id.includes('Modules')) {
                    message.text += 'El módulo seleccionado es ' + document.activeElement.selectedOptions[0].value;
                } else if (document.activeElement.id.includes('Hours')) {
                    message.text += 'La distribución semanal seleccionada es ' + document.activeElement.selectedOptions[0].textContent;
                } else if (document.activeElement.id.includes('Classes')) {
                    message.text += 'El aula seleccionada es ' + document.activeElement.selectedOptions[0].textContent;
                }

                window.speechSynthesis.speak(message);

                break;
        }
    }
}