import axios from 'axios';

export const api = axios.create({
    // baseURL: "http://localhost:3333",
    // baseURL: "http://67.205.172.80:3333"
    baseURL: "https://apizzaria.duckdns.org"
});
