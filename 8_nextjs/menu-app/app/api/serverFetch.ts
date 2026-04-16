const BASE_URL = 'http://localhost:8081/api';

export const serverFetch = async(endpoint:string, options:RequestInit={}) => {
    const response = await fetch(
        `${BASE_URL+endpoint}`, {
            ...options ,
            headers : {
                'Cotent-Type':'application/json',
                ...options.headers
            }
        }        
    );

    if(!response.ok){
        throw new Error('API ERROR'+response.status);
    }

    return response.json();
}