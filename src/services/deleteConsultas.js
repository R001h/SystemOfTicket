async function deleteConsultas(id) {
    try {
        const response = await fetch(`http://localhost:3001/registroConsultas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error deleting consulta');
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting consulta:', error);
        throw error;
    }
}

export { deleteConsultas };
