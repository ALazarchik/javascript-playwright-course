import fetch from 'node-fetch';

export async function getLoginToken(username, password) {
    const body = { 'username': username, 'password': password };

    const response = await fetch('http://localhost:2221/api/login', {
        method: 'POST',
        body: JSON.stringify(body)
    });

    if(response.status !== 200) {
        throw new Error(`Response status was ${response.status} while trying to retrieve login token`);
    }

    const responseBody = await response.json();
    return responseBody.token;
}
