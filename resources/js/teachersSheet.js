let modules = [];
let currentAcademicYear = `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`;
let schoolYear = document.querySelector('#schoolYear span');
let finalRow = document.querySelector('#totalRow');
let addRowButton = document.querySelector('#addRow');

window.addEventListener('load', setCurrentAcademicYear);
window.addEventListener('load', getModulesBySpeciality);

addRowButton.addEventListener('click', addTableRow);

function setCurrentAcademicYear() {
    schoolYear.textContent = currentAcademicYear;
}

async function getModulesBySpeciality() {
    // await fetch('http://proyectocafe.test/api/V1/modulos')
    // .then(respuesta => respuesta.json())
    // .then(datos => console.log(datos))
    // .catch(console.log('Error al Llamar a la API'));
    console.log();
}

function addTableRow() {
    const newRow = `
    <tr>
        <td></td>
        <td></td>
        <td class="selectCell">
                <select name="teacherModules" id="teacherModules">
                <option value="Select Module">Seleccionar Modulo</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </td>
        <td></td>
        <td class="selectCell">
                <select name="teacherHoursWeek" id="teacherHoursWeek">
                <option value="Select Hours per Week">Seleccionar Distribución Semanal</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </td>
        <td class="selectCell">
            <select name="teacherClasses" id="teacherClasses">
                <option value="Select Class">Seleccionar Clase</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </td>
    </tr>
    `;

    finalRow.insertAdjacentHTML('beforebegin', newRow);
}