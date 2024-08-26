import { getUsers } from "../services/getUsers";
import { postUsers } from "../services/postUsers";

const username = document.getElementById("username");
const psw = document.getElementById("psw");
const email = document.getElementById("email");
const cedula = document.getElementById("cedula");
const signUp = document.getElementById("btnSignUp");

// Obtiene los elementos de los modales
const successModal = document.getElementById("successModal");
const errorModal = document.getElementById("errorModal");
const successConfirm = document.getElementById("successConfirm");
const closeError = document.getElementById("closeError");

console.log(successConfirm);

// Función para mostrar el modal de éxito
function showSuccessModal(message) {
    const modalContent = successModal.querySelector("p");
    modalContent.textContent = message;
    successModal.style.display = "block";
}

// Función para mostrar el modal de error
function showErrorModal(message) {
    const modalContent = errorModal.querySelector("p");
    modalContent.textContent = message;
    errorModal.style.display = "block";
}

// Cierra el modal de éxito


successConfirm.addEventListener("click", () => {
    successModal.style.display = "none";
    window.location.href = "index.html";  // Redirige al usuario a la página de inicio de sesión
});

// Cierra el modal de error
closeError.addEventListener("click", () => {
    errorModal.style.display = "none";
});

signUp.addEventListener("click", async function () {
    try {
        // Obtiene la lista de usuarios registrados
        const userDatabase = await getUsers();
        let isDuplicate = false;  // Variable para verificar si los datos ya existen

        // Recorre la lista de usuarios para comprobar duplicados
        for (let index = 0; index < userDatabase.length; index++) {
            const data = userDatabase[index];

            // Verifica si los datos del nuevo usuario ya existen en la base de datos
            if (data.email === email.value || 
                data.username === username.value || 
                data.cedula === cedula.value) {
                isDuplicate = true;  // Marca que los datos están duplicados
                break;  // Sale del bucle si encuentra un duplicado
            }
        }

        if (isDuplicate) {
            // Muestra un mensaje de error si los datos ya existen
            showErrorModal("Datos repetidos. Por favor, use otro email, nombre de usuario o cédula.");
        } else {
            // Si los datos no están duplicados, registra al nuevo usuario
            await postUsers(email.value, username.value,cedula.value, psw.value);
            // Muestra un mensaje de éxito
            showSuccessModal("Datos creados exitosamente. Ahora puedes iniciar sesión.");
        }
    } catch (error) {
        // Captura y muestra un error si ocurre durante el proceso de registro
        console.error("Error al registrar el usuario:", error);
        showErrorModal("Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.");
    }
});
