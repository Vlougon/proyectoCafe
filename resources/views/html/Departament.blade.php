<!DOCTYPE html>
<html lang="es-ES">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Departamentos</title>

    <!-- Agrega Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="shortcut icon" href="../images/favicon.ico" type="image/x-icon">
    @vite(['resources/css/teacherSheetsStyle.css', 'resources/js/departament.js'])

</head>

<body>
    @include('partials.header')

    <main>
        <div id="container" class="container my-4">
            <main>
                <div id="departmentContainer" class="container my-4">
                    <!-- TiTle -->
                    <div class="row text-center my-4">
                        <h3>Departamento de <span id="NombreDepartamennto">(Nombre del Departamento)</span></h3>
                    </div>
                    <!-- Card para Departamento  -->
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 g-4">
                        <div class="col">
                            <div class="card">
                                <div class="card-body">
                                    <img src="../images/defaultUserIcon.png" alt="Icono de Perfil del Profesor" class="d-inline-block">
                                    <h5 class="card-title">Profesor: <span id="NombreProfesor">Nombre del Profesor</span></h5>
                                    <p class="card-text">Especialidad: <span id="EspecialidadProfesor">Especialidad del Profesor</span></p>
                                    <p class="card-text">Horas Totales: <span id="HorasProfesor">Horas</span></p>
                                    <a href="#" class="btn btn-primary mt-2 mt-md-0">Ver</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div class="mainButtonsBox">
                <button id="sendSchedule" type="button" class="btn btn-dark">Finalizar Departamentos</button>
            </div>
        </div>
    </main>

    @include('partials.footer')

    <!-- Agrega Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>