import { getConsultas } from '../services/getConsultas';
import { postConsultas } from '../services/postConsultas';

// Elementos del DOM
const incidentInput = document.getElementById("incident");
const incidentDetailsInput = document.getElementById("incidentDetails");
const createTicketBtn = document.getElementById("createTicketBtn");
const consultasContainer = document.getElementById('consultasContainer');

// Función para mostrar las consultas en el contenedor
async function displayConsultas() {
    const consultas = await getConsultas();
    consultasContainer.innerHTML = ''; // inicia el contenedor 0

    for (let i = 0; i < consultas.length; i++) {
        const consulta = consultas[i];

        // Crear elementos de manera básica
        const consultaElement = document.createElement('div');
        consultaElement.className = 'consulta';

        const consultaTitle = document.createElement('h3');
        consultaTitle.textContent = consulta.incident;

        const consultaDetails = document.createElement('p');
        consultaDetails.textContent = consulta.incidentDetails;

        const consultaTimestamp = document.createElement('small');
        consultaTimestamp.textContent = new Date(consulta.timestamp).toLocaleString();

        // Añadir los elementos al contenedor principal
        consultaElement.appendChild(consultaTitle);
        consultaElement.appendChild(consultaDetails);
        consultaElement.appendChild(consultaTimestamp);

        consultasContainer.appendChild(consultaElement);
    }
}

// Evento para crear una nueva consulta
createTicketBtn.addEventListener("click", async function () {
    const incident = incidentInput.value;
    const incidentDetails = incidentDetailsInput.value;

    if (incident && incidentDetails) {
        // Crear nueva consulta y enviarla al servidor
        await postConsultas({
            incident: incident,
            incidentDetails: incidentDetails,
            timestamp: new Date().toISOString()
        });

        // Limpiar los campos de entrada después de enviar
        incidentInput.value = '';
        incidentDetailsInput.value = '';

        // Mostrar las consultas actualizadas
        displayConsultas();
    }
});

// Mostrar las consultas al cargar la página
displayConsultas();
