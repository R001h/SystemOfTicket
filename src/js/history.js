import { gethistoryConsultas } from '../services/getDetallesConsultas';

// Elementos del DOM
const consultasContainer = document.getElementById('consultasContainer');
const searchInput = document.getElementById('searchInput'); // Para búsqueda

<!-- Botón para redirigir a la página consultas -->
        <section class="navigation">
            <button onclick="window.location.href='../portal.html'">Volver Consultas...</button>
        </section>

// Función para mapear consultas a elementos DOM
function mapConsultas(consultas) {
    return consultas.map(consulta => ({
        id: consulta.id,
        title: consulta.incident,
        details: consulta.incidentDetails,
        timestamp: new Date(consulta.timestamp).toLocaleString(),
        status: consulta.estado
    }));
}

// Función para filtrar consultas basadas en un término de búsqueda
function filterConsultas(consultas, searchTerm) {
    if (!searchTerm) return consultas;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return consultas.filter(consulta =>
        consulta.incident.toLowerCase().includes(lowerCaseSearchTerm) ||
        consulta.incidentDetails.toLowerCase().includes(lowerCaseSearchTerm)
    );
}

// Función para mostrar el historial de consultas
async function displayHistory(searchTerm = '') {
    try {
        const history = await gethistoryConsultas();
        const filteredHistory = filterConsultas(history, searchTerm); // Filtrar si hay término de búsqueda
        const mappedHistory = mapConsultas(filteredHistory); // Mapear los datos para visualización

        consultasContainer.innerHTML = ''; // Vaciar el contenedor

        mappedHistory.forEach(consulta => {
            // Crear elementos
            const consultaElement = document.createElement('div');
            consultaElement.className = 'consulta';
            consultaElement.dataset.id = consulta.id;

            const consultaTitle = document.createElement('h3');
            consultaTitle.textContent = consulta.title;

            const consultaDetails = document.createElement('p');
            consultaDetails.textContent = consulta.details;

            const consultaTimestamp = document.createElement('small');
            consultaTimestamp.textContent = consulta.timestamp;

            const consultaStatus = document.createElement('p');
            consultaStatus.textContent = `Estado: ${consulta.status}`;

            // Añadir los elementos al contenedor principal
            consultaElement.appendChild(consultaTitle);
            consultaElement.appendChild(consultaDetails);
            consultaElement.appendChild(consultaTimestamp);
            consultaElement.appendChild(consultaStatus);

            consultasContainer.appendChild(consultaElement);
        });
    } catch (error) {
        console.error('Error displaying history:', error);
        alert('No se pudo mostrar el historial. Inténtalo de nuevo.');
    }
}

// Evento de búsqueda en el historial
searchInput.addEventListener('input', () => {
    displayHistory(searchInput.value);
});

// Mostrar el historial al cargar la página
displayHistory();
