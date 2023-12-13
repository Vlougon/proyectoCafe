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
        
            <div>
                <!-- TiTle -->
                <div class="row text-center my-4">
                    <h3 id="header">Departamento de <span id="NombreDepartamennto">(Nombre del Departamento)</span></h3>
                </div>
                <div id="departmentContainer" class="container my-4">
                </div>

            <div class="mainButtonsBox">
                <button id="sendSchedule" type="button" class="btn btn-dark">Finalizar Departamentos</button>
            </div>
    </main>

    @include('partials.footer')

    <!-- Agrega Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>