const API_URL = 'http://localhost:3001/consultas';

async function getConsultas() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching consultas:", error);
    }
}

export { getConsultas };