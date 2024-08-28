async function postHistory(historyData) {
    try {
     
     

        const response = await fetch("http://localhost:3001/historyConsultas", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( historyData)
        });

     
        return await response.json();

        
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}

export{postHistory}
