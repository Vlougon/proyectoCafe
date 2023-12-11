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
    <header>
        <nav class="navbar navbar-expand-md">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="../images/smallLogo.png" alt="Logo del Majada Marcial">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#teachersNavbar"
                    aria-controls="teachersNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="teachersNavbar">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Mi Horario</a>
                        </li>
                    </ul>
                    <button id="profileBox">
                        <img src="../images/defaultUserIcon.png" alt="Icono de Perfil del Profesor"
                            class="d-inline-block">
                        <span id="NombreProfesor">Nombre Profesor</span>
                    </button>
                </div>
            </div>
        </nav>
    </header>

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
                                    <img src="../images/defaultUserIcon.png" alt="Icono de Perfil del Profesor"
                                        class="d-inline-block">
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

    <footer>
        <p>This work <span id="copyright">&#169</span> 2023 by Acoray Bueno Mejías y Víctor Lourenco González is
            licensed under
            <a href="http://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" target="_blank"
                rel="license noopener noreferrer">Attribution-NonCommercial-NoDerivatives
                4.0 International
                <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-nd.png"
                    alt="Creative Commons License for Attribution, No Comercial Purposes and No Derivatives Works">
            </a>
        </p>

        <img src="../images/wcag2.2AA.png" alt="Web Content Accessibility Guidelines - Level AA Conformance">
    </footer>

    <!-- Agrega Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>