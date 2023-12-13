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