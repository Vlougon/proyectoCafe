let modules = [];
let rowsNumber = 1;
const currentAcademicYear = `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`;

const department = document.querySelector('#department span');
const specialization = document.querySelector('#specialization span');
const teacher = document.querySelector('#teacher span');
const teachersName = document.querySelector('#teachersName');

const schoolYear = document.querySelector('#schoolYear span');
const totalHoursCell = document.querySelector('#totalCell');
const finalRow = document.querySelector('#totalRow');

const addRowButton = document.querySelector('#addRow');
const removeRowButton = document.querySelector('#removeRow');

const token = document.querySelector('#userToken').getAttribute('value');
const userData = JSON.parse(document.querySelector('#userData').getAttribute('value'));

window.addEventListener('load', setLocalData);
window.addEventListener('load', loadFirstContentPage);

addRowButton.addEventListener('click', addTableRow);
removeRowButton.addEventListener('click', removeTableRow);

async function loadFirstContentPage() {
    await fetch('http://proyectocafe.test/api/V1/modulos', {
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
}

function setLocalData() {
    schoolYear.textContent = currentAcademicYear;
    totalHoursCell.textContent = 0;
}

function setUserData() {
    if (userData.departamento_id) {
        fetch('http://proyectocafe.test/api/V1/departamentos/' + userData.departamento_id, {
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
            .then(datos => department.textContent = datos.data.name);
    } else {
        department.textContent = 'No Especificado';
    }

    if (userData.especialidad_id) {
        fetch('http://proyectocafe.test/api/V1/especialidads/' + userData.especialidad_id, {
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
            .then(datos => specialization.textContent = datos.data.name);
    } else {
        specialization.textContent = 'No Especificado';
    }

    teacher.textContent = userData.name ? userData.name.charAt(0).toUpperCase() + userData.name.slice(1) : 'Anon';
    teachersName.textContent = teacher.textContent;
}

function setMainSelectors() {
    if (modules.some(modulo => modulo.especialidad_id)) {
        for (const modulo of modules) {
            document.querySelector('#teacherModules' + rowsNumber).innerHTML += `
            <option value="${modulo.subject}" name="${modulo.code}" id="${modulo.code + rowsNumber}">${modulo.code}</option>
            `;
        }

        document.querySelector('#teacherModules' + rowsNumber).addEventListener('change', loadModuleData);
    }
}

function loadModuleData(target) {
    const targetID = target.srcElement.getAttribute('id');
    const selectedRow = targetID.charAt(targetID.length - 1);
    const moduleCode = target.srcElement.selectedOptions[0].textContent;

    if (moduleCode !== 'Seleccionar Modulo') {
        const selectedModule = modules.filter(modulo => modulo.code === moduleCode);

        document.querySelector('#turno' + selectedRow).textContent = selectedModule[0].curso_id['turn'];
        document.querySelector('#curso' + selectedRow).textContent = selectedModule[0].curso_id['course'];
        document.querySelector('#horas' + selectedRow).textContent = selectedModule[0].hours_per_week;

        updateTotalHours();
    }
}

function addTableRow() {
    rowsNumber++;

    const newRow = `
    <tr id="tableRow${rowsNumber}">
        <td id="turno${rowsNumber}"></td>
        <td id="curso${rowsNumber}"></td>
        <td class="selectCell">
                <select name="teacherModules${rowsNumber}" id="teacherModules${rowsNumber}">
                <option value="Select Module">Seleccionar Modulo</option>
            </select>
        </td>
        <td id="horas${rowsNumber}" class="horasPorModulo"></td>
        <td class="selectCell">
                <select name="teacherHoursWeek${rowsNumber}" id="teacherHoursWeek${rowsNumber}">
                <option value="Select Hours per Week">Seleccionar Distribución Semanal</option>
            </select>
        </td>
        <td class="selectCell">
            <select name="teacherClasses${rowsNumber}" id="teacherClasses${rowsNumber}">
                <option value="Select Class">Seleccionar Clase</option>
            </select>
        </td>
    </tr>
    `;

    finalRow.insertAdjacentHTML('beforebegin', newRow);

    setMainSelectors();
}

function removeTableRow() {
    if (rowsNumber > 1) {
        document.querySelector('#tableRow' + rowsNumber).remove();
        updateTotalHours();
        rowsNumber--;
    } else {
        console.error('¡No puedes hacer eso!');
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