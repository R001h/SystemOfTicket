async function gethistoryConsultas() {
    try {
        const response = await fetch('http://localhost:3001/historyConsultas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching detalles consultas');
        }

        const detalles = await response.json();
        return detalles;
    } catch (error) {
        console.error('Error fetching detalles consultas:', error);
        throw error;
    }
}

export { gethistoryConsultas };