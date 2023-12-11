{{-- @vite(resources) --}}

<!DOCTYPE html>
<html lang="es-ES">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Inicio de Sesión</title>

    <link rel="shortcut icon" href='images/favicon.ico' type="image/x-icon">
    @vite(['resources/css/loginStyle.css', 'resources/js/login.js'])

</head>

<body>
    <header>
        <h1>INICIO DE SESIÓN</h1>
    </header>

    <main>
        <div id="container">
            <div id="imageContainer">
                <img src="images/logoMajada.png" alt="Logo del CIFP Majada Marcial">
            </div>

            <form id="professorsForm" method="POST">

                @csrf

                <div id="nameBox">
                    <span>
                        <svg viewBox="0 0 448 512" title="Icono de una Persona de Frente">
                            <path fill="#454545" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                        </svg>
                    </span>
                    <input type="email" name="email" id="email" placeholder="Usuario, NIF/NIE o CIAL" autocomplete="on">
                </div>

                <div id="passwordBox">
                    <span>
                        <svg viewBox="0 0 448 512" title="Icono de un Candado Cerrado">
                            <path fill="#454545" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                        </svg>
                    </span>
                    <input type="password" name="password" id="password" placeholder="Contraseña" autocomplete="off">
                </div>

                <button type="submit" id="submitBox" name="Botón para Iniciar Sesión">
                    <svg viewBox="0 0 512 512" title="Icono de Incio de Sesión">
                        <path fill="#ffffff" d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                    </svg>
                    <span>Conectar</span>
                </button>
            </form>
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

        <img src="/images/wcag2.2AA.png" alt="Web Content Accessibility Guidelines - Level AA Conformance">
    </footer>
</body>

</html>