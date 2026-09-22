// Importa los estilos CSS del proyecto.
import './style.css';

// Obtiene el campo donde se escribe la contraseña.
const contraseña = document.querySelector("#contraseña");

// Obtiene el elemento donde se mostrará el nivel de seguridad.
const salida = document.querySelector("#salida");

// Obtiene el elemento de la barra de progreso.
const progreso = document.querySelector("#progreso");

// Obtiene el botón para generar la contraseña.
const generar = document.querySelector("#generar");

// Ejecuta la función cada vez que cambia la contraseña.
contraseña.addEventListener("input", actualizarSeguridad);

// Ejecuta la función al hacer clic en el botón de generar contraseña.
generar.addEventListener("click", generarContraseña);

// Comprueba la seguridad de la contraseña escrita.
function actualizarSeguridad(event) {
    // Obtiene el texto introducido en el campo.
    const contraseña = event.target.value;

    // Suma un punto por cada condición cumplida:
    // - Tener al menos 8 caracteres.
    // - Contener una letra mayúscula.
    // - Contener una letra minúscula.
    // - Contener un número.
    // - Contener un símbolo.
    //
    // Number(true) devuelve 1 y Number(false) devuelve 0.
    const puntos =
        Number(contraseña.length >= 8) +
        Number(/[A-Z]/.test(contraseña)) +
        Number(/[a-z]/.test(contraseña)) +
        Number(/[0-9]/.test(contraseña)) +
        Number(/[^A-Za-z0-9]/.test(contraseña));

    // Actualiza la barra de progreso.
    progreso.style.width = `${puntos * 20}%`;

    // Elimina el color anterior del texto
    salida.className = "";

    if (contraseña === "") {
        salida.textContent = "";
        progreso.style.width = "0%";
        progreso.style.backgroundColor = "";
        return;
    }
    // Si consigue entre 0 y 2 puntos, la contraseña es débil.
    if (puntos <= 2) {
        salida.textContent = "Débil";
        salida.classList.add("debil");
        progreso.style.backgroundColor = "red";

    // Si consigue entre 3 y 4 puntos, la contraseña es media.
    } else if (puntos <= 4) {
        salida.textContent = "Media";
        salida.classList.add("media");
        progreso.style.backgroundColor = "orange";

    // Si consigue 5 puntos, la contraseña es fuerte.
    } else {
        salida.textContent = "Fuerte";
        salida.classList.add("fuerte");
        progreso.style.backgroundColor = "green";
    }
}

function generarContraseña() {
    // Genera una contraseña aleatoria que cumpla con las condiciones de seguridad.
    const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const minusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const simbolos = "!@#$%^&*()_+[]{}|;:,.<>?";

    //Une todos los caracteres disponibles
    const caracteres = mayusculas + minusculas + numeros + simbolos;

    // Asegura que la contraseña tenga al menos un carácter de cada tipo.
    let nuevaContraseña = 
    obtenerCaracter(mayusculas) +
    obtenerCaracter(minusculas) +
    obtenerCaracter(numeros) +
    obtenerCaracter(simbolos);

    // Rellena el resto de la contraseña con caracteres aleatorios
    while (nuevaContraseña.length < 12) {
        nuevaContraseña += obtenerCaracter(caracteres);
    }

    // Coloca la contraseña generada en el campo de entrada correspondiente.
    contraseña.value = nuevaContraseña;

    // Actualiza la seguridad de la contraseña generada.
    actualizarSeguridad({ target: contraseña });
}

// Obtiene un carácter aleatorio de la cadena proporcionada.
function obtenerCaracter(caracteres) {

    // Genera una posición aleatoria dentro de la cadena de caracteres.
    const posicion = Math.floor(Math.random() * caracteres.length);

    // Devuelve el carácter en la posición aleatoria generada.
    return caracteres[posicion];
}