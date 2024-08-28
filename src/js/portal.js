import { getConsultas } from '../services/getConsultas';
import { postConsultas } from '../services/postConsultas';
import { putConsultas } from '../services/putConsultas'; 
import { deleteConsultas } from '../services/deleteConsultas'; 

// Elementos del DOM
const incidentInput = document.getElementById("incident");
const incidentDetailsInput = document.getElementById("incidentDetails");
const createTicketBtn = document.getElementById("createTicketBtn");
const consultasContainer = document.getElementById('consultasContainer');

// Función para mostrar las consultas en el contenedor
async function displayConsultas() {
    const consultas = await getConsultas();
    consultasContainer.innerHTML = ''; // inicia el contenedor 0

    consultas.forEach(consulta => {
        // Crear elementos
        const consultaElement = document.createElement('div');
        consultaElement.className = 'consulta';
        consultaElement.dataset.id = consulta.id;

        const consultaTitle = document.createElement('h3');
        consultaTitle.textContent = consulta.incident;

        const consultaDetails = document.createElement('p');
        consultaDetails.textContent = consulta.incidentDetails;

        const consultaTimestamp = document.createElement('small');
        consultaTimestamp.textContent = new Date(consulta.timestamp).toLocaleString();

        // Botón de edición
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.className = 'edit-btn';
        editBtn.onclick = () => showEditForm(consulta, consultaElement);

        // Botón de eliminación
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => handleDelete(consulta.id);
        
        // Añadir los elementos al contenedor principal
        consultaElement.appendChild(consultaTitle);
        consultaElement.appendChild(consultaDetails);
        consultaElement.appendChild(consultaTimestamp);
        consultaElement.appendChild(editBtn);
        consultaElement.appendChild(deleteBtn);

        consultasContainer.appendChild(consultaElement);
    });
}

// Función para mostrar el formulario de edición
function showEditForm(consulta, consultaElement) {
    // Elimina cualquier formulario de edición previo
    const existingEditForm = document.querySelector('.edit-form');
    if (existingEditForm) {
        existingEditForm.remove();
    }

    // Crear y mostrar el formulario de edición
    const editForm = document.createElement('div');
    editForm.className = 'edit-form';

    const editIncidentInput = document.createElement('input');
    editIncidentInput.type = 'text';
    editIncidentInput.value = consulta.incident;
    editIncidentInput.placeholder = 'Razón de la consulta';

    const editDetailsInput = document.createElement('input');
    editDetailsInput.type = 'text';
    editDetailsInput.value = consulta.incidentDetails;
    editDetailsInput.placeholder = 'Descripción de la consulta';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Guardar Cambios';
    saveBtn.onclick = () => handleEdit(consulta.id, editIncidentInput.value, editDetailsInput.value, consulta.timestamp);

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancelar';
    cancelBtn.onclick = () => editForm.remove();

    editForm.appendChild(editIncidentInput);
    editForm.appendChild(editDetailsInput);
    editForm.appendChild(saveBtn);
    editForm.appendChild(cancelBtn);

    // Inserta el formulario de edición en el contenedor del elemento de consulta
    consultaElement.appendChild(editForm);
}

async function handleEdit(id, incident, incidentDetails, timestamp) {
    try {
        const updatedData = {
            incident,
            incidentDetails,
            timestamp // Mantén el timestamp original
        };

        const result = await putConsultas(id, updatedData);

        console.log('Consulta actualizada:', result); // Para depuración

        displayConsultas(); // Actualiza la lista de consultas después de la edición
    } catch (error) {
        console.error('Error al editar la consulta:', error);
        alert('No se pudo actualizar la consulta. Inténtalo de nuevo.');
    }
}


async function handleDelete(id) {
    if (confirm('¿vas a borrar la consulta?')) {
        await deleteConsultas(id);
        displayConsultas();
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
