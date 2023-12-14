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
    @include('partials.header')

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
                    <button id="downloadPDF" type="button" class="btn btn-warning" name="Botón para Descargar el Horario en PDF">Descargar PDF</button>
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

    @include('partials.footer')

    <!-- Agrega Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>