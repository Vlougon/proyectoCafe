<!DOCTYPE html>
<html lang="es-ES">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Jefatura de Estudio</title>

    <!-- Agrega Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">

    @vite(['resources/css/classRooms.css', 'resources/js/classRooms.js'])

</head>

<body>
    @include('partials.header')

    <main>
        <div class="container">
            <div class="table-responsive">
                <h2 class="text-center">Aulas del Turno de Mañana</h2>

                <table class="table table-light table-striped table-hover align-middle text-center mb-5 mt-2">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col" class="align-middle">Aulas</th>
                            <th scope="col" class="align-middle">Carga Horaria del Aula</th>
                            <th scope="col" class="align-middle">Turno</th>
                            <th scope="col" class="limitCell align-middle">No Supera el Límite de Horas (Máx. 30)</th>
                        </tr>
                    </thead>
                    <tbody id="morningBody" class="table-group-divider">
                    </tbody>
                </table>
            </div>

            <div class="table-responsive">
                <h2 class="text-center">Aulas del Turno de Tarde</h2>

                <table class="table table-light table-striped table-hover align-middle text-center mt-2">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col" class="align-middle">Aulas</th>
                            <th scope="col" class="align-middle">Carga Horaria del Aula</th>
                            <th scope="col" class="align-middle">Turno</th>
                            <th scope="col" class="limitCell align-middle">No Supera el Límite de Horas (Máx. 30)</th>
                        </tr>
                    </thead>
                    <tbody id="eveningBody" class="table-group-divider">
                    </tbody>
                </table>
            </div>
        </div>
    </main>

    @include('partials.footer')

    <!-- Agrega Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>