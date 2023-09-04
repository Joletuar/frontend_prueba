import axios from 'axios';

// Url base de la API
const baseURL = 'http://127.0.0.1:8000/api/v1/academia/graphql';

export const apiGraphQL = axios.create({
  baseURL,
});
