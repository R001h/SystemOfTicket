import { getUsers } from "../services/getUsers";
import { getConsultas } from '../services/getConsultas';
import { postConsultas } from '../services/postConsultas';

// Elementos del DOM
const incidentInput = document.getElementById("incident");
const createTicketButton = document.getElementById("createTicketbtn");
const consultasContainer = document.getElementById('consultasContainer');

// Cargar el nombre de usuario y las consultas cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    displayUsername();
    loadConsultas();
});
