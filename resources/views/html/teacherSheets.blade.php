<!DOCTYPE html>
<html lang="es-ES">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Horario de</title>

    <!-- Agrega Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">

    @vite(['resources/css/teacherSheetsStyle.css', 'resources/js/teachersSheet.js'])

</head>

<body>
    <header>
        <nav class="navbar navbar-expand-md">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="{{ asset('images/smallLogo.png') }}" alt="Logo del Majada Marcial">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#teachersNavbar" aria-controls="teachersNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="teachersNavbar">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>

                    <button id="profileBox">
                        <img src="{{ asset('images/defaultUserIcon.png') }}" alt="Icono de Perfil del Profesor" class="d-inline-block">
                        <span id="teachersName"></span>
                    </button>

                    <form id="logoutForm" class="blindfolded" action="{{ route('logout') }}" method="POST">
                        @csrf
                        <input type="submit" value="Cerrar sesión"></button>
                    </form>
                </div>
            </div>
        </nav>
    </header>

    <main>
        <div id="container" class="container my-4">
            <div>
                <div class="row" id="teacherDataBox">
                    <div class="col-md-6">
                        <h4 id="department">Departamento: <span class="teacherInlineData"></span></h4>
                    </div>
                    <div class="col-md-6 mt-1">
                        <h4 id="specialization">Especialización: <span class="teacherInlineData"></span></h4>
                    </div>
                    <div class="col-md-6 mt-1">
                        <h4 id="teacher">Docente: <span class="teacherInlineData"></span></h4>
                    </div>
                    <div class="col-md-6 mt-1 mb-4">
                        <h4 id="schoolYear">Curso: <span></span></h4>
                    </div>
                </div>

                <div class="table-responsive">
                    <table id="tableBox" class="table">
                        <thead>
                            <tr>
                                <th>Turno (M/T)</th>
                                <th>Curso y Ciclo</th>
                                <th>Módulo</th>
                                <th>Horas</th>
                                <th>Distribución Semanal</th>
                                <th>Aula/Taller</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr id="tableRow1">
                                <td id="turno1"></td>
                                <td id="curso1"></td>
                                <td class="selectCell">
                                    <select class="listadoDeModulos" name="teacherModules1" id="teacherModules1">
                                        <option value="Select Module">Seleccionar Modulo</option>
                                    </select>
                                </td>
                                <td id="horas1" class="horasPorModulo"></td>
                                <td class="selectCell">
                                    <select name="teacherHoursWeek1" id="teacherHoursWeek1">
                                    </select>
                                </td>
                                <td class="selectCell">
                                    <select name="teacherClasses1" id="teacherClasses1">
                                    </select>
                                </td>
                            </tr>

                            <tr id="totalRow">
                                <td colspan="2" class="blankCells"></td>
                                <td class="totalCell"><strong>Total:</strong></td>
                                <td id="totalCell"></td>
                                <td colspan="2" class="blankCells"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mainButtonsBox" id="principalButtonsBox">
                    <div class="w-100"></div>
                    <button id="downloadPDF" type="button" class="btn btn-warning">Descargar PDF</button>
                </div>

                <label for="teacherObservations">Observaciones: </label>
                <textarea name="teacherObservations" id="teacherObservations" rows="5" class="form-control">
                </textarea>
            </div>

            <div class="mainButtonsBox" id="teacherSendButtonBox">
            </div>
        </div>

        <div class="mainButtonsBox" id="departmentButtonsBox">
        </div>
    </main>

    <footer>
        <p>This work <span id="copyright">&#169</span> 2023 by Acoray Bueno Mejías y Víctor Lourenco González is
            licensed under
            <a href="http://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer">Attribution-NonCommercial-NoDerivatives
                4.0 International
                <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-nd.png" alt="Creative Commons License for Attribution, No Comercial Purposes and No Derivatives Works">
            </a>
        </p>

        <img src="{{ asset('images/wcag2.2AA.png') }}" alt="Web Content Accessibility Guidelines - Level AA Conformance">
    </footer>

    <!-- Agrega Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>