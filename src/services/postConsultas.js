async function postConsultas(consultaData) {
    try {
        const response = await fetch('http://localhost:3001/registroConsultas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(consultaData)
        });

        if (!response.ok) {
            throw new Error('Error posting consulta');
        }

        return await response.json();
    } catch (error) {
        console.error('Error posting consulta:', error);
        throw error;
    }
}

export { postConsultas };
