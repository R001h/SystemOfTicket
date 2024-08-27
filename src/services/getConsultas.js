
async function getConsultas() {
    try {
        const response = await fetch('http://localhost:3001/registroConsultas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching consultas');
        }

        const consultas = await response.json();
        return consultas;
    } catch (error) {
        console.error('Error fetching consultas:', error);
        throw error;
    }
}

export { getConsultas };