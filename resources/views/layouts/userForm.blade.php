<!DOCTYPE html>
<html lang="es-ES">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Dashboard</title>

    <!-- Agrega Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">

    @vite(['resources/css/userForm.css', 'resources/js/userForm.js'])

</head>

<body>
    <main class="mb-3 m-lg-0">
        <div class="container-fluid">
            <div class="row">
                <div id="lateralBox" class="col-12 col-lg-2">
                    <div id="generalData" class="row mb-2 mb-lg-4">
                        <div class="col-12 text-center">
                            <a class="navbar-brand" href="#">
                                <img src="{{ asset('images/smallLogo.png') }}" alt="Logo del Majada Marcial">
                            </a>
                        </div>

                        <div class="col-12 mt-2">
                            <button id="profileBox" name="Perfil de Usuario">
                                <img src="{{ asset('images/defaultUserIcon.png') }}" alt="Icono de Perfil del Profesor" class="d-inline-block d-lg-block">
                                <span id="teachersName"></span>
                            </button>

                            <form id="logoutForm" class="blindfolded" action="{{ route('logout') }}" method="POST">
                                @csrf
                                <input type="submit" value="Cerrar sesión"></button>
                            </form>
                        </div>

                        <div class="col-12 text-center">
                            <a id="backToScheduleButton" class="btn btn-light mt-2">Atrás</a>
                        </div>
                    </div>
                </div>

                <div id="userFormBox" class="col-10 col-lg-9 mt-lg-3">
                    <form class="my-auto">
                        <div class="mb-3">
                            <label for="name" class="form-label">Nombre del Profesor:</label>
                            <input type="text" class="form-control" id="name" autocomplete="off" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email del Profesor:</label>
                            <input type="email" class="form-control" id="email" autocomplete="off" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Contraseña del Profesor:</label>
                            <input type="password" class="form-control" id="password" autocomplete="off" required>
                        </div>
                        <div class="mb-3">
                            <label for="rol" class="form-label">Rol que Ocupa:</label>
                            <select class="form-select" name="rol" id="rol">
                                <option value="teacher">Profesor</option>
                                <option value="head_of_department">Jefe/a de Departamento</option>
                                <option value="study_manager">Jefe/a de Estudio</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="especialidad_id" class="form-label">Especialidad del Profesor (ID):</label>
                            <input type="number" class="form-control" id="especialidad_id" autocomplete="off" required>
                        </div>
                        <div class="mb-3">
                            <label for="departamento_id" class="form-label">Departamento al que Pertence (ID):</label>
                            <input type="number" class="form-control" id="departamento_id" autocomplete="off" required>
                        </div>
                        <button id="submitButton" type="submit" class="btn btn-primary"></button>
                    </form>
                </div>
            </div>
        </div>
    </main>

    <!-- Agrega Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>