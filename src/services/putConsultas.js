async function putConsultas(id, updatedConsultaData) {
    try {
        const response = await fetch(`http://localhost:3001/registroConsultas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedConsultaData)
        });

        if (!response.ok) {
            throw new Error('Error updating consulta');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating consulta:', error);
        throw error;
    }
}

export { putConsultas };
