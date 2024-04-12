// apiService.js
const BASE_URL = 'http://14.225.211.111:3000/v1';

async function fetchData(endpoint, authToken, params = {}) {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    // Retrieve the value from local storage using the key
    const storedValue = localStorage.getItem('user');
    let user = null
    authToken = '';

    // Check if the value is present
    if (storedValue !== null) {
        // Value found in local storage, do something with it
        // Parse the JSON string back to an object
        user = JSON.parse(storedValue)
        console.log(user)
        authToken = user.tokens.access.token;
    } else {
        // Value not found in local storage
        console.log('Value not found in local storage');
    }

    console.log(authToken)
    // Add query parameters
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authToken}`, // Include the authorization token in the header
            'Content-Type': 'application/json', // Example of adding a Content-Type header
        },
    });

    console.log(response)
    //TODO: REDIRECT TO LOGIN PAGE
    // window.dispatchEvent(new Event('login'))
    if (!response.ok) {

        throw new Error('Network response was not ok');
    }
    try {
        const jsonData = await response.json(); // Read the response body once
        console.log(jsonData)
        return jsonData;
    } catch (error) {
        throw new Error('Failed to parse response JSON');

    }
}

async function getDetail(endpoint, authToken, id) {
    const url = new URL(`${BASE_URL}/${endpoint}/${id}`);
    // Retrieve the value from local storage using the key
    const storedValue = localStorage.getItem('user');
    let user = null
    authToken = '';

    // Check if the value is present
    if (storedValue !== null) {
        // Value found in local storage, do something with it
        // Parse the JSON string back to an object
        console.log(storedValue)
        user = JSON.parse(storedValue)
        console.log(user.tokens.access.token)
        authToken = user.tokens.access.token;
    } else {
        // Value not found in local storage
        console.log('Value not found in local storage');
    }

    console.log(authToken)
    // Add query parameters

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authToken}`, // Include the authorization token in the header
            'Content-Type': 'application/json', // Example of adding a Content-Type header
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    try {
        const jsonData = await response.json(); // Read the response body once
        console.log(jsonData)
        return jsonData;
    } catch (error) {
        throw new Error('Failed to parse response JSON');
    }
}

async function changeStatus(endpoint, status, id) {
    const url = new URL(`${BASE_URL}/${endpoint}/${id}/status`);
    // Retrieve the value from local storage using the key
    const storedValue = localStorage.getItem('user');
    let user = null
    let authToken = '';

    // Check if the value is present
    if (storedValue !== null) {
        // Value found in local storage, do something with it
        // Parse the JSON string back to an object
        user = JSON.parse(storedValue)
        authToken = user.tokens.access.token;
    } else {
        // Value not found in local storage
        console.log('Value not found in local storage');
    }

    console.log(authToken)
    // Add query parameters

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${authToken}`, // Include the authorization token in the header
            'Content-Type': 'application/json', // Example of adding a Content-Type header
        },
        body: JSON.stringify({ "status": status }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    try {
        const jsonData = await response.json(); // Read the response body once
        console.log(jsonData)
        return jsonData;
    } catch (error) {
        throw new Error('Failed to parse response JSON');
    }
}

export { fetchData, getDetail, changeStatus };
