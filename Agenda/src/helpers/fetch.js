const baseUrl = process.env.REACT_APP_API_URL;

const fetchSinToken = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`;

    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

const fetchConToken = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`;
    console.log(url)
    const token = localStorage.getItem('token') || '';
    console.log(token)
    console.log(data)
    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    }
}



export {
    fetchSinToken,
    fetchConToken
}