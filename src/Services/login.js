// ApiCallerComponent.js
import React from 'react';

function ApiCallerComponent({ formData }) {
    // Function to call API with form data
    const callApi = async () => {
        try {
            const response = await fetch('https://api.example.com/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('API response:', data);
                // Handle successful API response
            } else {
                console.error('Error:', response.statusText);
                // Handle API error
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network or other errors
        }
    };

    return (
        <div>
            <button onClick={callApi}>Call API</button>
        </div>
    );
}

export default ApiCallerComponent;
