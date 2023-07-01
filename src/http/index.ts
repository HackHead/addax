import axios from 'axios';



const NAGER_URL = 'https://date.nager.at/api/v3';

const NAGER_API = axios.create({
    baseURL: `${NAGER_URL}`,
});

export {NAGER_API};