<!DOCTYPE html>
<html lang="es-ES">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Jefatura de Estudio</title>

    <!-- Agrega Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="shortcut icon" href="../images/favicon.ico" type="image/x-icon">

    @vite(['resources/css/managerStudy.css', 'resources/js/managerStudy.js'])

</head>

<body>
    @include('partials.header')

    <main>
        <div id="container" class="container-fluid text-center">
            <h1>Listado de Departamentos</h1>
        </div>
    </main>

    @include('partials.footer')

    <!-- Agrega Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>