<!DOCTYPE html>
<html lang="es-ES">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Dashboard</title>

    <!-- Agrega Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">

    @vite(['resources/css/dashboard.css', 'resources/js/dashboard.js'])

</head>

<body>
    <main class="mb-3 m-lg-0">
        <div class="container-fluid">
            <div class="row">
                <div id="lateralBox" class="col-12 col-lg-3">
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
                            <a id="backToScheduleButton" class="btn btn-light mt-2">Mi Horario</a>
                        </div>
                    </div>

                    <div id="modelsList" class="row justify-content-center justify-content-lg-end">
                        <div class="col-auto col-lg-12 mx-1 my-2 m-lg-0">
                            Usuarios
                        </div>
                    </div>
                </div>

                <div id="userTable" class="col-12 col-lg-9 mt-lg-5">
                    <div class="text-center">
                        <div class="table-responsive">
                            <table id="tableBox" class="table table-striped table-hover table-bordered border-dark text-center">
                                <thead class="table-dark">
                                    <tr>
                                        <th class="align-middle">Nombre</th>
                                        <th class="align-middle">Email</th>
                                        <th class="align-middle">Rol</th>
                                        <th class="align-middle">Especialidad</th>
                                        <th class="align-middle">Departamento</th>
                                        <th class="align-middle">Editar</th>
                                        <th class="align-middle">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody id="usersTableBody">

                                </tbody>
                            </table>
                        </div>
                        <a id="createUserButton" class="btn btn-primary mt-2">Crear Usuario</a>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Agrega Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>