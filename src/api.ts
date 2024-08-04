import axios from 'axios';

const apiPosts = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

const apiImg = axios.create({
  baseURL: 'https://via.assets.so/',
});
export { apiPosts, apiImg };