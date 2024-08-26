import { getUsers } from "../services/getUsers";

document.addEventListener("DOMContentLoaded", () => {
    const psw = document.getElementById("psw");
    const email = document.getElementById("email");
    const cedula = document.getElementById("cedula");
    const btnLogin = document.getElementById("btnLogin");
    const btnSignUp = document.getElementById("btnSignUp");

    // Función para mostrar el modal de error
    function showErrorModal(message) {
        const errorModal = document.getElementById('errorModal');
        const errorModalMessage = errorModal.querySelector('p');
        errorModalMessage.textContent = message;
        errorModal.style.display = 'block';
    }

    // Función para ocultar el modal de error
    function hideErrorModal() {
        const errorModal = document.getElementById('errorModal');
        errorModal.style.display = 'none';
    }

    // Evento para el botón de inicio de sesión
    btnLogin.addEventListener("click", async function () {
        const userDatabase = await getUsers(); // Obtener la base de datos de usuarios
        let userknow = false;

        // Verificar las credenciales del usuario
        for (let index = 0; index < userDatabase.length; index++) {
            const data = userDatabase[index];
            if (data.email === email.value && data.cedula === cedula.value && data.psw === psw.value) {
                userknow = true;
                break;
            }
        }

        // Redirigir si las credenciales son correctas, o mostrar el modal de error si no lo son
        if (userknow) {
            window.location.href = "./portal.html";
        } else {
            showErrorModal("Nombre de usuario o contraseña incorrectos");
        }
    });

    // Evento para el botón de registro
    btnSignUp.addEventListener("click", () => {
        window.location.href = "sign_up.html";
    });

    // Eventos para cerrar el modal de error
    const closeErrorModal = document.getElementById('closeErrorModal');
    const closeErrorButton = document.getElementById('closeError');

    closeErrorModal.addEventListener('click', hideErrorModal);
    closeErrorButton.addEventListener('click', hideErrorModal);

    // Cerrar el modal de error cuando se hace clic fuera de él
    window.addEventListener('click', function(event) {
        const errorModal = document.getElementById('errorModal');
        if (event.target === errorModal) {
            hideErrorModal();
        }
    });
});

const btnSignUp = document.getElementById("btnSignUp");
document.addEventListener("DOMContentLoaded", () => {
    const psw = document.getElementById("psw");
    const email = document.getElementById("email");
    const cedula = document.getElementById("cedula");
    const btnLogin = document.getElementById("btnLogin");

        
    btnLogin.addEventListener("click", async function () {
    const userDatabase = await getUsers()
        let userknow = false;

        for (let index = 0; index < userDatabase .length; index++) {
            const data = userDatabase [index]; 

            if (data.email === email.value && data.cedula === cedula.value &&  data.psw === psw.value) {
                userknow = true;
                break;
            }
        }  

        if (userknow) {
            window.location.href= "./portal.html";
        } else {
        showErrorModal("User name or password incorrect");
        }
    });

    btnSignUp.addEventListener("click", () => {
    window.location.href = "sign_up.html";
    });
});