import axios from "axios";

const BASE_URL = 'https://pokeapi.co/api/v2/';

export default pokeApi = axios.create({
    baseURL: BASE_URL
});