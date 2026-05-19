let arrayHobbies = [];

function agregar(event) {
    if (event) event.preventDefault(); 

    const input = document.getElementById("hobby");
    const divError = document.getElementById("hobby-msg");
    const hobby = input.value.trim();

    if (hobby === "") {
        divError.innerText = "Por favor, escribe una afición antes de agregar.";
        divError.className = "form-text text-danger";
        return;
    }

    if (hobby.length < 3) {
        divError.innerText = "El nombre de la afición es demasiado corto (mínimo 3 letras).";
        divError.className = "form-text text-danger";
        return;
    }

    let tieneLetras = false;
    for (let i = 0; i < hobby.length; i++) {
        const codigo = hobby.charCodeAt(i);
        if ((codigo >= 65 && codigo <= 90) || (codigo >= 97 && codigo <= 122) || codigo === 241 || codigo === 209) {
            tieneLetras = true;
            break;
        }
    }

    if (!tieneLetras) {
        divError.innerText = "Una afición debe contener letras (no se permiten solo números o símbolos).";
        divError.className = "form-text text-danger";
        return;
    }

    arrayHobbies.push(hobby);
    actualizarListaDOM();
    input.value = "";
    validarHobbies(); 
}

function eliminarHobby(index) {
    arrayHobbies.splice(index, 1);
    actualizarListaDOM();
    validarHobbies();
}


function actualizarListaDOM() {
    const ul = document.getElementById("hobby-list");
    ul.innerHTML = ""; 

    for (let i = 0; i < arrayHobbies.length; i++) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center bg-white border animate-fade";
        li.innerText = arrayHobbies[i];
        const btnEliminar = document.createElement("button");
        btnEliminar.type = "button";
        btnEliminar.className = "btn btn-danger btn-sm rounded-pill py-0 px-2";
        btnEliminar.innerText = "✕";
        btnEliminar.onclick = function() { eliminarHobby(i); };

        li.appendChild(btnEliminar);
        ul.appendChild(li);
    }
}

function validar(event) {
    const uValid = validarUsername();
    const pValid = validarPassword();
    const cValid = validarConfirmacion();
    const dValid = validarDireccion();
    const mValid = validarComuna();
    const tValid = validarTelefono();
    const wValid = validarWeb();
    const hValid = validarHobbies();
    if (!(uValid && pValid && cValid && dValid && mValid && tValid && wValid && hValid)) {
        if (event) event.preventDefault();
        return false;
    }
    const datosUsuario = {
        username: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value,
        direccion: document.getElementById("direccion").value.trim(),
        comuna: document.getElementById("comuna").value,
        telefono: document.getElementById("telefono").value.trim(),
        web: document.getElementById("web").value.trim() || "No informada",
        aficiones: [...arrayHobbies]
    };

    console.log("Estructura de datos construida con éxito:", datosUsuario);
    alert("¡Registro validado e内部 procesado!");
    return true;
}


function validarUsername() {
    const input = document.getElementById("username");
    const div = document.getElementById("username-msg");
    const username = input.value.trim();

    if (username === "") {
        div.innerText = "El nombre de usuario es requerido.";
        div.className = "form-text text-danger";
        return false;
    }
    if (username.length < 5 || username.length > 10) {
        div.innerText = "Debe tener entre 5 y 10 caracteres.";
        div.className = "form-text text-danger";
        return false;
    }

    const primeraLetra = username.charCodeAt(0);
    const esLetraInicial = (primeraLetra >= 65 && primeraLetra <= 90) || (primeraLetra >= 97 && primeraLetra <= 122);
    if (!esLetraInicial) {
        div.innerText = "Debe comenzar con una letra.";
        div.className = "form-text text-danger";
        return false;
    }

    let digitoEncontrado = false;

    for (let i = 0; i < username.length; i++) {
        const codigo = username.charCodeAt(i);
        const esLetra = (codigo >= 65 && codigo <= 90) || (codigo >= 97 && codigo <= 122);
        const esNumero = (codigo >= 48 && codigo <= 57);

        if (!esLetra && !esNumero) {
            div.innerText = "No se permiten símbolos, espacios ni acentos.";
            div.className = "form-text text-danger";
            return false;
        }

        if (esNumero) {
            digitoEncontrado = true;
        }

        if (digitoEncontrado && esLetra) {
            div.innerText = "Los números solo se permiten al final.";
            div.className = "form-text text-danger";
            return false;
        }
    }

    div.innerText = "Nombre de usuario válido.";
    div.className = "form-text text-success";
    return true;
}

function validarPassword() {
    const input = document.getElementById("password");
    const div = document.getElementById("password-msg");
    const password = input.value;
    const username = document.getElementById("username").value.trim();

    if (password === "") {
        div.innerText = "La contraseña es requerida.";
        div.className = "form-text text-danger";
        return false;
    }
    if (password.length < 3 || password.length > 6) {
        div.innerText = "La longitud debe ser de 3 a 6 caracteres.";
        div.className = "form-text text-danger";
        return false;
    }

    let contieneLetra = false;
    let contieneNumero = false;

    for (let i = 0; i < password.length; i++) {
        const codigo = password.charCodeAt(i);
        if ((codigo >= 65 && codigo <= 90) || (codigo >= 97 && codigo <= 122)) contieneLetra = true;
        if (codigo >= 48 && codigo <= 57) contieneNumero = true;
    }

    if (!contieneLetra || !contieneNumero) {
        div.innerText = "Debe incluir letras y números combinados.";
        div.className = "form-text text-danger";
        return false;
    }

    if (username !== "") {
        const usernameMinuscula = username.toLowerCase();
        const passwordMinuscula = password.toLowerCase();
        let raizUsuario = "";
        for (let i = 0; i < usernameMinuscula.length; i++) {
            const codigo = usernameMinuscula.charCodeAt(i);
            if (codigo >= 97 && codigo <= 122) {
                raizUsuario += usernameMinuscula[i];
            } else {
                break; 
            }
        }

        let raizPassword = "";
        for (let i = 0; i < passwordMinuscula.length; i++) {
            const codigo = passwordMinuscula.charCodeAt(i);
            if (codigo >= 97 && codigo <= 122) {
                raizPassword += passwordMinuscula[i];
            } else {
                break;
            }
        }
        const contieneRaizEntera = passwordMinuscula.includes(raizUsuario);
        let coincidenPrimerasLetras = false;
        if (raizUsuario.length >= 3 && raizPassword.length >= 3) {
            const subRaizUsuario = raizUsuario.slice(0, 3);   
            const subRaizPassword = raizPassword.slice(0, 3); 
            if (subRaizUsuario === subRaizPassword) {
                coincidenPrimerasLetras = true;
            }
        }

        if (contieneRaizEntera || coincidenPrimerasLetras) {
            div.innerText = "No puede contener el nombre de usuario.";
            div.className = "form-text text-danger";
            return false;
        }
    }

    div.innerText = "Contraseña válida.";
    div.className = "form-text text-success";
    return true;
}

function validarConfirmacion() {
    const password = document.getElementById("password").value;
    const rePassword = document.getElementById("re-password").value;
    const div = document.getElementById("re-password-msg");

    if (rePassword === "") {
        div.innerText = "La verificación de contraseña es necesaria.";
        div.className = "form-text text-danger";
        return false;
    }
    if (password !== rePassword) {
        div.innerText = "Las contraseñas no coinciden.";
        div.className = "form-text text-danger";
        return false;
    }

    div.innerText = "Verificación completada con éxito.";
    div.className = "form-text text-success";
    return true;
}

function validarDireccion() {
    const direccion = document.getElementById("direccion").value.trim();
    const div = document.getElementById("direccion-msg");

    if (direccion === "") {
        div.innerText = "El domicilio es obligatorio.";
        div.className = "form-text text-danger";
        return false;
    }
    div.innerText = "Dirección agregada.";
    div.className = "form-text text-success";
    return true;
}

function validarComuna() {
    const comuna = document.getElementById("comuna").value;
    const div = document.getElementById("comuna-msg");

    if (comuna === "") {
        div.innerText = "Seleccione una comuna.";
        div.className = "form-text text-danger";
        return false;
    }
    div.innerText = "Comuna agregada.";
    div.className = "form-text text-success";
    return true;
}

function validarTelefono() {
    const telefono = document.getElementById("telefono").value.trim();
    const div = document.getElementById("telefono-msg");

    if (telefono === "") {
        div.innerText = "El número telefónico es obligatorio.";
        div.className = "form-text text-danger";
        return false;
    }
    if (telefono.length !== 9) {
        div.innerText = "Debe contener 9 dígitos.";
        div.className = "form-text text-danger";
        return false;
    }

    for (let i = 0; i < telefono.length; i++) {
        const codigo = telefono.charCodeAt(i);
        if (!(codigo >= 48 && codigo <= 57)) {
            div.innerText = "Solo se procesan caracteres numéricos.";
            div.className = "form-text text-danger";
            return false;
        }
    }

    div.innerText = "Formato de teléfono correcto.";
    div.className = "form-text text-success";
    return true;
}

function validarWeb() {
    const web = document.getElementById("web").value.trim();
    const div = document.getElementById("web-msg");

    if (web === "") {
        div.innerText = ""; 
        return true;
    }

    const inicioHttps = web.slice(0, 8) === "https://";
    const inicioHttp = web.slice(0, 7) === "http://";

    if (!inicioHttps && !inicioHttp) {
        div.innerText = "Formato inválido. Debe anteponer http:// o https://";
        div.className = "form-text text-danger";
        return false;
    }

    const inicioDominio = inicioHttps ? 8 : 7;
    const dominio = web.slice(inicioDominio);

    let posicionUltimoPunto = -1;
    for (let i = 0; i < dominio.length; i++) {
        if (dominio.charCodeAt(i) === 46) { 
            posicionUltimoPunto = i;
        }
    }
    if (posicionUltimoPunto === -1) {
        div.innerText = "La URL debe contener un dominio válido (ej: .com o .cl).";
        div.className = "form-text text-danger";
        return false;
    }
    const caracteresDespuesDelPunto = dominio.length - 1 - posicionUltimoPunto;
    if (caracteresDespuesDelPunto < 2) {
        div.innerText = "Estructura de dominio incompleta (ej: .cl o .com).";
        div.className = "form-text text-danger";
        return false;
    }

    div.innerText = "Estructura de enlace válida.";
    div.className = "form-text text-success";
    return true;
}

function validarHobbies() {
    const div = document.getElementById("hobby-msg");

    if (arrayHobbies.length < 2) {
        div.innerText = `Llevas ${arrayHobbies.length}/2 aficiones. Complete el mínimo requerido.`;
        div.className = "form-text text-danger";
        return false;
    }

    div.innerText = `Mínimo alcanzado (${arrayHobbies.length} aficiones).`;
    div.className = "form-text text-success";
    return true;
}

function limpiarFormulario() {
    arrayHobbies = [];
    actualizarListaDOM();
    
    const mensajes = ["username-msg", "password-msg", "re-password-msg", "direccion-msg", "comuna-msg", "telefono-msg", "web-msg", "hobby-msg"];
    mensajes.forEach(id => {
        const div = document.getElementById(id);
        if (div) {
            div.innerText = "";
            div.className = "form-text";
        }
    });
}

function togglePassword(idInput, idBoton) {
    const input = document.getElementById(idInput);
    const boton = document.getElementById(idBoton);

    if (input.type === "password") {
        input.type = "text";
        boton.innerText = "Ocultar"; 
    } else {
        input.type = "password";
        boton.innerText = "Ver"; 
    }
    input.focus(); 
}
